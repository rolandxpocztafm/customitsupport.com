const express = require('express');
const router = express.Router();
const Mollie = require('@mollie/api-client');
const nodemailer = require('nodemailer');

const mollieClient = Mollie({ apiKey: process.env.MOLLIE_API_KEY });

// In-memory storage for demo (replace with database in production)
const orders = {};

// Email setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Create payment
router.post('/create-payment', async (req, res) => {
  try {
    const { customer, cart, total, paymentMethod } = req.body;
    const orderId = `order_${Date.now()}`;
    
    // Skip Mollie for cash on delivery
    if (paymentMethod === 'cash') {
      orders[orderId] = { 
        status: 'pending', 
        customer,
        cart,
        total
      };
      
      await sendConfirmationEmails(orderId);
      return res.json({ orderId, redirectUrl: `/order-confirmation.html?order=${orderId}` });
    }

    // Create Mollie payment
    const payment = await mollieClient.payments.create({
      amount: {
        value: total.toFixed(2),
        currency: 'EUR'
      },
      description: `Order #${orderId}`,
      redirectUrl: `${process.env.FRONTEND_URL}/order-confirmation.html?order=${orderId}`,
      webhookUrl: `${process.env.BACKEND_URL}/payment-webhook`,
      method: paymentMethod === 'bank' ? 'banktransfer' : paymentMethod,
      metadata: {
        orderId,
        customer,
        cart
      }
    });

    orders[orderId] = {
      status: 'pending',
      paymentId: payment.id,
      customer,
      cart,
      total
    };

    res.json({ orderId, redirectUrl: payment.getCheckoutUrl() });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

// Webhook handler
router.post('/payment-webhook', async (req, res) => {
  try {
    const payment = await mollieClient.payments.get(req.body.id);
    const orderId = payment.metadata.orderId;
    const order = orders[orderId];
    
    if (order) {
      order.status = payment.status;
      if (payment.isPaid()) {
        await sendConfirmationEmails(orderId);
      }
    }
    
    res.status(200).end();
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).end();
  }
});

// Payment status check
router.get('/payment-status/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const order = orders[orderId];
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  if (order.paymentId) {
    const payment = await mollieClient.payments.get(order.paymentId);
    order.status = payment.status;
  }
  
  res.json({ 
    status: order.status,
    customer: order.customer,
    cart: order.cart,
    total: order.total
  });
});

async function sendConfirmationEmails(orderId) {
  const order = orders[orderId];
  
  // Customer email
  await transporter.sendMail({
    from: 'orders@customitsupport.com',
    to: order.customer.email,
    subject: 'Your Custom IT Support Order Confirmation',
    html: generateCustomerEmail(order, orderId)
  });
  
  // Admin notification
  await transporter.sendMail({
    from: 'orders@customitsupport.com',
    to: 'sales@customitsupport.com',
    subject: `New Order #${orderId}`,
    html: generateAdminEmail(order, orderId)
  });
}

function generateCustomerEmail(order, orderId) {
  return `
    <h1>Thank you for your order!</h1>
    <p>Order #${orderId}</p>
    <h2>Order Summary</h2>
    ${order.cart.map(item => `
      <div>
        ${item.name} - ${item.quantity} × €${item.price}
      </div>
    `).join('')}
    <p>Total: €${order.total}</p>
  `;
}

function generateAdminEmail(order, orderId) {
  return `
    <h1>New Order #${orderId}</h1>
    <h2>Customer Details</h2>
    <p>${order.customer.fullName}</p>
    <p>${order.customer.email}</p>
    <p>${order.customer.phone}</p>
    <h2>Order Summary</h2>
    ${order.cart.map(item => `
      <div>
        ${item.name} - ${item.quantity} × €${item.price}
      </div>
    `).join('')}
    <p>Total: €${order.total}</p>
  `;
}

module.exports = router;
