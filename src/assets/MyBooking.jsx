import { useState } from "react";
import useLocalStorage from "./sec&storage/useLocalStorage";
import { useAuth } from "./sec&storage/AuthContext";
import spaces from "./Data/spaces.json";

export default function Bookings() {
  const { isLoggedIn } = useAuth();
  const [reservations, setReservations] = useLocalStorage("reservations", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getSpace = (id) => spaces.find((s) => s.id === id);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const cancelBooking = () => {
    if (!selectedBooking) return;
    const updated = reservations.filter((r) => r.id !== selectedBooking.id);
    setReservations(updated);
    setModalOpen(false);
    setSelectedBooking(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-20 px-6 bg-[#1A202C] min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">📖 My Bookings</h1>
        <p className="text-gray-400">Please log in to view your bookings.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 bg-[#1A202C] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">📖 My Bookings</h1>

      {reservations.length === 0 ? (
        <p className="text-gray-400">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((r) => {
            const space = getSpace(r.spaceId);
            return (
              <div key={r.id} className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col">
                <img src={space?.main_image} alt={space?.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-xl font-bold">{space?.name}</h2>
                <p className="text-gray-400">{space?.location}</p>
                <p className="mt-2"><span className="font-semibold">Date:</span> {r.date}</p>
                <p><span className="font-semibold">Time Slot:</span> {r.timeSlot}</p>
                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => openModal(r)}>
                  Cancel
                </button>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-between gap-4">
              <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded w-1/2" onClick={() => setModalOpen(false)}>
                No
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-1/2" onClick={cancelBooking}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
