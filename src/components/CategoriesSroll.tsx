import React, { memo, useCallback } from "react";
import "./css/index.css";
import {
  Container,
  CategoryButtonItem,
} from "./styled-components/CategoriesScroll";
import { Action, ActionType, State } from "../pages/utils/home";
import { useApi } from "../shell/hooks/custom-http";
import { CategoryResponse } from "../models/Category";

interface CategoryScrollProps {
  dispatch: React.Dispatch<Action>;
  state: State;
}

const CategorisSroll = ({ dispatch, state }: CategoryScrollProps) => {
  const { result: CategoriesData } = useApi<CategoryResponse>({
    url: `/videos/categories`,
    method: "get",
    onBootstrap: true,
  });

  return (
    <Container className="filter--container">
      {CategoriesData && CategoriesData?.categories?.length !== 0
        ? CategoriesData?.categories?.map((item) => {
            return (
              <CategoryButton
                dispatch={dispatch}
                state={state}
                key={item?._id}
                name={item?.name}
              />
            );
          })
        : undefined}
    </Container>
  );
};

interface CategoryButtonProps {
  name: string;
  dispatch: React.Dispatch<Action>;
  state: State;
}
const CategoryButton = ({ name, dispatch, state }: CategoryButtonProps) => {
  const changeFilters = useCallback(() => {
    if (!dispatch) return;
    dispatch({
      type: ActionType.SET_CATEGORY,
      payload: name?.toLocaleLowerCase(),
    });
    dispatch({ type: ActionType.SET_PAGE, payload: 1 });
  }, [dispatch, name]);

  return (
    <>
      <CategoryButtonItem
        key={name}
        isClicked={state?.category === name?.toLocaleLowerCase()}
        onClick={changeFilters}
      >
        {name}
      </CategoryButtonItem>
    </>
  );
};
export default memo(CategorisSroll);
