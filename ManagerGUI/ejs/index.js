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

app.get('/getMenuImage', (req, res) => {
    const recID = req.body.recID;
    console.log(req.body);

    pool
        .query('SELECT image FROM recipe WHERE "Recipe_ID" = '+ recID+';', (err, result) =>{
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