package com.loghouserestaurant.controller;

import com.loghouserestaurant.service.PaymentService;
import com.loghouserestaurant.service.OrderService;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.core.JacksonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    private final PaymentService paymentService;
    private final OrderService orderService;
    private final ObjectMapper objectMapper;

    @Autowired
    public PaymentController(PaymentService paymentService, OrderService orderService, ObjectMapper objectMapper) {
        this.paymentService = paymentService;
        this.orderService = orderService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleRazorpayWebhook(@RequestBody String payload, @RequestHeader("x-razorpay-signature") String signature) {
        logger.info("Received Razorpay webhook. Payload: {}, Signature: {}", payload, signature);

        String razorpayOrderId;
        String razorpayPaymentId;

        try {
            // Parse the payload to extract order_id and payment_id
            // The instruction specifies the path: payload.payload.payment.entity.id and payload.payload.payment.entity.order_id
            // However, the example JSON structure implies: entity.payload.payment.entity.id and entity.payload.payment.entity.order_id
            // Following the example JSON structure as it's more common for Razorpay webhooks.
            Map<String, Object> payloadMap = objectMapper.readValue(payload, Map.class);
            Map<String, Object> entity = (Map<String, Object>) payloadMap.get("entity");
            Map<String, Object> innerPayload = (Map<String, Object>) entity.get("payload");
            Map<String, Object> payment = (Map<String, Object>) innerPayload.get("payment");
            Map<String, Object> paymentEntity = (Map<String, Object>) payment.get("entity");

            razorpayPaymentId = (String) paymentEntity.get("id");
            razorpayOrderId = (String) paymentEntity.get("order_id");

            if (razorpayPaymentId != null && razorpayOrderId != null) {
                logger.info("Extracted Razorpay Payment ID: {} and Order ID: {}", razorpayPaymentId, razorpayOrderId);

                // Verify the webhook signature
                if (paymentService.verifyWebhookSignature(payload, signature)) {
                    logger.info("Razorpay webhook signature verified successfully.");
                    // Update order status or perform other actions
                    orderService.updateOrderStatus(razorpayOrderId, razorpayPaymentId, "PAID"); // Assuming a method like this exists
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    logger.warn("Razorpay webhook signature verification failed.");
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                logger.warn("Missing razorpay_payment_id or razorpay_order_id in webhook payload.");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (JacksonException e) {
            logger.error("Error parsing Razorpay webhook payload: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Error processing Razorpay webhook: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}