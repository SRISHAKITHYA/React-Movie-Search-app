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
const FrontPageComponent = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/movies`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <MovieListContainer>
      {movies.map((movie) => (
        <MovieContainer
          key={movie.imdbid}
          onClick={() => props.onMovieSelect(movie.imdbid)}
        >
          <CoverImage src={movie.poster}></CoverImage>
          <MovieName>{movie.title}</MovieName>
          <InfoColumn>
            <MovieInfo>Year: {movie.year}</MovieInfo>
          </InfoColumn>
        </MovieContainer>
      ))}
    </MovieListContainer>
  );
};

export default FrontPageComponent;
