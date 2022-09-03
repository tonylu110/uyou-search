const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

const NODE_ENV = process.env.NODE_ENV

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 80,
    show: false,
    vibrancy: 'menu',
    visualEffectState: 'active',
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadURL(
    NODE_ENV === "development"
      ? 'http://localhost:5200'
      : `file://${path.join(__dirname, `../dist/index.html`)}`
  )

  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  ipcMain.on("window-close", () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})