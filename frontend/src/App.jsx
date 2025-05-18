import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import { ToastContainer, Zoom } from "react-toastify";
import { Box } from "@mui/material";
import SignUp from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Myblogs from "./pages/Myblogs";
import CreateBlog from "./pages/Addblog";
import Editblog from "./pages/Editblog";
import ProtectedRoute from "./components/Protectedroute";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AuthProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            transition={Zoom}
            theme="colored"
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute children={<Home />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-blogs" element={<ProtectedRoute children={<Myblogs />} />} />
            <Route path="/add-blog" element={<ProtectedRoute children={ <CreateBlog />}/>} />
            <Route path="/edit-blog/:id" element={<ProtectedRoute children={<Editblog />} />} />
            <Route path="*" element={<h1>No page found</h1>} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Box>
    </BrowserRouter>
  );
}

export default App;
