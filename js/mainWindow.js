/*function copier(elementID) {
        let element = document.getElementById(elementID); //select the element
        let elementText = element.textContent; //get the text content from the element
        copyText(elementText); //use the copyText function below
      }*/

var fs = require("fs");

fs.readFile("save/preferences.json", handleFile); //get preferences

function handleFile(err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj);

  // output preferences
  document.getElementById("editor").style.fontFamily = obj.font;
  document.getElementById("editor").style.fontSize = obj.size + "px";
}

var quill = new Quill("#editor", {
  modules: {
    toolbar: false,
  },
});

$("#fform").submit(function (event) {
  //https://www.youtube.com/watch?v=f3Auvf9pN6s THX JQUERY
  event.preventDefault(); //YES

  let pauteur = $("#pauteur").val();
  let nauteur = $("#nauteur").val();
  let etal = $("#etal").val();
  let titre = $("#titre").val();
  let ville = $("#ville").val();
  let org = $("#org").val();
  let annee = $("#annee").val();
  let pages = $("#pages").val();
  let etal2 = "";
  let etalCheck = false;
  let auteurLength = ($('.auteur').length) / 2;


    


  if (pauteur != "" && document.getElementById("etal").checked == true) {
    //pauteur = pauteur.toLowerCase();
    pauteur = pauteur.charAt(0).toUpperCase() + pauteur.slice(1);
    pauteur = pauteur + ", ";
    etal = "et al";
    etal2 = ". ";
    etalCheck = true;
  }

  if (pauteur != "" && document.getElementById("etal").checked == false) {
    //pauteur = pauteur.toLowerCase();
    pauteur = pauteur.charAt(0).toUpperCase() + pauteur.slice(1);
    pauteur = pauteur + ". ";
    etal = "";
    etalCheck= false;
  }

  if (pauteur == "") {
    etal = "";
  }

  if (nauteur != "") {
    nauteur = (nauteur + ", ").toUpperCase();
  }

  if (titre != "") {
    titre = titre + ", ";
  }

  if (ville != "") {
    ville = ville + ", ";
  }

  if (org != "") {
    org = org + ", ";
  }

  if (annee != "") {
    annee = annee + ", ";
  }

  if (pages != "") {
    pages = pages + " p.";
  }

  console.log(etal);

  quill.setContents([
    // affichage de l'output
    { insert: nauteur + pauteur },
    { insert: etal, attributes: { underline: true } },
    { insert: etal2 },
    { insert: titre, attributes: { italic: true } },
    { insert: ville + org + annee + pages },
  ]);

  var resetView = document.getElementById("Debut");
  resetView.scrollIntoView();

  /*SAVE SYSTEM*/

  fs.readFile("save/bibli.json", handleFile); //get preferences

  function handleFile(err, data) {
    if (err) throw err;
    save = JSON.parse(data);

    var ref = {};
    ref.auteur = [];

    ref.auteur.pauteur = pauteur;
    ref.auteur.nauteur = nauteur;

    ref.type = 0;
    ref.etal = etalCheck;
    ref.auteurLength = auteurLength;
    ref.titre = titre;
    ref.ville = ville;
    ref.org = org;
    ref.annne = annee;
    ref.pages = pages;

    ref.auteur.push({auteurs: ref.auteur});


    save.push({ ref: ref });

    save = JSON.stringify(save);

    fs.writeFile("save/bibli.json", save, (err) => {
      if (err) {
        alert("Une erreur s'est produite" + err.message);
      }
      //alert("Fichier sauvagardé avec succès");
    });
  }
});

function copyToClip(str) {
  //https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard
  function listener(e) {
    var text = quill.getText();

    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

function addAuteur() {
  let length = (($('.auteur').length) / 2);
  $(".ajouterPN").append('<table id="PN' + length + '" style="width:100%"><tr><td class="PN">Prénom</td><td><input type="text" id="pauteur" name="pauteur" class="auteur" placeholder="Ex: Paul"></td> </tr><tr><td class="PN">Nom</td><td><input type="text" id="nauteur" name="nauteur" class="auteur" placeholder="Ex: Aubin"></td></tr></table>');
  console.log(length);
}

function removeAuteur() {
  let length = (($('.auteur').length) / 2) -1;

  $("#PN" + length).remove();
}
