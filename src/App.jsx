import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import { setBannerData,setImageURL } from './store/movieSlice';

function App() {
  
  const dispatch = useDispatch()

  const fetchNowPlaying = async()=>{
    try {
        const response = await axios.get('/movie/now_playing?include_adult=false&language=fr-FR')
        dispatch(setBannerData(response.data.results))
    } catch (error) {
        console.log("error",error)
    }
  }

  const fetchConfiguration = async()=>{
    try {
        const response = await axios.get("/configuration")
        dispatch(setImageURL(response.data.images.secure_base_url+"original"))
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    fetchNowPlaying()
    fetchConfiguration()
  })
  
  return (
    <main className='pb-14 lg:pb-0'>
        <Header/>
        <div className='min-h-[90vh]'>
            <Outlet/>
        </div>
        <Footer/>
    </main>
  );
}

export default App;
