// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 20px 30px;
//   justify-content: center;
//   border-bottom: 1px solid lightgray;
// `;
// const CoverImage = styled.img`
//   object-fit: cover;
//   height: 350px;
// `;
// const InfoColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 20px;
// `;
// const MovieName = styled.span`
//   font-size: 22px;
//   font-weight: 600;
//   color: black;
//   margin: 15px 0;
//   white-space: nowrap;
//   overflow: hidden;
//   text-transform: capitalize;
//   text-overflow: ellipsis;
//   & span {
//     opacity: 0.8;
//   }
// `;
// const MovieInfo = styled.span`
//   font-size: 16px;
//   font-weight: 500;
//   color: black;
//   overflow: hidden;
//   margin: 4px 0;
//   text-transform: capitalize;
//   text-overflow: ellipsis;

//   & span {
//     opacity: 0.5;
//   }
// `;
// const Close = styled.span`
//   font-size: 16px;
//   font-weight: 600;
//   color: black;
//   background: lightgray;
//   height: fit-content;
//   padding: 8px;
//   border-radius: 50%;
//   cursor: pointer;
//   opacity: 0.8;
//   margin-left: 100px;
// `;
// const MovieInfoComponent = (props) => {
//   const [movieInfo, setMovieInfo] = useState();
//   const [addedToWatchlist, setAddedToWatchlist] = useState();
//   const { selectedMovie } = props;

//   const updateWatchlist = () => {
//     const storedWatchlist = localStorage.getItem("watchlist");
//     const watchlistData = storedWatchlist ? JSON.parse(storedWatchlist) : {};

//     watchlistData[selectedMovie] = !watchlistData[selectedMovie];

//     localStorage.setItem("watchlist", JSON.stringify(watchlistData));

//     setAddedToWatchlist(watchlistData[selectedMovie]);
//   };
//   useEffect(() => {
//     Axios.get(`http://localhost:3030/api/movie/${selectedMovie}`)
//       .then((response) => {
//         setMovieInfo(response.data);
//         const storedWatchlist = localStorage.getItem("watchlist");
//         if (storedWatchlist) {
//           const watchlistData = JSON.parse(storedWatchlist);
//           setAddedToWatchlist(watchlistData[selectedMovie] === true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching movie data:", error);
//       });
//   }, [selectedMovie]);
//   return (
//     <Container>
//       {movieInfo ? (
//         <>
//           <CoverImage src={movieInfo?.poster} alt={movieInfo?.title} />
//           <InfoColumn>
//             <MovieName>
//               {movieInfo?.type}: <span>{movieInfo?.title}</span>
//             </MovieName>
//             <MovieInfo>
//               Rated: <span>{movieInfo?.rated}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Year: <span>{movieInfo?.year}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Released: <span>{movieInfo?.released}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Runtime: <span>{movieInfo?.runtime}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Genre: <span>{movieInfo?.genre}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Director: <span>{movieInfo?.director}</span>
//             </MovieInfo>
//             <MovieInfo>
//               Trailer:{" "}
//               <a
//                 href={movieInfo?.trailer}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {movieInfo?.trailer}
//               </a>
//             </MovieInfo>

//             <button onClick={updateWatchlist}>
//               {addedToWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
//             </button>
//             {addedToWatchlist && <div>Movie already in Watchlist</div>}
//           </InfoColumn>
//           <Close onClick={() => props.onMovieSelect()}>X</Close>
//         </>
//       ) : (
//         <>
//           <p>No info found for the selected movie</p>
//           <Close onClick={() => props.onMovieSelect()}>X</Close>
//         </>
//       )}
//     </Container>
//   );
// };
// export default MovieInfoComponent;
