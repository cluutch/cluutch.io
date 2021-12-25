import React, { useState, useEffect } from "react"
import { Line } from 'react-chartjs-2';

const WeedPriceGraph = ({ }) => {
  // ----------------------
  // HTTP RUNTIME DATA FETCHING
  // ----------------------
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch('https://api.cluutch.io/v3/dailies')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const x = resultData.map(el => el.date.value).reverse()
        const y = resultData.map(el => el.avg_price_per_ounce).reverse()
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

  const data = {
    labels: xData,
    datasets: [{
      label: '$ per ounce',
      data: yData,
      fill: false,
      borderColor: '#69a82d',
      tension: 0.1
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
          ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                  return '$' + value;
              }
          }
      }
    }
  };

  return (
    <section className="container py-3">
      <div className="row">
        <div className="col">
          <Line data={data} options={options} />
        </div>
      </div>
  </section>

  )
}

WeedPriceGraph.propTypes = {
}

WeedPriceGraph.defaultProps = {
}

export default WeedPriceGraph
