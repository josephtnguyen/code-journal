/* global data */
/* exported data */
var $newEntry = document.querySelector('.entry-form');
var $entryPreview = document.querySelector('.entry-preview');
var $entryUrl = document.querySelector('.entry-url');
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

var $avatarPreview = document.querySelector('.avatar-preview');
var $avatarUrl = document.querySelector('.avatar-url');
var $editProfile = document.querySelector('.profile-form');
var $profileUsername = document.querySelector('#profile-username');
var $profileFullName = document.querySelector('#profile-full-name');
var $profileLocation = document.querySelector('#profile-location');
var $profileBio = document.querySelector('#profile-bio');
var $profile = document.querySelector('.profile');

$entryUrl.addEventListener('input', handlePreview);
$entryPreview.addEventListener('error', handleImgError);
$newEntry.addEventListener('submit', handleEntrySave);

$newButton.addEventListener('click', handleNew);
document.addEventListener('DOMContentLoaded', handleDOMLoad);
$navBar.addEventListener('click', handleNav);

$entriesDisplayed.addEventListener('click', handleEntryEdit);

$deleteButton.addEventListener('click', handleDeleteRequest);
$deleteBox.addEventListener('click', handleDeleteBox);

$avatarUrl.addEventListener('input', handlePreview);
$avatarPreview.addEventListener('error', handleImgError);
$editProfile.addEventListener('submit', handleProfileSave);

$profile.addEventListener('click', handleProfileEdit);


function handlePreview(event) {
  if (event.target.closest('.entry-form')) {
    $entryPreview.setAttribute('src', event.target.value);
  } else if (event.target.closest('.profile-form')) {
    $avatarPreview.setAttribute('src', event.target.value);
  }
}

function handleImgError(event) {
  if (event.target.closest('.entry-form')) {
    $entryPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (event.target.closest('.profile-form')) {
    $avatarPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

function handleEntrySave(event) {
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

function handleProfileSave(event) {
  event.preventDefault();

  var profile = {
    avatar: $avatarUrl.value,
    username: $profileUsername.value,
    fullName: $profileFullName.value,
    location: $profileLocation.value,
    bio: $profileBio.value
  }

  data.profile = profile;

  refreshEditProfile();
  showPage('profile');
}

function handleNew(event) {
  refreshNewEntry();

  $newFooter.classList.remove('show-delete');
  $deleteButton.classList.add('hidden');

  showPage('entry-form');
}

function handleDOMLoad(event) {
  if (!(data.profile.username)) {
    showPage('edit-profile');
  } else {
    showPage(data.view);
  }

  if (data.editing) {
    $newTitle.value = data.editing.title;
    $newUrl.value = data.editing.url;
    $newNotes.value = data.editing.notes;
    $entryPreview.setAttribute('src', $newUrl.value);

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

  if (!(data.profile.username)) {
    return;
  }

  event.preventDefault();
  if (event.target.textContent === 'Entries') {
    showPage('entries');
  } else if (event.target.textContent === 'Profile') {
    showPage('profile');
  }
}

function handleEntryEdit(event) {
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

  $entryPreview.setAttribute('src', $newUrl.value);
}

function handleProfileEdit(event) {
  if (!(event.target.matches('.edit-profile-button'))) {
    return;
  }

  $avatarPreview.setAttribute('src', data.profile.avatar);

  $avatarUrl.value = data.profile.avatar;
  $profileUsername.value = data.profile.username;
  $profileFullName.value = data.profile.fullName;
  $profileLocation.value = data.profile.location;
  $profileBio.value = data.profile.bio;

  showPage('edit-profile');
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

    $deleteModal.classList.add('hidden');
    showPage('entries');
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

  if (data.entries.length !== 0) {
    $noEntriesMessage.classList.add('hidden');
  }

  if (page === 'profile') {
    $profile.innerHTML = '';
    $profile.appendChild(profileLoadOut(data.profile));
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
  $image.className = 'max-width rounded entry-preview';
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

function profileLoadOut(profile) {
  // <div data-view="profile" class="view hidden">
  //   <div class="row">
  //     <div class="column-full">
  //       <h1 class="page-heading">Full Name</h1>
  //     </div>
  //   </div>
  //
  //   <div class="row">
  //     <div class="column-half">
  //       <img class="max-width rounded avatar-preview">
  //     </div>
  //
  //     <div class="column-half">
  //       <h3 class="profile-detail">
  //         <span class="fa profile-icon"></span>
  //         username
  //       </h3>
  //       <h3 class="profile-detail">
  //         <span class="fa profile-icon"></span>
  //         location
  //       </h3>
  //       <p class="entry-par">Bio</p>
  //     </div>
  //   </div>
  // </div>

  var $profileLoadOut = document.createElement('div');

  var $rowName = document.createElement('div');
  $rowName.className = 'row';
  $profileLoadOut.appendChild($rowName);

  var $colName = document.createElement('div');
  $colName.className = 'column-full';
  $rowName.appendChild($colName);

  var $fullName = document.createElement('h1');
  $fullName.className = 'page-heading';
  $fullName.textContent = data.profile.fullName;
  $colName.appendChild($fullName);

  var $rowInfo = document.createElement('div');
  $rowInfo.className = 'row';
  $profileLoadOut.appendChild($rowInfo);

  var $colImage = document.createElement('div');
  $colImage.className = 'column-half';
  $rowInfo.appendChild($colImage);

  var $image = document.createElement('img');
  $image.className = 'max-width rounded avatar-preview';
  $image.setAttribute('src', data.profile.avatar);
  $colImage.appendChild($image);

  var $colText = document.createElement('div');
  $colText.className = 'column-half';
  $rowInfo.appendChild($colText);

  var $username = document.createElement('h3');
  $username.className = 'profile-detail';
  $username.textContent = data.profile.username;
  $colText.appendChild($username);

  var $usernameIcon = document.createElement('span');
  $usernameIcon.className = 'fa profile-icon';
  $usernameIcon.textContent = '\uf007';
  $username.prepend($usernameIcon);

  var $location = document.createElement('h3');
  $location.className = 'profile-detail';
  $location.textContent = data.profile.location;
  $colText.appendChild($location);

  var $locationIcon = document.createElement('span');
  $locationIcon.className = 'fa profile-icon';
  $locationIcon.textContent = '\uf3c5';
  $location.prepend($locationIcon);

  var $bio = document.createElement('p');
  $bio.className = 'entry-par';
  $bio.textContent = data.profile.bio;
  $colText.appendChild($bio);

  var $edit = document.createElement('button');
  $edit.className = 'edit-profile-button rounded';
  $edit.textContent = 'Edit';
  $colText.appendChild($edit);

  return $profileLoadOut;
}

function refreshNewEntry() {
  $entryPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  data.editing = null;
}

function refreshEditProfile() {
  $avatarPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $editProfile.reset();
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
