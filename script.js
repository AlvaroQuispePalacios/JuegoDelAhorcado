/*
    - Generar palabra aleatoria
    - Generar los espacios con el tamaño de la palabra aleatoria y escribirlos en el html
    - Hacer que cuando se presione un boton con la letra esta letra sea comparada con las letras de la palabra y si son iguales cambiar de clase al boton a letra correcta y si en incorrecta a letra incorrecta
    - Hacer que cuando adivine una letra aparezca por pantalla reemplazando el espacio en blanco 
    - Cuando el usuario alcance el maximo de intentos las letras se bloquen para no poder ingresar mas, lo mismo si gana.
    - Cuando termine ya sea que gane o pierda aparezca un boton para reiniciar
    - Agregar cuenta regresiva, agregarle 10 segundos por cada letra, al intentar adivinar una letra tendra 10 segundos, pasados estos 10 segundos se le restara una oportunidad, si adivina un letra el contador vuelve a 10
*/
const obtenerTODOS = (miCallback, source) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
    // 4 significa que ha terminado la peticion
    // El 200 significa si ha tenido una respuesta exitosa(successful responses)
    if (request.readyState === 4 && request.status === 200) {
      const respuesta = JSON.parse(request.responseText);
      miCallback(undefined, respuesta);
    } else if (request.readyState === 4) {
      miCallback("No se han podido obtener los datos", undefined);
    }
  });

  request.open("GET", source);
  request.send();
};

const envoltorioPopUp = document.querySelector('.envoltorio-popup');
const categorias = document.querySelectorAll('.categoria');

// elegirEntreCategorias();

function elegirEntreCategorias(){
    categorias.forEach((categoria) => {
        categoria.addEventListener('click', () => {
            let categoriaElegida = categoria.getAttribute('categoria');
            elegirCategoria(categoriaElegida);
            envoltorioPopUp.style="display:none";
        })
    })
}


function elegirCategoria(categoria){
  // callback llama a esta funcion
  obtenerTODOS((error, datos) => {
    console.log("callback invocado 1");
    gestionarRespuesta(error, datos);
    jugarAhorcado();
  }, categoria);
  
  
}

function gestionarRespuesta(error, datos) {
  if (error) {
    console.log(error);
  } else {
    datos.forEach((palabra) => {
        arrayPalabras.push(palabra.nombre);
        palabraAleatoria = generarPalabraAleatoria(arrayPalabras).toUpperCase();
        palabraAleatoriaArray = [...palabraAleatoria];
        arrayVacio = Array(palabraAleatoriaArray.length).fill("__ ")
    });
    generarEspaciosPalabraAleatoria(palabraAleatoria);
    console.log(palabraAleatoria);
    
    // jugarAhorcado();
  }
}

elegirEntreCategorias();


// ----------------------VARIABLES PALABRA ALEATORIA
const arrayPalabras = Array();
let palabraAleatoria;
let palabraAleatoriaArray;
let arrayVacio;
let palabraVacia = "";
console.log(arrayPalabras);


//---------------------- VARIABLES CUENTA ATRAS---------------------------
let contadorIniciarCuentaAtras = 0;
let intervalo;
let tiempoRestante = 10;

// ---------------------------VARIABLES CRONOMETRO--------------------------

let contadorIniciarCronometro = 0;
let cronometro;
let miFecha = new Date();
const tiempoTranscurrido = document.querySelector(".tiempoTranscurrido");
miFecha.setHours(0, 0, 0, 0);
tiempoTranscurrido.textContent = "00:00:00";

let oportunidades = 6;
let erroresCometidos = 0;

const palabra = document.querySelector(".palabra");
const contenedorLetras = document.querySelector(".contenedor_letras");
const letras = document.querySelectorAll(".letra");
const intentos = document.querySelector(".intentos");
const reiniciar = document.querySelector(".reiniciar");
const cuentaAtras = document.querySelector(".cuentaAtras");
const errores = document.querySelector(".errores");

// -----------------------FUNCIONES-------------------------------------

// --------------------FUNCIONES PARA PALABRA ALEATORIA------------------
function generarPalabraAleatoria(arrayPalabras) {
  let numeroAleatorio = Math.floor(Math.random() * arrayPalabras.length);
  return arrayPalabras[numeroAleatorio];
}

// Genera la cantidad de espacios en blanco como el tamaño de la palabra y la muestra por pantalla
function generarEspaciosPalabraAleatoria() {
  for (let i = 0; i < palabraAleatoriaArray.length; i++) {
    palabraVacia += "__ ";
  }

  palabra.innerHTML = `<span class="palabra__letra">${palabraVacia}</span>`;
}

// Actualiza la palabra con las letras acertadas y las muestra por pantalla
function actualizarPalabra(letra) {
  for (let i = 0; i < palabraAleatoriaArray.length; i++) {
    if (palabraAleatoriaArray[i] == letra) {
      // Si la letra aparece en la palabra la reemplaza en el array que contiene ( __ ) y reemplaza la letra en la posicion en la que se encuentra en la palabra, luego este array lo guardamos en una variable convertido en un string y lo mostramos por pantalla
      arrayVacio[i] = letra;
      palabraVacia = arrayVacio.join("");
      palabra.innerHTML = `<span class="palabra__letra">
                ${palabraVacia}
            </span>`;
    }
  }
}

// ---------------------------------------------------------------
// Actualizar los intentos por pantalla
function actualizarIntentos(oportunidades) {
  if (oportunidades >= 0) {
    intentos.textContent = oportunidades;
  }
}

function actualizarErrores() {
  erroresCometidos += 1;
  errores.textContent = `Has cometido ${erroresCometidos} errores`;
}

// ---------------------------------CRONOMETRO--------------------------

function crono() {
  let segundos = miFecha.getSeconds();
  let minutos = miFecha.getMinutes();
  let horas = miFecha.getHours();

  segundos += 1;

  if (segundos == 60) {
    segundos = 0;
    minutos += 1;

    miFecha.setMinutes(minutos);
  }
  miFecha.setSeconds(segundos);

  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  tiempoTranscurrido.textContent = `${horas}:${minutos}:${segundos}`;
}

function reiniciarCronometro() {
  miFecha.setHours(0, 0, 0, 0);
  tiempoTranscurrido.textContent = "00:00:00";
}

function iniciarCrono() {
  cronometro = setInterval(crono, 1000);
}

function pararCrono() {
  clearInterval(cronometro);
}

// ---------------------------------CUENTA ATRAS-----------------------
// actualiza el contador con la cuenta atras
function actualizarCuentaAtras(tiempoRestante) {
  cuentaAtras.textContent = `00:00:0${tiempoRestante}`;
}

//
function iniciarCuentraAtras() {
  intervalo = setInterval(() => {
    tiempoRestante -= 1;
    actualizarCuentaAtras(tiempoRestante);

    if (tiempoRestante == 0) {
      oportunidades -= 1;
      actualizarIntentos(oportunidades);
      resetCuentaAtras();
      iniciarCuentraAtras();
    }

    if (oportunidades < 0) {
      clearInterval(intervalo);
      juegoTerminado();
    }
  }, 1000);
}

function resetCuentaAtras() {
  clearInterval(intervalo);
  tiempoRestante = 9;
  actualizarCuentaAtras(tiempoRestante);
}

function pararCuentaAtras() {
  clearInterval(intervalo);
}

// Una vez se acaba el juego ya sea que ganaste o perdiste desactiva las letras

function juegoTerminado() {
  // recorre los objetos del nodeList
  letras.forEach((e) => {
    e.setAttribute("disabled", "disabled");
  });
  // Detener el cronometro
  pararCrono();
  // Detener cuenta Atras
  pararCuentaAtras();

  reiniciar.removeAttribute("hidden");
}

function reiniciarJuego() {
  /*
        - Oportunidades = 6
        - Que las letras se puedan presionar de nuevo
        - Reiniciar las letras sin que haya correcta o incorrecta
        - Hacer que se esconda de nuevo el boton de reiniciar
        - Actualizar los intentos en la pantalla
        - Generar una nueva palabra para adivinar
        - Reiniciar el cronometro a cero
    */
  //
  oportunidades = 6;
  erroresCometidos = 0;
  //
  letras.forEach((e) => {
    e.removeAttribute("disabled");
    e.className = "letra";
  });

  //
  reiniciar.setAttribute("hidden", "hidden");
  errores.setAttribute("hidden", "hidden");
  //
  actualizarIntentos(oportunidades);

  //
//   palabraAleatoria = generarPalabraAleatoria(arrayPalabras).toUpperCase();
//   palabraAleatoriaArray = [...palabraAleatoria];
//   arrayVacio = Array(palabraAleatoriaArray.length).fill("__ ");
  palabraVacia = "";
  console.log(palabraAleatoria);

  // Genera una nueva palabra
//   generarEspaciosPalabraAleatoria(palabraAleatoria);

  // Reinicia el cronometro a 0, el contador para poder iniciar el cronometro en una nueva partida y actualizar el cronometro para que este en 00:00:00
  reiniciarCronometro();
  contadorIniciarCronometro = 0;

  //
  resetCuentaAtras();
  contadorIniciarCuentaAtras = 0;

    //
    envoltorioPopUp.style = "display:block";
    elegirEntreCategorias();
}

// Primera vez que se inicie el juego

// generarEspaciosPalabraAleatoria(palabraAleatoria);
// ------------------------JUGAR POR CLICKS---------------------------
function jugarAhorcado(){

    contenedorLetras.addEventListener("click", (e) => {
      // Comprobar que sea presionado las letras y no el contenedor de estas
      if (e.target.classList.contains("letra")) {
        // Comprobar que el cronometro se inicie solo una vez al presionar una letra
        if (contadorIniciarCronometro < 1) {
          contadorIniciarCronometro += 1;
          iniciarCrono();
        }
        
        // Al presionar un boton iniciamos la cuenta atras, si se presiona otra letra reinicia el contador para la nueva letra
        if (contadorIniciarCuentaAtras < 1) {
          contadorIniciarCuentaAtras += 1;
          iniciarCuentraAtras();

        }else {
            resetCuentaAtras();
            iniciarCuentraAtras();
        }
    
        // Si en la array de palabras se encuentra alguna letra que el usuario introdujo hace esto
        if (palabraAleatoriaArray.indexOf(e.target.textContent) !== -1) {
          console.log(e.target.textContent);
          e.target.className = "letra correcta";
          e.target.setAttribute("disabled", "disabled");
    
          actualizarPalabra(e.target.textContent);
    
          // Si la palabra generada es igual a la palabraVacia(Que contiene lo que adivino el usuario) significa que gano
          if (palabraAleatoria == palabraVacia) {
            juegoTerminado();
            console.log(oportunidades);
          }
        } else {
          oportunidades--;
          e.target.className = "letra incorrecta";
          e.target.setAttribute("disabled", "disabled");
    
          actualizarIntentos(oportunidades);
          errores.removeAttribute("hidden");
          actualizarErrores();
    
          if (oportunidades == 0) {
            juegoTerminado();
            console.log(oportunidades);
          }
        }
      }
    });
}

reiniciar.addEventListener("click", reiniciarJuego);
