import React, { useState, useEffect } from "react"
import {
  Connection,
  PublicKey
} from "@solana/web3.js";
import {
  parseAggregatorAccountData,
} from "@switchboard-xyz/switchboard-api";

import { SolanaWallet } from "./solana-wallet"
import { ButtonRefreshOracle } from './button-refresh-oracle';

const DATA_FEED_PUBLIC_KEY_STR = 'GvNzEWX3hV9aowJbRvjw3Avnp6ynP9XKVC2SFTRCJ3fv'
const SOLANA_URL = "https://free.rpcpool.com";
const SOLANA_CONNECTION = new Connection(SOLANA_URL, 'processed');
const DATA_FEED_PUBLIC_KEY = new PublicKey(DATA_FEED_PUBLIC_KEY_STR);

const SolanaPriceBanner = ({ siteTitle }) => {

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

  const style = {
    alignItems: 'center',
    justifyContent: 'center'
  }
  const button = <ButtonRefreshOracle />

  return (
    <section className="text-center container">
      <div className="row">
        <div className="col text-center">
          <div><h4 className="text-primary">Solana oracle price: {solanaPriceFriendly}</h4></div>
            <div className="d-flex" style={style}>
              <SolanaWallet button={button} />
            </div>
          <div><a href="https://cluutch.substack.com" className="btn btn-link" target="_blank">Learn more</a></div>
        </div>
      </div>
  </section>
  )
}

export default SolanaPriceBanner
