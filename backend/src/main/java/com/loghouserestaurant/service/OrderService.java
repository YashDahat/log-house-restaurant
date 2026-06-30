package com.loghouserestaurant.service;

import com.loghouserestaurant.repository.OrderRepository;
import com.loghouserestaurant.repository.OrderItemRepository;
import com.loghouserestaurant.repository.MenuItemRepository;
import com.loghouserestaurant.model.Order;
import com.loghouserestaurant.model.OrderItem;
import com.loghouserestaurant.model.MenuItem;
import com.loghouserestaurant.model.OrderStatus;
import com.loghouserestaurant.dto.CreateOrderRequest;
import com.loghouserestaurant.dto.OrderResponse;
import com.loghouserestaurant.dto.OrderItemRequest;
import com.loghouserestaurant.dto.OrderItemResponse;
import com.loghouserestaurant.dto.UpdateOrderStatusRequest;
import com.loghouserestaurant.exception.PaymentInitiationException;
import com.loghouserestaurant.exception.PaymentVerificationException;
import com.loghouserestaurant.exception.InvalidOrderStatusTransitionException;
import com.loghouserestaurant.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final PaymentService paymentService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.paymentService = paymentService;
    }

    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());

        String razorpayOrderId;
        try {
            razorpayOrderId = paymentService.createRazorpayOrder(totalAmount);
        } catch (Exception e) {
            throw new PaymentInitiationException("Failed to initiate Razorpay order: " + e.getMessage());
        }
        order.setRazorpayOrderId(razorpayOrderId);

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }

    public OrderResponse verifyPaymentAndUpdateStatus(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        Order order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with Razorpay Order ID: " + razorpayOrderId));

        boolean isVerified = paymentService.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (!isVerified) {
            throw new PaymentVerificationException("Razorpay payment signature verification failed for order: " + razorpayOrderId);
        }

        order.setRazorpayPaymentId(razorpayPaymentId);
        order.setStatus(OrderStatus.RECEIVED);
        Order updatedOrder = orderRepository.save(order);

        return mapToOrderResponse(updatedOrder);
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse updateOrderStatus(UUID id, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));

        if (order.getStatus() == OrderStatus.DELIVERED && request.getStatus() == OrderStatus.PENDING_PAYMENT) {
            throw new InvalidOrderStatusTransitionException("Invalid status transition: Cannot change a DELIVERED order back to PENDING_PAYMENT.");
        }

        order.setStatus(request.getStatus());
        Order updatedOrder = orderRepository.save(order);

        return mapToOrderResponse(updatedOrder);
    }

    public void updateOrderStatus(String razorpayOrderId, String razorpayPaymentId, String status) {
        Order order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with Razorpay Order ID: " + razorpayOrderId));
        order.setRazorpayPaymentId(razorpayPaymentId);
        order.setStatus(OrderStatus.valueOf(status));
        orderRepository.save(order);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(orderItem -> OrderItemResponse.builder()
                        .menuItemId(orderItem.getMenuItem().getId())
                        .menuItemName(orderItem.getMenuItem().getName())
                        .quantity(orderItem.getQuantity())
                        .price(orderItem.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .orderId(order.getId())
                .razorpayOrderId(order.getRazorpayOrderId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(itemResponses)
                .build();
    }
}
