function loadDoc() {
  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    //code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (!xhttp) {
    console.log('XMLHttpRequest error. Request stopped.');
    return false;
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      nutritions(this);
    }
  };
  xhttp.open("GET", "nutrition.xml", true);
  xhttp.send();
}


function nutritions(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  if (!xmlDoc) {
    console.log('XMLHttpRequest error. Reguest stopped.');
    return false;
  }
  var x = xmlDoc.getElementsByTagName("food");
  var res_x = xmlDoc.getElementsByTagName("food")[0].childNodes;
  var table = "<thead><tr>";
  for (i = 0; i < res_x.length; i++) {
    if (res_x[i].tagName !== undefined) {
      table += "<th>" + res_x[i].tagName + "</th>";
    }
  }
  table += "</tr></thead>";
  for (i = 0; i < x.length; i++) {
    table += "<tr><td>" +
      x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("mfr")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("serving")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("calories")[0].getAttribute("fat") + "/" +
      x[i].getElementsByTagName("calories")[0].getAttribute("total") +
      "</td><td>" +
      x[i].getElementsByTagName("total-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("saturated-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("cholesterol")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("sodium")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("carb")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("fiber")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("protein")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("vitamins")[0].childNodes[1].tagName + ": " +
      x[i].getElementsByTagName("vitamins")[0].childNodes[1].textContent + " | " +
      x[i].getElementsByTagName("vitamins")[0].childNodes[3].tagName + ": " +
      x[i].getElementsByTagName("vitamins")[0].childNodes[1].textContent +
      "</td><td>" +
      x[i].getElementsByTagName("minerals")[0].childNodes[1].tagName + ": " +
      x[i].getElementsByTagName("minerals")[0].childNodes[1].textContent + " | " +
      x[i].getElementsByTagName("minerals")[0].childNodes[3].tagName + ": " +
      x[i].getElementsByTagName("minerals")[0].childNodes[1].textContent +
      "</td></tr>";
  }
  table += "</tbody>";
  document.getElementById("tab").innerHTML = table;
  //Daily values
  var values = xmlDoc.getElementsByTagName("daily-values");
  var res_values = xmlDoc.getElementsByTagName("daily-values")[0].childNodes;
  var daily_tab = "<thead><tr>";
  for (i = 0; i < res_values.length; i++) {
    if (res_values[i].tagName !== undefined) {
      daily_tab += "<th>" + res_values[i].tagName + "</th>";
    }
  }
  daily_tab += "</tr></thead>";
  for (i = 0; i < values.length; i++) {
    daily_tab += "<tr><td>" +
      values[i].getElementsByTagName("total-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("saturated-fat")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("cholesterol")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("sodium")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("carb")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("fiber")[0].childNodes[0].nodeValue +
      "</td><td>" +
      values[i].getElementsByTagName("protein")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }

  daily_tab += "</tbody>";
  document.getElementById("daily").innerHTML = daily_tab;
}

$(document).ready(function() {
  $("#tab").tablesorter();
});

var button = document.querySelector('button[name="ajax-button"]');
if (button.addEventListener) {
  button.addEventListener('click', function() {
    loadDoc();
  });
} else {
  //for older browser IE5-8*
  button.attachEvent('click', function() {
    loadDoc();
  });
}
