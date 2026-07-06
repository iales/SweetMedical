import React from "react";
import './backButton.css';
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({onClick}) => {
    return(
        <IconButton 
            onClick={onClick} 
            sx={{ 
            color: '#f2f2f2', 
            padding: '8px',
            '&:hover': {
                backgroundColor: 'rgba(50, 130, 210, 0.1)', 
                transform: 'scale(1.02)',                    
                transition: 'all 0.2s ease-in-out'
            } 
            }}
            aria-label="volver atrás"
        >
            <ArrowBackIcon fontSize="medium" />
        </IconButton>
    );
}

export default BackButton;
