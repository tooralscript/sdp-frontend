import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/navbar/Navbar";
import {
  companiesRequestsList,
  setSelectedCompany,
} from "../features/companies";

const columns = [
  { id: "name", label: "Company Name", minWidth: 200 },
  { id: "ticker", label: "Ticker", minWidth: 100 },
  { id: "cik", label: "CIK", minWidth: 120 },
];

export default function CompaniesPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items: companies,
    loading,
    pagination,
  } = useSelector((state) => state.companies.companies);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      companiesRequestsList({
        page: page + 1,
        limit: rowsPerPage,
        search: searchQuery,
      })
    );
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
    navigate(`/companies/${company.cik}/dashboard`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page when searching
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
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
              sx={{ minWidth: "120px" }}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, color: "text.primary" }}
        >
          Companies
        </Typography>
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
          <Table stickyHeader>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                companies?.map((company) => (
                  <TableRow
                    hover
                    onClick={(e) => {
                      // Check if the user is selecting text
                      const selection = window.getSelection();
                      if (selection?.toString().length > 0) {
                        return; // Skip the onClick logic if text is being selected
                      }
                      // e.stopPropagation();
                      // e.preventDefault();
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
                      <TableCell key={column.id} sx={{ color: "text.primary" }}>
                        {company[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Container>
    </Box>
  );
}
