import * as React from "react"

const DocsSolana = ({ siteTitle }) => {

  return (
    <div className="row">
        <div className="col-lg-7 offset-lg-1">
            <h3>Solana Oracle</h3>

            <div className="my-lg-4">
                <p>The Cluutch HTTP API is available on the Solana blockchain. 
                    We manage a <a href="https://switchboard.xyz">Switchboard</a> oracle that copies the prices daily.
                    Use their documentation to interact with our data feed using the address below.</p>
            </div>
            
            <div className="my-lg-4">
                <h4>Data Feed Public Key</h4>
                <p>GvNzEWX3hV9aowJbRvjw3Avnp6ynP9XKVC2SFTRCJ3fv</p>
            </div>
        </div>
        <div className="col-lg-4 bg-light">
            <div className="ps-lg-3 mt-lg-5 my-5">
                <code>
                <p>➜ npm i @switchboard-xyz/switchboard-api</p>

                <pre>{`
# index.js
import {
  Connection,
  PublicKey
} from "@solana/web3.js";

import {
  parseAggregatorAccountData,
  AggregatorState
} from "@switchboard-xyz/switchboard-api";

const data_feed_public_key_str = 'GvNzEWX3hV9aowJbRvjw3Avnp6ynP9XKVC2SFTRCJ3fv'
const solana_url = "https://free.rpcpool.com";
const solana_connection = new Connection(solana_url, 'processed');
const data_feed_public_key = new PublicKey(data_feed_public_key_str);
let state: AggregatorState = await parseAggregatorAccountData(solana_connection, data_feed_public_key);
`}</pre>
              </code>
          </div>
      </div>
    </div>

  )
}

export default DocsSolana
