import React, { useState, useEffect } from "react"
import Plot from 'react-plotly.js'

const WeedPriceGraph = ({ }) => {
  // ----------------------
  // HTTP RUNTIME DATA FETCHING
  // ----------------------
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch('https://cluutch-api-gateway-bh8jku5i.uc.gateway.dev/v3/dailies')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const x = resultData.map(el => el.date.value)
        const y = resultData.map(el => el.avg_price_per_ounce)
        setX(x)
        setY(y)
      }) // set data for the number of stars
  }, [])

  let xData = [];
  if (x) {
    xData = x
  }

  let yData = [];
  if (y) {
    yData = y
  }

  return (
    <section className="container">
      <div className="row">
          <Plot
            data={[
              {
                x: xData,
                y: yData,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: '#69a82d'},
              }
            ]}
            layout={ {yaxis: {tickprefix: '$'}} }
          />
      </div>
  </section>

  )
}

WeedPriceGraph.propTypes = {
}

WeedPriceGraph.defaultProps = {
}

export default WeedPriceGraph
