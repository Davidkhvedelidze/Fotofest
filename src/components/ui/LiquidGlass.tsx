import React from "react";

const LiquidGlass = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className="main relative">
      <div className={`liquid-glass ${className}`}>
        <div className="liquid-glass--bend"></div>
        <div className="liquid-glass--face"></div>
        <div className="liquid-glass--edge"></div>
        <div className="liquid-glass__menus">{children}</div>
      </div>
    </main>
  );
};

export default LiquidGlass;
