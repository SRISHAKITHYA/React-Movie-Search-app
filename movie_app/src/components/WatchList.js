import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 15px 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* Align items vertically */
`;
const PlayButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: darkgreen;
  }

  &:focus {
    outline: none;
  }
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 30px;
  justify-content: space-evenly;
`;
const Heading = styled.div`
  font-style: bold;
  font-size: 20px;
  text-align: center;
`;

const WatchlistComponent = (props) => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://react-movie-search-app-rmk4.onrender.com/api/watchlist`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWatchlistMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handlePlayButtonClick = (movie) => {
    console.log(`Playing ${movie.title}`);
  };

  return (
    <>
      <Heading>Play the movie from your picks, Happy Watching!</Heading>
      <MovieListContainer>
        {watchlistMovies.map((movie) => (
          <MovieContainer key={movie.imdbid}>
            <CoverImage src={movie.poster}></CoverImage>
            <MovieName>{movie.title}</MovieName>
            <InfoColumn>
              <MovieInfo>Year: {movie.year}</MovieInfo>
              <PlayButton onClick={() => handlePlayButtonClick(movie)}>
                Play
              </PlayButton>
            </InfoColumn>
          </MovieContainer>
        ))}
      </MovieListContainer>
    </>
  );
};

export default WatchlistComponent;
