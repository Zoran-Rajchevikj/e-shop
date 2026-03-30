package com.example.eshop.repository;

import com.example.eshop.model.domain.Cart;
import com.example.eshop.model.domain.CartItem;
import com.example.eshop.model.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long > {
    Optional<Cart> findByUserId (Long id);
    Optional<Cart> findByUser(User user);

}
