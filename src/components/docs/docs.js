import * as React from "react"
import DocsIntro from "./docs-intro"
import DocsDailies from "./docs-dailies"
import DocsSolana from "./docs-solana"

const Docs = ({ siteTitle }) => {

  return (
    <div className="container-fluid">
        <DocsIntro />
        <DocsDailies />
        <DocsSolana />
    </div>
  )
}

export default Docs
