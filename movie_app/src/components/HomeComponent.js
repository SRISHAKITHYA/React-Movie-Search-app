import styled from "styled-components";
import MovieComponent from "./MovieComponent";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import MovieInfoComponent from "./MovieInfo";
import SearchBoxComponent from "./SearchBox";
import FrontPageComponent from "./FrontPage";
import useLocalStorage from "use-local-storage";
import WatchlistComponent from "./WatchList";
import LoginComponent from "./LoginComponent";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.011642156862745057) 0%,
    rgba(104, 176, 172, 1) 35%,
    rgba(115, 143, 149, 1) 100%
  );
  color: black;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 30px;
  justify-content: space-evenly;
  background-color: var(--background);
`;
const Paper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FilmIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const WatchlistButton = styled.span`
  margin-left: 5px;
  color: black;
  font-style: italic;
  font-size: 1.2rem;
  padding: 3px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
const BackButton = styled.button`
  background-color: transparent;
  color: blue;
  border: none;
  font-size: 16px;
  cursor: pointer;
  align: right;
`;
const BackToHome = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const LogoutButton = styled.button`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.011642156862745057) 0%,
    rgba(104, 176, 172, 1) 35%,
    rgba(115, 143, 149, 1) 100%
  );
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;
function HomeComponent() {
  const [selectedMovie, onMovieSelect] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const handleSearch = (data, hasNoResults) => {
    updateMovieList(data);
    setNoResults(hasNoResults);
  };

  const showWatchlistMovies = () => {
    setShowWatchlist(true);
  };

  const logOut = () => {
    setIsLoggedOut(true);
  };
  return isLoggedOut ? (
    <LoginComponent />
  ) : (
    <Container data-theme={theme}>
      <Header>
        <AppName>
          <MovieImage src="/movie.png" />
          FilmFiesta
        </AppName>

        <SearchBoxComponent onSearch={handleSearch} />
        <FilmIconContainer>
          <FontAwesomeIcon
            icon={faFilm}
            style={{ marginLeft: "10px", fontSize: "24px", color: "black" }}
          />

          <WatchlistButton onClick={showWatchlistMovies}>
            Watchlist
          </WatchlistButton>
        </FilmIconContainer>
        <LogoutButton onClick={logOut}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </LogoutButton>

        <div className="theme-toggle">
          <i onClick={switchTheme} className="fas fa-toggle-on"></i>
        </div>
      </Header>
      {showWatchlist ? (
        <>
          <BackToHome>
            <BackButton onClick={() => setShowWatchlist(false)}>
              Back to home
            </BackButton>
          </BackToHome>

          <WatchlistComponent />
        </>
      ) : (
        <>
          {selectedMovie && (
            <MovieInfoComponent
              selectedMovie={selectedMovie}
              onMovieSelect={onMovieSelect}
            />
          )}
          {noResults && (
            <Paper>
              "Oops! no matching records found. Few other recommended movies."
            </Paper>
          )}
          <MovieListContainer>
            {movieList?.length ? (
              movieList.map((movie, index) => (
                <MovieComponent
                  key={index}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                />
              ))
            ) : (
              <FrontPageComponent onMovieSelect={onMovieSelect} />
            )}
          </MovieListContainer>
        </>
      )}
    </Container>
  );
}

export default HomeComponent;
