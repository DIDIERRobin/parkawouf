import 'package:app/main-theme.dart';
import 'package:flutter/material.dart';
import 'package:app/widgets/nav-bar.widget.dart';
import 'package:app/screens/today.screen.dart';
import 'package:app/screens/live.screen.dart';
import 'package:app/screens/all-dogs.screen.dart';

void main() {
  runApp(Parkawouf());
}

class Parkawouf extends StatefulWidget {
  @override
  _ParkawoufState createState() => _ParkawoufState();
}

class _ParkawoufState extends State<Parkawouf> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    LiveScreen(),
    TodayScreen(),
    AllDogsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Parkawouf',
      theme: ParkawoufTheme(),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Parkawouf'),
        ),
        body: _screens[_selectedIndex],
        bottomNavigationBar: NavBar(
          selectedIndex: _selectedIndex,
          onItemSelected: (index) {
            this.setState(() {
              _selectedIndex = index;
            });
          },
        ),
      ),
    );
  }
}
