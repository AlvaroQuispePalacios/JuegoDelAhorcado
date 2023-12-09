// --------------------------CATEGORIAS ----------------------------------
const envoltorioPopUp = document.querySelector('.envoltorio-popup');
const categorias = document.querySelectorAll('.categoria');

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

function gestionarRespuesta(error, datos) {
    if (error) {
        console.log(error);
    } else {
        datos.forEach((dato) => {
            arrayPalabras.push(dato.nombre);
        });
        generarPalabraAleatoria(arrayPalabras);
        generarEspaciosPalabraAleatoria(palabraAleatoria);
        generarPalabraAleatoriaArray();
        generarPalabraAleatoriaArray();
        llenarArrayLetrasUsuario();
        mostrarEspaciosPalabraAleatoria();
        envoltorioPopUp.style = "display:none";
    }
}

// Se pueda elegir una palabra de esa categoria
categorias.forEach((categoria) => {
    categoria.addEventListener('click', () => {
        let rutaJsonCategoria = categoria.getAttribute('categoria');
        obtenerTODOS((error, datos) => {
            console.log("callback invocado 1");
            gestionarRespuesta(error, datos);
        }, rutaJsonCategoria);
    });
});

//---------------------------------PALABRA ALEATORIA----------------------------
const palabra = document.querySelector('.palabra');
const contenedorletras = document.querySelector('.contenedor_letras');
const letras = document.querySelectorAll('.letra');

let arrayPalabras = Array();
let palabraAleatoria = ""; //STRING; No hay necesidad de reiniciar ya que se sobreescribe en la funcion generarPalabraAleatoria
let espaciosPalabraAleatoria = ""; //STRING 
let palabraAleatoriaArray = Array();
// 
let arrayLetrasUsuario = Array();
// Palabra que se mostrara por pantalla se muestra las letras adivinadas por el usuario y __
let palabraUsuario = "";//Se mostrara por pantalla

function generarPalabraAleatoria(arrayPalabras) {
    let posicionAleatoria = Math.floor(Math.random() * arrayPalabras.length);
    palabraAleatoria = arrayPalabras[posicionAleatoria].toUpperCase();
    console.log(palabraAleatoria);
}

function generarEspaciosPalabraAleatoria(palabraAleatoria) {
    for (let i = 0; i < palabraAleatoria.length; i++) {
        console.log(palabraAleatoria.charAt(i));
        espaciosPalabraAleatoria += "__ ";
    }
    console.log(espaciosPalabraAleatoria);
}

function generarPalabraAleatoriaArray() {
    palabraAleatoriaArray = [...palabraAleatoria];
    console.log(palabraAleatoriaArray + "palabraAleatoriaArray");
}

function llenarArrayLetrasUsuario() {
    arrayLetrasUsuario = Array(palabraAleatoriaArray.length).fill("__ ");
}

function mostrarEspaciosPalabraAleatoria() {
    palabra.innerHTML = `<span class="palabra__letra">${espaciosPalabraAleatoria}</span>`;
}

function actualizarPalabra(letraElegida) {
    for (let i = 0; i < palabraAleatoriaArray.length; i++) {
        if (palabraAleatoriaArray[i] == letraElegida) {
            arrayLetrasUsuario[i] = letraElegida;
            palabraUsuario = arrayLetrasUsuario.join("");
            palabra.innerHTML = `<span class="palabra__letra">${palabraUsuario}</span>`;
        }
    }
}
// ------------------------INTENTOS Y ERRORES------------------------------------
const intentos = document.querySelector(".intentos");
const errores = document.querySelector(".errores");
let oportunidades = 6;
let erroresCometidos = 0;

function actualizarIntentos(oportunidades) {
    if (oportunidades >= 0) {
        intentos.textContent = oportunidades;
    }
}

function actualizarErrores() {
    erroresCometidos += 1;
    errores.textContent = `Has cometido ${erroresCometidos} errores`;
}

// -----------------------------CRONOMETRO---------------------------------
let contadorIniciarCronometro = 0;
let cronometro;
let miFecha = new Date();
const tiempoTranscurrido = document.querySelector(".tiempoTranscurrido");
miFecha.setHours(0, 0, 0, 0);
tiempoTranscurrido.textContent = "00:00:00";

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
const cuentaAtras = document.querySelector(".cuentaAtras");
let contadorIniciarCuentaAtras = 0;
let intervalo;
let tiempoRestante = 10;
function actualizarCuentaAtras(tiempoRestante) {
    cuentaAtras.textContent = `00:00:0${tiempoRestante}`;
  }
  
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
  
// --------------------------------LOCAL STORAGE--------------------------------
const palabraLS = document.querySelector('.palabraLS');
const numeroErrores = document.querySelector('.numeroErrores');
const tiempoTotal = document.querySelector('.tiempoTotal');

function leerPuntajes(){
    // Guardamos en el localstorage por primera vez el objeto que contendra las diferente puntuaciones por partida
    if(localStorage.getItem('estadistica')){
        let puntajes = JSON.parse(localStorage.getItem('estadistica'));
        console.log(puntajes);
        palabraLS.innerHTML = "";
        numeroErrores.innerHTML = "";
        tiempoTotal.innerHTML = "";
        puntajes.forEach((puntaje) => {
            palabraLS.innerHTML +=`<div>${puntaje.palabra}</div>`;
            numeroErrores.innerHTML += `<div>${puntaje.numeroErrores}</div>`;
            tiempoTotal.innerHTML += `<div>${puntaje.tiempoTotal}</div>`
        })
    }
}

function guardarPuntajePartida(){
    if(localStorage.getItem('estadistica')){
        let puntajes = JSON.parse(localStorage.getItem('estadistica'));
        console.log(puntajes);
        let puntaje = 
            {
                palabra: palabraAleatoria,
                numeroErrores: erroresCometidos,
                tiempoTotal: tiempoTranscurrido.textContent
            };
        puntajes.push(puntaje);
        localStorage.setItem("estadistica", JSON.stringify(puntajes));
    }else{
        if(palabraUsuario == palabraAleatoria){
            let puntaje = [
                {
                    palabra: palabraAleatoria,
                    numeroErrores: erroresCometidos,
                    tiempoTotal: tiempoTranscurrido.textContent
                }
            ];
            localStorage.setItem("estadistica", JSON.stringify(puntaje));
        }
    }
}

function actualizarPuntuaciones(){
    if(localStorage.getItem('estadistica')){
        let puntajes = JSON.parse(localStorage.getItem('estadistica'));
        puntajes.forEach((puntaje) => {
            palabraLS.innerHTML =`<div>${puntaje.palabra}</div>`;
            numeroErrores.innerHTML = `<div>${puntaje.numeroErrores}</div>`;
            tiempoTotal.innerHTML = `<div>${puntaje.tiempoTotal}</div>`
        })
    }
}

// ------------------------------JUEGO TERMINADO--------------------------------
function juegoTerminado() {
    letras.forEach((e) => {
        e.setAttribute('disabled', 'disabled');
    });
    // Detener el cronometro
    pararCrono();
    // Detener cuenta Atras
    pararCuentaAtras();
    // 
    guardarPuntajePartida();
    leerPuntajes();
    reiniciar.removeAttribute('hidden');
}

// 
contenedorletras.addEventListener('click', (e) => {
    if (e.target.classList.contains("letra")) {
        if (contadorIniciarCronometro < 1) {
            contadorIniciarCronometro += 1;
            iniciarCrono();
        }

        if(contadorIniciarCuentaAtras < 1){
            contadorIniciarCuentaAtras += 1;
            iniciarCuentraAtras();
        }else {
            resetCuentaAtras();
            iniciarCuentraAtras();
        }

        if (palabraAleatoriaArray.indexOf(e.target.textContent) !== -1) {
            e.target.className = "letra correcta";
            e.target.setAttribute('disabled', 'disabled');
            actualizarPalabra(e.target.textContent);
            if (palabraAleatoria == palabraUsuario) {
                juegoTerminado();
            }
        } else {
            oportunidades--;
            e.target.className = 'letra incorrecta';
            e.target.setAttribute('disabled', 'disabled');
            actualizarIntentos(oportunidades);
            errores.removeAttribute("hidden");
            actualizarErrores();
            if (oportunidades == 0) {
                juegoTerminado();
            }
        }

    }
});
//-------------------------------

//-------------------------------BOTON REINICIAR--------------------------------
const reiniciar = document.querySelector('.reiniciar');

function reiniciarJuegoAhorcado() {
    // 
    arrayPalabras = Array();
    espaciosPalabraAleatoria = "";
    palabraAleatoriaArray = Array();
    arrayLetrasUsuario = Array();
    palabraUsuario = "";
    letras.forEach((e) => {
        e.removeAttribute('disabled');
        e.className = 'letra';
    });
    // 
    oportunidades = 6;
    erroresCometidos = 0;
    reiniciar.setAttribute("hidden", "hidden");
    errores.setAttribute("hidden", "hidden");
    actualizarIntentos(oportunidades);
    // 
    reiniciarCronometro();
    contadorIniciarCronometro = 0;
    // 
    resetCuentaAtras();
    contadorIniciarCuentaAtras = 0;
    // 
    envoltorioPopUp.style = "display:block";
}

reiniciar.addEventListener('click', () => {
    reiniciarJuegoAhorcado();
});

window.addEventListener('reload', leerPuntajes());