
# music-map

# ![](https://lh7-us.googleusercontent.com/9BxOtgq6OKthGX1me_8D4df4KgCSUp10dYyr0gM-IYtl_st19j0jwdyYwpU4EnvlKiN5kR9LJQB4jpiznq8z3mBqQmgMBf6_-_I4t0V0rmMxOPlkySULr8BH9vnJ_uXYHRCG70Muytj7zNrFWt6iJ4k)

music-map - Aplikacja webowa, stworzona do łatwej lokalizacji i sortowania festiwali muzycznych na podstawie potrzeb użytkownika.


# Uruchomienie lokalne


1/ Kopiujemy repozytorium:  
  

git clone [https://github.com/Jedrzej1940518/ztpai2023-music-map.git](https://github.com/Jedrzej1940518/ztpai2023-music-map.git)

  

2/ przechodzimy do folderu ztpai2023-music-map

  

3/ tworzymi plik .env zgodnie z .env_example - można użyć mojego API key do google maps wysłanego przez teams.

  

4/ uruchamiamy aplikacje:

  

Linux (Na mojej maszynie pierwsze budowanie ~3 minut):

sudo docker-compose build && sudo docker-compose up

  

Windows (Na mojej maszynie pierwsze budowanie ~20 minut):

Uruchamiamy docker desktop

docker-compose build && docker-compose up


5/ Przy pierwszym uruchomieniu aplikacji, baza danych zostanie zainicjalizowana plikiem “init.sql”. Na podstawie bazy danych, Sequelize utworzy nasze modele. Ponieważ docker nie ma natywnego mechanizmu pozwalającego nam zsynchronizować ten proces,  po inicjalizacji bazy danych powinniśmy zrestartować kontener backend!. Mamy wtedy pewność, że baza została zainicjalizowana przed próbą wygenerowania modeli przez Sequelize. Wymagane to jest tylko w przypadku pustej bazy danych. Kolejne uruchomienia aplikacji powinny przebiegać bez problemu

# Wymagania funkcjonalne:

1.  Integracja z Google Maps: Wyświetlanie mapy z zaznaczonymi lokalizacjami festiwali muzycznych.
    
2.  Filtracja Datowa: Możliwość wyboru zakresu dat festiwali za pomocą suwaka czasu (sliding timeline).
    
3.  Filtracja według Gatunku Muzycznego: Opcja filtrowania festiwali na podstawie ich gatunku muzycznego.
    
4.  Zapisywanie Ulubionych: Umożliwienie użytkownikom zapisywania festiwali do listy ulubionych.
    
5.  Filtracja Tylko Ulubione: Możliwość filtrowania mapy, aby pokazywała tylko ulubione festiwale.
    
6.  Proces Logowania i Rejestracji: System logowania i rejestracji dla użytkowników, umożliwiający personalizację i zapisywanie ustawień.
    
7.  Interakcja z Użytkownikiem: Funkcjonalności umożliwiające użytkownikom interakcję z mapą, np. klikanie na festiwale dla uzyskania szczegółowych informacji.
    
8.  Responsywność: Aplikacja powinna być dostosowana do różnych rozmiarów ekranu i urządzeń.
    
9.  Zabezpieczenia: Zapewnienie bezpieczeństwa danych użytkownika i zabezpieczeń przed nieautoryzowanym dostępem.
    

# Technologie:


Zdecydowaliśmy się na architekturę klient-serwer. Backend jest napisany obiektowo i korzysta z techniki ORM.

  

Frontend (klient) - React.js

  

Backend(serwer)  - Express.js, PostgreSQL

  

Technologie wspierające:

  

Docker - uruchamianie serwisów Frontend, Backend i Database

  

Sequelize - generowanie modeli na podstawie tabel PostgreSQL

  

Swagger - generowanie dokumentacji API

  

Używane biblioteki:

  

Frontend

  
fontawesome - gwiazdka “ulubione”

validator - walidacja formatu email

multi-range-slider-react - suwak z datą

react-google-maps - ułatwienie pracy z API google maps

  

Backend

  

cors - obsługa cors

jswonwebtoken - generowanie i weryfikacja tokenów JWT

cookie - obsługa cookies do przechowywania tokenu JWT

cookie-parser - parsowanie cookies

pg - do debuggowania

  

# Dokumentacja API (Swagger):

![](https://lh7-us.googleusercontent.com/eUac0UIU8pPCOLgjIcyLICZGbsLJWeVKXgxdt9tm6E9Tuq9pbyBYuvMtLUDLwGD5NIzc5Udx5q6uvYcc5SorB6R1fPpoo-YvoOsayh_U62z4Ap9cr4xNGrIuEKeTspWRqD1CgyxAPTrvfwCQhAIZXio)


# Screeny aplikacji:

![](https://lh7-us.googleusercontent.com/kf0yDtGZLHzvOTrGLAjqg1dTT8mRw--06S0qAjmXtLYMOZEvKeab6ibU2YroQbQ8SoyKb9UHXP6SAL7vZc_h8jCKCpY0Sy8gZr_DeEFlRneDBOvj-Sh8BKpuL7AS6-SgD2EGONrGRtrlCnpgGUBn5Sc)

Widok domyślny

![](https://lh7-us.googleusercontent.com/lXfD8at1PebE2KZs0cW-V5OojHA-9aE0HF8ESSOXsirzIW4X_Y2jaIBKV3UDPmkar5vffZBT9YYY2-iYgTLobD07qNT0J31IAniqxgcl_CIXPlMRA-h-b-3oF2Ot_h9Y6p62mX3HkXb4F2Isfdb3-EM)

Menu filtrowania po gatunkach muzycznych

![](https://lh7-us.googleusercontent.com/bACusLeRQrr_fCiBXtZBE4i2kEyRejoizptfaXAy2bnCCrNEs1_RP65IvwuTG86osFjY8idNTUDKb0g3-it9vvnppQxhj4SBocsNrKQjC5vhw8rEZToGCcOkcM3HYlPnhB1F0Zljfs95ul2RVb1WJxA)

Menu Logowania

![](https://lh7-us.googleusercontent.com/e5TYzJSn0oCReK4rceAXf4JfELBAibhV0xVNkdHIXNE4AIEfKxAZQBReOBKGKTgOyA-pLkZBHgl130YjBezGhTRXwPyXPIsWiu7Kr8oNVEy6L6Q_EE9HOjOv-540xhkhaBYIOVcZzAca9SY7uCaWYDw)

Menu rejestracji

![](https://lh7-us.googleusercontent.com/a2n5G44TJDyw_To_zk0IWm8MOWgTtMC52VOMciRyMhrS2acXtJHg-zGrdg_qm5rv3704Snn4UFSfwMGTZTd6SsTrf7AwrIRTeHaI65exHM6KytFrwt189hJ6ZxVzgG8RxVUfFmnhoLLe830jXn_Kfnk)

Test responsywności - wszystkie elementy są widoczne i łatwo obsługiwalne
