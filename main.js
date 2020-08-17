const {app, BrowserWindow, ipcMain, Menu, remote} = require('electron')
const url = require('url');
const path = require('path');


ipcMain.on('close-me', (evt, arg) => {
  app.quit()
})

function createWindow () {
    // Create the browser window.
    Menu.setApplicationMenu(null)
    win = new BrowserWindow({
      width: 320,
      height: 560,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true
      },
      resizable: false,
      frame: false
    })

    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname:path.join(__dirname,'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // document.querySelector('.close').addEventListener('click', (e)=>{
    // 	remote.getCurrentWindow().close()
    // })
}

app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
