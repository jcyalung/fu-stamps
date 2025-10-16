import Image from "next/image";
import fusion_logo from "@/public/fusion_logo.png";
import TitleTextbox from "@/components/TitleTextbox";
import FU_Stamps_title from "@/public/title.png";

export default async function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen text-black  bg-lightyellow">
      <Image src={fusion_logo} alt="Fusion logo"></Image>

      <div className="flex m-h-screen flex-col items-center text-black">
        <Image
          src={FU_Stamps_title}
          alt="Fusion logo"
          className="mt-45 mr-50"
        ></Image>

        <div className="display flex justify-center flex-col text-center items-center gap-10 mt-10">
          <h1 className="font-bold font-montesserat text-[48px] ">UNAUTHORIZED PAGE</h1>
          
          
          <div className="w-[459px] h-[117px] flex justify-center text-center">
          <p className="text-[32px] font-italic font-Montserrat font-light">
            ay nakU! You are not allowed to access this part of the fu-stamps website
          </p>
          </div>




          <div className="t-[16px] r-[24px] b-[16px] l-[24px] h-[74px] w-[348px] bg-[#FBCA29] border-black border drop-shadow-md justify-center items-center flex">
            <p className=" text-[20px] font-montserrat">RETURN TO THE HOME PAGE</p>
          </div>
        </div>
      </div>
    </main>
  );
}
