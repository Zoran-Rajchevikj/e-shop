package com.example.eshop.web;

import com.example.eshop.dto.CartDTO;
import com.example.eshop.dto.CartItemDTO;
import com.example.eshop.model.domain.User;
import com.example.eshop.service.application.CartApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartApplicationService cartApplicationService;

    public CartController(CartApplicationService cartApplicationService) {
        this.cartApplicationService = cartApplicationService;
    }


    @GetMapping("/items")
    public ResponseEntity<List<CartItemDTO>> listAllItemsInCart(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                cartApplicationService.listAllItemsInCart(user.getUsername())
        );
    }


    @PostMapping("/add/{variantId}")
    public ResponseEntity<CartDTO> addItemToCart(
            @AuthenticationPrincipal User user,
            @PathVariable Long variantId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.ok(
                cartApplicationService.addItemToCart(user.getUsername(), variantId,quantity)
        );
    }

    @PostMapping("/increase/{variantId}")
    public ResponseEntity<CartDTO> increaseQuantity(
            @AuthenticationPrincipal User user,
            @PathVariable Long variantId
    ) {
        return ResponseEntity.ok(
                cartApplicationService.increaseQuantity(user.getUsername(), variantId)
        );
    }

    // Намалување на quantity за даден variant
    @PostMapping("/decrease/{variantId}")
    public ResponseEntity<CartDTO> decreaseQuantity(
            @AuthenticationPrincipal User user,
            @PathVariable Long variantId
    ) {
        return ResponseEntity.ok(
                cartApplicationService.decreaseQuantity(user.getUsername(), variantId)
        );
    }
    @GetMapping
    public ResponseEntity<CartDTO> getCart(
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                cartApplicationService.getCart(user.getUsername())
        );
    }


    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(
            @AuthenticationPrincipal User user,
            @PathVariable Long itemId
    ) {
                cartApplicationService.removeItemFromCart(user.getUsername(), itemId);
                return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> removeAllItemsFromCart(
            @AuthenticationPrincipal User user
    ) {
        cartApplicationService.removeAllItemsFromCart(user.getUsername());
        return ResponseEntity.noContent().build();

    }
}

