import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardLayout from "@/components/dashboardLayout";
import { Stack } from "@mui/material";

const ComingSoon = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Coming Soon...</Typography>
          </div>

          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* <Container maxWidth="lg"> */}
          </Container>
        </Stack>
      </Container>
    </DashboardLayout>
  );
};

export default ComingSoon;
