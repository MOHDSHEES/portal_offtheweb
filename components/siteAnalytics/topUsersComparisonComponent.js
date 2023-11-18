import React, { useEffect } from "react";
import { TopUserComparisonsCard } from "./topUserComparisonsCard";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
  Skeleton,
} from "@mui/material";
import { useState } from "react";

const TopUsersComparisonComponent = ({ data }) => {
  //   console.log(data);
  const [bounceRate, setBounceRate] = useState({
    value: null,
    difference: "",
  });
  const [engagementRate, setEngagementRate] = useState({
    value: null,
    difference: "",
  });
  const [screenPageViews, setScreenPageViews] = useState({
    value: null,
    difference: "",
  });

  let flag = 1;
  useEffect(() => {
    if (data && flag) {
      flag = 0;
      filterData(data);
    }
  }, [data]);

  function filterData(data) {
    const monthsData = data.rows;
    const len = data.rows.length;
    setBounceRate({
      value: monthsData[len - 2].metricValues[1].value,
      difference:
        monthsData[len - 2].metricValues[1].value -
        monthsData[len - 3].metricValues[1].value,
    });
    setEngagementRate({
      value: monthsData[len - 2].metricValues[2].value,
      difference:
        monthsData[len - 2].metricValues[2].value -
        monthsData[len - 3].metricValues[2].value,
    });
    setScreenPageViews({
      value: monthsData[len - 2].metricValues[4].value,
      difference:
        monthsData[len - 2].metricValues[4].value -
        monthsData[len - 3].metricValues[4].value,
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
      {/* <Container maxWidth="xl"> */}
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} lg={4}>
          {bounceRate.value ? (
            <TopUserComparisonsCard
              title="Bounce Rate"
              data={bounceRate}
              color="warning.main"
              positive={bounceRate.difference < 0 ? false : true}
            />
          ) : (
            <Skeleton variant="rounded" height={150} />
          )}
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          {engagementRate.value ? (
            <TopUserComparisonsCard
              title="Engagement Rate"
              data={engagementRate}
              color="success.main"
              positive={engagementRate.difference < 0 ? false : true}
            />
          ) : (
            <Skeleton variant="rounded" height={150} />
          )}
        </Grid>
        <Grid xs={12} sm={6} lg={4}>
          {screenPageViews.value ? (
            <TopUserComparisonsCard
              title="Page Views"
              data={screenPageViews}
              color="primary.main"
              number={true}
              positive={screenPageViews.difference < 0 ? false : true}
            />
          ) : (
            <Skeleton variant="rounded" height={150} />
          )}
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default TopUsersComparisonComponent;
