// This line will dynamically change the endpoint variable based on the enviornment (dev, prod)
const companiesEndpoint = import.meta.env.VITE_COMPANIES_ENDPOINT;
export default companiesEndpoint;
const totalSalesEndpoint = import.meta.env.VITE_TOTALSALES_ENDPOINT;
export { totalSalesEndpoint, companiesEndpoint };
