window.addEventListener("load", () => { inicio(); });
const valoresIniciales = { 'cambioDE': 0.93, 'cambioDY': 155.78, 'cambioDL': 0.8 };
//const inputElements = document.querySelectorAll('input[type="text"]');
const inputElements = document.querySelectorAll('.input_inicial')

function inicio() {
    cargarValoresIniciales();
}

function cargarValoresIniciales() {
    cargarContenedor1();
    /***************/
    let euro = document.getElementById("cambioDE");
    let contenedor = 1;
    euro.addEventListener("input", () => { cambio(euro); });
    // ahora yen
    let yen = document.getElementById("cambioDY");
    yen.addEventListener("input", () => { cambio(yen); });
    // ahora yen
    let libra = document.getElementById("cambioDL");
    libra.addEventListener("input", () => { cambio(libra); });

    // cargamos select
    cargarSelects();
    /*
    // ahora los botones de suma
    let botonSumarDolar = document.getElementById("sumar_D");
    botonSumarDolar.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonSumarDolar)});
    // euro
    let botonSumarEuro = document.getElementById("sumar_E");
    botonSumarEuro.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonSumarEuro)});
    // yen
    let botonSumarYen = document.getElementById("sumar_Y");
    botonSumarYen.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonSumarYen)});
    // libra
    let botonSumarLibra = document.getElementById("sumar_L");
    botonSumarLibra.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonSumarLibra)});*/

    /*****************Ahora los botones de reta**********************/
    /* dolar
    let botonRestarDolar = document.getElementById("restar_D");
    botonRestarDolar.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonRestarDolar)});
    // euro
    let botonRestarEuro = document.getElementById("restar_E");
    botonRestarEuro.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonRestarEuro)});
    // yen
    let botonRestarYen = document.getElementById("restar_Y");
    botonRestarYen.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonRestarYen)});
    // libra
    let botonRestarLibra = document.getElementById("restar_L");
    botonRestarLibra.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonRestarLibra)});*/

    /************** Para resetear **********************/
    escucharBotones();
    escucharInputs();
    let botonReset = document.getElementById("limpiar");
    botonReset.addEventListener("click", ()=>{resetear();});

    let form = document.getElementById("contenedor2");
    form.addEventListener("reset", () => { setTimeout(valorSelectPredeterminado_a_cero, 0); });
}
/********************************************/
function cambio(origen) {
    // voy a hacer la inversa para dolar y luego cambiar las otras monedas
    let valor_origen = origen.value;
    let id = origen.id;
    let inicialDeMoneda = id.substring(id.length - 1);
    valoresIniciales[id] = valor_origen;

    let dolar = document.getElementById("cambio" + inicialDeMoneda + "D"); // Cambiamos el valor de Dolar
    dolar.value = parseFloat(valor_origen) > 0 ? parseFloat((1 / valor_origen).toFixed(2)) : 0;
    actualizarMonedas(dolar.value, inicialDeMoneda, 1);
}
/********************************************/
var vCambio = ["E", "Y", "L"];
function actualizarMonedas(valorNuevo, inicialDeMoneda, contenedor) {
    let id_des;
    //alert(inicialDeMoneda);
    vCambio.forEach((moneda) => {
        if (contenedor === 1) {
            id_des = "cambio";
            if (moneda != inicialDeMoneda) {
                id_des += inicialDeMoneda + moneda;
                let cambio = document.getElementById(id_des);
                //alert(valoresIniciales[id_des]);
                let monedaActual = "cambioD" + moneda;
                //alert(valoresIniciales[monedaActual] + " * " + valorNuevo + " = " + valoresIniciales[id_des] * valorNuevo)
                cambio.value = parseFloat((valoresIniciales[monedaActual] * valorNuevo).toFixed(2));
            }
        }else{
            if (moneda != inicialDeMoneda){
                let id_des = moneda;
                let inputDestino = document.getElementById(id_des);
                let cambioActual = "cambioD" + moneda;
                inputDestino.value = parseFloat((valoresIniciales[cambioActual] * valorNuevo).toFixed(2)); 
            }
        }

    })
}

function cargarContenedor1() {
    inputElements.forEach((inputOrigen)=> {
        inputOrigen.value = valoresIniciales[inputOrigen.id]; // || ''
        cambio(inputOrigen);
    });
    
   
}
/****************************Parte del contenedor 2*************************/
var sCambio = ["D", "E", "Y", "L"];
function cargarSelects() {
    sCambio.forEach((moneda) => {
        let id_destino = "s_" + moneda;
        let select = document.getElementById(id_destino);
        for (let i = -2; i <= 2; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", i);
            option.text = i;
            select.appendChild(option);
        }
        valorSelectPredeterminado_a_cero();
        select.addEventListener("change", () => { actualizarMonedaInputContenedor2(select, "select");});

    })
}

function valorSelectPredeterminado_a_cero(){
    sCambio.forEach((moneda)=>{
        let selectPredeterminado = document.getElementById("s_" + moneda);
        selectPredeterminado.value = 0;
        selectPredeterminado.text = 0;
    });
}
/****************************************************** */
function actualizarMonedaInputContenedor2(origen, tipoDeAccion) {
    let id_origen = origen.id;
    let valorOrigen = (origen.value);
    //alert(valorOrigen);

    let id_destino = (id_origen).substring(id_origen.length - 1);
    let inputMoneda = document.getElementById(id_destino);
    let valorInput = parseFloat(inputMoneda.value);
    
    //alert("Id destino " + id_destino);
    if (tipoDeAccion != "input"){
        inputMoneda.value = parseFloat((valorInput + parseFloat(valorOrigen)).toFixed(2));
    }else{
        //alert("Es un input");
        inputMoneda.value = (valorOrigen < 0 || isNaN(valorOrigen)) ? 0: parseFloat(valorOrigen);

    }
    //alert("Nuevo valor de input " + inputMoneda.value);
    // ahora tenemos que recalcular los otros valores
    let conversorConedor1 = "cambioD" + inputMoneda.id;
    cambioDolar((inputMoneda.value),inputMoneda.id ,conversorConedor1);
}

function cambioDolar(inputOrigenValor, id_origen, id_conversor ) {
    let inputDolar = document.getElementById("D");

    if (id_origen != "D"){
        inputDolar.value = parseFloat((inputOrigenValor / valoresIniciales[id_conversor]).toFixed(2));
        //alert("pasado a dolar " + inputDolar.value);
    }else{
        //alert(id_origen);
        inputDolar.setAttribute("value", inputOrigenValor);
    }
    actualizarMonedas(inputDolar.value, inputDolar.id, 2);
}

var todasLasMonedas = ["D","E","Y","L"];
function escucharBotones(){
    todasLasMonedas.forEach((moneda) =>{
        let botonSumar = document.getElementById("sumar_" + moneda);
        botonSumar.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonSumar, "boton")});

        let botonRestar = document.getElementById("restar_" + moneda);
        botonRestar.addEventListener("click", ()=>{actualizarMonedaInputContenedor2(botonRestar, "boton")});
        
    })
}

function escucharInputs(){
    todasLasMonedas.forEach((moneda) =>{
        let inputMoneda = document.getElementById(moneda);
        //alert("Identificador del input " + inputMoneda.id);
        inputMoneda.addEventListener("input", ()=>{actualizarMonedaInputContenedor2(inputMoneda, "input");});
    })
}

/***********************************función para resetear****************************/
function resetear(){
    let input;
    todasLasMonedas.forEach((moneda)=>{
        input = document.getElementById(moneda);
        input.setAttribute("value", 0);
    });
    //document.getElementById("D").setAttribute("value", 0);
}