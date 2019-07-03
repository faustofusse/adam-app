const { app, BrowserWindow, systemPreferences } = require('electron')

function createWindow() {
    // Crea la ventana del navegador.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        //transparent: true,
        //frame: false,
        //fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
   
    //console.log(systemPreferences.getMediaAccessStatus('microphone'));
    /*systemPreferences.askForMediaAccess('microphone').then(value => {
        if (value) console.log('Microphone granted.');
    });*/
    
    win.loadFile('./index.html');
}

app.on('ready', createWindow);