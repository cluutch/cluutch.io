
import * as React from "react"

const DocsDailiesText = ({ siteTitle }) => {

  return (
    <div className="col-lg-7 offset-lg-1">
        <div className="my-lg-1" id="docs-daily">
            <h5>Daily Prices</h5>
            <p>
                This endpoint returns the average price of weed per ounce, by day. 
            </p>

            <div className="my-lg-4">
                <h6>HTTP REQUEST</h6>
                <p><code>GET https://api.cluutch.io/v3/dailies</code></p>
            </div>

            <div className="my-lg-4">
                <h6>URL PARAMETERS</h6>
                None currently supported.
            </div>

            <div className="my-lg-4">
                <h6>RESPONSE</h6>
                <p>The response will be an array of daily price objects. Each has the fields below.</p>

                <table className="table table-striped">
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
                    <td>The location/jurisdiction that the prices correspond to. Currently always "All U.S.".</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default DocsDailiesText
