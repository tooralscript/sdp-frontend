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
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import Navbar from "../components/navbar/Navbar";

import {
  totalSalesRequestList,
  resetTotalSales,
  resetComparisonTotalesales,
} from "../features/values";

import {
  operatingIncomeRequestList,
  resetOperatingIncome,
  resetComparisonOperatingIncome,
} from "../features/operatingIncome";

import {
  currentAssetsRequestList,
  resetCurrentAssets,
  resetComparisonCurrentAssets,
} from "../features/currentAssets";

import {
  currentLiabilitiesRequestsList,
  resetCurrentLiabilities,
  resetComparisonCurrentLiabilities,
} from "../features/currentLiabilities";

import {
  totalAssetsRequestList,
  resetTotalAssets,
  resetComparisonTotalAssets,
} from "../features/totalAssets";
import {
  totalEquityRequestList,
  resetTotalEquity,
  resetComparisonTotalEquity,
} from "../features/totalEquity";
import {
  retainedEarningsRequestList,
  resetRetainedEarnings,
  resetComparisonRetainedEarnings,
} from "../features/retainedEarnings";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const years = ["2022", "2023", "2024"];

export default function Compare() {
  const theme = useTheme();
  const navigate = useNavigate();
  const selectedCompany = useSelector(
    (state) => state.companies.selectedCompany
  );
  const selectedComparisonCompanies = useSelector(
    (state) => state.companies.selectedComparisonCompanies
  );
  const dispatch = useDispatch();

  const { totalSales, loading, data, comparisonTotalSales } = useSelector(
    (state) => state.values.values
  );

  const { operatingIncome, comparisonOperatingIncome } = useSelector(
    (state) => state.operatingIncome.values
  );

  const { currentAssets, comparisonCurrentAssets } = useSelector(
    (state) => state.currentAssets.values
  );
  const { currentLiabilities, comparisonCurrentLiabilities } = useSelector(
    (state) => state.currentLiabilities.values
  );
  const { totalAssets, comparisonTotalAssets } = useSelector(
    (state) => state.totalAssets.values
  );
  const { totalEquity, comparisonTotalEquity } = useSelector(
    (state) => state.totalEquity.values
  );
  const { retainedEarnings, comparisonRetainedEarnings } = useSelector(
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

  useEffect(() => {
    if (selectedComparisonCompanies) {
      dispatch(
        totalSalesRequestList({ cik: selectedComparisonCompanies?.[0]?.cik })
      ).then(() => {
        dispatch(
          totalSalesRequestList({ cik: selectedComparisonCompanies?.[1]?.cik })
        );
      });

      dispatch(
        operatingIncomeRequestList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          operatingIncomeRequestList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });

      dispatch(
        currentAssetsRequestList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          currentAssetsRequestList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });

      dispatch(
        currentLiabilitiesRequestsList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          currentLiabilitiesRequestsList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });

      dispatch(
        totalEquityRequestList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          totalEquityRequestList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });

      dispatch(
        retainedEarningsRequestList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          retainedEarningsRequestList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });

      dispatch(
        totalAssetsRequestList({
          cik: selectedComparisonCompanies?.[0]?.cik,
        })
      ).then(() => {
        dispatch(
          totalAssetsRequestList({
            cik: selectedComparisonCompanies?.[1]?.cik,
          })
        );
      });
    }

    return () => {
      dispatch(resetTotalSales());
      dispatch(resetComparisonTotalesales());
      dispatch(resetOperatingIncome());
      dispatch(resetComparisonOperatingIncome());
      dispatch(resetCurrentAssets());
      dispatch(resetComparisonCurrentAssets());
      dispatch(resetCurrentLiabilities());
      dispatch(resetComparisonCurrentLiabilities());
      dispatch(resetTotalAssets());
      dispatch(resetComparisonTotalAssets());
      dispatch(resetTotalEquity());
      dispatch(resetComparisonTotalEquity());
      dispatch(resetRetainedEarnings());
      dispatch(resetComparisonRetainedEarnings());
    };
  }, [selectedCompany, navigate]);

  // set local total sales with value
  useEffect(() => {
    setTotalSalesDisplayed(firstYear.value);
  }, [data]);

  useEffect(() => {
    if (operatingIncome) {
      setOperatingIncomeDisplayed(
        new Intl.NumberFormat("de-DE").format(operatingIncome[2]?.value)
      );
    }
  }, [operatingIncome]);

  useEffect(() => {
    if (currentAssets) {
      setCurrentAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(currentAssets[2]?.value)
      );
    }
  }, [currentAssets]);

  useEffect(() => {
    if (currentLiabilities) {
      setCurrentLiabilitiesDisplayed(
        new Intl.NumberFormat("de-DE").format(currentLiabilities[2]?.value)
      );
    }
  }, [currentLiabilities]);

  useEffect(() => {
    if (totalAssets) {
      setTotalAssetsDisplayed(
        new Intl.NumberFormat("de-DE").format(totalAssets[2]?.value)
      );
    }
  }, [totalAssets]);

  useEffect(() => {
    if (totalEquity) {
      setTotalEquityDisplayed(
        new Intl.NumberFormat("de-DE").format(totalEquity[2]?.value)
      );
    }
  }, [totalEquity]);

  useEffect(() => {
    if (retainedEarnings) {
      setRetainedEarningsDisplayed(
        new Intl.NumberFormat("de-DE").format(retainedEarnings[2]?.value)
      );
    }
  }, [retainedEarnings]);

  useEffect(() => {
    if (!selectedComparisonCompanies?.length) {
      navigate("/");
    }
  }, [selectedComparisonCompanies, navigate]);

  // Combine all data points from both series
  const allDataPoints = [
    ...currentAssets?.map((item) => item?.value || 0),
    ...currentLiabilities?.map((item) => item?.value || 0),
  ];

  // Calculate min and max values
  const minValue = Math.min(...allDataPoints);
  const maxValue = Math.max(...allDataPoints);

  // Generate dynamic tick values
  const generateTicks = (min, max, numTicks = 5) => {
    const step = (max - min) / numTicks;
    return Array.from({ length: numTicks + 1 }, (_, i) => min + i * step);
  };

  const tickValues = generateTicks(minValue, maxValue);

  // Extract data points
  const dataPointsArray = operatingIncome.map((item) => item?.value || 0);

  // Calculate min and max values
  const incomeMinValue = Math.min(...dataPointsArray);
  const incomeMaxValue = Math.max(...dataPointsArray);

  // Adjust min and max for better visualization
  const adjustedMinValue = Math.min(incomeMinValue, 0); // Ensure 0 is included if data crosses zero
  const adjustedMaxValue = Math.max(incomeMaxValue, 0); // Ensure 0 is included if data crosses zero

  // Calculate absolute max for padding
  const absoluteMax = Math.max(Math.abs(minValue), Math.abs(maxValue)) * 1.1;

  // Generate dynamic tick values
  const generateTickValues = (min, max, numTicks = 5) => {
    const step = (max - min) / numTicks;
    return Array.from({ length: numTicks + 1 }, (_, i) => min + i * step);
  };

  const tickValuesArray = generateTickValues(-absoluteMax, absoluteMax);

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container style={{ maxWidth: "1600px" }} sx={{ pt: 4, pb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          {selectedComparisonCompanies?.[0]?.name}
          {/* <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1,
            }}
          /> */}
          vs {selectedComparisonCompanies?.[1]?.name}
          {/* <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: theme.palette.error.main,
              borderRadius: 1,
            }}
          /> */}
        </Typography>

        {/* Stats Cards */}

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Current Assets
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonCurrentAssets[0]?.value,
                        comparisonCurrentAssets[1]?.value,
                        comparisonCurrentAssets[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,
                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                      // showMark: true,
                      // showValue: true,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonCurrentAssets[3]?.value,
                        comparisonCurrentAssets[4]?.value,
                        comparisonCurrentAssets[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Current Liabilities
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonCurrentLiabilities[0]?.value,
                        comparisonCurrentLiabilities[1]?.value,
                        comparisonCurrentLiabilities[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonCurrentLiabilities[3]?.value,
                        comparisonCurrentLiabilities[4]?.value,
                        comparisonCurrentLiabilities[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Total Assets
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonTotalAssets[0]?.value,
                        comparisonTotalAssets[1]?.value,
                        comparisonTotalAssets[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonTotalAssets[3]?.value,
                        comparisonTotalAssets[4]?.value,
                        comparisonTotalAssets[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Total Equity
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonTotalEquity[0]?.value,
                        comparisonTotalEquity[1]?.value,
                        comparisonTotalEquity[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonTotalEquity[3]?.value,
                        comparisonTotalEquity[4]?.value,
                        comparisonTotalEquity[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Retained Earnings
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonRetainedEarnings[0]?.value,
                        comparisonRetainedEarnings[1]?.value,
                        comparisonRetainedEarnings[2]?.value,
                      ],
                      showMark: true,
                      showValue: true,
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonRetainedEarnings[3]?.value,
                        comparisonRetainedEarnings[4]?.value,
                        comparisonRetainedEarnings[5]?.value,
                      ],
                      showMark: true,
                      showValue: true,
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Operating Income
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonOperatingIncome[0]?.value,
                        comparisonOperatingIncome[1]?.value,
                        comparisonOperatingIncome[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonOperatingIncome[3]?.value,
                        comparisonOperatingIncome[4]?.value,
                        comparisonOperatingIncome[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Total Sales
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
                      tickValues: tickValues,
                      valueFormatter: (value) => {
                        if (value >= 1e12) {
                          return `${(value / 1e12).toFixed(1)}T`;
                        }
                        if (value >= 1e9) {
                          return `${(value / 1e9).toFixed(0)}B`;
                        }
                        if (value >= 1e6) {
                          return `${(value / 1e6).toFixed(0)}M`;
                        }
                        return value.toString();
                      },
                    },
                  ]}
                  series={[
                    {
                      // data: financialData.revenue,
                      data: [
                        comparisonTotalSales[0]?.value,
                        comparisonTotalSales[1]?.value,
                        comparisonTotalSales[2]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[0]?.name}`,

                      // label: "Current Assets",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.primary.main,
                    },
                    {
                      // data: financialData.expenses,
                      data: [
                        comparisonTotalSales[3]?.value,
                        comparisonTotalSales[4]?.value,
                        comparisonTotalSales[5]?.value,
                      ],
                      label: `${selectedComparisonCompanies?.[1]?.name}`,

                      // label: "Current Liabilities",
                      valueFormatter: (value) =>
                        Intl.NumberFormat("de-DE").format(value),
                      color: theme.palette.error.main,
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
