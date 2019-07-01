const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Crea la ventana del navegador.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./views/login.html');
}

app.on('ready', createWindow);