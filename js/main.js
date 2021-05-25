/* global data */
/* exported data */
var $photoUrl = document.querySelector('.photo-url');
var $newEntry = document.querySelector('.entry-form');
var $saveButton = document.querySelector('.save-button');

$photoUrl.addEventListener('input', handleUrl);
$saveButton.addEventListener('click', handleSave);

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

function handleSave(event) {
  event.preventDefault();


}
