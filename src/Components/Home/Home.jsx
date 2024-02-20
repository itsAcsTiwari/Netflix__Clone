import React, { useEffect, useState } from 'react'
import './home.scss'
import axios from 'axios'
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";

const api_key="f2000d338d9acf55c4a5e6e0c8a6cf9e"
const url="https://api.themoviedb.org/3/movie"
const popular="popular"
const imgUrl="https://image.tmdb.org/t/p/original/"
const nowPlaying="now_playing"
const topRated="top_rated"
const upcoming="upcoming"

const Card = ({img}) =>(
    <img className='card' src={img} alt="" />
)

const Row =({title, arr=[]})=>(

  <div className='row'>

    <h2>{title}</h2>

    <div>
      {
        arr.map((item, index)=>(
          <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>

        ))
      }
   
    </div>
  </div>

)

const Home = () => {

  const [popularMovies,setpopularMovies]=useState([]);
  const [nowplaying,setnowplaying]=useState([]);
  const [topratedMovies,settopratedMovies]=useState([]);
  const [upcomingMovies,setupcomingMovies]=useState([]);

  useEffect(()=>{
    const fetchPopular= async()=>{
      const {
        data:{results},
      }=await axios.get(`${url}/${popular}?api_key=${api_key}`)
      
      setpopularMovies(results);
      
    };
    const fetchNowPlaying= async()=>{
      const {
        data:{results},
      }=await axios.get(`${url}/${nowPlaying}?api_key=${api_key}`)
      
      setnowplaying(results);
      
    };
    const fetchTopRated= async()=>{
      const {
        data:{results},
      }=await axios.get(`${url}/${topRated}?api_key=${api_key}`)
      
      settopratedMovies(results);
      
    };

    const fetchUpcoming= async()=>{
      const {
        data:{results},
      }=await axios.get(`${url}/${upcoming}?api_key=${api_key}`)
      
      setupcomingMovies(results);
      
    };

    


    fetchPopular();
    fetchNowPlaying();
    fetchTopRated();
    fetchUpcoming();

  },[])

  return (
    <section className='home'>
      <div className="banner"  style={{
        backgroundImage:popularMovies[3]? `url(${`${imgUrl}/${popularMovies[3].poster_path}`})`:"rgb(16, 16, 16)"
      }}>

        {popularMovies[3] && (<h1>{popularMovies[3].original_title}</h1>) }
        { popularMovies[3] && ( <p>{popularMovies[3].overview}</p> ) }

      <div>
        <button>  <BiPlay /> Play </button>
        <button>My List <AiOutlinePlusSquare/> </button>
      </div>

       
      

      </div>

      <Row title={"Popular on Netflix"} arr={popularMovies}/>
      <Row title={"Movies"} arr={nowplaying}/>
      <Row title={"Recently Added"} arr={topratedMovies}/>
      <Row title={"My List"} arr={upcomingMovies}/>
    </section>
    
      
    
  )
}

export default Home
