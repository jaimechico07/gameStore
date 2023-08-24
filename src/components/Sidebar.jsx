import React, { useState } from 'react';

import {
  RiMoneyDollarCircleLine,
  RiFacebookLine,
  RiYoutubeLine,
  RiInstagramLine,
  RiTwitterLine,
  RiFilter3Line,
  RiCloseLine,
} from 'react-icons/ri';

const Sidebar = ({ platforms, genres }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div
        className={`w-[80%] md:w-[40%] fixed lg:static h-min top-0 ${
          showSidebar ? 'left-0' : '-left-full'
        } lg:w-80   text-gray-400  transition-all bg-[#181A20] p-4 md:p-3 rounded-3xl shadow-2xl z-20 lg:shadow-none `}
      >
        {/* Search categorias*/}
        <div className="bg-[#362C29]/50 rounded-2xl p-4 ">
          <h4 className="mb-4 text-white text-lg">Categories</h4>
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto scroll-bar ">
            {genres?.map(genre => (
              <div key={genre.id} className="flex items-center gap-2 cursor-pointer">
                <img className="w-8 h-6 object-cover rounded-md" src={genre.image_background} alt="" />
                <p htmlFor="PC">{genre.name}</p>
              </div>
            ))}
          </div>

          {/* plataformas */}
          <h4 className="my-4 text-white text-lg">Platforms</h4>
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto scroll-bar ">
            {platforms?.map(platform => (
              <div key={platform.id} className="flex items-center gap-2">
                <input type="checkbox" id="PC" />
                <label htmlFor="PC">{platform.name}</label>
              </div>
            ))}
          </div>

          {/* rango de precios */}
          <h4 className="my-4 text-white text-lg">Price</h4>
          <form className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div className="relative">
                <RiMoneyDollarCircleLine className="absolute left-2 top-1/2 -translate-y-1/2" />
                <input type="number" className="bg-[#181A20] py-2 pl-8 pr-4 rounded-xl outline-none w-full" />
              </div>
              <span>-</span>
              <div className="relative">
                <RiMoneyDollarCircleLine className="absolute left-2 top-1/2 -translate-y-1/2" />
                <input type="number" className="bg-[#181A20] py-2 pl-8 pr-4 rounded-xl outline-none w-full" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#E58D27] text-black font-bold rounded-full w-full p-3 hover:-translate-y-1 transition-all duration-200"
            >
              Apply Filter
            </button>
          </form>
          {/* Social media */}
          <ul className="flex items-center justify-between mt-5">
            <li>
              <a href="" target="_blank" className="text-2xl">
                <RiFacebookLine />
              </a>
            </li>
            <li>
              <a href="" target="_blank" className="text-2xl">
                <RiYoutubeLine />
              </a>
            </li>
            <li>
              <a href="" target="_blank" className="text-2xl">
                <RiInstagramLine />
              </a>
            </li>
            <li>
              <a href="" target="_blank" className="text-2xl">
                <RiTwitterLine />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Button mobile */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden fixed bottom-4 right-4 bg-[#E58D27] p-4 rounded-full z-[10] text-xl"
      >
        {showSidebar ? <RiCloseLine /> : <RiFilter3Line />}
      </button>
    </>
  );
};

export default Sidebar;
