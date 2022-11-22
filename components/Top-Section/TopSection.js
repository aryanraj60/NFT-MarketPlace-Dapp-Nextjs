import React from "react";
import NFTBox from "./NFTBox/NFTBox";

const TopSection = ({ listedNfts, nftMarketPlaceAddress }) => {
  console.log("Top section rendered!");
  return (
    <div className="TopSection">
      <h1 className="text-center mb-5 text-light text-opacity-60">
        Recently Listed
      </h1>
      <div
        className="NFTBoxsContainer"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          rowGap: "20px",
        }}
      >
        {listedNfts.activeItems.map((nft) => {
          const { tokenId, id, nftAddress, price, seller } = nft;
          return (
            <NFTBox
              tokenId={tokenId}
              nftAddress={nftAddress}
              price={price}
              seller={seller}
              id={id}
              nftMarketPlaceAddress={nftMarketPlaceAddress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopSection;
