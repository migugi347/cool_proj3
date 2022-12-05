import React, { useState, useEffect} from "react";
import axios from "axios";
import Mainlayout from '../../layouts/Mainlayout';
import logo from '../../layouts/images/coffee.gif';
import SubmitPopUp from './submitPopUp';
import CancelPopUp from './cancelPopUp';

/**
 * Graphical User Interface (GUI) for MSC Starbucks' servers. Allows
 * servers to easily navigate through menu items, take orders, and 
 * update the store's inventory when submitting an order.
 * Program pulls the menu items and categories from the project's database,
 * uses that information to populate the page, and updates the database in the end
 * once an order has been submitted successfully.
 * @returns {HTML} - HTML code displaying Graphical User Interface
 */
function Server_homescreen() {
    const [products, setProducts] = useState([]);
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]); //clear

    const [totalAmount, setTotalAmount] = useState(0); //clear

    const [Order_ID, setOrderID] = useState(0);
    const [lineNum, setlineNum] = useState([]);
    const [Cust_Name, setCustName] = useState(""); //clear

    const uniCate = [...new Map(categories.map((m) => [m.Category, m])).values()];

    const[submitOpen, setSubmitOpen] = useState(false);
    const[cancelOpen, setCancelOpen] = useState(false);

    const fetchMenu = async () => {
        setIsLoading(true);
        const result = await axios.get('user');
        setProducts(await result.data);
        setMenu(await result.data);
        setIsLoading(false);
    }

    const fetchCategory = async () => {
        setIsLoading(true);
        const result = await axios.get('user');
        setCategories(await result.data);

        setIsLoading(false);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/user").then((response) => {
            console.log(response.data);
        });
    }, []);

    const removeProduct = async (product) => {
        setIsLoading(true);
        const newCart = cart.filter(cartItem => cartItem.Recipe_ID !== product.Recipe_ID);
        setCart(newCart);
        setIsLoading(false);
    }

    const removeMenu = async (product) => {
        const newProducts = products.filter(menuItem => menuItem.Category === product.Category);
        setMenu(newProducts);
    }

    const fetchOrderID = async () => {
        console.log("start");

        const result = await axios.get('orderid');
        setOrderID(await result.data);
        alert(Order_ID);

        console.log("end");
    }
 

    const fetchLineNum = async () => {
        const result = await axios.get('linenum');
        setlineNum(await result.data);
        const newLine = lineNum + 1;
        setlineNum(newLine);
    }

    const checkoutItem = (cartItem) => {
        fetchLineNum();
        axios.post("http://localhost:3001/checkout", {
            //fetch line
            Line_Num: lineNum,
            Order_ID: Order_ID,
            Cust_Name: Cust_Name,
            Recipe_ID: cartItem.Recipe_ID,
        });
    };

    const addItemtoCart = async (product) => {
        let findItemInCart = await cart.find(i => {
            return i.Recipe_ID === product.Recipe_ID
        });
        if (findItemInCart) {
            let newCart = [];
            let newItem;
            cart.forEach(cartItem => {
                if (cartItem.Recipe_ID === product.Recipe_ID) {
                    newItem =
                    {
                        ...cartItem,
                        orderQuantity: cartItem.orderQuantity + 1,
                        totalAmount: cartItem.Price * (cartItem.orderQuantity + 1)

                    }
                    newCart.push(newItem);
                }
                else {
                    newCart.push(cartItem);
                }
            });
            setCart(newCart);
        }
        else {
            let addingItem = {
                ...product,
                'orderQuantity': 1,
                'totalAmount': product.Price,
            }
            setCart([...cart, addingItem]);
            console.log(cart)
        }
    }

    const decrementHandler = async (itemID) => {
        if (itemID.orderQuantity === 1) {
            removeProduct(itemID);
        }
        else {
            let newCart = [];
            let newItem;
            cart.forEach(cartItem => {
                if (cartItem.Recipe_ID === itemID.Recipe_ID) {
                    newItem =
                    {
                        ...cartItem,
                        orderQuantity: cartItem.orderQuantity - 1,
                        totalAmount: cartItem.Price * (cartItem.orderQuantity - 1)

                    }
                    newCart.push(newItem);
                }
                else {
                    newCart.push(cartItem);
                }
            });
            setCart(newCart);
        }
    }

    const incrementHandler = (itemID) => {
        addItemtoCart(itemID);
    }

    /**
     * stores customer's name upon input from server
     * @param {string} customerName
     */
    const getCustomerName = (customerName) => {
        setCustName(customerName.target.value);
    }

    const cancelOrder = () => {
        setCart([]);
        setTotalAmount(0);
        setCustName("");
    }

    const submitOrder = () => {
        if(Cust_Name === ""){
            alert("Cannot submit order! Please enter customer's name!");
        }else if(cart.length === 0){
            alert("Cannot submit order! No menu items have been selected!")
        }else{
            setSubmitOpen(true)
            setCart([]);
            setTotalAmount(0);
            setCustName("");
        }
    }

    useEffect(() => {
        fetchMenu();
        fetchCategory();
    }, []);

    useEffect(() => {
        console.log(products)
    }, [products]);

    useEffect(() => {
        let newTotalAmount = 0;

        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseFloat(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount.toFixed(2));
    }, [cart]);

    return (
        <Mainlayout >
            <div className = "navbarArea">
                <h2>CATEGORIES</h2>
                <h2 style ={{fontWeight:'bold', fontFamily: 'Georgia, \'Times New Roman\', Times, serif',color:'var(--secondary)',float:'left', left:'0px',top:'140px',position:'fixed'}}>CATEGORIES</h2>
                <nav style={{overflowX:'hidden',width:'16vw', height:'70vh'}} className='serverNavBar'>
                    <ul>
                        <button style={{backgroundColor:'var(--primary)'}} onClick={() => fetchMenu()}>Main Menu</button>
                        {uniCate.map((product, key) =>
                            <button style={{backgroundColor:'var(--primary)'}} href="#" key={key} onClick={() => removeMenu(product)}>{product.Category}</button>
                        )}
                    </ul>
                </nav>
            </div>
        <div style={{display:'flex',marginBottom:'-150px'}}>
            <div style={{width:'auto'}} className="menuItems">
                {isLoading ? <img src={logo} style={{ width: "90vw" }} alt="loading .. " /> : <div className='row'>
                    {menu.map((product, key) =>
                        <div key={key} className='col-lg-4'>
                            <button style={{backgroundColor:'var(--secondary)'}} className='poop border text-center text-uppercase fw-bold rounded' onClick={() => addItemtoCart(product)}>
                                <p className="font-weight-bold" style={{ fontWeight: "900" }}>{product.Name}</p>
                            </button>
                        </div>
                    )}
                </div>}
            </div>
            <div style={{}} className="orderSummary">
                <div style={{width:'30vw',backgroundColor:'var(--primary)',padding:'5px'}} className="table-responsive rounded">
                    <h2 className="px-2">Customer Name: </h2>
                    <input type = "text" id = "customerName" onChange={getCustomerName} value = {Cust_Name}/>
                    <div style={{backgroundColor:'var(--secondary)',marginTop:'10px'}} className="table-responsive rounded">
                        <table style={{overflowX:'hidden'}} className="table ">
                            <thead>
                                <tr>
                                    <th>Menu Item</th>
                                    <th>Decrease</th>
                                    <th>Quantity</th>
                                    <th>Increase</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart ? cart.map((cartItem, key) => <tr key={key}>
                                    <td>{cartItem.Name}</td>
                                    <td> <button onClick={() => decrementHandler(cartItem)} value="+" style={{backgroundColor:'var(--primary)'}} className="btn text-white   btn-danger btn-sm" data-field="quantity">-</button></td>
                                    <td>{cartItem.orderQuantity}</td>
                                    <td> <button onClick={() => incrementHandler(cartItem)} value="+" style={{backgroundColor:'var(--primary)'}} className="btn text-white   btn-danger btn-sm" data-field="quantity">+</button></td>
                                    <td ><button style={{backgroundColor:'var(--primary)'}} className="btn text-white   btn-danger btn-sm" onClick={() => removeProduct(cartItem)}>X</button></td>
                                </tr>) : "No Item In Cart"}
                            </tbody>
                        </table>
                        <div id = "submit" className="submitButton">
                            <button className="btn1" onClick={() => {submitOrder()}}>Submit Order</button>
                              <SubmitPopUp open={submitOpen} onClose={() => setSubmitOpen(false)}>
                                  <h1>Order Submitted!</h1>
                              </SubmitPopUp>
                        </div>
                        <div className="cancelButton">
                            <button className="btn1" onClick={() => {setCancelOpen(true); cancelOrder(); fetchOrderID()}}>Cancel Order</button>
                             <CancelPopUp open={cancelOpen} onClose={() => setCancelOpen(false)}>
                                <h1>Order Cancelled!</h1>
                            </CancelPopUp>
                        </div>
                    </div>
                    <h2 style={{marginTop:'5px'}} className="px-2">Total: ${totalAmount}</h2>
                </div>
            </div>
            
        </div>
        </Mainlayout >
    )
}

export default Server_homescreen;