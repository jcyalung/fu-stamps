import Image from "next/image";
import fusion_logo from "@/public/fusion_logo.png";
import TitleTextbox from "@/components/TitleTextbox";
import FU_Stamps_title from "@/public/title.png";

export default async function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen text-black  bg-lightyellow">
      <Image src={fusion_logo} alt="Fusion logo"></Image>

      <div className="flex m-h-screen flex-col items-end text-black">
        <Image
          src={FU_Stamps_title}
          alt="Fusion logo"
          className="mt-45 mr-70"
        ></Image>

        <div className="display flex justify-center flex-col text-center gap-10 mt-10">
          
            <h1>
            Unauthorized Page
            </h1>

            <p>
              ay nakU! You are not allowed to access this part of the fu-stamps
              website
            </p>

            <div>
            <TitleTextbox>Return to the homepage </TitleTextbox>
            </div>
        </div>
      </div>
    </main>
  );
}
