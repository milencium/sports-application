# Sports-Organization

## _TS, Node, Nest, Prisma, Postgres_

- Validacije: Nest Pipes
- Dokumentacija: OpenApi

[![](https://blog.logrocket.com/wp-content/uploads/2020/01/containerized-development-nestjs-docker.jpeg)](http://https://blog.logrocket.com/wp-content/uploads/2020/01/containerized-development-nestjs-docker.jpeg)

> Error handlere sam koristio iz frameworka
> S obzirom da su mi servisi ansikroni, tu sam zaljepio interfejse na Promise, dok je na kontrolerima validiran request

## Postman kolekcija:

Unutar foldera “postman" se nalazi kolekcija koja bi trebala omogućiti lakše testiranje, može se importati u Postmana,
Nakon registracije i njene potvrde na mailu, slijedi Login,
nakon Logina potrebno dobiveni cijeli Bearer token prosljediti
kao varijablu u postavkama kolekcije, authToken, i odabrati "Persist" i "Save" sa desne strane, za slučaj da se otvori sa desne strane Documentation side bar, potrebno ga je zatvoriti jer će prekriti Save button
ta varijabla je već dodana u sve protected, tj. admin rute da se ne mora svaki puta postavljati cijeli token
u pojedinu rutu

U većinu ruta je potrebno dodati odgovarajući ParamsId, a u neke Qurey

## Database

DB relacije se mogu vidjeti u schema.prisma fileu unutar prisma foldera:

[User, Enrolled] = 1:many
[User, CommentRating] = 1:many
[Sports, Class] = 1:many
[Class, Enrolled] = 1:many
[Class, CommentRating] = 1:many

## Setup projekta:

Nakon preuzimanja projekta u folderu projekta potrebno je odraditi sljedeće korake:

- instalirati npm module sa:

```sh
npm i
```

Prema mome iskustvu, ako se koristi Mac u .env za "dbhost” kod DATABASE_URL:
"postgresql://postgres:postgres@dbhost:5411/sportsdb?connect_timeout=300"
potrebno je postaviti

```sh
host.docker.internal
```

u slučaju da se koristi Linux, za “dbhost” je potrebno postaviti ime kontenjera baze tj. u ovom slučaju to ime je

```sh
postgres-db
```

dok je ime servisa: db, prema docker-compose.yml fileu

- Također za svaki slučaj potrebno je promjeniti dbhost u deafultnim vrijednostima DATABASE_URL-a u docker-compose.ymlu za kontenjer

## Dockerized Node + Dockerized DB:

Da bi se izbjeglo ulaženje u app kontenjer i runnanje migracija i seedanja sa:

```sh
docker exec -it app npx prisma migrate dev
docker exec -it app nix prisma db seed
```

Dodan je novi kontenjer: "migration", koji vrši te naredbe
samo je potrebno pokrenuti sljedeću naredbu(nisam koristio -d flag, kako bi se pratilo kreiranje svega, pa i migracija ):

```sh
1. docker-compose --profile migration up
```

Te otvoriti prisma studio u novom terminalu sa:

```sh
2. docker exec -it app npx prisma studio
```

otvoriti link localhost:5555 da bi se otvorio prisma studio s obzirom da je taj port exposan u docker composeu

## Codebase + Dockerized DB:

U slučaju da trenutni "docker-compose.yml" ne radi,
potrebno je iskoristi "docker-compose-databaseonly.yml" i promjeniti mu ime u docker-compose.yml
kako bih njega iskoristili te bi imali ne dokerizirani codebase + dockerizirani postgres database
(nisam koristio -d flag, kako bi se pratilo kreiranje kontenjera)

```sh
1. docker compose up
```

potrebno je iz codebase odraditi migracije,
u drugom terminalu:

```sh
2.
npx prisma migrate dev
npx prisma db seed
npx prisma studio
```

otvoriti link localhost:5555 da bi se otvorio prisma studio s obzirom da je taj port exposan u docker composeu
Također može se spojiti i na docker db preko PgAdmina

- ##### Dokumentacija: http://localhost:8080/api (ovo je moglo i bolje)

## Primjer:

- Kako bi bili admin, potrebno se je registrirati sa username-om : admin5
  Protected tj. Admin rute su definirane u app.module.ts-u korištenjem isAdminMiddleware-a

- Nakon toga potrebno je slati pozive na razne rute,
  većinom su korišteni req.params i req.body, dok je rjeđe korišten req.query

- Prilikom user enrollmenta u određeni class, potrebno je unijeti kao parametar /:userId te /:classId, mogu se izčitati iz baze,
  također potrebno je za body staviti npr. {“termin” : 9} ako se radi o classu sa terminom 5-9, tj. morning class,
  ako se radi o classu sa terminom 16-21, tj. afternoon class potrebno je staviti npr. {“termin” : 19}
  odabrani termin mora upasti u range brojeva termina
  Također, kako bi se user enrollao u class termin potrebno je da njegova kategorija prilikom registracije odgovara kategoriji termina

- Prilikom postavljanja komentara, korištena je vezna tablica između classa i usera, te parametar /:enrolledId, kako bi bili sigurni da samo enrollani useri mogu ostavljati komentar
  Izračunat je prosječni rating classa također
