/* global data */
/* exported data */
var $newEntry = document.querySelector('.entry-form');
var $imgPreview = document.querySelector('.img-preview');
var $photoUrl = document.querySelector('.photo-url');
var $newTitle = document.querySelector('#new-title');
var $newUrl = document.querySelector('#new-url');
var $newNotes = document.querySelector('#new-notes');
var $newFooter = document.querySelector('.new-footer');
var $deleteButton = document.querySelector('.delete-button');

var $views = document.querySelectorAll('.view');
var $newButton = document.querySelector('.new-button');
var $entriesDisplayed = document.querySelector('.entries-list');
var $navBar = document.querySelector('.nav-bar');
var $noEntriesMessage = document.querySelector('.entries-none');

var $deleteModal = document.querySelector('.delete-modal-container');
var $deleteBox = document.querySelector('.delete-box');

$photoUrl.addEventListener('input', handleUrl);
$imgPreview.addEventListener('error', handleImgError);
$newEntry.addEventListener('submit', handleSave);

$newButton.addEventListener('click', handleNew);
document.addEventListener('DOMContentLoaded', handleDOMLoad);
$navBar.addEventListener('click', handleNav);

$entriesDisplayed.addEventListener('click', handleEdit);

$deleteButton.addEventListener('click', handleDeleteRequest);
$deleteBox.addEventListener('click', handleDeleteBox);

showPage(data.view);


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

  if (data.editing) {
    entry.id = data.editing.id;

    var $targetedLi = targetedEntry(entry.id);
    $targetedLi.replaceWith(journalEntry(entry));

    for (i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === entry.id) {
        data.entries[i] = entry;
        break;
      }
    }
  } else {
    data.nextEntryId++;
    data.entries.push(entry);

    $entriesDisplayed.prepend(journalEntry(entry));
  }

  refreshNewEntry();

  $noEntriesMessage.classList.add('hidden');
  showPage('entries');
}

function handleNew(event) {
  refreshNewEntry();

  $newFooter.classList.remove('show-delete');
  $deleteButton.classList.add('hidden');

  showPage('entry-form');
}

function handleDOMLoad(event) {
  if (data.entries.length !== 0) {
    $noEntriesMessage.classList.add('hidden');
  }

  if (data.editing) {
    $newTitle.value = data.editing.title;
    $newUrl.value = data.editing.url;
    $newNotes.value = data.editing.notes;
    $imgPreview.setAttribute('src', $newUrl.value);

    $newFooter.classList.add('show-delete');
    $deleteButton.classList.remove('hidden');
  }

  for (var i = 0; i < data.entries.length; i++) {
    $entriesDisplayed.prepend(journalEntry(data.entries[i]));
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

function handleEdit(event) {
  if (!(event.target.matches('.edit-button'))) {
    return;
  }

  $newFooter.classList.add('show-delete');
  $deleteButton.classList.remove('hidden');

  showPage('entry-form');

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].id == event.target.closest('.entries-list-item').getAttribute('data-entry-id')) {
      data.editing = data.entries[i];
      break;
    }
  }

  $newTitle.value = data.editing.title;
  $newUrl.value = data.editing.url;
  $newNotes.value = data.editing.notes;

  $imgPreview.setAttribute('src', $newUrl.value);
}

function handleDeleteRequest(event) {
  event.preventDefault();
  $deleteModal.classList.remove('hidden');
}

function handleDeleteBox(event) {
  if (!(event.target.matches('button'))) {
    return;
  }

  if (event.target.matches('.cancel-button')) {
    $deleteModal.classList.add('hidden');
  } else if (event.target.matches('.confirm-button')) {
    var $targetedLi = targetedEntry(data.editing.id);
    $targetedLi.remove();
    deleteEntryFromData(data.editing.id);

    if (data.entries.length === 0) {
      $noEntriesMessage.classList.remove('hidden');
    }
  }
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
  //
  //     <div class="column-half">
  //       <div class="entry-header">
  //         <h2 class="entry-heading">title</h2>
  //         <span class="fa edit-button"></span>
  //       </div>
  //       <p class="entry-par">notes</p>
  //     </div>
  //   </div>
  // </li>

  var $li = document.createElement('li');
  $li.className = 'entries-list-item';
  $li.setAttribute('data-entry-id', entry.id);

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

  var $entryHeader = document.createElement('div');
  $entryHeader.className = 'entry-header';
  $textCol.appendChild($entryHeader);

  var $entryTitle = document.createElement('h2');
  $entryTitle.className = 'entry-heading';
  $entryTitle.textContent = entry.title;
  $entryHeader.appendChild($entryTitle);

  var $editButton = document.createElement('span');
  $editButton.className = 'fa edit-button';
  $editButton.textContent = '\uf304';
  $entryHeader.appendChild($editButton);

  var $entryNotes = document.createElement('p');
  $entryNotes.className = 'entry-par';
  $entryNotes.textContent = entry.notes;
  $textCol.appendChild($entryNotes);

  return $li;
}

function refreshNewEntry() {
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  data.editing = null;
}

function deleteEntryFromData(id) {
  for (var i = 0; i < data.entries.length; i++) {
    if (id == data.entries[i].id) {
      data.entries.splice(i, 1);
      break;
    }
  }
}

function targetedEntry(id) {
  for (var i = 0; i < $entriesDisplayed.childNodes.length; i++) {
    if (id == $entriesDisplayed.childNodes[i].getAttribute('data-entry-id')) {
      return $entriesDisplayed.childNodes[i];
    }
  }
}
