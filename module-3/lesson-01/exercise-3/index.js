console.log('Hi there :)')

const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));

$("button").click(() => {
  dialog.open();
})
