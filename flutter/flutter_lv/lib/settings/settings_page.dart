import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';

class SettingsPage extends StatelessWidget {
  final Function(int)? onNavItemTapped;

  const SettingsPage({super.key, this.onNavItemTapped});

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
                    _TextSizeCard(),
                    const SizedBox(height: 27),
                    // Line Spacing card
                    _LineSpacingCard(),
                    const SizedBox(height: 27),
                    // Spacing Between Items card
                    _SpacingBetweenItemsCard(),
                    const SizedBox(height: 27),
                    // High Contrast Display card
                    _ToggleCard(
                      title: 'High Contrast Display',
                      isOn: false,
                    ),
                    const SizedBox(height: 27),
                    // Bold Text card
                    _ToggleCard(
                      title: 'Bold Text',
                      isOn: true,
                    ),
                    const SizedBox(height: 27),
                    // Reduce Visual Clutter card
                    _ReduceVisualClutterCard(),
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
                      isOn: true,
                    ),
                    const SizedBox(height: 27),
                    // Read Notifications Aloud card
                    _ToggleCard(
                      title: 'Read Notifications Aloud',
                      isOn: true,
                    ),
                    const SizedBox(height: 27),
                    // Voice Navigation card
                    _ToggleCard(
                      title: 'Voice Navigation',
                      isOn: false,
                    ),
                    const SizedBox(height: 27),
                    // Voice Feedback for Actions card
                    _ToggleCard(
                      title: 'Voice Feedback for Actions',
                      isOn: true,
                    ),
                    const SizedBox(height: 27),
                    // Speech Speed card
                    _SpeechSpeedCard(),
                    const SizedBox(height: 45),
                    // Microphone Access section
                    const _SectionHeader(
                      icon: Icons.mic_outlined,
                      title: 'Microphone Access',
                    ),
                    const SizedBox(height: 27),
                    // Microphone Access card
                    _MicrophoneAccessCard(),
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
        onTap: onNavItemTapped ?? (index) {},
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
  const _TextSizeCard();

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
          const Text(
            'Current setting: Maximum',
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
                  label: 'Large',
                  isSelected: false,
                  height: 109,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Extra Large',
                  isSelected: false,
                  height: 109,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Max',
                  isSelected: true,
                  height: 109,
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
  const _LineSpacingCard();

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
          const Text(
            'Current setting: Maximum',
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
                  label: 'Increased',
                  isSelected: false,
                  height: 77,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Maximum',
                  isSelected: true,
                  height: 77,
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
  const _SpacingBetweenItemsCard();

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
          const Text(
            'Current setting: Maximum',
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
                  label: 'Increased',
                  isSelected: false,
                  height: 77,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Maximum',
                  isSelected: true,
                  height: 77,
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
  const _ReduceVisualClutterCard();

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
              _ToggleButton(isOn: true),
            ],
          ),
        ],
      ),
    );
  }
}

class _SpeechSpeedCard extends StatelessWidget {
  const _SpeechSpeedCard();

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
          const Text(
            'Current setting: Normal',
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
                  label: 'Slow',
                  isSelected: false,
                  height: 77,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Normal',
                  isSelected: true,
                  height: 77,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Fast',
                  isSelected: false,
                  height: 77,
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
  const _MicrophoneAccessCard();

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
                  isSelected: true,
                  height: 109,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _OptionButton(
                  label: 'Not Allowed',
                  isSelected: false,
                  height: 109,
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

  const _ToggleCard({
    required this.title,
    required this.isOn,
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
          _ToggleButton(isOn: isOn),
        ],
      ),
    );
  }
}

class _OptionButton extends StatelessWidget {
  final String label;
  final bool isSelected;
  final double height;

  const _OptionButton({
    required this.label,
    required this.isSelected,
    required this.height,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: ElevatedButton(
        onPressed: () {
          // Handle option selection
        },
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

  const _ToggleButton({required this.isOn});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 120,
      height: 68,
      child: ElevatedButton(
        onPressed: () {
          // Handle toggle
        },
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
