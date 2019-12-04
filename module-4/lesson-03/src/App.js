import './App.css'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Skeleton from '@material-ui/lab/Skeleton'
import Button from '@material-ui/core/Button'
import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom'

import firebase from 'firebase'

import fetchData from './utils/fetchData'

const firebaseConfig = {
  apiKey: 'AIzaSyBjMsOoWsy6MkmsTLZ_ZHeXL1wtt-7J7fU',
  authDomain: 'gb-fullstackiv-lesson03.firebaseapp.com',
  databaseURL: 'https://gb-fullstackiv-lesson03.firebaseio.com',
  projectId: 'gb-fullstackiv-lesson03',
  storageBucket: 'gb-fullstackiv-lesson03.appspot.com',
  messagingSenderId: '682564674884',
  appId: '1:682564674884:web:9926b7eef708990fcf6311',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const RECOMMENDED_CATS_URL =
  'https://api.thecatapi.com/v1/images/search?limit=10'

const CAT_URL = 'https://api.thecatapi.com/v1/images/'

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <div>
            <h1 className='App-Title'>Cat Adoption App</h1>

            <Switch>
              <Route path='/cat/:catId'>
                <CatPage />
              </Route>
              <Route path='/'>
                <HomePage />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <div>
      <FeaturedCatsGrid />
      <FavoritedCatsRow />
      <RecommendedCatsGrid />
    </div>
  )
}

function CatPage() {
  // const catId = window.location.search.replace('?catId=', '')
  const { catId } = useParams()
  const [cat, setCat] = React.useState(null)

  React.useEffect(() => {
    fetchData(CAT_URL + catId).then(result => setCat(result))
  }, [catId])

  if (!catId || !cat) {
    return null
  }

  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>
      <div>
        <img src={cat.url} alt='Cat' />
      </div>
    </div>
  )
}

function FavoritedCatsRow() {
  const [favoriteCatIds, setFavoriteCatIds] = React.useState(null)
  const [favoriteCats, setFavoriteCats] = React.useState([])

  React.useEffect(() => {
    const localStorageCats = getFavoriteCatsFromStorage()
    if (localStorageCats.length) {
      setFavoriteCatIds(localStorageCats)
    }
  }, [])

  React.useEffect(() => {
    if (favoriteCatIds == null || favoriteCatIds.length === 0) {
      return
    }
    Promise.all(
      favoriteCatIds.map(catId => fetchData(CAT_URL + catId)),
    ).then(result => setFavoriteCats(result))
  }, [favoriteCatIds])

  if (favoriteCatIds == null) {
    return null
  }

  return (
    <div>
      <h1>Favorites</h1>
      <Grid container>
        {favoriteCats.map(favoriteCat => (
          <CatItem key={favoriteCat.id} cat={favoriteCat} />
        ))}
      </Grid>
    </div>
  )
}

function RecommendedCatsGrid() {
  const [cats, setCats] = React.useState(null)

  React.useEffect(() => {
    fetchData(RECOMMENDED_CATS_URL).then(result => setCats(result))
  }, [])

  if (cats == null) {
    return (
      <div className='Loader'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <h1>Recommended</h1>
      <Grid container>
        {cats.map(cat => (
          <CatItem key={cat.id} cat={cat} />
        ))}
      </Grid>
    </div>
  )
}

function CatItem({ cat }) {
  return (
    <div className='CatItem'>
      <Link
        // to={{
        //   pathname: 'cat',
        //   search: '?catId=' + cat.id,
        // }}
        to={'cat/' + cat.id}
      >
        <CatPhoto cat={cat} />
        <CatBreed cat={cat} />
        <CatFavoriteButton cat={cat} />
      </Link>
    </div>
  )
}

function CatPhoto({ cat }) {
  const [hasLoaded, setHasLoaded] = React.useState(false)

  React.useEffect(() => {
    const image = new Image()
    image.src = cat.url
    image.onload = () => {
      // setTimeout(() => setHasLoaded(true), 3000)
      setHasLoaded(true)
    }
  }, [cat])

  return (
    <div className='CatPhoto'>
      {hasLoaded ? (
        <div
          className='CatPhoto-Image'
          style={{
            backgroundImage: `url(${cat.url})`,
          }}
        />
      ) : (
        <Skeleton variant='rect' height={100} />
      )}
    </div>
  )
}

function CatBreed({ cat }) {
  const hasBreeds = Array.isArray(cat.breeds) && cat.breeds.length > 0

  let className = 'CatBreed'
  if (!hasBreeds) {
    className += ' CatBreed__Dimmed'
  }

  return (
    <div className={className}>
      Breed(s):{' '}
      {hasBreeds ? (
        cat.breeds.map(breed => <span key={breed.id}>{breed.name}</span>)
      ) : (
        <span>Unknown</span>
      )}
    </div>
  )
}

function CatFavoriteButton({ cat }) {
  const onClick = () => {
    const favoriteCats = getFavoriteCatsFromStorage()

    if (favoriteCats.includes(cat.id)) {
      return
    }

    window.localStorage.setItem(
      'favorite-cats',
      JSON.stringify([...favoriteCats, cat.id]),
    )
  }

  return (
    <Button variant='contained' color='primary' size='small' onClick={onClick}>
      Favorite
    </Button>
  )
}

function getFavoriteCatsFromStorage() {
  return JSON.parse(window.localStorage.getItem('favorite-cats')) || []
}

function FeaturedCatsGrid() {
  const [featuredCatIds, setFeaturedCatIds] = React.useState(null)
  const [featuredCats, setFeaturedCats] = React.useState([])

  React.useEffect(() => {
    const db = firebase.firestore()
    const featuredRef = db.collection('featured').doc('featured')
    featuredRef
      .get()
      .then(doc => {
        const catObj = doc.data()
        setFeaturedCatIds(catObj.featured)
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  }, [])

  React.useEffect(() => {
    if (featuredCatIds == null || featuredCatIds.length === 0) {
      return
    }
    Promise.all(
      featuredCatIds.map(catId => fetchData(CAT_URL + catId)),
    ).then(result => setFeaturedCats(result))
  }, [featuredCatIds])

  if (featuredCats.length === 0 ) {
    return (
      <div className='Loader'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <h1>Featured</h1>
      <Grid container>
        {featuredCats.map(cat => (
          <CatItem key={cat.id} cat={cat} />
        ))}
      </Grid>
    </div>
  )
}
