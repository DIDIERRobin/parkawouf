import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Parkawouf',
      home: Scaffold(
        appBar: AppBar(
          title: Text('ParkaWouf'),
        ),
        body: Center(
          child: Text('Bienvenue sur ParkaWouf'),
        ),
      ),
    );
  }
}
