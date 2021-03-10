## **Authenticate User**

Returns JWT token, expiration 1 hour

**URL**
`/api/auth`

**METHOD**

`POST`

**URL PARAMS**

    None

**Data Params**

`{ email: String // user email, password: String // user password }`

**Success Response**

**Code:** 200 <br />
**Content:** `{ token: "tokenStringHere" }`

**Error Response:**

**Code:** 400 <br />
**Content:** `{ msg: 'Invalid Credentials' }`

OR

**Code:** 500 <br />
**Content:** `Server Error`

**Sample Call:**

```javascript
axios.post('/', {
  email: 'john@example.com',
  password: '123456'
});
```
