import styled from "styled-components";
export const MovieContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-tranform: capitalize;
`;
const MovieComponent = (props) => {
  const { title, year, imdbid, type, poster } = props.movie;
  return (
    <MovieContainerStyle onClick={() => props.onMovieSelect(imdbid)}>
      <CoverImage src={poster} alt={title} />
      <MovieName>{title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year: {year}</MovieInfo>
        <MovieInfo>Type: {type}</MovieInfo>
      </InfoColumn>
    </MovieContainerStyle>
  );
};
export default MovieComponent;
