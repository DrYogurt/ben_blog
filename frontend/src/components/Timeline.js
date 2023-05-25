import React, { useEffect, useState, useRef, createRef } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';


const TimeLine = ({ onPostSelect, selectedPost, resetPost }) => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const theme = useTheme();

  const postRefs = useRef(posts.reduce((acc, post) => {
    acc[post.id] = createRef();
    return acc;
  }, {}));

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  // Add this useEffect to scroll the selected post into view
  useEffect(() => {
    if (selectedPost && postRefs.current[selectedPost]) {
      postRefs.current[selectedPost].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPost]);

  const handleMouseEnter = (post_id) => {
    setActivePost(post_id);
  }

  const handleMouseLeave = () => {
    setActivePost(null);
  }

  return (
    <>
      <Timeline position={selectedPost === null ? "alternate" : "left"}>
        {posts.map((post, index) => (
          <TimelineItem key={post.id} ref={postRefs.current[post.id]}>
            <TimelineOppositeContent color="text.secondary">
                {selectedPost === null && post.fdate}
            </TimelineOppositeContent>
            <TimelineSeparator>
            <TimelineDot
              sx={{ 
                transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)", 
                transform: post.id === activePost ? "scale(2)" : "scale(1.5)",
                borderColor: theme.palette.primary.main,
                backgroundColor: post.id === selectedPost 
                  ? theme.palette.primary.main  // When the post is active
                  : theme.palette.background.default,  // When the post is not active
              }}
              onMouseEnter={() => handleMouseEnter(post.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onPostSelect(post.id)}
            />
              {index !== posts.length - 1 && <TimelineConnector sx={{ backgroundColor: theme.palette.secondary.main }}/>}
            </TimelineSeparator>
            <TimelineContent
            >
               {selectedPost === null ? post.displayname : post.fdate}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {selectedPost !== null && (
        <Box 
          sx={{ 
            position: 'relative',
            bottom: '10px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Fab 
            size="small"
            color="inherit" 
            onClick={resetPost}
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.main,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.paper
              }
            }}
          >
            <ArrowForwardIosIcon />
          </Fab>
        </Box>
      )}
    </>
  );
};

export default TimeLine;
