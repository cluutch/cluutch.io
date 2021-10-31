import * as React from "react"
import DocsIntro from "./docs-intro"
import DocsDailies from "./docs-dailies"

const Docs = ({ siteTitle }) => {

  return (
    <div className="container-fluid">
        <DocsIntro />
        <DocsDailies />
    </div>
  )
}

export default Docs
