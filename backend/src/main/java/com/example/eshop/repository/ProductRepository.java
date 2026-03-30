package com.example.eshop.repository;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByGenderType(GenderType genderType);
    List<Product> findByProductType(ProductType productType);
}
