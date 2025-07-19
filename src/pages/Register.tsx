import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRegister } from "../hooks/useRegister";



const Register: React.FC = () => {
    const { form, error, handleChange, handleSubmit } = useRegister();
    
    return (
        <Box maxWidth={400} mx="auto" mt={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Registro de Usuario
            </Typography>
            {error && <Alert severity="error" sx={
                {
                    mb: 3
                }
            }>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Correo electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Repetir contraseña"
                name="repeatPassword"
                type="password"
                value={form.repeatPassword}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrarse
              </Button>
            </Box>
          </Paper>
        </Box>
      );
}

export default Register;