import Image from "next/image";
import logo from '@/components/root/fusion_logo.png';
export default function LogoBackground() {
  return (
      <div className='absolute inset-0 flex items-center justify-center -z-10'>
          <Image
              src={logo}
              alt="Background Logo"
              className="absolute flex-col items-center -z-10 object-contain"
              width={720}
              height={720}
          />
    </div>
  );
}
"absolute flex flex-col justify-center pt-20 items-center opacity-10 -z-10"