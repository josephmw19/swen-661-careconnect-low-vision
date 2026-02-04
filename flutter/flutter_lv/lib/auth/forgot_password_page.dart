import 'package:flutter/material.dart';
import 'package:flutter_lv/widgets/auth_scroll_container.dart';
import 'auth_keys.dart';
import '../navigation/app_router.dart';
import '../navigation/navigation_helper.dart';

enum ForgotMode { username, password }

class ForgotPasswordPage extends StatefulWidget {
  static const routeName = '/forgot-password';
  final ForgotMode? mode;

  const ForgotPasswordPage({super.key, this.mode});

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  ForgotMode _getMode() {
    return widget.mode ?? ForgotMode.password;
  }

  void _showMessage(BuildContext context, String message) {
    final messenger = ScaffoldMessenger.of(context);
    messenger.hideCurrentSnackBar();
    messenger.showSnackBar(
      SnackBar(
        duration: const Duration(seconds: 2),
        content: Text(
          message,
          style: const TextStyle(fontFamily: 'Inter', fontSize: 20),
        ),
      ),
    );
  }

  Future<void> _handleBack() async {
    final didPop = await Navigator.of(context).maybePop();
    if (!didPop) {
      if (!mounted) return;
      // Router auth pages often have no back stack, so we route explicitly.
      context.navigateReplace(AppRoutes.signIn);
    }
  }

  @override
  Widget build(BuildContext context) {
    const bg = Color(0xFF1A1D24);
    const surface = Color(0xFF252932);
    const border = Color(0xFF3A3F4A);
    const text = Color(0xFFE8EAED);
    const muted = Color(0xFF9AA0A6);
    const primary = Color(0xFF4285F4);

    final mode = _getMode();
    final isUsername = mode == ForgotMode.username;

    final title = isUsername ? 'Forgot Username' : 'Forgot Password';
    final bodyText = isUsername
        ? 'Enter your email address and we will send your username.'
        : 'Enter your email address and we will send a password reset link.';
    final buttonText = isUsername ? 'Send Username' : 'Send Reset Link';

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
                Text(
                  title,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 34,
                    height: 1.3,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 18),
                Text(
                  bodyText,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    height: 1.6,
                    color: text,
                  ),
                ),
                const SizedBox(height: 22),
                Container(
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: surface,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: border, width: 2),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text(
                        'Email Address',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 22,
                          height: 1.4,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 10),
                      TextField(
                        key: AuthKeys.forgotInputField,
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        style: const TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 22,
                          height: 1.6,
                          color: text,
                        ),
                        decoration: InputDecoration(
                          hintText: 'name@example.com',
                          hintStyle: const TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 22,
                            height: 1.6,
                            color: muted,
                          ),
                          filled: true,
                          fillColor: const Color(0xFF2D333E),
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 18,
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: const BorderSide(
                              color: Color(0xFF4A5568),
                              width: 2,
                            ),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: const BorderSide(
                              color: Color(0xFFA8C7FA),
                              width: 2,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 18),
                      SizedBox(
                        height: 72,
                        child: ElevatedButton(
                          key: AuthKeys.forgotSubmitBtn,
                          onPressed: () {
                            final email = _emailController.text.trim();
                            if (email.isEmpty) {
                              _showMessage(
                                context,
                                'Please enter an email address.',
                              );
                            } else {
                              _showMessage(
                                context,
                                'Request sent. (Demo mode, no backend)',
                              );
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18),
                            ),
                          ),
                          child: Text(
                            buttonText,
                            style: const TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 24,
                              height: 1.2,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  height: 72,
                  child: OutlinedButton.icon(
                    key: AuthKeys.forgotReturnBtn,
                    onPressed: _handleBack,
                    icon: const Icon(Icons.arrow_back, size: 28),
                    label: const Text(
                      'Back',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        height: 1.2,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: text,
                      backgroundColor: surface,
                      side: const BorderSide(color: border, width: 2),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
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
