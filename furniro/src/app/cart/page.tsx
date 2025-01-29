"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from "react-icons/md";
import { Trophy, CheckCircle, Truck, Headphones } from 'lucide-react'
import { client } from '../../sanity/lib/client'; // Assuming this is how you're fetching product data
import cover from "../../../public/images/shopimg.jpg"
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import cartSofa from "../../../Public/Images/cartSofa.png"

interface IProduct {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
}

interface ICartItem {
    product: IProduct;
    quantity: number;
}

const CartPage = () => {
    const [sanityData, setSanityData] = useState<IProduct[]>([]);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    // Fetching product data from Sanity (same as in the first cart page)
    useEffect(() => {
        const fetchData = async () => {
            const query = `*[_type=="product"]{
                _id,
                title,
                price,
                "imageUrl": productImage.asset->url + "?w=500&h=500&fit=crop"
            }`;
            const data: IProduct[] = await client.fetch(query);
            setSanityData(data);
        };

        fetchData();
    }, []);

    // Initialize the cart with data from localStorage
    useEffect(() => {
        const savedCart: string[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const items = savedCart.map((id) => {
            const product = sanityData.find((p) => p._id === id);
            return product ? { product, quantity: 1 } : null;
        }).filter(Boolean) as ICartItem[];

        setCartItems(items);
    }, [sanityData]);

    // Remove an item from the cart
    const removeFromCart = (id: string) => {
        const updatedCart = cartItems.filter(item => item.product._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart.map(item => item.product._id)));
    };

    // Update quantity of an item
    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) return; // Prevent negative or zero quantity
        const updatedItems = cartItems.map(item =>
            item.product._id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems.map(item => item.product._id)));
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <>
        <Navbar/>
            <div className="relative w-full h-[300px] flex flex-col items-center justify-center mb-6">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={cover}
                        alt="Shop header background"
                        fill
                        className="object-cover brightness-95"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="relative z-10 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Cart</h1>
                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center justify-center space-x-2 text-sm md:text-base">
                        <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Home
                        </Link>
                        <span className="text-gray-400">&gt;</span>
                        <span className="text-gray-800">Cart</span>
                    </nav>
                </div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col lg:flex-row lg:h-[525px] items-center lg:justify-around">
                <div className="flex flex-col w-full lg:w-auto">
                    <nav className="h-[55px] w-full lg:w-[817px] bg-[#F9F1E7] flex items-center justify-around list-none text-sm lg:text-base">
                        <li>Product</li>
                        <li>Price</li>
                        <li>Quantity</li>
                        <li>Subtotal</li>
                    </nav>

                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.product._id} className="mt-6 lg:mt-14 flex items-center justify-around flex-wrap gap-4">
                                <Image
                                    src={item.product.imageUrl}
                                    alt={item.product.title}
                                    width={108}
                                    height={105}
                                    className="w-[72px] lg:w-[108px] h-auto"
                                />
                                <span className="text-sm lg:text-base">{item.product.title}</span>
                                <span className="text-sm lg:text-base">Rs. {item.product.price}</span>
                                {/* Quantity Input */}
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                                    className="w-[40px] text-center border border-gray-300 p-2 rounded"
                                />
                                <span className="text-sm lg:text-base">Rs. {item.product.price * item.quantity}</span>
                                {/* Remove Item Button */}
                                <MdDelete className="cursor-pointer font-bold text-2xl" onClick={() => removeFromCart(item.product._id)} />
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>

                {/* Cart Totals */}
                <div className="bg-[#F9F1E7] w-full lg:w-[393px] h-auto lg:h-[390px] mt-8 lg:mt-0 p-6 rounded-lg flex flex-col items-center justify-center">
                    <h1 className="text-center text-[24px] lg:text-[32px] font-semibold mb-6">Cart Totals</h1>
                    <div className="flex items-center justify-between mb-4 w-full px-4 lg:px-0">
                        <h3 className="text-sm lg:text-base">Subtotal</h3>
                        <span className="text-sm lg:text-base">Rs. {totalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 w-full px-4 lg:px-0">
                        <h3 className="text-sm lg:text-base">Total</h3>
                        <span className="text-sm lg:text-base text-[#B88E2F]">Rs. {totalPrice}</span>
                    </div>
                    <Link href={"/checkout"}>
                        <button className="border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px]">
                            Check Out
                        </button>
                    </Link>
                </div>
            </div>

            {/* Additional Features */}
            <section className="bg-[#FDF8F7] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* High Quality */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center mb-4">
                                <Trophy className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">High Quality</h3>
                            <p className="text-gray-500">crafted from top materials</p>
                        </div>

                        {/* Warranty Protection */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Warranty Protection</h3>
                            <p className="text-gray-500">Over 2 years</p>
                        </div>

                        {/* Free Shipping */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center mb-4">
                                <Truck className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
                            <p className="text-gray-500">Order over 150 $</p>
                        </div>

                        {/* 24/7 Support */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 flex items-center justify-center mb-4">
                                <Headphones className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">24 / 7 Support</h3>
                            <p className="text-gray-500">Dedicated support</p>
                        </div>
                    </div>
                </div>
            </section>
        
            <Footer />
        </>
    );
};

export default CartPage;
