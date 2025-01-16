// For production

// const companiesEndpoint = "/api/companies";
// export default companiesEndpoint;

// For development

// const companiesEndpoint = "http://38.242.152.181:8080/api/companies";
// export default companiesEndpoint;

// This line will dynamically change the endpoint variable based on the enviornment (dev, prod)
const companiesEndpoint = import.meta.env.VITE_COMPANIES_ENDPOINT;
export default companiesEndpoint;
