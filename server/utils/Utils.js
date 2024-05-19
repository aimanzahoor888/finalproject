import Order from "../Models/OrderModel.js";
import User from "../Models/UserModel.js";
import Product from "../Models/ProductModel.js";

export const checkAndAssignTrustedBadge = async (userId) => {
  const products = await Product.find({ user: userId });
  let totalReviews = 0;
  let totalRating = 0;

  // Check for placed orders
  const orders = await Order.find({ "orderItems.product": { $in: products.map(p => p._id) } });

  // Count the total number of placed orders
  const totalPlacedOrders = orders.length;

  // Count the total number of reviews and calculate total rating
  products.forEach((product) => {
    totalReviews += product.reviews.length;
    totalRating += product.reviews.reduce((acc, review) => acc + review.rating, 0);
  });

  // Calculate average rating
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  // Determine if the seller should be marked as trusted
  const isTrustedSeller = totalPlacedOrders >= 5 && totalReviews >= 4 && averageRating > 3;

  await User.updateOne({ _id: userId }, { isTrustedSeller });
};
