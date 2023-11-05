import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewJobs from "@/components/jobs/newJobs";
import JobDescription from "@/components/modal/jobDescription";
import Skeleton from "@mui/material/Skeleton";

const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const { user } = useContext(MyContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  function jobDescription(data) {
    // router.query.job = data._id;
    // router.push(router, undefined, { scroll: false });
    setData(data);
    setShow(true);
  }
  async function getNewJobs() {
    flag = 0;
    setLoading(true);
    const { data } = await axios.post("/api/jobs/getNewJobs");
    if (data.status === 200) setJobs(data.jobs);
    setLoading(false);
  }

  let flag = 1;
  useEffect(() => {
    if (flag && user && user.adminLevel === 1) getNewJobs();
  }, [user]);

  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">New Jobs</Typography>
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
                  {jobs && jobs.length ? (
                    jobs.map((job, idx) => {
                      return (
                        <div key={idx} onClick={() => jobDescription(job)}>
                          <NewJobs data={job} />
                        </div>
                      );
                    })
                  ) : (
                    <div class="alert alert-primary" role="alert">
                      No Jobs for Activation.
                    </div>
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
