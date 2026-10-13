import { useEffect, useMemo, useState } from 'react'
import { getListings } from '../services/listingService'
import './Home.css'

const categories = ['Everything', 'Furniture', 'Tech', 'Home', 'Fashion', 'Art']

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4 4" />
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
    >
      <path d="M20.8 8.8c0 4.2-8.8 10.2-8.8 10.2S3.2 13 3.2 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z" />
    </svg>
  )
}

function ListingCard({ listing, isSaved, onToggleSave }) {
  return (
    <article className="listing-card">
      <div className={`listing-image-wrap image-${listing.tone}`}>
        <img
          className="listing-image"
          src={listing.image}
          alt={listing.imageAlt}
          loading="lazy"
        />
        <span className="condition-tag">{listing.condition}</span>
        <button
          className={`save-button${isSaved ? ' is-saved' : ''}`}
          type="button"
          onClick={() => onToggleSave(listing.id)}
          aria-label={isSaved ? `Remove ${listing.title} from saved items` : `Save ${listing.title}`}
          aria-pressed={isSaved}
        >
          <HeartIcon filled={isSaved} />
        </button>
      </div>
      <div className="listing-details">
        <div className="listing-heading">
          <h3>{listing.title}</h3>
          <span className="listing-price">${listing.price}</span>
        </div>
        <p className="listing-meta">
          <span>{listing.location}</span>
          <span className="meta-dot" aria-hidden="true">·</span>
          <span>by {listing.seller}</span>
        </p>
      </div>
    </article>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Everything')
  const [search, setSearch] = useState('')
  const [savedItems, setSavedItems] = useState([])
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadListings() {
      setIsLoading(true)
      setLoadError('')

      try {
        setListings(await getListings({ signal: controller.signal }))
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoadError(error.message || 'Unable to load products. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadListings()
    return () => controller.abort()
  }, [reloadKey])

  const visibleListings = useMemo(() => {
    const query = search.trim().toLowerCase()
    return listings.filter((listing) => {
      const matchesCategory =
        activeCategory === 'Everything' || listing.category === activeCategory
      const matchesSearch =
        !query ||
        `${listing.title} ${listing.category} ${listing.location} ${listing.seller}`
          .toLowerCase()
          .includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, listings, search])

  function toggleSavedItem(id) {
    setSavedItems((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }

  return (
    <div className="marketplace">
      <section className="welcome-section">
        <div className="welcome-copy">
          <span className="eyebrow"><span className="eyebrow-sparkle">✳</span> GOOD FINDS, GOOD FEELINGS</span>
          <h1>Find your kind<br />of <span>good thing.</span></h1>
          <p>Thoughtful finds from people nearby. Give good things a second life — and find a little joy along the way.</p>
          <a className="welcome-link" href="#the-feed">
            Explore the feed <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="art-plant art-plant-left">
            <i /><i /><i /><i /><i />
          </div>
          <div className="art-vase"><span /></div>
          <div className="art-plant art-plant-right">
            <i /><i /><i /><i />
          </div>
          <div className="art-platform" />
          <div className="art-sticker">ONE<br />GOOD<br />FIND <span>↗</span></div>
        </div>
      </section>

      <section className="feed-section" id="the-feed" aria-labelledby="feed-title">
        <div className="feed-topline">
          <div>
            <span className="eyebrow feed-eyebrow">THE NEIGHBORHOOD FINDS</span>
            <h2 id="feed-title">A little bit of everything<span>.</span></h2>
          </div>
          <label className="feed-search">
            <SearchIcon />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the good stuff"
              aria-label="Search listings"
            />
            <span className="search-shortcut" aria-hidden="true">⌕</span>
          </label>
        </div>

        <div className="feed-toolbar">
          <div className="category-tabs" role="group" aria-label="Filter listings by category">
            {categories.map((category) => (
              <button
                className={`category-tab${activeCategory === category ? ' is-active' : ''}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="listing-count">{visibleListings.length} lovely finds</span>
        </div>

        {isLoading ? (
          <div className="feed-state" role="status">Loading products…</div>
        ) : loadError ? (
          <div className="feed-state" role="alert">
            <p>{loadError}</p>
            <button
              className="reset-filters"
              type="button"
              onClick={() => setReloadKey((current) => current + 1)}
            >
              Try again
            </button>
          </div>
        ) : visibleListings.length ? (
          <div className="listing-grid">
            {visibleListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isSaved={savedItems.includes(listing.id)}
                onToggleSave={toggleSavedItem}
              />
            ))}
          </div>
        ) : (
          <div className="empty-feed">
            <span aria-hidden="true">✳</span>
            <h3>No finds just yet</h3>
            <p>Try another search or category — the good stuff is out there.</p>
            <button
              className="reset-filters"
              type="button"
              onClick={() => {
                setSearch('')
                setActiveCategory('Everything')
              }}
            >
              Show me everything
            </button>
          </div>
        )}
        {!isLoading && !loadError && visibleListings.length > 0 && (
          <div className="feed-endnote"><span>✳</span> You’re all caught up. Go enjoy your new find.</div>
        )}
      </section>
    </div>
  )
}