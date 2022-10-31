import React, { useEffect, useState } from "react"
import Mainlayout from '../layouts/Mainlayout'
import axios from "axios"

function pospage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([])

    const fetchMenu = async () => {
        setIsLoading(true);
        const result = await axios.get('menuitems');
        setProducts(await result.data);
        setIsLoading(false);
    }

    const addItemtoCart = async (product) => {
        let findItemInCart = await cart.find(i => {
            return i.id === product.id
        });

        if (findItemInCart) {

            let newCart =[];
            let newItem;
            
            cart.forEach(cartItem =>    {
                if(cartItem.id === product.id)
                {
                    newItem={
                        ...cartItem,
                        quantity: cartItem.quantity +1 ,
                        totalAmount: cartItem.price *( cartItem.quantity +1)
                    }

                    newCart.push(newItem);
                }
                else{
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
            setCart([...cart,addingItem]);
        }
    }

    useEffect(() => {

        fetchMenu();
    }, []);

    useEffect(() => {

        console.log(products)
    }, [products]);

    return (
        <Mainlayout>
            <div className='row'>
                <div className='col-lg-8' >

                    {isLoading ? 'Loading' : <div className='row'>

                        {products.map((product, key) =>
                            <div key={key} className='col-lg-4'>
                                <div className='border' onClick={() => addItemtoCart(product)}>
                                    <p>
                                        {product.name}
                                        {/* img src ={products.img} className ="img-fluid" alt  {product.name} */}

                                    </p>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        )}
                    </div>}


                </div>

                <div className="col-lg-4">
                    <div className="table-responsive bg-dark">
                        <table>
                            <thead>
                                <tr>
                                    
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </Mainlayout>

    )
}

export default pospage