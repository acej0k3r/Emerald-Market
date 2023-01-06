import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Image from 'next/image'
import Emerald from '../assets/assets/emerald.png'
import Cart from './Cart';
import { useStateContext } from '../context/StateContext'; 



const Navbar = () => {
  const { showCart, setShowCart, totalQty  } = useStateContext();
  
  return (
    <div className='navbar-container' >
      <div className='logo' >
        <Link href="/">
          
            <Image
              priority
              src={Emerald}
              alt='emerald-logo'
              width={40}
              height={40}
              referrerPolicy='no-referrer'
              style={{align:"center", marginRight:"5px", display:'flex', flexDirection : "column", justifySelf:"center", paddingTop : "3px", marginBottom : "5px", float : 'left'}}
            />
            
            <p style={{float : "none"}}>
              Emerald Market
            </p>
          
          
        </Link>
      </div>
      
      <button type='button'
        className='cart-icon'
        onClick={() => {
          setShowCart( true );
        }}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty' >
          1
        </span>
        
      </button>
      {
        showCart && (
          <Cart  />
        )
      }
      
    </div>
  )
}

export default Navbar
