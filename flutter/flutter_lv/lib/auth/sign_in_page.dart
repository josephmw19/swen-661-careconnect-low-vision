import 'package:flutter/material.dart';

import 'auth_prefs.dart';
import 'package:flutter_lv/widgets/auth_scroll_container.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';

class SignInPage extends StatefulWidget {
  static const routeName = '/sign-in';

  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void initState() {
    super.initState();
    _loadLastUsername();
  }

  Future<void> _loadLastUsername() async {
    final last = await AuthPrefs.getLastUsername();
    if (last != null && mounted) {
      _usernameController.text = last;
    }
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _signIn() async {
    final username = _usernameController.text.trim();

    if (username.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Please enter a username.',
            style: TextStyle(fontSize: 20),
          ),
        ),
      );
      return;
    }

    // Demo-mode sign in (no backend)
    await AuthPrefs.setLastUsername(username);
    await AuthPrefs.setSignedIn(true);

    if (!mounted) {
      return;
    }

    // Navigate to home using router - use static instance as fallback
    final delegate = AppRouterDelegate.instance;
    if (delegate != null) {
      delegate.replaceRoute(AppRoutes.home);
    } else {
      // Try using context navigation as fallback
      context.navigateReplace(AppRoutes.home);
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
                  'Welcome Back',
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
                  'Sign in to continue to CareConnect.',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    height: 1.6,
                    color: text,
                  ),
                ),

                const SizedBox(height: 28),

                const _FieldLabel('Username'),
                const SizedBox(height: 8),
                _InputField(
                  controller: _usernameController,
                  hint: 'Enter your username',
                  obscure: false,
                ),

                const SizedBox(height: 22),

                const _FieldLabel('Password'),
                const SizedBox(height: 8),
                _InputField(
                  controller: _passwordController,
                  hint: 'Enter your password',
                  obscure: _obscurePassword,
                  suffix: IconButton(
                    icon: Icon(
                      _obscurePassword
                          ? Icons.visibility_off_outlined
                          : Icons.visibility_outlined,
                      color: muted,
                      size: 26,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscurePassword = !_obscurePassword;
                      });
                    },
                  ),
                ),

                const SizedBox(height: 28),

                SizedBox(
                  height: 72,
                  child: ElevatedButton(
                    onPressed: _signIn,
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
                        height: 1.2,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 20),

                _Link('Forgot username?', () {
                  context.navigateTo(
                    AppRoutes.forgotPassword,
                    queryParams: {'mode': 'username'},
                  );
                }),
                const SizedBox(height: 12),
                _Link('Forgot password?', () {
                  context.navigateTo(
                    AppRoutes.forgotPassword,
                    queryParams: {'mode': 'password'},
                  );
                }),

                // IMPORTANT: Remove Spacer(), replace with a fixed gap
                const SizedBox(height: 28),

                SizedBox(
                  height: 72,
                  child: OutlinedButton.icon(
                    onPressed: () {
                      context.navigateReplace(AppRoutes.landing);
                    },
                    icon: const Icon(Icons.arrow_back, size: 28),
                    label: const Text(
                      'Return to Welcome',
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

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontFamily: 'Inter',
        fontSize: 22,
        height: 1.4,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
    );
  }
}

class _InputField extends StatelessWidget {
  final TextEditingController controller;
  final String hint;
  final bool obscure;
  final Widget? suffix;

  const _InputField({
    required this.controller,
    required this.hint,
    required this.obscure,
    this.suffix,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscure,
      style: const TextStyle(
        fontFamily: 'Inter',
        fontSize: 22,
        height: 1.6,
        color: Color(0xFFE8EAED),
      ),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(
          fontFamily: 'Inter',
          fontSize: 22,
          height: 1.6,
          color: Color(0xFF9AA0A6),
        ),
        filled: true,
        fillColor: const Color(0xFF2D333E),
        suffixIcon: suffix,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 18,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF4A5568), width: 2),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFA8C7FA), width: 2),
        ),
      ),
    );
  }
}

class _Link extends StatelessWidget {
  final String label;
  final VoidCallback onTap;

  const _Link(this.label, this.onTap);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextButton(
        onPressed: onTap,
        child: Text(
          label,
          style: const TextStyle(
            fontFamily: 'Inter',
            fontSize: 20,
            height: 1.3,
            fontWeight: FontWeight.w600,
            decoration: TextDecoration.underline,
            color: Color(0xFFA8C7FA),
          ),
        ),
      ),
    );
  }
}
