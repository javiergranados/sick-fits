export default function(cart) {
  return cart.reduce((prev, next) => prev + next.quantity, 0);
}
