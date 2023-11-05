import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewJobs from "@/components/jobs/newJobs";
import JobDescription from "@/components/modal/jobDescription";
import Skeleton from "@mui/material/Skeleton";
import { ThreeDots } from "react-loader-spinner";

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
  function jobDescription(data) {
    // router.query.job = data._id;
    // router.push(router, undefined, { scroll: false });
    setData(data);
    setShow(true);
  }
  async function getJobs() {
    flag = 0;
    if (!jobs.length) {
      setLoading(true);
    }
    setLoadingMore(true);
    const { data } = await axios.post(
      `/api/jobs/allJobs?page=${currentPage}&perPage=${itemsPerPage}`
    );
    if (data.status === 200 && data.jobs.length) {
      //   setJobs(data.jobs);
      setJobs([...jobs, ...data.jobs]);
      setCurrentPage(currentPage + 1);
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

  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Jobs</Typography>
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
                  {jobs &&
                    jobs.map((job, idx) => {
                      return (
                        <div key={idx} onClick={() => jobDescription(job)}>
                          <NewJobs data={job} />
                        </div>
                      );
                    })}
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
                          onClick={getJobs}
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
        // loading={loading}
      />
    </div>
  );
};

export default Jobs;
