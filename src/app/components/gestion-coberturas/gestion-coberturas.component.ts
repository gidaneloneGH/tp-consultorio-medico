import { Component, OnInit } from '@angular/core';

interface Cobertura {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-gestion-coberturas',
  templateUrl: './gestion-coberturas.component.html',
  styleUrls: ['./gestion-coberturas.component.css']
})
export class GestionCoberturasComponent implements OnInit {

  coberturas: Cobertura[] = [
    { id: 1, nombre: 'OSDE 210' },
    { id: 2, nombre: 'Swiss Medical 40' },
    { id: 3, nombre: 'Galeno Azul' },
    { id: 4, nombre: 'PAMI' },
  ];
  
  usuariosConCobertura: { [key: number]: number[] } = {
    4: [101, 105], 
    1: [102],
  };

  nuevaCoberturaNombre: string = '';
  coberturaEditada: Cobertura | null = null;

  constructor() { }

  ngOnInit(): void { }

  crearCobertura(): void {
    if (this.nuevaCoberturaNombre.trim() === '') {
      alert('El nombre de la cobertura no puede estar vacío.');
      return;
    }
    
    const nuevaId = Math.max(...this.coberturas.map(c => c.id)) + 1;
    this.coberturas.push({ id: nuevaId, nombre: this.nuevaCoberturaNombre.trim() });
    this.nuevaCoberturaNombre = '';
    alert('Cobertura creada con éxito.');
  }

  // Modificar
  iniciarEdicion(cobertura: Cobertura): void {
    this.coberturaEditada = { ...cobertura };
  }

  guardarEdicion(): void {
    if (!this.coberturaEditada || this.coberturaEditada.nombre.trim() === '') {
      alert('El nombre de la cobertura no puede estar vacío.');
      return;
    }
    
    const index = this.coberturas.findIndex(c => c.id === this.coberturaEditada!.id);
    if (index !== -1) {
      this.coberturas[index].nombre = this.coberturaEditada.nombre.trim();
      alert('Cobertura modificada con éxito.');
    }
    this.coberturaEditada = null; 
  }

  eliminarCobertura(coberturaId: number, coberturaNombre: string): void {
    
    const tieneAsociaciones = this.usuariosConCobertura[coberturaId]?.length > 0;
    
    if (tieneAsociaciones) {
      alert(` ERROR: La cobertura "${coberturaNombre}" no puede ser eliminada porque ${this.usuariosConCobertura[coberturaId].length} usuario(s) la tienen asociada.`);
      return;
    }

    if (confirm(`¿Está seguro que desea eliminar la cobertura: "${coberturaNombre}"?`)) {
      this.coberturas = this.coberturas.filter(c => c.id !== coberturaId);
      alert('Cobertura eliminada con éxito.');
    }
  }

  cancelarEdicion(): void {
    this.coberturaEditada = null;
  }
}