import { useState, useEffect } from "react";
import ProductCart from "./components/ProductCart";
import CartSection from "./components/CartSection";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: 299,
    image: "/products/Sony.jpg",
    category: "Audio",
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    price: 399,
    image: "/products/Apple-S-9.jpg",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Logitech G502 HERO",
    price: 79,
    image: "/products/logitech.jpg",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Sony DualSense Controller",
    price: 69,
    image: "/products/Sony-DualSense-Controller.jpg",
    category: "Accessories",
  },
  {
    id: 5,
    name: "iPhone 15 Pro",
    price: 1199,
    image: "/products/Iphon-15-pro.jpg",
    category: "Accessories",
  },
  {
    id: 6,
    name: "MacBook Air M2",
    price: 1299,
    image: "/products/MacBook.jpg",
    category: "Accessories",
  },
];



function App() {
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  if (!savedCart) return [];

  try {
    const parsedCart = JSON.parse(savedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
});

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);


  function closePreview() {
    setPreviewImage(null);
  }

  function handleAdd(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function handleIncrease(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
      )
    );
  }

  function handleDecrease(id) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity ?? 0) - 1 }
            : item
        )
        .filter((item) => (item.quantity ?? 0) > 0)
    );
  }

  function handleRemove(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function handleClear() {
    setCart([]);
  }

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity ?? 0), 0);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity ?? 0),
    0
  );

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  return (
    <div className="app-container">
      {previewImage && (
        <div className="image-modal-overlay" onClick={closePreview}>
          <div className="image-modal-content">
            <img src={previewImage} alt="product preview" />
          </div>
        </div>
      )}

      <header className="app-header">
  <div className="logo">
    <div className="logo-mark">O</div>
    <span className="logo-text">Online Shop</span>
  </div>

  <div className="cart-info">
    <span className="cart-label">Cart</span>
    <span className="cart-count-badge">{cartCount}</span>
  </div>
</header>

      <main>
        <section className="products-section">
          <h2>Products</h2>
          <div className="products-toolbar">
            <input
              className="search-input"
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="category-filters">
              <button
                className={`category-btn ${category === "All" ? "category-btn-active" : ""}`} onClick={() => setCategory("All")}
              >
                All
              </button>

              <button
                className={`category-btn ${category === "Audio" ? "category-btn-active" : ""
                  }`}
                onClick={() => setCategory("Audio")}
              >
                Audio
              </button>

              <button
                className={`category-btn ${category === "Wearables" ? "category-btn-active" : ""
                  }`}
                onClick={() => setCategory("Wearables")}
              >
                Wearables
              </button>

              <button
                className={`category-btn ${category === "Accessories" ? "category-btn-active" : ""
                  }`}
                onClick={() => setCategory("Accessories")}
              >
                Accessories
              </button>
            </div>
          </div>

          <div className="products-list">
            {filteredProducts.map((item) => (
              <ProductCart
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onImageClick={() => setPreviewImage(item.image)}
              />
            ))}
          </div>
        </section>

        <CartSection
          cart={cart}
          total={total}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onClear={handleClear}
        />
      </main>
    </div>
  );
}


export default App;
