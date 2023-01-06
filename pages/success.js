import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { bsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router'
import { useStateContext } from './context/StateContext';
import { runStarExplosion } from '../lib/util';


const Success = () => {
 const { setCartItems, setTotalPrice, setTotalQty } = useStateContext(  );
 
 const [ order, setOrder ] = useState(null);
 
 
 useEffect(() => {
    localStorage.clear();
    setCartItems( [] );
    setTotalPrice( 0 );
    setTotalQty( 0 );
    runStarExplosion();
 
 }, []);
 

  return (
    <div className='success-wrapper'>
      <div className='success' >
        <p className='icon'>
            <bsBagCheckFill  />
            
        </p>
        <h2  >
            Thank you for your order
        </h2>
        <p className='email-msg' >Check your email inbox for the receipt.</p>
        <p className='description' >If you have any question please email
            <a className='email' href='ace.rav3n@gmail.com' >
                Ace.rav3n@gmail.com
            </a>
        </p>
        
        
        
        
        <Link href='/'>
            <button type='button' className='btn'  >
                    Continue Shopping
            </button>
        </Link>
        
        
      </div>
      
    </div>
  )
}

export default Success
