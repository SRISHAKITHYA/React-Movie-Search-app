import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  margin-left: 100px;
`;
const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;
const WatchlistMessage = styled.div`
  margin-top: 10px;
  font-style: italic;
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [addedToWatchlist, setAddedToWatchlist] = useState();
  const { selectedMovie } = props;

  const updateWatchlist = () => {
    if (addedToWatchlist) {
      Axios.delete(`http://localhost:3030/api/watchlist/${selectedMovie}`)
        .then(() => {
          setAddedToWatchlist(false);
        })
        .catch((error) => {
          console.error("Error removing movie from watchlist:", error);
        });
    } else {
      Axios.post("http://localhost:3030/api/watchlist", {
        imdbid: selectedMovie,
        title: movieInfo.title,
        year: movieInfo.year,
        poster: movieInfo.poster,
      })
        .then(() => {
          setAddedToWatchlist(true);
        })
        .catch((error) => {
          console.error("Error adding movie to watchlist:", error);
        });
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/movie/${selectedMovie}`)
      .then((response) => {
        setMovieInfo(response.data);
        setAddedToWatchlist(response.data.isInWatchlist);
      })

      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [selectedMovie]);

  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.poster} alt={movieInfo?.title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.type}: <span>{movieInfo?.title}</span>
            </MovieName>
            <MovieInfo>
              Rated: <span>{movieInfo?.rated}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.year}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.director}</span>
            </MovieInfo>
            <MovieInfo>
              Trailer:{" "}
              <a
                href={movieInfo?.trailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                {movieInfo?.trailer}
              </a>
            </MovieInfo>

            <Button onClick={updateWatchlist}>
              {addedToWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
            </Button>

            {addedToWatchlist && (
              <WatchlistMessage>Movie already in Watchlist</WatchlistMessage>
            )}
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        <>
          <p>No info found for the selected movie</p>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      )}
    </Container>
  );
};
export default MovieInfoComponent;
