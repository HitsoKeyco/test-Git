import { obtenerNombre, obtenerProfesiones } from "./services.js";

export class Persona {
    constructor(nombre, apellido, edad, id) {
        this._nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.contenedor = document.getElementById(id);
        this._loadSelect = true; // Propiedad privada
        this.dataProfesiones = [];
    }

    // Getter para el nombre
    get nombre() {
        return this._nombre;
    }

    // Getter para loadSelect
    get loadSelect() {
        return this._loadSelect;
    }


    // Setter que auto-renderiza cuando cambia el nombre
    set nombre(valor) {
        this._nombre = valor;
        this.renderizar();        
    }

    // Setter para loadSelect que auto-renderiza
    set loadSelect(valor) {
        this._loadSelect = valor;
        this.renderizar(); // Siempre renderizar cuando cambie
    }

    // Método para controlar el estado del select
    actualizarEstadoSelect(estado, datos = null) {
        if (estado === 'cargando') {
            this._loadSelect = false;
            this.dataProfesiones = [];
        } else if (estado === 'completado') {
            this._loadSelect = true;
            if (datos) {
                this.dataProfesiones = datos;
            }
        } else if (estado === 'error') {
            this._loadSelect = true;
            this.dataProfesiones = [];
        }
        this.renderizar();
    }

    renderizar() {
        const html = `
                <div>
                    <label for="dx_select"><strong>Profesión:</strong></label>
                    <select id='dx_select' style="width: 300px; height: 40px;">                
                        ${
                            this.loadSelect 
                            ? '<option>Seleccione una profesión...</option>' 
                            : '<option>Cargando profesiones...</option>'
                        }
                        ${
                            this.dataProfesiones.length > 0 
                            ? this.dataProfesiones.map(profesion => `<option value="${profesion}">${profesion}</option>`).join('') 
                            : ''
                        }
                    </select>
                </div>
            <h1>Hola, mi nombre es ${this.nombre ? this.nombre : "..."} ${this.apellido} y tengo ${this.edad} años en marte.</h1>
        `;
        this.contenedor.innerHTML = html;
    }
    

    async init() {        
        // Iniciar estado de carga
        this.actualizarEstadoSelect('cargando');
        
        try {
            // Carga de nombres
            const nombre = await obtenerNombre();
            this.nombre = nombre;
            
            // Carga de profesiones
            const profesiones = await obtenerProfesiones();
            this.actualizarEstadoSelect('completado', profesiones);

        } catch (error) {
            console.error('Error al obtener datos:', error);
            this.actualizarEstadoSelect('error');
        }
    }

    // Método para cargar solo el nombre
    async cargarNombre() {
        try {
            const nombre = await obtenerNombre();
            this.nombre = nombre;
        } catch (error) {
            console.error('Error al obtener nombre:', error);
        }
    }

    // Método para cargar solo las profesiones
    async cargarProfesiones() {
        this.actualizarEstadoSelect('cargando');
        
        try {
            const profesiones = await obtenerProfesiones();
            this.actualizarEstadoSelect('completado', profesiones);
        } catch (error) {
            console.error('Error al obtener profesiones:', error);
            this.actualizarEstadoSelect('error');
        }
    }
    
}
