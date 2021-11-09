import React, { useState, useEffect } from "react"

const WeedPriceBanner = ({ siteTitle }) => {
  // ----------------------
  // RUNTIME DATA FETCHING
  // ----------------------
  const [price, setPrice] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch('https://cluutch-api-gateway-bh8jku5i.uc.gateway.dev/v3/dailies')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const avg_price_today = resultData[0].avg_price_per_ounce
        setPrice(avg_price_today)
      }) // set data for the number of stars
  }, [])

  let price_friendly = "loading..."

  if (price) {
    price_friendly = "$" + Math.trunc(price)
  }

  return (
    <section className="mt-lg-5 mt-3 text-center container">
    <div className="row">
      <div className="col text-center">
        <h4>TODAY the price of weed is</h4>

        <div className="my-lg-4 my-4">
          <h1 className="display-2">{price_friendly}</h1>
          <h1 className="display-6 text-muted">per ounce</h1>
        </div>

        <a href="https://cluutch.substack.com" className="btn btn-link" target="_blank">Learn more</a>
      </div>
    </div>
  </section>
  )
}

export default WeedPriceBanner
