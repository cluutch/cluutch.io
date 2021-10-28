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

  const price_friendly = price || "Loading"
  return (
    <Layout>
      <Seo title="Home" />
      <section className="mt-lg-5 mt-3 text-center container">
        <div className="row">
          <div className="col text-center">
            <h4>TODAY the price of weed is</h4>

            <div className="my-lg-4 my-4">
              <h1 className="display-2">${Math.trunc(price_friendly)}</h1>
              <h1 className="display-6 text-muted">per ounce</h1>
            </div>

            <a href="https://cluutch.substack.com" className="btn btn-link" target="_blank">Learn more</a>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 offset-lg-1">
            <h3 className="my-lg-4">Public API</h3>

            <div className="my-lg-4">
              <h4>Introduction</h4>
              <p>Use the cluutch API to get the price of weed each day. This is experimental and a work in progress.</p>
              <p>Prices are calculated as the mean of different sources in the USA.</p>
            </div>
            
            <div className="my-lg-4">
              <h4>API URL</h4>
                <ul className="list-unstyled">
                  <li><strong>Public API v3</strong></li>
                  <li><a href="https://api.cluutch.io/v2">https://api.cluutch.io/v3</a></li>
                </ul>
            </div>
            
            <div className="my-lg-4">
              <h4>Endpoints</h4>
            </div>
          </div>
          <div className="col-4 bg-light">
          </div>
        </div>
        <div className="row">
          <hr className="my-2" />
          <div className="col-lg-7 offset-lg-1">
          <div class="my-lg-1" id="docs-quotes">
            <h5>Quotes</h5>
            <p>
              <code>Quote</code>s are how the price of weed is captured in cluutch. 
              A <code>Quote</code> is the price of weed at a specific vendor on a specific day.
              The lowest price for an ounce is taken from each vendor sampled. 
              If an exact ounce is not available, the largest available unit is used.
            </p>

            <div class="my-lg-4">
              <h6>HTTP REQUEST</h6>
              <p><code>GET https://api.cluutch.io/v2/quotes</code></p>
            </div>

            <div class="my-lg-4">
              <h6>URL PARAMETERS</h6>
              <p>None currently supported</p>
            </div>

            <div class="my-lg-4">
              <h6>RESPONSE</h6>
              <p>The response will be an array of quote objects. A quote has the fields below.</p>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">date</th>
                    <td>YYYY-MM-DD</td>
                    <td>Date of prices that the quote is for.</td>
                  </tr>
                  <tr>
                    <th scope="row">vendor_name</th>
                    <td>string</td>
                    <td>The name of the vendor selling.</td>
                  </tr>
                  <tr>
                    <th scope="row">vendor_url</th>
                    <td>string</td>
                    <td>Url where price was found.</td>
                  </tr>
                  <tr>
                    <th scope="row">vendor_branch</th>
                    <td>string</td>
                    <td>Location or storefront name where specifically purchased.</td>
                  </tr>
                  <tr>
                    <th scope="row">price_per_ounce</th>
                    <td>decimal</td>
                    <td>The price of one ounce of marijuana in USD.</td>
                  </tr>
                  <tr>
                    <th scope="row">jurisdiction</th>
                    <td>string</td>
                    <td>Name of state or "darkweb"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <div className="col-lg-4 bg-light">
          <div class="ps-lg-3 mt-lg-5 my-5">
            <code>
            
              <p>➜ curl https://api.cluutch.io/v2/quotes</p>

              <hr/>

              <pre>{`
[
  ...
  {
    "date": "2021-02-07",
    "vendor_name": "Reef",
    "vendor_url": "https://reefdispensaries.com/locations/sun-valley/order-now/",
    "vendor_branch": "Sun Valley",
    "price_per_ounce": "240.0",
    "jurisdiction": "Nevada"
  },
  {
    "date": "2021-02-07",
    "vendor_name": "Cannahome",
    "vendor_url": "/v/William_Shatner/listings/",
    "vendor_branch": "William Shatner",
    "price_per_ounce": "155.0",
    "jurisdiction": "Darkweb"
    &#125;,
  ...
]
              `}</pre>
            </code>
          </div>
          </div>
        </div>

        <div className="row">
          <hr className="my-2" />
          <div className="col-lg-7 offset-lg-1">
          <div class="my-lg-1" id="docs-daily">
            <h5>Daily Prices</h5>
            <p>
              This endpoint 
              <a href="https://github.com/cluutch/cluutch.io/blob/9900b522a7e4064a4374239178a59f208db2b883/db/views/v2_avg_prices_v02.sql#L1">computes an average</a>
              price for each day. You can either request all daily prices or specify a date or location you want prices for.
              By default the average price for All U.S. is returned for all days. 
            </p>

            <div class="my-lg-4">
              <h6>HTTP REQUEST</h6>
              <p><code>GET https://api.cluutch.io/v2/daily</code></p>
            </div>

            <div class="my-lg-4">
              <h6>URL PARAMETERS</h6>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">date</th>
                    <td>YYYY-MM-DD</td>
                    <td>Specific date to get the average price of quotes for. 
                    If no quotes/prices are available on the requested date, the prices from the 
                    <a href="https://github.com/cluutch/cluutch.io/blob/9900b522a7e4064a4374239178a59f208db2b883/app/models/v2/avg_price.rb#L10">closest date without going over</a>
                    will be used. When a date is provided, the result will only contain one element.</td>
                  </tr>
                  <tr>
                    <th scope="row">jurisdiction</th>
                    <td>string</td>
                    <td>The name of the jurisdiction/location that you want prices for. Currently supported values are: 
                    "Darkweb", "Florida", "Nevada", and "Washington, D.C.". 
                    There are also some out-of-date records for "California" and "Colorado".
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="my-lg-4">
              <h6>RESPONSE</h6>
              <p>The response will be an array of daily price objects. Each has the fields below.</p>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Field</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">date</th>
                    <td>YYYY-MM-DD</td>
                    <td>Date of prices that the quote is for.</td>
                  </tr>
                  <tr>
                    <th scope="row">avg_price_per_ounce</th>
                    <td>decimal</td>
                    <td>The mean of all prices matching the input parameters, in USD.</td>
                  </tr>
                  <tr>
                    <th scope="row">jurisdiction</th>
                    <td>string</td>
                    <td>The location/jurisdiction that the prices correspond to.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <div className="col-lg-4 bg-light">
            <div class="ps-lg-3 mt-lg-5 my-5">
    <code>
    <p>➜ curl https://api.cluutch.io/v2/daily</p>

    <hr/>

    <pre>{`
[
  ...
  {
    "date": "2021-03-08",
    "avg_price_per_ounce": "219.7442857142857143",
    "jurisdiction": "All U.S."
  },
  {
    "date": "2021-03-04",
    "avg_price_per_ounce": "275.2933333333333333",
    "jurisdiction": "All U.S."
  },
  {
    "date": "2021-02-23",
    "avg_price_per_ounce": "243.36",
    "jurisdiction": "All U.S."
  },
  ...
]
    `}</pre>

    <p>➜ curl "https://api.cluutch.io/v2/daily?jurisdiction=Florida&date=2021-03-08"</p>

    <hr/>

    <pre>{`
[
  {
    "date":"2021-03-08",
    "avg_price_per_ounce":"246.1666666666666667",
    "jurisdiction":"Florida"
  }
]
    `}</pre>
  </code>
</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
