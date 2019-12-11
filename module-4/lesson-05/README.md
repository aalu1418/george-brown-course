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

1. When "authorizing", handle the rejection case based on error code

- Log the user out from local storage
- The user should end up on the Log In page without a manual redirect

2. Navigate to the `/authorized` route when accepted

- Navigate with the `<Redirect />` component

3. Navigate to `/` when refreshed on `/authorized`
