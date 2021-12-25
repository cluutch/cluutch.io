import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import CluutchPriceBanner from "../components/cluutch-price-banner"
import SolanaPriceBanner from "../components/solana-price-banner"
import WeedPriceGraph from "../components/weed-price-graph"
import NftBanner from "../components/nft-banner"
import Docs from "../components/docs/docs"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <CluutchPriceBanner />
      <SolanaPriceBanner />
      <WeedPriceGraph />
      <NftBanner />
      <Docs />
    </Layout>
  )
}

export default IndexPage
