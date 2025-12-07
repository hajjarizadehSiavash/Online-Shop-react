function ProductCard({ item, onAdd, onImageClick }) {
  return (
    <div className="product-card">
      <img
      src={item.image}
      alt={item.name}
      onClick={onImageClick}
      className="product-image"
      />

      <h3>{item.name}</h3>

      <p className="product-card-price">${item.price}</p>

      <button className="add-btn" onClick={() => onAdd(item)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
