const electron = require('electron');
const url = require('url');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');
const fs = require('fs');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;
let information;
let preferences;

// Attendre que lapp soit prete
app.on('ready', function(){
    // creation nouvelle fenetre
    mainWindow = new BrowserWindow(
        {
            width: 1300,
            height: 720,
            minWidth: 175,
		    minHeight: 250,
            webPreferences: {nodeIntegration: true}
        }
    );
    //html dans la fenetre
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file',
        slashes: true
    }));

    // fermer l'application proprement (tout les processus)
    mainWindow.on('closed', function(){
        app.quit();
    });

    //construire le menu depuis l'exemple
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // inserer le menu
    Menu.setApplicationMenu(mainMenu);

});

// create addwindow
function createAddWindow(){
    // creation nouvelle fenetre
    addWindow = new BrowserWindow(
        {
            width: 300,
            height: 200,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );
        
    //html dans la fenetre
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addwindow.html'),
        protocol:'file',
        slashes: true
    }));

    // garbage collection
    addWindow.on('close', function(){
        addwindow = null;
    });
}

// create information
function createinformation(){
    // creation nouvelle fenetre
    information = new BrowserWindow(
        {
            width: 400,
            height: 200,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );
        
    //html dans la fenetre
    information.loadURL(url.format({
        pathname: path.join(__dirname, 'information.html'),
        protocol:'file',
        slashes: true
    }));

    // garbage collection
    information.on('close', function(){
        information = null;
    });
}

// create preferences
function createpreferences(){
    // creation nouvelle fenetre
    preferences = new BrowserWindow(
        {
            width: 400,
            height: 300,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );
        
    //html dans la fenetre
    preferences.loadURL(url.format({
        pathname: path.join(__dirname, 'preferences.html'),
        protocol:'file',
        slashes: true
    }));

    // garbage collection
    preferences.on('close', function(){
        preferences = null;
    });
}

//MENU TEMPLATE
const mainMenuTemplate = [
    {
        label:'Paramètres',
        submenu:[
            {
                label: 'Ajouter',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Préférences',
                click(){
                    createpreferences();
                }
            },
            {
                label: 'Informations',
                click(){
                    createinformation();
                }
            },
            {
                label: 'Quitter',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// si mac, rajouter un truc pour quil voit la section file
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// ajouter outil devollopeur si pas en prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Outils developpeurs',
        submenu:[
            {
                label: 'Basculer en mode developpeur',
                accelerator: process.platform == 'darwin' ? 'command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}



