import { useParams } from "react-router-dom";
import BlogForm from "../components/Blogform";
import axios from "../config/axios";
import { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";

const Editblog = () => {
  const [blog, setBlog] = useState({});
   const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return <BlogForm data={blog} />;
};

export default Editblog;
