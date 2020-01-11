function range(startIndex, endIndex) {
  return new Array(endIndex - 1).fill(1).map((item, index) => index + startIndex)
}

function uberEats() {
  const latestGroupsContainer = '.e7'
  const groupId = `${latestGroupsContainer} .e8`
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

      const name = $(`${currentProduct} .clamp-lines > div`).textContent.trim()
      const price = $(`${currentProduct} h4 + div > div:first-child`).textContent.trim()
      const calories = $(`${currentProduct} h4 + div > div:last-child`).textContent.trim()
      const photo = $(`${currentProduct} img`).getAttribute('src')

      products.push({ name, price, calories, photo })
    }

    groupsArray.push({ categoryName, products })
  }

  return groupsArray
}

JSON.stringify(uberEats(), null, 2)
