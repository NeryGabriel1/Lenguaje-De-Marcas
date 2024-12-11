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

}
/********************************************/
function cambio(origen) {
    // voy a hacer la inversa para dolar y luego cambiar las otras monedas
    let valor_origen = origen.value;
    let id = origen.id;
    let inicialDeMoneda = id.substring(id.length - 1);
    valoresIniciales[id] = valor_origen;

    let dolar = document.getElementById("cambio" + inicialDeMoneda + "D"); // Cambiamos el valor de Dolar
            if (valor_origen > 0) { 
               dolaar.value= parseFloat((1 / valor_origen))
             } else {
                dolar.value=0
            
            actualizarMonedas(dolar.value, inicialDeMoneda);
}}
/********************************************/
var vCambio = ["E", "Y", "L"];
function actualizarMonedas(valorNuevo, inicialDeMoneda, contenedor) {
    let id_des;
    //alert(inicialDeMoneda);
    vCambio.forEach((moneda) => {
        
            id_des = "cambio";
            if (moneda != inicialDeMoneda) {
                id_des += inicialDeMoneda + moneda;
                let cambio = document.getElementById(id_des);
                //alert(valoresIniciales[id_des]);
                let monedaActual = "cambioD" + moneda;
                //alert(valoresIniciales[monedaActual] + " * " + valorNuevo + " = " + valoresIniciales[id_des] * valorNuevo)
                cambio.value = parseFloat((valoresIniciales[monedaActual] * valorNuevo).toFixed(2));
            }
        

    })
}

function cargarContenedor1() {
    inputElements.forEach((inputOrigen)=> {
        inputOrigen.value = valoresIniciales[inputOrigen.id]; // || ''
        cambio(inputOrigen);
    });
    
   

}