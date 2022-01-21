import * as React from "react"
import DocsIntro from "./docs-intro"
import DocsDailies from "./docs-dailies"
import DocsBluntFacts from "./docs-blunt-facts"
import DocsSolana from "./docs-solana"

const Docs = ({ siteTitle }) => {

  return (
    <div className="container-fluid">
        <DocsIntro />
        <DocsDailies />
        <DocsBluntFacts />
        <DocsSolana />
    </div>
  )
}

export default Docs
