import Order from "../model/order.js";
import Product from "../model/product.js";

export async function createOrder(req, res) {

    //get user information
    if(req.user == null){
        res.status(403).json(
            { message : "please login first and try agian"}
        )
        return

    }
 //add current users name if not provide

    const orderInfo = req.body

    if(orderInfo.name == null){
        orderInfo.name = req.user.firstName + " " + req.user.lastName
    }

    //orderId genarate

    let orderId = "CBC00001"

    const lastOrder = await Order.find().sort({date : -1}).limit(1)

    if(lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderId //eg: CBC00055
        const lastOrderNumberString = lastOrderId.replace("CBC", "") //eg: 00055
        const lastOrderNumber = parseInt(lastOrderNumberString) //eg: 55   //convert to number
        const newOrderNumber = lastOrderNumber + 1 //eg: 56
        const newOrderNumberString = newOrderNumber.toString().padStart(5, "0"); //eg: 00056
        orderId = "CBC" + newOrderNumberString //eg: CBC00056
    }


      try{
        let total = 0;
        let labelledTotal = 0;
        const products = []

        for(let i = 0; i < orderInfo.products.length;i++){
            const item = await Product.findOne({productId :orderInfo.products[i].productId}) 
            if(item == null){
                res.status(404).json(
                    { message : "product with productId " + orderInfo.products[i].productId + " does not exist"}
                )
                return
            }
            if (item.isAvailable == false) {
                res.status(404).json({
                    message: "Product with productId " + orderInfo.products[i].productId + " is not available right now"
                });
                return;
            }

            products[i] = {
                productInfo : {
                    productId : item.productId,
                    productName : item.productName,
                    altName : item.altName,
                    description : item.description,
                    image : item.image,
                    labelledPrice : item.labelledPrice,
                    price : item.price
                },
                quantity: orderInfo.products[i].quantity
            }

            total += item.price * orderInfo.products[i].quantity
            labelledTotal += item.labelledPrice * orderInfo.products[i].quantity

            
        }


    const newOrder = new Order({
        orderId : orderId,
        name : orderInfo.name, 
        email : req.user.email,
        address : orderInfo.address,
        phone : orderInfo.phone,
        total : 0,
        products : [],
        total : total,
        labelledTotal : labelledTotal
    })

    
       const createdOrder = await newOrder.save()
        res.status(200).json(
            { message : "order created successfuly",
            order : createdOrder
            }
        )

    }catch(err){
        console.error(err);
        res.status(500).json(
            { message : "failed to create order",
            error : err
            }
        )
        
    }

    


    //create order object
    
}