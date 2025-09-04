import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
    generateWhatsAppMessage
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Función para enviar pedido por WhatsApp
  const sendToWhatsApp = () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const message = generateWhatsAppMessage();
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573222132187'; // Número por defecto
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Función para incrementar cantidad
  const incrementQuantity = (productId, currentQuantity, maxStock) => {
    if (currentQuantity < maxStock) {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  // Función para decrementar cantidad
  const decrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <>
      {/* Botón flotante del carrito */}
      <div className="cart-float-button" onClick={() => setIsOpen(true)}>
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </div>

      {/* Modal del carrito */}
      {isOpen && (
        <div className="cart-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>🛒 Carrito de Compras</h2>
              <button 
                className="cart-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-content">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <p>Tu carrito está vacío</p>
                  <span className="empty-cart-icon">🛒</span>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p className="cart-item-price">
                            {formatPrice(item.price)} c/u
                          </p>
                          {item.category && (
                            <span className="cart-item-category">
                              {item.category}
                            </span>
                          )}
                        </div>

                        <div className="cart-item-controls">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => decrementQuantity(item.id, item.quantity)}
                            >
                              -
                            </button>
                            <span className="quantity-display">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() => incrementQuantity(item.id, item.quantity, item.stock)}
                              disabled={item.quantity >= item.stock}
                            >
                              +
                            </button>
                          </div>

                          <div className="cart-item-total">
                            {formatPrice(item.price * item.quantity)}
                          </div>

                          <button
                            className="remove-item-btn"
                            onClick={() => removeFromCart(item.id)}
                            title="Eliminar del carrito"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="cart-totals">
                      <div className="total-items">
                        Total de productos: {totalItems}
                      </div>
                      <div className="total-price">
                        <strong>Total: {formatPrice(totalPrice)}</strong>
                      </div>
                    </div>

                    <div className="cart-actions">
                      <button
                        className="clear-cart-btn"
                        onClick={clearCart}
                      >
                        Vaciar carrito
                      </button>
                      <button
                        className="checkout-btn"
                        onClick={sendToWhatsApp}
                      >
                        Finalizar compra por WhatsApp
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;