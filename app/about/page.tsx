import TitleTextbox from "@/components/TitleTextbox";
import Headcard from "@/components/headcard";
import { CREATOR_TEAM } from "@/constants";
import { FUSION_BOARD } from "@/components/board";
export default function AboutPage() {
  return (
    <div className='p-10 min-h-screen max-w-screen block'>
        <TitleTextbox>
          ABOUT FU-STAMPS
        </TitleTextbox>
        <p className="items-center justify-center text-center text-black italic text-[clamp(0.5rem,4vw,1.5rem)]"> 
          FU-STAMPS, A WEBSITE FOR FUSION STUDY HOUR STAMP CARDS. 
          AS FUSION’S STUDY HOURS HAVE EXPANDED INTO THE ONLINE SPACE, 
          THE STAMP CARD SYSTEM HAS TOO. FU-STAMPS WAS CREATED TO MAKE IT EASIER FOR MEMBERS TO TRACK THEIR STUDY HOUR PROGRESS,
          REDUCES STAMP FRAUD, AND ENSURES FAIR PRIZE REDEMPTION. AFTER COLLECTING 10 STAMPS, YOU CAN REDEEM A BACON WRAPPED HOTDOG COUPON!
          </p>
    
    <div className='min-h-screen'>
      <TitleTextbox>
        FU-STAMPS DEVELOPERS
      </TitleTextbox>
      <div className='flex flex-wrap md:flex-row gap-6 justify-center w-full px-8'>
        {
          CREATOR_TEAM.map((info, index) => <div key={index}><Headcard {...info} /></div>)
        }
      </div>
    </div>

      <TitleTextbox>
        FUSION BOARD, 2025-2026
      </TitleTextbox>
      <div className='flex flex-wrap md:flex-row gap-6 justify-center w-full px-8'>
        {
          FUSION_BOARD.map((info, index) => <div key={index}><Headcard {...info} /></div>)
        }
      </div>
    </div>
  );
}
