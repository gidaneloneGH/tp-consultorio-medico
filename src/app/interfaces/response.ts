export interface RespuestaApiLogin {
    codigo: number,
    jwt: string,
    mensaje: string,
    payload: UsuarioLogin[]
}

export interface UsuarioLogin {
    apellido: string,
    id: string,
    nombre: string,
    rol: string
}