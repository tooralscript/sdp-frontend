import React from "react";
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
} from "@mui/material";
import {
  AccountBalance,
  TrendingUp,
  AttachMoney,
  ShowChart,
} from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts";
import Navbar from "../components/navbar/Navbar";

import { totalSalesRequestList, resetTotalSales } from "../features/values";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const selectedCompany = useSelector(
    (state) => state.companies.selectedCompany
  );
  const dispatch = useDispatch();

  const { totalSales, loading } = useSelector((state) => state.values.values);

  // If no company is selected, redirect to companies page
  React.useEffect(() => {
    dispatch(totalSalesRequestList({ cik: selectedCompany?.cik }));
    if (!selectedCompany) {
      navigate("/");
    }
  }, [selectedCompany, navigate]);

  if (!selectedCompany) {
    return null;
  }

  // TODO: Add API call to fetch company-specific financial data
  const financialData = {
    revenue: [15000, 18000, 16000, 19000, 16000, 21000],
    expenses: [12000, 13000, 11000, 14000, 12000, 15000],
    stats: {
      totalRevenue: "$105,000",
      totalExpenses: "$77,000",
      netProfit: "$28,000",
      profitMargin: "26.7%",
    },
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
          {selectedCompany.name} ({selectedCompany.ticker})
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Sales"
              value={totalSales}
              icon={<AttachMoney sx={{ color: "#2196f3" }} />}
              color="#2196f3"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Expenses"
              value={financialData.stats.totalExpenses}
              icon={<AccountBalance sx={{ color: "#f44336" }} />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Net Profit"
              value={financialData.stats.netProfit}
              icon={<TrendingUp sx={{ color: "#4caf50" }} />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Profit Margin"
              value={financialData.stats.profitMargin}
              icon={<ShowChart sx={{ color: "#ff9800" }} />}
              color="#ff9800"
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Revenue vs Expenses
                </Typography>
                <LineChart
                  xAxis={[
                    {
                      data: months,
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
                      data: financialData.revenue,
                      label: "Revenue",
                      color: theme.palette.primary.main,
                    },
                    {
                      data: financialData.expenses,
                      label: "Expenses",
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
                  Monthly Profit
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      data: months,
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
                    },
                  ]}
                  series={[
                    {
                      data: financialData.revenue.map(
                        (rev, i) => rev - financialData.expenses[i]
                      ),
                      label: "Profit",
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
