import joi from "joi";

export const ValidateUserId = (userId) => {

const Schema = joi.object({
  _id: joi.string().required()
});

return Schema.validateAsync(userId);
};
export const ValidateUser = (userData)=>{
    const Schema = joi.object({       
        fullname: joi.string().required().min(4),
        email: joi.string().email(),
        address: joi.array().items(joi.object({detail: joi.string(), for:joi.string()})),
        phoneNumber: joi.number().min(10).max(12),
    });

    return Schema.validateAsync(userData);
};