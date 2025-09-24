import { useState } from "react";
import Header from "./components/Header";
import Cars from "./components/Cars";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false); // state dark/light mode

  const cars = [
    { id: 1, name: "Chery C5", price: 319000000, color: "Red", image: "https://imgcdn.oto.com/large/gallery/exterior/153/3252/chery-c5-front-angle-low-view-662781.jpg?tr=w-510,h-340" },
    { id: 2, name: "Wuling Air EV", price: 214000000, color: "Silver", image: "https://imgcdn.oto.com/large/gallery/exterior/110/2615/wuling-ev-front-angle-low-view-266132.jpg?tr=w-510,h-340" },
    { id: 3, name: "MG 4 EV", price: 299000000, color: "Blue", image: "https://imgcdn.oto.com/large/gallery/exterior/139/2751/mg-4-ev-front-angle-low-view-153361.jpg?tr=w-510,h-340" },
    { id: 4, name: "Toyota Fortuner", price: 582000000, color: "Black", image: "https://imgcdn.oto.com/large/gallery/exterior/38/894/toyota-fortuner-front-angle-low-view-580768.jpg?tr=w-510,h-340" },
    { id: 5, name: "Mitsubishi Pajero Sport", price: 779000000, color: "White", image: "https://imgcdn.oto.com/large/gallery/exterior/28/2364/mitsubishi-pajero-sport-front-angle-low-view-216762.jpg?tr=w-510,h-340" },
    { id: 6, name: "Hyundai Palisade Hybrid", price: 995000000, color: "Black", image: "https://imgcdn.oto.com/medium/gallery/exterior/15/3250/hyundai-palisade-hybrid-84062.jpg" },
    { id: 7, name: "Nissan X Trail", price: 576000000, color: "Orange", image: "https://imgcdn.oto.com/large/gallery/exterior/29/2194/nissan-x-trail-front-angle-low-view-844522.jpg?tr=w-510,h-340" },
    { id: 8, name: "Honda Civic RS", price: 699000000, color: "Blue", image: "https://imgcdn.oto.com/medium/gallery/exterior/14/2482/honda-civic-rs-26026.jpg" },
    { id: 9, name: "MG VS HEV", price: 392000000, color: "Green", image: "https://imgcdn.oto.com/large/gallery/exterior/139/2938/mg-vs-hev-front-angle-low-view-818429.jpg?tr=w-510,h-340" },
    { id: 10, name: "Daihatsu Rocky", price: 214000000, color: "Red", image: "https://imgcdn.oto.com/large/gallery/exterior/7/2366/daihatsu-rocky-front-angle-low-view-428870.jpg?tr=w-510,h-340" },
  ];

  // cart state { idMobil: jumlah }
  const [cart, setCart] = useState({});

  const tambahKeranjang = (car) => {
    setCart((prev) => ({
      ...prev,
      [car.id]: (prev[car.id] || 0) + 1,
    }));
  };

  const kurangiKeranjang = (car) => {
    setCart((prev) => {
      if (!prev[car.id]) return prev;
      const updated = { ...prev, [car.id]: prev[car.id] - 1 };
      if (updated[car.id] <= 0) delete updated[car.id];
      return updated;
    });
  };

  return (
    <>
      <Header
        cart={cart}
        cars={cars}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Cars
        Data={cars}
        cart={cart}
        tambahKeranjang={tambahKeranjang}
        kurangiKeranjang={kurangiKeranjang}
        darkMode={darkMode}
      />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default App;
