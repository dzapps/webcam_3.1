var images=['../background/background.jpg','../background/background1.jpg','../background/background2.jpg','../background/background3.jpg','../background/background4.jpg'];
var url=0;
setInterval(function(){
   url+=1;
  if(url==4){
    url=0;
  }
  document.body.style.backgroundImage = 'url('+images[url]+')';
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
},10000);

  