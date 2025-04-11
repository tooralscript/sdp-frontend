import axios from "axios";
import {
  companiesEndpoint,
  totalSalesEndpoint,
  operatingIncomeEndpoint,
  currentAssetsEndpoint,
  currentLiabilitiesEndpoint,
  totalAssetsEndpoint,
  totalEquityEndpoint,
  retainedEarningsEndpoint,
} from "../endpoints/endpoints";

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

export const retrieveOperatingIncome = async (params = {}) => {
  return axios.get(operatingIncomeEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveCurrentAssets = async (params = {}) => {
  return axios.get(currentAssetsEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveCurrentLiabilities = async (params = {}) => {
  return axios.get(currentLiabilitiesEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveTotalAssets = async (params = {}) => {
  return axios.get(totalAssetsEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveTotalEquity = async (params = {}) => {
  return axios.get(totalEquityEndpoint, {
    params: {
      ...params,
    },
  });
};

export const retrieveRetainedEarnings = async (params = {}) => {
  return axios.get(retainedEarningsEndpoint, {
    params: {
      ...params,
    },
  });
};
