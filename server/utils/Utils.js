import Order from "../Models/OrderModel.js";
import User from "../Models/UserModel.js";
import Product from "../Models/ProductModel.js";

// Check and assign the trusted seller badge
export const checkAndAssignTrustedBadge = async (userId) => {
  try {
    // Fetch all products sold by the user
    const products = await Product.find({ user: userId });
    
    // Collect all reviews for these products
    const allReviews = products.flatMap(product => product.reviews);
    
    // Count the total number of reviews
    const reviewsCount = allReviews.length;

    // Count the number of good reviews (rating >= 4)
    const goodReviewsCount = allReviews.filter(review => review.rating >= 4).length;

    // Check if the user meets the criteria for being a trusted seller
    if (reviewsCount >= 2 && goodReviewsCount / reviewsCount >= 0.8) {
      await User.findByIdAndUpdate(userId, { isTrustedSeller: true });
    }
  } catch (error) {
    console.error("Error checking and assigning trusted badge", error);
  }
};
