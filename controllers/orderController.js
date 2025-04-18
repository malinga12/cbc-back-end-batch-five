import Order from "../model/order.js"

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

    const Order = new Order({
        orderId : orderId,
        name : orderInfo.name, 
        address : orderInfo.address,
        total : 0,
        products : []
    })

    try{
       const createdOrder = await Order.save()
        res.status(200).json(
            { message : "order created successfuly",
            Order : createdOrder
            }
        )

    }catch(err){
        res.status(500).json(
            { message : "failed to create order",
            error : err
            }
        )
        
    }

    


    //create order object
    
}