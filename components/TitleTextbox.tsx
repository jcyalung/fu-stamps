import React from "react";

interface TitleTextboxProps {
    children: React.ReactNode;
    className?: string;
}

const TitleTextbox: React.FC<TitleTextboxProps> = ({ children, className = "" }) => {
    return (
    <div style={{
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
      {/* text within the title box */}
      <div style={{
        textAlign: 'center',
        color: 'white',
        WebkitTextStroke: '1px black',
        fontSize: '48px', // original font size was 64
        fontFamily: 'Verdana, monospace', 
        fontWeight: '1000',
        letterSpacing: '3.20', 
        wordWrap: 'break-word'
      }}
      >
        {children}
      </div>
    </div>
  );
};

export default TitleTextbox;
