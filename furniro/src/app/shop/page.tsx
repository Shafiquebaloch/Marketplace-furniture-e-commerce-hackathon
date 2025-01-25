"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

// Define the type for the product image
interface ProductImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: ProductImage; // Use the specific type for product image
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const getProducts = async () => {
    try {
      const productsData = await client.fetch(
        `*[_type == "product"] {
          title,
         description,
          productImage,
          price,
         tags,
        discountPercentage,
       isNew
}

    `
      );
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div>
        <Image
          src={"/images/shop.svg"}
          alt="shop"
          width={1440}
          height={316}
          className="w-full h-auto mt-20 object-cover"
        />
      </div>

      {/* Filters Section */}
      <div className="h-auto bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-between p-4 sm:px-8 lg:px-16 shadow-md">
        <div className="flex items-center space-x-4">
          <Image src="/images/dotted-line.svg" alt="dotted-line" width={25} height={25} />
          <h3 className="text-lg sm:text-xl font-medium">Filter</h3>
          <Image src="/images/four-dot.svg" alt="four-dot" width={25} height={25} />
          <Image src="/images/square-line.svg" alt="square-line" width={25} height={25} />
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <span className="text-sm sm:text-base">Showing 1–16 of 32 results</span>
          <span className="text-sm sm:text-base">Show</span>
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center shadow">
            <h3 className="text-gray-600 text-sm sm:text-base">16</h3>
          </div>
          <span className="text-sm sm:text-base">Sort by</span>
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center shadow">
            <h3 className="text-gray-600 text-sm sm:text-base">Default</h3>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-950"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 sm:px-8 lg:px-16 bg-[#F8F9FA]">
          {products.map((product) => (
            <div
              key={product._id} // Ensure each product has a unique key
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              {product.productImage && (
                <div className="relative w-full h-[300px]">
                  <Image
                    src={urlFor(product.productImage).url()}
                    alt={product.title}
                    fill // Use the new fill property for image sizing
                    style={{ objectFit: "cover" }} // Apply objectFit as style
                    className="rounded-t-lg"
                  />
                </div>
              )}

              {/* Product Details */}
              <div className="p-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <span className="text-xl font-semibold text-gray-600">
                  Rp {product.price.toLocaleString()}
                </span>
                <Link href={`/shop/${product._id}`}>
                  <button className="mt-4 w-full bg-red-700 text-white py-2 rounded-md hover:bg-gray-800 transition-all">
                    View Product Detail
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShopPage;
