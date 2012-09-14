/*
  Make Safe For Work JS by DrummerHead
  http://mcdlr.com
*/

$(document).ready(function(){


/* test if the url has a imgurl query */
var urlPath = window.location.href;
var imgUrlTest = /\?imgurl=/.test(urlPath);

/*if the url has an imgurl query, do this */
if (imgUrlTest) {
  var regex = /^([^?]*)\?imgurl=([^?]*)(\?imgurl=.*)?$/;
  var imgUrl = urlPath.replace(regex, '$2');

  imageAppend(imgUrl);

  $('#imageUrl').val(imgUrl);
  $('#interactArea').show();
  $('#share').hide();
  $('#share').val('');

  urlPath = urlPath.replace(regex, '$1');
}

/* form where the user puts the image url */
$('#imagePutForm').submit(function(){
  imgUrl = $('#imageUrl').val();

  if (imageAppend(imgUrl)) {
    $('#interactArea').slideDown();
    urlPathPlus = urlPath + '?imgurl=' + imgUrl
    $('#shareUrl').val(urlPathPlus);
    $('#share').slideDown('slow');
  }

  return false;
});


/* shared function to append image */
function imageAppend(imgUrl) {
  if(imgUrl) {
    var imgUrlSafe = imgUrl.replace(/[<>&'"]*/g, '');
    imgHtml = '<img src="' + imgUrlSafe + '" alt="NSFW image" class="nsfwImage" />'
    $('#imageDump').html("<span class='msg'>Loading image</span>")
    $('#imageDump').append(imgHtml);
    $('.nsfwImage').error(function(){
      $('.msg').text('Image not found')
      errorFree = false;
    }).load(function(){
      $('.msg').text('Image Loaded!')
    });
    return true;
  } else {
    $('#imageDump').html("<span class='msg'>Please insert an URL</span>");
    return false;
  }
}

/* copy content of share input text on click */
$('#shareUrl').click(function() {
  $(this).select();
});


/* button pressing and locking functionality */
var isLocked = $('#lock:checked').length,
    isShown = false;

whatState()

function whatState() {
  if (isLocked) {
    isLocked = 0;
    $('#msfwDo').unbind();
    $('.inst').text('Press the button to show the image, press again to hide it.');
    onPress();
  } else {
    isLocked = 1;
    $('#msfwDo').unbind();
    $('.inst').text('While pressing the button, the image will be revealed.');
    onHold()
  }
}

$('#lock').click(function() {
  whatState()
});


function onHold() {
  $('.nsfwImage').hide();
  isShown = false;
  $('#msfwDo').mousedown(function() {
    $('.msg').hide();
    $('.nsfwImage').show();
    isShown = true;
  }).mouseup(function(){
    $('.nsfwImage').hide();
    isShown = false;
    $('.msg').show();
  });
}

function onPress() {
  $('#msfwDo').click(function() {
    if (isShown) {
      $('.nsfwImage').hide();
      isShown = false;
      $('.msg').show();
      $(this).text('show').removeClass('active');
    } else {
      $('.msg').hide();
      $('.nsfwImage').show();
      isShown = true;
      $(this).text('hide').addClass('active');
    }
  })
}


})

