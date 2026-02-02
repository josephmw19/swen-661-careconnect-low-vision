import 'package:flutter/material.dart';

class ResponsiveScaffold extends StatelessWidget {
  final PreferredSizeWidget? appBar;
  final Widget body;
  final Widget? bottomNavigationBar;
  final Color? backgroundColor;

  /// If true, wraps [body] in a SingleChildScrollView to prevent bottom overflow
  /// on smaller screens or with larger text scaling.
  final bool scrollable;

  /// Extra padding when scrollable, so content doesn't feel cramped.
  final EdgeInsetsGeometry scrollPadding;

  const ResponsiveScaffold({
    super.key,
    this.appBar,
    required this.body,
    this.bottomNavigationBar,
    this.backgroundColor,
    this.scrollable = false,
    this.scrollPadding = const EdgeInsets.symmetric(vertical: 16),
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isTablet = constraints.maxWidth >= 600;
        final horizontalPadding = isTablet ? 24.0 : 0.0;

        final content = Padding(
          padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
          child: body,
        );

        return Scaffold(
          backgroundColor: backgroundColor,
          appBar: appBar,
          bottomNavigationBar: bottomNavigationBar,
          body: SafeArea(
            child: scrollable
                ? SingleChildScrollView(padding: scrollPadding, child: content)
                : content,
          ),
        );
      },
    );
  }
}
