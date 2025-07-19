import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import taskBg from '../assets/libraryManagement.png';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const welcomeText = '¡Bienvenido a tu gestor de libros!';

const Home: React.FC = () => {
    const [displayedText, setDisplayedText] = useState('');
    const auth = useContext(AuthContext);
    const token = auth?.token;
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(welcomeText.slice(0, i + 1));
            i++;
            if (i === welcomeText.length) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                minHeight: 'calc(94vh - 64px - 64px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${taskBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.7,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    bgcolor: 'rgba(255,255,255,0.85)',
                    borderRadius: 3,
                    p: 5,
                    boxShadow: 3,
                    textAlign: 'center',
                    zIndex: 1,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, fontFamily: 'monospace', minHeight: 60 }}>
                    {displayedText}
                    <span style={{ color: '#1976d2', fontWeight: 900 }}>|</span>
                </Typography>
                {!token ? (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Link to="/login">
                            <Button variant="contained" color="primary" size="large">
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained" color="secondary" size="large">
                                Registrarse
                            </Button>
                        </Link>
                    </Stack>
                ) : (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                        <Link to="/library">
                            <Button variant="contained" color="primary" size="large">
                                Ir a mis libros
                            </Button>
                        </Link>
                    </Stack>
                )}
            </Box>
        </Box>
    )
};

export default Home;