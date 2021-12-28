module.exports = [
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'zoomIn'},
            {role: 'zoomOut'},
        ]
    },
    {
        label: "Browser",
        submenu: [
            {
                label: 'Home',
                click: () => {
                    require('../main').load("browser:home").then()
                }
            }
        ]
    }, {
        label: "Our Apps",
        submenu: [
            {
                label: "FileSharingService",
                click: () => {
                    require("../main")("https://github.com/Amiraxoba/FileSharingService")
                }
            }, {
                label: "Discord Bot",
                click: () => {
                    require("../main")("https://github.com/Amiraxoba/Bot")
                }
            }
        ]
    },
    {
        id: "bookmarks",
        label: "Bookmarks",
        submenu: [

        ]
    }
]