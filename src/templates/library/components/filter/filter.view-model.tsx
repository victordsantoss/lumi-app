import { useFilterModel } from "./filter.model";
import { FilterView } from "./filter.view";


export const FilterViewModel = () => {
  const methods = useFilterModel();
  return (
    <FilterView
      {...methods}
    />
  );
};