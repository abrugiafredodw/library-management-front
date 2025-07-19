
import React from "react";
import { Box, Container, Typography } from "@mui/material";

interface FooterProps {
  appName?: string;
  author?: string;
}

const Footer: React.FC<FooterProps> = ({ appName = "Library Management", author = "Ariel Brugiafredo" }) => {
  return (
    <Box component="footer" sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      textAlign: 'center',
    }}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          {appName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'© '}
          {new Date().getFullYear()} | Hecho por {author}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
