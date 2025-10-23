export interface Usuario {
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
    telefono: string,
    contraseña: string,
    id_cobertura: number,
    rol: string,
    fecha_nacimiento?: string,
    id?: number,
    nombre_cobertura?: string;
    password?: string;
}