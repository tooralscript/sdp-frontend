// This line will dynamically change the endpoint variable based on the enviornment (dev, prod)
const companiesEndpoint = import.meta.env.VITE_COMPANIES_ENDPOINT;
const totalSalesEndpoint = import.meta.env.VITE_TOTALSALES_ENDPOINT;
const operatingIncomeEndpoint = import.meta.env.VITE_OPERATINGINCOME_ENDPOINT;
const currentAssetsEndpoint = import.meta.env.VITE_CURRENTASSETS_ENDPOINT;
const currentLiabilitiesEndpoint = import.meta.env
  .VITE_CURRENTLIABILITIES_ENDPOINT;
const totalAssetsEndpoint = import.meta.env.VITE_TOTALASSETS_ENDPOINT;
const totalEquityEndpoint = import.meta.env.VITE_TOTALEQUITY_ENDPOINT;
const retainedEarningsEndpoint = import.meta.env.VITE_RETAINEDEARNINGS_ENDPOINT;

export {
  companiesEndpoint,
  totalSalesEndpoint,
  operatingIncomeEndpoint,
  currentAssetsEndpoint,
  currentLiabilitiesEndpoint,
  totalAssetsEndpoint,
  totalEquityEndpoint,
  retainedEarningsEndpoint,
};
