1. Clone this repo
1. `cd` into this directory
1. Run `npm install`
1. Run `npm start`
1. Go into `src/App.js` to do the exercise

---

- Criteria (Part 1):

  - Login username saved to `localStorage`
  - Navigate to the results page
  - Hide the "login" button and show the username

---

- Criteria (Part 2):

  - `useQuery` hook exists - use that for getting query params
  - When filter is activated, add the query params
    -> `?meat=SOMETHING_HERE`
  - When filter is deactivated, remove the query params
  - When page is refreshed with query params, activate the correct filters
