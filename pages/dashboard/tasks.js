import * as React from "react";
import { AccountProfile } from "@/components/dashboard/account/accountProfile";
import { AccountProfileDetails } from "@/components/dashboard/account/profileDetails";
import {
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import DashboardLayout from "@/components/dashboardLayout";
import { Tasks } from "@/components/dashboard/account/tasks";
import TaskStatsComponent from "@/components/dashboard/account/taskStats/taskStatsComponent";

export default function Task() {
  //   console.log(session);
  return (
    <>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Typography variant="h4">Tasks Analytics</Typography>
          <Stack spacing={3}>
            <div className="mt-5">
              <Tasks />
            </div>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
              <TaskStatsComponent />
            </Container>
          </Stack>
        </Container>
      </DashboardLayout>
    </>
  );
}
