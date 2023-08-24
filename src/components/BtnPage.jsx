import React from 'react';
import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from 'react-icons/tb';

const BtnPage = ({ handleNextPage, handlePrevPage, currentPage }) => {
  return (
    <div className="flex text-white justify-center gap-8 mt-10">
      <button
        className="flex items-center space-x-2 px-3 py-2 bg-[#2c2a29]  rounded-lg"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <TbArrowBigLeftLineFilled className="text-white text-2xl" />
        <span className="font-semibold">Prev</span>
      </button>
      <button className="flex items-center space-x-2 px-3 py-2 bg-[#2c2a29]  rounded-lg" onClick={handleNextPage}>
        <span className="font-semibold">Next</span>
        <TbArrowBigRightLineFilled className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default BtnPage;
