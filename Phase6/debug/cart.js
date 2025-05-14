function calculateTotal(cart) {
  let total = 0;
  cart.items.forEach((item) => {
    let price = item.price * item.quantity;
    if (item.discount) {
      price = price * item.discount;
    }
    total += price;
  });
  return total;
}

const cart = {
  items: [
    { name: "本", price: 1000, quantity: 2, discount: 0.1 },
    { name: "ペン", price: 200, quantity: 3 },
  ],
};

document.getElementById("cart-total").textContent = `合計: ${calculateTotal(
  cart
)}円`;
