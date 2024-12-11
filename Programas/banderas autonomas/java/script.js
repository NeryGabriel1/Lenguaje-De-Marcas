var provincias = [
    ["Almería", "Cádiz", "Córdoba", "Granada", " Huelva", "Jaén", "Málaga", "Sevilla"],
    ["Huesca", "Teruel", "Zaragoza"],
    ["El Hierro", "Fuerteventura", "Gran Canaria", "La Gomera", "La Palma", "Lanzarote", "Tenerife"],
    ["Cantabria/Santander"],
    ["Avila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"],
    ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
    ["Barcelona", "Girona", "Lleida", "Tarragona"],
    ["Ceuta y Melilla"],
    ["Madrid"],
    ["Navarra/Pamplona"],
    ["Alicante", "Castellón", "Valencia"],
    ["Badajoz", "Cáceres"],
    ["La Coruña", "Lugo", "Orense", "Pontevedra"],
    ["Formentera", "Ibiza", "Mallorca", "Menorca"],
    ["La Rioja/Logroño"],
    ["Alava", "Guipúzcoa", "Vizcaya"],
    ["Asturias/Oviedo"],
    ["Murcia"]];

var cautonomas = ["Andalucía",
    "Aragón",
    "Canarias",
    "Cantabria",
    "Castilla y León",
    "Castilla la Mancha",
    "Cataluña",
    "Ceuta",
    "Comunidad de Madrid",
    "Comunidad de Navarra",
    "Comunidad Valenciana",
    "Extremadura",
    "Galicia",
    "Islas Baleares",
    "La Rioja",
    "Pais Vasco",
    "Principado de Asturias",
    "Region de Murcia"];

var activa;

/*************************************************************************************/
function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}
/*************************************************************************************/
function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}
/*************************************************************************************/
function cargar() {
    var destino = document.getElementById("marco1990");
    for (i = 0; i < cautonomas.length; i++)ponimagen(i, destino);
    activa=10;
    cambio(document.getElementById("imagen_10"))
}
/*************************************************************************************/
function ponimagen(ni, des) {
    var elem = document.createElement("img");
    elem.setAttribute("src", "banderas/" + cautonomas[ni] + ".gif");
    elem.setAttribute("height", "50");
    elem.setAttribute("width", "50");
    elem.setAttribute("id", "imagen_" + ni);
    des.appendChild(elem);

    var ori = document.getElementById("imagen_" + ni);

    ori.addEventListener("click", function () { cambio(ori); });
}
/*************************************************************************************/
function cambio(des) {
    var destino = des.id;
    var n = destino.substring(destino.indexOf("_") + 1);
    document.getElementById("comunidad").innerHTML = cautonomas[n];

    var h = document.getElementById("sprovincias");

    while (h.hasChildNodes()) {
        h.removeChild(h.firstChild);
    }
    var vector = provincias[n];
    var a;
    for (i = 0; i < vector.length; i++) {
        a = document.createElement('option');
        a.text = vector[i];
        a.value = vector[i];
        h.add(a);
    }
    removeClass(document.getElementById("imagen_"+activa),"quitar");
    addClass(document.getElementById("imagen_"+n),"quitar");
    activa=n;

}

/*************************************************************************************/
window.addEventListener("load", () => { cargar(); })