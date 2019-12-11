1. Clone this repo
1. `cd` into this directory
1. Run `npm install`
1. Run `npm start`
1. Go into `src/App.js` to do the exercise
1. Look at the `HomePage` component for the solution

---

Links:

- https://reacttraining.com/react-router/web/api/Redirect
- https://metamask.github.io/metamask-docs/Main_Concepts/Getting_Started

Criteria:

- When "authorizing", handle the rejection case based on error code
  - Log the user out from local storage
  - Navigate to the `/` route
  - Navigate with the `<Redirect />` component
- Navigate to the `/authorized` route when accepted
  - Navigate with the `<Redirect />` component
- Navigate to `/` when refreshed on `/authorized`
