import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TaskStats } from "./taskStats";
import { TaskAnalysis } from "./taskAnalysis";
import { MyContext } from "@/components/context";
import { getWeekDatesFromDate } from "@/components/functions/getweekdays";

const TaskStatsComponent = () => {
  const { user } = useContext(MyContext);
  const [WeekDates, setWeekDates] = useState(null);
  useEffect(() => {
    if (user && user.tasks.length)
      setWeekDates(getWeekDatesFromDate(user.tasks[0].assignDate));
  }, [user]);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}>
            <CardHeader
              title={<small>Weekly Analysis:</small>}
              action={
                WeekDates &&
                WeekDates.length !== 0 && (
                  <Typography sx={{ marginTop: "7px" }}>
                    <small>Ends: {WeekDates[WeekDates.length - 1]}</small>
                  </Typography>
                )
              }
            />

            {/* <Container maxWidth="xl"> */}
            <Grid container spacing={3}>
              <TaskAnalysis user={user} sx={{ height: "100%" }} />
            </Grid>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}>
            <CardHeader title={<small>Score:</small>} />
            {/* <Container maxWidth="xl"> */}
            <div style={{ marginBottom: "3px" }}>
              <Typography variant="caption">
                <span style={{ color: "red" }}>*</span>NA- Not Rated yet.
              </Typography>
            </div>
            <Grid container spacing={3}>
              {WeekDates ? (
                user.tasks.map((task, idx) => {
                  return (
                    WeekDates.includes(task.assignDate) && (
                      <Grid
                        xs={12}
                        key={idx}
                        sm={6}
                        lg={12}
                        className="mb-3"
                        //   sx={{ margin: "5px" }}
                      >
                        <TaskStats task={task} sx={{ height: "100%" }} />
                      </Grid>
                    )
                  );
                })
              ) : (
                <div style={{ margin: "15px 5px" }}>
                  <Typography variant="caption">
                    There are currently no tasks assigned to you. All your
                    upcoming task's score will be showcased here.
                  </Typography>
                </div>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default TaskStatsComponent;
