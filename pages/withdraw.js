import React from "react";
import Withdraw from "../components/WithdrawPage/Withdraw/Withdraw";
import { nftMarketPlaceAbi } from "../constants/index";
import networkMapping from "../constants/networkMapping.json";
import { useMoralis } from "react-moralis";

const withdraw = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainID = chainIdHex ? parseInt(chainIdHex).toString() : "31337";
  const NftMarketPlaceAddress = networkMapping[chainID]["NftMarketPlace"][0];

  return (
    <div>
      {isWeb3Enabled ? (
        <Withdraw
          nftMarketPlaceAbi={nftMarketPlaceAbi}
          NftMarketPlaceAddress={NftMarketPlaceAddress}
        />
      ) : (
        <div className="display-6 text-light text-center">
          Connect To Your Wallet
        </div>
      )}
    </div>
  );
};

export default withdraw;
