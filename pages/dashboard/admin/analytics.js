import DashboardLayout from "@/components/dashboardLayout";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardHeader,
  Skeleton,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import GeoChart from "@/components/siteAnalytics/geoChart";
import UserComparisonMonthly from "@/components/siteAnalytics/userComparisonMonthly";
import TopUsersComparisonComponent from "@/components/siteAnalytics/topUsersComparisonComponent";
import BottomComponent from "@/components/siteAnalytics/bottomComponent";
import CustomAnalytics from "@/components/modal/customAnalytics";

const Analytics = () => {
  const [mapData, setMapData] = useState(null);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userComparisonData, setUserComparisonData] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: "",
  });
  function filterMapData(data) {
    const updatedResultArray = data.map((entry) => [
      entry.dimensionValues[0].value,
      parseInt(entry.metricValues[8].value, 10),
    ]);

    setMapData([["Country", "Total User"], ...updatedResultArray]);
  }

  function filterUserComparisonData(data) {
    const updatedResultArray = data.map((entry) => [
      entry.dimensionValues[0].value,
      parseInt(entry.metricValues[0].value, 10),
      parseInt(entry.metricValues[3].value, 10),
      parseInt(entry.metricValues[8].value, 10),
    ]);

    setUserComparisonData([
      ["Months", "Active Users", "New Users", "Total Users"],
      ...updatedResultArray,
    ]);
  }
  async function getData() {
    setLoading(true);
    const { data } = await axios.post("/api/google", {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    // console.log(data);

    setData(data);
    filterMapData(data.all.rows);
    filterUserComparisonData(data.months.rows);
    setLoading(false);
  }
  let flag = 1;
  useEffect(() => {
    if (!mapData && flag) {
      flag = 0;
      getData();
    }
  }, [mapData]);

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <CardHeader
            title={<Typography variant="h4">Site Analytics</Typography>}
            action={
              <Button variant="contained" onClick={() => setShow(true)}>
                Filter
              </Button>
            }
          />
        </Stack>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
          <TopUsersComparisonComponent data={data && data.months} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 3,
            }}
          >
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={6}>
                <Card sx={{ p: 2 }}>
                  <CardHeader
                    title={
                      <small style={{ fontSize: "18px" }}>Total Users:</small>
                    }
                  />
                  {mapData && !loading ? (
                    <Grid container spacing={3} sx={{ padding: "10px" }}>
                      <GeoChart mapData={mapData} />
                    </Grid>
                  ) : (
                    <Skeleton variant="rounded" height={250} />
                  )}
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={6}>
                <Card sx={{ p: 2 }}>
                  <CardHeader
                    title={
                      <small style={{ fontSize: "18px" }}>
                        Monthly Users Analytics:
                      </small>
                    }
                  />
                  {userComparisonData ? (
                    <Grid container spacing={3} sx={{ padding: "10px" }}>
                      <UserComparisonMonthly data={userComparisonData} />
                      <Typography variant="caption" sx={{ margin: "10px" }}>
                        <b>Note:</b> Numerical Representation of Months on
                        X-axis corresponds to the Months of Current Year.
                      </Typography>
                    </Grid>
                  ) : (
                    <Skeleton variant="rounded" height={250} />
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
          <BottomComponent
            dateRange={dateRange}
            data={data}
            loading={loading}
          />
        </Container>
      </Container>
      <CustomAnalytics
        show={show}
        setShow={setShow}
        dateRange={dateRange}
        setDateRange={setDateRange}
        getData={getData}
      />
    </DashboardLayout>
  );
};

export default Analytics;
