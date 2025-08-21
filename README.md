# Recipe API Starter (Express + PostgreSQL)

A simple RESTful API for managing and searching recipes, built with **Node.js**, **Express**, and **PostgreSQL**.  
Supports seeding data from JSON and provides paginated and filtered search endpoints.

---

## Prerequisites (Windows + VS Code)

1. Install **Node.js LTS** from [nodejs.org](https://nodejs.org)  
   - Verify: `node -v` and `npm -v`
2. Install **PostgreSQL** (v15+) and note your password
3. Create the database:  
```sql
CREATE DATABASE recipes_db;

Use SQL Shell (psql) or pgAdmin

Setup (VS Code Terminal)

# 1) Open project folder in VS Code
# 2) Copy server/.env.example → server/.env and fill in PGPASSWORD
cd server
npm install

# 3) Seed the database (creates tables + imports data/data/US_recipes.json)
npm run seed

# 4) Start the API server
npm start
# API runs at http://localhost:5000

API Endpoints

List Recipes (Paginated)

GET /api/recipes?page=1&limit=15


Sorted by rating (descending)

limit is clamped between 15 and 50

Search Recipes

GET /api/recipes/search?title=pie&rating=>=4.5&calories=<=400


Filter by: title, cuisine, rating, calories, total_time, etc.

Replace or Update Data

Place your full JSON dataset in:

/data/US_recipes.json


Run the seed script again to reload the database:

npm run seed

Thunder Client / Postman Examples

Get paginated recipes:

GET http://localhost:5000/api/recipes?page=1&limit=20


Search by cuisine:

GET http://localhost:5000/api/recipes/search?cuisine=Southern Recipes


Search by title:

GET http://localhost:5000/api/recipes/search?title=pie


Filter by rating, calories, or total_time:

GET http://localhost:5000/api/recipes/search?rating=>=4.5
GET http://localhost:5000/api/recipes/search?calories=<=400
GET http://localhost:5000/api/recipes/search?total_time=<=60
Features
Full CRUD-ready database schema

Seed data from JSON

Pagination and advanced search filters

Easy to extend for front-end applications

License
MIT License


---

If you want, I can also **add a small diagram showing the flow** (JSON → DB → API → client) to make the README look **super professional** for GitHub.  

Do you want me to do that?
