
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Library } from "../models/library";

const DEFAULT_API_URL = 'http://localhost:4000/api';

/**
 * Custom hook para interactuar con la API de bibliotecas.
 * Incluye métodos CRUD y manejo de autenticación.
 */
function libraryService(apiUrl: string = import.meta.env.BASE_API_URL || DEFAULT_API_URL) {
    const auth = useContext(AuthContext);

    // Helper para manejar respuestas de la API y errores comunes.
    const handleResponse = async (response: Response, errorMsg: string) => {
        if (response.status === 401) {
            auth?.handleUnauthorized();
            throw new Error('Unauthorized');
        }
        if (!response.ok) throw new Error(errorMsg);
        if (response.status === 204) return;
        return await response.json();
    };

    // Obtiene todas las bibliotecas.
    const getLibraries = async () => {
        const response = await fetch(`${apiUrl}/libraries`, {
            headers: {
                'Authorization': `Bearer ${auth?.token}`
            }
        });
        return handleResponse(response, 'Error al obtener los libros');
    };

    // Crea una nueva biblioteca.
    const createLibrary = async (library: Library) => {
        const response = await fetch(`${apiUrl}/libraries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token}`
            },
            body: JSON.stringify(library)
        });
        return handleResponse(response, 'Error al registrar el libro');
    };

    // Actualiza una biblioteca existente.
    const updateLibrary = async (library: Library) => {
        const response = await fetch(`${apiUrl}/libraries/${library._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token}`
            },
            body: JSON.stringify(library)
        });
        return handleResponse(response, 'Error al actualizar el libro');
    };

    // Elimina una biblioteca por ID.
    const deleteLibrary = async (id: string) => {
        const response = await fetch(`${apiUrl}/libraries/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth?.token}`
            }
        });
        await handleResponse(response, 'Error al eliminar el libro');
    };

    return {
        getLibraries,
        createLibrary,
        updateLibrary,
        deleteLibrary
    };
}

export default libraryService;