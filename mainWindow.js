var $ = require('jquery');
const {ipcRenderer} = require('electron');
const os = require('os');
const fs= require('fs');
var filename= 'password.txt';
$(document).ready(function(){
    var name= os.userInfo().username;
    $('.page-header').text("Hi!"+  name);
    $('#butt').click(function(){
        // ipcRenderer.send('clicked','do something');
        ipcRenderer.send('toggle-new-password-window');
    });
    sn=0;
    ipcRenderer.on('data-from-file',function(event,args){
        data = args;
        sn++;
        $("#app").append("<tr><td> " +sn+ " </td>" + "<td> " +data+ " </td></tr>");
    });
    if(!fs.existsSync(filename)){
        fs.writeFile(filename,'');
        window.alert('Password file doesnt exist');
    }
    else{
        var data=  fs.readFileSync(filename,'utf-8').split(os.EOL);
        console.log(data);
        data.pop();
        data.forEach(function(e){
            sn++;
            var res= e.split(',');
            $("#app").append("<tr><td> " +sn+ " </td>" + "<td> " +res[0]+ " </td>" + "<td> " +res[1]+ " </td> " + "<td> " +res[2]+ " </td></tr>");
        }); 
    }
});