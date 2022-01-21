
import * as React from "react"

const DocsBluntFactsText = ({ siteTitle }) => {

  return (
    <div className="col-lg-7 offset-lg-1">
        <div className="my-lg-1" id="docs-daily">
            <h5>Blunt Facts (strain info)</h5>
            <p>
                This endpoint returns the average price of weed by strain along with qualitative information like aroma and sensation. 
            </p>

            <div className="my-lg-4">
                <h6>HTTP REQUEST</h6>
                <p><code>GET https://api.cluutch.io/v3/blunt-facts</code></p>
            </div>

            <div className="my-lg-4">
                <h6>URL PARAMETERS</h6>
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
                    <th scope="row">strain</th>
                    <td>string</td>
                    <td>Name of strain to retrieve information for. <a href="https://cluutch.io/strains.json">Strains list.</a></td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="my-lg-4">
                <h6>RESPONSE</h6>
                <p>The response will be a JSON object containing price and qualitative information</p>

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
                    <th scope="row">strain</th>
                    <td>string</td>
                    <td>Strain name</td>
                    </tr>
                    <tr>
                    <th scope="row">avg_price_per_ounce</th>
                    <td>decimal</td>
                    <td>Average price per ounce of weed.</td>
                    </tr>
                    <tr>
                    <th scope="row">max_price_per_ounce</th>
                    <td>decimal</td>
                    <td>Maximum price per ounce of weed.</td>
                    </tr>
                    <tr>
                    <th scope="row">min_price_per_ounce</th>
                    <td>decimal</td>
                    <td>Minimum price per ounce of weed.</td>
                    </tr>
                    <tr>
                    <th scope="row">num_listings</th>
                    <td>integer</td>
                    <td>Number of listings analyzed.</td>
                    </tr>
                </tbody>
                </table>

                <p>The JSON object also contains four child objects containing qualitative information about the strain: indica/sativa, aroma, sensation, and other.</p>
                <p>The value of each entry is the percentage of all entries within that category with the given key. The 'best' key is special and highlights the most frequent key in a human readable form.</p>

            </div>
        </div>
    </div>
  )
}

export default DocsBluntFactsText
