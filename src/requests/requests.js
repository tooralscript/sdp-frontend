import axios from "axios";
import { companiesEndpoint } from "../endpoints/endpoints";
import { totalSalesEndpoint } from "../endpoints/endpoints";

export const retrieveCompanies = async (params = {}) => {
  return axios.get(companiesEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveTotalSales = async (params = {}) => {
  return axios.get(totalSalesEndpoint, {
    params: {
      ...params,
    },
  });
};
