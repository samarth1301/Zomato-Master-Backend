import joi from "joi";

export const ValidateRestaurantId = (resId) => {

const Schema = joi.object({
  _id: joi.string().required()
});

return Schema.validateAsync(resId);
};


export const ValidateRestaurantCity = (resObj) => {

const Schema = joi.object({
  city: joi.string().required()
});

return Schema.validateAsync(resObj);
};


export const ValidateRestaurantSearchString = (resCategory) => {

const Schema = joi.object({
    searchString: joi.string().required()
});

return Schema.validateAsync(resCategory);
};

