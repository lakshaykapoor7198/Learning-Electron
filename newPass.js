var $ = require('jquery');
var fs= require('fs');
var os = require('os');
const {ipcRenderer} = require('electron');
filename='password.txt';
$(document).ready(function(){
    $('#butt').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var desc = $('#desc').val();
        fs.appendFile(filename,username+','+password+','+desc+ os.EOL);
        ipcRenderer.send('toggle-back-to-main-window');
    });
});