const copyButton = document.querySelector('#copy-button')

function copyText() {
  const shortenURL = document.querySelector('#shortenURL')
  console.log(shortenURL)
  shortenURL.select()
  document.execCommand('copy')
}

copyButton.addEventListener('click', copyText)