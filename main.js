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
    // creation nouvelle fenêtre
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
    // creation nouvelle fenêtre
    addWindow = new BrowserWindow(
        {
            width: 300,
            height: 200,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );
        
    //html dans la fenêtre
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

    information = new BrowserWindow(
        {
            width: 550,
            height: 350,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );

    information.loadURL(url.format({
        pathname: path.join(__dirname, 'information.html'),
        protocol:'file',
        slashes: true
    }));

    information.on('close', function(){
        information = null;
    });
}

function createpreferences(){

    preferences = new BrowserWindow(
        {
            width: 600,
            height: 450,
            title:'ajouter',
            
            webPreferences: {nodeIntegration: true}
        }
    );
        
    preferences.loadURL(url.format({
        pathname: path.join(__dirname, 'preferences.html'),
        protocol:'file',
        slashes: true
    }));

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

// si mac, ajouter un truc pour quil voit la section file
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// ajouter outil dévellopeur, si pas en prod
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