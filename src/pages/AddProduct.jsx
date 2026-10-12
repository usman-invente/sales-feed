import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { addUserListing } from '../services/listingService'
import './AddProduct.css'

const categories = ['Furniture', 'Tech', 'Home', 'Fashion', 'Art']
const conditions = ['New', 'Like new', 'Very good', 'Good', 'Fair']
const tones = ['sand', 'lavender', 'sage', 'peach', 'blue', 'pink', 'yellow', 'rose']

export default function AddProduct() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState({
    title: '',
    price: '',
    location: '',
    category: '',
    condition: '',
    seller: user?.name || user?.username || '',
    image: '',
    imageAlt: '',
    tone: 'sand',
  })

  function updateProduct(event) {
    const { name, value } = event.target
    setProduct((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const listing = {
        ...product,
        id: crypto.randomUUID(),
        price: Number(product.price),
      }
      addUserListing(listing)
      navigate('/')
    } catch (saveError) {
      setError(saveError.message || 'Unable to save your product. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <section className="add-product-page" aria-labelledby="add-product-title">
      <Link className="add-product-back" to="/dashboard">← Back to dashboard</Link>
      <div className="add-product-heading">
        <span className="eyebrow"><span className="eyebrow-sparkle" aria-hidden="true">✳</span> PASS IT ALONG</span>
        <h1 id="add-product-title">Share a good thing.</h1>
        <p>Give your find a little introduction and let someone nearby fall in love with it.</p>
      </div>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="add-product-fields">
          <label className="add-product-field add-product-field-wide">
            <span>Product title</span>
            <input
              name="title"
              value={product.title}
              onChange={updateProduct}
              placeholder="The Sunday Lounge Chair"
              maxLength={100}
              required
            />
          </label>

          <label className="add-product-field">
            <span>Price <small>($)</small></span>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={updateProduct}
              min="0"
              step="0.01"
              placeholder="420"
              required
            />
          </label>

          <label className="add-product-field">
            <span>Category</span>
            <select name="category" value={product.category} onChange={updateProduct} required>
              <option value="" disabled>Select a category</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>

          <label className="add-product-field">
            <span>Location</span>
            <input
              name="location"
              value={product.location}
              onChange={updateProduct}
              placeholder="Brooklyn, NY"
              maxLength={100}
              required
            />
          </label>

          <label className="add-product-field">
            <span>Condition</span>
            <select name="condition" value={product.condition} onChange={updateProduct} required>
              <option value="" disabled>Select condition</option>
              {conditions.map((condition) => <option key={condition}>{condition}</option>)}
            </select>
          </label>

          <label className="add-product-field">
            <span>Seller</span>
            <input
              name="seller"
              value={product.seller}
              onChange={updateProduct}
              placeholder="Your name"
              maxLength={80}
              required
            />
          </label>

          <label className="add-product-field add-product-field-wide">
            <span>Image URL</span>
            <input
              name="image"
              type="url"
              value={product.image}
              onChange={updateProduct}
              placeholder="https://example.com/your-product.jpg"
              required
            />
          </label>

          <label className="add-product-field add-product-field-wide">
            <span>Image description <small>For accessibility</small></span>
            <input
              name="imageAlt"
              value={product.imageAlt}
              onChange={updateProduct}
              placeholder="Sculptural cream lounge chair in a sunlit room"
              maxLength={200}
              required
            />
          </label>

          <label className="add-product-field">
            <span>Image backdrop</span>
            <select name="tone" value={product.tone} onChange={updateProduct}>
              {tones.map((tone) => <option key={tone} value={tone}>{tone[0].toUpperCase() + tone.slice(1)}</option>)}
            </select>
          </label>
        </div>

        {error && <p className="add-product-error" role="alert">{error}</p>}

        <div className="add-product-actions">
          <Link to="/dashboard">Cancel</Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sharing…' : 'Share your good thing'} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </section>
  )
}
