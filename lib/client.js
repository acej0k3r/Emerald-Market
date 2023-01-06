import imageUrlBuilder from '@sanity/image-url';
import  sanityClient  from '@sanity/client';



export const client = sanityClient({
    projectId : '1h3pbuit',
    dataset : 'production',
    apiVersion : '2022-12-27',
    useCdn : false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
    
});


const builder = imageUrlBuilder( client );

export const urlFor = (source) =>  builder.image( source );


