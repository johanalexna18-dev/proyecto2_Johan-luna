// version 1.0.0

// No borrar ni modificar las constantes y variables que ya están declaradas, ya que son necesarias para el funcionamiento del juego.
// Simplemente comenta las líneas indicadas más abajo una vez hagas las pruebas del funcionamiento del código inicial.

let username = "";

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ------------------- Ejemplo para pedir datos al usuario ----------------------


// ------------------- Función para pedir datos al usuario ----------------------
function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

//-------------------- Fin del código Espacio Educa ----------------------

const palabras = [
    "algoritmo", "binario", "compilador", "caché", "cifrado", "comando", "conexión", "onsola", 
    "Contenedor", "Cookies", "Cuántico", "Depuración", "Despliegue", "Directorio", "Dominio", "Driver", 
    "Ejecutable", "Entorno", "Escalable", "Etiqueta", "Firewall", "Framework", "Frontend", "Funciones", 
    "Gigahercio", "Gradiente", "Hardware", "Hostname", "Hyperlink", "Iteración", "Instancia", "Interfaz", 
    "Inyección", "Iterador", "Jerarquía", "Librería", "Logística", "Memoria", "Metadato", "Middleware", 
    "Navegador", "Nodo", "Objeto", "Octeto", "Optimizar", "Paquete", "Parámetro", "Partición", 
    "Pasarela", "Petición", "Puntero", "Protocolo", "Pipeline", "Polimorfismo", "Primitiva", "Privacidad", 
    "Procesador", "Programa", "Protocolo", "Puerto", "Query", "Recursión", "Repositorio", "Respaldo", 
    "Routing", "Runtime", "Scripting", "Servidor", "Síncrono", "Software", "Subred", "Sintaxis", 
    "Terminal", "Token", "Topología", "Transacción", "Variable", "Vector", "Virtual", "Volátil", 
    "Workflow", "Arquitectura", "Backend", "Bitácora", "Bootloader", "Breakpoint", "Broadcasting", "Ciberseguridad", 
    "Dataset", "Encriptar", "End-point", "Escaneo", "Excepción", "Firmware", "Gateway", "Hash", 
    "Inmutable", "Kernel", "Latencia", "Microservicio"
];


let palabraSecreta = "";
let intentos = 3; 
let palabraMostrada = [];
let victorias = 0;
let derrotas = 0;
let letrasUsadas = [];


startGame();

async function startGame(){
    if (!username) {
        username = await getUserInput("¿Cuál es tu nombre, jugador?");
    }

    
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    palabraMostrada = Array(palabraSecreta.length).fill("_");
    intentos = 3; 
    letrasUsadas = [];

    console.log(`\nHola ${username}, ¡bienvenido al juego del Ahorcado!`);
    console.log(`Marcador -> Ganadas: ${victorias} | Perdidas: ${derrotas}`);
    console.log(`La palabra tiene ${palabraSecreta.length} letras. ¡Suerte!`);

    await bucleJuego();
}


async function bucleJuego() {
    const MI_CEDULA = "32857144"; 

    while (intentos > 0 && palabraMostrada.includes("_")) {
        console.log("\n" + "_ ".repeat(palabraSecreta.length));
        console.log(`Palabra: ${palabraMostrada.join(" ")}`);
        console.log(`Vidas: ${"❤️ ".repeat(intentos)}`);
        console.log(`Letras usadas: ${letrasUsadas.join(", ")}`);

        const entrada = await getUserInput("Introduce una letra (o cédula para salir):");

        if (entrada === MI_CEDULA) {
            console.log("\n[!] Saliendo del juego por identificación...");
            return rl.close(); 
        }

        const letra = entrada.toLowerCase();

        if (letrasUsadas.includes(letra)) {
            console.log(`\nYa has usado la letra '${letra}'. Prueba con otra.`);
            continue;
        }

        if (letra.length === 1) {
            letrasUsadas.push(letra);
        }

        if (palabraSecreta.includes(letra) && letra.length === 1) {
            console.log(`¡Bien! La letra '${letra}' es correcta.`);
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraMostrada[i] = letra;
                }
            }
        } else {
            intentos--;
            console.log(`¡QUE LASTIMA! La letra '${letra}' no está.`);
        }
    }


    if (intentos === 0) {
        derrotas++; 
        console.log("\n💀 GAME OVER. No tienes más vidas.");
        console.log(`La palabra era: ${palabraSecreta.toUpperCase()}`);
    } else if (!palabraMostrada.includes("_")) {
        victorias++;
        console.log("\n ¡EXCELENTE! Has adivinado la palabra.");
    }

    console.log(`\nMARCADOR ACTUAL -> Ganadas: ${victorias} | Perdidas: ${derrotas}`);

    const jugarOtraVez = (await getUserInput("\n¿Quieres jugar otra vez? (s/n)")).toLowerCase();
    
    if (jugarOtraVez === 's') {
        await startGame();
    } else {
        console.log(`\nGracias por jugar ${username}. Marcador final: ${victorias} - ${derrotas}`);
        rl.close();
    }
}