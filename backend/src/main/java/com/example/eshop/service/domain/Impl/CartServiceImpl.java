package com.example.eshop.service.domain.Impl;

import com.example.eshop.model.domain.*;
import com.example.eshop.model.exception.ItemNotFoundException;
import com.example.eshop.model.exception.NotEnoughStockAvailable;
import com.example.eshop.model.exception.UserNotFoundException;
import com.example.eshop.repository.CartRepository;
import com.example.eshop.repository.UserRepository;
import com.example.eshop.service.domain.CartService;
import com.example.eshop.service.domain.ProductVariantService;
import com.example.eshop.service.domain.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final ProductVariantService productVariantService;

    public CartServiceImpl(CartRepository cartRepository, UserService userService, ProductVariantService productVariantService) {
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.productVariantService = productVariantService;
    }

    @Override
    public List<CartItem> listAllItemsInCart(String username) {
        User user = userService.findByUsername(username);
        Cart cart = findOrCreateCart(user);
        return cart.getItems();
    }
    @Transactional
    @Override
    public Cart addItemToCart(String username, Long productVariantId, int quantity) {
        User user = userService.findByUsername(username);
        ProductVariant productVariant = productVariantService.getVariantById(productVariantId);
        Cart cart = findOrCreateCart(user);

        if (productVariant.getStock() < quantity){
            throw new NotEnoughStockAvailable();
        }
        // Проверка дали веќе постои CartItem за истиот variant
        Optional<CartItem> item = cart.getItems().stream()
                .filter(i -> i.getProductVariant().getId().equals(productVariantId)).findFirst();

        if (item.isPresent()) {
            int newQuantity = item.get().getQuantity() + quantity;
            if (newQuantity <= productVariant.getStock()) {
                item.get().setQuantity(newQuantity);
            } else {
                throw new NotEnoughStockAvailable();
            }
            return cartRepository.save(cart);
        }

        CartItem cartItem = new CartItem(productVariant,quantity);
        cartItem.setCart(cart);
        cart.getItems().add(cartItem);

        return cartRepository.save(cart);
    }

    @Override
    public Cart getCart(String username) {
        User user = userService.findByUsername(username);
        return findOrCreateCart(user);
    }

    @Override
    public Cart increaseQuantity(String username, Long variantId) {
        User user = userService.findByUsername(username);
        Cart cart = findOrCreateCart(user);

        Optional<CartItem> cartItemOpt = cart.getItems().stream()
                .filter(item -> item.getProductVariant().getId().equals(variantId))
                .findFirst();

        if (cartItemOpt.isEmpty()) {
            throw new IllegalArgumentException("CartItem not found for variantId: " + variantId);
        }

        CartItem cartItem = cartItemOpt.get();
        if (cartItem.getQuantity() + 1 > cartItem.getProductVariant().getStock()) {
            throw new NotEnoughStockAvailable();
        }

        cartItem.setQuantity(cartItem.getQuantity() + 1);
        return cartRepository.save(cart);
    }

    @Override
    public Cart decreaseQuantity(String username, Long variantId) {
        User user = userService.findByUsername(username);
        Cart cart = findOrCreateCart(user);

        Optional<CartItem> cartItemOpt = cart.getItems().stream()
                .filter(item -> item.getProductVariant().getId().equals(variantId))
                .findFirst();

        if (cartItemOpt.isEmpty()) {
            throw new IllegalArgumentException("CartItem not found for variantId: " + variantId);
        }

        CartItem cartItem = cartItemOpt.get();
        if (cartItem.getQuantity() <= 1) {
            // Ако quantity е 1, можеме да го избришеме item-от од cart
            cart.getItems().remove(cartItem);
            cartItem.setCart(null);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
        }

        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public void removeItemFromCart(String username, Long itemId) {// izbrisi samo eden ako ima poise od ist tip
        User user = userService.findByUsername(username);
        Cart cart = findOrCreateCart(user);
        CartItem item = cart.getItems().stream().
                filter(x -> x.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ItemNotFoundException(itemId));
        cart.removeItem(item);
         cartRepository.save(cart);
    }
    @Transactional
    @Override
    public void removeAllItemsFromCart(String username) {
        User user = userService.findByUsername(username);
        Cart cart = findOrCreateCart(user);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
    private Cart findOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }
}
