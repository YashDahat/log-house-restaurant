package com.loghouserestaurant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping("/{path:[^\\.]*}")
    public String fallback() {
        return "forward:/index.html";
    }
}