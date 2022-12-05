const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM recipe ORDER BY "Recipe_ID" ASC;', (err, result) => {
            res.send(result.rows);
        });
});


app.get('/orderid', (req, res) => {
    pool
        .query('SELECT MAX( \"Order_ID\") +1  AS var_order FROM orders;', (err, result) => {
            res.send(result.rows);
        })
});


app.get('/linenum', (req, res) => {
    pool
        .query('SELECT MAX( \"Line_Num\") AS var_line FROM orders;', (err, result) => {
            res.send(result.rows);
            //console.log(result);
        })
});

app.post('/checkout', (req, res) => {

    const Line_Num = req.body.Line_Num;
    const Order_ID = req.body.Order_ID;
    const custName = req.body.Cust_Name;
    const recID = req.body.Recipe_ID;
    const quanity = req.body.orderQuantity;
   
   

    //need to get order number 
    //increment line number everytime
    //'INSERT INTO orders ( \"Line_Num\", \"Order_ID\", \"Cust_Name\", \"Recipe_ID\", \"orderQuantity\", \"Date\") VALUES ( '+Line_Num+', '+Order_ID+',  \''+custName+'\','+recID+','+quanity+', CAST( NOW() AS Date ));'

    console.log(Line_Num);
    console.log(custName);
    console.log(Order_ID);
    console.log(recID);
    console.log(quanity);

    pool.query('INSERT INTO orders ( \"Line_Num\", \"Order_ID\", \"Cust_Name\", \"Recipe_ID\", \"orderQuantity\", \"Date\") VALUES ( ' + Line_Num + ', ' + Order_ID + ',  \'' + custName + '\',' + recID + ',' + quanity + ', CAST( NOW() AS Date ));', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('inserted order');
        }
    });
});

app.get('/getMenu', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM recipe ORDER BY "Recipe_ID" ASC;', (err, result) => {
            res.send(result.rows);
        });
});
app.get('/getInventory', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM inventory ORDER BY "Inventory_ID" ASC;', (err, result) => {
            res.send(result.rows);
        });
});

app.get('/getMenuItem', (req, res) => {
    const recID = req.query.recID;
    pool
        .query('SELECT * FROM recipe WHERE "Recipe_ID" = ' + recID + ';', (err, result) => {
            res.send(result.rows);
        });
});

app.get('/getInvItem', (req, res) => {
    const invID = req.query.invID;
    pool
        .query('SELECT * FROM inventory WHERE "Inventory_ID" = '+invID+';', (err, result) =>{
            res.send(result.rows);
        });
});

app.get('/getItemRecipe', (req, res) => {
    const recID = req.query.recID;
    pool
        .query('SELECT * FROM menuinv INNER JOIN inventory ON inventory.\"Inventory_ID\" = menuinv.inventory_id WHERE recipe_id = ' + recID + ' ORDER BY inventory_id ASC;', (err, result) => {
            res.send(result.rows);
        });
});

app.get('/getSales', (req, res) => {
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    pool
        .query('SELECT orders.\"Recipe_ID\", recipe.\"Name\", SUM(\"orderQuantity\") as Quantity, SUM(\"Price\" * orders.\"orderQuantity\") as Price FROM orders INNER JOIN recipe ON orders.\"Recipe_ID\" = Recipe.\"Recipe_ID\" WHERE \"Date\" BETWEEN \''+date1+'\' and \''+date2+'\' GROUP BY orders.\"Recipe_ID\", recipe.\"Name\" ORDER BY orders.\"Recipe_ID\";', (err, result) =>{
            res.send(result.rows);
        });
});

app.get('/getRestock', (req, res) => {
    pool
        .query('SELECT * FROM inventory WHERE \"Quantity\" < onhand ORDER BY "Inventory_ID";', (err, result) =>{
            res.send(result.rows);
        });
});

app.post('/addMenu', (req, res) => {
    const recID = req.body.recipeID;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    //console.log(name);
    pool.query('INSERT INTO recipe (\"Recipe_ID\", \"Name\", \"Price\", \"Category\", image) VALUES ('+recID+',\''+name+'\','+price+',\''+category+'\', \''+image+'\');', (err, result) =>{
        if(err){
            console.log(err);
        }
        else {
            console.log('inserted');
        }
    });
});

app.put('/updateItem', (req, res) => {
    const recID = req.body.recID;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    pool.query('UPDATE recipe SET "Name" = \''+name+'\' , "Price" = '+price+', \"Category\" = \''+category+'\' WHERE \"Recipe_ID\" = '+recID+';', (err, result) =>{
        if(err){
            console.log(err);
        }
        else {
            console.log('updated');
        }
    });
});

app.put('/updateInvItem', (req, res) => {
    const invID = req.body.invID;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const date = req.body.date;
    const onHand = req.body.onHand;
    pool.query('UPDATE inventory SET "Inventory" = \''+name+'\' , "Quantity" = '+quantity+', \"OrderDate\" = \''+date+'\', onhand = '+onHand+' WHERE \"Inventory_ID\" = '+invID+';', (err, result) =>{
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
    pool.query('INSERT INTO inventory (\"Inventory_ID\", \"Inventory\", \"Quantity\", \"OrderDate\", \"onhand\") VALUES (' + inventoryID + ', \'' + name + '\',' + quantity + ', \'' + orderDate + '\',' + onHand + ');', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('inserted');
        }
    });
});

app.post('/addRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    const quantity = req.body.quantity;
    pool.query('INSERT INTO menuinv VALUES(' + recID + ', ' + invenID + ', ' + quantity + ');', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('inserted');
        }
    });
});
app.post('/deleteRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    pool.query('DELETE FROM menuinv WHERE recipe_id = ' + recID + ' AND inventory_id = ' + invenID + ';', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('deleted');
        }
    });
});
app.post('/updateRecipeItem', (req, res) => {
    const recID = req.body.recipeID;
    const invenID = req.body.invenID;
    const quantity = req.body.quantity;
    pool.query('UPDATE menuinv SET quantity = ' + quantity + ' WHERE recipe_id = ' + recID + ' AND inventory_id = ' + invenID + ';', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('updated');
        }
    });
});

app.post('/deleteMenu', (req, res) => {
    const recID = req.body.recipeID;
    pool.query('DELETE FROM recipe WHERE "Recipe_ID" = ' + recID + ';', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('deleted');
        }
    });
});

app.post('/deleteInventory', (req, res) => {
    const invID = req.body.inventoryID;
    pool.query('DELETE FROM inventory WHERE "Inventory_ID" = ' + invID + ';', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('deleted');
        }
    });
});

app.get('/server/getCategories', (req, res) => {
    const getCategories = "SELECT DISTINCT \"Category\" FROM recipe";
    pool.query(getCategories, (err, result) => {
        res.send(result.rows);
    });
});

app.get('/server/getMenuItems', (req, res) => {
    const getItems = " SELECT * FROM recipe";
    pool.query(getItems, (err, result) => {
        res.send(result.rows);
    });
});

app.get('/getAccountType', (req, res) => {
    const email = req.query.email;
    //console.log(email);
    pool.query("SELECT type FROM accounts WHERE email = \'" + email + "\';", (err, result) => {
        res.send(result.rows);
    });
});

app.get('/getOrders', (req,res) => {
    const date1 = req.query.date1;
    const date2 = req.query.date2;
    pool.query('SELECT * FROM orders WHERE "Date" BETWEEN \''+date1+'\' and \''+date2+'\' ORDER BY \"Line_Num\" DESC LIMIT 1000;', (err, result) => {
        res.send(result.rows);
    });
});

app.get('/updateInventoryAmt', (req,res) => {
    const id = req.query.date1;
    const amount = req.query.date2;
    const date = new Date().toUTCString();
    pool.query('UPDATE inventory SET "Quantity" = "Quantity" + '+amount+' WHERE "Inventory_ID" = '+id+';', (err, result) => {
    });
    pool.query('UPDATE inventory SET "OrderDate" = \''+date+'\' WHERE "Inventory_ID" = '+id+';', (err, result) => {
    });
});

app.get('/newMin', (req,res) => {
    const id = req.query.date1;
    const amount = req.query.date2;
    pool.query('UPDATE inventory SET "onhand" = '+amount+' WHERE "Inventory_ID" = '+id+';', (err, result) => {
    });
});

app.get('/getExcess', (req,res) => {
    const date1 = req.query.date1;
    pool.query("SELECT inventory_id, inventory.\"Inventory\",total,inventory.\"Quantity\" FROM (SELECT inventory_id, SUM(itemquantity*quantity) AS total FROM (SELECT orders.\"Recipe_ID\", SUM(\"orderQuantity\") as itemquantity FROM orders INNER JOIN recipe ON orders.\"Recipe_ID\" = Recipe.\"Recipe_ID\" WHERE \"Date\" > '"+date1+"' GROUP BY orders.\"Recipe_ID\" ORDER BY \"Recipe_ID\") AS X INNER JOIN menuinv ON X.\"Recipe_ID\" = menuinv.recipe_id GROUP BY inventory_id ORDER BY inventory_id) AS Y INNER JOIN inventory ON inventory_id = inventory.\"Inventory_ID\" WHERE total/\"Quantity\" < .1 ORDER BY inventory_id;", (err, result) => {
        res.send(result.rows);
    });
});

app.get('/getEmployees', (req,res) => {
    pool.query("SELECT * FROM accounts WHERE type = 'manager' OR type = 'server';", (err, result) => {
        res.send(result.rows);
    });
});
app.post('/addEmployee', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const type = req.body.type;
    const password = req.body.password;
    pool.query("INSERT INTO accounts VALUES('"+email+"', '"+type+"', '"+name+"', '"+password+"', '"+phone+"');", (err, result) =>{
    });
});

app.post('/deleteEmployee', (req, res) => {
    const empID = req.body.employeeEmail;
    pool.query('DELETE FROM accounts WHERE email = \''+empID+'\';', (err, result) =>{
       // console.log(err);
    });
});

app.post('/updateEmployee', (req, res) => {
    const email = req.body.email;
    const type = req.body.type;
    pool.query('UPDATE accounts accounts SET type = \''+type+'\' WHERE email = \''+email+'\' ;', (err, result) =>{
    });
});

app.post('/trigger', (req, res) => {
    pool.query('DO $$ DECLARE x record; BEGIN FOR x IN (SELECT inventory_id,("Quantity"-amount) AS quantity FROM (SELECT inventory_id, ("orderQuantity" * quantity) AS amount from orders INNER JOIN menuinv ON orders."Recipe_ID" = menuinv.recipe_id WHERE "Line_Num" = (SELECT MAX("Line_Num") FROM orders)) AS amtUsed INNER JOIN inventory ON amtUsed.inventory_id = inventory."Inventory_ID") LOOP UPDATE inventory SET "Quantity" = x.quantity WHERE "Inventory_ID" = x.inventory_id; END LOOP; END $$', (err, result) =>{
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.set("view engine", "ejs");

process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});