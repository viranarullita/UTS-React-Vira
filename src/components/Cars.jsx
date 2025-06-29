import { useState } from "react";
import { Heart, Info, MessageSquare, ShoppingCart } from "lucide-react";

const Body = ({ Data }) => {
  const [idInfo, setIdInfo] = useState(null);
  const [idKomentar, setIdKomentar] = useState(null);
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);

  const awalSuka = {};
  const awalKomentar = {};
  Data.forEach(cars => {
    awalSuka[cars.id] = false;
    awalKomentar[cars.id] = "";
  });

  const [statusSuka, setStatusSuka] = useState(awalSuka);
  const [komentar, setKomentar] = useState(awalKomentar);
  const [inputKomentar, setInputKomentar] = useState("");
  const [jumlahMobil, setJumlahMobil] = useState({});

  function suka(id) {
    setStatusSuka({ ...statusSuka, [id]: !statusSuka[id] });
  }

  function tambahItem(id) {
    const jumlah = jumlahMobil[id] || 0;
    const newJumlah = jumlah + 1;
    setJumlahMobil({ ...jumlahMobil, [id]: newJumlah });
    setJumlahKeranjang(jumlahKeranjang + 1);
  }

  function kurangItem(id) {
    const jumlah = jumlahMobil[id] || 0;
    if (jumlah > 1) {
      setJumlahMobil({ ...jumlahMobil, [id]: jumlah - 1 });
      setJumlahKeranjang(jumlahKeranjang - 1);
    } else if (jumlah === 1) {
      const newJumlah = { ...jumlahMobil };
      delete newJumlah[id];
      setJumlahMobil(newJumlah);
      setJumlahKeranjang(jumlahKeranjang - 1);
    }
  }

  function tutupInfo() {
    setIdInfo(null);
  }

  function tutupKomentar() {
    setIdKomentar(null);
    setInputKomentar("");
  }

  function kirimKomentar() {
    setKomentar({ ...komentar, [idKomentar]: inputKomentar });
    alert("Komentar terkirim!");
    setInputKomentar("");
    setIdKomentar(null);
  }

  return (
    <>
      <div className="keranjang">
        <ShoppingCart size={30} />
        {jumlahKeranjang > 0 && (
          <span className="jumlah-keranjang">{jumlahKeranjang}</span>
        )}
      </div>

      <div className="Container">
        <h1>Premium Cars Collection</h1>
        <p>Discover luxury and performance in every drive</p>

        <div className="Card">
          {Data.map(cars => (
            <div className="cars" key={cars.id}>
              <div className="suka-icon" onClick={() => suka(cars.id)}>
                {statusSuka[cars.id] ? (
                  <Heart color="red" fill="red" />
                ) : (
                  <Heart />
                )}
              </div>

              <img src={cars.image} alt={cars.name} className="gbr-cars" />
              <h2>{cars.name}</h2>
              <p>color: {cars.color}</p>
              <p>price: Rp {cars.price.toLocaleString()}</p>

              {komentar[cars.id] !== "" && (
                <div className="kotak-komentar">
                  Last Comment: {komentar[cars.id]}
                </div>
              )}

              <div className="btn-card">
                <button className="btn info" onClick={() => setIdInfo(cars.id)}>
                  <Info size={18} /> Info
                </button>
                <button className="btn komen" onClick={() => setIdKomentar(cars.id)}>
                  <MessageSquare size={18} /> Comment
                </button>
              </div>

              {jumlahMobil[cars.id] ? (
                <div className="jumlah-control">
                  <button className="minus" onClick={() => kurangItem(cars.id)}>-</button>
                  <span>{jumlahMobil[cars.id]}</span>
                  <button className="plus" onClick={() => tambahItem(cars.id)}>+</button>
                </div>
              ) : (
                <button className="btn add" onClick={() => tambahItem(cars.id)}>
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {idInfo !== null && (
        <div className="popup" onClick={tutupInfo}>
          <div className="popup-content">
            {Data.map(cars => {
              if (cars.id === idInfo) {
                return (
                  <div key={cars.id}>
                    <img src={cars.image} alt={cars.name} className="popup-img" />
                    <h3>{cars.name}</h3>
                    <p>price: Rp {cars.price.toLocaleString()}</p>
                    <p>color: {cars.color}</p>
                    <button onClick={tutupInfo}>Close</button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {idKomentar !== null && (
        <div className="popup">
          <div className="popup-content">
            {Data.map(cars => {
              if (cars.id === idKomentar) {
                return (
                  <div key={cars.id}>
                    <h3>Komentar untuk {cars.name}</h3>
                    <textarea
                      placeholder="Tulis komentarmu di sini..."
                      value={inputKomentar}
                      onChange={(e) => setInputKomentar(e.target.value)}
                    ></textarea>
                    <div className="btn-popup-komen">
                      <button onClick={tutupKomentar}>Cancel</button>
                      <button onClick={kirimKomentar}>Submit</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Body;