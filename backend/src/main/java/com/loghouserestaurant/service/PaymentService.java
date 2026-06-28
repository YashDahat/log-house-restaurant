package com.loghouserestaurant.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.UUID;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Value("${razorpay.webhook.secret}")
    private String razorpayWebhookSecret;

    public String createRazorpayOrder(BigDecimal amount) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject(); // Changed from Map to JSONObject
            orderRequest.put("amount", amount.multiply(new BigDecimal("100")).intValue()); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", UUID.randomUUID().toString());
            orderRequest.put("payment_capture", "1"); // auto-capture

            Order order = razorpayClient.orders.create(orderRequest);
            return order.get("id");
        } catch (RazorpayException e) {
            throw new PaymentGatewayException("Failed to create Razorpay order: " + e.getMessage());
        }
    }

    public boolean verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", razorpayOrderId);
            attributes.put("razorpay_payment_id", razorpayPaymentId);
            attributes.put("razorpay_signature", razorpaySignature);
            return Utils.verifyPaymentSignature(attributes, razorpayKeySecret);
        } catch (RazorpayException e) {
            return false;
        }
    }

    public boolean verifyWebhookSignature(String payload, String signature) {
        try {
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_payment_link_id", "");
            attributes.put("razorpay_payment_link_reference_id", "");
            attributes.put("razorpay_payment_link_status", "");
            attributes.put("razorpay_payment_id", "");
            attributes.put("razorpay_signature", signature);
            // Webhook signature verification uses the raw payload + webhook secret
            return Utils.verifyWebhookSignature(payload, signature, razorpayWebhookSecret);
        } catch (RazorpayException e) {
            return false;
        }
    }
}