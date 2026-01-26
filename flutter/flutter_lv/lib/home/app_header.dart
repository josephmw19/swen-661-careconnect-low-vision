import 'package:flutter/material.dart';

class AppHeader extends StatelessWidget implements PreferredSizeWidget {
  const AppHeader({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(80);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border(
          bottom: BorderSide(
            color: const Color(0xFF3A3F4A),
            width: 2,
          ),
        ),
      ),
      padding: const EdgeInsets.fromLTRB(22.5, 0, 22.5, 2),
      child: SafeArea(
        child: SizedBox(
          height: 64,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // CareConnect title
              const SizedBox(
                height: 40,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'CareConnect',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 32,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                      letterSpacing: 0.4063,
                      height: 1.3, // 41.6 / 32
                    ),
                  ),
                ),
              ),
              
              // Read and Voice buttons
              Row(
                children: [
                  _ActionButton(
                    icon: Icons.volume_up_outlined,
                    label: 'Read',
                    width: 50,
                    onTap: () {
                      // Handle read action
                    },
                  ),
                  const SizedBox(width: 13.5),
                  _ActionButton(
                    icon: Icons.mic_outlined,
                    label: 'Voice',
                    width: 50, // Will expand
                    onTap: () {
                      // Handle voice action
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final double? width;
  final VoidCallback onTap;

  const _ActionButton({
    required this.icon,
    required this.label,
    this.width,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: width,
        height: 64,
        constraints: width == null
            ? const BoxConstraints(minWidth: 64)
            : null,
        decoration: BoxDecoration(
          color: const Color(0xFF2D333E),
          borderRadius: BorderRadius.circular(15.25),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 2),
            Icon(
              icon,
              size: 28,
              color: const Color(0xFFA8C7FA),
            ),
            const SizedBox(height: 4.5),
            SizedBox(
              height: 22,
              child: Text(
                label,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFFA8C7FA),
                  letterSpacing: -0.4395,
                  height: 1.3, // 23.4 / 18
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(height: 2),
          ],
        ),
      ),
    );
  }
}
