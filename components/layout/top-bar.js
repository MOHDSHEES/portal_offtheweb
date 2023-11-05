import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, IconButton, Stack, Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MyContext } from "../context";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const router = useRouter();
  const { onNavOpen } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const { user } = useContext(MyContext);
  //   const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "#edf1f7",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                {/* <SvgIcon fontSize="small"> */}

                <MenuIcon />
                {/* </IconButton> */}
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">U</SvgIcon>
              </IconButton>
            </Tooltip> */}

            <Tooltip
              onClick={() => router.push("/dashboard")}
              title="Dashboard"
            >
              <IconButton>
                {/* <Badge badgeContent={4} color="success" variant="dot"> */}
                {/* <SvgIcon fontSize="small"> */}
                <Avatar sx={{ width: 40, height: 40, bgcolor: green[500] }}>
                  {user && user.name ? user.name.slice(0, 1) : "M"}
                </Avatar>
                {/* </SvgIcon> */}
                {/* </Badge> */}
              </IconButton>
            </Tooltip>
            {/* <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            /> */}
          </Stack>
        </Stack>
      </Box>
      {/* <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      /> */}
    </>
  );
};
