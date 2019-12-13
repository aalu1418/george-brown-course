1. Clone this repo
1. `cd` into this directory
1. Run `npm install`
1. Run `npm start`
1. Go into `src/App.js` and `src/sendTransaction.js` to do the exercise

---

Criteria:

- Update the function to accept a `fromAddress`
- Update the function to accept an optional `message`
- Convert the `message` using the ethers.js util
  - Only when there is a `message`
  - https://docs.ethers.io/ethers.js/html/api-utils.html#hash-function-helpers
