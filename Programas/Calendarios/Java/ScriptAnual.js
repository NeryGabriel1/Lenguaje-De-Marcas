/*============================================================================*/
var arrayMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var semana = ["L", "M", "X", "J", "V", "S", "D"];

/*============================================================================*/
function inicio() {
    ponaños();
}
/*============================================================================*/
function cabecera(vmes) {
    var cadena = "";
    cadena += "<CAPTION> " + arrayMeses[vmes] + "</CAPTION>";
    cadena += "<thead>";
    cadena += "<tr>";
    for (var i = 0; i < semana.length; i++) {
        cadena += "<th> " + semana[i] + "</th>";
    }
    cadena += "</tr>";
    cadena += "</thead>";
    return cadena;
}
/*============================================================================*/
function ponaños() {
    var destino = document.getElementById("divaños");
    var fecha = new Date();  // Fecha del sistema
    var anno = fecha.getFullYear();   // Año con 4 cifras

    var annos = document.createElement("select");
    annos.setAttribute("id", "cbaños");
    destino.appendChild(annos);
    annos.addEventListener("change", () => { cambio(); })

    for (var i = 0; i <= 50; i++) {
        var op = document.createElement("option");
        op.setAttribute("value", anno + i);
        op.text = anno + i;
        annos.appendChild(op);
    }
}
/*============================================================================*/
function cambio() {
    var anno = document.getElementById("cbaños").value;

    var inicio = "<div class='grupo-meses'>";
    for (var mes = 0; mes < arrayMeses.length; mes++) {
        inicio += "<div>";
        inicio += generarCalendario(anno, mes);
        inicio += "</div>";
    }
    inicio += "</div>";
    document.getElementById("calendario").innerHTML = inicio;
}
/*============================================================================*/
function generarCalendario(anno, mes) {
    var fecha = new Date(anno, mes, 1);
    var inicio = "<table border=1 align='center'>";
    inicio += cabecera(mes);


    var fecha = new Date(anno, mes, 1);
    var nweek = fecha.getDay();
    nweek--;
    if (nweek == -1) nweek = 6;

    var cadena = "<tbody><tr>"
    for (var i = 1; i <= nweek; i++) cadena += "<td>&nbsp;</td>";


    var mes = fecha.getMonth();   //nº mes 0-11;

    while (fecha.getMonth() == mes) {

        cadena += "<td>" + fecha.getDate() + "</td>";
        if (nweek == 6) cadena += "</tr><tr>"
        fecha.setDate(fecha.getDate() + 1);
        nweek = fecha.getDay();
        nweek--;
        if (nweek == -1) nweek = 6;
    }
    while(nweek < 7 && nweek != 0){
        cadena += "<td></td>";
        nweek++;
    }
    cadena += "</tr></tbody></table>";
    return inicio + cadena;
}
/*============================================================================*/
window.addEventListener("load", () => { inicio(); });