import * as mdc from 'material-components-web';

const textFieldElements = document.querySelectorAll( '.mdc-text-field')
for (let textFieldElement of textFieldElements ) {
  const textField = new mdc.textField.MDCTextFieldd(textFieldElement);
}

const submitButtonElement = document.getElementById('submit-button'); submitButtonElement.addEventListener('click', onClickSubmit)

function onClickSubmit() {
  const {elements } = submitButtonElement.form
  const data = new Map()

  for (let element of elements) {
    if (element.tagName !== 'INPUT') {
      continue
    }

    if (element.type === 'radio') {
      if (element.checked) {
        data.set(element.name, element.id);
        continue;
      }
      continue
    }

    if (element.type === 'checkbox') {
      data.set(element.id, element.checked);
        continue
    }

    if (element.type === 'text') {
      if (element.value === '') {
        const section = element.closest('.Container_Section');
        showError(section)
        return
      }
      data.set(element.id, element.value)
      continue
    }

    throw new Error(`Unrecognized element type: ${element.type}`);
  }

  if (!data.get('diet-restrictions')) {
    const element = document.querySelector('[name="diet-restrictions"]')
  const section = element.closest('.Container_Section')
    showError(section);
    return;
  }

  console.log('Data: %o', data)
  displayData(data)
}

function displayData(data) {
  const formOutputElement = document.getElementById('form-output')
  if (!formOutputElement) { return; }
  const dataAsObject = Object.fromEntries(data.entries())
  formOutputElement.innerHTML = `
    <p>Output data:</p>
    <pre>${JSON.stringify(dataAsObject, null, '  ')}</pre>
  `
}

function showError(section) {


  section.classList.add('Container_Section__Error')
  setTimeout(() => alert('Please fill in a value for the field'), 100)
}
