package com.loghouserestaurant.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    // Forwards all non-file, non-API GET requests to index.html so React Router
    // can handle client-side navigation on direct URL access or page refresh.
    @GetMapping(value = {
        "/{path:[^\\.]*}",
        "/{path1:[^\\.]*}/{path2:[^\\.]*}",
        "/{path1:[^\\.]*}/{path2:[^\\.]*}/{path3:[^\\.]*}"
    })
    public String fallback() {
        return "forward:/index.html";
    }
}
