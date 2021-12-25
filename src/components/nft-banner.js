import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"

const NftBanner = ({ }) => {

  return (
    <section className="py-4 bg-primary text-center text-secondary">
      <div className="mt-1 mb-5">
        <h2>Blunt Facts NFT Collection</h2>
      </div>


      <a href="https://cluutch.holaplex.com/listings/EAnZjYKTj2USL19Wdzku7dL7q6mYoi6UMZhDiSkNDU1P" target="_blank">
        <StaticImage 
          src="../images/moonbow_nft.png" 
          alt="Blunt Facts #1: Moonbow"
          placeholder="blurred"
          height={375}/>
      </a>
    </section>

  )
}

NftBanner.propTypes = {
}

NftBanner.defaultProps = {
}

export default NftBanner
