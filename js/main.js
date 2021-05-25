/* global data */
/* exported data */
var $photoUrl = document.querySelector('.photo-url');
var $newEntry = document.querySelector('.entry-form');
var $saveButton = document.querySelector('.save-button');

$photoUrl.addEventListener('input', handleUrl);
$newEntry.addEventListener('submit', handleSave);

function handleUrl(event) {
  var $imgPreview = document.querySelector('.img-preview');
  console.log(event);

  $imgPreview.setAttribute('src', event.target.value);
  // if (event.target.value is valid) {
  //   $imgPreview.setAttribute('src', event.target.value);
  // } else {
  //   $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  // }
}

function handleSave(event) {
  event.preventDefault();

  var $title = document.querySelector('#entry-title');
  var $url = document.querySelector('#entry-url');
  var $notes = document.querySelector('#entry-notes');
  var entry = {
    title: $title.value,
    url: $url.value,
    notes: $notes.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;

  $newEntry.reset();
}
