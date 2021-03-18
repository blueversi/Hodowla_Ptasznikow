# Hodowla_Ptasznikow
Aplikacja ułatwiająca zarządzanie hodowlą ptaszników || Projekt zaliczeniowy na studia

Spis
1.Instrukcja instalacji i konfiguracji bazy danych
2.2.Instrukcja uruchomienia projektu
3.3.Lista wykorzystanych technologii
4.4.Aktualny diagram schematu bazy danych

1.Instrukcja instalacji i konfiguracji bazy danych

Do uruchomienia aplikacji najpirw proponuje przygotować baze danych. Zatem należy posiadać 
baze danych mysql zdalną lub lokalną do której dostęp trzeba skonfigurować w pliku
/config/mysql2/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '[adres bazy danych]',
    user: 'nazwa_użytkownika',
    password: '[hasło]',
    database: 'tin-s18311' //pozostawic bez zmian
});
module.exports = pool;

Następnie w menedżerze bazy danych np. phpmyadmin należy uruchomić gotowy skrypt 
inicjalizujacy baze danych wraz z danymi startowymi
/sql_create.sql
Po zakończonym procesie można przejść dalej.

2.Instrukcja uruchomienia projektu

Jeśli nie posiadamy node.js należy pobrac i zainstalować, następnie poprzez konsole należy
przejść do katalogu z projektem. 
Po przejściu należy wpisać komende ' npm i ' - zainstaluje to niezbedne moduly.
Po pomyslnie zakonczonej instalacji w katalogu projektu z konsoli nalezy wpisac komende
' npm start '.
projekt uruchomiony dostepny na localhost na porcie 3000.


3.Lista wykorzystanych technologii

1. HTML, CSS, JavaScript
2. Node.js
3. Biblioteka Express
4. Biblioteka Mysql2
5. Biblioteka JOI
6. Docker(lokalnie)

4.Aktualny diagram schematu bazy danych
znajduje sie w katalogu projektu pod sciezka
/aktualny_schemat_bazy_danych.png


Rafał Sadowski
