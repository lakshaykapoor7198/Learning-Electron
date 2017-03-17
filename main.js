const {app , BrowserWindow} = require('electron');
const {Menu,MenuItem}  = require('electron');
const {ipcMain} = require('electron');
const {dialog} = require('electron');
const fs = require('fs');
const url = require('url');
const path = require('path');
let win;

function mainWindow(){
    win = new BrowserWindow({width:1000,height:800,icon:path.join(__dirname,'img/icon.png')});
    win.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol:"file:",
        slashes: true
    }));
    win.on("closed",function(){
        win = null;
    });
    win.webContents.openDevTools();
}

var template = [
    {
        label:'Whats Up',
        submenu:[
            {   
                label: 'About Us',
                role:'About US',
                click: function(){
                    console.log("U want to know about us?");
                }

            },
            {
                type:'separator'
            },
            {
                label:'Help',
                role:'Help'
            }
        ]
    },
    {

    }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

ipcMain.on('clicked',function(event, args){
    dialog.showOpenDialog(function(fileNames){
        if (fileNames == undefined){
            window.alert('NO files selected');
        }
        else{
            readFiles(fileNames[0]);
        }
    });
    function readFiles(fileName){
       var data =  fs.readFileSync(fileName, 'utf-8' ).split('\n');
       data.forEach(function(e){
           event.sender.send('data-from-file',e);
       });
    }
});

ipcMain.on('toggle-new-password-window',function(event){
    win.loadURL(url.format({
        pathname: path.join(__dirname,'newPasswd.html'),
        protocol:"file:",
        slashes: true
    }));
});

ipcMain.on('toggle-back-to-main-window',function(event){
    win.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol:"file:",
        slashes: true
    }));
});


app.on('ready',mainWindow);
app.on('window-all-closed',function(){
    if (process.platform != 'darwin'){
        app.quit();
    }
});