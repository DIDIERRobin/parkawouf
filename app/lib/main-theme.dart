import 'package:flutter/material.dart';

const beige = Color.fromRGBO(243, 242, 239, 1);
const softGreen = Color.fromRGBO(162, 213, 198, 1);
const darkGreen = Color.fromRGBO(0, 128, 128, 1);
const brown = Color.fromARGB(175, 124, 82, 1);


ThemeData ParkawoufTheme() {
  return ThemeData(
    focusColor: softGreen,
    highlightColor: softGreen,
    primaryColor: softGreen,
    scaffoldBackgroundColor: beige,
    appBarTheme: AppBarTheme(
      color: brown
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      selectedItemColor: darkGreen,
    ),
  );
}
