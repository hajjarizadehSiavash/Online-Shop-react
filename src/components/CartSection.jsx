import CartItem from "./CartItem";

function CartSection({ cart, total, onIncrease, onDecrease, onRemove, onClear }) {
    const isEmpty = cart.length === 0;

    return (
        <section className="cart-section">
            <h2>Your Cart</h2>

            {isEmpty ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={() => onIncrease(item.id)}
                                onDecrease={() => onDecrease(item.id)}
                                onRemove={() => onRemove(item.id)}
                            />
                        ))}
                    </ul>

                    <div className="cart-total">
                        <p>Total:</p>
                        <p>${total}</p>

                        <button className="clear-btn" onClick={onClear}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default CartSection;
