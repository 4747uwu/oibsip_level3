import { createContext, useContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload || initialState;

      case 'ADD_TO_CART': {
      const { pizza, size } = action.payload || {};

  if (!pizza || !size) {
    console.error('Invalid payload in ADD_TO_CART:', action.payload);
    return state;
  }

  const existingItemIndex = state.items.findIndex(
    item => item._id === pizza._id && item.size === size
  );

  const updatedItems = [...state.items];

  if (existingItemIndex > -1) {
    // Update existing item
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + 1,
      total: (updatedItems[existingItemIndex].quantity + 1) * pizza.prices[size]
    };
  } else {
    // Add new item
    updatedItems.push({
      _id: pizza._id,
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      size: size,
      price: pizza.prices[size],
      calories: pizza.calories[size],
      isVeg: pizza.isVeg,
      quantity: 1,
      total: pizza.prices[size]
    });
  }

  // Calculate new totals
       

      // Calculate new totals
       const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);

        return {
            items: updatedItems,
            totalQuantity: newTotalQuantity,
            totalAmount: newTotalAmount
        };
        }


      

    case 'REMOVE_FROM_CART': {
      const { pizzaId, size } = action.payload;
      const updatedItems = state.items.filter(
        item => !(item._id === pizzaId && item.size === size)
      );

      // Recalculate totals
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);

      return {
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalAmount: newTotalAmount
      };
    }

    case 'UPDATE_QUANTITY': {
      const { pizzaId, size, quantity } = action.payload;
      if (quantity < 1) return state;

      const updatedItems = state.items.map(item => {
        if (item._id === pizzaId && item.size === size) {
          return {
            ...item,
            quantity: quantity,
            total: quantity * item.price
          };
        }
        return item;
      });

      // Recalculate totals
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);

      return {
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalAmount: newTotalAmount
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = (pizza, size) => {
    dispatch({ type: 'ADD_TO_CART', payload: { pizza, size } });
  };

  const removeFromCart = (pizzaId, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { pizzaId, size } });
  };

  const updateQuantity = (pizzaId, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { pizzaId, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


 const getCartCount = () => {
    let totalCount = 0;
    if (cartState.items && cartState.items.length > 0) {
        for (const item of cartState.items) {
            if (item.quantity) {
                totalCount += item.quantity;
            }
        }
    }
    return totalCount;
};

  // Calculate order summary
  const getOrderSummary = () => {
    const subtotal = cartState.totalAmount;
    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = cartState.items.length > 0 ? 5.99 : 0;
    const total = subtotal + tax + deliveryFee;

    return {
      subtotal,
      tax,
      deliveryFee,
      total
    };
  };

  const value = {
    cart: cartState.items,
    totalQuantity: cartState.totalQuantity,
    totalAmount: cartState.totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getOrderSummary,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
