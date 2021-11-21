import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import WeedPriceBanner from "../components/weed-price-banner"
import WeedPriceGraph from "../components/weed-price-graph"
import Docs from "../components/docs/docs"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <WeedPriceBanner />
      <WeedPriceGraph />
      <Docs />
    </Layout>
  )
}

export default IndexPage
