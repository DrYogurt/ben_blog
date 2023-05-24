import React from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Header = () => {
    const theme = useTheme();
    
    return (
        <Box sx={{ 
            width: '100%', 
            height: '10vh',
            background: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="h4"sx={{ color: 'black' }}>
                To Whom it May Concern
            </Typography>
        </Box>
    );
}

export default Header;
