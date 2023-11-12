// import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
// import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
// import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const TaskStats = (props) => {
  const { task, sx } = props;

  return (
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
              Task: {task.taskNo}
            </Typography>
            {/* <Typography variant="h4">{value}</Typography> */}
          </Stack>
          {/* <SvgIcon> */}
          {/* <Avatar sx={{ bgcolor: "error.main" }}>N</Avatar> */}
          {/* </SvgIcon> */}
        </Stack>

        {/* <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <SvgIcon
              // color={positive ? "success" : "error"}
              fontSize="small"
            ></SvgIcon>
            <Typography
              // color={positive ? "success.main" : "error.main"}
              variant="body2"
            >
              4%
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="caption">
            Since last month
          </Typography>
        </Stack> */}

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              color="secondary"
              value={task.score ? task.score * 10 : 0}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {task.score ? task.score : "NA"}
            </Typography>
          </Box>
        </Box>

        {/* <Box sx={{ mt: 3 }}>
          <LinearProgress value={30} variant="determinate" />
        </Box> */}
      </CardContent>
    </Card>
  );
};
