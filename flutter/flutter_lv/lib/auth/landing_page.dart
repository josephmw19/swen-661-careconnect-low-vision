import 'package:flutter/material.dart';

import 'package:flutter_lv/widgets/auth_scroll_container.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';
import 'auth_keys.dart';

class LandingPage extends StatelessWidget {
  static const routeName = '/landing';

  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    const bg = Color(0xFF1A1D24);
    const surface = Color(0xFF252932);
    const border = Color(0xFF3A3F4A);
    const primary = Color(0xFF4285F4);
    const muted = Color(0xFF9AA0A6);

    return Scaffold(
      backgroundColor: bg,
      resizeToAvoidBottomInset: true,
      body: AuthScrollContainer(
        padding: const EdgeInsets.symmetric(horizontal: 22.5, vertical: 18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 12),

                // Logo tile
                Center(
                  child: Container(
                    width: 84,
                    height: 84,
                    decoration: BoxDecoration(
                      color: primary,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Icon(
                      Icons.favorite,
                      color: Colors.white,
                      size: 44,
                    ),
                  ),
                ),

                const SizedBox(height: 22),

                const Center(
                  child: Text(
                    'CareConnect',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 34,
                      fontWeight: FontWeight.w700,
                      height: 1.3,
                      color: Colors.white,
                      letterSpacing: 0.3,
                    ),
                  ),
                ),

                const SizedBox(height: 10),

                const Center(
                  child: Text(
                    'Supporting care, made\neasier.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 22,
                      fontWeight: FontWeight.w500,
                      height: 1.6,
                      color: muted,
                    ),
                  ),
                ),

                const SizedBox(height: 28),

                // Sign In (primary)
                SizedBox(
                  height: 72,
                  child: ElevatedButton(
                    key: AuthKeys.landingSignInBtn,
                    onPressed: () {
                      context.navigateTo(AppRoutes.roleSelect);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
                      ),
                    ),
                    child: const Text(
                      'Sign In',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        height: 1.2,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Create Account (secondary)
                SizedBox(
                  height: 72,
                  child: OutlinedButton(
                    key: AuthKeys.landingCreateAccountBtn,
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text(
                            'Create Account is not implemented yet.',
                            style: TextStyle(fontSize: 20),
                          ),
                        ),
                      );
                    },
                    style: OutlinedButton.styleFrom(
                      backgroundColor: surface,
                      side: const BorderSide(color: border, width: 2),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
                      ),
                    ),
                    child: const Text(
                      'Create Account',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        height: 1.2,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 18),

                // Links
                _LinkButton(
                  key: AuthKeys.landingForgotUsername,
                  label: 'Forgot username?',
                  onTap: () {
                    context.navigateTo(
                      AppRoutes.forgotPassword,
                      queryParams: {'mode': 'username'},
                    );
                  },
                ),
                const SizedBox(height: 10),
                _LinkButton(
                  key: AuthKeys.landingForgotPassword,
                  label: 'Forgot password?',
                  onTap: () {
                    context.navigateTo(
                      AppRoutes.forgotPassword,
                      queryParams: {'mode': 'password'},
                    );
                  },
                ),

                const SizedBox(height: 28),

                const Text(
                  'Designed for accessibility and\nease of use',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 20,
                    fontWeight: FontWeight.w500,
                    height: 1.6,
                    color: muted,
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

class _LinkButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _LinkButton({super.key, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextButton(
        key: key,
        onPressed: onTap,
        style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        ),
        child: Text(
          label,
          style: const TextStyle(
            fontFamily: 'Inter',
            fontSize: 20,
            fontWeight: FontWeight.w600,
            height: 1.3,
            decoration: TextDecoration.underline,
            color: Color(0xFFA8C7FA),
          ),
        ),
      ),
    );
  }
}
