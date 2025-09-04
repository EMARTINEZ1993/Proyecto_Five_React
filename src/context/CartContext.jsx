import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Tipos de acciones para el reducer
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, actualizar la cantidad
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        newItems = [...state.items, { 
          ...product, 
          quantity: Math.min(quantity, product.stock) 
        }];
      }
      
      return calculateTotals({ ...state, items: newItems });
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const productId = action.payload;
      const newItems = state.items.filter(item => item.id !== productId);
      return calculateTotals({ ...state, items: newItems });
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      const newItems = state.items.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) }
          : item
      ).filter(item => item.quantity > 0);
      
      return calculateTotals({ ...state, items: newItems });
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return { ...initialState };
    }
    
    case CART_ACTIONS.LOAD_CART: {
      return calculateTotals({ ...state, items: action.payload || [] });
    }
    
    default:
      return state;
  }
};

// Función para calcular totales
const calculateTotals = (state) => {
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return {
    ...state,
    totalItems,
    totalPrice
  };
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('organicStoreCart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('organicStoreCart', JSON.stringify(state.items));
  }, [state.items]);

  // Funciones para manejar el carrito
  const addToCart = (product, quantity = 1) => {
    dispatch({ 
      type: CART_ACTIONS.ADD_ITEM, 
      payload: { product, quantity } 
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ 
      type: CART_ACTIONS.REMOVE_ITEM, 
      payload: productId 
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Función para generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return '';

    const formatPrice = (price) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(price);
    };

    let message = '🛒 *Pedido de Productos Orgánicos*\n\n';
    
    state.items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: ${formatPrice(item.price)}\n`;
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    message += `📊 *Resumen del pedido:*\n`;
    message += `Total de productos: ${state.totalItems}\n`;
    message += `*Total a pagar: ${formatPrice(state.totalPrice)}*\n\n`;
    message += `¡Gracias por elegir productos orgánicos! 🌱`;

    return encodeURIComponent(message);
  };

  const value = {
    // Estado
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    generateWhatsAppMessage
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;