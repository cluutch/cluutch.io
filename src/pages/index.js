import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import WeedPriceBanner from "../components/weed-price-banner"
import Docs from "../components/docs/docs"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <WeedPriceBanner />
      <Docs />
    </Layout>
  )
}

export default IndexPage
