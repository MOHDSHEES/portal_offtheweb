import DashboardLayout from "@/components/dashboardLayout";
import { AddEmployee } from "@/components/register/addEmployee";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const Employee = () => {
  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Register Employee/Intern</Typography>
            </div>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
              <AddEmployee />
            </Container>
          </Stack>
        </Container>
      </DashboardLayout>
    </div>
  );
};

export default Employee;
