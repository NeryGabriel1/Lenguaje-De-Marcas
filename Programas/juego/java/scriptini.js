var nfc = parseInt(prompt("Dime el numero "));
var posi = nfc * nfc;
var filas = (nfc * 2) + 2;
var turno = true;
var jugadores = [0, 0];
var juegoiniciado = false
var validas = matrizBidimensional(filas, nfc);
rellenar();
var jugadas = matrizBidimensional(nfc, nfc);
rellenarCeros();
/***********************************/
function matrizBidimensional(f, c) {
    let tb = new Array(f);
    for (let i = 0; i < f; i++)tb[i] = new Array(c);
    return tb;
}
/***********************************/
function rellenarCeros() {
    for (let i = 0; i < jugadas.length; i++)jugadas[i].fill(0);
}
/***********************************/
function rellenar() {
    let c = 0;
    for (let i = 0; i < nfc; i++) {
        validas[filas-2][i] = (i * nfc) + (i + 1);
        validas[filas-1][i] = (i * nfc) + (nfc - i);
        for (let j = 0; j < nfc; j++) {
            validas[c][j] = (i * nfc) + (j + 1);
            validas[c + nfc][j] = (j * nfc) + (i + 1);
        }
        c++;
    }
}
/***********************************/
function reiniciar() {
    var destino = document.getElementById("marco1990");
    for (i = 1; i <= posi; i++)document.getElementById("imagen_" + i).src = "./img/numeros/fondo.jpg";
    document.getElementById("mensaje").innerHTML = "Juego sin comenzar";
    document.getElementById("inicio").innerHTML = "Inicio Juego";
    turno = true;
    jugadores = [0, 0];
    juegoiniciado = false
    rellenarCeros();
}
/***********************************/
function inicial() {
    const y=100;
    var destino = document.getElementById("marco1990");
    destino.style.width = (nfc * y) + "px";
    document.getElementById("mensaje").style.width = (nfc * y) + "px";
    document.getElementById("inicio").style.width = (nfc * y) + "px";

    for (i = 1; i <= posi; i++)ponimagen(destino, "imagen_" + i,y);
    document.getElementById("inicio").addEventListener("click", () => { start(); })
}
/***********************************/
function ponimagen(des, id,ancho) {
    var elem = document.createElement("img");
    elem.setAttribute("src", "./img/numeros/fondo.jpg");
    elem.setAttribute("height", ancho);
    elem.setAttribute("width", ancho);
    elem.setAttribute("id", id);
    des.appendChild(elem);

    var ori = document.getElementById(id);

    ori.addEventListener("dblclick", function () { cambio(ori); });
}
/***********************************/
function start() {
    juegoiniciado = true;
    document.getElementById("mensaje").innerHTML = "Turno de Jugador:1";
    document.getElementById("inicio").innerHTML = "Juego Iniciado";
}
/***********************************/
function cambio(origen) {

    if (!juegoiniciado) return;
    let n = obtener_numero(origen.id);
    let c = (n - 1) % nfc
    let r = parseInt((n - 1) / nfc)

    if (jugadas[r][c] != 0) return;
    w = turno == true ? 1 : 2;

    origen.src = "./img/numeros/numero_" + w + ".png";
    jugadas[r][c] = w;
    jugadores[w - 1]++;

    if (jugadores[w - 1] >= nfc) {
        gano = comprueba(w);
        if (gano) {
            setTimeout(function () {
                alert("Gano el " + w);
                reiniciar();
                return;
            }, 200);
        }
    }
    if (jugadores[0] + jugadores[1] == posi) {
        setTimeout(function () {
            alert("Empatados");
            reiniciar();
        }, 200);
    }
    turno = !turno;
    document.getElementById("mensaje").innerHTML = turno == true ? "Turno de Jugador:1" : "Turno de Jugador:2";
}
/***********************************/
function comprueba(numero) {
    let m = 0; let c = 0; let r = 0;

    for (let i = 0; i < validas.length; i++) {
        let n = 0;
        for (let j = 0; j < validas[i].length; j++) {
            m = validas[i][j];
            c = (m - 1) % nfc;
            r = parseInt((m - 1) / nfc);

            if (jugadas[r][c] == numero) n++
        }
        if (n == nfc) return true;
    }
    return false;
}
/***********************************/
function obtener_numero(cadena) {
    return cadena.substr(cadena.indexOf("_") + 1);
}
/***********************************/
window.addEventListener("load", () => { inicial(); });