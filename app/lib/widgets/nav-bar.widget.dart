import 'package:flutter/material.dart';

class NavBar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemSelected;

  NavBar({this.selectedIndex = 0, required this.onItemSelected});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: selectedIndex,
      onTap: onItemSelected,
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Live'),
        BottomNavigationBarItem(icon: Icon(Icons.lock_clock), label: 'Today'),
        BottomNavigationBarItem(icon: Icon(Icons.list), label: 'All dogs'),
      ],
    );
  }
}
