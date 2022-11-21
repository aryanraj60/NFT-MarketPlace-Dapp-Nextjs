import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { nftMarketPlaceAbi } from "../../../../constants/index";
import networkMapping from "../../../../constants/networkMapping.json";
import { ethers } from "ethers";

const NFTModal = ({ isVisible, handleClose, nftAddress, tokenId }) => {
  const { chainId: chainIdHex } = useMoralis();
  const [newPrice, setNewPrice] = useState("0");
  const chainID = parseInt(chainIdHex).toString();
  const marketPlaceAddress = networkMapping[chainID]["NftMarketPlace"][0];

  const dispatch = useNotification();

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketPlaceAbi,
    contractAddress: marketPlaceAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(newPrice),
    },
  });

  const handleSuccess = async (tx) => {
    handleClose();
    await tx.wait(1);
    handleSuccessNotification();
  };

  const handleSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "Listing Updated - Please Refresh!",
      title: "Listing Updated!",
      position: "topR",
    });
  };

  const handleFail = async (error) => {
    handleClose();
    handleFailNotification();
    console.log(error);
  };

  const handleFailNotification = () => {
    dispatch({
      type: "error",
      title: "Transaction Failed",
      message: "Something Went Wrong!",
      position: "topR",
    });
  };

  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update NFT Listing Price</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          type="number"
          style={{ width: "70%" }}
          placeholder="New Lisiting Price In L1 Currency(ETH)"
          onChange={(e) => {
            if (e.target.value == "") {
              setNewPrice("0");
            } else {
              setNewPrice(e.target.value);
            }
          }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await updateListing({
              onSuccess: handleSuccess,
              onError: handleFail,
            });
          }}
        >
          UpdatePrice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NFTModal;
