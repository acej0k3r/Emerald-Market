import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({banner}) => {
  return (
    <div className='hero-banner-container'>
        <div>
       
        <p	className='beats-solo'>
               { banner?.smallText } 
        </p>
        <h3	>
            { banner?.midText }
            
        </h3>
        <h1	>
           { banner.largeText1 } 
        </h1>
        
        <img
            src={urlFor( banner?.image)}
            alt='headphones'
            className='hero-banner-image'
            unselectable='on'
            id = 'bannerImage'
            
        />
       
        <div>
            <Link
                href={`/product/${banner.product}`}
            >
                <button	className=''
                    type='button'
                >
                    {
                        banner?.buttonText
                    }  
                </button>
            </Link>
            <div	className='desc'>
                <h5>{
                    banner?.desc
                }</h5>
            </div>
            
        </div>
            
            
        </div>
    </div>
  )
}

export default HeroBanner
