import React from 'react';
import Image from 'next/image';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import HeroSection from '../components/HeroSection';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // Import Header
import Footer from '../components/Footer'; // Import Footer
import Feature from '../components/Feature'; // Import Feature component
import Explore from '../components/explore';

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: string;
}

const getProducts = async () => {
  const products = await client.fetch(
    `*[_type == "product"][0..7]{
      _id,
      title,
      description,
      price,
      productImage,
      tags
    }`
  );
  return products;
};

const MyProducts = async () => {
  const products = await getProducts();

  // Handle empty products array
  if (!products || products.length === 0) {
    return <p>No products available at the moment.</p>;
  }

  return (
    <>
      <Navbar /> {/* Render Header */}
      
      <HeroSection />
      <h1 className="text-[40px] text-center font-bold mt-14 mb-6">Our Products</h1>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="w-full max-w-[285px] bg-[#F4F5F7] mx-auto rounded-lg shadow-lg flex flex-col items-center"
          >
            {/* Product Image */}
            {product.productImage && (
              <div className="relative w-[285px] h-[285px]">
                <Image
                  src={urlFor(product.productImage).url() || '/images/default-product.jpg'} // fallback image
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Product Title */}
            <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4">{product.title}</h3>

            {/* Product Price */}
            <div className="flex justify-center mt-2">
              <span className="text-[16px] font-semibold text-[#3A3A3A] text-2xl">
                Rp {product.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

    

      {/* Show More Button */}
      <div className="flex items-center justify-center mt-6">
        <Link href={"/shop"}>
          <button className="w-[245px] h-[48px] bg-[#FFFFFF] border border-[#B88E2F] text-[#B88E2F]">
            Show More
          </button>
        </Link>
      </div>
  <Explore/>
  <Feature /> 
      <Footer /> 
    </>
  );
};

export default MyProducts;
