# RESTFUL API

**Note:** The `{{API_URL}}` denotes the base url corresponding to either the local API url or the hosted url.

- For local `{{API_URL}} : http://localhost:8000/api/v1`
- For remote `{{API_URL}} : https://sahaj-yatra-api.onrender.com/api/v1`

# SAHAJ YATRA API

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

- [AUTH](#auth)
  1. [ADMIN LOGIN](#1-admin-login)
  1. [USER LOGIN](#2-user-login)
  1. [USER REGISTER](#3-user-register)
  1. [ADMIN REGISTER](#4-admin-register)
  1. [SUPERADMIN LOGIN](#5-superadmin-login)
- [TRANSACTION](#transaction)
  1. [GET TRANSACTION HISTORY](#1-get-transaction-history)
  1. [KHALTI TRANSACTION](#2-khalti-transaction)
- [USERS](#users)
  1. [GET UNVERIFIED USERS](#1-get-unverified-users)
  1. [GET ALL USERS](#2-get-all-users)
  1. [UPDATE USER INFO](#3-update-user-info)
  1. [DELETE USER](#4-delete-user)
  1. [DEDUCT FARE](#5-deduct-fare)
  1. [VERIFY USER](#6-verify-user)
  1. [GET VERIFIED USERS](#7-get-verified-users)
  1. [GET INDIVIDUAL USER](#8-get-individual-user)
- [BUS](#bus)
  1. [GET BUS LOCATION](#1-get-bus-location)
  1. [UPDATE BUS LOCATION](#2-update-bus-location)
  1. [REGISTER BUS](#3-register-bus)
  1. [GET ALL BUSES](#4-get-all-buses)
  1. [GET INDIVIDUAL BUS](#5-get-individual-bus)

---

## Accessing protected routes

Super admin will have access to every endpoints. For the rest user types the API will throw forbidden (403) when trying to access unauthorized routes.

For endpoints requiring authentication and authorization include Authorization headers in your requests. The general pattern of doing such is:

| Key           | Value                                                            | Description                                 |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJlMGJiOTY1 | include the token obtained while logging in |

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

**_Response:_**

```js
{
    "message": "Admin Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV
    "role": "busOwner"
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

**_Response:_**

```js
{
    "message": "User Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9,
    "role": "user"
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
    "username":"Tester Gurung",
    "email" : "test99@test2.com",
    "phoneNumber": "913431492342",
    "citizenshipNumber": "44-02-234",
    "password": "newpasss"
}
```

**_Response:_**

```js
{
    "message": "User Created",
    "data": {
        "username": "Tester Gurung",
        "email": "test99@test2.com",
        "phoneNumber": "913431492342",
        "citizenshipNumber": "44-02-234",
        "password": "",
        "amount": 0,
        "onBoard": false,
        "location": {
            "lastLatitude": 0,
            "lastLongitude": 0,
            "currentLatitude": 0,
            "currentLongitude": 0
        },
        "isVerified": false,
        "_id": "userid",
        "createdAt": "2024-02-11T14:42:28.867Z",
        "updatedAt": "2024-02-11T14:42:28.867Z",
        "__v": 0
    }
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

**_Response:_**

```js
{
    "message": "New Bus Owner registered successfully.",
    "data": {
        "username": "Sahuji gurung",
        "email": "sahuji@tst2.com",
        "phoneNumber": "981234142",
        "password": "",
        "buses": [],
        "_id": "65c8dd53f8bec50a38e90944",
        "createdAt": "2024-02-11T14:44:35.183Z",
        "updatedAt": "2024-02-11T14:44:35.183Z",
        "__v": 0
    }
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
    "password": "pasqw1233"
}
```

**_Response:_**

```js
{
    "message": "Super Admin Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
    "role": "superAdmin"
}
```

### 6. GET USER INFO FROM TOKEN

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/info
```

**_Headers:_**

| Key           | Value                                                                                                                                                                                                | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yzc2ZTdmODg5Mjc3MjlkNDI0MzcxZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4NzA2MjkxLCJleHAiOjE3MDg3OTI2OTF9.1_sY8OROmv6XcL9-HbDgTm1S0D2qvPHhi5iUXXqhq4I |             |

### 7. LOGOUT

**_Endpoint:_**

```bash
Method: POST
Type:
URL: {{API_URL}}/auth/logout/
```

**_Headers:_**

| Key           | Value                                                                                                                                                                                                | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yzc2ZTdmODg5Mjc3MjlkNDI0MzcxZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MTI4MTI0LCJleHAiOjE3MDkyMTQ1MjR9.fQxGNIonNjkqnx5J4rKJdlmfAC4kAQ37AnQLjRvcA50 |             |

## TRANSACTION

### 1. GET TRANSACTION HISTORY

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URI}}/transaction/history
```

**_Headers:_**

| Key           | Value                                                                                                                                                                                                | Description |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yzc2ZTdmODg5Mjc3MjlkNDI0MzcxZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MTI4MTI0LCJleHAiOjE3MDkyMTQ1MjR9.fQxGNIonNjkqnx5J4rKJdlmfAC4kAQ37AnQLjRvcA50 |             |

**_Response:_**

```js
{
    "message": "Transaction History Fetched Successfully",
    "data": [
        {
            "_id": "65df3b4c9f869e5f29f7faef",
            "amount": 20,
            "userId": "65c76e7f88927729d424371e",
            "transactionDate": "2024-02-28T13:55:24.020Z",
            "transactionType": "debit",
            "remarks": "Bus Fare",
            "createdAt": "2024-02-28T13:55:24.024Z",
            "updatedAt": "2024-02-28T13:55:24.024Z",
            "__v": 0
        }
    ]
}
```

### 2. KHALTI TRANSACTION

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URI}}/transaction/verify-payment
```

_This should be integrated with frontend khalti implementation after khalti sends a idx at frontend._

## USERS

### 1. GET UNVERIFIED USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/unverified
```

**_Response:_**

```js
{
    "message": "Unverified Users fetched succesfully",
    "count": 1,
    "data": [
        {
            "_id": "65c8dcd4f8bec50a38e90940",
            "username": "Tester Gurung",
            "email": "test99@test2.com",
            "phoneNumber": "913431492342",
            "citizenshipNumber": "44-02-234",
            "amount": 0,
            "onBoard": false,
            "location": {
                "lastLatitude": 0,
                "lastLongitude": 0,
                "currentLatitude": 0,
                "currentLongitude": 0
            },
            "isVerified": false,
            "createdAt": "2024-02-11T14:42:28.867Z",
            "updatedAt": "2024-02-11T14:42:28.867Z",
            "__v": 0
        }
    ]
}
```

### 2. GET ALL USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user
```

**_Response:_**

```js
{
    "message": "Users fetched succesfully",
    "count": 2,
    "data": [
        {
            "_id": "65c76e7f88927729d424371e",
            "username": "Pramis Gurung",
            "email": "gurungpramaish@test2.com",
            "phoneNumber": "90871632494",
            "citizenshipNumber": "44-01-2-234",
            "amount": 402.940441936635,
            "onBoard": false,
            "location": {
                "lastLatitude": 28.2004436,
                "lastLongitude": 83.9822141,
                "currentLatitude": 28.1615954,
                "currentLongitude": 84.0473208
            },
            "isVerified": true,
            "createdAt": "2024-02-10T12:39:27.574Z",
            "updatedAt": "2024-02-10T14:25:15.267Z",
            "__v": 0,
            "rfidNumber": "83492-q23401"
        },
        {
            "_id": "65c8dcd4f8bec50a38e90940",
            "username": "Tester Gurung",
            "email": "test99@test2.com",
            "phoneNumber": "913431492342",
            "citizenshipNumber": "44-02-234",
            "amount": 0,
            "onBoard": false,
            "location": {
                "lastLatitude": 0,
                "lastLongitude": 0,
                "currentLatitude": 0,
                "currentLongitude": 0
            },
            "isVerified": false,
            "createdAt": "2024-02-11T14:42:28.867Z",
            "updatedAt": "2024-02-11T14:42:28.867Z",
            "__v": 0
        }
    ]
}
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
URL: {{API_URL}}/user/deductfare?rfid=12321-123&latitude=12&longitude=13
```

**_Query params:_**

| Key       | Value        | Description |
| --------- | ------------ | ----------- |
| rfid      | 83492-q23401 |             |
| latitude  | 28.1615954   |             |
| longitude | 84.0473208   |             |

**_Response:_**

```js
{
    "valid": true,
    "message": "Valid User",
    "newAmount": 402.940441936635
}

//OR depending on the passenger is entering or exiting the bus calculate and deduct fare

{
    "valid": true,
    "message": "Get out of the bus",
    "newAmount": 980.5335507038734
}
```

### 6. VERIFY USER

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{API_URL}}/user/65c8dcd4f8bec50a38e90940/verify
```

**_Body:_**

```js
{
    "rfidNumber": "91234302-1234ad"
}
```

**_Response:_**

```js
{
    "message": "RFID assigned to user",
    "data": {
        "_id": "65c8dcd4f8bec50a38e90940",
        "username": "Tester Gurung",
        "email": "test99@test2.com",
        "phoneNumber": "913431492342",
        "citizenshipNumber": "44-02-234",
        "amount": 0,
        "onBoard": false,
        "location": {
            "lastLatitude": 0,
            "lastLongitude": 0,
            "currentLatitude": 0,
            "currentLongitude": 0
        },
        "isVerified": true,
        "createdAt": "2024-02-11T14:42:28.867Z",
        "updatedAt": "2024-02-11T14:55:18.059Z",
        "__v": 0,
        "rfidNumber": "91234302-1234ad"
    }
}
```

### 7. GET VERIFIED USERS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/verified
```

**_Response:_**

```js
{
    "message": "Verified Users fetched successfully",
    "count": 2,
    "data": [
        {
            "_id": "65c76e7f88927729d424371e",
            "username": "Pramis Gurung",
            "email": "gurungpramaish@test2.com",
            "phoneNumber": "90871632494",
            "citizenshipNumber": "44-01-2-234",
            "amount": 980.5335507038734,
            "onBoard": false,
            "location": {
                "lastLatitude": 28.915954,
                "lastLongitude": 84.0473208,
                "currentLatitude": 28.915954,
                "currentLongitude": 84.0273208
            },
            "isVerified": true,
            "createdAt": "2024-02-10T12:39:27.574Z",
            "updatedAt": "2024-02-11T14:53:53.068Z",
            "__v": 0,
            "rfidNumber": "83492-q23401"
        },
        {
            "_id": "65c8dcd4f8bec50a38e90940",
            "username": "Tester Gurung",
            "email": "test99@test2.com",
            "phoneNumber": "913431492342",
            "citizenshipNumber": "44-02-234",
            "amount": 0,
            "onBoard": false,
            "location": {
                "lastLatitude": 0,
                "lastLongitude": 0,
                "currentLatitude": 0,
                "currentLongitude": 0
            },
            "isVerified": true,
            "createdAt": "2024-02-11T14:42:28.867Z",
            "updatedAt": "2024-02-11T14:55:18.059Z",
            "__v": 0,
            "rfidNumber": "91234302-1234ad"
        }
    ]
}
```

### 8. GET INDIVIDUAL USER

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/user/65c75f5a493432f2e63553cb
```

**_Response:_**

```js
{
    "message": "User fetched Succesfully",
    "data": {
        "_id": "65c76e7f88927729d424371e",
        "username": "Pramis Gurung",
        "email": "gurungpramaish@test2.com",
        "phoneNumber": "90871632494",
        "citizenshipNumber": "44-01-2-234",
        "amount": 980.5335507038734,
        "onBoard": false,
        "location": {
            "lastLatitude": 28.915954,
            "lastLongitude": 84.0473208,
            "currentLatitude": 28.915954,
            "currentLongitude": 84.0273208
        },
        "isVerified": true,
        "createdAt": "2024-02-10T12:39:27.574Z",
        "updatedAt": "2024-02-11T14:53:53.068Z",
        "__v": 0,
        "rfidNumber": "83492-q23401"
    }
}
```

## BUS

### 1. GET BUS LOCATION

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus/65c79874fafbad6c62efcd27/location
```

**_Response:_**

```js
{
    "message": "Current Bus location fetched",
    "data": {
        "latitude": 0,
        "longitude": 0
    }
}
```

### 2. UPDATE BUS LOCATION

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus/location?busId=65c79775fafbad6c62efcd23&latitude=28.2045&longitude=83.9849
```

**_Response:_**

```js
{
    "message": "Current Bus location updated.",
    "data": {
        "_id": "65c79775fafbad6c62efcd23",
        "busNumber": "Ga 1 Kha 983",
        "busType": "Mini Bus",
        "busRoute": "Lamachaur - chhorepatan",
        "busSeats": 36,
        "currentLocation": {
            "latitude": 28.2045,
            "longitude": 83.9849
        },
        "createdAt": "2024-02-10T15:34:13.791Z",
        "updatedAt": "2024-02-10T15:34:13.791Z",
        "__v": 0
    }
}
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
    "busNumber":"Ga 1 Kha 123",
    "busType": "Mini Bus",
    "busRoute": "Lamachaur - chhorepatan",
    "busSeats": 36
}
```

**_Response:_**

```js
{
    "message": "New Bus registered",
    "data": {
        "busNumber": "Ga 1 Kha 123",
        "busType": "Mini Bus",
        "busRoute": "Lamachaur - chhorepatan",
        "busSeats": 36,
        "currentLocation": {
            "latitude": 0,
            "longitude": 0
        },
        "_id": "65c8e13ea55a0840d13947e5",
        "createdAt": "2024-02-11T15:01:18.554Z",
        "updatedAt": "2024-02-11T15:01:18.554Z",
        "__v": 0
    }
}
```

### 4. GET ALL BUSES

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus
```

**_Response:_**

```js
{
    "message": "Buses fetched",
    "count": 3,
    "data": [
        {
            "_id": "65c79775fafbad6c62efcd23",
            "busNumber": "Ga 1 Kha 983",
            "busType": "Mini Bus",
            "busRoute": "Lamachaur - chhorepatan",
            "busSeats": 36,
            "currentLocation": {
                "latitude": 0,
                "longitude": 0
            },
            "createdAt": "2024-02-10T15:34:13.791Z",
            "updatedAt": "2024-02-10T15:34:13.791Z",
            "__v": 0
        },
        {
            "_id": "65c79874fafbad6c62efcd27",
            "busNumber": "Ga 1 Kha 903",
            "busType": "Mini Bus",
            "busRoute": "Lamachaur - chhorepatan",
            "busSeats": 36,
            "currentLocation": {
                "latitude": 0,
                "longitude": 0
            },
            "createdAt": "2024-02-10T15:38:28.019Z",
            "updatedAt": "2024-02-10T15:38:28.019Z",
            "__v": 0
        },
        {
            "_id": "65c8e13ea55a0840d13947e5",
            "busNumber": "Ga 1 Kha 123",
            "busType": "Mini Bus",
            "busRoute": "Lamachaur - chhorepatan",
            "busSeats": 36,
            "currentLocation": {
                "latitude": 0,
                "longitude": 0
            },
            "createdAt": "2024-02-11T15:01:18.554Z",
            "updatedAt": "2024-02-11T15:01:18.554Z",
            "__v": 0
        }
    ]
}
```

### 5. GET INDIVIDUAL BUS

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API_URL}}/bus/65c79775fafbad6c62efcd23
```

**_Response:_**

```js
{
    "message": "Bus fetched successfully",
    "data": {
        "_id": "65c79775fafbad6c62efcd23",
        "busNumber": "Ga 1 Kha 983",
        "busType": "Mini Bus",
        "busRoute": "Lamachaur - chhorepatan",
        "busSeats": 36,
        "currentLocation": {
            "latitude": 0,
            "longitude": 0
        },
        "createdAt": "2024-02-10T15:34:13.791Z",
        "updatedAt": "2024-02-10T15:34:13.791Z",
        "__v": 0
    }
}
```

---

[Back to top](#sahaj-yatra-api)

> Generated at 2024-02-11 19:57:09 by [docgen](https://github.com/thedevsaddam/docgen)
