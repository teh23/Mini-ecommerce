# Wstęp do zadania rekrutacyjnego - Erli

Stwórz mini platformę e-commerce - nazwijmy ją dla uproszczenia `MEC`. 

MEC zawiera dwa modele danych -> model produktu oraz model zamówień złożonych na platformie.

MEC powinien mieć przyjazną dla użytkownika warstwę frontendową.

MEC powinien udostępniać `REST API` (Polecenia `API-MEC` wymienione są niżej).

Każdy produkt na platformie MEC ma swoją nazwę, cenę, liczbę sztuk dostępnych w magazynie oraz unikalny identyfikator.

Proces zamówienia na warstwie frontendowej odbywa się poprzez kliknięcie przycisku pod produktem `ZAMÓW TERAZ`.

Jeżeli brakuje produktu w magazynie przycisk `ZAMÓW TERAZ` powinien być zablokowany. (W razie problemów z synchronizacją powinien pokazywać się odpowiedni komunikat)

Klient powinien móc zamówić dowolną liczbę sztuk danego produktu (która oczywiście jest mniejsza bądź równa niż liczba sztuk dostępnych w magazynie)

Jakiekolwiek zmiany w bazie `MEC` (np. aktualizacja stanu magazynowego) powinny się pokazywać `w czasie rzeczywistym` w przeglądarce.

# Polecenia API-MEC:

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
- `200 OK` - Produkt został poprawnie zakupiony
- `404 Not Found` - Produkt nie został znaleziony
- `400 Bad Request` - Nie ma tylu sztuk w magazynie

Odpowiedź zwrotna powinna być w formacie JSON. W przypadku sukcesu należy zwrócić pole `orderId`, a w przypadku błędów pole `message` z odpowiednim dokładnym opisem.

## Szczegółowe informacje dot. zamówienia

```http
GET /order/{orderId}
```

Oczekiwane odpowiedzi:
- `200 OK`
- `404 Not Found`

## Szczegółowe informacje na temat produktu

```http
GET /product/{productId}
```

Oczekiwane odpowiedzi:
- `200 OK`
- `404 Not Found`

## Wszystkie produkty na platformie MEC

```http
GET /products
```

Oczekiwane odpowiedzi:
`200 OK`

# Wymagania dotyczące realizacji zadania

1. Kod do rozwiązania umieść na prywatnym repozytorium na Github / GitLab / BitBucket, do którego udostępnisz nam później dostęp.
2. Plusem będzie deployment aplikacji na np. Heroku / GCP / AWS.
3. W README.md powinny zawierać się informację na temat tego jak odpalić MEC. (Może być tutaj instrukcja do odpalenia poprzez docker-compose / docker swarm / kubernetesa)
4. Rozwiązanie powinno być napisane przy użyciu języka `javascript` lub `typescript`. Baza danych, którą sobie wybierzesz zależy od Ciebie (polecamy MongoDB, ale nie stanie się nic złego jak zrobisz to w np. inmemory db)
5. Musisz skorzystać z naszego magazynu, który jest dostępny poprzez Websocketa.

# Instrukcja Magazynu

Adres naszego Websocketa:<br />
`wss://mec-storage.herokuapp.com`

*Cała komunikacja z magazynem jest asynchroniczna*

1. Podczas rozpoczęcia sesji magazyn wysyła informacje o produktach, które trzeba dodać do platformy `MEC`.

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

2. Jeżeli pojawi się zamówienie na platformie `MEC` poinformuj magazyn wysyłając wiadomość poprzez Websocket.

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
3. Jeżeli pojawia się zamówienie *spoza platformy* `MEC` w magazynie to magazyn wysyła informację:

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

# Nieobowiązkowo
1. Stwórz prosty leaderboard najlepiej sprzedających się produktów. <br/>Dodaj tym samym nowy endpoint w `API-MEC`

    ```http
    GET /products/hot-deals
    ```
