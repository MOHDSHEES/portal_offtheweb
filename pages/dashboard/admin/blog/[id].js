import { MyContext } from "@/components/context";
import DashboardLayout from "@/components/dashboardLayout";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import NewBlogs from "@/components/blogs/newBlogs";
import { ThreeDots } from "react-loader-spinner";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter } from "next/router";

const BlogDetail = () => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  async function getBlog() {
    const { data } = await axios.post("/api/blogs/blog", { id: id });
    if (data.status === 200) {
      setBlog(data.blog);
      flag = 0;
    }
  }

  let flag = 1;
  useEffect(() => {
    if (id && !blog && flag) {
      getBlog();
    }
  }, [id, blog]);
  return (
    <div>
      <DashboardLayout>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Blog Details</Typography>
            </div>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, padding: 0 }}>
              {loading ? (
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                  <Skeleton variant="rectangular" height={140} />
                </Stack>
              ) : (
                <div></div>
              )}
            </Container>
          </Stack>
        </Container>
      </DashboardLayout>
    </div>
  );
};

export default BlogDetail;
