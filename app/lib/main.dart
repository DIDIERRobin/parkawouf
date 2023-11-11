import 'package:flutter/material.dart';
import 'package:app/widgets/nav-bar.widget.dart';
import 'package:app/screens/today.screen.dart';
import 'package:app/screens/live.screen.dart';
import 'package:app/screens/all-dogs.screen.dart';

void main() {
  runApp(ParkaWouf());
}

class ParkaWouf extends StatefulWidget {
  @override
  _ParkaWoufState createState() => _ParkaWoufState();
}

class _ParkaWoufState extends State<ParkaWouf> {
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
      home: Scaffold(
        appBar: AppBar(
          title: Text('ParkaWouf'),
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
