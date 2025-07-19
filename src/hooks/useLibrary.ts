import { useEffect, useState } from "react";
import type { Library } from "../models/library";
import libraryService from "../services/libraryService";
import React from "react";


interface LibraryFormState {
    nombre: string;
    genero: string;
    descripcion: string;
    leido: boolean;
}

const initialForm: LibraryFormState = {
    nombre: "",
    genero: "",
    descripcion: "",
    leido: false
};


export const useLibrary = () => {
    const [libraries, setLibraries] = useState<Library[]>([]);
    const [form, setForm] = useState<LibraryFormState>(initialForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { getLibraries, createLibrary, updateLibrary, deleteLibrary } = libraryService();
// Estado para ordenamiento
    const [orderBy, setOrderBy] = React.useState<keyof typeof libraries[0] | ''>('');
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');


    // Eliminar libro
    const handleDelete = (id: string) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            await deleteLibrary(deleteId);
            setSnackbar({ open: true, message: 'Libro eliminado', severity: 'success' });
            fetchLibraries();
        } catch (e: any) {
            setSnackbar({ open: true, message: e.message, severity: 'error' });
        } finally {
            setLoading(false);
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setDeleteId(null);
    };

    // Fetch libraries
    const fetchLibraries = async () => {
        setLoading(true);
        try {
            const data = await getLibraries();
            setLibraries(data.libros);
        } catch (e: any) {
            setSnackbar({ open: true, message: e.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLibraries();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    
    const handleOpenDialog = (lib?: Library) => {
        if (lib) {
            setForm({
                nombre: lib.nombre,
                genero: lib.genero,
                descripcion: lib.descripcion,
                leido: lib.leido
            });
            setEditingId(lib._id);
        } else {
            setForm(initialForm);
            setEditingId(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setForm(initialForm);
        setEditingId(null);
    };

    // Create or update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await updateLibrary({ _id: editingId, ...form });
                setSnackbar({ open: true, message: 'Libro actualizado', severity: 'success' });
            } else {
                await createLibrary(form as Library);
                setSnackbar({ open: true, message: 'Libro registrado', severity: 'success' });
            }
            fetchLibraries();
            handleCloseDialog();
        } catch (e: any) {
            setSnackbar({ open: true, message: e.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // Toggle leído
    const handleToggleLeido = async (lib: Library) => {
        setLoading(true);
        try {
            await updateLibrary({ ...lib, leido: !lib.leido });
            setSnackbar({ open: true, message: 'Estado actualizado', severity: 'success' });
            fetchLibraries();
        } catch (e: any) {
            setSnackbar({ open: true, message: e.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };


    

    // Función de ordenamiento
    const handleRequestSort = (property: keyof typeof libraries[0]) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Ordenar los datos
    const sortedLibraries = React.useMemo(() => {
        if (!orderBy) return libraries;
        return [...libraries].sort((a, b) => {
            let aValue = a[orderBy];
            let bValue = b[orderBy];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return order === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return order === 'asc'
                    ? Number(aValue) - Number(bValue)
                    : Number(bValue) - Number(aValue);
            }
            return 0;
        });
    }, [libraries, order, orderBy]);

    return {
        form,
        editingId,
        loading,
        openDialog,
        snackbar,
        openDeleteDialog,
        handleChange,
        handleSubmit,
        handleDelete,
        handleToggleLeido,
        handleCloseDialog,
        handleOpenDialog,
        handleCancelDelete,
        handleConfirmDelete,
        setSnackbar,
        orderBy,
        order,
        handleRequestSort,
        sortedLibraries
    };
};
