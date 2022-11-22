import React from "react";
import Withdraw from "../components/WithdrawPage/Withdraw/Withdraw";
import { nftMarketPlaceAbi } from "../constants/index";
import networkMapping from "../constants/networkMapping.json";
import { useMoralis } from "react-moralis";

const withdraw = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainIdString = chainIdHex ? parseInt(chainIdHex).toString() : null;
  const NftMarketPlaceAddress =
    chainIdString in networkMapping
      ? networkMapping[chainIdString].NftMarketPlace[0]
      : null;

  return (
    <div>
      {isWeb3Enabled ? (
        NftMarketPlaceAddress ? (
          <Withdraw
            nftMarketPlaceAbi={nftMarketPlaceAbi}
            NftMarketPlaceAddress={NftMarketPlaceAddress}
          />
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

export default withdraw;
