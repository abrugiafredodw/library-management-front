import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";



const PaginaNoEncontrada: React.FC = () => (
     <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        textAlign="center"
      >
        <Typography variant="h1" color="primary" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" mb={3}>
          Lo sentimos, la página que buscas no existe o fue movida.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Volver al inicio
        </Button>
      </Box>
)


export default PaginaNoEncontrada;