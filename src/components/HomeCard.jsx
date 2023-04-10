import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async (page) => {
  const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`);
  return response.data.results;
};

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

  const PopularMovieCard = ({ title, poster, to }) => (
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
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster}`} />
      <Card.Body style={{ color: "black" }}>
        <Card.Title style={{ color: "white" }} as={Link} to={to}>
          <h4 className="text-center">{title}</h4>
        </Card.Title>
      </Card.Body>
    </Card>
  );

  return (
    <Container>
      <Row className="mx-4 py-3">
        <Col xs={12} md={8}>
          <div className="">
            <h1 style={{ color: "red" }}>Populer Movie</h1>
          </div>
        </Col>

        <Col className="d-flex justify-content-end px-3" xs={6} md={4}>
          <div className="d-flex align-items-center ">
            <button
              type="button"
              onClick={loadMoreMovies}
              style={{ border: "none", background: "black", color: "red" }}
            >
              Load More <AiOutlineArrowRight />
            </button>
          </div>

        <Col className="d-flex align-content-center justify-content-end px-3" xs={6} md={4}>
          <button type="button" onClick={loadMoreMovies} style={{ border: "none", background: "black", color: "red" }}>
            Load More <AiOutlineArrowRight />
          </button>
        </Col>
      </Row>

      <div className="d-flex flex-wrap justify-content-center">
        {popularMovieList.map((movie, i) => (
          <PopularMovieCard key={i} title={movie.title} poster={movie.poster_path} to={`/detail/${movie.id}`} />
        ))}
      </div>
    </Container>
  );
};

export default HomeCard;
