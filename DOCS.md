# RESTFUL API

**Note:** The `{{API_URL}}` denotes the base url corresponding to either the local API url or the hosted url.

-   For local `{{API_URL}} : http://localhost:8000/api/v1`
-   For remote `{{API_URL}} : https://sahaj-yatra-api.onrender.com/api/v1`

# SAHAJ YATRA API

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

-   [AUTH](#auth)
    1. [ADMIN LOGIN](#1-admin-login)
    1. [USER LOGIN](#2-user-login)
    1. [USER REGISTER](#3-user-register)
    1. [ADMIN REGISTER](#4-admin-register)
    1. [SUPERADMIN LOGIN](#5-superadmin-login)
-   [TRANSACTION](#transaction)
    1. [GET TRANSACTION HISTORY](#1-get-transaction-history)
    1. [KHALTI TRANSACTION](#2-khalti-transaction)
-   [USERS](#users)
    1. [GET UNVERIFIED USERS](#1-get-unverified-users)
    1. [GET ALL USERS](#2-get-all-users)
    1. [UPDATE USER INFO](#3-update-user-info)
    1. [DELETE USER](#4-delete-user)
    1. [DEDUCT FARE](#5-deduct-fare)
    1. [VERIFY USER](#6-verify-user)
    1. [GET VERIFIED USERS](#7-get-verified-users)
    1. [GET INDIVIDUAL USER](#8-get-individual-user)
-   [BUS](#bus)
    1. [GET BUS LOCATION](#1-get-bus-location)
    1. [UPDATE BUS LOCATION](#2-update-bus-location)
    1. [REGISTER BUS](#3-register-bus)
    1. [GET ALL BUSES](#4-get-all-buses)
    1. [GET INDIVIDUAL BUS](#5-get-individual-bus)

---

## AUTH

### 1. ADMIN LOGIN

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/auth/login/admin
```

**_Body:_**

```js
{
    "phoneNumber": "98765434210",
    "password": "Newadmin"
}
```

### 2. USER LOGIN

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/auth/login/
```

**_Body:_**

```js
{
    "phoneNumber": "90871632494",
    "password": "nichaGurung"
}
```

### 3. USER REGISTER

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/auth/register
```

**_Body:_**

```js
{
    "username":"Pramis Gurung",
    "email" : "gurungpramaish@test2.com",
    "phoneNumber": "90871632494",
    "citizenshipNumber": "44-01-2-234",
    "password": "nichaGurung"
}
```

### 4. ADMIN REGISTER

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/auth/register/admin/
```

**_Body:_**

```js
{
    "username": "Pramis Gurung",
    "phoneNumber": "98765434210",
    "email" : "gurunpramis@tst2.com",
    "password": "Newadmin"
}
```

### 5. SUPERADMIN LOGIN

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/auth/login/superadmin
```

**_Body:_**

```js
{
    "email":"superadmin@test.com",
    "password": "AdminPassword"
}
```

## TRANSACTION

### 1. GET TRANSACTION HISTORY

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URI}}
```

### 2. KHALTI TRANSACTION

**_Endpoint:_**

```bash
Method: GET
Type:
URL:
```

## USERS

### 1. GET UNVERIFIED USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/unverified
```

### 2. GET ALL USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user
```

### 3. UPDATE USER INFO

**_Endpoint:_**

```bash
Method: PUT
Type:
URL: {{API_URL}}/user/<userid>
```

### 4. DELETE USER

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL:
```

### 5. DEDUCT FARE

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/deductfare
```

**_Query params:_**

| Key       | Value        | Description |
| --------- | ------------ | ----------- |
| rfid      | 83492-q23401 |             |
| latitude  | 28.1615954   |             |
| longitude | 84.0473208   |             |

### 6. VERIFY USER

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/user/65c76e7f88927729d424371e/verify
```

**_Body:_**

```js
{
    "rfidNumber": "83492-q23401"
}
```

### 7. GET VERIFIED USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/verified
```

### 8. GET INDIVIDUAL USER

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/65c75f5a493432f2e63553cb
```

## BUS

### 1. GET BUS LOCATION

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus/65c79874fafbad6c62efcd27/location
```

### 2. UPDATE BUS LOCATION

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus
```

### 3. REGISTER BUS

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/bus
```

**_Body:_**

```js
{
    "busNumber":"Ga 1 Kha 903",
    "busType": "Mini Bus",
    "busRoute": "Lamachaur - chhorepatan",
    "busSeats": 36
}
```

### 4. GET ALL BUSES

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus
```

### 5. GET INDIVIDUAL BUS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus/65c79775fafbad6c62efcd23
```

---

[Back to top](#sahaj-yatra-api)

> Generated at 2024-02-11 19:57:09 by [docgen](https://github.com/thedevsaddam/docgen)
