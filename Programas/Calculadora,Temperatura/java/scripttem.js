
 
/*ºF = ºC x 1.8 + 32.
ºC = (ºF-32) ÷ 1.8.
ºC = ºK – 273.15
ºK = ºC + 273.15.
ºK = 5/9 (ºF – 32) + 273.15.
ºF = 1.8(ºK – 273.15) + 32.*/
       
function pulsado(origen,quien){
    /*alert(quien.innerHTML);*/
   document.getElementById(origen).value=parseFloat(document.getElementById(origen).value)
   +parseInt(quien.innerHTML);
    
    
   cambio(document.getElementById(origen));
   }
    
    
       function cambio(origen){
               //alert(origen.value);
               let vgc,vgf,vgk;
               switch(origen.id){
                   case "GC":
                      /* document.getElementById("GF").value=100;
                       document.getElementById("GK").value=200;*/
                       vgc=parseFloat(origen.value);
                       vgf=vgc*1.8+32;
                       vgk=vgc+273.15;
                       document.getElementById("GF").value=vgf;
                       document.getElementById("GK").value=vgk;
                       break;
                   case "GF":
                       /* document.getElementById("GC").value=100;
                       document.getElementById("GK").value=200;*/
                       vgf=parseFloat(origen.value);
                       vgc=(vgf-32)/1.8;
                       vgk=vgc+273.15;
                       document.getElementById("GC").value=vgc;
                       document.getElementById("GK").value=vgk;
                       break;
                   case "GK":
                       /* document.getElementById("GF").value=100;
                       document.getElementById("GK").value=200;*/
                       vgk=parseFloat(origen.value);
                       vgc=vgk-273.15;
                       vgf=vgc*1.8+32;
                       document.getElementById("GC").value=vgc;
                       document.getElementById("GF").value=vgf;
                       break;
    
               }
           }
        
          
           function newcargar(destino){ //dentro de destino meto los option
              for(let i=150;i>=-150;i--){
               let z=document.createElement("option"); //cada vez que itera añade una opcion
               z.text=i.toString();
               z.value=i.toString();
               destino.appendChild(z);
              }
           }
              function cargar(){
               newcargar(document.getElementById("sgc"));
               newcargar(document.getElementById("sgf"));
               newcargar(document.getElementById("sgk"));
              }