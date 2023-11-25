/*
    - Generar palabra aleatoria
    - Generar los espacios con el tamaño de la palabra aleatoria y escribirlos en el html
    - Hacer que cuando se presione un boton con la letra esta letra sea comparada con las letras de la palabra y si son iguales cambiar de clase al boton a letra correcta y si en incorrecta a letra incorrecta
    - Hacer que cuando adivine una letra aparezca por pantalla reemplazando el espacio en blanco 
    - Cuando el usuario alcance el maximo de intentos las letras se bloquen para no poder ingresar mas, lo mismo si gana.
    - Cuando termine ya sea que gane o pierda aparezca un boton para reiniciar
*/

const arrayPalabras =  ["avion", "perro", "gato", "caballo", "edificio"];
let palabraAleatoria = generarPalabraAleatoria(arrayPalabras).toUpperCase();
let palabraAleatoriaArray = [...palabraAleatoria];

let oportunidades = 6;
console.log(palabraAleatoriaArray);

let arrayVacio = Array(palabraAleatoriaArray.length).fill('__ '); 
let palabraVacia = '';

const palabra = document.querySelector('.palabra');
const contenedorLetras = document.querySelector('.contenedor_letras');
const letras = document.querySelectorAll('.letra');
const intentos = document.querySelector('.intentos');
const reiniciar = document.querySelector('.reiniciar');


function generarPalabraAleatoria(arrayPalabras){
    let numeroAleatorio = Math.floor(Math.random() * arrayPalabras.length);
    return arrayPalabras[numeroAleatorio];
}

// Genera la cantidad de espacios en blanco como el tamaño de la palabra y la muestra por pantalla
function generarEspaciosPalabraAleatoria(){
    for(let i = 0; i < palabraAleatoriaArray.length; i++){
        palabraVacia += '__ '; 
    }
    palabra.innerHTML += `<span class="palabra__letra">${palabraVacia}</span>`;

}

// Actualiza la palabra con las letras acertadas y las muestra por pantalla
function actualizarPalabra(letra){
    for(let i = 0; i < palabraAleatoriaArray.length; i++){
        if(palabraAleatoriaArray[i] == letra){
            // Si la letra aparece en la palabra la reemplaza en el array que contiene ( __ ) y reemplaza la letra en la posicion en la que se encuentra en la palabra, luego este array lo guardamos en una variable convertido en un string y lo mostramos por pantalla
            arrayVacio[i] = letra;
            palabraVacia = arrayVacio.join('');
            palabra.innerHTML = `<span class="palabra__letra">
                ${palabraVacia}
            </span>`;
        }
    }
}

// Actualizar los intentos por pantalla
function actualizarIntentos(oportunidades){
    intentos.textContent = oportunidades;
}

// Una vez se acaba el juego ya sea que ganaste o perdiste desactiva las letras 
function juegoTerminado(){
    // recorre los objetos del nodeList 
    letras.forEach((e) => {
        e.setAttribute('disabled','disabled');
    });
    
    reiniciar.removeAttribute('hidden');
    
}

function reiniciarJuego(){
    oportunidades = 6;
    
    juego();
}

function juego(){
    generarEspaciosPalabraAleatoria(palabraAleatoria);
    contenedorLetras.addEventListener('click', (e) =>{
        
        if(e.target.classList.contains('letra')){
            if(palabraAleatoriaArray.indexOf(e.target.textContent) !== -1){
                
                e.target.className = 'letra correcta';
                e.target.setAttribute('disabled','disabled');
    
                actualizarPalabra(e.target.textContent);
    
                // Si la palabra generada es igual a la palabraVacia(Que contiene lo que adivino el usuario) significa que gano
                if(palabraAleatoria == palabraVacia){
                    juegoTerminado();
                    console.log(oportunidades);
                }
                console.log();
    
            }else{
                
                oportunidades--;
                e.target.className = 'letra incorrecta';
                e.target.setAttribute('disabled','disabled');
    
                actualizarIntentos(oportunidades);
    
                if(oportunidades == 0){
                    juegoTerminado();
                    console.log(oportunidades);
                }
            }
        }
    
    });

    
}

juego();
