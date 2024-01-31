## Endpoints

* [AUTH](#auth)
    1. [ADMIN LOGIN](#1-admin-login)
    1. [USER LOGIN](#2-user-login)
    1. [USER REGISTER](#3-user-register)
    1. [ADMIN REGISTER](#4-admin-register)
* [TRANSACTION](#transaction)
    1. [GET TRANSACTION HISTORY](#1-get-transaction-history)
* [ADMIN](#admin)
    1. [VERIFY USER](#1-verify-user)
    1. [REJECT USER](#2-reject-user)
    1. [GET USERS](#3-get-users)
    1. [GET UNVERIFIED USERS](#4-get-unverified-users)
* [GEO-LOCATION DATA](#geo-location-data)
    1. [New Request](#1-new-request)

--------



## AUTH



### 1. ADMIN LOGIN



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{API_URI}}/auth/login/admin
```



***Body:***

```js
{
    "phoneNumber": "9876543210",
    "password": "Newadmin"
}
```



### 2. USER LOGIN



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{API_URI}}/auth/login
```



***Body:***

```js
{
    "phoneNumber": "908762341",
    "password": "nichaGurung"
}
```



### 3. USER REGISTER



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{API_URI}}/auth/register
```



***Body:***

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



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{API_URI}}/auth/register/admin/
```



***Body:***

```js
{
    "username": "Pramis Gurung",
    "phoneNumber": "98765434210",
    "email" : "gurunpramis@tst2.com",
    "password": "Newadmin"
}
```
