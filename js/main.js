/* global data */
/* exported data */
var $photoUrl = document.querySelector('.photo-url');

$photoUrl.addEventListener('input', handleUrl);

function handleUrl(event) {
  var $imgPreview = document.querySelector('.img-preview');
  console.log(event);

  $imgPreview.setAttribute('src', event.target.value);
  // if (event.target.value is valid) {
  //   $imgPreview.setAttribute('src', event.target.value);
  // } else {
  //   $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}
