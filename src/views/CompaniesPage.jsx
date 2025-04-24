import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  useTheme,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/navbar/Navbar";
import {
  companiesRequestsList,
  setSelectedCompany,
  setSelectedComparisonCompanies,
  removeSelectedComparisonCompany,
  setGlobalSearchValue,
} from "../features/companies";

const columns = [
  { id: "name", label: "Company Name", minWidth: 200 },
  { id: "ticker", label: "Ticker", minWidth: 100 },
  { id: "cik", label: "CIK", minWidth: 120 },
];

export default function CompaniesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items: companies,
    loading,
    pagination,
    globalSearchValue,
  } = useSelector((state) => state.companies.companies);
  const { selectedComparisonCompanies } = useSelector(
    (state) => state.companies
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!(globalSearchValue && globalSearchValue !== searchQuery)) {
      dispatch(
        companiesRequestsList({
          page: page + 1,
          limit: rowsPerPage,
          search: searchQuery,
        })
      );
    }
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (company) => {
    // Store selected company data before navigation
    dispatch(
      setSelectedCompany({
        name: company.name,
        ticker: company.ticker,
        cik: company.cik,
      })
    );
    navigate(`/companies/${company.cik}/dashboard?search=${searchQuery}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page when searching
    dispatch(setGlobalSearchValue(searchQuery));
    dispatch(
      companiesRequestsList({
        page: 1,
        limit: rowsPerPage,
        search: searchQuery,
      })
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCheckboxClick = (event, company) => {
    event.stopPropagation();

    if (isCompanyChecked(company?.cik)) {
      dispatch(removeSelectedComparisonCompany(company.cik));
    }

    if (selectedComparisonCompanies[0]?.cik === company.cik) {
      return;
    }

    if (selectedComparisonCompanies[1]?.cik === company.cik) {
      return;
    }

    dispatch(setSelectedComparisonCompanies(company));
  };

  const isCompanyChecked = (cik) => {
    if (selectedComparisonCompanies.length >= 1) {
      if (selectedComparisonCompanies[0]?.cik === cik) {
        return true;
      } else if (selectedComparisonCompanies[1]?.cik === cik) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const isCompanyDisabled = (cik) => {
    if (selectedComparisonCompanies.length === 2) {
      if (selectedComparisonCompanies[0].cik !== cik) {
        return true;
      } else if (selectedComparisonCompanies[1]?.cik !== cik) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const handleCompare = () => {
    navigate(
      `/companies/${selectedComparisonCompanies[0].cik}/${selectedComparisonCompanies[1].cik}/compare`
    );
  };

  useEffect(() => {
    if (globalSearchValue && globalSearchValue !== searchQuery) {
      setSearchQuery(globalSearchValue);
      dispatch(
        companiesRequestsList({
          page: 1,
          limit: rowsPerPage,
          search: globalSearchValue,
        })
      );
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 2, height: "56px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ minWidth: "120px", height: "56px" }}
            >
              Search
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              height: "56px",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "text.primary",
                flex: 1,
                display: "flex",
                alignItems: "center",
                height: "56px",
              }}
            >
              Companies
            </Typography>
            <Button
              variant="contained"
              disabled={selectedComparisonCompanies.length !== 2}
              onClick={handleCompare}
              sx={{ minWidth: "120px", height: "56px" }}
            >
              Compare
            </Button>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            overflow: "auto",
            minHeight: 0, // This is important for flex child to scroll
            position: "relative", // Added for absolute positioning of spinner
          }}
        >
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          ) : null}
          <Table checkboxSelection stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      backgroundColor: "background.paper",
                      fontWeight: "bold",
                      color: "text.primary",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: "background.paper",
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                companies?.map((company) => {
                  return (
                    <TableRow
                      hover
                      onClick={(e) => {
                        const selection = window.getSelection();
                        if (selection?.toString().length > 0) {
                          return;
                        }
                        handleRowClick(company);
                      }}
                      key={company.cik}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{ color: "text.primary" }}
                        >
                          {company[column.id]}
                        </TableCell>
                      ))}
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isCompanyChecked(company?.cik)}
                          onClick={(e) => handleCheckboxClick(e, company)}
                          disabled={
                            isCompanyDisabled(company?.cik) &&
                            !isCompanyChecked(company?.cik)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography sx={{}}>
            {selectedComparisonCompanies?.length >= 1 && (
              <span>
                Selected companies for comparison:{" "}
                {selectedComparisonCompanies?.[0]?.name}
                {selectedComparisonCompanies?.[1] &&
                  ` and ${selectedComparisonCompanies?.[1]?.name}`}
              </span>
            )}
          </Typography>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pagination?.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: "text.primary" }}
            disabled={loading}
          />
        </Box>
      </Container>
    </Box>
  );
}
