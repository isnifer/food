function range(startIndex, endIndex) {
  return new Array(endIndex - 1).fill(1).map((item, index) => index + startIndex)
}

function uberEats() {
  const latestGroupsContainer = 'hr + div + ul'
  const groupId = `${latestGroupsContainer} li`
  const groups = $$(groupId)

  const groupsArray = []

  // eslint-disable-next-line
  for (const groupNumber of range(1, groups.length + 1)) {
    const currentItem = `${groupId}:nth-child(${groupNumber})`
    const categoryName = $(`${currentItem} > h2`).textContent.trim()

    const products = []

    const latestProductsContainer = `${currentItem} > ul`
    const itemId = `${latestProductsContainer} > div`
    const productsItems = $$(itemId)

    // eslint-disable-next-line
    for (const productNumber of range(1, productsItems.length + 1)) {
      const currentProduct = `${itemId}:nth-child(${productNumber})`

      let photo

      try {
        photo = $(`${currentProduct} img`).getAttribute('src')
      } catch (error) {
        photo = ''
      }

      const name = $(`${currentProduct} .clamp-lines > div`).textContent.trim()

      let price
      try {
        price = $(`${currentProduct} h4 + div + div > div:first-child`).textContent.trim()
      } catch (error) {
        price = $(`${currentProduct} h4 + div > div:first-child`).textContent.trim()
      }

      // const calories = $(`${currentProduct} h4 + div > div:last-child`).textContent.trim()

      products.push({ name, price, /* calories, */ photo })
    }

    if (products.length) {
      groupsArray.push({ categoryName, products })
    }
  }

  return groupsArray
}

function copyToClipboard() {
  const el = document.createElement('textarea')
  el.value = `,\n"food": ${JSON.stringify(uberEats(), null, 2)}`
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

copyToClipboard()
