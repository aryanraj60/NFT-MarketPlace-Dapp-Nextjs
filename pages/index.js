import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { networkMapping } from "../constants/networkMapping.json";
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import TopSection from "../components/Top-Section/TopSection";

export default function Home() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  // const chainIdString = chainIdHex ? parseInt(chainIdHex).toString() : null;
  // const marketPlaceAddress = chainIdString
  //   ? networkMapping[chainIdString].NftMarketPlace[0]
  //   : null;

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  console.log("Home Rendered");
  return (
    <div className="Home" style={{ padding: "0px 20px" }}>
      <>
        {isWeb3Enabled ? (
          loading ? (
            <div>Loading</div>
          ) : (
            <TopSection listedNfts={listedNfts} />
          )
        ) : (
          <div className="display-6 text-light text-center">
            Connect To Your Wallet
          </div>
        )}
      </>
    </div>
  );
}
