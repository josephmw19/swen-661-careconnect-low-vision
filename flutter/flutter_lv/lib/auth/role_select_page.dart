import 'package:flutter/material.dart';
import 'package:flutter_lv/widgets/auth_scroll_container.dart';

import 'auth_prefs.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';
import 'auth_keys.dart';

class RoleSelectPage extends StatelessWidget {
  static const routeName = '/role-select';

  const RoleSelectPage({super.key});

  @override
  Widget build(BuildContext context) {
    const bg = Color(0xFF1A1D24);
    const card = Color(0xFF252932);
    const border = Color(0xFF4A5568);
    const text = Color(0xFFE8EAED);
    const muted = Color(0xFF9AA0A6);
    const blue = Color(0xFFA8C7FA);
    const green = Color(0xFF81C995);

    return Scaffold(
      backgroundColor: bg,
      resizeToAvoidBottomInset: true,
      body: AuthScrollContainer(
        padding: const EdgeInsets.fromLTRB(24, 28, 24, 24),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 6),
                const Text(
                  'Choose Your Role',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 34,
                    height: 1.3,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 18),
                const Text(
                  'Select the option that best describes how you use CareConnect.',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 26,
                    height: 1.6,
                    color: text,
                  ),
                ),
                const SizedBox(height: 28),

                _RoleCard(
                  key: AuthKeys.roleCaregiverCard,
                  background: card,
                  borderColor: border,
                  icon: Icons.group_outlined,
                  iconColor: blue,
                  title: 'Caregiver',
                  subtitle: 'I provide care and support for patients.',
                  onTap: () async {
                    await AuthPrefs.setUserRole(AuthPrefs.roleCaregiver);
                    if (!context.mounted) return;
                    context.navigateReplace(AppRoutes.signIn);
                  },
                ),
                const SizedBox(height: 18),

                _RoleCard(
                  key: AuthKeys.rolePatientCard,
                  background: card,
                  borderColor: border,
                  icon: Icons.person_outline,
                  iconColor: green,
                  title: 'Patient',
                  subtitle: 'I receive care and manage my health.',
                  onTap: () async {
                    await AuthPrefs.setUserRole(AuthPrefs.rolePatient);
                    if (!context.mounted) return;
                    context.navigateReplace(AppRoutes.signIn);
                  },
                ),

                const SizedBox(height: 18),
                const Text(
                  'You can change your role later in Settings if needed.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 22,
                    height: 1.7,
                    color: muted,
                  ),
                ),

                const SizedBox(height: 28),

                SizedBox(
                  height: 76,
                  child: OutlinedButton.icon(
                    key: AuthKeys.roleReturnToWelcome,
                    onPressed: () {
                      context.navigateReplace(AppRoutes.landing);
                    },
                    icon: const Icon(Icons.arrow_back, size: 32),
                    label: const Text(
                      'Return to Welcome',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 26,
                        height: 1.4,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: text,
                      backgroundColor: const Color(0xFF2D333E),
                      side: const BorderSide(color: border),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _RoleCard extends StatelessWidget {
  final Color background;
  final Color borderColor;
  final IconData icon;
  final Color iconColor;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _RoleCard({
    super.key,
    required this.background,
    required this.borderColor,
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'Select $title role',
      child: Material(
        color: background,
        borderRadius: BorderRadius.circular(18),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(18),
          child: Container(
            constraints: const BoxConstraints(minHeight: 140),
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: borderColor, width: 2),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(icon, size: 40, color: iconColor),
                    const SizedBox(width: 14),
                    Text(
                      title,
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 28,
                        height: 1.3,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    height: 1.6,
                    color: Color(0xFFE8EAED),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
