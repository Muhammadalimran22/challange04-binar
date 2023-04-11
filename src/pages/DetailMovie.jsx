import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import "../style/Detail.css";

const baseUrl = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

function DetailMovie() {
  const [detailMovie, setDetailMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getDetailMovie() {
      try {
        const response = await axios.get(`${baseUrl}/movie/${params.id}?api_key=${apiKey}&language=en-US`);
        setDetailMovie(response.data);
      } catch (error) {
        alert(error);
      }
    }

    getDetailMovie();
  }, [params]);

  return (
    <>
      <NavbarComponent />
      <Carousel>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate">{detailMovie?.vote_average}</p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default DetailMovie;
