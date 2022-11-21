import { useState } from "react";
import { Form, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Styles from "./sellnft.module.css";

import { ethers } from "ethers";

const SellNFT = ({ nftAbi, nftMarketPlaceAbi, NftMarketPlaceAddress }) => {
  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();

  async function approveAndList(data) {
    const nftAddress = data.data[0].inputResult;
    const tokenId = data.data[1].inputResult;
    const price = ethers.utils
      .parseUnits(data.data[2].inputResult, "ether")
      .toString();

    const approveOptions = {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "approve",
      params: {
        to: NftMarketPlaceAddress,
        tokenId: tokenId,
      },
    };

    await runContractFunction({
      params: approveOptions,
      onSuccess: (tx) => handleApproveSuccess(nftAddress, tokenId, price, tx),
      onError: handleApproveError,
    });
  }

  const handleApproveError = (e) => {
    console.log(e);
    handleApproveErrorNotification();
  };

  const handleApproveErrorNotification = () => {
    dispatch({
      type: "error",
      title: "Transaction Failed",
      message: "Something Went Wrong!",
      position: "topR",
    });
  };

  async function handleApproveSuccess(nftAddress, tokenId, price, tx) {
    await tx.wait(1);
    handleApproveSuccessNotification();
    const listOptions = {
      abi: nftMarketPlaceAbi,
      contractAddress: NftMarketPlaceAddress,
      functionName: "listItem",
      params: {
        nftAddress: nftAddress,
        tokenId: tokenId,
        price: price,
      },
    };

    await runContractFunction({
      params: listOptions,
      onSuccess: handleListSuccess,
      onError: handleListError,
    });
  }

  const handleApproveSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "NFT Approved Successfully",
      title: "Congratulation!",
      position: "topR",
    });
  };

  const handleListSuccess = async (tx) => {
    await tx.wait(1);
    handleListSuccessNotification();
  };

  const handleListSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "NFT Listed Successfully",
      title: "Congratulation!",
      position: "topR",
    });
  };

  const handleListError = (e) => {
    console.log("handleListError", e);
    handleListErrorNotification();
  };

  const handleListErrorNotification = () => {
    dispatch({
      type: "error",
      title: "Transaction Failed",
      message: "Something Went Wrong!",
      position: "topR",
    });
  };

  console.log("Sell NFT Rendered!");
  return (
    <div className="SellNFT mb-4">
      <Form
        style={{ backgroundColor: "black" }}
        onSubmit={approveAndList}
        className={Styles.form}
        data={[
          {
            name: "NFT Address",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "nftAddress",
          },
          {
            name: "token ID",
            type: "number",
            value: "",
            key: "tokenId",
          },
          {
            name: "Price (in ETH)",
            type: "number",
            value: "",
            key: "price",
          },
        ]}
        title="Enter Your NFT Details"
        id="Main Form"
      ></Form>
    </div>
  );
};

export default SellNFT;
