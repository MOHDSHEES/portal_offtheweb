import { MyContext } from "@/components/context";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
// const user = {
//   avatar: "/assets/avatars/avatar-anika-visser.png",
//   city: "Los Angeles",
//   country: "USA",
//   jobTitle: "Senior Developer",
//   name: "Anika Visser",
//   timezone: "GTM-7",
// };
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 25,
  height: 25,
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
}));
export const AccountProfile = () => {
  const { user } = useContext(MyContext);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {user && user.profileImg ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar sx={{ bgcolor: "white" }}>
                  <EditIcon sx={{ color: "black", fontSize: "15px" }} />
                </SmallAvatar>
              }
            >
              <Avatar
                sx={{
                  height: 100,
                  width: 100,
                  //   bgcolor: green[500],
                }}
                alt={user && user.name ? user.name : "Profile"}
                src={user.profileImg}
              />
            </Badge>
          ) : (
            // <Avatar
            //   sx={{
            //     height: 80,
            //     mb: 2,
            //     width: 80,
            //     //   bgcolor: green[500],
            //   }}
            //   alt={user && user.name ? user.name : "Name"}
            //   src={user.profileImg}
            // />
            <Avatar
              // src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
                //   bgcolor: green[500],
              }}
            >
              {user && user.name.slice(0, 1)}
            </Avatar>
          )}
          <Typography gutterBottom variant="h5">
            {user && user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user && user.post}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user && user.jobType}
          </Typography>
          {user && user.status ? (
            <Typography color="text.secondary" variant="body2">
              Status: <span style={{ color: "green" }}>Working</span>
            </Typography>
          ) : (
            <Typography color="text.secondary" variant="body2">
              Status: <span style={{ color: "red" }}>Former</span>
            </Typography>
          )}

          {/* <Typography color="text.secondary" variant="body2">
            {user.city} {user.country}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
      <Button fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions> */}
    </Card>
  );
};
