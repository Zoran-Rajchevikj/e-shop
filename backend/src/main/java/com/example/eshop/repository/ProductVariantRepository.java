package com.example.eshop.repository;

import com.example.eshop.model.domain.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant,Long> {
    List<ProductVariant> findByProductId(Long id);
}
