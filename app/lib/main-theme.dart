import 'package:flutter/material.dart';

const beige = Color.fromRGBO(243, 242, 239, 1);
const softGreen = Color.fromRGBO(162, 213, 198, 1);
const darkGreen = Color.fromRGBO(0, 128, 128, 1);
const brown = Color.fromARGB(175, 124, 82, 1);
const darkGray = Color.fromARGB(74, 74, 74, 1);

ThemeData ParkaWoufTheme() {
  return ThemeData(
    focusColor: softGreen,
    highlightColor: softGreen,
    primaryColor: softGreen,
    scaffoldBackgroundColor: beige,
    appBarTheme: AppBarTheme(
      color: brown,
    ),
    textTheme: TextTheme(
      bodyLarge: TextStyle(color: darkGray, fontFamily: 'Nunito'),
      bodySmall: TextStyle(color: darkGray, fontFamily: 'Nunito'),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      selectedItemColor: softGreen,
    ),
  );
}
