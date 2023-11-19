// import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
// import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
// import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Unstable_Grid2 as Grid,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export const TaskAnalysis = (props) => {
  const { difference, positive = false, sx, user } = props;
  return (
    <>
      <Grid
        xs={12}
        sm={6}
        lg={6}
        className="mb-3"
        //   sx={{ margin: "5px" }}
      >
        <Card sx={sx}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  This Week
                </Typography>

                {user && (
                  <>
                    {user.score.weekly >= 7 ? (
                      <Typography sx={{ color: "green" }} variant="h4">
                        Good
                      </Typography>
                    ) : user.score.weekly > 4 ? (
                      <Typography sx={{ color: "#eed202" }} variant="h6">
                        Needs Improvement
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "red" }} variant="h4">
                        Poor
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
            <div style={{ textAlign: "center" }} className="mt-3">
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                {user && (
                  <CircularProgress
                    size={60}
                    sx={{
                      color: `${
                        user.score.weekly >= 7
                          ? "green"
                          : user.score.weekly > 4
                          ? "#eed202"
                          : "red"
                      }`,
                    }}
                    variant="determinate"
                    value={user && user.score.weekly * 10}
                  />
                )}
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {user && user.score.weekly}
                  </Typography>
                </Box>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={6}
        className="mb-3"
        //   sx={{ margin: "5px" }}
      >
        <Card sx={sx}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Previous Week
                </Typography>

                {user && (
                  <>
                    {user.score.preWeek < 0 ? (
                      <Typography sx={{ color: "green" }} variant="h4">
                        NA
                      </Typography>
                    ) : user.score.preWeek >= 7 ? (
                      <Typography sx={{ color: "green" }} variant="h4">
                        Good
                      </Typography>
                    ) : user.score.preWeek > 4 ? (
                      <Typography sx={{ color: "#eed202" }} variant="h6">
                        Needs Improvement
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "red" }} variant="h4">
                        Poor
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
            <div style={{ textAlign: "center" }} className="mt-3">
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                {user && (
                  <CircularProgress
                    size={60}
                    sx={{
                      color: `${
                        user.score.preWeek >= 7 || user.score.preWeek < 0
                          ? "green"
                          : user.score.preWeek > 4
                          ? "#eed202"
                          : "red"
                      }`,
                    }}
                    variant="determinate"
                    value={
                      user && user.score.preWeek < 0
                        ? 100
                        : user.score.preWeek * 10
                    }
                  />
                )}
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {user &&
                      (user.score.preWeek < 0 ? "NA" : user.score.preWeek)}
                  </Typography>
                </Box>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {user && (
        <Typography variant="body2" sx={{ margin: "10px" }}>
          {user.score.preWeek >= 7 || user.score.preWeek < 0
            ? "Congratulations! Your performance has been exceptional. Keep up the great work!"
            : user.score.preWeek > 4
            ? "Your performance has been noted, and there is room for improvement. Let's work together to enhance your skills and achieve even better results."
            : "We regret to inform you that your performance has fallen below expectations. Immediate improvement is crucial to your continued role within the organization."}
        </Typography>
      )}
    </>
  );
};
