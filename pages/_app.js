import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "../styles/app.module.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/38282/nftmarketplace/v0.0.2",
});

function MyApp({ Component, pageProps }) {
  console.log("App Rendered");
  return (
    <div className={`${styles.app}`}>
      <Head>
        <title>NFT MarketPlace</title>
        <meta name="description" content="NFT MarketPlace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
