import categoryService from "../services/categoryService";
import { useQuery } from "react-query";

export const useGetAllCategories = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    "categories",
    () =>
      categoryService
        .getAll()
        .then((res) => res.data.data)
        .catch((err) => err.message)
  );

  return { isLoading, data, isError, error, refetch };
};
