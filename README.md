# Steps to call api's
Clone the repository locally
Run npm install
Run npm start
Use postman with below url's to see the response

1. Get all products and quantity of each that is an available with the current inventory
method: GET
url: http://localhost:9000/products/getProducts
Note: using sample products.json file from assets folder for the souces of data

2. Remove(Sell) a product and update the inventory accordingly
method: DELETE
url: http://localhost:9000/products/sellProduct
request body example: send as json
{
    "name": "Dining Chair2",
    "contain_articles": [
        {
            "art_id": "1",
            "amount_of": "4"
        },
        {
            "art_id": "2",
            "amount_of": "8"
        },
        {
            "art_id": "3",
            "amount_of": "1"
        }
    ]
}

3. Get all available inventories in wms app
method: GET
url: http://localhost:9000/inventory/getInventory
Note: using sample inventory.json file from assets folder for the souces of data

4. Add new inventory to the system
method: POST
url: http://localhost:9000/inventory/addInventory
request body example: send as json
{
    "art_id": "7",
    "name": "table top2",
    "stock": "4"
}

5. Add new product to the system
method: POST
url: http://localhost:9000/products/addProduct
request body example: send as json
{
    "name": "Dining Chair2",
    "contain_articles": [
        {
            "art_id": "1",
            "amount_of": "4"
        },
        {
            "art_id": "2",
            "amount_of": "8"
        },
        {
            "art_id": "3",
            "amount_of": "1"
        }
    ]
}


#----------------------PROJECT DETAILS-------------------------------
# wms-backend
Warehouse Management System

## Intro
This assignment will be used as a discussion during a technical interview.
The primary values for the code we look for are: simplicity, readability, maintainability, testability. It should be easy to scan the code, and rather quickly understand what it’s doing. Pay attention to naming.
 
You may choose any coding language, and we look forward to discussing your choice.

## The Task
The assignment is to implement a warehouse software. This software should hold articles, 
and the articles should contain an identification number, a name and available stock. 
It should be possible to load articles into the software from a file, see the attached inventory.json.
The warehouse software should also have products, products are made of different articles. 
Products should have a name, price and a list of articles of which they are made from with a quantity. 
The products should also be loaded from a file, see the attached products.json. 
 
The warehouse should have at least the following functionality;
* Get all products and quantity of each that is an available with the current inventory
* Remove(Sell) a product and update the inventory accordingly





