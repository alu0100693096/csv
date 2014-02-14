"use strict"; // Modo estricto

$(document).ready(function() {
   $("button").click(function() {
     calculate();
   });
 });

function calculate() {
  var result;
  var original       = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var tabla = [];
  var fila = [];
  var error = [];

  // Plantilla
  var planti = _.template(mytemplate.innerHTML);
  
  
  if (window.localStorage) localStorage.original  = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        //alert('ERROR! row <'+temp+'> has '+m.length+' items!');
        error[t] = true;
      }
      else {
        commonLength = m.length;
        error[t] = false;
      }
      fila = [];
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        fila.push(removeescapedquotes);
      }
      tabla.push(fila);
 
    }
    else {
      alert('ERROR! row '+temp+' does not look as legal CSV');
      error[t] = (true);
    }
  }
  finaltable.innerHTML = planti({items: tabla, error: error});
}

window.onload = function() {
  // Para el almacenamiento local
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};

