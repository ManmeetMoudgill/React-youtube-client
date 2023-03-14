import React, { memo, useCallback } from "react";
import "./css/index.css";
import {
  Container,
  CategoryButtonItem,
} from "./styled-components/CategoriesScroll";
import { CategoriesData } from "../constants";
import { Action, ActionType, State } from "../pages/Home";

interface CategoryScrollProps {
  dispatch: React.Dispatch<Action>;
  state: State;
}

const CategorisSroll = ({ dispatch, state }: CategoryScrollProps) => {
  return (
    <Container className="filter--container">
      {CategoriesData?.map((item) => {
        return (
          <CategoryButton
            dispatch={dispatch}
            state={state}
            key={item?.id}
            name={item?.name}
          />
        );
      })}
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
        isClicked={state?.category === name?.toLocaleLowerCase()}
        onClick={changeFilters}
      >
        {name}
      </CategoryButtonItem>
    </>
  );
};
export default memo(CategorisSroll);
