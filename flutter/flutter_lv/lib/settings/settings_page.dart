import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';

class SettingsPage extends StatefulWidget {
  final Function(int)? onNavItemTapped;

  const SettingsPage({super.key, this.onNavItemTapped});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  // Text Size state
  String _textSize = 'Max';

  // Line Spacing state
  String _lineSpacing = 'Maximum';

  // Spacing Between Items state
  String _spacingBetweenItems = 'Maximum';

  // Speech Speed state
  String _speechSpeed = 'Normal';

  // Microphone Access state
  String _microphoneAccess = 'Allowed';

  // Toggle states
  bool _highContrastDisplay = false;
  bool _boldText = true;
  bool _reduceVisualClutter = true;
  bool _readScreenAloud = true;
  bool _readNotificationsAloud = true;
  bool _voiceNavigation = false;
  bool _voiceFeedbackForActions = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: Container(
        color: const Color(0xFF1A1D24),
        child: Column(
          children: [
            // Header section
            Container(
              decoration: BoxDecoration(
                color: const Color(0xFF252932),
                border: Border(
                  bottom: BorderSide(
                    color: const Color(0xFF3A3F4A),
                    width: 2,
                  ),
                ),
              ),
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Accessibility Settings title
                  const SizedBox(
                    height: 88,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Accessibility Settings',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 0.3901,
                          height: 1.3, // 44.2 / 34
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Content area
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(22.5),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Vision section
                    const _SectionHeader(
                      icon: Icons.visibility_outlined,
                      title: 'Vision',
                    ),
                    const SizedBox(height: 27),
                    // Text Size card
                    _TextSizeCard(
                      selectedSize: _textSize,
                      onSizeChanged: (size) {
                        setState(() {
                          _textSize = size;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Line Spacing card
                    _LineSpacingCard(
                      selectedSpacing: _lineSpacing,
                      onSpacingChanged: (spacing) {
                        setState(() {
                          _lineSpacing = spacing;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Spacing Between Items card
                    _SpacingBetweenItemsCard(
                      selectedSpacing: _spacingBetweenItems,
                      onSpacingChanged: (spacing) {
                        setState(() {
                          _spacingBetweenItems = spacing;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // High Contrast Display card
                    _ToggleCard(
                      title: 'High Contrast Display',
                      isOn: _highContrastDisplay,
                      onToggle: (value) {
                        setState(() {
                          _highContrastDisplay = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Bold Text card
                    _ToggleCard(
                      title: 'Bold Text',
                      isOn: _boldText,
                      onToggle: (value) {
                        setState(() {
                          _boldText = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Reduce Visual Clutter card
                    _ReduceVisualClutterCard(
                      isOn: _reduceVisualClutter,
                      onToggle: (value) {
                        setState(() {
                          _reduceVisualClutter = value;
                        });
                      },
                    ),
                    const SizedBox(height: 45),
                    // Read Aloud and Voice section
                    const _SectionHeader(
                      icon: Icons.volume_up_outlined,
                      title: 'Read Aloud and Voice',
                    ),
                    const SizedBox(height: 27),
                    // Read Screen Aloud card
                    _ToggleCard(
                      title: 'Read Screen Aloud',
                      isOn: _readScreenAloud,
                      onToggle: (value) {
                        setState(() {
                          _readScreenAloud = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Read Notifications Aloud card
                    _ToggleCard(
                      title: 'Read Notifications Aloud',
                      isOn: _readNotificationsAloud,
                      onToggle: (value) {
                        setState(() {
                          _readNotificationsAloud = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Voice Navigation card
                    _ToggleCard(
                      title: 'Voice Navigation',
                      isOn: _voiceNavigation,
                      onToggle: (value) {
                        setState(() {
                          _voiceNavigation = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Voice Feedback for Actions card
                    _ToggleCard(
                      title: 'Voice Feedback for Actions',
                      isOn: _voiceFeedbackForActions,
                      onToggle: (value) {
                        setState(() {
                          _voiceFeedbackForActions = value;
                        });
                      },
                    ),
                    const SizedBox(height: 27),
                    // Speech Speed card
                    _SpeechSpeedCard(
                      selectedSpeed: _speechSpeed,
                      onSpeedChanged: (speed) {
                        setState(() {
                          _speechSpeed = speed;
                        });
                      },
                    ),
                    const SizedBox(height: 45),
                    // Microphone Access section
                    const _SectionHeader(
                      icon: Icons.mic_outlined,
                      title: 'Microphone Access',
                    ),
                    const SizedBox(height: 27),
                    // Microphone Access card
                    _MicrophoneAccessCard(
                      selectedAccess: _microphoneAccess,
                      onAccessChanged: (access) {
                        setState(() {
                          _microphoneAccess = access;
                        });
                      },
                    ),
                    const SizedBox(height: 36),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 3, // Settings is index 3
        onTap: widget.onNavItemTapped ?? (index) {},
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final IconData icon;
  final String title;

  const _SectionHeader({
    required this.icon,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const SizedBox(width: 6),
        Icon(
          icon,
          color: Colors.white,
          size: 32,
        ),
        const SizedBox(width: 13.5),
        Expanded(
          child: SizedBox(
            height: 38,
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                title,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                  letterSpacing: 0.3828,
                  height: 1.4, // 39.2 / 28
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _TextSizeCard extends StatelessWidget {
  final String selectedSize;
  final Function(String) onSizeChanged;

  const _TextSizeCard({
    required this.selectedSize,
    required this.onSizeChanged,
  });

  String _getCurrentSettingLabel() {
    switch (selectedSize) {
      case 'Large':
        return 'Large';
      case 'Extra Large':
        return 'Extra Large';
      case 'Max':
        return 'Maximum';
      default:
        return 'Maximum';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Text Size',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 9),
          Text(
            'Current setting: ${_getCurrentSettingLabel()}',
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 22.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: _OptionButton(
                  label: 'Large',
                  isSelected: selectedSize == 'Large',
                  height: 109,
                  onPressed: () => onSizeChanged('Large'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Extra Large',
                  isSelected: selectedSize == 'Extra Large',
                  height: 109,
                  onPressed: () => onSizeChanged('Extra Large'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Max',
                  isSelected: selectedSize == 'Max',
                  height: 109,
                  onPressed: () => onSizeChanged('Max'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _LineSpacingCard extends StatelessWidget {
  final String selectedSpacing;
  final Function(String) onSpacingChanged;

  const _LineSpacingCard({
    required this.selectedSpacing,
    required this.onSpacingChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Line Spacing',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 9),
          Text(
            'Current setting: $selectedSpacing',
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 22.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: _OptionButton(
                  label: 'Increased',
                  isSelected: selectedSpacing == 'Increased',
                  height: 77,
                  onPressed: () => onSpacingChanged('Increased'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Maximum',
                  isSelected: selectedSpacing == 'Maximum',
                  height: 77,
                  onPressed: () => onSpacingChanged('Maximum'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SpacingBetweenItemsCard extends StatelessWidget {
  final String selectedSpacing;
  final Function(String) onSpacingChanged;

  const _SpacingBetweenItemsCard({
    required this.selectedSpacing,
    required this.onSpacingChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Spacing Between Items',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 9),
          Text(
            'Current setting: $selectedSpacing',
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 22.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: _OptionButton(
                  label: 'Increased',
                  isSelected: selectedSpacing == 'Increased',
                  height: 77,
                  onPressed: () => onSpacingChanged('Increased'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Maximum',
                  isSelected: selectedSpacing == 'Maximum',
                  height: 77,
                  onPressed: () => onSpacingChanged('Maximum'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ReduceVisualClutterCard extends StatelessWidget {
  final bool isOn;
  final Function(bool) onToggle;

  const _ReduceVisualClutterCard({
    required this.isOn,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(27),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Reduce Visual Clutter',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 13.5),
          const Text(
            'Hides non-essential elements to improve clarity',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 13.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _ToggleButton(
                isOn: isOn,
                onToggle: onToggle,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SpeechSpeedCard extends StatelessWidget {
  final String selectedSpeed;
  final Function(String) onSpeedChanged;

  const _SpeechSpeedCard({
    required this.selectedSpeed,
    required this.onSpeedChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Speech Speed',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 9),
          Text(
            'Current setting: $selectedSpeed',
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 22.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: _OptionButton(
                  label: 'Slow',
                  isSelected: selectedSpeed == 'Slow',
                  height: 77,
                  onPressed: () => onSpeedChanged('Slow'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Normal',
                  isSelected: selectedSpeed == 'Normal',
                  height: 77,
                  onPressed: () => onSpeedChanged('Normal'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Fast',
                  isSelected: selectedSpeed == 'Fast',
                  height: 77,
                  onPressed: () => onSpeedChanged('Fast'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _MicrophoneAccessCard extends StatelessWidget {
  final String selectedAccess;
  final Function(String) onAccessChanged;

  const _MicrophoneAccessCard({
    required this.selectedAccess,
    required this.onAccessChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Microphone Access',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.5, // 39 / 26
            ),
          ),
          const SizedBox(height: 13.5),
          const Text(
            'Required for voice commands and read-aloud features',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: FontWeight.normal,
              color: Color(0xFF9AA0A6),
              letterSpacing: -0.2578,
              height: 1.6, // 35.2 / 22
            ),
          ),
          const SizedBox(height: 22.5),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: _OptionButton(
                  label: 'Allowed',
                  isSelected: selectedAccess == 'Allowed',
                  height: 109,
                  onPressed: () => onAccessChanged('Allowed'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Not Allowed',
                  isSelected: selectedAccess == 'Not Allowed',
                  height: 109,
                  onPressed: () => onAccessChanged('Not Allowed'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ToggleCard extends StatelessWidget {
  final String title;
  final bool isOn;
  final Function(bool) onToggle;

  const _ToggleCard({
    required this.title,
    required this.isOn,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(29),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                title,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 26,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                  letterSpacing: 0.2158,
                  height: 1.5, // 39 / 26
                ),
              ),
            ),
          ),
          _ToggleButton(
            isOn: isOn,
            onToggle: onToggle,
          ),
        ],
      ),
    );
  }
}

class _OptionButton extends StatelessWidget {
  final String label;
  final bool isSelected;
  final double height;
  final VoidCallback? onPressed;

  const _OptionButton({
    required this.label,
    required this.isSelected,
    required this.height,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: isSelected
              ? const Color(0xFF4285F4)
              : const Color(0xFF2D333E),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.25),
          ),
          padding: EdgeInsets.zero,
          alignment: Alignment.center,
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              color: isSelected ? Colors.white : const Color(0xFFE8EAED),
              letterSpacing: 0.0703,
            ),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }
}

class _ToggleButton extends StatelessWidget {
  final bool isOn;
  final Function(bool)? onToggle;

  const _ToggleButton({
    required this.isOn,
    this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 120,
      height: 68,
      child: ElevatedButton(
        onPressed: onToggle != null ? () => onToggle!(!isOn) : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: isOn ? const Color(0xFF34A853) : const Color(0xFF2D333E),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.25),
          ),
          padding: EdgeInsets.zero,
          alignment: Alignment.center,
        ),
        child: Center(
          child: Text(
            isOn ? 'On' : 'Off',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: FontWeight.w500,
              color: isOn ? Colors.white : const Color(0xFF9AA0A6),
              letterSpacing: 0.0703,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
