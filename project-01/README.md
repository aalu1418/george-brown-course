# Project: Checkout Form
### Submission Details
Aaron Lu - 101278524  
Deployed Website:  https://gb-fullstackiii-project.web.app/  
Github Repository: https://github.com/aalu1418/george-brown-course/tree/master/project-01

###### Included Technologies
- React
- Firebase (Firestore)
- npm
---

### Useful Links
- [Starting Firebase & React](https://www.youtube.com/watch?v=mwNATxfUsgI)

### Task list
- [ ] Create basic form with 3 sections in React (using states to store info)
- [ ] Hide each form until previous section completed
- [ ] Include Continue/Submit button functionality
- [ ] Network offline handling
- [ ] Integrate with Firestore
  - [ ] Setup rules to allow for writing by anyone, but not reading
  - [ ] Show submit loading state & completed state for submit button
- [ ] Style with CSS - Bootstrap?

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

### Submission Details
Use the `project-01` directory in [github.com/amsul/george-brown-course](https://github.com/amsul/george-brown-course) as your starting point.

Once your project is complete:

1. Add a list of your team members (name & ID) in the `README.md` file.
2. ZIP up the `project-01` directory.
3. Upload the ZIP file on Blackboard.

The ZIP file should contain all the files necessary to simply unzip and be able to run the project with `npm start`.
