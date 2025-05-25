import { app, BrowserWindow, ipcMain, desktopCapturer } from 'electron'
import path from 'path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  // In development, load from the dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC handlers for screen capture
ipcMain.handle('get-sources', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    thumbnailSize: { width: 0, height: 0 }
  })
  return sources.map(source => ({
    id: source.id,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL()
  }))
})

ipcMain.handle('start-screen-capture', async (_, sourceId: string) => {
  try {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    if (!mainWindow) return { success: false, error: 'No window found' }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1920,
          minHeight: 720,
          maxHeight: 1080
        }
      }
    })

    return { success: true, stream }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('stop-screen-capture', async () => {
  try {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    if (!mainWindow) return { success: false, error: 'No window found' }

    // Stop all tracks in the stream
    const tracks = mainWindow.webContents.getMediaStreamId()
    if (tracks) {
      tracks.getTracks().forEach(track => track.stop())
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}) 