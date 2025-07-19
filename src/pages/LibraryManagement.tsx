
import React from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    TableSortLabel
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useLibrary } from "../hooks/useLibrary";


const LibraryManagement: React.FC = () => {
    const {
        handleOpenDialog,
        handleToggleLeido,
        handleDelete,
        openDeleteDialog,
        handleCancelDelete,
        handleConfirmDelete,
        loading,
        openDialog,
        handleCloseDialog,
        editingId,
        handleSubmit,
        form,
        handleChange,
        snackbar,
        setSnackbar,
        orderBy,
        order,
        handleRequestSort,
        sortedLibraries
    } = useLibrary();

    

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Gestión de Libros</Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                    Registrar Libro
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'secondary.main' }}>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === 'nombre'}
                                    direction={orderBy === 'nombre' ? order : 'asc'}
                                    onClick={() => handleRequestSort('nombre')}
                                >
                                    Nombre
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === 'genero'}
                                    direction={orderBy === 'genero' ? order : 'asc'}
                                    onClick={() => handleRequestSort('genero')}
                                >
                                    Género
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === 'descripcion'}
                                    direction={orderBy === 'descripcion' ? order : 'asc'}
                                    onClick={() => handleRequestSort('descripcion')}
                                >
                                    Descripción
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === 'leido'}
                                    direction={orderBy === 'leido' ? order : 'asc'}
                                    onClick={() => handleRequestSort('leido')}
                                >
                                    Leído
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'white' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedLibraries.map(lib => (
                            <TableRow key={lib._id}>
                                <TableCell>{lib.nombre}</TableCell>
                                <TableCell>{lib.genero}</TableCell>
                                <TableCell>{lib.descripcion}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={lib.leido}
                                        onChange={() => handleToggleLeido(lib)}
                                        icon={<CloseIcon color="error" />}
                                        checkedIcon={<CheckIcon color="success" />}
                                        inputProps={{ 'aria-label': 'Leído' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenDialog(lib)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(lib._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
                                    <DialogTitle>¿Eliminar libro?</DialogTitle>
                                    <DialogContent>
                                        <Typography>¿Estás seguro que deseas eliminar este libro? Esta acción no se puede deshacer.</Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCancelDelete} color="secondary">Cancelar</Button>
                                        <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={loading}>
                                            Eliminar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editingId ? 'Editar Libro' : 'Registrar Libro'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            label="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            label="Género"
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            margin="normal"
                            label="Descripción"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            minRows={2}
                            required
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.leido}
                                    onChange={handleChange}
                                    name="leido"
                                    color="primary"
                                />
                            }
                            label="Leído"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">Cancelar</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {editingId ? 'Actualizar' : 'Registrar'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LibraryManagement;