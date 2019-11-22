# Project: Checkout Form
### Submission Details
Aaron Lu - 101278524  
Deployed Website:  https://gb-fullstackiii-project.web.app/  
Github Repository: https://github.com/aalu1418/george-brown-course/tree/master/project-01

##### Project Description
- React
  - Matches the form requirements
  - Custom components are placed in ```components```folder with corresponding css files
    - Uses some of the given components as baseline
    - ```FormField```, ```FormFieldCheckbox```, ```FormFieldDropDown```, ```FormFieldFrame```, ```FormFieldRadioButtons```, ```FormFieldTextInput```, and ```FormSection```
    - Other components had small modifications
  - Custom hooks are placed in ```hooks``` folder
    - ```useFormState``` and ```useInfoState```
    - ```useNetworkStatusEffect``` used to check if online/offline
- npm
  - used to manage React packages and Firebase packages
- Firebase (Hosting & Firestore)
  - Firestore setup with write permissions and no read permissions
  - Hosting used to deploy site
---

### Useful Links
- [Starting Firebase & React](https://www.youtube.com/watch?v=mwNATxfUsgI)
- [Deploy React on Firebase Hosting](https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf)
- [Firebase Firestore + React](https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364)

### Task list
- [x] Create basic form with 3 sections in React (using states to store info)
- [x] Include Continue/Submit button functionality
- [x] Hide each form until previous section completed
- [x] Network offline handling
- [x] Integrate with Firestore
  - [x] Setup rules to allow for writing by anyone, but not reading
  - [x] Show submit loading state & completed state for submit button
- [x] Deploy with Firebase
  - run ```npm run build``` and ```firebase deploy```
- [x] Commenting code
- [x] Style with CSS using BEM format
- [ ] Bonus things
  - [x] Disable form when ```submit``` button is clicked
  - [ ] Spinning icon when loading
  - [ ] Handle if text entry is only spaces
  - [x] Readme writeup
  - [ ] Save & restore fields to local storage when each section is completed; Clear local storage after saving to Firestore

### Questions
- [ ] ```React Hook React.useEffect has missing dependencies``` warning (but not needed as dependencies)

---
### Specifications
Link for [Full Details](https://www.notion.so/Project-Checkout-Form-cc2deee7fee94165a5678ba5958242a7)
- Use Firestore as your database.
- Use React as your UI library.
- Apply your own styling with CSS.
- Create a form consisting of 3 sections:
    1. Basic Info:
        1. Text Input: First Name
        2. Text Input: Last Name
        3. Dropdown: Diet Restriction  
            Options: None, Vegan, Vegetarian, Halal/Kosher
    2. Address Info:
        1. Text Input: City
        2. Dropdown: Province
    3. Payment Info:
        1. Radio: Bitcoin | PayPal | Credit Card
        2. Checkbox: Agree to Terms & Conditions
- Hide each form section until the previous section is completed.
- Save all the data when the last section is completed.
- Show the loading state when saving the data.
- Disable the button and show a warning when there is no network connection.
- Disable the button when a section is not complete.

### Rubric
- Firestore correctly initialized
- Firestore documents created with all required data
- Correct use of BEM class names
- Form: Basic Info has all fields
- Form: Address Info has all fields
- Form: Payment Info has all fields
- One form section visible at a time
- Network offline message
- Submit disabled without a connection
- Submit disabled when visible section not completed
- Submit button text updated while saving
- Component markup shared between various field types
- Component hooks shared between various field types
- Avoid using side-effects; except with useEffect
- All field labels and inputs included
- Correct layout of sections
- Correct layout of fields
- BONUS: Save & restore fields to local storage when each section is completed; Clear local storage after saving to Firestore

### Submission Details
Use the `project-01` directory in [github.com/amsul/george-brown-course](https://github.com/amsul/george-brown-course) as your starting point.

Once your project is complete:

1. Add a list of your team members (name & ID) in the `README.md` file.
2. ZIP up the `project-01` directory.
3. Upload the ZIP file on Blackboard.

The ZIP file should contain all the files necessary to simply unzip and be able to run the project with `npm start`.
