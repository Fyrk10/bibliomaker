
      //nutilise plus ce code, car JQUERY

      /*let params = new URLSearchParams(document.location.search.slice(1)); //array de 2 parametres

      params.append('pauteur', "");
      params.append('nauteur', "");
      params.append('titre', "");
      params.append('ville', "");
      params.append('org', "");
      params.append('annee', "");
      params.append('pages', "");

      let pauteur = params.get('pauteur'); //strings
      let nauteur = params.get('nauteur');
      let titre = params.get('titre');
      let ville = params.get('ville');
      let org = params.get('org');
      let annee = params.get('annee');
      let pages = params.get('pages');*/

      //var output = nauteur + pauteur + titre + ville + org + annee + pages;

      //const div = document.getElementById('results');
      
      //div.append(output); //output

      // https://www.w3schools.com/howto/howto_js_tabs.asp

      //document.getElementById("OR").style.display = "block";

      //CODE ORIGINAL
      /*    const resultList = document.getElementById('results')
      new URLSearchParams(window.location.search).forEach((value,name) => {
      resultList.append(`${name}: ${value}`)
      resultList.append(document.createElement('br'))
      }) */

      /*function copier(elementID) {
        let element = document.getElementById(elementID); //select the element
        let elementText = element.textContent; //get the text content from the element
        copyText(elementText); //use the copyText function below
      }

      function copyText(text) {
        navigator.clipboard.writeText(text);
      }*/
        
        /*quill.clipboard.addMatcher('B', function(node, delta) {
          return delta.compose(new Delta().retain(delta.length(), { bold: true }));
        });*/

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
  
          //quill.deleteText(0,155);
          //quill.insertText(0, output);
          //quill.deleteText(0,100);
  
          
          $("#fform").submit(function(event){ //https://www.youtube.com/watch?v=f3Auvf9pN6s MERCI JQUERY, BEST
            event.preventDefault(); //OUI
  
            var pauteur = $("#pauteur").val();
            var nauteur = $("#nauteur").val();
            var titre = $("#titre").val();
            var ville = $("#ville").val();
            var org = $("#org").val();
            var annee = $("#annee").val();
            var pages = $("#pages").val();
  
            if (pauteur != ""){
          //pauteur = pauteur.toLowerCase();
          pauteur = pauteur.charAt(0).toUpperCase() + pauteur.slice(1);
          pauteur = pauteur + ". ";
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
  
            quill.setContents([ // affichage de l'output
              { insert: nauteur + pauteur },
              { insert: titre, attributes: { italic: true } },
              { insert: ville + org + annee + pages }
            ]);
  
            console.log(titre);
  
            var resetView = document.getElementById("Debut");
            resetView.scrollIntoView();
  
            //système de sauvegarde
  
            
  
            save = "[\nfirst line\nsecond line"
  
            fs.appendFile('save/bibli.json', save, (err) => {
              if(err){
                alert("Une erreur s'est produite"+ err.message)
              }     
                //alert("Fichier sauvagardé avec succès");
  
              });
            }); 
  
          function copyToClip(str) { //https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard ENFIN
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