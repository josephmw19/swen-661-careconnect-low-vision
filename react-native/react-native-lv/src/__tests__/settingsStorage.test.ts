import AsyncStorage from '@react-native-async-storage/async-storage';
import { settingsStorage } from '../utils/settingsStorage';

describe('settingsStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('load() returns DEFAULT_SETTINGS when AsyncStorage throws', async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValueOnce(new Error('boom'));

    const settings = await settingsStorage.load();

    // spot-check defaults
    expect(settings.textSize).toBe('Max');
    expect(settings.boldText).toBe(true);
    expect(settings.highContrastDisplay).toBe(false);
  });

  it('load() merges stored values over defaults and parses booleans', async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce([
      'settings.textSize',
      'settings.boldText',
      'settings.highContrastDisplay',
      'settings.speechSpeed',
      'some.other.key', // should be ignored
    ]);

    (AsyncStorage.multiGet as jest.Mock).mockResolvedValueOnce([
      ['settings.textSize', 'Large'],
      ['settings.boldText', 'false'],
      ['settings.highContrastDisplay', 'true'],
      ['settings.speechSpeed', 'Fast'],
    ]);

    const settings = await settingsStorage.load();

    // stored values override defaults
    expect(settings.textSize).toBe('Large');
    expect(settings.speechSpeed).toBe('Fast');

    // booleans parsed from strings
    expect(settings.boldText).toBe(false);
    expect(settings.highContrastDisplay).toBe(true);

    // still has defaults for anything not stored
    expect(settings.lineSpacing).toBe('Maximum');
    expect(settings.voiceNavigation).toBe(false);

    // and it filtered keys correctly
    expect(AsyncStorage.multiGet).toHaveBeenCalledWith([
      'settings.textSize',
      'settings.boldText',
      'settings.highContrastDisplay',
      'settings.speechSpeed',
    ]);
  });

  it('load() ignores null values and keeps defaults', async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce(['settings.textSize']);

    (AsyncStorage.multiGet as jest.Mock).mockResolvedValueOnce([
      ['settings.textSize', null],
    ]);

    const settings = await settingsStorage.load();

    // null should not override default
    expect(settings.textSize).toBe('Max');
  });

  it('save() stringifies values and writes with PREFIX using multiSet', async () => {
    (AsyncStorage.multiSet as jest.Mock).mockResolvedValueOnce(undefined);

    await settingsStorage.save({
      textSize: 'Small',
      highContrastDisplay: true,
      voiceNavigation: false,
    });

    expect(AsyncStorage.multiSet).toHaveBeenCalledTimes(1);

    // We don’t depend on ordering of Object.entries here.
    const pairs = (AsyncStorage.multiSet as jest.Mock).mock.calls[0][0] as Array<[string, string]>;
    expect(pairs).toEqual(
      expect.arrayContaining([
        ['settings.textSize', 'Small'],
        ['settings.highContrastDisplay', 'true'],
        ['settings.voiceNavigation', 'false'],
      ])
    );
  });
});