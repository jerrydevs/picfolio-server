## **Register a User**
Registers a new user 

**URL**

  /api/users

**Method:**

  `POST`

**URL Params**

  None

**Data Params**

  ```javascript
  { 
    name: String,       // user's full name
    email: String,      // user email
    password: String    // user password
  }
  ```

**Success Response:**

  **Code:** 200 <br />
  **Content:** `{ token: "tokenStringHere" }`

 **Error Response:**

  **Code:** 400 <br />
  **Content:** `{ msg: "That user already exists" }`

OR

  **Code:** 500 <br />
  **Content:** `Server Error`

**Sample Call:**

```javascript
axios.put('/api/users', {
  name: "John Smith",
  email: "john@example.com",
  password: "123456"
})
```


## **Delete a User**
Permanently deletes a user from the database

**URL**

  /api/users

**Method:**

  `DELETE`

**URL Params**

  None

**Data Params**

  `{ auth-token: "tokenStringHere" }`

**Success Response:**

  **Code:** 200 <br />
  **Content:** `{ msg: 'User Deleted' }`

 **Error Response:**

  **Code:** 500 <br />
  **Content:** `Server Error`

**Sample Call:**

```javascript
axios.delete('/api/users', {
  headers: {
    auth-token: 'tokenStringHere'
  }
});
```


## **Get Users**
Retrieve all users in the database
NOTE: For testing purposes only

**URL**

  /api/users

**Method:**

  `GET`

**URL Params**

  Non

**Data Params**

  None

**Success Response:**

  **Code:** 200 <br />
  **Content:** `{ users: [array of users] }`

 **Error Response:**

  **Code:** 500 <br />
  **Content:** `Server Error`

**Sample Call:**

```javascript
axios.get('/api/users');
```