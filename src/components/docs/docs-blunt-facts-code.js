
import * as React from "react"

const DocsBluntFactsCode = ({ siteTitle }) => {

    return (
        <div className="col-lg-4 bg-light">
            <div className="ps-lg-3 mt-lg-5 my-5">
                <code>
                <p>➜ curl https://api.cluutch.io/v3/blunt-facts\?strain\=buddha</p>

                <pre>{`
{
    "avg_price_per_ounce": 227.48958342690318,
    "max_price_per_ounce": 672,
    "min_price_per_ounce": 40,
    "num_listings": 8906,
    "strain": "buddha",
    "strain_aroma": {
      "berry": 8.96,
      "best": "Earthy: 32%",
      "citrus": 8.27,
      "earthy": 32.05,
      "sweet": 15.19
    },
    "strain_feeling": {
      "best": "Relaxed: 28%",
      "euphoric": 17.81,
      "happy": 26.02,
      "relaxed": 28.21,
      "uplifted": 18.66
    },
    "strain_other_attributes": {
      "apricot": 8.43,
      "best": "Sleepy: 13%",
      "diesel": 11.83,
      "jungle cake": 8.43,
      "sleepy": 12.59,
      "tahoe": 5.69,
    },
    "strain_type": {
      "best": "Hybrid: 67%",
      "hybrid": 67.37,
      "indica": 19.06,
      "sativa": 13.58
    }
  }
  
  [some entries omitted for brevity]`}</pre>
            </code>
        </div>
    </div>
  )
}

export default DocsBluntFactsCode
