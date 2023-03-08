import { createContext } from "react";

export const initialValues = {
  page: 1,
  rowsPerPage: 10,
  tag: "",
};

export interface FilterContextType {
  filters: FilterType;
  setFilters: (values: FilterType) => void;
}

export interface FilterType {
  page: number;
  rowsPerPage: number;
  tag: string;
}

const contextInitialData = {
  filters: initialValues,
  setFilters: () => {},
};

const FilterContext = createContext<FilterContextType>(contextInitialData);

export default FilterContext;
