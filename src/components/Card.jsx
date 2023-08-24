import React, { useState, useEffect, useRef } from 'react';
import { fetchGamesDetails } from '../services/Api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BtnPage from './BtnPage';

import { AiFillStar } from 'react-icons/ai';
import { BiSolidCalendarStar } from 'react-icons/bi';

const Card = ({ gameList, currentPage, handlePrevPage, handleNextPage, isLoading, onIncrementCart }) => {
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const [clickedGameDetails, setClickedGameDetails] = useState(null);
  const detailsRef = useRef(null);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const closeDetails = () => {
    setClickedGameDetails(null);
  };

  function getStoredPrice(gameId) {
    const storedPrice = localStorage.getItem(`price_${gameId}`);
    if (storedPrice) {
      return storedPrice;
    } else {
      const newPrice = generateRandomNumber(70, 300);
      localStorage.setItem(`price_${gameId}`, newPrice);
      return newPrice;
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const handleClickOutside = event => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        closeDetails();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full">
      {isLoading ? ( // Check if loading
        <div className="flex items-center justify-center w-full h-screen">
          <span className="loader"></span>
        </div>
      ) : gameList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(450px,_1fr))] w-full place-items-center gap-4 justify-center">
          {gameList?.map(game => (
            <div
              key={game.id}
              className="bg-[#2c2a29] rounded-2xl flex flex-col w-full relative"
              onMouseEnter={() => setHoveredGameId(game.id)}
              onMouseLeave={() => setHoveredGameId(null)}
            >
              <img src={game.background_image} className="w-full h-52 object-cover rounded-t-2xl" alt={game.name} />
              <div className="grid grid-cols-2 gap-3 p-6 ">
                <div>
                  <h2 className="text-xl text-center md:text-start text-white break-words">{game.name}</h2>
                  <button className="bg-[#f90] px-10 w-full text-white py-1 mt-2 rounded-2xl hover:-translate-y-1 transition-all duration-200">
                    Buy
                  </button>
                </div>
                <ul className="text-white flex flex-col items-end">
                  <li className="flex items-center gap-1">
                    <AiFillStar className="text-yellow-500 text-xl" />
                    {game.rating}
                  </li>
                  <li className="flex items-center gap-1">
                    <BiSolidCalendarStar className="text-red-500 text-xl" />
                    {game.released}
                  </li>
                  <li className="text-end text-gray-400 text-sm ">Precio: ${getStoredPrice(game.id)}</li>
                </ul>
              </div>
              {hoveredGameId === game.id && (
                <div
                  className="absolute -bottom-[50%] inset-x-0 grid grid-cols-1 gap-3 px-6 pb-6  z-10 
                  bg-[#2c2a29] rounded-b-2xl "
                >
                  <div>
                    <h2 className="text-white">Plataformas:</h2>
                    <p className="text-gray-400 ">
                      {game.platforms.map(platform => platform.platform.name).join(', ')}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-white">Género:</h2>
                    <p className="text-gray-400 ">{game.genres.map(genere => genere.name).join(', ')}</p>
                  </div>
                  <button
                    className="text-white bg-black/50 rounded-full py-1 hover:-translate-y-1 transition-all duration-200"
                    onClick={async () => {
                      try {
                        const details = await fetchGamesDetails(game.id);
                        setClickedGameDetails(details);
                      } catch (error) {
                        console.error('Error fetching game details:', error);
                      }
                    }}
                  >
                    More details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Mostrar el mensaje si la lista de juegos está vacía
        <p className="text-white text-center">Juegos no disponibles</p>
      )}
      <BtnPage handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} />
      {clickedGameDetails && (
        <div
          data-aos="fade-up"
          ref={detailsRef}
          onClick={closeDetails}
          className="fixed bottom-0 inset-x-0  z-50  grid grid-cols-1 gap-3 px-6 py-6 transition ease-linear duration-300  bg-black/70 "
        >
          <h2 className="text-white text-5xl pt-2 text-center">{clickedGameDetails.name}</h2>
          <div className="text-white  text-justify">{clickedGameDetails.description_raw}</div>
        </div>
      )}
    </section>
  );
};

export default Card;
