import Product from "../model/product.js";
import { isAdmin } from "./userController.js";

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


export async function updateProduct(req, res){
  if(!isAdmin(req)) {
    res.status(403).json(
      { message : "you are not allowed to update product" }
    )
    return
  }

  const productId = req.params.productId
  const updatingData = req.body

  try{

    await Product.updateOne(
      {productId : productId},
      updatingData // Corrected to use productId from params
    )

    res.json(
      { message: "product updated successfully" }
    )

  }catch(err){
    res.status(500).json({
      message: "Error updating product",
      error: err
    })
  }
}

export async function getProductId(req, res){
  const productId = req.params.productId

  try{

    const product = await Product.findOne(
      {productId : productId}
    )
    if(product == null){
      res.status(404).json(
        { message: "product not found" }
      )
      return
    } 

    if(product.isAvailable){
      res.json(product)
    }else{

    if(!isAdmin(req)){
     
      res.status(403).json(
        { message: "you are not allowed to see this product" }
      )
      return

    }else{
      res.json(product)
    }
      
    }

  }catch(err){

    res.status(500).json({
      message: "Error fetching product",
      error: err
    })

  }


}

