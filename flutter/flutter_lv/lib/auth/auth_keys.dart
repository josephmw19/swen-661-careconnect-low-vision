import 'package:flutter/material.dart';

class AuthKeys {
  // Landing
  static const landingSignInBtn = Key('auth.landing.signIn');
  static const landingCreateAccountBtn = Key('auth.landing.createAccount');
  static const landingForgotUsername = Key('auth.landing.forgotUsername');
  static const landingForgotPassword = Key('auth.landing.forgotPassword');

  // Role select
  static const roleCaregiverCard = Key('auth.role.caregiver');
  static const rolePatientCard = Key('auth.role.patient');
  static const roleReturnToWelcome = Key('auth.role.backToWelcome');

  // Sign in
  static const signInUsernameField = Key('auth.signin.username');
  static const signInPasswordField = Key('auth.signin.password');
  static const signInSubmitBtn = Key('auth.signin.submit');
  static const signInTogglePassword = Key('auth.signin.togglePassword');
  static const signInReturnToWelcome = Key('auth.signin.backToWelcome');
  static const signInForgotUsername = Key('auth.signin.forgotUsername');
  static const signInForgotPassword = Key('auth.signin.forgotPassword');

  // Forgot password / username
  static const forgotInputField = Key('auth.forgot.input');
  static const forgotSubmitBtn = Key('auth.forgot.submit');
  static const forgotReturnBtn = Key('auth.forgot.back');
}
