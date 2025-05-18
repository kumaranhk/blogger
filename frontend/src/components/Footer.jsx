import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ pt: 5 }}>
      <Box
        sx={{
          backgroundColor: "rgb(239 246 255)",
          p: 2,
          textAlign: "center",
          mt: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: "gray" }}>
          Copyright ©️ 2025 Blogs - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
