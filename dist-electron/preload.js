"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld(
  "electron",
  {
    ipcRenderer: {
      invoke: (channel, ...args) => {
        const validChannels = ["get-sources", "start-screen-capture", "stop-screen-capture"];
        if (validChannels.includes(channel)) {
          return electron.ipcRenderer.invoke(channel, ...args);
        }
        throw new Error(`Unauthorized IPC channel: ${channel}`);
      },
      on: (channel, func) => {
        const validChannels = ["screen-share-status"];
        if (validChannels.includes(channel)) {
          electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      },
      once: (channel, func) => {
        const validChannels = ["screen-share-status"];
        if (validChannels.includes(channel)) {
          electron.ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
      },
      removeListener: (channel, func) => {
        const validChannels = ["screen-share-status"];
        if (validChannels.includes(channel)) {
          electron.ipcRenderer.removeListener(channel, func);
        }
      }
    }
  }
);
