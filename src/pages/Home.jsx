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

  const handleIncrementCart = () => {
    // Handle cart increment logic here
    // For example, you could update a cart state or call an API
    // to update the cart on the server.
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product }]);
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
            onIncrementCart={handleIncrementCart}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
