import axios from "axios";
import companiesEndpoint from "../endpoints/endpoints";

export const retrieveCompanies = async (params = {}) => {
  return axios.get(companiesEndpoint, {
    params: {
      ...params,
    },
  });
};
