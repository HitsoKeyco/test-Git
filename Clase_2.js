export class Profesion {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    renderizar() {
        const html = `
            <h1>Hola, mi nombre es ${this.nombre} y soy ${this.descripcion}.</h1>
        `;
        this.contenedor.innerHTML = html;
    }
    
}