import React from "react";

interface TitleTextboxProps {
    children: React.ReactNode;
    className?: string;
}

const TitleTextbox: React.FC<TitleTextboxProps> = ({ children, className = "" }) => {
    return (
    <div
      className={`px-20 py-1 bg-amber-400 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] outline outline-offset-[-1px] outline-black inline-flex justify-end items-center overflow-hidden ${className}`}
    >
      <div className="text-center text-white text-6xl font-bold font-['Jost'] tracking-[3.20px]">
        {children}
      </div>
    </div>
  );
};

export default TitleTextbox;
