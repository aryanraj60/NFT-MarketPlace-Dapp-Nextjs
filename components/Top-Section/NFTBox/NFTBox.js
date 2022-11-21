import React, { useEffect, useState } from "react";
import styles from "./NFTBox.module.css";
import { ethers } from "ethers";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { nftAbi, nftMarketPlaceAbi } from "../../../constants/index";
import NFTModal from "./NFT-Modal/NFTModal";
import BuyModal from "./Buy-Modal/BuyModal";

import networkMapping from "../../../constants/networkMapping.json";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

const NFTBox = ({ tokenId, seller, price, nftAddress }) => {
  const { account, chainId: chainIdHex } = useMoralis();
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [updateShowModal, setUpdateShowModal] = useState(false);
  const [buyShowModal, setBuyShowModal] = useState(false);

  const chainID = parseInt(chainIdHex).toString();

  const nftMarketPlaceAddress = networkMapping[chainID]["NftMarketPlace"][0];

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  async function updateUI() {
    const tokenURI = await getTokenURI();
    if (tokenURI) {
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setTokenName(tokenURIResponse.name);
      setTokenDescription(tokenURIResponse.description);
    }
  }

  useEffect(() => {
    updateUI();
  }, []);

  const isOwnedByUser = account === seller ? true : false;
  const formattedAddress = isOwnedByUser
    ? "you"
    : truncateStr(seller || "", 15);

  const handleBoxClick = () => {
    isOwnedByUser ? setUpdateShowModal(true) : setBuyShowModal(true);
  };

  const handleUpdateClose = () => {
    setUpdateShowModal(false);
  };

  const handleBuyClose = () => {
    setBuyShowModal(false);
  };

  return (
    <div>
      {imageURI ? (
        <div>
          <NFTModal
            isVisible={updateShowModal}
            handleClose={handleUpdateClose}
            nftAddress={nftAddress}
            tokenId={tokenId}
          />
          <BuyModal
            isVisible={buyShowModal}
            nftMarketPlaceAddress={nftMarketPlaceAddress}
            nftMarketPlaceAbi={nftMarketPlaceAbi}
            handleClose={handleBuyClose}
            nftAddress={nftAddress}
            tokenId={tokenId}
            price={price}
          />
          <div onClick={handleBoxClick} className={styles.NFTBox}>
            <img
              className="NFT Image"
              style={{ width: "100%", height: "60%" }}
              src={imageURI}
            />
            <div className="details" style={{ padding: "20px" }}>
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                {tokenName}
              </div>
              <div>Token ID: {tokenId}</div>
              <div
                className="priceSellerContainer"
                style={{ marginTop: "30px" }}
              >
                <div className="price" style={{ display: "flex" }}>
                  <img
                    style={{ width: "15px", height: "23px" }}
                    src="https://user-images.githubusercontent.com/80636305/126576577-cb07ba84-a4fe-4d63-b43a-e7832c77483d.png"
                  />
                  <div className="price">
                    {ethers.utils.formatUnits(price, "ether")} ETH
                  </div>
                </div>
                <div className="sellerAddress">Owned by {formattedAddress}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default NFTBox;
