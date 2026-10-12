import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addUserListing } from "../services/listingService";
import "./AddProduct.css";

const categories = ["Furniture", "Tech", "Home", "Fashion", "Art"];
const conditions = ["New", "Like new", "Very good", "Good", "Fair"];

const maxImageSize = 5 * 1024 * 1024;
const tones = [
  "sand",
  "lavender",
  "sage",
  "peach",
  "blue",
  "pink",
  "yellow",
  "rose",
];

export default function AddProduct() {

  

  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);


  const initialProductState = {
    title: "",
    price: "",
    location: "",
    category: "",
    condition: "",
    seller: user?.name || "",
    imageAlt: "",
    tone: "sand",
  };

  const [product, setProduct] = useState(initialProductState);

  function updateProduct(event) {
    const { name, value } = event.target;
    setProduct((current) => ({ ...current, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0] ?? null;
    setImageError("");


    if (file && file.size > maxImageSize) {
      setImageFile(null);
      setImageError("Choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setImageError("");
    setIsSubmitting(true);

    try {
      // 1. FormData banayein taake file (imageFile) aur text fields backend tak sahi jayein
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("location", product.location);
      formData.append("category", product.category);
      formData.append("condition", product.condition);
      formData.append("seller", product.seller);
      formData.append("imageAlt", product.imageAlt);
      formData.append("tone", product.tone);

      
      if (imageFile) {
        formData.append("image", imageFile); // Multer (.single("image"))
      }

    
      await addUserListing(formData);
      
      navigate("/");
    } catch (saveError) {
     
      setError(
        saveError.response?.data?.message || 
        saveError.message || 
        "Unable to save your product. Please try again."
      );
    } finally {
    
      setIsSubmitting(false);
    }
  }

  return (
    <section className="add-product-page" aria-labelledby="add-product-title">
      <Link className="add-product-back" to="/dashboard">
        ← Back to dashboard
      </Link>
      <div className="add-product-heading">
        <span className="eyebrow">
          <span className="eyebrow-sparkle" aria-hidden="true">
            ✳
          </span>{" "}
          PASS IT ALONG
        </span>
        <h1 id="add-product-title">Share a good thing.</h1>
        <p>
          Give your find a little introduction and let someone nearby fall in
          love with it.
        </p>
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
              
            />
          </label>

          <label className="add-product-field">
            <span>
              Price <small>($)</small>
            </span>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={updateProduct}
              min="0"
              step="0.01"
              placeholder="420"
              
            />
          </label>

          <label className="add-product-field">
            <span>Category</span>
            <select
              name="category"
              value={product.category}
              onChange={updateProduct}
              
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
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
              
            />
          </label>

          <label className="add-product-field">
            <span>Condition</span>
            <select
              name="condition"
              value={product.condition}
              onChange={updateProduct}
              
            >
              <option value="" disabled>
                Select condition
              </option>
              {conditions.map((condition) => (
                <option key={condition}>{condition}</option>
              ))}
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
              
            />
          </label>

          <label className="add-product-field add-product-field-wide">
            <span>Product photo</span>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              aria-describedby="image-upload-help"
            />
            <small id="image-upload-help">Choose an image (up to 5 MB).</small>
            {imageError && <span className="add-product-error" role="alert">{imageError}</span>}
            {imagePreview && (
              <img
                className="add-product-image-preview"
                src={imagePreview}
                alt={product.imageAlt || imageFile.name}
              />
            )}
          </label>

          <label className="add-product-field add-product-field-wide">
            <span>
              Image description <small>For accessibility</small>
            </span>
            <input
              name="imageAlt"
              value={product.imageAlt}
              onChange={updateProduct}
              placeholder="Sculptural cream lounge chair in a sunlit room"
              maxLength={200}
              
            />
          </label>

          <label className="add-product-field">
            <span>Image backdrop</span>
            <select name="tone" value={product.tone} onChange={updateProduct}>
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone[0].toUpperCase() + tone.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p className="add-product-error" role="alert">
            {error}
          </p>
        )}

        <div className="add-product-actions">
          <Link to="/dashboard">Cancel</Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sharing…" : "Share your good thing"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </form>
    </section>
  );
}
