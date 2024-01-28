# Car API Spec

## Create Car API

Endpoint : POST /api/cars

Headers :

- Authorization : token

Request Body :

```json
{
  "merek": "merek apa",
  "model": "model apa",
  "tahun_produksi": "kapan tahun produksi",
  "warna": "warna apa",
  "bahan_bakar": "bahan bakar apa",
  "kilometer_tempuh": "berapa kilometer tempuh"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "merek": "merek apa",
    "model": "model apa",
    "tahun_produksi": "kapan tahun produksi",
    "warna": "warna apa",
    "bahan_bakar": "bahan bakar apa",
    "kilometer_tempuh": "berapa kilometer tempuh"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Car API

Endpoint : PUT /api/cars/:carId

Headers :

- Authorization : token

Request Body :

```json
{
  "merek": "merek apa",
  "model": "model apa",
  "tahun_produksi": "kapan tahun produksi",
  "warna": "warna apa",
  "bahan_bakar": "bahan bakar apa",
  "kilometer_tempuh": "berapa kilometer tempuh"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "merek": "merek apa",
    "model": "model apa",
    "tahun_produksi": "kapan tahun produksi",
    "warna": "warna apa",
    "bahan_bakar": "bahan bakar apa",
    "kilometer_tempuh": "berapa kilometer tempuh"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Car API

Endpoint : GET /api/cars/:carId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "merek": "merek apa",
    "model": "model apa",
    "tahun_produksi": "kapan tahun produksi",
    "warna": "warna apa",
    "bahan_bakar": "bahan bakar apa",
    "kilometer_tempuh": "berapa kilometer tempuh"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## List Cars API

Endpoint : GET /api/cars

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "merek": "merek apa",
      "model": "model apa",
      "tahun_produksi": "kapan tahun produksi",
      "warna": "warna apa",
      "bahan_bakar": "bahan bakar apa",
      "kilometer_tempuh": "berapa kilometer tempuh"
    },
    {
      "id": 1,
      "merek": "merek apa",
      "model": "model apa",
      "tahun_produksi": "kapan tahun produksi",
      "warna": "warna apa",
      "bahan_bakar": "bahan bakar apa",
      "kilometer_tempuh": "berapa kilometer tempuh"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Remove Car API

Endpoint : DELETE /api/cars/:carId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "car is not found"
}
```
