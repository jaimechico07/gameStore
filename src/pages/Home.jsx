import { useState, useEffect } from 'react';
import { fetchGenres, fetchPlatforms, fetchGames } from '../services/Api';

import Footer from '../layout/Footer';
import Header from '../layout/Header';

import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

const Home = () => {
  const [gameList, setGameList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([fetchGenres(), fetchPlatforms(), fetchGames(currentPage, gamesPerPage)])
      .then(([genresData, platformsData, gameList]) => {
        setGenres(genresData.results);
        setPlatforms(platformsData.results);
        setGameList(gameList.results);

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [currentPage, gamesPerPage]);

  return (
    <div className="min-h-screen flex flex-col  p-4 mb-10">
      <Header />
      <main className="gap-8 flex flex-col ">
        <div className="flex gap-3 ">
          <Sidebar platforms={platforms} genres={genres} />

          <Card
            gameList={gameList}
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
