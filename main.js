const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Crea la ventana del navegador.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        //fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    console.log('Hola');
    win.loadFile('./index.html');
}

app.on('ready', createWindow);