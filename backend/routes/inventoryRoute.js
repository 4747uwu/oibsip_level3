// import express from 'express';
// import Inventory from '../models/Inventory.js';
// import transporter from "../config/nodeMailer.js";
// import adminAuth from '../middleware/adminAuth.js';

// const router = express.Router();

// /**
//  * Sends a low inventory alert email.
//  * Returns true if email was sent successfully, false otherwise.
//  */
// const sendLowInventoryAlert = async (item) => {
//   console.log(`[EMAIL ALERT] Checking configuration...`);
  
//   // Verify email configuration
//   if (!process.env.SENDER_EMAIL || !process.env.ADMIN_EMAIL_REAL) {
//     console.error('[EMAIL ALERT] Missing email configuration:', {
//       sender: process.env.SENDER_EMAIL,
//       recipient: process.env.ADMIN_EMAIL_REAL,
//     });
//     return false;
//   }

//   console.log(`[EMAIL ALERT] Preparing alert for ${item.name} (${item.quantity}/${item.threshold} ${item.unit})`);
  
//   const mailOptions = {
//     from: process.env.SENDER_EMAIL,
//     to: process.env.ADMIN_EMAIL_REAL,
//     subject: `Low Inventory Alert: ${item.name}`,
//     html: `
//       <h2>Low Inventory Alert</h2>
//       <p><strong>Item:</strong> ${item.name}</p>
//       <p><strong>Current Quantity:</strong> ${item.quantity} ${item.unit}</p>
//       <p><strong>Threshold:</strong> ${item.threshold} ${item.unit}</p>
//       <p>Please restock as soon as possible.</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`[EMAIL ALERT] Alert sent successfully for ${item.name}`);
//     return true;
//   } catch (error) {
//     console.error('[EMAIL ALERT] Error sending email:', error);
//     return false;
//   }
// };

// /**
//  * Checks if an item needs a low inventory alert and sends it if necessary.
//  */
// const checkAndSendAlert = async (item) => {
//   if (!item.threshold) {
//     console.log(`[ALERT CHECK] No threshold set for ${item.name}, skipping alert`);
//     return;
//   }

//   if (item.quantity <= item.threshold) {
//     console.log(`[ALERT CHECK] ${item.name} is below threshold (${item.quantity}/${item.threshold})`);
//     await sendLowInventoryAlert(item);
//   } else {
//     console.log(`[ALERT CHECK] ${item.name} is above threshold (${item.quantity}/${item.threshold})`);
//   }
// };

// /**
//  * Checks all inventory items for low stock and sends alerts
//  */
// const checkAllInventory = async () => {
//   try {
//     console.log('[INVENTORY CHECK] Starting inventory check...');
//     const lowStockItems = await Inventory.find({
//       $expr: {
//         $and: [
//           { $ne: ["$threshold", null] },  // Only check items with threshold set
//           { $lte: ["$quantity", "$threshold"] }  // Where quantity <= threshold
//         ]
//       }
//     });

//     console.log(`[INVENTORY CHECK] Found ${lowStockItems.length} items below threshold`);
    
//     for (const item of lowStockItems) {
//       await sendLowInventoryAlert(item);
//     }

//     return lowStockItems.length;
//   } catch (error) {
//     console.error('[INVENTORY CHECK] Error checking inventory:', error);
//     return 0;
//   }
// };

// // Get all inventory items
// router.get('/inventory', adminAuth, async (req, res) => {
//   try {
//     const inventory = await Inventory.find().sort({ lastUpdated: -1 });
    
//     // Check inventory levels after loading
//     const lowStockCount = await checkAllInventory();
//     console.log(`[GET] Inventory loaded and checked. ${lowStockCount} alerts sent.`);
    
//     res.json(inventory);
//   } catch (error) {
//     console.error('[GET] Error fetching inventory:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add or update an inventory item
// router.post('/inventory', adminAuth, async (req, res) => {
//   const { name, quantity, unit, threshold } = req.body;

//   try {
//     let item = await Inventory.findOne({ name });

//     if (item) {
//       // Update existing item
//       const oldQuantity = item.quantity;
//       item.quantity += quantity;
//       item.unit = unit || item.unit;
//       item.threshold = threshold !== undefined ? threshold : item.threshold;
//       item.lastUpdated = Date.now();
//       await item.save();
      
//       console.log(`[POST] Updated ${item.name}: ${oldQuantity} -> ${item.quantity} ${item.unit}`);
//     } else {
//       // Create new item
//       item = new Inventory({
//         name,
//         quantity,
//         unit,
//         threshold,
//         lastUpdated: Date.now(),
//       });
//       await item.save();
//       console.log(`[POST] Created new item: ${item.name} (${item.quantity} ${item.unit})`);
//     }

//     // Check this specific item for alert
//     await checkAndSendAlert(item);

//     res.status(201).json(item);
//   } catch (error) {
//     console.error('[POST] Error updating inventory:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update inventory item
// router.put('/inventory/:id', adminAuth, async (req, res) => {
//   const { quantity, unit, threshold } = req.body;

//   try {
//     const item = await Inventory.findById(req.params.id);

//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     const oldQuantity = item.quantity;
//     item.quantity = quantity !== undefined ? quantity : item.quantity;
//     item.unit = unit || item.unit;
//     item.threshold = threshold !== undefined ? threshold : item.threshold;
//     item.lastUpdated = Date.now();
    
//     await item.save();
//     console.log(`[PUT] Updated ${item.name}: ${oldQuantity} -> ${item.quantity} ${item.unit}`);

//     // Check this specific item for alert
//     await checkAndSendAlert(item);

//     res.json(item);
//   } catch (error) {
//     console.error('[PUT] Error updating item:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete inventory item
// router.delete('/inventory/:id', adminAuth, async (req, res) => {
//   try {
//     const item = await Inventory.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     await Inventory.findByIdAndDelete(req.params.id);
//     console.log(`[DELETE] Removed item: ${item.name}`);
//     res.json({ message: 'Item deleted' });
//   } catch (error) {
//     console.error('[DELETE] Error deleting item:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


import express from 'express';
import Inventory from '../models/Inventory.js';
import transporter from "../config/nodeMailer.js";
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

/**
 * Sends a low inventory alert email.
 * Returns true if email was sent successfully, false otherwise.
 */
const sendLowInventoryAlert = async (item) => {
  console.log(`[EMAIL ALERT] Checking configuration...`);
  
  // Verify email configuration
  if (!process.env.SENDER_EMAIL || !process.env.ADMIN_EMAIL_REAL) {
    console.error('[EMAIL ALERT] Missing email configuration:', {
      sender: process.env.SENDER_EMAIL,
      recipient: process.env.ADMIN_EMAIL_REAL,
    });
    return false;
  }

  console.log(`[EMAIL ALERT] Preparing alert for ${item.name} (${item.quantity}/${item.threshold} ${item.unit})`);
  
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.ADMIN_EMAIL_REAL,
    subject: `Low Inventory Alert: ${item.name}`,
    html: `
      <h2>Low Inventory Alert</h2>
      <p><strong>Item:</strong> ${item.name}</p>
      <p><strong>Current Quantity:</strong> ${item.quantity} ${item.unit}</p>
      <p><strong>Threshold:</strong> ${item.threshold} ${item.unit}</p>
      <p>Please restock as soon as possible.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL ALERT] Alert sent successfully for ${item.name}`);
    return true;
  } catch (error) {
    console.error('[EMAIL ALERT] Error sending email:', error);
    return false;
  }
};

/**
 * Checks if an item needs a low inventory alert and sends it if necessary.
 */
const checkAndSendAlert = async (item) => {
  if (!item.threshold) {
    console.log(`[ALERT CHECK] No threshold set for ${item.name}, skipping alert`);
    return;
  }

  if (item.quantity <= item.threshold) {
    console.log(`[ALERT CHECK] ${item.name} is below threshold (${item.quantity}/${item.threshold})`);
    await sendLowInventoryAlert(item);
  } else {
    console.log(`[ALERT CHECK] ${item.name} is above threshold (${item.quantity}/${item.threshold})`);
  }
};

/**
 * Checks all inventory items for low stock and sends alerts
 */
const checkAllInventory = async () => {
  try {
    console.log('[INVENTORY CHECK] Starting inventory check...');
    const lowStockItems = await Inventory.find({
      $expr: {
        $and: [
          { $ne: ["$threshold", null] },  // Only check items with threshold set
          { $lte: ["$quantity", "$threshold"] }  // Where quantity <= threshold
        ]
      }
    });

    console.log(`[INVENTORY CHECK] Found ${lowStockItems.length} items below threshold`);
    
    for (const item of lowStockItems) {
      await sendLowInventoryAlert(item);
    }

    return lowStockItems.length;
  } catch (error) {
    console.error('[INVENTORY CHECK] Error checking inventory:', error);
    return 0;
  }
};

// Get all inventory items
router.get('/inventory', adminAuth, async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ lastUpdated: -1 });
    
    // Check inventory levels after loading
    const lowStockCount = await checkAllInventory();
    console.log(`[GET] Inventory loaded and checked. ${lowStockCount} alerts sent.`);
    
    res.json(inventory);
  } catch (error) {
    console.error('[GET] Error fetching inventory:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add or update an inventory item
router.post('/inventory', adminAuth, async (req, res) => {
  const { name, quantity, unit, threshold } = req.body;

  try {
    let item = await Inventory.findOne({ name });

    if (item) {
      // Update existing item
      const oldQuantity = item.quantity;
      item.quantity += quantity;
      item.unit = unit || item.unit;
      item.threshold = threshold !== undefined ? threshold : item.threshold;
      item.lastUpdated = Date.now();
      await item.save();
      
      console.log(`[POST] Updated ${item.name}: ${oldQuantity} -> ${item.quantity} ${item.unit}`);
    } else {
      // Create new item
      item = new Inventory({
        name,
        quantity,
        unit,
        threshold,
        lastUpdated: Date.now(),
      });
      await item.save();
      console.log(`[POST] Created new item: ${item.name} (${item.quantity} ${item.unit})`);
    }

    // Check this specific item for alert
    await checkAndSendAlert(item);

    res.status(201).json(item);
  } catch (error) {
    console.error('[POST] Error updating inventory:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update inventory item
router.put('/inventory/:id', adminAuth, async (req, res) => {
  const { quantity, unit, threshold } = req.body;

  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const oldQuantity = item.quantity;
    item.quantity = quantity !== undefined ? quantity : item.quantity;
    item.unit = unit || item.unit;
    item.threshold = threshold !== undefined ? threshold : item.threshold;
    item.lastUpdated = Date.now();
    
    await item.save();
    console.log(`[PUT] Updated ${item.name}: ${oldQuantity} -> ${item.quantity} ${item.unit}`);

    // Check this specific item for alert
    await checkAndSendAlert(item);

    res.json(item);
  } catch (error) {
    console.error('[PUT] Error updating item:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete inventory item
router.delete('/inventory/:id', adminAuth, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await Inventory.findByIdAndDelete(req.params.id);
    console.log(`[DELETE] Removed item: ${item.name}`);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('[DELETE] Error deleting item:', error);
    res.status(500).json({ message: error.message });
  }
});

// Backend: Add a PATCH route for updating quantity
router.patch('/inventory/update-quantity', async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const item = await Inventory.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update the quantity
    item.quantity = quantity;
    await item.save();

    res.status(200).json({ message: 'Quantity updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update quantity' });
  }
});


export default router;