import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

function BuyModal({
  price,
  isVisible,
  nftAddress,
  tokenId,
  nftMarketPlaceAbi,
  nftMarketPlaceAddress,
  handleClose,
}) {
  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: nftMarketPlaceAbi,
    contractAddress: nftMarketPlaceAddress,
    functionName: "buyItem",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
    msgValue: price,
  });

  const dispatch = useNotification();

  const handleBuySuccess = async (tx) => {
    handleClose();
    await tx.wait(1);
    handleBuySuccessNotification();
  };

  const handleBuySuccessNotification = () => {
    dispatch({
      type: "success",
      message: "NFT Bought Successfully",
      title: "Congratulation!",
      position: "topR",
    });
  };

  const handleBuyError = async (e) => {
    handleClose();
    console.log("Buy Item Error", e);
    handleBuyErrorNotification();
  };

  const handleBuyErrorNotification = () => {
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
        <Modal.Title>Buy NFT</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Amount To Pay: {ethers.utils.formatUnits(price, "ether")} ETH</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () =>
            await buyItem({
              onSuccess: handleBuySuccess,
              onError: handleBuyError,
            })
          }
        >
          Buy NFT
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuyModal;
