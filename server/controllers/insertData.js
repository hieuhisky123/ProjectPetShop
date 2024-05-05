const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const data = require("./chothuephongtro.json");
const fn = async (product) => {
  const productData = {
    title: product?.title,
    slug: slugify(product?.title),
    description: [product.description],
    brand: product.brand,
    price: parseInt(product?.price),
    categories: product?.cate,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: [product?.images],
  };

  // Kiểm tra nếu trường "discount" tồn tại trong dữ liệu sản phẩm
  if (product.discount !== undefined) {
    productData.discount = parseInt(product.discount);
  }

  await Product.create(productData);
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data.body) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});

module.exports = {
  insertProduct,
};
