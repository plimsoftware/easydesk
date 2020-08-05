const {app, BrowserWindow, ipcMain} = require('electron');

const path = require("path");

const isDev = require("electron-is-dev");

let mainWindow;

let childwindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 1200,
      minHeight: 800,
      maxHeight: 6000,
      nativeWindowOpen: true,
      icon: path.join(__dirname, './favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
      }
    });

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
        );

    // mainWindow.setMenu(null);

    mainWindow.on("closed", () => (mainWindow = null));
}

function childWindow() {
  childwindow = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 300,
    minHeight: 100,
    // parent: mainWindow,
    nativeWindowOpen: true,
    icon: path.join(__dirname, './favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js'),
    }
  });

  childwindow.loadURL(
      isDev
      ? "http://localhost:3000/userlist"
      : `file://${path.join(__dirname, "../build/index.html#/userlist")}`
      );

  childwindow.setMenu(null);

  childwindow.on("closed", () => (childwindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on("resize", function () {
  var size   = mainWindow.getSize();
  var width  = size[0];
  var height = size[1];
});

ipcMain.on('asynchronous-message', (event, arg) => {
  if (arg === 'userlist') childWindow();
})
