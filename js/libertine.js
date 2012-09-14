$('document').ready(function(){


var isOpen = false,
  helpText = $('#auxilium article'),
  closeButton = $('#auxilium .close'),
  flappy = $('#flap a');

function openOrClose(){
  if(isOpen){
    helpText.slideUp();
    closeButton.hide();
    isOpen = false;
    return false;
  } else {
    helpText.slideDown();
    closeButton.show();
    isOpen = true;
    return false;
  }
}

flappy .click(function(){openOrClose()});
closeButton.click(function(){openOrClose()});


});
