const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser=require('body-parser');

app.use(cors());
app.use(express.json());
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

app.get('/getMenu', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM recipe ORDER BY "Recipe_ID" ASC;', (err, result) =>{
            res.send(result.rows);
        });
});
app.get('/getInventory', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM inventory ORDER BY "Inventory_ID" ASC;', (err, result) =>{
            res.send(result.rows);
        });
});

app.get('/getMenuItem', (req, res) => {
    const recID = req.query.recID;
    pool
        .query('SELECT * FROM recipe WHERE "Recipe_ID" = '+ recID+';', (err, result) =>{
            res.send(result.rows);
        });
});
app.get('/getItemRecipe', (req, res) => {
    const recID = req.query.recID;
    pool
        .query('SELECT * FROM menuinv INNER JOIN inventory ON inventory.\"Inventory_ID\" = menuinv.inventory_id WHERE recipe_id = '+ recID+' ORDER BY inventory_id ASC;', (err, result) =>{
            res.send(result.rows);
        });
});
app.get('/getSales', (req, res) => {
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    pool
        .query('SELECT orders.\"Recipe_ID\", recipe.\"Name\", SUM(\"orderQuantity\") as Quantity, SUM(\"Price\" * orders.\"orderQuantity\") as Price FROM orders INNER JOIN recipe ON orders.\"Recipe_ID\" = Recipe.\"Recipe_ID" WHERE "Date" BETWEEN \''+date1+'\' and \''+date2+'\' GROUP BY orders.\"Recipe_ID\", recipe.\"Name\" ORDER BY orders.\"Recipe_ID\";', (err, result) =>{
            res.send(result.rows);
        });
});

app.use(bodyParser.urlencoded({extended:true}));

app.post('/addMenu', (req, res) => {
    const recID = req.body.recipeID;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    //console.log(name);
    pool.query('INSERT INTO recipe (\"Recipe_ID\", \"Name\", \"Price\", \"Category\") VALUES ('+recID+',\''+name+'\','+price+',\''+category+'\');', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('inserted');
        }
    });
});

app.put('/updateItem', (req, res) => {
    const recID = req.body.recID;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    console.log(recID, name, price, category);
    pool.query('UPDATE recipe SET "Name" = \''+name+'\' , "Price" = '+price+', \"Category\" = \''+category+'\' WHERE \"Recipe_ID\" = '+recID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('updated');
        }
    });
});

app.post('/addInventory', (req, res) => {
    const inventoryID = req.body.inventoryID;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const onHand = req.body.onhand;
    const orderDate = req.body.orderDate;
    //console.log(name);
    pool.query('INSERT INTO inventory (\"Inventory_ID\", \"Inventory\", \"Quantity\", \"OrderDate\", \"onhand\") VALUES ('+inventoryID+', \''+ name + '\',' +quantity+ ', \'' +orderDate+ '\',' +onHand+');', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('inserted');
        }
    });
});

app.post('/addRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    const quantity = req.body.quantity;
    pool.query('INSERT INTO menuinv VALUES('+recID+', '+invenID+', '+quantity+');', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('inserted');
        }
    });
});
app.post('/deleteRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    pool.query('DELETE FROM menuinv WHERE recipe_id = '+recID+' AND inventory_id = '+invenID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('deleted');
        }
    });
});
app.post('/updateRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    const quantity = req.body.quantity;
    pool.query('UPDATE menuinv SET quantity = '+quantity+' WHERE recipe_id = '+recID+' AND inventory_id = '+invenID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('updated');
        }
    });
});

app.post('/deleteMenu', (req, res) => {
    const recID = req.body.recipeID;
    pool.query('DELETE FROM recipe WHERE "Recipe_ID" = '+recID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('deleted');
        }
    });
});

app.post('/deleteInventory', (req, res) => {
    const invID = req.body.inventoryID;
    pool.query('DELETE FROM inventory WHERE "Inventory_ID" = '+invID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('deleted');
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   
app.set("view engine", "ejs");

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});