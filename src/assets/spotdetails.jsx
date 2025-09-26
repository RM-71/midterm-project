import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "./sec&storage/useLocalStorage";
import spaces from "./Data/spaces.json";
import { useAuth } from "./sec&storage/AuthContext";

export default function SpotDetails() {
  const params = useParams();
  const id = params.id ?? params.spaceId;
  const navigate = useNavigate();
  const space = spaces.find(s => String(s.id) === String(id));
  const { isLoggedIn } = useAuth();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [reservations, setReservations] = useLocalStorage("reservations", []);

  if (!space) {
    return (
      <div className="pt-20 p-6 text-white">
        <p>Space not found.</p>
        <button onClick={() => navigate("/Home")} className="mt-4 px-4 py-2 bg-blue-600 rounded">Back to home</button>
      </div>
    );
  }

  const uid = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "b" + Date.now().toString());

  const handleReserve = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("⚠️ Please log in to book a space.");
      navigate("/", { replace: true });
      return;
    }
    if (!date || !timeSlot) {
      alert("⚠️ Please select a date and time slot.");
      return;
    }

    // global booking: prevent exact duplicates (space+date+timeslot)
    const already = reservations.some(r => r.spaceId === space.id && r.date === date && r.timeSlot === timeSlot);
    if (already) {
      alert("⚠️ This space is already booked for that date/time.");
      return;
    }

    const newBooking = { id: uid(), spaceId: space.id, date, timeSlot, createdAt: new Date().toISOString() };
    setReservations([...reservations, newBooking]);
    alert(`✅ Reservation confirmed for ${space.name} on ${date} at ${timeSlot}`);
  };

  return (
    <div className="pt-20 flex flex-col md:flex-row bg-[#1A202C] p-6 overflow-y-auto min-h-screen">
      <img src={space.main_image} alt={space.name} className="md:w-1/2 w-full h-96 md:h-[550px] object-cover rounded-2xl shadow-lg" />
      <div className="mt-6 md:mt-0 md:ml-8 text-white flex-1">
        <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
        <p className="text-gray-300 mb-2">{space.location}</p>
        <p className="text-gray-400 mb-4">{space.description}</p>

        <ul className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(space.amenities) && space.amenities.map((a, i) => (
            <li key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200">{a}</li>
          ))}
        </ul>

        <p className="text-[#90EE90] font-semibold text-lg mb-6">₱{space.price} / day</p>

        <form onSubmit={handleReserve} className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4">Book this space</h2>

          <div className="mb-4">
            <label htmlFor="check-in" className="block text-sm font-medium text-gray-300 mb-1">Check-in Date</label>
            <input type="date" id="check-in" value={date} min={today} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Time Slot</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white">
              <option value="">-- Select a time slot --</option>
              {Array.isArray(space.time_slots) && space.time_slots.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium">Reserve</button>
        </form>
      </div>
    </div>
  );
}
