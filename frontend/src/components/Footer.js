import React, { useEffect, useState }  from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import axios from 'axios';

const socialMediaLinks = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];

const Footer = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }
    
      const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!validateEmail(email)) {
          setError("Please enter a valid email.");
          return;
        }
    
        axios.post('http://localhost:5000/subscribe', { email })
          .then(response => {
            console.log(response);
            setEmail("");
            setError("");
          })
          .catch(error => {
            setError("There was an error submitting your email.");
            console.log(error);
          });
      }

    return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(3),
            color: theme.palette.text.primary
          }}
        >
            <Grid container spacing={3} justifyContent="space-around">
                <Grid item xs={12} sm={5} md={4} lg={3}>
                    <Typography variant="h6" align="center">
                        Sign up for updates
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField id="email" label="Email" variant="outlined" fullWidth value={email} onChange={handleEmailChange} />
                        {error && <Typography variant="body2" color="error">{error}</Typography>}
                        <Button variant="contained" color="primary" fullWidth style={{marginTop: theme.spacing(2)}} type="submit">
                            Sign Up
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={3}>
                    <Typography variant="h6" align="center">
                        Follow us on social media
                    </Typography>
                    <List>
                        {socialMediaLinks.map(link => (
                            <ListItem key={link} align="center">
                                {link}
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
