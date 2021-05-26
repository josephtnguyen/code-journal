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
var $navBar = document.querySelector('.nav-bar');

$photoUrl.addEventListener('input', handleUrl);
$imgPreview.addEventListener('error', handleImgError);
$newEntry.addEventListener('submit', handleSave);

$newButton.addEventListener('click', handleNew);
document.addEventListener('DOMContentLoaded', handleDOMLoad);
$navBar.addEventListener('click', handleNav);
window.addEventListener('beforeunload', handleClose);

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

  $entriesDisplayed.insertBefore(journalEntry(entry), $entriesDisplayed.firstElementChild);

  $newEntry.reset();

  showPage('entries');
}

function handleNew(event) {
  showPage('entry-form');
}

function handleDOMLoad(event) {
  var previousDataJSON = localStorage.getItem('data-JSON');
  if (previousDataJSON) {
    data = JSON.parse(previousDataJSON);
    showPage(data.view);
  }

  for (var i = 0; i < data.entries.length; i++) {
    $entriesDisplayed.insertBefore(journalEntry(data.entries[i]), $entriesDisplayed.firstElementChild);
  }
}

function handleNav(event) {
  if (!(event.target.matches('a'))) {
    return;
  }

  if (event.target.textContent === 'Entries') {
    event.preventDefault();
    showPage('entries');
  }
}

function handleClose(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-JSON', dataJSON);
}

function showPage(page) {
  data.view = page;

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
