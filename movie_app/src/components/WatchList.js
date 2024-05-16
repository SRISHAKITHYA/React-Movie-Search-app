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
  flex-wrap: wrap;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-tranform: capitalize;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  padding: 30px;
  justify-content: space-evenly;
`;

const SelectedMovieContainer = styled.div`
  flex: 1;
`;

const PlaylistContainer = styled.div`
  flex: 1;
`;
const Heading = styled.div`
  display: flex;
  justify-content: center;
`;

const WatchlistComponent = (props) => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://react-movie-search-app-rmk4.onrender.com/api/watchlist`
        );

        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setWatchlistMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div style={{ display: "flex" }}>
      <SelectedMovieContainer>
        {selectedMovie && (
          <MovieContainer key={selectedMovie.imdbid} isNew={true}>
            <CoverImage src={selectedMovie.poster}></CoverImage>
            <MovieName>{selectedMovie.title}</MovieName>
            <InfoColumn>
              <MovieInfo>Year: {selectedMovie.year}</MovieInfo>
            </InfoColumn>
          </MovieContainer>
        )}
      </SelectedMovieContainer>
      <PlaylistContainer>
        <Heading>Select a movie from your picks to stream it </Heading>
        <MovieListContainer>
          {watchlistMovies.map((movie, index) => (
            <MovieContainer
              key={movie.imdbid}
              isNew={index === watchlistMovies.length - 1}
              onClick={() => handleMovieClick(movie)}
            >
              <CoverImage src={movie.poster}></CoverImage>
              <MovieName>{movie.title}</MovieName>
              <InfoColumn>
                <MovieInfo>Year: {movie.year}</MovieInfo>
              </InfoColumn>
            </MovieContainer>
          ))}
        </MovieListContainer>
      </PlaylistContainer>
    </div>
  );
};

export default WatchlistComponent;
