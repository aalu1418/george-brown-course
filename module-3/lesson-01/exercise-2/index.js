import {MDCDialog} from '@material/dialog';
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

$("button").click(() => {
  dialog.open();
})
