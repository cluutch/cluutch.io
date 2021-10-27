// import * as React from "react"

import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"



const IndexPage = () => {
  // ----------------------
  // RUNTIME DATA FETCHING
  // ----------------------
  const [price, setPrice] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch('https://us-central1-cluutch.cloudfunctions.net/cluutch-get-price-today')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setPrice(resultData.avg_price_per_ounce)
      }) // set data for the number of stars
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      <section className="mt-lg-5 mt-3 text-center container">
        <div className="row">
          <div className="col text-center">
            <h4>TODAY the price of weed is</h4>

            <div className="my-lg-4 my-4">
              <h1 className="display-2">${Math.trunc(price)}</h1>
              <h1 className="display-6 text-muted">per ounce</h1>
            </div>

            <a href="https://cluutch.substack.com" className="btn btn-link" target="_blank">Learn more</a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
