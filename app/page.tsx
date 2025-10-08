"use client"
import Image from "next/image";
import page_image from '@/components/images/landing_page_section.png';
import logo from '@/components/root/fusion_logo.png';
import ModalSelector from "@/components/root/ModalSelector";
import RewardBox from '@/components/root/reward_box.png';
import { StampProto, StampCardProto, HowItWorks } from "@/components/root/Section2";
import { getUpcomingStudySession } from "@/constants";

export default function Home() {
  const details = getUpcomingStudySession();
  return (
    <main>
      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen bg-lightyellow'>
        <Image
        src={page_image}
        alt="Fu-Stamps logo"
        width={1000}
        height={237}
        className='object-contain max-w-[90%] max-h-[50%]'
        priority
        />

        <a href='/stampcard' className={`transform transition-transform duration-300 hover:scale-105 mt-10 inline-flex px-[80px] py-[4px] justify-end items-center border border-black bg-[#FBCA29] shadow-[4px_6px_0_0_#000000]`}>
            <h1 
              className={`text-center text-white text-[48px] font-extrabold tracking-[3.2px] break-words font-['Verdana',monospace]`}
              style={{
                WebkitTextStroke: '1px black',
              }}
            >
              START STAMPING TODAY
            </h1>
        </a>
      </div>

      <div className='flex flex-col items-center justify-center min-w-screen min-h-screen bg-lightyellow'>
        <div className='flex gap-16 p-4 min-w-screen h-[50px] bg-yellowunderline border-2 border-black justify-center items-center'>
          <span className={`font-bold text-3xl text-black px-2`}>{details.name}</span>
          <span className={`font-bold text-3xl text-black px-2`}>{details.label}, {details.mmdd}</span>
          <span className={`font-bold text-3xl text-black px-2`}>{details.time}</span>
          <span className={`font-bold text-3xl text-black px-2`}>LOCATION: {details.location}</span>
        </div>
      </div>

      <div className='flex flex-col items-center justify-start min-h-screen bg-lightyellow'>
        <div className={`flex gap-16 p-4 max-w-[90%] text-black justify-center items-center`}>
          <p className='font-medium text-center leading-[3rem] text-4xl'>As FUSION'S Study Hours have expanded into the online space, the stamp card system has too! 
            Fu-Stamps was created to make it easier for members to track their study hour progress, reduce stamp fraud,
            and ensure fair prize redemption. After collecting 10 stamps, you can redeem a bacon wrapped hotdog coupon!
          </p>
          <ModalSelector />
        </div>
      </div>


      {/* break line */}
      <div className='flex gap-16 min-w-screen bg-yellowunderline border-2 border-black justify-center items-center' />


      
      <div className="relative w-full min-h-screen bg-lightyellow">
            <div className="absolute left-[33vw] bottom-[16px] z-10">
              <StampProto />
            </div>
            <div className="absolute left-[40vw] top-[12vh] z-10">
              <HowItWorks />
            </div>
            <div className="absolute bottom-0 left-[79vw] z-10">
              <Image
                src={RewardBox}
                alt="hot_dog_reward"
                className="p-6 rounded-2xl"
              />
            </div>
            <div className="absolute left-[13vw] top-[11vh] z-3">
              <StampCardProto
              />
            </div>
            <div className="absolute left-[3vw] top-[28vh] z-1">
              <StampCardProto
                color="white"
                claim={false}/>
            </div>
            <div className="absolute left-[vw] top-0 w-[90%] h-[90%] max-h-screen max-w-screen">
              <Image
                src={logo}
                alt="logo"
                fill
                className="[animation:spin_5s_linear_infinite] object-contain" 
              />
            </div>
      </div>
      

      {/* break line */}
      <div className='flex gap-16 min-w-screen bg-yellowunderline border-2 border-black justify-center items-center' />

      <div className="flex flex-col min-w-screen min-h-screen justify-center px-8">
        {/* Left-aligned heading */}
        <h1
          className="text-5xl font-extrabold font-verdana text-white text-left max-w-lg ml-[5%] font-['Verdana',monospace]"
          style={{
            WebkitTextStroke: '2px black',
            WebkitTextFillColor: 'white',
          }}
        >
          FAQs
        </h1>
        
        {/* Centered content */}
        <div className="flex flex-col items-center justify-center mt-16 gap-8 w-full">
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WHEN ARE STUDY HOURS?
            </h1>
              {(() => {
                // check if study hours is today
                const today = new Date();
                const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth is 0-indexed
                const day = today.getDate().toString().padStart(2, '0');
                const mmdd = `${month}/${day}`;
                if(mmdd === details.mmdd) {
                  return(
                    <span className={`italic text-2xl mt-3`}>
                      Study Hours is happening today at {details.time}! It will be at {details.location}. Come study with FUSION!
                     </span>
                    )
                }
                else {
                  return(
                    <span className={`italic text-2xl mt-3`}>
                        The next Study hours is happening on {details.label}, {mmdd}, during {details.time} at {details.location}.
                    </span>
                    )
                }
              })()}
          </div>
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WILL PHYSICAL STAMP CARDS STILL BE USED?
            </h1>
            <span className={`italic text-2xl mt-3`}> Absolutely! there will still be in-person study hours where you can still you can use a physical card to earn stamps and turn them in for prizes too.</span>
          </div>
          <div className="flex flex-col bg-yellowunderline text-black w-[90%] h-[20%] border-1 border-b-6 border-r-4 p-[32px]">
            <h1 className={`font-bold text-3xl text-left`}>
              WHAT IF I FORGOT TO ADD THE STAMP EVEN THOUGH I WAS IN ATTENDANCE?
            </h1>
            <span className={`italic text-2xl mt-3`}> Talk to an academic director and they can update the system from their end.</span>
          </div>
        </div>
      </div>

    </main>
  );
}
