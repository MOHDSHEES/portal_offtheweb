import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewJobs from "@/components/jobs/newJobs";
import JobDescription from "@/components/modal/jobDescription";
import Skeleton from "@mui/material/Skeleton";
import { ThreeDots } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter } from "next/router";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(MyContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMoreData, setIsMoreData] = useState(true);
  const itemsPerPage = 10;
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState("all");

  function jobDescription(data) {
    // router.query.job = data._id;
    // router.push(router, undefined, { scroll: false });
    setData(data);
    setShow(true);
  }
  async function getJobs(filterl = null, page = null) {
    flag = 0;
    if (!jobs.length) {
      setLoading(true);
    }
    setLoadingMore(true);

    const { data } = await axios.post(
      `/api/jobs/allJobs?page=${
        page ? page : currentPage
      }&perPage=${itemsPerPage}&&filter=${filterl ? filterl : filter}`
    );

    if (data.status === 200 && data.jobs.length) {
      //   setJobs(data.jobs);
      if (page === 1) {
        setJobs(data.jobs);
        setCurrentPage(page + 1);
      } else {
        setJobs([...jobs, ...data.jobs]);
        setCurrentPage(currentPage + 1);
      }
      setLoadingMore(false);
    } else {
      setLoadingMore(false);
      setIsMoreData(false);
    }
    setLoading(false);
  }

  let flag = 1;
  useEffect(() => {
    if (flag && user && user.adminLevel === 1) getJobs();
  }, [user]);

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
    setFilter(filter);
    setIsMoreData(true);
    setJobs([]);
    getJobs(filter, 1);
  }

  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Jobs{" "}
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
                    All Jobs
                  </MenuItem>
                </Menu>
              </Typography>
              <Stack direction="row" spacing={1} sx={{ margin: "10px" }}>
                {/* <Chip label="Deletable" onDelete={() => "df"} /> */}
                {filter === "all" ? (
                  <Chip label="All Jobs" variant="outlined" />
                ) : (
                  <Chip
                    label={filter}
                    variant="outlined"
                    onDelete={() => filterFunction("all")}
                  />
                )}
              </Stack>
            </div>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              {loading ? (
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                </Stack>
              ) : (
                <div>
                  {jobs && jobs.length !== 0 ? (
                    jobs.map((job, idx) => {
                      return (
                        <div key={idx} onClick={() => jobDescription(job)}>
                          <NewJobs data={job} />
                        </div>
                      );
                    })
                  ) : (
                    <div class="alert alert-primary" role="alert">
                      No Jobs found.
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
                          onClick={() => getJobs()}
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
      <JobDescription
        show={show}
        setShow={setShow}
        data={data}
        jobs={jobs}
        setJobs={setJobs}
        component="allJobs"
        // loading={loading}
      />
    </div>
  );
};

export default Jobs;
