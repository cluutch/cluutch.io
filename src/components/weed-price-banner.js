import React, { useState, useEffect } from "react"
import {
  Connection,
  PublicKey
} from "@solana/web3.js";
import {
  parseAggregatorAccountData,
} from "@switchboard-xyz/switchboard-api";

const DATA_FEED_PUBLIC_KEY_STR = 'GvNzEWX3hV9aowJbRvjw3Avnp6ynP9XKVC2SFTRCJ3fv'
const SOLANA_URL = "https://free.rpcpool.com";
const SOLANA_CONNECTION = new Connection(SOLANA_URL, 'processed');
const DATA_FEED_PUBLIC_KEY = new PublicKey(DATA_FEED_PUBLIC_KEY_STR);

const WeedPriceBanner = ({ siteTitle }) => {
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

  // ----------------------
  // SOLANA RUNTIME DATA FETCHING
  // ----------------------
  const [solanaPrice, setSolanaPrice] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    parseAggregatorAccountData(SOLANA_CONNECTION, DATA_FEED_PUBLIC_KEY)
      .then(aggregatorState => {
        console.log("Full oracle aggregator state:")
        console.log(aggregatorState)
        return aggregatorState.currentRoundResult.medians[0]
      }) // parse JSON from request
      .then(resultData => {
        setSolanaPrice(resultData)
      }) // set data for the number of stars
  }, [])

  let solanaPriceFriendly = "loading..."

  if (solanaPrice) {
    solanaPriceFriendly = "$" + Math.trunc(solanaPrice)
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

          <span>Solana oracle price: {solanaPriceFriendly}</span><br />
          <a href="https://cluutch.substack.com" className="btn btn-link" target="_blank">Learn more</a>
        </div>
      </div>
  </section>
  )
}

export default WeedPriceBanner
