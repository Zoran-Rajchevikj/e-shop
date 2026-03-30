package com.example.eshop.repository.specification;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecifications {

    public static Specification<Product> withFilters(
            GenderType genderType,
            ProductType productType,
            String searchName,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String color,
            Size size) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            // fakticki sql WHERE gi kombinirame site predikati

            // Filter по GenderType
            if (genderType != null) {
                predicates.add(cb.equal(root.get("genderType"), genderType));
            }

            // Filter по ProductType
            if (productType != null) {
                predicates.add(cb.equal(root.get("productType"), productType));
            }

            // Filter по Name (search)
            if (searchName != null && !searchName.isEmpty()) {
                predicates.add(cb.like(
                        cb.lower(root.get("name")),
                        "%" + searchName.toLowerCase() + "%"
                ));
            }

            // Filter по Price - ТРЕБА JOIN СО ProductVariant
            if (minPrice != null || maxPrice != null) {
                var variantJoin = root.join("variants", jakarta.persistence.criteria.JoinType.INNER);

                if (minPrice != null) {
                    predicates.add(cb.greaterThanOrEqualTo(variantJoin.get("price"), minPrice));
                }
                if (maxPrice != null) {
                    predicates.add(cb.lessThanOrEqualTo(variantJoin.get("price"), maxPrice));
                }
            }

            // Filter по Color - ТРЕБА JOIN СО ProductVariant
            if (color != null && !color.isEmpty()) {
                var variantJoin = root.join("variants", jakarta.persistence.criteria.JoinType.INNER);
                predicates.add(cb.equal(variantJoin.get("color"), color));
            }

            // Filter по Size - ТРЕБА JOIN СО ProductVariant
            if (size != null) {
                var variantJoin = root.join("variants", jakarta.persistence.criteria.JoinType.INNER);
                predicates.add(cb.equal(variantJoin.get("size"), size));
            }

            // ВАЖНО: Ако имаш multiple joins, GROUP BY за да не добиеш дупликати
            if ((minPrice != null || maxPrice != null ||
                    (color != null && !color.isEmpty()) || size != null)) {
                query.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
