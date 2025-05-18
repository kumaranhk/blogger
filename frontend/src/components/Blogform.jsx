import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { colors } from "../../constants/constants";

const BlogForm = ({ data }) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    category: data?.category || "",
    content: data?.content || "",
    image: data?.image || "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = !data ? "/blogs" : `/blogs/${data._id}`;
    const method = !data ? "post" : "put";
    try {
      const res = await axios[method](url, formData);
      toast.success(res.data?.message || "Blog submited successfully");
      navigate(!data ? "/" : "/my-blogs");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        {!data ? "Create New Blog" : "Edit Blog"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          required
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          required
          margin="normal"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          label="Content"
          name="content"
          fullWidth
          required
          margin="normal"
          multiline
          rows={5}
          value={formData.content}
          onChange={handleChange}
        />
        <TextField
          label="Image URL (optional)"
          name="image"
          fullWidth
          margin="normal"
          value={formData.image}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5,backgroundColor : colors.primary }}
          loading={loading}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default BlogForm;
