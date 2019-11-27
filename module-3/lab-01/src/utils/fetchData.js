export default async function fetchData(url, setData) {
  return fetch(url)
    .then(response => response.json())
    .then(
      result =>
        new Promise(resolve => {
          setTimeout(() => {
            setData(result)
            resolve(result)
          }, 3000)
        }),
    )
}
