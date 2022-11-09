import React, { useEffect, useState } from "react"
import Mainlayout from '../layouts/Mainlayout'
import PopUp from "../components/PopUp";
import axios from "axios"

function Pospage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [buttonPopup, setButtonPopup] = useState(false);


    const [Order_ID, setOrderID] = useState(0);
    const [lineNum, setlineNum] = useState([]);
    const [Cust_Name, setCustName] = useState("");



    const fetchMenu = async () => {
        setIsLoading(true);
        const result = await axios.get('user');
        setProducts(await result.data);
        setIsLoading(false);
    }



    useEffect(() => {
        axios.get("http://localhost:3001/user").then((response) => {
            console.log(response.data);
        });
    }, []);

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.Recipe_ID !== product.Recipe_ID);
        setCart(newCart);
    }



    const fetchOrderID = async () => {
        axios.get("http://localhost:3001/orderid").then((response) => {
            setOrderID(response.data);
        });
        const result = await axios.get('orderid');
        setOrderID(await result.data.var_order);



        console.log(Order_ID);
    }


    const fetchLineNum = async () => {

        const result = await axios.get('linenum');
        setlineNum(await result.data);
        const newLine = lineNum + 1;
        setlineNum(newLine);
        //console.log(lineNum);
    }

    const checkoutItem = (cartItem) => {

        fetchLineNum();

        // axios.post("http://localhost:3001/checkout", {

        //     //fetch line
        //     Line_Num: lineNum,
        //     Order_ID: Order_ID,
        //     Cust_Name: Cust_Name,
        //     Recipe_ID: cartItem.Recipe_ID,


        // });
    };




    const checkoutPrompt = async () => {

        setButtonPopup(true)
        fetchOrderID();
        cart.forEach(cartItem => {
            //checkoutItem
            //pass same order number 

            setCustName("Steve");
            checkoutItem(cartItem);
            // console.log(Order_ID);
            // console.log(cartItem.Name);
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
            console.log(cart)
        }
    }

    useEffect(() => {

        fetchMenu();
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
        <Mainlayout>
            <div className='row'>
                <div className='col-lg-8' >

                    {isLoading ? 'Loading' : <div className='row'>

                        {products.map((product, key) =>

                            <div key={key} className='col-lg-4  '>

                                <div className='poop border text-center text-uppercase fw-bold bg-secondary rounded' onClick={() => addItemtoCart(product)}>
                                    <p className="font-weight-bold" style={{ fontWeight: "600" }}>{product.Name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.Name} ></img>
                                    <p>${product.Price}</p>
                                </div>
                            </div>
                        )}
                    </div>}


                </div>

                <div className="col-lg-4 ">
                    <div className="table-responsive bg-secondary rounded">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart ? cart.map((cartItem, key) => <tr key={key}>
                                    <td>{cartItem.Recipe_ID}</td>
                                    <td>{cartItem.Name}</td>
                                    <td>{cartItem.Price}</td>
                                    <td>{cartItem.orderQuantity}</td>
                                    <td>{cartItem.totalAmount.toFixed(2)}</td>
                                    <td >
                                        <button className="btn bg-primary text-white   btn-danger btn-sm" onClick={() => removeProduct(cartItem)}> Remove</button>
                                    </td>
                                </tr>)

                                    : "No Item In Cart"}

                            </tbody>
                        </table>
                        <h2 className="px-2">Total Amount: ${totalAmount}</h2>
                    </div>


                    <div className="='mt-3">
                        {totalAmount !== 0 ? <div>
                            <button className="btn btn-primary" onClick={() => checkoutPrompt()} >
                                Check Out</button>



                        </div> : "Please add a product to the cart"}
                    </div>

                </div>
            </div>

            <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} ><h3>Order Complete! <br></br>
                Your Order Number is #{Order_ID}</h3>

                <p>ORDER SUMMARY</p>
                <div className="table-responsive bg-secondary rounded">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cart ? cart.map((cartItem, key) => <tr key={key}>
                                <td>{cartItem.Recipe_ID}</td>
                                <td>{cartItem.Name}</td>
                                <td>{cartItem.Price}</td>
                                <td>{cartItem.orderQuantity}</td>
                                <td>{cartItem.totalAmount}</td>

                            </tr>)

                                : "No Item In Cart"}

                        </tbody>
                    </table>
                    <h2 className="px-2">Total Amount Due ${totalAmount}</h2>
                </div>
            </PopUp>

        </Mainlayout >

    )
}

export default Pospage