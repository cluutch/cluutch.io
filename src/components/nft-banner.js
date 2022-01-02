import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"

const NftBanner = ({ }) => {

  return (
    <section className="py-4 bg-primary text-center text-secondary">
      <div className="mt-1 mb-5">
        <h2>Blunt Facts NFT Collection</h2>
      </div>


      <a href="https://cluutch.holaplex.com/listings/EtkbNPfofjm5mtVEbweTv4wFBWwmyMy1xH3MWQPdAaK4" target="_blank">
        <StaticImage 
          src="../images/amnesia_haze.png" 
          alt="Blunt Facts #2: Amnesia Haze"
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
