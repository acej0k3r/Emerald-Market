import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from './../../component/Product';
import { useStateContext } from '../context/StateContext';



const notImpl = (e) => {

    console.trace(e);

}



const ProductDetails = ({ product , products }) => {
  
  const {image, name, details , price } = product
  const [index, setIndex] = useState(0);
  const {decQty, incQty, qty, onAdd, setShowCart } = useStateContext(  );
  
  
  const handleBuyNow = () => {

    onAdd(product, qty);
    setShowCart( true );

}
  
  return (
    <div>
        <div className='product-detail-contianer' >
            <div  >
                <div className='image-container' >
                    <img
                        src={ urlFor( image && image[index] ) }
                        alt={`img id: ${image[index]._key}`}
                        className='product-detail-image'
                    />
                    
                </div>
                <div className='small-images-container' >
                    {   
                        image.map( (singleImg, i) => (
                            <img
                                src={urlFor(singleImg)}
                                alt='product-image'
                                className={ i === index ? 'small-image selected-image' : 'small-image'}
                                key={ i }
                                onMouseEnter={() => {
                                
                                    return setIndex( i )
                                
                                }}
                            />
                        )) 
                    }
                </div>
            </div>
            <div className='product-detail-desc' >
                <h1 className='' >
                    {name}
                </h1>
                <div className='reviews' >
                    <div  >
                        <AiFillStar  />
                        <AiFillStar  />
                        <AiFillStar  />
                        <AiFillStar  />
                        <AiOutlineStar  />
                        
                    </div>
                    <p>(20)</p>
                </div>
                
                <h4  >
                   Details:  
                </h4>
                <p className='' >
                    {details}
                </p>
                <p className='price' >
                    {price}
                </p>
                <div className='quantity' >
                    <h3  >
                        Quantity:
                    </h3>
                    <p className='quantity-desc' >
                        <span className='minus'
                            onClick={decQty}
                        >
                            <AiOutlineMinus  />
                            
                        </span>
                        
                        <span className='num'
                            
                        >
                           {qty}
                            
                        </span>
                        
                        <span className='plus'
                            onClick={incQty}
                        >
                            <AiOutlinePlus  />
                            
                        </span>
                        
                    </p>
                </div>
                
                <div className='buttons' >
                    <button type='button' 
                        className='add-to-cart'
                        onClick={() => {
                        
                            onAdd( product, qty)
                        
                        }}
                    >
                        Add to Cart
                    </button>
                    
                    <button type='button' 
                        className='buy-now'
                        onClick={ handleBuyNow }
                    >
                    Buy now
                    </button>
                </div>
            </div>
        </div> { /* end of product detail container */}
        
        <div className='maylike-products-wrapper' >
            <h2>You may also like</h2>
            <div className='marquee' >
                <div className='maylike-products-container track' >
                    {
                        products.map( (item) => {
                        
                        return <Product key={item._id} product={item}/> 
                            
                        
                        })
                    }
                </div>
                
            </div>
            
        </div>
        
            
        
        
        
        
    </div>
  )
}


export const getStaticPaths = async () => {
    const getProductSlugQuery = `*[_type == "product"]{
    slug{
         current
        }
    }`;
    
    const productArr = await client.fetch( getProductSlugQuery );
    
    const paths = productArr?.map( (product) => ({
        params : {
            slug : product?.slug?.current
        }
    
    }))
    
    console.log( paths )
    return {
      paths : paths,
      fallback: 'blocking', // can also be true or 'blocking'
    }
  }


export const getStaticProps = async ({ params : { slug } }) => {

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;
    
    const product = await client.fetch( query );
    const products = await client.fetch( productsQuery ); 


    return {
            props : { products, product  }
    }
    

}


export default ProductDetails
