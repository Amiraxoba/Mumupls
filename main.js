const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const path = require("path")
const mainMenuApp = require("./menu/main")

let mainMenu = Menu.buildFromTemplate(mainMenuApp)
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1280,
        minHeight: 800
    })
    require("./config").customBookmarks.forEach((item, index, arr) => {
        mainMenu.getMenuItemById("bookmarks").submenu.append(new MenuItem({
            label: item.name,
            click: () => {
                loadWeb(item.url, false)
            }
        }))
    })
    Menu.setApplicationMenu(mainMenu)

    loadWeb("frontend/home.html", true)
}

function loadWeb(webSite, file) {
    mainWindow.loadFile(path.join(__dirname, "frontend/loading.html")).then()
    let webContents = mainWindow.webContents

    webContents.once("did-finish-load", () => {
        if (file) {
            mainWindow.loadFile(path.join(__dirname, webSite)).then()
        } else {
            mainWindow.loadURL(webSite).then()
        }
    })
}

app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
    mainWindow.webContents.session.on("will-download", (event, item) => {
        item.setSavePath(require("./config").downloadPath + "/" + item.getFilename())
    })
})

module.exports = {
    name: "main",
    async load(page) {
        if (page === "browser:home") {
            loadWeb("frontend/home.html", true)
        } else {
            loadWeb(page, false)
        }
    }
}