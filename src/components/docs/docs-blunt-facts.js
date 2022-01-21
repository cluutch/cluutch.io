
import * as React from "react"
import DocsBluntFactsText from "./docs-blunt-facts-text"
import DocsBluntFactsCode from "./docs-blunt-facts-code"

const DocsBluntFacts = ({ siteTitle }) => {

  return (
    <div className="row">
        <DocsBluntFactsText />
        <DocsBluntFactsCode />
    </div>
  )
}

export default DocsBluntFacts
