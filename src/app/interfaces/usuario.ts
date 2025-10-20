export interface Usuario {
    nombre: string,
    apellido: string,
    dni: string,
    correo: string,
    telefono: string,
    contraseña: string,
    id_cobertura: string,
    rol?: string,
    fecha_nacimiento?: string
}
