
import { Alert, Box, Button, Link as LinkMaterial, Paper, TextField, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";



const Login: React.FC = () => {
     const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleSubmit
      } = useLogin();

    return (
        <Box maxWidth={400} mx="auto" mt={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Iniciar sesión
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Ingresar
              </Button>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <LinkMaterial href="#" underline="hover">
                  ¿Olvidaste tu contraseña?
                </LinkMaterial>
                <Button component={Link} to="/register" variant="contained" color="secondary" size="small">
                  Registrarse
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      );
};

export default Login;