
import * as React from "react"
import DocsDailiesText from "./docs-dailies-text"
import DocsDailiesCode from "./docs-dailies-code"

const DocsDailies = ({ siteTitle }) => {

  return (
    <div className="row">
        <DocsDailiesText />
        <DocsDailiesCode />
    </div>
  )
}

export default DocsDailies
