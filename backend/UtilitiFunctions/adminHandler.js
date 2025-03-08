// // import order from "../models/order";
// // import order from '../models/order.js';
// import Order from '../models/order.js'
// import mongoose from 'mongoose';

// export async function getOrders(req, res) {
//     try {
        
//         const orders = await Order.find();

//         return res.status(201).json({
//             message: "Orders fetched success.",
//             status: true,
//             error: false,
//             data: orders,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({
//             message: "Failed to add product.",
//             status: false,
//             error: true,
//         });
//     }
// }


// export async function updateStatus(req, res) {
//     try {
//         const { status, orderId } = req.body;

//         console.log(status, orderId);

//         // Update order based on orderId (not _id)
//         const update = await Order.findOneAndUpdate(
//             { orderId }, // Searching by orderId (String)
//             { delivery_status: status },
//             { new: true }
//         );

//         if (!update) {
//             return res.status(404).json({
//                 message: "Order not found",
//                 status: false,
//                 error: true,
//             });
//         }

//         return res.status(201).json({
//             message: "Order updated successfully",
//             status: true,
//             error: false,
//             data: update,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({
//             message: "Failed to proceed task.",
//             status: false,
//             error: true,
//         });
//     }
// }

