import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "../config/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Blogs = ({ type, filter }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = {};
  if (filter?.category) params.category = filter.category;
  if (filter?.author) params.author = filter.author;

  const fetchBlogs = async () => {
    const url = type === "all" ? "/blogs" : "/blogs/my-blogs";
    try {
      const res = await axios.get(url, {
        params,
      });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/blogs/${id}`);
      toast.success(res.data?.message || "Blog deleted successfuly");
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 5 }}>
        {type === "all" ? "All Blogs" : "My Blogs"}
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid key={blog._id}>
            <Card sx={{ height: "100%", width: "500px" }}>
              {blog.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image}
                  alt={blog.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {blog.category} &middot; by {blog?.author || "Unknown"}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {blog.content.substring(0, 100)}...
                </Typography>
              </CardContent>
              {type === "self" && (
                <CardActions sx={{ justifyContent: "end" }}>
                  <Tooltip title={"Edit Blog"}>
                    <IconButton
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Delete blog"}>
                    <IconButton onClick={() => handleDelete(blog._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
