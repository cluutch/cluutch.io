import React, { useState, useEffect } from "react"
import { SolanaWallet } from "./solana-wallet"
import { ButtonMintNft } from './button-mint-nft';

const currentBluntFact = {
  strain: 'fig farm',
  nftNum: 4
}

const bucket = 'blunt-facts-nfts'

function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

const NftBanner = ({ }) => {
  const strain = currentBluntFact.strain
  const nftNum = currentBluntFact.nftNum
  const strainTitle = capitalizeTheFirstLetterOfEachWord(strain)
  const bluntFactTitle = '#' + nftNum + ': ' + strainTitle
  const imgTitle = 'Blunt Facts ' + bluntFactTitle

  const strainDashed = strain.replaceAll(' ', '-')
  const imgUrl = 'https://storage.googleapis.com/blunt-facts-nfts/' +
    strainDashed + '-blunt-facts-' + nftNum + '.png'

  const button = <ButtonMintNft />

  return (
    <section className="py-4 bg-primary text-center text-secondary">
      <div className="mt-1 mb-5 container">
        <h2>Blunt Facts NFT Collection</h2>
        <p>Every week, a new Blunt Fact image is auto-generated based on the API. 
        Visit our store to purchase an official Blunt Fact NFT or mint your own below.</p>
      </div>

      <div className="row">
        <div className="col">
          <img src={imgUrl}
              alt={imgTitle}
              placeholder="blurred"
              height={375}/>
        </div>
        <div className="col">
          <h4>{bluntFactTitle}</h4>
          <p>Click button below to mint a new NFT. For the moment, only Cluutch creators can do this.</p>
          <SolanaWallet button={button} />
          
        </div>
      </div>
    </section>
  )
}

NftBanner.propTypes = {
}

NftBanner.defaultProps = {
}

export default NftBanner
