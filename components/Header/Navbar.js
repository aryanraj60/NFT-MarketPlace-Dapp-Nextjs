import React from "react";
import { ConnectButton } from "web3uikit";
import Link from "next/link";

const Navbar = () => {
  console.log("Navbar rendered");
  return (
    <nav className="navbar" style={{ padding: "20px" }}>
      <div>
        <Link href="/" className="text-decoration-none">
          <h1 className="display-5 fw-semibold text-light">
            The NFT MarketPlace
          </h1>
        </Link>
      </div>
      <div className="d-flex">
        <Link href="/" className="navbar-brand text-light">
          NFT MarketPlace
        </Link>
        <Link href="/sell-nft" className="navbar-brand text-light">
          Sell NFT
        </Link>
        <Link href="/withdraw" className="navbar-brand text-light">
          Withdraw
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
};

export default Navbar;
