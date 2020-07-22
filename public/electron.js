const electron = require("electron");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require("path");

const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 1200,
      minHeight: 800,
      maxHeight: 6000,
      icon: path.join(__dirname, './favicon.ico')
    });

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
        );

    // mainWindow.setMenu(null);

    mainWindow.on("closed", () => (mainWindow = null));
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
