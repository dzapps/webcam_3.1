chrome.browserAction.onClicked.addListener(function(tab){
    window.open('popup.html','_blank'); 
});
/*
function init(){
    
    if(!get('firststart')){
        set('firststart',true);
    }
    
    chrome.browserAction.onClicked.addListener(function(tab){
        window.open('popup.html','_blank');
    });
    
}

function get(name){
    var val = localStorage[name];
    if(!val || val == 'false'){
        return false;
    }
    return val;
}

function set(name,val){
    localStorage[name] = val;
}

$(document).ready(function(){

    init();

});*/