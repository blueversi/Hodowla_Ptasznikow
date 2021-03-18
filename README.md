# Hodowla_Ptasznikow
Aplikacja ułatwiająca zarządzanie hodowlą ptaszników || Projekt zaliczeniowy na studia

Spis<br>
1.Instrukcja instalacji i konfiguracji bazy danych <br>
2.Instrukcja uruchomienia projektu<br>
3.Lista wykorzystanych technologii<br>

1.Instrukcja instalacji i konfiguracji bazy danych<br>

Do uruchomienia aplikacji najpirw proponuje przygotować baze danych. Zatem należy posiadać 
baze danych mysql zdalną lub lokalną do której dostęp trzeba skonfigurować w pliku
/config/mysql2/db.js<br>

const mysql = require('mysql2');<br>

const pool = mysql.createPool({
    host: '[adres bazy danych]',
    user: 'nazwa_użytkownika',
    password: '[hasło]',
    database: 'tin-s18311' //pozostawic bez zmian
});
module.exports = pool;<br>

Następnie w menedżerze bazy danych np. phpmyadmin należy uruchomić gotowy skrypt 
inicjalizujacy baze danych wraz z danymi startowymi
/sql_create.sql
Po zakończonym procesie można przejść dalej.<br><br>

2.Instrukcja uruchomienia projektu<br>

Jeśli nie posiadamy node.js należy pobrac i zainstalować, następnie poprzez konsole należy
przejść do katalogu z projektem. 
Po przejściu należy wpisać komende ' npm i ' - zainstaluje to niezbedne moduly.
Po pomyslnie zakonczonej instalacji w katalogu projektu z konsoli nalezy wpisac komende
' npm start '.
projekt uruchomiony dostepny na localhost na porcie 3000.<br><br>


3.Lista wykorzystanych technologii<br>

1. HTML, CSS, JavaScript<br>
2. Node.js<br>
3. Biblioteka Express<br>
4. Biblioteka Mysql2<br>
5. Biblioteka JOI<br>
6. Docker(lokalnie)<br>


Rafał Sadowski
