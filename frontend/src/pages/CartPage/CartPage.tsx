import './CartPage.css';
import useCart from "../../api/hooks/useCart.ts";
import './CartPage.css'


const CartPage = () => {
    const { cart, loading, removeItemFromCart, removeAllFromCart,increaseQuantity,decreaseQuantity } = useCart()

    if (loading) return <div>Loading...</div>;

    if (!cart || cart.items.length === 0)
        return <div>Your cart is empty.</div>;


    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>

            <div className="cart-items">
                {cart.items.map((item) => {
                    // формирање на патеката до сликата исто како во ProductDetails
                    const imgSrc = `/images/products/${item.productType}/${item.productName.toLowerCase()}-${item.color.toLowerCase() || 'default'}.jpg`;

                    return (
                        <div key={item.id} className="cart-item">
                            <img
                                src={imgSrc}
                                alt={item.productName}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h3>{item.productName}</h3>
                                <p>Status: In Stock</p>
                                {item.size && <p>Size: {item.size}</p>}
                                {item.color && <p>Color: {item.color}</p>}
                                <div className="quantity-control">
                                    <button onClick={() => increaseQuantity(item.productVariantId)}>+</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => decreaseQuantity(item.productVariantId)}>-</button>
                                </div>
                                <button
                                    className="remove-item-button"
                                    onClick={() => removeItemFromCart(item.id)}
                                >
                                    Remove Item
                                </button>
                            </div>
                            <div className="cart-item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-summary">
                <h2>Total: ${cart.totalCartPrice.toFixed(2)}</h2>
                <button onClick={removeAllFromCart}>Remove All</button>
            </div>
        </div>
    );
};

export default CartPage;
