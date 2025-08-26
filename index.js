import { Persona } from "./Clase_1.js";

class App {
    constructor() {
        this.id = "app";
        this.estado = true;
    }
    
    set estado(valor) {
        this._estado = valor;
        if(this._estado) {
            const body = document.body;
            body.style.backgroundColor = "#000";
        }
    }

    get estado() {
        return this._estado;
    }

    async iniciar() {      
        if(this.estado) {
            this.estado = false;

            const body = document.body;
            body.style.backgroundColor = "#000";
        }
        
        const app = new Persona(null, "Perez", 20, this.id);
        app.renderizar(); // Renderizado inicial

        // Controlar el estado de carga manualmente
        app.actualizarEstadoSelect('cargando');

        try {
            // Cargar nombre y profesiones en paralelo
            await Promise.all([
                app.cargarNombre(),
                app.cargarProfesiones()
            ]);
            // Cuando ambas cargas terminan, el estado se actualiza dentro de los métodos de Persona
        } catch (error) {
            console.error('Error al cargar datos:', error);
            app.actualizarEstadoSelect('error');
        }

        this.estado = false;
    }
}

const app = new App();
app.iniciar();

