/*
    - Generar palabra aleatoria
    - Generar los espacios con el tamaño de la palabra aleatoria y escribirlos en el html
    - Hacer que cuando se presione un boton con la letra esta letra sea comparada con las letras de la palabra y si son iguales cambiar de clase al boton a letra correcta y si en incorrecta a letra incorrecta
    -Hacer que cuando adivine una letra aparezca por pantalla reemplazando el espacio en blanco 

*/

const arrayPalabras =  ["avion", "perro", "gato", "caballo", "edificio"];
const palabraAleatoria = generarPalabraAleatoria(arrayPalabras).toUpperCase();
const palabraAleatoriaArray = [...palabraAleatoria];

console.log(palabraAleatoriaArray);

const arrayVacio = Array(palabraAleatoriaArray.length).fill('__');

const palabra = document.querySelector('.palabra');
const contenedorLetras = document.querySelector('.contenedor_letras');



function generarPalabraAleatoria(arrayPalabras){
    let numeroAleatorio = Math.floor(Math.random() * arrayPalabras.length);
    return arrayPalabras[numeroAleatorio];
}

function generarEspaciosPalabraAleatoria(){
    palabra.innerHTML += `<span class="palabra__letra">${arrayVacio}</span>`;
}

function actualizarPalabra(letra){
    for(let i = 0; i < palabraAleatoriaArray.length; i++){
        if(palabraAleatoriaArray[i] == letra){
            arrayVacio[i] = letra;
            palabra.innerHTML = `<span class="palabra__letra">
                ${arrayVacio}
            </span>`;
        }
    }
}

contenedorLetras.addEventListener('click', (e) =>{
    
    if(e.target.classList.contains('letra')){

        if(palabraAleatoriaArray.indexOf(e.target.textContent) !== -1){
            console.log(palabraAleatoriaArray.indexOf(e.target.textContent));
            e.target.className = 'letra correcta';
            e.target.setAttribute('disabled','disabled');

            actualizarPalabra(e.target.textContent);
        }else{
            console.log("incorrecto");
            e.target.className = 'letra incorrecta';
            e.target.setAttribute('disabled','disabled');
        }

        /* 
            FUNCIONA

            if(palabraAleatoriaArray.includes(e.target.textContent)){
                console.log(e.target.textContent);
                e.target.className = 'letra correcta';
                e.target.setAttribute('disabled','disabled');
            }else {
                console.log("La letra no esta");
                e.target.className = 'letra incorrecta';
                e.target.setAttribute('disabled','disabled');
            }
        */

        //Me sale un erro al agregar las clases
        // palabraAleatoriaArray.forEach((letra) => {
        //     if(letra == e.target.textContent){
        //         e.target.className = 'letra correcta';
                
        //     }else{
        //         e.target.className = 'letra incorrecta';
        //     }   
        // })

        // if(palabraAleatoriaArray.indexOf(e.target.textContent, 0)){
        //     console.log();
        // }
        // for(let i = 0; i < palabraAleatoriaArray.length; i++){
        //     if(palabraAleatoriaArray[i] === e.target.textContent){
        //         console.log("correcto");
        //         e.target.className = 'letra correcta';
        //         e.target.setAttribute('disabled','disabled');
        //     }else{
        //         e.target.className = 'letra incorrecta';
        //     }
        // }
    }


});

generarEspaciosPalabraAleatoria(palabraAleatoria);