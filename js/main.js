/* global data */
/* exported data */
var $newEntry = document.querySelector('.entry-form');
var $imgPreview = document.querySelector('.img-preview');
var $photoUrl = document.querySelector('.photo-url');

var $newTitle = document.querySelector('#new-title');
var $newUrl = document.querySelector('#new-url');
var $newNotes = document.querySelector('#new-notes');

var $views = document.querySelectorAll('.view');
var $newButton = document.querySelector('.new-button');
var $entriesDisplayed = document.querySelector('.entries-list');

$photoUrl.addEventListener('input', handleUrl);
$imgPreview.addEventListener('error', handleImgError);
$newEntry.addEventListener('submit', handleSave);

$newButton.addEventListener('click', handleNew);
document.addEventListener('DOMContentLoaded', handleDOMLoad);

function handleUrl(event) {
  $imgPreview.setAttribute('src', event.target.value);
}

function handleImgError(event) {
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function handleSave(event) {
  event.preventDefault();

  var entry = {
    title: $newTitle.value,
    url: $newUrl.value,
    notes: $newNotes.value,
    id: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);

  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

  $newEntry.reset();

  showPage('entries');
}

function handleNew(event) {
  showPage('entry-form');
}

function handleDOMLoad(event) {
  console.log('it happened!');
  for (var i = 0; i < data.entries.length; i++) {
    $entriesDisplayed.appendChild(journalEntry(data.entries[i]));
  }
}

function showPage(page) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === page) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

function journalEntry(entry) {
  // <li class="entries-list-item">
  //   <div class="row">
  //     <div class="column-half">
  //       <img>
  //     </div>

  //     <div class="column-half">
  //         <h2 class="entry-heading">title</h2>
  //         <p class="entry-par">notes</p>
  //     </div>
  //   </div>
  // </li>

  var $li = document.createElement('li');
  $li.className = 'entries-list-item';

  var $row = document.createElement('div');
  $row.className = 'row';
  $li.appendChild($row);

  var $imgCol = document.createElement('div');
  $imgCol.className = 'column-half';
  $row.appendChild($imgCol);

  var $image = document.createElement('img');
  $image.setAttribute('src', entry.url);
  $image.className = 'max-width rounded img-preview';
  $imgCol.appendChild($image);

  var $textCol = document.createElement('div');
  $textCol.className = 'column-half';
  $row.appendChild($textCol);

  var $entryTitle = document.createElement('h2');
  $entryTitle.className = 'entry-heading';
  $entryTitle.textContent = entry.title;
  $textCol.appendChild($entryTitle);

  var $entryNotes = document.createElement('p');
  $entryNotes.className = 'entry-par';
  $entryNotes.textContent = entry.notes;
  $textCol.appendChild($entryNotes);

  return $li;
}
