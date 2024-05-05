const { response } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { subcategories } = require("../../client/src/utils/contantsDetail");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "Cannot create new product",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({
    path: "ratings",
    populate: {
      path: "postedBy",
      select: "firstname lastname avatar",
    },
  });
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp của mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let subcategoriesQueryObject = {};

  //Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };

  if (queries?.subcategories) {
    delete formatedQueries.subcategories;
    const subcategoriesArr = queries.subcategories?.split(",");
    const subcategoriesQuery = subcategoriesArr.map((el) => ({
      subcategories: { $regex: el, $options: "i" },
    }));
    subcategoriesQueryObject = { $or: subcategoriesQuery };
  }
  const q = { ...subcategoriesQueryObject, ...formatedQueries };

  let queryCommand = Product.find(q);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: số object lấy về 1 lần gọi API
  //skip: 2
  // 1 2 3 ... 10
  //+2 => 2
  //+aìdszd => NaN
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Thực thi query
  const response = await queryCommand;

  // Execute query
  // Số lượng sản phẩm thỏa mản điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
  const counts = await Product.find(q).countDocuments();
  return res.status(200).json({
    success: response ? true : false,
    counts,
    products: response ? response : "Cannot get products",
  });
});

//truy vấn bằng category**********************************************************
const getProductsByCate = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp của mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let categoriesQueryObject = {};

  //Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.categories) {
    delete formatedQueries.categories;
    console.log(queries.categories);
    const categoriesArr = queries?.categories;
    const categoriesQuery = categoriesArr.map((el) => ({
      categories: { $regex: el, $options: "i" },
    }));
    categoriesQueryObject = { $or: categoriesQuery };
  }
  const q = { ...categoriesQueryObject, ...formatedQueries };

  let queryCommand = Product.find(q);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: số object lấy về 1 lần gọi API
  //skip: 2
  // 1 2 3 ... 10
  //+2 => 2
  //+aìdszd => NaN
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Thực thi query
  const response = await queryCommand;

  // Execute query
  // Số lượng sản phẩm thỏa mản điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
  const counts = await Product.find(q).countDocuments();
  return res.status(200).json({
    success: response ? true : false,
    counts,
    products: response ? response : "Cannot get products",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  // console.log({alreadyRating});
  if (alreadyRating) {
    // update star
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.updatedAt": updatedAt },
      },
      { new: true }
    );
  } else {
    // add star
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, postedBy: _id, updatedAt } },
      },
      { new: true }
    );
  }

  //Sum ratings
  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;

  await updatedProduct.save();

  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

//comment
const comments = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { content, pid, updatedAt } = req.body;
  if (!content || !pid) throw new Error("Missing inputs");

  // add comment
  const commentList = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { comments: { content, postedBy: _id, updatedAt } },
    },
    { new: true }
  );

  return res.status(200).json({
    success: commentList ? true : false,
    addComment: commentList ? commentList : "Cannot add comment",
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((el) => el.path) } } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "cannot upload images product",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
  comments,
  getProductsByCate,
};
