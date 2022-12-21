## Meal Log App

### Backend for a meal logging app that allows users to save their meals along with food item details.
#### There will be available list of foods from which the user will select the food
#### The user can create or select hashtags for food
#### User must be logged in (pre-registered) to order any meal
#### JWT Token has been used for the authentication of a User.

Some e.g. APIs for following endpoints:

1. GET meal logs for a user : http://localhost:3000/meal/find
2. GET a list of hashtags in the system : http://localhost:3000/hash/find
3. GET a list of food Items : http://localhost:3000/food/find 
4. ADD a food Item in the list : http://localhost:3000/food/add
5. POST new meal log : http://localhost:3000/meal/add
