function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

function genCurrentBluntFact() {
    let currentBluntFact = {
        strain: 'fig farm',
        nftNum: 4,
        bucket: 'blunt-facts-nfts',
    }
    const strain = currentBluntFact.strain
    const nftNum = currentBluntFact.nftNum
    const strainTitle = capitalizeTheFirstLetterOfEachWord(strain)
    const bluntFactTitle = '#' + nftNum + ': ' + strainTitle
    currentBluntFact.imgTitle = 'Blunt Facts ' + bluntFactTitle

    const strainDashed = strain.replaceAll(' ', '-')
    currentBluntFact.imgUrl = 'https://storage.googleapis.com/blunt-facts-nfts/' +
        strainDashed + '-blunt-facts-' + nftNum + '.png'

    return currentBluntFact
}

const CURRENT_BLUNT_FACT = genCurrentBluntFact()
export default CURRENT_BLUNT_FACT;