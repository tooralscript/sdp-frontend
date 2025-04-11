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

import {
  operatingIncomeRequestList,
  resetOperatingIncome,
} from "../features/operatingIncome";

import {
  currentAssetsRequestList,
  resetCurrentAssets,
} from "../features/currentAssets";

import {
  currentLiabilitiesRequestsList,
  resetCurrentLiabilities,
} from "../features/currentLiabilities";

import {
  totalAssetsRequestList,
  resetTotalAssets,
} from "../features/totalAssets";
import {
  totalEquityRequestList,
  resetTotalEquity,
} from "../features/totalEquity";
import {
  retainedEarningsRequestList,
  resetRetainedEarnings,
} from "../features/retainedEarnings";

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

  const { operatingIncome } = useSelector(
    (state) => state.operatingIncome.values
  );

  const { currentAssets } = useSelector((state) => state.currentAssets.values);
  const { currentLiabilities } = useSelector(
    (state) => state.currentLiabilities.values
  );
  const { totalAssets } = useSelector((state) => state.totalAssets.values);
  const { totalEquity } = useSelector((state) => state.totalEquity.values);
  const { retainedEarnings } = useSelector(
    (state) => state.retainedEarnings.values
  );

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
      year: data[1]?.year,
      value: new Intl.NumberFormat("de-DE").format(data[1]?.value),
    };
  }, [data]);

  const thirdYear = useMemo(() => {
    if (!data?.length) {
      return { year: null, value: null }; // Default values
    }
    return {
      year: data[2]?.year,
      value: new Intl.NumberFormat("de-DE").format(data[2]?.value),
    };
  }, [data]);

  const [totalSalesDisplayed, setTotalSalesDisplayed] = React.useState();
  const [operatingIncomeDisplayed, setOperatingIncomeDisplayed] =
    React.useState();
  const [currentAssetsDisplayed, setCurrentAssetsDisplayed] = React.useState();
  const [currentLiabilitiesDisplayed, setCurrentLiabilitiesDisplayed] =
    React.useState();
  const [totalAssetsDisplayed, setTotalAssetsDisplayed] = React.useState();
  const [totalEquityDisplayed, setTotalEquityDisplayed] = React.useState();
  const [retainedEarningsDisplayed, setRetainedEarningsDisplayed] =
    React.useState();

  // If no company is selected, redirect to companies page
  useEffect(() => {
    dispatch(totalSalesRequestList({ cik: selectedCompany?.cik }));
    dispatch(operatingIncomeRequestList({ cik: selectedCompany?.cik }));
    dispatch(currentAssetsRequestList({ cik: selectedCompany?.cik }));
    dispatch(currentLiabilitiesRequestsList({ cik: selectedCompany?.cik }));
    dispatch(totalAssetsRequestList({ cik: selectedCompany?.cik }));
    dispatch(totalEquityRequestList({ cik: selectedCompany?.cik }));
    dispatch(retainedEarningsRequestList({ cik: selectedCompany?.cik }));

    if (!selectedCompany) {
      navigate("/");
    }
  }, [selectedCompany, navigate]);

  if (!selectedCompany) {
    return null;
  }

  // set local total sales with value
  useEffect(() => {
    setTotalSalesDisplayed(firstYear.value);
  }, [data]);

  useEffect(() => {
    if (operatingIncome) {
      setOperatingIncomeDisplayed(
        new Intl.NumberFormat("de-DE").format(operatingIncome[0]?.value)
      );
    }
  }, [operatingIncome]);

  useEffect(() => {
    if (currentAssets) {
      setCurrentAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(currentAssets[0]?.value)
      );
    }
  }, [currentAssets]);

  useEffect(() => {
    if (currentLiabilities) {
      setCurrentLiabilitiesDisplayed(
        new Intl.NumberFormat("de-DE").format(currentLiabilities[0]?.value)
      );
    }
  }, [currentLiabilities]);

  useEffect(() => {
    if (totalAssets) {
      setTotalAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(totalAssets[0]?.value)
      );
    }
  }, [totalAssets]);

  useEffect(() => {
    if (totalEquity) {
      setTotalEquityDisplayed(
        new Intl.NumberFormat("de-DE").format(totalEquity[0]?.value)
      );
    }
  }, [totalEquity]);

  useEffect(() => {
    if (retainedEarnings) {
      setRetainedEarningsDisplayed(
        new Intl.NumberFormat("de-DE").format(retainedEarnings[0]?.value)
      );
    }
  }, [retainedEarnings]);

  const comparisonData = {
    currentAssets: [190867000000, 90867000000, 120867000000],
    currentLiabilities: [110867000000, 80867000000, 70867000000],
  };

  const visualBarData = {
    operatingIncome: [168593000000, 13859300000, 198593000000],
    // operatingIncome: [6800, 3800, 9800],
  };

  const handleYearChange = (year) => {
    console.log(year);
    if (year === 2022) {
      setTotalSalesDisplayed(firstYear.value);
      setOperatingIncomeDisplayed(
        new Intl.NumberFormat("de-DE").format(operatingIncome[0]?.value)
      );
      setCurrentAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(currentAssets[0]?.value)
      );
      setCurrentLiabilitiesDisplayed(
        new Intl.NumberFormat("de-DE").format(currentLiabilities[0]?.value)
      );
      setTotalAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(totalAssets[0]?.value)
      );
      setTotalEquityDisplayed(
        new Intl.NumberFormat("de-DE").format(totalEquity[0]?.value)
      );
      setRetainedEarningsDisplayed(
        new Intl.NumberFormat("de-DE").format(retainedEarnings[0]?.value)
      );
    } else if (year === 2023) {
      setTotalSalesDisplayed(secondYear.value);
      setOperatingIncomeDisplayed(
        new Intl.NumberFormat("de-DE").format(operatingIncome[1]?.value)
      );
      setCurrentAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(currentAssets[1]?.value)
      );
      setCurrentLiabilitiesDisplayed(
        new Intl.NumberFormat("de-DE").format(currentLiabilities[1]?.value)
      );
      setTotalAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(totalAssets[1]?.value)
      );
      setTotalEquityDisplayed(
        new Intl.NumberFormat("de-DE").format(totalEquity[1]?.value)
      );
      setRetainedEarningsDisplayed(
        new Intl.NumberFormat("de-DE").format(retainedEarnings[1]?.value)
      );
    } else {
      setTotalSalesDisplayed(thirdYear.value);
      setOperatingIncomeDisplayed(
        new Intl.NumberFormat("de-DE").format(operatingIncome[2]?.value)
      );
      setCurrentAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(currentAssets[2]?.value)
      );
      setCurrentLiabilitiesDisplayed(
        new Intl.NumberFormat("de-DE").format(currentLiabilities[2]?.value)
      );
      setTotalAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(totalAssets[2]?.value)
      );
      setTotalEquityDisplayed(
        new Intl.NumberFormat("de-DE").format(totalEquity[2]?.value)
      );
      setRetainedEarningsDisplayed(
        new Intl.NumberFormat("de-DE").format(retainedEarnings[2]?.value)
      );
    }
  };

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
              value={`$ ${currentAssetsDisplayed}`}
              icon={<CandlestickChart sx={{ color: "#4caf50" }} />}
              color="#4caf50"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Current Liabilities"
              // value={financialData.stats.netProfit}
              value={`$ ${currentLiabilitiesDisplayed}`}
              icon={<TrendingUp sx={{ color: "#4caf50" }} />}
              color="#4caf50"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Assets"
              // value={financialData.stats.profitMargin}
              value={`$ ${totalAssetsDisplayed}`}
              icon={<ShowChart sx={{ color: "#ff9800" }} />}
              color="#ff9800"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Equity"
              // value={financialData.stats.totalExpenses}
              value={`$ ${totalEquityDisplayed}`}
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Retained Earnings"
              // value={financialData.stats.totalExpenses}
              value={`$ ${retainedEarningsDisplayed}`}
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Operating Income"
              // value={financialData.stats.totalExpenses}
              value={`$ ${operatingIncomeDisplayed}`}
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Sales"
              value={`$ ${totalSalesDisplayed}`}
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
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ height: "32px", margin: "0px" }}
                    onChange={(e) => handleYearChange(e.target.value)}
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
                      data: [
                        currentAssets[0]?.value,
                        currentAssets[1]?.value,
                        currentAssets[2]?.value,
                      ],
                      label: "Current Assets",
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        currentLiabilities[0]?.value,
                        currentLiabilities[1]?.value,
                        currentLiabilities[2]?.value,
                      ],
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
                      data: [
                        operatingIncome[0]?.value,
                        operatingIncome[1]?.value,
                        operatingIncome[2]?.value,
                      ],
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
