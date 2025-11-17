import { useContext } from "react";
import { ApiContext } from "./App";

export const useApi = () => {
  const { api } = useContext(ApiContext);

  // wrapper around fetch/axios
  const request = (endpoint, options = {}) => {
    return fetch(`${api}${endpoint}`, options);
  };

  return { request, api };
};
