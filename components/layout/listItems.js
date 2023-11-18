// import { SvgIcon } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import Person2Icon from "@mui/icons-material/Person2";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
// import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export const items = [
  {
    title: "Dashboard",
    path: "/dashboard",
    adminLevel: 10,
    icon: (
      // <SvgIcon fontSize="small">
      <Person2Icon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  {
    title: "Tasks",
    path: "/dashboard/tasks",
    adminLevel: 10,
    icon: (
      // <SvgIcon fontSize="small">
      <AssignmentIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },

  {
    title: "Assign Task",
    adminLevel: 1,
    path: "/dashboard/admin/comingSoon",
    icon: (
      // <SvgIcon fontSize="small">
      <AddTaskIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  {
    title: "Add Employee/Intern",
    path: "/dashboard/admin/register/employee",
    adminLevel: 1,
    icon: (
      // <SvgIcon fontSize="small">
      <PersonAddIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  {
    title: "Site Analytics",
    path: "/dashboard/admin/analytics",
    adminLevel: 1,
    icon: (
      // <SvgIcon fontSize="small">
      <AnalyticsIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
];

export const jobsItems = [
  {
    title: "New Jobs",
    path: "/dashboard/admin/new/jobs",
    icon: (
      // <SvgIcon fontSize="small">
      <WorkHistoryIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  {
    title: "All Jobs ",
    path: "/dashboard/admin/jobs",
    icon: (
      // <SvgIcon fontSize="small">
      <WorkIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  // {
  //   title: "Post a Job",
  //   path: "/post",
  //   icon: (
  //     // <SvgIcon fontSize="small">
  //     <PostAddIcon sx={{ fontSize: 18 }} />
  //     // </SvgIcon>
  //   ),
  // },
];

export const blogsItems = [
  {
    title: "New Blogs",
    path: "/dashboard/admin/new/blogs",
    icon: (
      // <SvgIcon fontSize="small">
      <ArticleIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  {
    title: "All Blogs ",
    path: "/dashboard/admin/blogs",
    icon: (
      // <SvgIcon fontSize="small">
      <ArticleIcon sx={{ fontSize: 18 }} />
      // </SvgIcon>
    ),
  },
  // {
  //   title: "Post a Job",
  //   path: "/post",
  //   icon: (
  //     // <SvgIcon fontSize="small">
  //     <PostAddIcon sx={{ fontSize: 18 }} />
  //     // </SvgIcon>
  //   ),
  // },
];
