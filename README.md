# healthy-food-api

This is an Express application providing a REST API to the Healthy Food application.

# REST API Documentation

Generally it is a RESTful API and returns results in JSON format.

## Registration of the user

It allows to register a new user.

### Request

`POST /api/auth/register`

- **Body**

  ```javascript
  {
    "name": "[user first name]",
    "surname": "[user last name]",
    "username": "[username]",
    "password": "[user password in plain text]",
    "email": "[valid user email address]",
    "phoneNumber": "[user phone number]",
    "isAdmin": [true | false]
  }
  ```

  Required fields:

  name, surname, username, password, email

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  {
    "user": {
        "_id" : "[user identifier]",
        "isAdmin": [true | false],
        "name": "[user first name]"
    },
    "token": "[JWT Token]"
  }
  ```

- **Error Response:**

    - Status Code: 400 Bad Request

      Body:

      ```javascript
      {
        "message": "User already registered"
      }
      ```

## User login

It allows user to log in.

### Request

`POST /api/auth/login`

- **Body**

  ```javascript
  {
    "email": "[valid user email address]",
    "password": "[user password in plain text]"
  }
  ```

  Required fields:

  email, password

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
   {
    "user": {
        "_id" : "[user identifier]",
        "isAdmin": [true | false],
        "name": "[user first name]"
    },
    "token": "[JWT Token]"
  }
  ```

  The JWT token is also returned in response headers as `X-Auth-Token`. This token must be sent in every future requests
  where user need to be authenticated.

- **Error Response:**

    - Status Code: 401 Unauthorized

      Body:

      ```javascript
      {
        "message": "Invalid email or password."
      }
      ```

    - Status Code: 400 Bad Request

      Body:

      ```javascript
      {
        "message": "Invalid email or password."
      }
      ```

<!-- USER -->

## Request resetting user password

It sends user an email with the link to reset his/her password.

### Request

`POST /api/user`

- **Body**

  ```javascript
  {
    "email": "[valid user email address]"
  }
  ```

  Required fields:

  email

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  {
    "message": "E-mail has been sent"
  }
  ```

- **Error Response:**

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "User not found."
      }
      ```

## Reset user password

It allows user to reset his/her password.

### Request

`POST /api/user/:id/:token`

- **Params**

  ```javascript
  {
    "id": "[user identifier]",
    "password": "[user new password in plain text]"
  }
  ```

  Required fields:

  id, password

### Response

- **Success Response:**

  Status Code: 200 OK

- **Error Response:**

    - Status Code: 401 Unauthorized

      Body:

      ```javascript
      {
        "message": "Access denied"
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "User not found."
      }
      ```

## Get user info

It returns data about logged in user.

### Request

`GET /api/user/:id/:token`

- **Params**

  ```javascript
  {
    "id": "[user identifier]",
    "token": "[JWT Token]"
  }
  ```

  Required fields:

  id, token

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  {
    "name": "[user first name]",
    "surname": "[user last name]",
    "username": "[username]",
    "password": "[user password in plain text]",
    "email": "[valid user email address]",
    "phoneNumber": "[user phone number]",
    "isAdmin": [true | false]
  }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```
    - Status Code: 401 Unauthorized

      Body:

      ```
      {
          "message": "Access denied. No token provided."
      }
      ```

<!-- USER'S RECIPES -->

## Get user's recipes

It returns logged in user all recipes.

### Request

`GET /api/user/recipes`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  [
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ]
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "No recipes found"
      }
      ```

## Get user's single recipe

It returns logged in user single recipe.

### Request

`GET /api/user/recipes/:id`

- **Params**

   ```javascript
  {
    "id": "[recipe identifier]"
  }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

## Create user's recipe

It allows to create a new recipe.
`

### Request

`POST /api/user/recipes`

- **Body**

   ```javascript
  {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

  Required fields:

  author, title, mealType, ingredients

### Response

- **Success Response:**

  Status Code: 201 OK

  Body:

  ```javascript
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

## Update user's recipe

It allows to update user recipe.
`

### Request

`PATCH /api/user/recipes/:id`

- **Params**

     ```javascript
    "recipe_id": "[recipe identifier]"
    ```

- **Body**

   ```javascript
  {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

## Delete user's recipe

It allows to delete user recipe.
`

### Request

`DELETE /api/user/recipes/:id`

- **Params**

     ```javascript
    "recipe_id": "[recipe identifier]"
    ```

### Response

- **Success Response:**

  Status Code: 200 OK

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

        ```
        {
            "message": "Invalid token."
        }
        ```

    - Status Code: 404 Not Found

      Body:

      ```
      {
          "message": "Recipe not found. Perhaps it was already deleted"
      }
      ```

<!-- USER'S MEAL PLANS -->

## Get user's meal plans

It returns logged in user all meal plans.

### Request

`GET /api/user/mealplans`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  [
    {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]",
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ]
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "Meal plans don't exist"
      }
      ```

## Get user's single meal plan

It returns logged in user single meal plan.

### Request

`GET /api/user/mealplans/:id`

- **Params**

   ```javascript
  {
    "id": "[recipe identifier]"
  }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
    {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]",
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```
      {
          "message": "Meal plan doesn't exist"
      }
      ```

## Create user's meal plan

It allows to create a new meal plan.
`

### Request

`POST /api/user/mealplans`

- **Body**

   ```javascript
      {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]",
    }
  ```

  Required fields:

  days, title

### Response

- **Success Response:**

  Status Code: 201 OK

  Body:

  ```javascript
        {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]"
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

## Update user's meal plan

It allows to update user meal plan.
`

### Request

`PATCH /api/user/mealplans/:id`

- **Params**

     ```javascript
    "_id": "[meal plan identifier]"
    ```

- **Body**

   ```javascript
  {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
        ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```
      {
          "message": "Meal plan doesn't exist"
      }
      ```

## Delete user's meal plan

It allows to delete user meal plan.
`

### Request

`DELETE /api/user/mealplans/:id`

- **Params**

     ```javascript
    "_id": "[meal plan identifier]"
    ```

### Response

- **Success Response:**

  Status Code: 200 OK

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

        ```
        {
            "message": "Invalid token."
        }
        ```

    - Status Code: 404 Not Found

      Body:

      ```
      {
          "message": "Meal plan doesn't exist"
      }
      ```

<!-- USER'S FAVOURITE -->

## Get user's favourite meal plans

It returns logged in user favourite meal plans.

### Request

`GET /api/user/favourite/mealplans`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  [
    {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]",
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ]
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "Meal plans not found"
      }
      ```

## Get user's favourite recipes

It returns logged in user favourite recipes.

### Request

`GET /api/user/favourite/recipes`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  [
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
             {
                 "name": "[name of ingredient]",
                 "quantity": {
                     "number": [quantity of ingredient],
                     "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                 } 
             }
             ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
  ]
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

    - Status Code: 404 Not found

      Body:

      ```javascript
      {
        "message": "Recipe not found"
      }
      ```

## Update status user's favourite meal plans

It allows logged in user to update a status of favourite meal plans.

### Request

`PATCH /api/user/favourite/mealplans/:id`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

- **Params**

  ```javascript
  {
    "id": "[meal plan identifier]"
  }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
      {
          "message": "Updated mealplan favourite status"
      }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

## Update status user's favourite recipes

It allows logged in user to update a status of favourite recipes.

### Request

`PATCH /api/user/favourite/recipes/:id`

- **Body**

  ```javascript
  {
    "userId": "[user identifier]"
  }
  ```

  Required fields:

  userId

- **Params**

  ```javascript
  {
    "id": "[recipe identifier]"
  }
  ```

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
      {
          "message": "Updated recipe favourite status"
      }
  ```

- **Error Response:**

    - Status Code: 400 Unauthorized

      Body:

      ```
      {
          "message": "Invalid token."
      }
      ```

<!-- PAGE RESOURCE -->

## Get page resource

It returns all meal plans and recipes.

### Request

`GET /api/pageResource`

- **Body**

  No body data required.

### Response

- **Success Response:**

  Status Code: 200 OK

  Body:

  ```javascript
  {
    "mealPlans":[ 
    {
        "days": [
            {
                "mealType": ["breakfast" | "lunch" | "dinner"],
                "recipe": {
                    "author": {
                        "name": "[user first name]",
                        "surname": "[user last name]",
                        "username": "[username]",
                        "email": "[valid user email address]",
                        "phoneNumber": "[user phone number]",
                        "isAdmin": [true | false]
                    },
                    "title": "[recipe title]",
                    "tags": ["recipe tags"],
                    "time": [number of minutes],
                    "mealType": ["breakfast" | "lunch" | "dinner"],
                    "ingredients": [
                        {
                            "name": "[name of ingredient]",
                            "quantity": {
                            "number": [quantity of ingredient],
                            "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                            } 
                        }
                    ],
                    "description": "[description of recipe]",
                    "recipe" : "[stpes of preparing recipe]",
                    "img": "[img base 64 format]",
                    "peopleNumber": [number of people],
                    "likes": [
                        {
                            "name": "[user first name]",
                            "surname": "[user last name]"
                        }
                    ] 
                },
                "dayNumber": "[number of days]"
            }
        ],
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
        },
        "title": "[meal plan title]",
        "tags": ["meal plan tags"],
        "img": "[img base 64 format]",
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }
    ],
    "recipes":[
    {
        "author": {
            "name": "[user first name]",
            "surname": "[user last name]",
            "username": "[username]",
            "email": "[valid user email address]",
            "phoneNumber": "[user phone number]",
            "isAdmin": [true | false]
            },
        "title": "[recipe title]",
        "tags": ["recipe tags"],
        "time": [number of minutes],
        "mealType": ["breakfast" | "lunch" | "dinner"],
        "ingredients": [
            {
                "name": "[name of ingredient]",
                "quantity": {
                    "number": [quantity of ingredient],
                    "unit": ["kg" | "kg" | "g" | "ml" | "pcs" | "tablespoon" | "teaspoon" | "cup" | "pinch" | "slice"]
                } 
            }
            ],
        "description": "[description of recipe]",
        "recipe" : "[stpes of preparing recipe]",
        "img": "[img base 64 format]",
        "peopleNumber": [number of people],
        "likes": [
            {
                "name": "[user first name]",
                "surname": "[user last name]"
            }
        ] 
    }]
  }
  ```
