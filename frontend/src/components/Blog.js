import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import TimeLine from './Timeline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from './Footer.js';
import { useTheme } from '@mui/material/styles';



const Blog = () => {
  const theme = useTheme();
  const { postId } = useParams();
  const navigate = useNavigate();
  const initialPostId = !isNaN(Number(postId)) ? Number(postId) : null;
  const [selectedPost, setSelectedPost] = useState(initialPostId);
  const [postIds, setPostIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPostIds(response.data.map(post => post.id));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    console.log('postId:', postId); // Add logging
    if (postId) {
      const postIdNumber = Number(postId);
      if (!isNaN(postIdNumber)) {
        setSelectedPost(postIdNumber);
      } else {
        console.error('Invalid post ID in URL');
      }
    }
  }, [postId]);

  const handlePostSelect = (id) => {
    console.log('handlePostSelect:', id); // Add logging
    setSelectedPost(id);
    navigate('/post/${id}');
    window.scrollTo(0, 0);
    if (matches) {
      setDrawerOpen(false);
    }
  }

  const resetPostSelect = () => {
    setSelectedPost(null);
    navigate(`/`);
  };

  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      {matches && selectedPost ? (
        <>
          <Box sx={{
            position: 'sticky',
            top: 0,
            overflowY: 'scroll'
            
          }}>
            <IconButton onClick={() => setDrawerOpen(true)}
            sx={{
            backgroundColor: theme.palette.background.default,
            }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <TimeLine onPostSelect={handlePostSelect} selectedPost={selectedPost} resetPost={resetPostSelect} />
          </Drawer>
          {selectedPost && (
            <Post id={selectedPost} postIds={postIds} onPostChange={handlePostSelect} />
          )}
        </>
      ) : (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start',
          }}
        >
          <Box 
            sx={{ 
              position: 'sticky',
              top: 0,
              flex: selectedPost ? 0.15 : 1,
              backgroundColor: theme.palette.background.default,
              transition: 'flex 0.5s ease', 
              height: selectedPost ? '100vh' : '90vh',
              overflowY: 'scroll'
            }}
          >
            <TimeLine onPostSelect={handlePostSelect} selectedPost={selectedPost} resetPost={resetPostSelect} />
          </Box>
          {selectedPost && (
            <Box 
              sx={{ 
                flex: 0.7, 
                transition: 'flex 0.5s ease',
                minHeight: selectedPost ? 0.15 : 1,
                backgroundColor: theme.palette.background.default
              }}
            >
              <Post id={selectedPost} postIds={postIds} onPostChange={handlePostSelect} />
            </Box>
          )}
        </Box>
      )}
      {!selectedPost &&
        <Box sx={{ 
                position: 'fixed',
                width: "100%",
                bottom: 0
              }}>
          <Footer/>
        </Box>
      }
    </Box>
  );
};

export default Blog;
