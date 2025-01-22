"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SlArrowRight } from 'react-icons/sl';
import { RiDeleteBinLine } from 'react-icons/ri';
import { GrTrophy } from 'react-icons/gr';
import { GoVerified } from 'react-icons/go';
import { FaShippingFast } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    alt: string;
    slug: { current: string };
    quantity: number;
}

export default function CartPage() {
    const [sanityData, setSanityData] = useState<Product[]>([]);
    const [cart, setCart] = useState<string[]>([]); // Update cart type to `string[]` for `_id`
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const query = `*[_type == "product"]{  // Remove $slug if not needed
        _id,
        name,
        description,
        price,
        originalPrice,
        discount,
        image,
        alt,
        slug
      }`;

            const data: Product[] = await client.fetch(query); // Specify type of `data`
            setSanityData(data);
        };

        fetchProduct();  // Corrected function name
    }, []);

    useEffect(() => {
        const savedCart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);

        const items = savedCart
            .map((id) => sanityData.find((p) => p._id === id))
            .filter((item): item is Product => Boolean(item)); // Type guard to ensure `Product[]`
        setCartItems(items);
    }, [sanityData]);

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter((productId) => productId !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        const updatedItems = updatedCart
            .map((id) => sanityData.find((p) => p._id === id))
            .filter((item): item is Product => Boolean(item));
        setCartItems(updatedItems);
    };

    const clearCart = () => {
        setCart([]);
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);


    return (
        <div className="max-w-[1440px] mx-auto overflow-hidden">
            <div>
                <Image
                    src={"/images/cart-img.png"}
                    alt="cart-section"
                    width={1440}
                    height={316}
                    className="w-full h-auto mt-20"
                />
            </div>

            <div className="flex flex-col custom:flex-row justify-between items-start lg:items-center custom:items-start mx-4 lg:mx-[100px] my-[56px] gap-8 lg:gap-0">
                <div className="flex flex-col justify-start items-center gap-[56px] w-full lg:w-auto">
                    <div className="w-full hidden lg:w-[817px] h-[55px] bg-[#F9F1E7] rounded-lg md:flex justify-between items-center px-[30px]">
                        <h1 className="font-[500] text-[16px] leading-6">Product</h1>
                        <h1 className="font-[500] text-[16px] leading-6">Price</h1>
                        <h1 className="font-[500] text-[16px] leading-6">Actions</h1>

                    </div>

                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item._id} className="w-full lg:w-[817px] h-auto flex flex-col md:flex-row justify-between items-center pr-[30px] gap-4 lg:gap-0">
                                <div className="flex justify-start items-center gap-3">
                                    <div className="flex justify-center items-center bg-[#F9F1E7] size-[105px] rounded-[10px]">
                                        <Image src={item.image} alt={item.name} width={90} height={50} className='rounded-lg object-scale-down w-full h-full' />
                                    </div>
                                    <h1 className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F]">{item.name}</h1>
                                </div>
                                <h1 className="font-[500] text-[16px] leading-6 text-[#9F9F9F]">Rs. {item.price}</h1>


                                <button onClick={() => removeFromCart(item._id)}>
                                    <RiDeleteBinLine className="text-[#B88E2F] scale-150 hover:text-red-700 duration-300 ease-in-out hover:scale-[2]" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Your cart is empty</p>
                    )}
                </div>

                <div className="w-full lg:w-[393px] h-auto bg-[#F9F1E7] rounded-lg px-[20px] lg:px-[75px] py-3 flex flex-col justify-start items-center">
                    <h1 className="font-[600] text-[32px] leading-[48px] text-black text-center">Cart Totals</h1>
                    <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[56px] w-full">
                        <h1 className="font-[500] text-[16px] text-black">Subtotal</h1>
                        <h1 className="font-[500] text-[16px] text-[#9F9F9F]">Rs. {totalPrice}</h1>
                    </div>
                    <div className="flex justify-between items-center gap-[20px] lg:gap-[50px] mt-[26px] w-full">
                        <h1 className="font-[500] text-[16px] text-black">Total</h1>
                        <h1 className="font-[500] text-[20px] text-[#B88E2F]">Rs. {totalPrice}</h1>
                    </div>
                    <Link href="/checkout">
                        <button className="w-[222px] h-[58.95px] border border-black rounded-[15px] mt-[50px] hover:bg-black hover:text-white ease-in-out duration-300">
                            Check Out
                        </button>
                    </Link>
                    <button onClick={clearCart} className="w-[222px] h-[58.95px] border border-red-500 rounded-[15px] mt-[10px] text-red-500 hover:bg-red-500 hover:text-white ease-in-out duration-300">
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>

    );
}