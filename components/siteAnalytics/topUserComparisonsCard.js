// import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
// import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
// import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const TopUserComparisonsCard = (props) => {
  const {
    title,
    data,
    positive = false,
    color = "primary.main",
    icon = true,
    sx,
    number = false,
  } = props;

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
              {title}
            </Typography>
            <Typography variant="h4">
              {number ? data.value : `${(data.value * 100).toFixed(1)}%`}
            </Typography>
          </Stack>
          {icon && (
            <Avatar
              sx={{
                backgroundColor: color,
                height: 45,
                width: 45,
              }}
            >
              <SvgIcon>
                <TrendingUpIcon />
              </SvgIcon>
            </Avatar>
          )}
        </Stack>
        {data.difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {number
                  ? data.difference
                  : `${(data.difference * 100).toFixed(1)}%`}
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
