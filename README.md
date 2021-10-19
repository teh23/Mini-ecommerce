# Instalacja

```
git clone https://github.com/teh23/Mini-ecommerce
.git
cd ./Mini-ecommerce && npm install
DB_URL="<MONGODB_URL>" npm run dev
```

## [Preview](https://powerful-eyrie-28917.herokuapp.com)

# Mini platforma e-commerce

## usecases:
- Platforma zawiera dwa modele danych -> model produktu oraz model zamówień złożonych na platformie.
- Platforma  powinien mieć przyjazną dla użytkownika warstwę frontendową.
- Platforma  powinien udostępniać `REST API` 
- Każdy produkt na platformie  ma swoją nazwę, cenę, liczbę sztuk dostępnych w magazynie oraz unikalny identyfikator.
- Proces zamówienia na warstwie frontendowej odbywa się poprzez kliknięcie przycisku pod produktem `ZAMÓW TERAZ`.
- Jeżeli brakuje produktu w magazynie przycisk `ZAMÓW TERAZ` powinien być zablokowany. (W razie problemów z synchronizacją powinien pokazywać się odpowiedni komunikat)
- Klient powinien móc zamówić dowolną liczbę sztuk danego produktu (która oczywiście jest mniejsza bądź równa niż liczba sztuk dostępnych w magazynie)

Jakiekolwiek zmiany w bazie  (np. aktualizacja stanu magazynowego) powinny się pokazywać `w czasie rzeczywistym` w przeglądarce.

# Polecenia API:

## Składanie zamówień

```http
POST /order
```

Przykład zapytania:

```js
{
  "productId": 15,
  "quantity": 1
}
```

Oczekiwane odpowiedzi:

-   `200 OK` - Produkt został poprawnie zakupiony
-   `404 Not Found` - Produkt nie został znaleziony
-   `400 Bad Request` - Nie ma tylu sztuk w magazynie

Odpowiedź zwrotna powinna być w formacie JSON. W przypadku sukcesu należy zwrócić pole `orderId`, a w przypadku błędów pole `message` z odpowiednim dokładnym opisem.

## Szczegółowe informacje dot. zamówienia

```http
GET /order/{orderId}
```

Oczekiwane odpowiedzi:

-   `200 OK`
-   `404 Not Found`

## Szczegółowe informacje na temat produktu

```http
GET /product/{productId}
```

Oczekiwane odpowiedzi:

-   `200 OK`
-   `404 Not Found`

## Wszystkie produkty na platformie 

```http
GET /products
```

Oczekiwane odpowiedzi:
`200 OK`


# Instrukcja Magazynu

Adres Websocketa:
`wss://shielded-escarpment-92522.herokuapp.com/`

_Cała komunikacja z magazynem jest asynchroniczna_

1. Podczas rozpoczęcia sesji magazyn wysyła informacje o produktach, które trzeba dodać do platformy.

    Przykład wiadomości po rozpoczęciu połączenia:

    ```js
    [
      {
        "productId": 1769,
        "name": "ogromny wóz",
        "price": 88279, // wszystkie ceny są w groszach
        "stock": 28757
      },
      {
        "productId": 1770,
        "name": "zły odtwarzacz mp3",
        "price": 49927,
        "stock": 32387
      }
      ...
    ]
    ```

2. Jeżeli pojawi się zamówienie na platformie poinformuj magazyn wysyłając wiadomość poprzez Websocket.

    Przykład wiadomości:

    ```js
    {
      "operation": "product.stock.decrease",
      "correlationId": "SOME ID", // tutaj powinno znaleźć się wygenerowane przez Ciebie unikalne id
      "payload": {
        "productId": 123, // id produktu
        "stock": 100 // ile sztuk zostało zamówionych
      }
    }
    ```

    Odpowiedź, którą może wysłać Websocket po jakimś czasie:

    ```js
    {
      "operation": "product.stock.decreased",
      "correlationId": "SOME ID", // Odsyłamy id, które przesłałeś
      "payload": {
        "productId": 123,
        "stock": 1235 // liczba sztuk pozostałych w magazynie
      }
    }
    ```

    Odpowiedź z błędem, które wysyła Websocket jeśli pójdzie coś nie tak (np. stock produktu wynosił 0)

    ```js
    {
      "operation": "product.stock.decrease.failed",
      "correlationId": "SOME ID",
      "payload": {
        "error": true,
        "message": "example error message"
      }
    }
    ```

3. Jeżeli pojawia się zamówienie _spoza platformy_  w magazynie to magazyn wysyła informację:

    ```js
    {
      "operation": "product.stock.decreased",
      "correlationId": "89e3e2e7-8fa6-43ac-96d1-157e3a96b31e", // tutaj jest losowy UUID
      "payload": {
        "productId": 123,
        "stock": 1235 // liczba sztuk pozostałych w magazynie
      }
    }
    ```

4. Magazyn co jakiś czas zmienia stocki swoich produktów, kiedy to robi wysyła informację:
    ```js
    {
      "operation": "product.stock.updated",
      "correlationId": "89e3e2e7-8fa6-43ac-96d1-157e3a96b31e",
      "payload": {
        "productId": 123,
        "stock": 10000 // liczba nowych sztuk w magazynie
      }
    }
    ```

