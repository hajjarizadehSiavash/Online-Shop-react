

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    const lineTotal = item.price * (item.quantity ?? 0);

    return (
        <li className="cart-item">

            <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
            />


            <span className="cart-item-name">{item.name}</span>


            <div className="quantity-controls">
                <button
                    className="qty-btn qty-minus"
                    onClick={onDecrease}
                >
                    -
                </button>

                <span className="qty-value">{item.quantity ?? 0}</span>

                <button
                    className="qty-btn qty-plus"
                    onClick={onIncrease}
                >
                    +
                </button>
            </div>


            <span className="cart-item-price">${lineTotal}</span>


            <button
                className="remove-btn"
                onClick={onRemove}
            >
                Remove
            </button>
        </li>
    );
}

export default CartItem;
