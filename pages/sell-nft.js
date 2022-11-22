import React from "react";
import SellNFT from "../components/SellPage/SellNFT/SellNFT";
import { nftAbi, nftMarketPlaceAbi } from "../constants/index";
import networkMapping from "../constants/networkMapping.json";
import { useMoralis } from "react-moralis";

const sellnft = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainIdString = chainIdHex ? parseInt(chainIdHex).toString() : null;
  const NftMarketPlaceAddress =
    chainIdString in networkMapping
      ? networkMapping[chainIdString].NftMarketPlace[0]
      : null;

  console.log("Sell PAGE Rendered");
  return (
    <div className="Page-Home">
      {isWeb3Enabled ? (
        NftMarketPlaceAddress ? (
          <>
            <SellNFT
              nftAbi={nftAbi}
              nftMarketPlaceAbi={nftMarketPlaceAbi}
              NftMarketPlaceAddress={NftMarketPlaceAddress}
            />
          </>
        ) : (
          <div className="display-6 text-light text-center">
            Switch To Goerli Network
          </div>
        )
      ) : (
        <div className="display-6 text-light text-center">
          Connect To Your Wallet
        </div>
      )}
    </div>
  );
};

export default sellnft;
