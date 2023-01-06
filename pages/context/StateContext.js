import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext(); //allows for context which doesnt render but passses values to whats between the tags created from this


export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, qty) => {
        
        if( cartItems === null || cartItems === undefined){
            setCartItems([]);
            console.log( cartItems.length );
        }
        
        const checkProductInCart = cartItems.find((item) => {

            return item._id === product._id

        })

        setTotalPrice((previousTotalPrice) => {
            return previousTotalPrice + product.price * qty
        })

        setTotalQty((prevTotalQ) => prevTotalQ + qty)

        if (checkProductInCart) {


            const updatedCartItems = cartItems.map((cartProduct) => {
                //return{} returns an object hence, the following is an object of ...cartProduct, qty
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    qty: cartProduct.qty + qty
                }

            })
            setCartItems(updatedCartItems);
            
            
        }else{
            product.qty = qty   //in javascript we can add a property to an object simply by . operator or we can use the brackets ex. product["qty"] = qty
            setCartItems([...cartItems, { ...product }]);
            
        }
        
        setQty( 1 );
        
        toast.success(`${qty} ${product.name} added to the cart.`);

    }

    const onRemove = (id) => {
    
        foundProduct = cartItems.find( (item) =>  item._id === id  )
    
        const newCartItems = cartItems.filter((item) => item._id !== id)
        
        setTotalPrice( (prevTotalPrice) =>  prevTotalPrice - ( foundProduct.price * foundProduct.qty )  )
        
        setTotalQty( (prevTotalQty) =>  prevTotalQty - foundProduct.qty  )
        
        setCartItems( newCartItems );
    }


    const totalCartItemQty = (id, value) => {
        
        foundProduct = cartItems.find( (item) =>  item._id === id  )
        index = cartItems.findIndex( (item) =>  item._id === id  )
        const newCartItems = cartItems.filter((item) => item._id !== id)
        
        if( value === 'inc' ){
            setCartItems([...newCartItems,{ ...foundProduct, qty: foundProduct.qty + 1 } ])
            
            setTotalPrice( (prevTotalPrice) =>  prevTotalPrice + foundProduct.price  )
            
            setTotalQty( (prevTotalQty) =>  prevTotalQty + 1  )
        }else if( value === 'dec' ){
            
            if( foundProduct.qty > 1 ){
                setCartItems([...newCartItems,{ ...foundProduct, qty: foundProduct.qty - 1 } ])
            
                setTotalPrice( (prevTotalPrice) =>  prevTotalPrice - foundProduct.price  )
                
                setTotalQty( (prevTotalQty) =>  prevTotalQty - 1  )
            }else{
                setTotalPrice( (prevTotalPrice) =>  prevTotalPrice - ( foundProduct.price * foundProduct.qty )  )
        
                setTotalQty( (prevTotalQty) =>  prevTotalQty - foundProduct.qty  )
                
                setCartItems( newCartItems );
            }
           
            
        }
        
    
    }




    const incQty = () => {

        setQty((prevQty) => {

            return prevQty + 1;

        });

    }

    const decQty = () => {

        setQty((prevQty) => {

            if (prevQty - 1 < 1) {
                return 1;
            }
            else {
                return prevQty - 1;
            }

        });

    }


    return (
        <Context.Provider
            value={
                {
                    showCart,
                    setShowCart,
                    cartItems,
                    setCartItems,
                    totalPrice,
                    setTotalPrice,
                    totalQty,
                    setTotalQty,
                    qty,
                    incQty,
                    decQty,
                    onAdd,
                    totalCartItemQty, 
                    onRemove

                }
            }
        >
            {children}
        </Context.Provider>

    )

}


export const useStateContext = () => {

    return useContext(Context); // alllows us to pass the context as a hook that can be imported by any of the children component

}