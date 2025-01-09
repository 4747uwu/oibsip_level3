// import { useCart } from '../../context/CartContext';
// import { Minus, Plus, Trash2 } from 'lucide-react';

// const CartItem = ({ item }) => {
//   const { updateCartItem, removeFromCart, calculateItemPrice } = useCart();

//   const handleQuantityChange = (change) => {
//     const newQuantity = Math.max(1, item.quantity + change);
//     updateCartItem({
//       ...item,
//       quantity: newQuantity
//     });
//   };

//   return (
//     <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
//       <div className="flex items-center gap-4">
//         <img 
//           src={item.imageUrl} 
//           alt={item.title} 
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-medium">{item.title}</h3>
//           <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
//           <p className="text-sm text-gray-600">
//             Calories: {item.calories[item.selectedSize]}
//           </p>
//         </div>
//       </div>
      
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={() => handleQuantityChange(-1)}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <Minus className="w-4 h-4" />
//           </button>
//           <span className="w-8 text-center">{item.quantity}</span>
//           <button 
//             onClick={() => handleQuantityChange(1)}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
        
//         <div className="w-24 text-right">
//           ${(calculateItemPrice(item) * item.quantity).toFixed(2)}
//         </div>
        
//         <button
//           onClick={() => removeFromCart(item._id)}
//           className="p-1 text-red-500 hover:bg-red-50 rounded"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const Cart = () => {
//   const { cartItems, getCartTotals } = useCart();
//   const { subtotal, tax, deliveryFee, total } = getOrderSummary();

//   if (cartItems.length === 0) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Your cart is empty
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
//       <div className="space-y-4">
//         {cartItems.map(item => (
//           <CartItem 
//             key={`${item._id}-${item.selectedSize}`} 
//             item={item} 
//           />
//         ))}
//       </div>
      
//       <div className="mt-6 border-t pt-4 space-y-2">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Tax (8%)</span>
//           <span>${tax.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Delivery Fee</span>
//           <span>${deliveryFee.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold text-lg pt-2 border-t">
//           <span>Total</span>
//           <span>${total.toFixed(2)}</span>
//         </div>
//       </div>
      
//       <button 
//         className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
//         onClick={() => alert('Proceeding to checkout...')}
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };

// export default Cart;