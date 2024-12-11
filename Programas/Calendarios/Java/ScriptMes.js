var arrayMeses=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
var semana=["L","M","X","J","V","S","D"];
function inicio(){
    ponmeses();
    ponaños();
}
function cabecera(vmes){
    var cadena="";
    cadena+="<CAPTION>"+arrayMeses[vmes] +"</CAPTION>";
    cadena+="<thead>";
    cadena+="<tr>";
    for(var i=0;i<semana.length;i++){
    cadena+="<th>"+semana[i]+"</th>";
    }    
    cadena+="</tr>";    
    cadena+="</thead>";
    return cadena;
}
function ponmeses(){
    var destino=document.getElementById("divmeses");

    var meses=document.createElement("select");
    meses.setAttribute("id","cbmeses");
    destino.appendChild(meses);
    meses.addEventListener("change",()=>{cambio();})
   
    for(var i=0;i<arrayMeses.length;i++){
        var op=document.createElement("option");
        op.text=arrayMeses[i];
        op.setAttribute("value",i);
        meses.appendChild(op);
    }
}
function ponaños(){
    var destino=document.getElementById("divaños");
    var fecha=new Date(); //Fecha del sistema
    var anno=fecha.getFullYear(); //Año con 4 cifras

    var annos=document.createElement("select");
    annos.setAttribute("id","cbaños");
    destino.appendChild(annos);
    annos.addEventListener("change",()=>{cambio();}) //Cuando cambia el select que se vaya a la función cambio

    for(var i=0;i<=50;i++){
        var op=document.createElement("option");
        op.setAttribute("value",anno+i);
        op.text=anno+i;
        annos.appendChild(op);
    }
}
function cambio(){
    var anno= document.getElementById("cbaños").value;
    var mes=document.getElementById("cbmeses").value;
    var inicio="<table border=1 align='center'>";
     inicio +=cabecera(mes);
  
  
    var fecha=new Date(anno,mes,1);
    var nweek=fecha.getDay();
    nweek--;
    if (nweek==-1) nweek=6;

    var cadena="<tbody><tr>"
    for(var i=1;i<=nweek;i++) cadena +="<td>&nbsp;</td>";


     var mes=fecha.getMonth();   //nº mes 0-11;
     while(fecha.getMonth()==mes){
  
     cadena +="<td>"+fecha.getDate()+"</td>";
     if (nweek==6) cadena +="</tr><tr>"
         fecha.setDate(fecha.getDate()+1);
        nweek=fecha.getDay();
        nweek--;
        if (nweek==-1) nweek=6;
    }
     cadena +="</tr></tbody></table>";
    document.getElementById("calendario").innerHTML=inicio+cadena;
 }
window.addEventListener("load",()=>{inicio();})
