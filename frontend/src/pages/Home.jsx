import { Autocomplete, Box, TextField } from "@mui/material";
import Blogs from "../components/Blogs";
import axios from "../config/axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [authors, setAuhtors] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchAuthor = async () => {
    try {
      const res = await axios.get("/blogs/authors");
      setAuhtors(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const res = await axios.get("/blogs/categories");
      setCategory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthor();
    fetchCategory();
  }, []);

  return (
    <>
      <Box sx={{mt : 5,display: "flex",gap : 5}}>
        <Autocomplete
          disablePortal
          options={authors}
          // getOptionLabel={(option) => option.authorName}
          onChange={(_, value) => setSelectedAuthor(value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Authors" />}
        />
        <Autocomplete
          disablePortal
          options={category}
          // getOptionLabel={(option) => option.category}
          onChange={(_, value) => setSelectedCategory(value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </Box>
      <Blogs
        type={"all"}
        filter={{ author: selectedAuthor, category: selectedCategory }}
      />
    </>
  );
};

export default Home;
