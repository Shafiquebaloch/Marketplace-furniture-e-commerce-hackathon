"use client";
import React, { useState, useEffect } from 'react';
import { SlArrowRight } from "react-icons/sl";
import { FaStarHalf } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from "next/navigation";
import Head from 'next/head';

interface IProducts {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<IProducts | null>(null);
  const { id } = useParams();
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const query = `*[_type == "product" && _id == $id] {
      _id,
      title,
      price,
      description,
      "imageUrl": productImage.asset->url + "?w=500&h=500&fit=crop"
    }`;

    const fetchProduct = async () => {
      try {
        const productDetail = await client.fetch(query, { id });
        if (productDetail.length > 0) {
          setProduct(productDetail[0]);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product: ", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const HandleAddToCart = () => {
    if (!product) {
      console.log("Product is null or undefined.");
      return;
    }

    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const productAdded = currentCart.findIndex(
        (item: IProducts) => item._id === product._id
      );

      if (productAdded !== -1) {
        currentCart[productAdded].quantity += 1;
      } else {
        currentCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error) {
      console.error("Error adding to cart: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-950"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <p className="text-xl">{error}</p>
          <Link href="/shop">
            <a className="text-blue-500">Go back to shop</a>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <p className="text-xl">Product not found</p>
          <Link href="/shop">
            <a className="text-blue-500">Go back to shop</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} - Shop</title>
        <meta name="description" content={product.description} />
        <meta property="og:image" content={product.imageUrl} />
      </Head>

      <div className='max-w-[1440px] mx-auto overflow-hidden mt-20'>
        <div className="h-full md:h-[100px] bg-[#F9F1E7] flex justify-start items-center py-2 md:py-0 px-5 md:px-[100px] gap-[24px] mb-[56.6px]">
          <div className="flex justify-center items-center gap-[20px]">
            <Link href="/" className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F] hover:underline underline-offset-4 hover:text-black duration-300 ease-in-out">Home</Link>
            <h1 className="flex justify-center items-center"><SlArrowRight className='scale-[1]' /></h1>
          </div>
          <div className="flex justify-center items-center gap-[20px]">
            <Link href="/shop" className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F] hover:underline underline-offset-4 hover:text-black duration-300 ease-in-out">Shop</Link>
            <h1 className="flex justify-center items-cnter"><SlArrowRight className='scale-[1]' /></h1>
          </div>
          <div className="flex justify-center items-center text-[#9F9F9F] font-[400] ">|</div>
          <div className="font-[400] text-[16px] text-black leading-[24px]">{product.title}</div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center md:items-start gap-[105px] lg:gap-[10px] xl:gap-[105px] mx-5 md:mx-[100px] lg:mx-2 xl:mx-[100px] mb-[56.6px] lg:w-screen xl:w-full">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-[32px]">
            <div className="grid grid-cols-1 grid-rows-4 justify-center items-center gap-[32px] lg:hidden xl:grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-center items-center bg-[#F9F1E7] w-[76px] h-[80px] rounded-[10px]">
                  <Image src={product.imageUrl} alt={product.title} width={83} height={55} className='rounded-lg object-scale-down' />
                </div>
              ))}
            </div>

            <div className="md:flex justify-center items-center bg-[#F9F1E7] p-6 h-[500px] w-[423px] rounded-[10px] hidden">
              <Image src={product.imageUrl} alt={product.title} width={481} height={391} className='rounded-lg w-[481px] h-[500px] object-scale-down' />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start gap-[18px]">
            <div className="">
              <h1 className="font-[400] text-[42px] leading-[63px]">{product.title}</h1>
              <h1 className="font-[500] text-[24px] leading-[36px] text-[#9F9F9F]">Rs. {product.price}</h1>
            </div>

            <div className="flex justify-center items-center gap-[20px] mt-2">
              <div className="flex justify-center items-center gap-1">
                <FaStar className='scale-[1] text-[#FFC700]' />
                <FaStar className='scale-[1] text-[#FFC700]' />
                <FaStar className='scale-[1] text-[#FFC700]' />
                <FaStar className='scale-[1] text-[#FFC700]' />
                <FaStarHalf className='scale-[1] text-[#FFC700]' />
              </div>
              <div className="font-[400] text-xl text-[#9F9F9F]">|</div>
              <div className="font-[400] text-[13px] leading-[19.5px] text-[#9F9F9F]">5 Customer Review</div>
            </div>
            
            <h1 className="font-[400] text-[13px] text-[#9F9F9F] text-center md:text-left w-screen md:w-full mx-5 md:mx-0 custom:w-[424px] mt-3">{product.description}</h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-[12px]">
              <button
                onClick={HandleAddToCart}
                className="w-[215px] h-[64px] flex justify-center px-3 rounded-[10px] items-center gap-3 border border-[#9F9F9F] bg-white hover:bg-black/10 hover:shadow-lg shadow-black duration-300 ease-in-out">
                Add To Cart
              </button>
            </div>

            {isAdded && (
              <div className="text-green-600 font-bold mt-3">
                Product successfully added to cart!
              </div>
            )}

            <div className="w-[605.1px] h-[1px] bg-[#D9D9D9] my-[40px]"></div>

            <div className="flex justify-center items-center gap-[12px]">
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">SKU</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">Category</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">Tags</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">Share</h1>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">:</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">:</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">:</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">:</h1>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">SS001</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">Sofas</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">Sofa, Chair, Home, Shop</h1>
                <h1 className="font-[400] text-[16px] leading-[24px] text-[#000000] flex justify-center items-center gap-[12px]">
                  <FaFacebook />
                  <FaLinkedin />
                  <FaTwitter />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
