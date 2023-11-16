## API Endpoints

### LOGIN & PENGECEKAN

#### LOGIN

**Request:**

- Metode: POST
- Endpoint: `https://pqxqvp7z-5000.asse.devtunnels.ms/user`
- Required Token: ❌ No
- Admin Only: ❌ No 

**Contoh Request:**
```json

{
    "username": "username",
    "email": "email@gmail.com",
    "avatar": "!! ini link yang diambil dari laravel mas shadika !!"
}
```

**Response:**

```json
{"success":true,"message":"User created successfully"}

```

#### PENGECEKAN EMAIL

**Request:**

- Metode: GET
- Endpoint: `https://pqxqvp7z-5000.asse.devtunnels.ms/checkEmail/${email}`
- Required Token: ❌ No
- Admin Only: ❌ No 

**Response:**

```json
{"id":"14","username":"L","email":"ccdplayerx@gmail.com", "avatar": "dawda"}

```

