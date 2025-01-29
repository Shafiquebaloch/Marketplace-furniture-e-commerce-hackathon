import React from 'react'
import Image from 'next/image'

const explore = () => {
  return (
    <div>
      <div className="h-auto bg-[#FCF8F3] mt-10 flex flex-col lg:flex-row items-center justify-around">
        <div className="text-center lg:text-left px-6 lg:px-0">
          <h1 className="text-[32px] sm:text-[36px] md:text-[40px] font-bold w-[90%] md:w-[422px]">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-[14px] sm:text-[16px] mt-4 md:mt-6 w-[90%] md:w-[368px]">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <button className="w-[70%] md:w-[176px] h-[48px] bg-[#B88E2F] text-[#FFFFFF] mt-8">
            Explore More
          </button>
        </div>

        <div className="mt-8 lg:mt-0">
          <Image
            src="/images/img6.png"
            alt="last-1"
            width={404}
            height={582}
            className="w-full lg:w-[404px] lg:h-[582px]"
          />
        </div>

        <div className="mt-8 lg:mt-0">
          <Image
            src="/images/img5.png"
            alt="last-1"
            width={372}
            height={486}
            className="w-full lg:w-[372px] lg:h-[486px]"
          />
        </div>
      </div>

      {/* Social Media Section */}
    
      <div className="md:flex flex-col justify-center items-center mb-[56.6px] hidden mt-36">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#616161] font-[600] text-[20px] text-center leading-[30px] ">Share your setup with </h1>
          <h1 className="text-[#3A3A3A] font-[700] text-[40px] text-center leading-[48px] ">#FuniroFurniture </h1>
        </div>
        <div className="flex justify-center items-center">
          <Image src="/images/setup.png" alt="setup" width={1799} height={721} className="w-screen custom:w-[1799px]"></Image>
        </div>
      </div>
      </div>
    
  )
}

export default explore
