import React, { useEffect, useState } from "react"
import Mainlayout from '../layouts/Mainlayout'
import axios from "axios"

function Pospage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);


    const fetchMenu = async () => {
        setIsLoading(true);
        const result = await axios.get('menuitems');
        setProducts(await result.data);
        setIsLoading(false);
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/get").then((response) => {
            console.log(response.data);
        });
    }, []);

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    const checkoutPrompt = () => {

    }

    const addItemtoCart = async (product) => {
        let findItemInCart = await cart.find(i => {
            return i.id === product.id
        });
        console.log(findItemInCart)
        if (findItemInCart) {

            let newCart = [];
            let newItem;

            cart.forEach(cartItem => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
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
                'quantity': 1,
                'totalAmount': product.price,
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
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount);
    }, [cart]);

    return (
        <Mainlayout>
            <div className='row'>
                <div className='col-lg-8' >

                    {isLoading ? 'Loading' : <div className='row'>

                        {products.map((product, key) =>

                            <div key={key} className='col-lg-4  '>

                                <div className='poop border text-center text-uppercase fw-bold bg-secondary rounded' onClick={() => addItemtoCart(product)}>
                                    <p class="font-weight-bold" style={{ fontWeight: "600" }}>{product.name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.name} ></img>
                                    <p>${product.price}</p>
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
                                    <td>{cartItem.id}</td>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.price}</td>
                                    <td>{cartItem.quantity}</td>
                                    <td>{cartItem.totalAmount}</td>
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
                                    { totalAmount !== 0 ? <div> 
                                        <button className="btn btn-primary" onClick={checkoutPrompt} >
                                            Check Out</button> 
                                        
                                        
                                        
                                        </div> : "Please add a product to the cart"}
                                </div>

                </div>
            </div>

        </Mainlayout>

    )
}

export default Pospage