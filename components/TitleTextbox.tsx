import React from "react";

interface TitleTextboxProps {
    children: React.ReactNode;
    className?: string;
}

// const TitleTextbox: React.FC<TitleTextboxProps> = ({ children, className = "" }) => {
//     return (
//     <div 
//     style={{
//       display: 'inline-flex',
//       padding: '4px 80px',
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       margin: '60px', // temporary while other items aren't on page
//       
//       border: '1px solid #000000',
//       backgroundColor: '#FBCA29',
//       boxShadow: '4px 6px 0 0 #000000'
//       }}
//     >
//       {/* text within the title box */}
//       <div 
//       className={className}
//       style={{
//         textAlign: 'center',
//         color: 'white',
//         WebkitTextStroke: '1px black',
//         fontSize: '48px', // original font size was 64
//         fontFamily: 'Verdana, monospace', 
//         fontWeight: '1000',
//         letterSpacing: '3.20', 
//         wordWrap: 'break-word'
//       }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };
const TitleTextbox: React.FC<TitleTextboxProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        inline-flex justify-end items-center
        border border-black bg-[#FBCA29] shadow-[4px_6px_0_0_#000000]
        px-[clamp(2rem,8vw,5rem)] py-[clamp(0.5rem,2vw,1rem)]
        m-[3vw]
        ${className}
      `}
    >
      <div
        className="text-center font-[Verdana,monospace] font-black break-words"
        style={{
          color: 'white',
          WebkitTextStroke: '1px black',
          fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', // original font size was 64
          letterSpacing: '3.2', 
          wordWrap: 'break-word'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TitleTextbox;
