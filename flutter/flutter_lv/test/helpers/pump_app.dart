import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_lv/main.dart';

Future<void> pumpHome(WidgetTester tester) async {
  await tester.pumpWidget(
    const MaterialApp(home: MyHomePage(title: 'CareConnect')),
  );
  await tester.pump(); // 1 frame, no pumpAndSettle
}
