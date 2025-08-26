export async function obtenerNombre() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Juan");
        }, 3000);
    });
}


export async function obtenerProfesiones() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Programador", "Diseñador", "Analista", "Gerente", "CEO"]);
        }, 3000);
    });
}