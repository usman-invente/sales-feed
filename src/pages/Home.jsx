import { useMemo, useState } from 'react'
import './Home.css'

const categories = ['Everything', 'Furniture', 'Tech', 'Home', 'Fashion', 'Art']

const listings = [
  {
    id: 1,
    title: 'The Sunday Lounge Chair',
    price: 420,
    location: 'Brooklyn, NY',
    category: 'Furniture',
    condition: 'Like new',
    seller: 'Maya R.',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Sculptural cream lounge chair in a sunlit room',
    tone: 'sand',
  },
  {
    id: 2,
    title: 'Film Camera, Fully Working',
    price: 185,
    location: 'Queens, NY',
    category: 'Tech',
    condition: 'Good',
    seller: 'Jonah K.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Vintage camera ready to capture a moment',
    tone: 'lavender',
  },
  {
    id: 3,
    title: 'A Little Olive Tree',
    price: 68,
    location: 'Park Slope, NY',
    category: 'Home',
    condition: 'New growth',
    seller: 'Plant People',
    image:
      'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Potted olive tree against a warm neutral wall',
    tone: 'sage',
  },
  {
    id: 4,
    title: 'Everyday Leather Tote',
    price: 95,
    location: 'Greenpoint, NY',
    category: 'Fashion',
    condition: 'Very good',
    seller: 'Amelia S.',
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Everyday leather tote bag in a soft neutral color',
    tone: 'peach',
  },
  {
    id: 5,
    title: 'Oak Side Table, Handmade',
    price: 240,
    location: 'Cobble Hill, NY',
    category: 'Furniture',
    condition: 'Like new',
    seller: 'Studio North',
    image:
      'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Minimal wooden side table in a thoughtfully styled room',
    tone: 'blue',
  },
  {
    id: 6,
    title: 'Prints for a Brighter Day',
    price: 54,
    location: 'Bed-Stuy, NY',
    category: 'Art',
    condition: 'Brand new',
    seller: 'Sunday Studio',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Colorful framed artwork in a bright gallery',
    tone: 'pink',
  },
  {
    id: 7,
    title: 'The Perfect Reading Lamp',
    price: 110,
    location: 'Fort Greene, NY',
    category: 'Home',
    condition: 'Good',
    seller: 'Elliot W.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Warm modern lamp illuminating a cozy room',
    tone: 'yellow',
  },
  {
    id: 8,
    title: 'Headphones for the Long Way',
    price: 130,
    location: 'Williamsburg, NY',
    category: 'Tech',
    condition: 'Like new',
    seller: 'Sam T.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Comfortable over-ear headphones in a rich terracotta color',
    tone: 'rose',
  },
]

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
  }, [activeCategory, search])

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

        {visibleListings.length ? (
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
        <div className="feed-endnote"><span>✳</span> You’re all caught up. Go enjoy your new find.</div>
      </section>
    </div>
  )
}
