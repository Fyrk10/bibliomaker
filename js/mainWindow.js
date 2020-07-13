
      /*function copier(elementID) {
        let element = document.getElementById(elementID); //select the element
        let elementText = element.textContent; //get the text content from the element
        copyText(elementText); //use the copyText function below
      }*/

        var fs = require('fs');

        fs.readFile('save/preferences.json', handleFile) //get preferences
  
        function handleFile(err, data) {
            if (err) throw err
            obj = JSON.parse(data);
            console.log(obj);
            
          // output preferences
          document.getElementById("editor").style.fontFamily = obj.font;
          document.getElementById("editor").style.fontSize = obj.size + "px";
  
        }
  
        var quill = new Quill('#editor', {
              modules: {
                  toolbar: false
              },
  
          });
  
          
          $("#fform").submit(function(event){ //https://www.youtube.com/watch?v=f3Auvf9pN6s MERCI JQUERY, BEST
            event.preventDefault(); //OUI
  
            var pauteur = $("#pauteur").val();
            var nauteur = $("#nauteur").val();
            var etal = $("#etal").val();
            var titre = $("#titre").val();
            var ville = $("#ville").val();
            var org = $("#org").val();
            var annee = $("#annee").val();
            var pages = $("#pages").val();
                  
          if (pauteur != "" && document.getElementById("etal").checked == true){
            //pauteur = pauteur.toLowerCase();
            pauteur = pauteur.charAt(0).toUpperCase() + pauteur.slice(1);
            pauteur = pauteur + ", ";
            etal = "et al";
            var etal2 = ". "
          }
  
          if (pauteur != "" && document.getElementById("etal").checked == false){
            //pauteur = pauteur.toLowerCase();
            pauteur = pauteur.charAt(0).toUpperCase() + pauteur.slice(1);
            pauteur = pauteur + ". ";
            etal = "";
          }

          if (pauteur == ""){
            etal = "";
          }
  
          if (nauteur != ""){
            nauteur = (nauteur + ", ").toUpperCase();
          }
  
          if (titre != ""){
            titre = (titre + ", ");
          }
  
          if (ville != ""){
            ville = (ville + ", ");
          }
  
          if (org != ""){
            org = (org + ", ");
          }
  
          if (annee != ""){
            annee = (annee + ", ");
          }
  
          if (pages != ""){
            pages = (pages + " p.");
          }

          console.log(etal);
  
            quill.setContents([ // affichage de l'output
              { insert: nauteur + pauteur },
              { insert: etal, attributes: { underline: true } },
              { insert: etal2 },
              { insert: titre, attributes: { italic: true } },
              { insert: ville + org + annee + pages }
            ]);
  
            var resetView = document.getElementById("Debut");
            resetView.scrollIntoView();
  
            /*SAVE SYSTEM*/

            fs.readFile('save/bibli.json', handleFile) //get preferences

            function handleFile(err, data) {
                if (err) throw err
                save = JSON.parse(data);

                var ref = {};

                ref.type = 0;
                ref.etal = etal;
                ref.pauteur = pauteur;
                ref.nauteur = nauteur;
                ref.titre = titre;
                ref.ville = ville;
                ref.org = org;
                ref.annne = annee;
                ref.pages = pages;
                
                save.push({"ref": ref});

                save = JSON.stringify(save);
  
                fs.writeFile('save/bibli.json', save, (err) => {
                  if(err){
                    alert("Une erreur s'est produite"+ err.message)
                  }     
                    //alert("Fichier sauvagardé avec succès");
      
                  });

            }

            }); 
  
          function copyToClip(str) { //https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard
            function listener(e) {
  
              var text = quill.getText();
  
              e.clipboardData.setData("text/html", str);
              e.clipboardData.setData("text/plain", text);
              e.preventDefault();
              }
            document.addEventListener("copy", listener);
            document.execCommand("copy");
            document.removeEventListener("copy", listener);
          };

        function checkbox(checkbox1){

          if(checkbox1.checked){
            var etal = 1
          }
          else{
            etal = 0
          }

          return etal
        }