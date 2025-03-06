import { useQuery } from "@tanstack/react-query";
import { getUserOptions } from "../api";
import { Option } from "../api/types";

export const USERS_OPTIONS_QUERY_KEY = ["userOptions"];

export function useUserOptions() {
  const { data: userOptions, isLoading: userOptionsAreLoading } = useQuery<
    Option[]
  >({
    queryKey: USERS_OPTIONS_QUERY_KEY,
    queryFn: getUserOptions,
  });
  return { userOptions, userOptionsAreLoading };
}
