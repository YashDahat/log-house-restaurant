package com.loghouserestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.loghouserestaurant.dto.OrderItemResponse;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private UUID orderId;
    private String razorpayOrderId;
    private java.math.BigDecimal totalAmount;
    private String status;
    private List<OrderItemResponse> items;
}
