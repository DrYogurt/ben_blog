import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import theme from '../theme';
import DOMPurify from 'dompurify';


const Post = ({ id, postIds, onPostChange }) => {
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/post/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);

  const currentIndex = postIds.indexOf(id);
  const nextPostId = currentIndex > 0 ? postIds[currentIndex - 1] : null;
  const prevPostId = currentIndex < postIds.length - 1 ? postIds[currentIndex + 1] : null;
  const latestPostId = postIds[0];

  const handleButtonClick = (newPostId) => {
    if (newPostId !== null) {
      onPostChange(newPostId);
    }
  };

  return (
    <div>
      {post ? (
        <>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.displayname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.date}
              </Typography>
              <Typography component="div" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
            </CardContent>
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', backgroundColor:theme.palette.background.default }}>
            <Button disabled={!prevPostId} onClick={() => handleButtonClick(prevPostId)}>Previous</Button>
            <Button disabled={!nextPostId} onClick={() => handleButtonClick(nextPostId)}>Next</Button>
            <Button disabled={id === latestPostId} onClick={() => handleButtonClick(latestPostId)}>Latest</Button>
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Post;
