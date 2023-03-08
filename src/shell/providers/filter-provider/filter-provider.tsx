import { useEventCallback } from "@mui/material";
import FilterContext, {
  FilterContextType,
  FilterType,
  initialValues,
} from "./filter-context";
import React, { useState, useContext } from "react";
interface FilterProviderProps {
  children: React.ReactElement;
}
export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilteres] = useState<FilterType>(initialValues);

  const setFiltersCallFunc = useEventCallback((values: FilterType) => {
    setFilteres((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters: setFiltersCallFunc }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    new Error("Filters Provider not found");
  }

  return {
    filters: ctx?.filters,
    setFilters: ctx?.setFilters,
  };
};
