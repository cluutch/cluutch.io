import * as React from "react"

const DocsIntro = ({ siteTitle }) => {

  return (
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
                <li>We are in the process of migrating DNS. The current URL is long.</li>
                <li><a href="https://cluutch-api-gateway-bh8jku5i.uc.gateway.dev/v3">https://cluutch-api-gateway-bh8jku5i.uc.gateway.dev/v3</a></li>
            </ul>
        </div>
        
        <div className="my-lg-4">
            <h4>Endpoints</h4>
        </div>
        </div>
        <div className="col-4 bg-light">
        </div>
    </div>
      
  )
}

export default DocsIntro
