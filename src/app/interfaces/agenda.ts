export interface RangoHorario {
    id: number;
    id_medico: number;
    id_especialidad: number;
    fecha: string;        
    hora_entrada: string;  
    hora_salida: string;   
    horaInicio: string; 
    horaFin: string;    
}

export interface NuevoRangoInput {
    horaInicio: string; // HH:MM
    horaFin: string;    // HH:MM
    isValid: boolean;
}

export interface CrearAgendaPayload {
    id_medico: number | string;
    id_especialidad: number; 
    fecha: string;         
    hora_entrada: string;
    hora_salida: string;
}
