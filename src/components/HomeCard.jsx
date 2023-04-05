import React, { useEffect, useState } from "react";
import {
  /*   InputGroup,
  FormControl, */
  Container,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async (page) => {
  const response = await axios.get(
    `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`
  );
  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`
  );
  return response.data.results;
};

/* SEARCH LOGIC TMDB */
/*   const [searchedMovieList, setSearchedMovieList] = useState([]); */

const HomeCard = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovieList(page).then((results) => {
      setPopularMovieList((prevList) => [...prevList, ...results]);
    });
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const PopularMovieCard = ({ title, poster, releaseDate }) => (
    <Card
      variant="outline-danger"
      style={{
        width: "18rem",
        margin: "10px",
        background: "black",
        outlineColor: "red",
        outlineStyle: "outset",
        outlineWidth: "thin",
      }}
    >
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/original${poster}`}
      />
      <Card.Body style={{ color: "black" }}>
        <Card.Title style={{ color: "white" }}>{title}</Card.Title>
        <Card.Text style={{ color: "white" }}>
          <h6>Release date: {releaseDate}</h6>
        </Card.Text>
      </Card.Body>
    </Card>
  );

  /* SEARCH LOGIC TMDB */
  /*   const handleSearch = async (event) => {
    const query = event.target.value;
    if (!query) return setSearchedMovieList([]);
    const results = await searchMovie(query);
    setSearchedMovieList(results);
  }; */

  return (
    <Container>
      <Row className="mx-4 py-3">
        <Col xs={12} md={8}>
          <div className="">
            <h1 style={{ color: "red" }}>Populer Movie</h1>
          </div>
        </Col>
        <Col
          className="d-flex align-content-center justify-content-end px-3"
          xs={6}
          md={4}
        >
          <button
            type="button"
            onClick={loadMoreMovies}
            style={{ border: "none", background: "black", color: "red" }}
          >
            Load More <AiOutlineArrowRight />
          </button>
        </Col>
      </Row>

      {/* SEARCH LOGIC TMDB */}
      {/*  <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for a movie..."
          onChange={handleSearch}
        />
      </InputGroup> */}
      {/* {searchedMovieList.length > 0
          ? searchedMovieList.map((movie, i) => (
            <PopularMovieCard
            key={i}
            title={movie.title}
            poster={movie.poster_path}
            releaseDate={movie.release_date}
            />
          )) */}

      <div className="d-flex flex-wrap justify-content-center">
        {popularMovieList.map((movie, i) => (
          <PopularMovieCard
            key={i}
            title={movie.title}
            poster={movie.poster_path}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </Container>
  );
};

export default HomeCard;
