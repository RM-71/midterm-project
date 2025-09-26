import { useState } from "react";
import { useNavigate } from "react-router-dom";
import spaces from "./Data/spaces.json"; 

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(search.toLowerCase()) ||
    space.location.toLowerCase().includes(search.toLowerCase())
  );
  const handleBookNow = (id) => {
  navigate(`/Book_Spots/${id}`);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-[#1A202C] p-6 overflow-hidden">
      <div className="mt-24 w-full flex justify-center">
        <input
          type="text"
          placeholder="Search study spots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[50%] p-3 rounded-lg border border-gray-300 text-black shadow-md"
        />
      </div>

      <div className="mt-10 w-full max-w-7xl flex-1 overflow-y-auto scrollbar-custom pr-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 h-[450px] flex flex-col"
            >
              <img
                src={space.main_image}
                alt={space.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {space.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{space.location}</p>
                <p className="text-gray-700 text-sm flex-1 overflow-hidden">
                  {space.description.slice(0, 80)}...
                </p>
                <button onClick={() => handleBookNow(space.id)} className="mt-2 bg-[#273F2C] text-white py-2 px-4 rounded-lg">Book Now</button>
                <p className="text-[#546461] font-semibold mt-2">
                  ₱{space.price} / day
                </p>
              </div>
            </div>
          ))}
          {filteredSpaces.length === 0 && (
            <>
              <h1 className="col-span-3 text-center text-white text-4xl align-middle mt-20 font-roboto-flex">No study spots found.</h1>
              <p className="col-span-3 text-center text-white text-md">Looks like we couldn’t find anything. Want to try again?.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}