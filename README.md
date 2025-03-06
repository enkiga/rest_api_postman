# Rest API with Postman

## How to Run the Application

1. **Clone the repository**:

    ```sh
    git clone "https://github.com/enkiga/rest_api_postman"
    cd rest_api_postman
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Create a `.env` file in the `config` directory** and add your MongoDB URI:

    ```env
    // config/.env

    MONGO_URI="your_mongodb_uri"
    ```

4. **Start the server**:

    ```sh
    node Server.js
    ```

5. **Server will be running on** ```http://localhost:3000```

## Testing with Postman

### Create User (POST)

- **URL**: `http://localhost:3000/users`
- **Body (raw JSON)**:

    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    }
    ```

### Get All Users (GET)

- **URL**: `http://localhost:3000/users`

### Update User (PUT)

- **URL**: `http://localhost:3000/users/<user-id>`
- **Body (raw JSON)**:

    ```json
    {
      "age": 31
    }
    ```

### Delete User (DELETE)

- **URL**: `http://localhost:3000/users/<user-id>`

### Example Request

- **Method**: POST
- **URL**: `http://localhost:3000/users`
- **Body**:

    ```json
    {
      "name": "Sam",
      "email": "sam@gmail.com",
      "age": 24
    }
    ```

- **Headers**:
  
  - `Content-Type`: `application/json`
