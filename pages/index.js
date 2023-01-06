import React from 'react'
import {Product, FooterBanner, HeroBanner } from '../component'
import {client}  from '../lib/client'


const Home = ({products, banner}) => {
  return (
    <>
    {
      //give the first item which would be the banner array
    }
      <HeroBanner banner = {banner.length > 0 && ( banner[0] )}/>
     
        
      <div className='products-heading'>
        <h2	>
          Best Selling products
        </h2>
        <p	>
          Speakers of many variations
        </p>
      </div>
      
      <div	className='products-container'>
        {
          products?.map( (product) => (  
            <Product
              key={ product._id } product={ product }
            />
            
          ))
        }
        
      </div>
      
      <FooterBanner footerBanner={banner && banner[0]}/>
      <>
      {
        (() => {
          console.log( banner )
        })()
      }
      </>
      
      
      
    </>
  )
};


export const getServerSideProps = async () => {

  if( client != null && client != undefined ){
    const query ='*[_type == "product"]';
    const products = await client.fetch(query);
    
    const bannerQuery ='*[_type == "banner"]';
    const banner = await client.fetch(bannerQuery);
    
    return {
      props : {products, banner}
    }

  }else{
    const x = "client not found"
    const products = [x,x];
    const banner = [x,x];
    
    return {props : {products, banner}}
  }
  
} 

export default Home;
