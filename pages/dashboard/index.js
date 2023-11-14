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
import { useSession } from "next-auth/react";
import { Tasks } from "@/components/dashboard/account/tasks";
import axios from "axios";
import TaskStatsComponent from "@/components/dashboard/account/taskStats/taskStatsComponent";

export default function Dashboard() {
  // const { data: session } = useSession();
  // async function test() {
  //   const { data } = await axios.post("/api/google");
  //   console.log(data);
  // }
  return (
    <>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Account</Typography>
              {/* <button onClick={test} className="btn btn-primary">
                test
              </button> */}
            </div>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <div style={{ marginBottom: "20px" }}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6} lg={4}>
                    <AccountProfile />
                  </Grid>
                  <Grid xs={12} md={6} lg={8}>
                    <AccountProfileDetails />
                  </Grid>
                </Grid>
              </div>
              {/* <TaskStatsComponent /> */}
              {/* <div>
                <Tasks />
              </div> */}
            </Container>
          </Stack>
        </Container>
      </DashboardLayout>
    </>
  );
}
