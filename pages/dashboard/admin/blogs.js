import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewJobs from "@/components/jobs/newJobs";
import JobDescription from "@/components/modal/jobDescription";
import Skeleton from "@mui/material/Skeleton";
import NewBlogs from "@/components/blogs/newBlogs";
import { ThreeDots } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(MyContext);
  const [blogsLoadFlag, setBlogsLoadFlag] = useState(true);
  //   const [show, setShow] = useState(false);
  //   const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //   async function getAllBlogs() {
  //     flag = 0;
  //     setLoading(true);
  //     const { data } = await axios.post("/api/blogs/allBlogs");
  //     if (data.status === 200) setBlogs(data.blogs);
  //     setLoading(false);
  //   }

  let flag = 1;
  useEffect(() => {
    if (
      flag &&
      user &&
      (user.adminLevel === 1 || user.employeeId !== "1885816702")
    )
      getBlogs();
  }, [user]);

  // const [show, setShow] = useState(false);
  // const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreData, setIsMoreData] = useState(true);
  const itemsPerPage = 15;
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState("all");
  //   const [jobsLoadFlag, setJobsLoadFlag] = useState(true);

  async function getBlogs(filterl = null, page = null) {
    flag = 0;
    if (!blogs.length) {
      setLoading(true);
    }
    setLoadingMore(true);
    setBlogsLoadFlag(true);

    const { data } = await axios.post(
      `/api/blogs/allBlogs?page=${
        page ? page : currentPage
      }&perPage=${itemsPerPage}&&filter=${filterl ? filterl : filter}`
    );
    if (data.status === 200 && data.blogs.length) {
      //   setJobs(data.jobs);
      if (page === 1) {
        setBlogs(data.blogs);
        setCurrentPage(page + 1);
      } else {
        setBlogs([...blogs, ...data.blogs]);
        setCurrentPage(currentPage + 1);
        setBlogsLoadFlag(false);
      }
      setLoadingMore(false);
    } else {
      setLoadingMore(false);
      setIsMoreData(false);
      setBlogsLoadFlag(false);
    }
    setLoading(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function filterFunction(filter) {
    handleClose();
    // setCurrentPage(1);
    setBlogsLoadFlag(true);
    setFilter(filter);
    setIsMoreData(true);
    setBlogs([]);
    getBlogs(filter, 1);
  }

  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                New Blogs
                <Tooltip title="Filter">
                  <IconButton
                    id="basic-button"
                    sx={{ float: "right", marginBottom: "10px" }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    aria-label="Filter"
                    size="large"
                  >
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => filterFunction("Active")}>
                    Active
                  </MenuItem>
                  <MenuItem onClick={() => filterFunction("Rejected")}>
                    Rejected
                  </MenuItem>
                  <MenuItem onClick={() => filterFunction("Inactive")}>
                    Inactive
                  </MenuItem>
                  <MenuItem onClick={() => filterFunction("all")}>
                    All Blogs
                  </MenuItem>
                </Menu>
              </Typography>
              <Stack direction="row" spacing={1} sx={{ margin: "10px" }}>
                {/* <Chip label="Deletable" onDelete={() => "df"} /> */}
                {filter === "all" ? (
                  <Chip label="All Blogs" variant="outlined" />
                ) : (
                  <Chip
                    label={filter}
                    variant="outlined"
                    onDelete={() => filterFunction("all")}
                  />
                )}
              </Stack>
            </div>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
              {loading ? (
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                </Stack>
              ) : (
                <div>
                  {blogs && blogs.length !== 0
                    ? blogs.map((blog, idx) => {
                        return (
                          <div key={idx}>
                            <NewBlogs
                              setBlogs={setBlogs}
                              blogs={blogs}
                              filterFunction={filterFunction}
                              data={blog}
                              component="allBlogs"
                            />
                            {/* <NewBlogs data={blog} /> */}
                          </div>
                        );
                      })
                    : !blogsLoadFlag && (
                        <div class="alert alert-primary" role="alert">
                          No Blogs found.
                        </div>
                      )}

                  {loadingMore ? (
                    <div style={{ marginTop: "10px" }}>
                      <ThreeDots
                        height="10"
                        width="80"
                        radius="1"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ justifyContent: "center" }}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    isMoreData && (
                      <div style={{ textAlign: "center" }}>
                        <button
                          style={{ marginTop: "10px", width: "100%" }}
                          onClick={() => getBlogs()}
                          className="btn btn-secondary secondary-1 "
                        >
                          View More...
                        </button>
                      </div>
                    )
                  )}

                  <Grid container spacing={3}></Grid>
                </div>
              )}
            </Container>
          </Stack>
        </Container>
      </DashboardLayout>
      {/* <JobDescription
        show={show}
        setShow={setShow}
        data={data}
        jobs={jobs}
        setJobs={setJobs}
        // loading={loading}
      /> */}
    </div>
  );
};

export default Blogs;
