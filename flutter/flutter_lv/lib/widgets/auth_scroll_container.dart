import 'package:flutter/material.dart';

class AuthScrollContainer extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;

  const AuthScrollContainer({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.fromLTRB(24, 28, 24, 24),
  });

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return SafeArea(
      child: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            padding: EdgeInsets.only(
              left: padding.left,
              top: padding.top,
              right: padding.right,
              bottom: padding.bottom + bottomInset,
            ),
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              // No IntrinsicHeight, let it scroll naturally.
              child: child,
            ),
          );
        },
      ),
    );
  }
}
