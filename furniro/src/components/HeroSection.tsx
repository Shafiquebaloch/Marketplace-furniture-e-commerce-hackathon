import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import backgroundImg from "../../public/images/background.jpg"

const HeroSection = () => {
    return (
        <>
<div>
    <div className="relative min-h-screen w-full">
      {/* Full-size background image */}
      <Image
        src={backgroundImg}
        alt="Modern furniture setting with rattan chair and palm plant"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end">
        <div className="mx-4 max-w-xl bg-[#FDF8F2] bg-opacity-90 p-6 md:mr-16 md:p-12 lg:mr-24 lg:p-16">
          <span className="mb-4 block text-lg font-medium text-center md:text-left">
            New Arrival
          </span>
          <h1 className="mb-6 text-3xl font-bold text-[#B8860B] md:text-4xl lg:text-5xl">
            Discover Our
            <br />
            New Collection
          </h1>
          <p className="mb-8 text-gray-600 text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <div className="text-center md:text-left">
            <Link
              href="../shop"
              className="inline-block bg-[#B8860B] px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-[#986F0B]"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
    </div>

            </div>
            <h1 className='text-[32px] font-bold text-center mt-10'>Browse The Range</h1>
            <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className='flex flex-wrap items-center justify-center mt-16 gap-8'>
                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img1.png"}
                        alt='img-1'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Dining</h3>
                </div>

                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img2.png"}
                        alt='img-2'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Living</h3>
                </div>

                <div className='flex flex-col items-center max-w-[300px] sm:max-w-[100%]'>
                    <Image
                        src={"/images/img3.png"}
                        alt='img-3'
                        width={381}
                        height={480}
                        className="max-w-[100%] h-auto"
                    />
                    <h3 className='text-center text-2xl mt-6'>Bedroom</h3>
                </div>
            </div>
        </>
    )
}

export default HeroSection