import Product from "../model/product.js";
import { isAdmin } from "./usercontroller.js";

// export function getProduct(res, req){
//   Product.find().then(
//     (data)=>{
//         res.json(data)
//     }
//   )
// }

export async function getProduct(req, res) { // Corrected argument order

  try {

    if (isAdmin(req)) {
      const products = await Product.find()   // Fetch all products
      res.json(products)                     // Send the products as a JSON response
    } else {
      const products = await Product.find({ isAvailable: true })       // Fetch only available products
      res.json(products)
    }

  } catch (err) {
    res.status(500).json({
      message: "Error fetching products "
    })
  }
}

export function saveProduct(req, res) {

  if (!isAdmin(req)) {
    res.status(403).json(
      { message: "you are not allowed to add product" }
    )
    return

  }

  const product = new Product(req.body);

  product.save().then(() => {
    res.json(
      { massage: "product added successfuly" }
    )
  }

  ).catch(() => {
    res.json(
      { massage: "product added failed" }
    )
  })
}

export async function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json(
      { message: "you are not allowed to delete product" })
    return
  }

  try {
    await Product.deleteOne({ productId: req.params.productId })

    res.json(
      { message: "product delete successfully" }
    )

  }catch(err){
    res.status(500).json({
      message: "Error fetching products ",
      error: err
    })
  }
}