/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data-JSON');
if (previousDataJSON) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', handleClose);

function handleClose(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-JSON', dataJSON);
}
