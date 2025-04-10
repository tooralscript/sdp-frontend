import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AccountBalance,
  TrendingUp,
  AttachMoney,
  ShowChart,
  CurrencyExchange,
  CandlestickChart,
} from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts";
import Navbar from "../components/navbar/Navbar";

import { totalSalesRequestList, resetTotalSales } from "../features/values";
import { current } from "@reduxjs/toolkit";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const years = ["2022", "2023", "2024"];

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const selectedCompany = useSelector(
    (state) => state.companies.selectedCompany
  );
  const dispatch = useDispatch();

  const { totalSales, loading, data } = useSelector(
    (state) => state.values.values
  );

  // If no company is selected, redirect to companies page
  useEffect(() => {
    dispatch(totalSalesRequestList({ cik: selectedCompany?.cik }));
    if (!selectedCompany) {
      navigate("/");
    }
  }, [selectedCompany, navigate]);

  if (!selectedCompany) {
    return null;
  }

  const comparisonData = {
    currentAssets: [190867000000, 90867000000, 120867000000],
    currentLiabilities: [110867000000, 80867000000, 70867000000],
  };

  const visualBarData = {
    operatingIncome: [168593000000, 13859300000, 198593000000],
    // operatingIncome: [6800, 3800, 9800],
  };

  const firstYear = useMemo(() => {
    if (!data?.length) {
      return { year: null, value: null }; // Default values
    }
    return {
      year: data[0]?.year,
      value: new Intl.NumberFormat("de-DE").format(data[0]?.value),
    };
  }, [data]);

  const secondYear = useMemo(() => {
    if (!data?.length) {
      return { year: null, value: null }; // Default values
    }
    return {
      year: data[0]?.year,
      value: new Intl.NumberFormat("de-DE").format(data[0]?.value),
    };
  }, [data]);

  const thirdYear = useMemo(() => {
    if (!data?.length) {
      return { year: null, value: null }; // Default values
    }
    return {
      year: data[0]?.year,
      value: new Intl.NumberFormat("de-DE").format(data[0]?.value),
    };
  }, [data]);

  const handleYearChange = () => {};

  const StatCard = ({ title, value, icon, color }) => {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ width: "auto" }}>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  width: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: `${color}15`,
                    borderRadius: "50%",
                    padding: 1,
                    display: "flex",
                  }}
                >
                  {icon}
                </Box>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container style={{ maxWidth: "1600px" }} sx={{ pt: 4, pb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          {selectedCompany.name} ({selectedCompany.ticker})
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Current Assets"
              // value={financialData.stats.totalExpenses}
              value="$190.867.000.000"
              icon={<CandlestickChart sx={{ color: "#4caf50" }} />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Current Liabilities"
              // value={financialData.stats.netProfit}
              value="$179.431.000.000"
              icon={<TrendingUp sx={{ color: "#4caf50" }} />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Assets"
              // value={financialData.stats.profitMargin}
              value="$624.894.000.000"
              icon={<ShowChart sx={{ color: "#ff9800" }} />}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Equity"
              // value={financialData.stats.totalExpenses}
              value="$285.970.000.000"
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Retained Earnings"
              // value={financialData.stats.totalExpenses}
              value="$172.866.000.000"
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Operating Income"
              // value={financialData.stats.totalExpenses}
              value="$68.593.000.000"
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Sales"
              value={`$${firstYear.value}`}
              icon={<CurrencyExchange sx={{ color: "#2196f3" }} />}
              color="#2196f3"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Selected Year
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ border: "1px solid red", height: "100%" }}
                    label="Age"
                    onChange={handleYearChange}
                    defaultValue={2022}
                  >
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Current Assets vs Current Liabilities
                </Typography>
                <LineChart
                  xAxis={[
                    {
                      // data: months,
                      data: years,
                      scaleType: "band",
                      tickLabelStyle: {
                        fill: theme.palette.text.secondary,
                      },
                    },
                  ]}
                  yAxis={[
                    {
                      tickLabelStyle: {
                        fill: theme.palette.text.secondary,
                      },
                      tickValues: [0, 200e9, 400e9, 600e9, 800e9, 1000e9],
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        return `${(value / 1e9).toFixed(0)}B`;
                      },
                    },
                  ]}
                  sx={{
                    ".MuiLineElement-root": {
                      strokeWidth: 2,
                    },
                    ".MuiMarkElement-root": {
                      stroke: "none",
                    },
                  }}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: comparisonData.currentAssets,
                      label: "Current Assets",
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: comparisonData.currentLiabilities,
                      label: "Current Liabilities",
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Operating Income Trend
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      data: years,
                      scaleType: "band",
                      tickLabelStyle: {
                        fill: theme.palette.text.secondary,
                      },
                    },
                  ]}
                  yAxis={[
                    {
                      tickLabelStyle: {
                        fill: theme.palette.text.secondary,
                      },
                      tickValues: [0, 200e9, 400e9, 600e9, 800e9, 1000e9],
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        return `${(value / 1e9).toFixed(0)}B`;
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue.map(
                      //   (rev, i) => rev - financialData.expenses[i]
                      // ),
                      data: visualBarData.operatingIncome,
                      // label: "Operating Income",
                      color: theme.palette.success.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
