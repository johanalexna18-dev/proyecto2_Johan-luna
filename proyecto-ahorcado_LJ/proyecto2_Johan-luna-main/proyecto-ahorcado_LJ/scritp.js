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
    "Abundante", "Brillante", "Castillo", "Cerebro", "Ciencia", "Compañía", "Complejo", "Corazón", 
    "Cuchillo", "Cuidado", "Cultura", "Decisión", "Desierto", "Destino", "Diámetro", "Discurso", 
    "Edificio", "Esfuerzo", "Estrecho", "Extraño", "Fábrica", "Familia", "Fortuna", "Galaxia", 
    "Gigante", "Guitarra", "Historia", "Horario", "Humilde", "Ilusión", "Impacto", "Infinito", 
    "Intento", "Invierno", "Justicia", "Lectura", "Libertad", "Maestro", "Montaña", "Objetivo", 
    "Orquesta", "Pantalla", "Pariente", "Pastilla", "Peligro", "Perfume", "Permiso", "Pintura", 
    "Planeta", "Plástico", "Poblado", "Poderoso", "Práctica", "Primero", "Proceso", "Promesa", 
    "Próximo", "Realidad", "Recuerdo", "Regreso", "Riqueza", "Salvaje", "Secreto", "Silencio", 
    "Símbolo", "Sistema", "Sonrisa", "Suspiro", "Tablero", "Talento", "Teclado", "Técnico", 
    "Tesoro", "Trabajo", "Tráfico", "Tristeza", "Universo", "Valiente", "Ventana", "Victoria", 
    "Voluntad", "Abrazadera", "Ajedrez", "Alimento", "Asombroso", "Aventura", "Bicicleta", "Cascada", 
    "Desarrollo", "Elegante", "Escritura", "Estrella", "Explorar", "Fragmento", "Gimnasio", "Identidad", 
    "Izquierda", "Juventud", "Laberinto", "Mariposa"
];


let palabraSecreta = "";
let intentos = 3; 
let palabraMostrada = [];
let victorias = 0;
let derrotas = 0;


startGame();

async function startGame(){
    if (!username) {
        username = await getUserInput("¿Cuál es tu nombre, jugador?");
    }

    
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    palabraMostrada = Array(palabraSecreta.length).fill("_");
    intentos = 3; 

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

        const entrada = await getUserInput("Introduce una letra (o cédula para salir):");

        if (entrada === MI_CEDULA) {
            console.log("\n[!] Saliendo del juego por identificación...");
            return rl.close(); 
        }

        const letra = entrada.toLowerCase();

        if (palabraSecreta.includes(letra) && letra.length === 1) {
            console.log(`¡Bien! La letra '${letra}' es correcta.`);
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraMostrada[i] = letra;
                }
            }
        } else {
            intentos--;
            console.log(`¡Error! La letra '${letra}' no está.`);
        }
    }


    if (intentos === 0) {
        derrotas++; 
        console.log("\n💀 GAME OVER. No tienes más vidas.");
        console.log(`La palabra era: ${palabraSecreta.toUpperCase()}`);
    } else if (!palabraMostrada.includes("_")) {
        victorias++;
        console.log("\n🏆 ¡GANASTE! Has adivinado la palabra.");
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