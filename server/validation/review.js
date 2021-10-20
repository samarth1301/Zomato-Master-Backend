import joi from "joi";

export const ValidateReview = (foodRating) => {
    
    const Schema = joi.object({
        food: joi.string().required(),
        restaurant: joi.string().required(),
        isRestautantReview: joi.boolean().required(),
        isFoodReview: joi.boolean().required(),
        rating: joi.number().required(),
        reviewText: joi.string().max(100)
    });

    return Schema.validateAsync(foodRating);
};
export const ValidateReviewId = (reviewId) => {

    const Schema = joi.object({
      _id: joi.string().required()
    });
    
    return Schema.validateAsync(reviewId);
    };