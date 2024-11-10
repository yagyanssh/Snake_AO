import React from 'react';
import { ConnectButton } from 'arweave-wallet-kit';

function Header() {
  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">SnakeGame</h1> */}
        <ConnectButton showBalance={false} />
      </nav>
    </header>
  );
}

export default Header;