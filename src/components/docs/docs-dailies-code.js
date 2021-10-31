
import * as React from "react"

const DocsDailiesCode = ({ siteTitle }) => {

    return (
        <div className="col-lg-4 bg-light">
            <div class="ps-lg-3 mt-lg-5 my-5">
                <code>
                <p>➜ curl https://cluutch-api-gateway-bh8jku5i.uc.gateway.dev/v3/dailies</p>

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
]`}</pre>
            </code>
        </div>
    </div>
  )
}

export default DocsDailiesCode
