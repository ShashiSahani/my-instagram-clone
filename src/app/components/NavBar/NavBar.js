"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import "./NavBar.css";
import { Search, SearchIconWrapper, StyledInputBase } from "./Navbar.style";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import { navbarStyles } from "./NavbarSx.style.js";
import UploadInstagramPost from "../UploadInstargarmImage/UploadInstagramPost.js";
import DisplayImages from "../DisplayInstagramPost/DisplayPostImages.js";
import instagramthumbnai from "../../../../public/assets/Images/instagram-thumbnail.png"
import { Image } from "@mui/icons-material";

const url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFjTo019YPEKTd1RMSN87JRT6HBX0UhHrjTJDJE452w&s";
function NavBar() {
  const [isUploadModalOpen,setIsUploadModalOpen]=React.useState(false)
  const handleInstagramIconClick=()=>{
    setIsUploadModalOpen(true);
  }
  return (
   <>
   
   <AppBar position="static" sx={navbarStyles.root}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={navbarStyles.title}
          >
            <IconButton onClick={handleInstagramIconClick}>
            <InstagramIcon
            
            titleAccess="
      Instagram"
            sx={navbarStyles.icon}
          />

            </IconButton>
          
          </Typography>

          <Search sx={navbarStyles.Search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton>
                <Avatar alt="Profile" src={url} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <UploadInstagramPost isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}/>
    {/* <Image src={instagramthumbnai}  sx={{height:100,width:400}}/> */}

    <DisplayImages />

   </>
  );
}
export default NavBar;
