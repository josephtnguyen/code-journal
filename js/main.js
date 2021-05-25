/* global data */
/* exported data */
var $newEntry = document.querySelector('.entry-form');
var $imgPreview = document.querySelector('.img-preview');
var $photoUrl = document.querySelector('.photo-url');

var $title = document.querySelector('#new-title');
var $url = document.querySelector('#new-url');
var $notes = document.querySelector('#new-notes');

$photoUrl.addEventListener('input', handleUrl);
$imgPreview.addEventListener('error', handleImgError);
$newEntry.addEventListener('submit', handleSave);

function handleUrl(event) {
  $imgPreview.setAttribute('src', event.target.value);
}

function handleImgError(event) {
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function handleSave(event) {
  event.preventDefault();

  var entry = {
    title: $title.value,
    url: $url.value,
    notes: $notes.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);

  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

  $newEntry.reset();
}
