import React from "react";
import { ConnectButton } from "arweave-wallet-kit";

function Header() {
  return (
    <header className="w-full md:px-8 shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.11)]">
      
      <nav className="flex justify-between py-4 items-center">
        <div className="logo font-mono text-black text-2xl font-black tracking-tighter min-[375px]:block">
          Snake_AO
        </div>
        <div>
          <ConnectButton showBalance={false} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
