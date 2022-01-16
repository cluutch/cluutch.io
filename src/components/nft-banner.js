import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"

const NftBanner = ({ }) => {

  return (
    <section className="py-4 bg-primary text-center text-secondary">
      <div className="mt-1 mb-5">
        <h2>Blunt Facts NFT Collection</h2>
      </div>


      <a href="https://cluutch.holaplex.com/listings/57QGsDrMpcPT7L4Ldszn9hheXxxcpCT3XDtC54fAdnxe" target="_blank">
        <StaticImage 
          src="../images/laughing_buddha.png" 
          alt="Blunt Facts #3: Laughing Buddha"
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
