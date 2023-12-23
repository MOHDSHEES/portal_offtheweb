import NextLink from "next/link";
import {
  Box,
  ButtonBase,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideNavItem from "./side-nav-item.js";
import { usePathname } from "next/navigation.js";
import { blogsItems, items, jobsItems } from "./listItems.js";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import BackdropComponent from "../UI-component/backdrop.js";
import { useContext, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MyContext } from "../context.js";

export default function SideBar(props) {
  const { open, onClose } = props;
  const { user } = useContext(MyContext);
  const pathname = usePathname();
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const [openBackdrop, setOpenBackdrop] = useState(false);
  function logout() {
    setOpenBackdrop(true);
    signOut();
    // setOpenBackdrop(false);
  }

  const content = (
    <Box
      className="scrollbarT"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          component={NextLink}
          href="/"
          sx={{
            display: "inline-flex",
            height: 32,
            width: 32,
          }}
        >
          OFFTHEWEB
        </Box>
        {/* <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="inherit" variant="subtitle1">
              Devias
            </Typography>
            <Typography color="neutral.400" variant="body2">
              Production
            </Typography>
          </div>
        </Box> */}
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {user &&
            items.map((item) => {
              const active = item.path ? pathname === item.path : false;
              if (
                (item.adminLevel && item.adminLevel >= user.adminLevel) ||
                user.employeeId === "1885816702"
              ) {
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              } else return null;
            })}
        </Stack>
      </Box>

      {user &&
        user.adminLevel &&
        (user.adminLevel === 1 || user.employeeId === "1885816702") && (
          <>
            <Divider sx={{ borderColor: "black" }} />
            <Box
              component="nav"
              sx={{
                flexGrow: 1,
                px: 2,
                py: 1,
                paddingBottom: 3,
              }}
            >
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
              >
                <Box sx={{ paddingLeft: 2 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      height: 32,
                      width: 32,
                    }}
                  >
                    Blogs
                  </Box>
                </Box>
                {blogsItems.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })}
              </Stack>
            </Box>
          </>
        )}
      {user && user.adminLevel && user.adminLevel === 1 && (
        <>
          <Divider sx={{ borderColor: "black" }} />
          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 1,
              paddingBottom: 3,
            }}
          >
            <Stack
              component="ul"
              spacing={0.5}
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              <Box sx={{ paddingLeft: 2 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    height: 32,
                    width: 32,
                  }}
                >
                  Jobs
                </Box>
              </Box>
              {jobsItems.map((item) => {
                const active = item.path ? pathname === item.path : false;

                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
            </Stack>
          </Box>
        </>
      )}
      <Divider sx={{ borderColor: "black" }} />
      <Box
        sx={{
          px: 2,
          py: 2,
        }}
      >
        <a href="/Instructions.pdf" download>
          <ButtonBase
            sx={{
              alignItems: "center",
              borderRadius: 1,
              display: "flex",
              justifyContent: "flex-start",
              pl: "16px",
              pr: "16px",
              py: "6px",
              textAlign: "left",
              width: "100%",
              // ...(active && {
              //   backgroundColor: "rgba(255, 255, 255, 0.04)",
              // }),
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              },
            }}
            // {...linkProps}
          >
            {/* {icon && ( */}
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                // ...(active && {
                //   color: "primary.main",
                // }),
              }}
            >
              <MenuBookIcon sx={{ fontSize: 18 }} />
            </Box>
            {/* )} */}
            <Box
              component="span"
              sx={{
                color: "neutral.400",
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "24px",
                whiteSpace: "nowrap",
                // ...(active && {
                //   color: "common.white",
                // }),
                // ...(disabled && {
                //   color: "neutral.500",
                // }),
              }}
            >
              Instructions
            </Box>
          </ButtonBase>
        </a>

        <li onClick={logout}>
          <ButtonBase
            sx={{
              alignItems: "center",
              borderRadius: 1,
              display: "flex",
              justifyContent: "flex-start",
              pl: "16px",
              pr: "16px",
              py: "6px",
              textAlign: "left",
              width: "100%",
              // ...(active && {
              //   backgroundColor: "rgba(255, 255, 255, 0.04)",
              // }),
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              },
            }}
            // {...linkProps}
          >
            {/* {icon && ( */}
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                // ...(active && {
                //   color: "primary.main",
                // }),
              }}
            >
              <LogoutIcon sx={{ fontSize: 18 }} />
            </Box>
            {/* )} */}
            <Box
              component="span"
              sx={{
                color: "neutral.400",
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "24px",
                whiteSpace: "nowrap",
                // ...(active && {
                //   color: "common.white",
                // }),
                // ...(disabled && {
                //   color: "neutral.500",
                // }),
              }}
            >
              Logout
            </Box>
          </ButtonBase>
        </li>
        {/* <Typography color="neutral.100" variant="subtitle2">
          Need more features?
        </Typography> */}
        {/* <Typography color="neutral.500" variant="body2">
          Check out our Pro solution template.
        </Typography> */}
        {/* <Box
          sx={{
            display: "flex",
            mt: 2,
            mx: "auto",
            width: "160px",
            "& img": {
              width: "100%",
            },
          }}
        >
          <img alt="Go to pro" src="/assets/devias-kit-pro.png" />
        </Box> */}
      </Box>
    </Box>
    // </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            // backgroundColor: "neutral.800",
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.info.main,
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
        <BackdropComponent open={openBackdrop} />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          // backgroundColor: "neutral.800",
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.info.main,
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
      <BackdropComponent open={openBackdrop} />
    </Drawer>
  );
}
