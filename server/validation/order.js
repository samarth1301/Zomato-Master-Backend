import joi from "joi";



export const ValidateOrder= (orderObj) => {

const Schema = joi.object({
 
  orderDetails: joi.array().items(joi.object({
    food: joi.string().required(),
    quantity: joi.number().required(),
    paymode: joi.string().required(),
    status: joi.string(),
    paymentDetails: joi.object({
      itemTotal: joi.number().required(),
      promo: joi.string().required(),
      tax: joi.number().required(),

    })
  })),
 
});

return Schema.validateAsync(orderObj);
};


