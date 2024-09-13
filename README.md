# Resource API

This API provides a set of endpoints for managing resources. You can perform CRUD operations, search, sort, and paginate resources.

## Endpoints

### 1. Get All Resources

**GET** `/api/resources`

- **Query Parameters:**
  - `search`: (Optional) Search term to filter resources by name or description.
  - `sortBy`: (Optional) Field to sort by. Can be `name`, `description`, or `createdAt`.
  - `order`: (Optional) Sort order. Can be `asc` (ascending) or `desc` (descending).
  - `page`: (Optional) Page number for pagination. Default is `1`.
  - `limit`: (Optional) Number of items per page. Default is `5`.

- **Response:**
  ```json
  {
    "totalPages": 10,
    "currentPage": 1,
    "totalResources": 50,
    "resources": [
      // Array of resource objects
    ]
  }
Error Responses:
500 Server Error for general issues.



2. Get a Resource by ID
GET /api/resources/:id

Path Parameters:

id: (Required) ID of the resource.
Response:



{
  "_id": "1234567890abcdef",
  "name": "Resource Name",
  "description": "Resource Description",
  "createdAt": "2024-09-13T12:00:00Z",
  "updatedAt": "2024-09-13T12:00:00Z"
}
Error Responses:

404 Resource Not Found if the resource does not exist.
500 Server Error for general issues.



3. Create a New Resource
POST /api/resources

Request Body:


{
  "name": "New Resource",
  "description": "Description of the new resource"
}
Response:


{
  "_id": "1234567890abcdef",
  "name": "New Resource",
  "description": "Description of the new resource",
  "createdAt": "2024-09-13T12:00:00Z",
  "updatedAt": "2024-09-13T12:00:00Z"
}
Error Responses:

500 Server Error for general issues.




4. Update an Existing Resource
PUT /api/resources/:id

Path Parameters:

id: (Required) ID of the resource.
Request Body:



{
  "name": "Updated Resource Name",
  "description": "Updated description"
}
Response:

{
  "_id": "1234567890abcdef",
  "name": "Updated Resource Name",
  "description": "Updated description",
  "createdAt": "2024-09-13T12:00:00Z",
  "updatedAt": "2024-09-13T12:15:00Z"
}
Error Responses:

404 Resource Not Found if the resource does not exist.
500 Server Error for general issues.



5. Delete a Resource
DELETE /api/resources/:id

Path Parameters:

id: (Required) ID of the resource.
Response:


{
  "message": "Resource deleted"
}
Error Responses:

404 Resource Not Found if the resource does not exist.
500 Server Error for general issues.
Setup
Clone the Repository:


git clone <repository-url>
cd <repository-directory>
Install Dependencies:


npm install
Set Up Environment Variables: Create a .env file in the root directory and add the following variables:


MONGO_URI=<your-mongodb-connection-string>
Start the Server:


npm start
Testing
You can use tools like Postman or curl to test the API endpoints.

License
This project is licensed under the MIT License. See the LICENSE file for details.
