import React, { useEffect, useState, useCallback } from "react"
import Mainlayout from '../../layouts/Mainlayout'
import CustomerLogin from './customerLogin'
import PopUp from "../../components/PopUp";
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Cart from '../../layouts/images/cart.svg';
import logo from '../../layouts/images/coffee.gif';
import Magnifier from "react-magnifier";
import axios from "axios";
import { API_URL } from "../../API";

/**
 * Graphical User Interface (GUI) that allows customers to easily navigate through menu items
 * and categories, pick menu items they'd like, increase/decrease their quantity or remove them
 * if necessary, and submit an order if done. Furthermore, the store's inventory is updated
 * after an order is submitted. All categories and menu items (along with their respective 
 * information) are all pulled directly from the database.
 * @returns {HTML} - code displaying Customer Graphic User Interface
 */
function Pospage() {

    const [products, setProducts] = useState([]);
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);

    const [totalAmount, setTotalAmount] = useState(0);
    const [buttonPopup, setButtonPopup] = useState(false);


    const [Order_ID, setOrderID] = useState(0);
    const [lineNum, setlineNum] = useState([]);
    let currLineNum = 0;
    const [Cust_Name, setCustName] = useState(window.localStorage.getItem('name'));

    const uniCate = [...new Map(categories.map((m) => [m.Category, m])).values()];
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState([]);






    const fetchMenu = async () => {

        setIsLoading(true);
        const result = await axios.get(API_URL + '/user');
        setProducts(await result.data);
        setMenu(await result.data);
        setIsLoading(false);
    }


    const fetchCategory = async () => {
        setIsLoading(true);
        const result = await axios.get(API_URL + '/user');
        setCategories(await result.data);

        setIsLoading(false);
    }


    useEffect(() => {
        axios.get(API_URL + "/user").then((response) => {

        });
    }, []);

    const removeProduct = async (product) => {
        setIsLoading(true);
        const newCart = cart.filter(cartItem => cartItem.Recipe_ID !== product.Recipe_ID);
        setCart(newCart);
        setIsLoading(false);
    }

    const incrementHandler = (itemID) => {



        addItemtoCart(itemID);


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


    const removeMenu = async (product) => {
        const newProducts = products.filter(menuItem => menuItem.Category === product.Category);
        setMenu(newProducts);
    }

    const fetchOrderID = async () => {
        await axios.get(API_URL + "/orderid").then((response) => {
            // setOrderID(response.data);
            const ord = response.data;
            setOrderID(ord[0].var_order);

        });

        // const result = await axios.get('orderid');
    }

    const fetchLineNum = async () => {

        await axios.get(API_URL + "/linenum").then((response) => {
            // setOrderID(response.data);

            // const ord = response.data;
            setlineNum(response.data[0].var_line);


        });
    }

    const checkoutItem = async (cartItem) => {




        currLineNum = currLineNum + 1;



        axios.post(API_URL + "/checkout", {

            //fetch line
            Line_Num: currLineNum,
            Order_ID: Order_ID,
            Cust_Name: Cust_Name,
            orderQuantity: cartItem.orderQuantity,
            Recipe_ID: cartItem.Recipe_ID,
        });
        await axios.post(API_URL + "/trigger", {
        });
    };



    const checkoutPrompt = async () => {



        currLineNum = lineNum;
        setButtonPopup(true);
        reSizeView(open);

        //console.log(cart);
        // console.log(Order_ID)
        cart.forEach(cartItem => {
            //checkoutItem
            //pass same order number 


            checkoutItem(cartItem);

        });

    }

    const addItemtoCart = async (product) => {
        let findItemInCart = await cart.find(i => {
            return i.Recipe_ID === product.Recipe_ID
        });
        //console.log(findItemInCart)
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
            //console.log(cart)
        }
    }

    const reSizeView = async (open) => {


        if (open) {
            document.getElementById('mainContent').className = "col-lg-10";

            document.getElementById('sideBar').className = "col-lg-2";
        }
        else {
            document.getElementById('mainContent').className = "col-lg-7";
            document.getElementById('sideBar').className = "col-lg-5";
        }
        setOpen(!open);
    }

    const fetchUser = useCallback(() => {
        if (localStorage.getItem("user") !== null) {

            const loggedInUser = localStorage.getItem("user")
            setAccount(JSON.parse(loggedInUser));
            //console.log(loggedInUser);
            const name = localStorage.getItem("name")
            console.log(name);
            //setCustName(loggedInUser.name);


        }
        else {
            setCustName("Customer")
        }
    });
    useEffect(() => {

        //setCustName(CustomerLogin.account.name)

        fetchMenu();
        fetchOrderID();
        fetchLineNum();
        fetchCategory();
        fetchUser();




    }, []);

    useEffect(() => {


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
            <div className="row">

                <div className='col-lg-10 ' id="mainContent" >

                    {isLoading ? <img src={logo} style={{ width: "800px" }} alt="loading .. " /> : <div className='row'>

                        {menu.map((product, key) =>

                            <div key={key} className='col-lg-4  '>

                                <div style={{backgroundColor:'var(--secondary)', margin:'5px'}} className='poop border text-center text-uppercase fw-bold rounded' onClick={() => addItemtoCart(product)}>
                                    <p style={{marginTop:'5px',fontSize:'var(--sizer)'}} className="font-weight-bold">{product.Name}</p>
                                    <Magnifier src={product.image} className="img-fluid" alt={product.Name} ></Magnifier>
                                    <p style={{marginTop:'5px',fontSize:'var(--sizer)'}} >${product.Price}</p>
                                </div>
                            </div>
                        )}
                    </div>}
                </div>
                
                <div className="col-lg-2 " id="sideBar">
                    <Button style={{backgroundColor:'var(--primary)',zIndex:'1'}} className="sticky-top " onClick={() => reSizeView(open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        VIEW CART - {cart.length}
                        <img src={Cart} alt="cart" />
                    </Button>

                    {cart.length !== 0 ? <Collapse in={open} dimension="width" >
                        <div style={{zIndex:'1'}} className="position-sticky sticky-top top-30 mt-2" id="example-collapse-text">
                            <div style={{backgroundColor:'var(--secondary)'}} className="table-responsive rounded" >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th >Qty</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart ? cart.map((cartItem, key) => <tr key={key}>
                                            <td>{cartItem.Recipe_ID}</td>
                                            <td>{cartItem.Name}</td>
                                            <td>{cartItem.Price}</td>
                                            <td>
                                                <div className="input-group   w-auto justify-content-space-evenly align-items-center  ">
                                                    <input style={{backgroundColor:'var(--primary)'}} type="button" onClick={() => decrementHandler(cartItem)} value="-" className="button-minus border rounded-circle  icon-shape icon-sm text-white " data-field="quantity"></input>

                                                    <div className=" flex-fill  mx-2"> {cartItem.orderQuantity}</div>

                                                    <input style={{backgroundColor:'var(--primary)'}} type="button" onClick={() => incrementHandler(cartItem)} value="+" className="button-plus border rounded-circle  icon-shape icon-sm  text-white " data-field="quantity"></input>
                                                </div>
                                            </td>
                                            <td>{cartItem.totalAmount.toFixed(2)}</td>
                                            <td >
                                                <button style={{backgroundColor:'var(--primary)'}} className="btn text-white btn-danger btn-sm" onClick={() => removeProduct(cartItem)}> Remove</button>
                                            </td>
                                        </tr>) : ""}

                                    </tbody>
                                </table>
                                <h2  className="px-2">Total Amount: ${totalAmount}</h2>
                            </div>

                            <div className="mt-3">
                                {totalAmount !== 0 ? <div>
                                    <button className="btn1" onClick={() => checkoutPrompt()} >
                                        Check Out</button>



                                </div> : "Please add a product to the cart"}
                            </div>


                        </div>

                    </Collapse> : ""}



                </div>

            </div >

            <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} ><h3>Order Complete! <br></br>
                Your Order Number is #{Order_ID}</h3>

                <p>ORDER SUMMARY</p>
                <div style={{backgroundColor:'var(--secondary)'}} className="table-responsive rounded">
                    <table className="table">
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th > Qty </th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cart ? cart.map((cartItem, key) => <tr key={key}>
                                <td>{cartItem.Recipe_ID}</td>
                                <td>{cartItem.Name}</td>
                                <td>{cartItem.Price}</td>
                                <td >{cartItem.orderQuantity}</td>
                                <td>{cartItem.totalAmount}</td>

                            </tr>)

                                : "No Item In Cart"}

                        </tbody>
                    </table>
                    <h2 className="px-2">Total Amount Due ${totalAmount}</h2>
                </div>

            </PopUp>

            {
                buttonPopup !== true ? <nav className=' navbar  fixed-bottom  justify-content-center  '  >
                    <button className=" poop btn m-2  rounded-circle  my-2" style={{ fontWeight: "600", backgroundColor:'var(--secondary)'}} onClick={() => fetchMenu()}>All Products</button>

                    {uniCate.map((product, key) => <div key={key}>
                        <button style={{backgroundColor:'var(--secondary)'}} className="  btn m-2 h-100  rounded-circle  my-2"
                            onClick={() => removeMenu(product)}>
                            <img src={product.image} className="poop-2 icon-nav" alt={product.Category} ></img>
                        </button>
                        <p style={{backgroundColor:'var(--secondary)'}} className="icon-labels">{product.Category}</p>
                    </div>
                    )}

                </nav> : ""
            }

        </Mainlayout >

    )
}

export default Pospage


