const LISTINGS_STORAGE_KEY = 'goodkind-listings'

export function getUserListings() {
  const storedListings = window.localStorage.getItem(LISTINGS_STORAGE_KEY)

  if (!storedListings) {
    return []
  }

  const listings = JSON.parse(storedListings)

  if (!Array.isArray(listings)) {
    throw new Error('Saved listings are invalid. Clear your browser storage and try again.')
  }

  return listings
}

export function addUserListing(listing) {
  const listings = getUserListings()
  const updatedListings = [listing, ...listings]

  window.localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(updatedListings))
  return listing
}
