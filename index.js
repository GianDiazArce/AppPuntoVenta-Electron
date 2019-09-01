const { app, BrowserWindow, Menu } = require('electron');
var request = require('request');


const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

let mainWindow;
let tallasWin;

function createWindow(){
    // Iniciar la ventana con tamaños
    let ancho = 1920;
    let alto = 1080;
    mainWindow = new BrowserWindow({
        width: ancho,
        height: alto
    });
    mainWindow.loadFile('ng/dist/index.html');
    mainWindow.setMenuBarVisibility(false);

    mainWindow.webContents.openDevTools();
    // Cuando la ventana es cerrada
    mainWindow.on('closed', () => {
        // Elimina la referencia al objeto window, normalmente  guardarías las ventanas
        // en un vector si tu aplicación soporta múltiples ventanas, este es el momento
        // en el que deberías borrar el elemento correspondiente.
        win = null
    });    

    
    
    

}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.on('ready', createWindow)

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
  
app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clicado y no hay otras ventanas abiertas.
    if (win === null) {
        createWindow()
    }
})
  
// En este archivo puedes incluir el resto del código del proceso principal de
// tu aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.




