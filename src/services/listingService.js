import { apiClient } from "./api";

const tones = ["sand", "lavender", "sage", "peach", "blue", "pink", "yellow", "rose"];

export const normalizeListing = (product) => {
  const productId = product?._id ?? product?.id;
  if (productId == null) {
    throw new Error('The server returned a product without an ID.');
  }

  const imageFilename = product.image?.split(/[\\/]/).pop();
  const imagePath = imageFilename
    ? `/uploads/images/${encodeURIComponent(imageFilename)}`
    : '';

  return {
    ...product,
    id: String(productId),
    image: imagePath
      ? new URL(imagePath, import.meta.env.VITE_API_BASE_URL).toString()
      : '',
    imageAlt: product.imageAlt || product.title,
    tone: tones.includes(product.tone) ? product.tone : 'sand',
  };
};

export const getListings = async (options = {}) => {
  const response = await apiClient('/product', options);

  if (!Array.isArray(response?.data)) {
    throw new Error('The server returned an invalid product list.');
  }

  return response.data.map(normalizeListing);
};

export const addUserListing = async (data) => {
  return apiClient('/product', {
    method: 'POST',
    body: data,
  });
};