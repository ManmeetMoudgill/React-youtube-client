import React, { memo } from "react";
import "./css/index.css";
import { useEventCallback } from "@mui/material";
import { useFilters } from "../shell/providers/filter-provider/filter-provider";
import {
  Container,
  CategoryButtonItem,
} from "./styled-components/CategoriesScroll";
import { CategoriesData } from "../constants";

const CategorisSroll = () => {
  return (
    <Container className="filter--container">
      {CategoriesData?.map((item) => {
        return <CategoryButton key={item?.id} name={item?.name} />;
      })}
    </Container>
  );
};

interface CategoryButtonProps {
  name: string;
}
const CategoryButton = ({ name }: CategoryButtonProps) => {
  const { setFilters, filters } = useFilters();

  const changeFilters = useEventCallback(() => {
    setFilters({
      ...filters,
      tag: name?.toLocaleLowerCase(),
    });
  });

  return (
    <>
      <CategoryButtonItem
        isClicked={filters?.tag === name?.toLocaleLowerCase()}
        onClick={changeFilters}
      >
        {name}
      </CategoryButtonItem>
    </>
  );
};
export default memo(CategorisSroll);
