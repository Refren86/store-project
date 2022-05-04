import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";

import ProductCard from "../../components/product-card/product-card";
import Spinner from "../../components/spinner/spinner";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

import { CategoryContainer, CategoryTitle } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
