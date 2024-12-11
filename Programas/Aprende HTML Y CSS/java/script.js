let base_preguntas = readText("base-preguntas.json");
let interprete_bp = JSON.parse(base_preguntas);
let pregunta;

function escoger_pregunta(index){ 
    pregunta = interprete_bp[index];
    select_id("numpreguntas").innerHTML = pregunta.numpreguntas;
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    select_id("imagen").setAttribute("src", pregunta.imagen);
    select_id("imagen").objectFit = pregunta.objectFit;
    desordenarRespuestas(pregunta);
}


// Para seleccionar el elemento del DOM con su identificador "único"
function select_id(id){
    return document.getElementById(id);
}

// Para desordenar las respuestas.
function desordenarRespuestas(pregunta){
    let posiblesRespuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]
    posiblesRespuestas.sort(() => Math.random()-0.5);
    select_id("btn1").innerHTML = posiblesRespuestas[0];
    select_id("btn2").innerHTML = posiblesRespuestas[1];
    select_id("btn3").innerHTML = posiblesRespuestas[2];
    select_id("btn4").innerHTML = posiblesRespuestas[3];
}

// Función para procesar a texto nuestro documento JSON.
function readText(archivoJSON){
    var texto = null;
    var xmlhtpp = new XMLHttpRequest();
    //Abrimos una conección de manera síncrona 
    //para bloquear el programa hasta que se complete nuestra solicitud 
    xmlhtpp.open("GET", archivoJSON, false);
    //Enviamos la solicitud
    xmlhtpp.send();
    //Verificamos si nuestra solicitud HTTP fue exitosa
    if (xmlhtpp.status == 200){
        texto = xmlhtpp.responseText;
    }
    return texto;
}

// Variable para el puntaje del alumno
let puntaje = 0;
// Variable para controlar la cantidad de preguntas respondidas.
let preguntasRespondidas = 0;


let btn_corespondiente =[
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
]
function oprimir_btn(index){

    if (btn_corespondiente[index].innerHTML == pregunta.respuesta){
        puntaje++;
    }
    preguntasRespondidas++;


    // Si se han respondido todas las preguntas mostrarmos el puntaje final
    if (preguntasRespondidas === interprete_bp.length) {
        mostrarPuntajeFinal();
    } else {
        // Si hay más preguntas, cargar la siguiente.
        escoger_pregunta(preguntasRespondidas);
    }
}

function mostrarPuntajeFinal(){
    if (puntaje >= 5 && puntaje <= 10){
        alert(`Test completado. Felicidades aprobaste, tu puntaje final es: ${puntaje}/${interprete_bp.length}`);
    }else if (puntaje <5){
        alert(`Test completado. Lastima no has aprobado, tu puntaje final es: ${puntaje}/${interprete_bp.length}`);
    }
}

function iniciarTest(){
    escoger_pregunta(preguntasRespondidas);
}

// Llamada para iniciar el test
iniciarTest();