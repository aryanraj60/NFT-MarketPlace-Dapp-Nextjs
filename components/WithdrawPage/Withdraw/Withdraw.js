import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const Withdraw = ({ nftMarketPlaceAbi, NftMarketPlaceAddress }) => {
  const [funds, setFunds] = useState("0");

  const { account } = useMoralis();
  const dispatch = useNotification();

  const { runContractFunction: withdrawFunds } = useWeb3Contract({
    abi: nftMarketPlaceAbi,
    contractAddress: NftMarketPlaceAddress,
    functionName: "withdrawProceeds",
    params: {},
  });

  const { runContractFunction: getProceeds } = useWeb3Contract({
    abi: nftMarketPlaceAbi,
    contractAddress: NftMarketPlaceAddress,
    functionName: "getProceeds",
    params: {
      seller: account,
    },
  });

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleSuccessNotification();
    updateUI();
  };

  const handleSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "NFT Approved Successfully",
      title: "Congratulation!",
      position: "topR",
    });
  };

  const handleError = async (e) => {
    console.log("Withdraw Error", e);
    handleErrorNotification();
  };

  const handleErrorNotification = () => {
    dispatch({
      type: "error",
      title: "Transaction Failed",
      message: "Something Went Wrong!",
      position: "topR",
    });
  };
  const isFundsAvailable = funds === "0" ? false : true;

  const updateUI = async () => {
    const balanceFromCall = (await getProceeds()).toString();
    setFunds(balanceFromCall);
  };

  useEffect(() => {
    console.log("Withdraw UpdateUi UseEffect Runs");
    updateUI();
  }, [account]);
  return (
    <div className="withdrawContainer" style={{ padding: "16px" }}>
      <h3 className="display-5 text-light mb-4">Withdraw Funds</h3>
      {isFundsAvailable ? (
        <>
          <p className="text-light text-opacity-50 fs-4 mb-4">
            Available Funds: {ethers.utils.formatUnits(funds, "ether")} ETH
          </p>
          <Button
            style={{ backgroundColor: "black", width: "150px" }}
            onClick={async () => {
              await withdrawFunds({
                onSuccess: handleSuccess,
                onError: handleError,
              });
            }}
          >
            Withdraw
          </Button>
        </>
      ) : (
        <p className="text-light text-opacity-50 fs-3">
          You do not have any Funds to Withdraw
        </p>
      )}
    </div>
  );
};

export default Withdraw;
