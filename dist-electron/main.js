"use strict";
const electron = require("electron");
const path = require("path");
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("get-sources", async () => {
  const sources = await electron.desktopCapturer.getSources({
    types: ["window", "screen"],
    thumbnailSize: { width: 0, height: 0 }
  });
  return sources.map((source) => ({
    id: source.id,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL()
  }));
});
electron.ipcMain.handle("start-screen-capture", async (_, sourceId) => {
  try {
    const mainWindow = electron.BrowserWindow.getAllWindows()[0];
    if (!mainWindow) return { success: false, error: "No window found" };
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1920,
          minHeight: 720,
          maxHeight: 1080
        }
      }
    });
    return { success: true, stream };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("stop-screen-capture", async () => {
  try {
    const mainWindow = electron.BrowserWindow.getAllWindows()[0];
    if (!mainWindow) return { success: false, error: "No window found" };
    const tracks = mainWindow.webContents.getMediaStreamId();
    if (tracks) {
      tracks.getTracks().forEach((track) => track.stop());
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
