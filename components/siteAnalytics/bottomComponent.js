import React, { useEffect } from "react";
import { TopUserComparisonsCard } from "./topUserComparisonsCard";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import OperatingSystemPieChart from "./operatingSystemPieChart";

const BottomComponent = ({ data, loading, dateRange }) => {
  const [activeUsers, setActiveUsers] = useState({
    value: null,
  });

  const [screenPageViews, setScreenPageViews] = useState({
    value: null,
  });

  const [sessions, setSessions] = useState({
    value: null,
  });

  const [userEngagementDuration, setUserEngagementDuration] = useState({
    value: null,
  });

  const [operatingSystem, setOperatingSystem] = useState(null);
  let flag = 1;
  useEffect(() => {
    if (data && flag) {
      flag = 0;
      filterData(data);
      filterOperatingSystem(data);
    }
  }, [data]);

  function filterOperatingSystem(data) {
    const da = data.operatingSystem.rows;
    // console.log(da);
    const updatedResultArray = da.map((entry) => [
      entry.dimensionValues[0].value,
      parseInt(entry.metricValues[0].value, 10),
    ]);
    setOperatingSystem([["Operating System", "Users"], ...updatedResultArray]);
  }

  function filterData(data) {
    const da = data.all.totals[0].metricValues;
    setActiveUsers({ value: da[0].value });
    setScreenPageViews({ value: da[4].value });
    setSessions({ value: da[7].value });
    setUserEngagementDuration({
      value: (da[9].value / 6000).toFixed(1) + "s",
    });
  }
  return (
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
                <small style={{ fontSize: "18px" }}>Traffic Source:</small>
              }
            />
            {operatingSystem && !loading ? (
              <Grid container spacing={3} sx={{ padding: "10px" }}>
                <OperatingSystemPieChart data={operatingSystem} />
                {dateRange && dateRange.startDate && (
                  <Typography variant="caption" sx={{ margin: "10px" }}>
                    <b>Note:</b> The analytics provided are from{" "}
                    {dateRange.startDate} period leading up to the{" "}
                    {dateRange.endDate ? dateRange.endDate : "Yesterday"}.
                  </Typography>
                )}
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
                  {!dateRange.startDate && "Yearly "} Users Analytics:
                </small>
              }
            />

            <Grid container spacing={3}>
              <Grid xs={6} sm={6} lg={6}>
                {activeUsers.value && !loading ? (
                  <TopUserComparisonsCard
                    title="Active Users"
                    data={activeUsers}
                    color="primary.main"
                    number={true}
                    icon={false}
                    positive={true}
                  />
                ) : (
                  <Skeleton variant="rounded" height={130} />
                )}
              </Grid>
              <Grid xs={6} sm={6} lg={6}>
                {screenPageViews.value && !loading ? (
                  <TopUserComparisonsCard
                    title="Total Views"
                    data={screenPageViews}
                    color="primary.main"
                    number={true}
                    icon={false}
                    positive={true}
                  />
                ) : (
                  <Skeleton variant="rounded" height={130} />
                )}
              </Grid>
              <Grid xs={6} sm={6} lg={6}>
                {sessions.value && !loading ? (
                  <TopUserComparisonsCard
                    title="Total User Sessions"
                    data={sessions}
                    color="primary.main"
                    number={true}
                    icon={false}
                    positive={true}
                  />
                ) : (
                  <Skeleton variant="rounded" height={130} />
                )}
              </Grid>
              <Grid xs={6} sm={6} lg={6}>
                {userEngagementDuration.value && !loading ? (
                  <TopUserComparisonsCard
                    title="Average Engagment duration"
                    data={userEngagementDuration}
                    color="primary.main"
                    number={true}
                    icon={false}
                    positive={true}
                  />
                ) : (
                  <Skeleton variant="rounded" height={130} />
                )}
              </Grid>
              {dateRange && dateRange.startDate ? (
                <Typography variant="caption" sx={{ margin: "10px" }}>
                  <b>Note:</b> The analytics provided are from{" "}
                  {dateRange.startDate} period leading up to the{" "}
                  {dateRange.endDate ? dateRange.endDate : "Yesterday"}.
                </Typography>
              ) : (
                <Typography variant="caption" sx={{ margin: "10px" }}>
                  <b>Note:</b> The analytics provided are for the twelve-month
                  period leading up to the previous month.
                </Typography>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BottomComponent;
