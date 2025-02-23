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
} from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { companiesRequestsList, setSelectedCompany } from "../features/companies";

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

  useEffect(() => {
    dispatch(
      companiesRequestsList({
        page: page + 1,
        limit: rowsPerPage,
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
    dispatch(setSelectedCompany({
      name: company.name,
      ticker: company.ticker,
      cik: company.cik
    }));
    navigate(`/companies/${company.cik}/dashboard`);
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Companies
        </Typography>

        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "background.paper",
            backgroundImage: "none",
          }}
        >
          <TableContainer sx={{ maxHeight: "calc(100vh - 250px)" }}>
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  companies?.map((company) => (
                    <TableRow
                      hover
                      onClick={() => handleRowClick(company)}
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
                    </TableRow>
                  ))
                )}
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
          />
        </Paper>
      </Container>
    </Box>
  );
}
