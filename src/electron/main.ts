import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './util.js';


// type test = string; 

app.on('ready', ()=>{
const mainWindow = new BrowserWindow({
    width: 1200, // Window width
    height: 800, // Window height
    minWidth: 800, // Minimum width
    minHeight: 600, // Minimum height
    resizable: false, // Allow resizing
    fullscreen: false, // Disable fullscreen mode
    frame: true, // Show default OS frame
    webPreferences: {
      nodeIntegration: true, // Allows using Node.js modules in renderer process
      contextIsolation: false, // Disable context isolation for easier access
      devTools: isDev(), // Enable DevTools in development mode
     
    },
    
});

mainWindow.setMenu(null);

if (isDev()){
mainWindow.loadURL('http://localhost:5123');
}else{
    mainWindow.loadFile(path.join (app.getAppPath(), '/dist-react/index.html'))
}


})