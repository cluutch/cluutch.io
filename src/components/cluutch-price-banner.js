import React, { useState, useEffect } from "react"
import {
  Connection,
  PublicKey
} from "@solana/web3.js";

const CluutchPriceBanner = ({ siteTitle }) => {
  // ----------------------
  // HTTP RUNTIME DATA FETCHING
  // ----------------------
  const [price, setPrice] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch('https://api.cluutch.io/v3/dailies')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const avg_price_today = resultData[0].avg_price_per_ounce
        setPrice(avg_price_today)
      }) // set data for the number of stars
  }, [])

  let priceFriendly = "loading..."

  if (price) {
    priceFriendly = "$" + Math.trunc(price)
  }

  return (
    <section className="mt-lg-5 mt-3 text-center container">
      <div className="row">
        <div className="col text-center">
          <h4>one ounce of weed</h4>

          <div className="my-lg-4 my-4">
            <h1 className="display-2">{priceFriendly}</h1>
            <h1 className="display-6 text-muted">in USA today</h1>
          </div>

        </div>
      </div>
  </section>
  )
}

export default CluutchPriceBanner
