import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import Navbar from "./navbar"
import "./layout.scss"

const matomo = createInstance({
  urlBase: 'https://cluutch.matomo.cloud/',
  siteId: 1,
  linkTracking: true, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST'
  }
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <MatomoProvider value={matomo}>
      <div className="p-0">
        <Navbar siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>
          <main>{children}</main>
        </main>
      </div>
    </MatomoProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
