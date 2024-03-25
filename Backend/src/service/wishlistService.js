const { WishList, Product, CartProduct } = require("../models/index");

const getProductsInWishList = async (id) => {
  let wishlist = [];
  wishlist = await WishList.findAll({
    where: {
      id_user: id,
    },
  });
//   let newList = [];
//   wishlist.forEach((e) => {
//     let el = newList.find((n) => n.nameProduct == e.nameProduct);
//     if (el) el.quantity += e.quantity;
//     else newList.push(e);
//   });
  return wishlist;
};

const createNewWishlist = async (data) => {
  try {
    const wishlist = await WishList.create(data);
    return wishlist;
  } catch (e) {
    console.log(e);
  }
};

const updateWishlist = async (data) => {
  try {
    await WishList.update(
      { ...data },
      { where: { id_product: data.id_product }, raw: true }
    );
    //console.log(Cart)
    return getProductsInWishList(data.id_user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getProductsInWishList, createNewWishlist, updateWishlist };