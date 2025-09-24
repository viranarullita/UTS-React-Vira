import { useState } from "react";
import { CarIcon, ShoppingCart, X, Sun, Moon } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Header({ cart = {}, cars = [], darkMode, setDarkMode }) {
  const [openCart, setOpenCart] = useState(false);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const getCarById = (id) => cars.find(c => c.id === parseInt(id));

  return (
    <header
      className={`${
        darkMode
          ? "bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-800 text-white"
          : "bg-yellow-400 text-black"
      } shadow-lg px-3 sm:px-6 py-2 sm:py-4 sticky top-0 z-50 transition-colors duration-500`}
    >
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto gap-3 sm:gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <CarIcon
            size={32}
            strokeWidth={2.2}
            className={`${
              darkMode
                ? "text-yellow-400 bg-black/20"
                : "text-black bg-white/30"
            } p-2 rounded-xl transition-colors duration-500`}
          />
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">Car Collection</h2>
            <p
              className={`${
                darkMode ? "text-gray-200" : "text-gray-800"
              } text-xs sm:text-base`}
            >
              Luxury | Style | Performance
            </p>
          </div>
        </div>

        {/* Dark/Light + Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 sm:p-3 rounded-full bg-gray-600 hover:bg-gray-500 transition"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            )}
          </button>
          <button
            onClick={() => setOpenCart(true)}
            className={`${
              darkMode
                ? "bg-black/20 hover:bg-yellow-400 hover:text-black"
                : "bg-white/20 hover:bg-yellow-600 hover:text-black"
            } relative p-2 sm:p-3 rounded-xl transition`}
          >
            <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mini Cart */}
      <AnimatePresence>
        {openCart && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${
                darkMode ? "bg-slate-800" : "bg-white"
              } rounded-2xl p-6 max-w-md w-full relative transition-colors duration-500`}
            >
              <button
                onClick={() => setOpenCart(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2
                className={`${
                  darkMode ? "text-white" : "text-black"
                } text-xl font-bold mb-4`}
              >
                Your Cart
              </h2>
              {totalItems === 0 ? (
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Cart is empty
                </p>
              ) : (
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {Object.entries(cart).map(([id, qty]) => {
                    const car = getCarById(id);
                    if (!car) return null;
                    return (
                      <li
                        key={id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          darkMode ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{car.name}</h3>
                          <p
                            className={`${
                              darkMode ? "text-gray-300" : "text-gray-800"
                            } text-sm`}
                          >
                            Rp {car.price.toLocaleString()} x {qty}
                          </p>
                        </div>
                        <p className="font-bold">{qty}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
