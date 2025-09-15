import React from "react";

interface TitleTextboxProps {
    children: React.ReactNode;
    className?: string;
}

const TitleTextbox: React.FC<TitleTextboxProps> = ({ children, className = "" }) => {
    return (
    <div 
    style={{
      display: 'inline-flex',
      padding: '4px 80px',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '60px', // temporary while other items aren't on page
      
      border: '1px solid #000000',
      backgroundColor: '#FBCA29',
      boxShadow: '4px 6px 0 0 #000000'
      }}
    >
      <div className="text-center text-white text-6xl font-bold font-['Jost'] tracking-[3.20px]">
        {children}
      </div>
    </div>
  );
};

export default TitleTextbox;
