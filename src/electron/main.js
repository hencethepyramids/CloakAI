const { app, BrowserWindow, ipcMain, screen, desktopCapturer } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

// Keep a global reference of the window object
let mainWindow

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: Math.min(1280, width),
    height: Math.min(800, height),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/icon.png')
  })

  // Load the app
  if (app.isPackaged) {
    // Production mode
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  } else {
    // Development mode
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  // Check for updates
  autoUpdater.checkForUpdatesAndNotify()
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (mainWindow === null) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Handle screen capture requests
ipcMain.handle('get-screen-sources', async () => {
  const sources = await desktopCapturer.getSources({ 
    types: ['window', 'screen'],
    thumbnailSize: { width: 320, height: 180 }
  })
  return sources
})

// Auto-updater events
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-downloaded')
})

ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall()
})
