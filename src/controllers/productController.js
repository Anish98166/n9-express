import { Product } from "../Schema/model.js";

export const createProductController = async (req, res, next) => {
  try {
    let data = await Product.create(req.body);
    res.json({
      success: true,
      message: "Product created successfully",
      result: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
