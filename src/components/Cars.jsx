import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  Heart,
  MessageSquare,
  Info,
  Plus,
  Minus,
} from "lucide-react";

export default function Cars({
  Data,
  cart,
  tambahKeranjang,
  kurangiKeranjang,
  darkMode,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColor, setFilterColor] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [popupComment, setPopupComment] = useState(null);
  const [popupDetail, setPopupDetail] = useState(null);

  useEffect(() => {
    document.body.style.overflow =
      popupComment !== null || popupDetail !== null ? "hidden" : "auto";
  }, [popupComment, popupDetail]);

  const filteredCars = Data.filter((car) => {
    const search = searchTerm.toLowerCase();
    return (
      car.name.toLowerCase().includes(search) ||
      car.color.toLowerCase().includes(search) ||
      car.price.toString().includes(search)
    );
  })
    .filter((car) => (filterColor === "All" ? true : car.color === filterColor))
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  const handleLike = (id) => setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleComment = (id, text) => {
    if (!text.trim()) return;
    setComments((prev) => ({ ...prev, [id]: [...(prev[id] || []), text] }));
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <section
      className={`py-16 px-4 sm:px-6 md:px-10 min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-yellow-100 text-black"
      }`}
    >
      {/* Title */}
      <Motion.h2
        initial={{ y: 40, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
          duration: 0.8,
        }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12"
      >
        Our Cars Collection
      </Motion.h2>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-10">
        {/* Search */}
        <div
          className={`flex items-center rounded-lg px-3 transition-colors duration-500 flex-1 sm:flex-none min-w-[220px] ${
            darkMode ? "bg-slate-700" : "bg-white"
          }`}
        >
          <Search
            className={`w-5 h-5 mr-2 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <input
            type="text"
            placeholder="Search cars by name, color, or price..."
            className={`bg-transparent outline-none py-2 transition-colors duration-500 flex-1 ${
              darkMode
                ? "text-white placeholder-gray-400"
                : "text-black placeholder-gray-500"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div
          className={`flex items-center rounded-lg px-3 relative transition-colors duration-500 flex-1 sm:flex-none min-w-[160px] ${
            darkMode ? "bg-slate-700" : "bg-white"
          }`}
        >
          <Filter
            className={`w-5 h-5 mr-2 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <select
            className={`py-2 pr-8 outline-none appearance-none transition-colors duration-500 w-full ${
              darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
            }`}
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="All">All Colors</option>
            {[...new Set(Data.map((c) => c.color))].map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
            ▼
          </div>
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition w-full sm:w-auto ${
            darkMode
              ? "bg-blue-700 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <ArrowUpDown className="w-5 h-5" />
          Sort by Price
        </button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {filteredCars.map((car, index) => (
          <Motion.div
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl relative transition-colors duration-500 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            {/* Heart */}
            <button
              onClick={() => handleLike(car.id)}
              className="absolute top-3 right-3 z-10 transition"
            >
              <Heart
                className={`w-6 h-6 ${
                  likes[car.id]
                    ? "fill-red-500 text-red-500"
                    : darkMode
                    ? "text-red-400"
                    : "text-red-500"
                }`}
              />
            </button>

            <Motion.img
              src={car.image}
              alt={car.name}
              className="w-full h-52 object-cover"
              whileHover={{ scale: 1.05 }}
            />

            <div className="p-6 space-y-2">
              <h3
                className={`text-xl font-semibold truncate ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {car.name}
              </h3>
              <p
                className={`font-bold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Rp {car.price.toLocaleString()}
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } text-sm`}
              >
                Color: {car.color}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2 mt-3">
                {(cart[car.id] || 0) === 0 ? (
                  <button
                    onClick={() => tambahKeranjang(car)}
                    className={`w-full sm:w-auto px-4 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                      darkMode
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <Plus className="w-5 h-5" /> Add to Cart
                  </button>
                ) : (
                  <div className="flex w-full sm:w-auto items-center justify-between gap-2">
                    <button
                      onClick={() => kurangiKeranjang(car)}
                      className={`px-2 py-2 rounded-lg flex items-center justify-center w-1/3 transition ${
                        darkMode
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-center w-1/3">
                      {cart[car.id]}
                    </span>
                    <button
                      onClick={() => tambahKeranjang(car)}
                      className={`px-2 py-2 rounded-lg flex items-center justify-center w-1/3 transition ${
                        darkMode
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Comment & Detail Icons */}
              <div className="flex items-center gap-4 mt-4">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setPopupComment(car.id)}
                >
                  <MessageSquare
                    className={`w-5 h-5 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } text-sm`}
                  >
                    Last Comment
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setPopupDetail(car.id)}
                >
                  <Info
                    className={`w-5 h-5 ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  />
                  <span
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } text-sm`}
                  >
                    Details
                  </span>
                </div>
              </div>

              {/* Last comment */}
              <ul
                className={`space-y-1 text-sm mt-2 max-h-24 overflow-y-auto transition-colors duration-500 ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {(comments[car.id] || []).slice(-1).map((c, i) => (
                  <li
                    key={i}
                    className={`px-3 py-1 rounded truncate cursor-pointer transition-colors duration-500 ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    title={c}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Pop-ups (Comment & Detail) */}
      <AnimatePresence>
        {popupComment !== null && (
          <Motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            transition={{ duration: 0.25 }}
          >
            <Motion.div
              className={`p-6 rounded-2xl w-full max-w-md shadow-xl transition-colors duration-500 ${
                darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
              }`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold mb-4">Add Comment</h3>
              <ul className="max-h-40 overflow-y-auto mb-4 space-y-2">
                {(comments[popupComment] || []).map((c, i) => (
                  <li key={i} className="px-3 py-1 rounded truncate">
                    {c}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                className={`w-full p-3 rounded-lg placeholder-gray-500 focus:outline-none transition-colors duration-500 ${
                  darkMode
                    ? "bg-slate-700 text-white"
                    : "bg-gray-100 text-black"
                }`}
                placeholder="Type your comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleComment(popupComment, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={() => setPopupComment(null)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}

        {popupDetail !== null && (
          <Motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            transition={{ duration: 0.25 }}
          >
            <Motion.div
              className={`p-6 rounded-2xl w-full max-w-md shadow-xl transition-colors duration-500 ${
                darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
              }`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold mb-4">Car Details</h3>
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {Data.find((c) => c.id === popupDetail).name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Color:</span>{" "}
                {Data.find((c) => c.id === popupDetail).color}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Price:</span> Rp{" "}
                {Data.find((c) => c.id === popupDetail).price.toLocaleString()}
              </p>
              <img
                src={Data.find((c) => c.id === popupDetail).image}
                alt="car detail"
                className="w-full h-40 object-cover rounded-lg mt-2"
              />
              <button
                onClick={() => setPopupDetail(null)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
