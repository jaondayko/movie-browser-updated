const URL = `https://www.omdbapi.com/?apikey=`; //API key is needed.

export const jsonToText = res => {
  return res.headers.get('Content-Type').includes('json') ? res.json() : res.text()
}

const processSearchResults = ({Search, total}) => ({
  results: Search.map(oneResult),
  resultCount: total,
})

const oneResult = result => ({
  ...result,
  id: result.imdbID,
})

const CreateURL = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')
}

const configurationSend = config => {
  const grab = CreateURL(config)
  const urlChange = `${URL}&${grab}`
  console.log('Current URL', urlChange)
  return fetch(urlChange).then(jsonToText)
}

export const getAll = (movieName, page = 1, additonalConfig = {}) =>
  configurationSend({...additonalConfig, s: movieName, page})
    .then(processSearchResults)
    .then(results => ({movieName, ...results}))

export const movieQuery = (id, additonalConfig = {}) => configurationSend({...additonalConfig, i: id})