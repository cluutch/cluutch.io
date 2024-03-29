import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : {className: "nav-link"}
}

const ExactNavLink = props => (
  <Link getProps={isActive} {...props} />
)

const Navbar = ({ siteTitle }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/android-icon-36x36.png" alt="" width="30" height="24" className="d-inline-block align-top" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="https://cluutch.substack.com" target="_blank">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/cluutch/cluutch.io" target="_blank">Code</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://datastudio.google.com/reporting/1cae811c-b653-43e9-a813-0ff0b947a9dc/page/TB4hC" target="_blank">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://discord.gg/Zv6vYHG2cW" target="_blank">Discord</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://cluutch.holaplex.com/listings/EAnZjYKTj2USL19Wdzku7dL7q6mYoi6UMZhDiSkNDU1P" target="_blank">NFT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

export default Navbar
