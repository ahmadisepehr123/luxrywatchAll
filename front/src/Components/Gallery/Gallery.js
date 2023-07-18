import React, { useState, useEffect } from 'react';
import Navigation from "../Navigation/Navigation.js";
import "./Gallery.css";
import Name from "../Name/Name.json";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gallery() {
  const [watch, setWatch] = useState([]);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [h2Values, setH2Values] = useState([1499, 1199, 2699, 2599, 1399, 2449, 1499, 3699, 1999]);
  const [price, setPrice] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [img, setImg] = useState("https://monochrome-watches.com/wp-content/uploads/2020/11/Audemars-Piguet-Royal-Oak-Double-Balance-Wheel-Openworked-Ceramic-41mm-15416CE.OO_.1225CE.01-review-8.jpg");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifShown, setNotifShown] = useState(false); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setWatch(users));
  }, []);


  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const newCounts = [...counts];
    cartItems.forEach((item) => {
      newCounts[item.id] = item.count;
    });
    setCounts(newCounts);
  }, []);

  useEffect(() => {
    const newPrice = counts.map((count, index) => count * h2Values[index]);
    setPrice(newPrice);
    localStorage.setItem("cart", JSON.stringify(
      counts.map((count, id) => ({ id, count }))
    ));
  }, [counts]);
    const Buy = () => toast.success('سفارش شما ثبت شد و بعد از دو رو به ایمیل یک سری فرم فرستاده میشود', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  const notif = () => toast.info('توجه سفارش های شما واقعی نیست و این یک سایت رزومه هست', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  function handleIncrement(index) {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    if (!notifShown) { 
      notif();
      setNotifShown(true);
    }
  }

  function handleDecrement(index) {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  }

  useEffect(() => {
    const newPrice = counts.map((count, index) => count * h2Values[index]);
    setPrice(newPrice);
  }, [counts]);

  useEffect(() => {
    setNotifShown(false);
  }, [searchTerm]);

  return (
    <div>
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3."></path>
      </g>
        </svg>
        <input
          placeholder="Search"
          type="search"
          className="input"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <Navigation />
      <div className="Main">
        {Name.filter((val) => {
          return val.title.toLowerCase().includes(searchTerm.toLowerCase());
        }).map((val, index) => (
          <div className="zone" key={index}>
            <article>
              <img src={val.image} alt="Watch" />
              <div className="pa2 ph3-ns">
                <h3>{val.title}</h3>
                <div className="dt w-100 mt2">
                  <div className="dtc"></div>
                  <div className="dtc tr">
                    <h1 className={counts[index] === 0 ? "black" : "green"}>
                      {counts[index]}
                    </h1>
                    <h2 className="f5  price">${price[index]}</h2>
                    <h2 className="f5 mv0">${h2Values[index]}</h2>
                  </div>
                </div>
                <button 
                className="btn-gallery"
                disabled={counts[index] === 0}
                onClick={() => Buy()}
                >Buy</button>
                <p id="p-gallery" className="f6 lh-copy measure mt2 mid-gray">
                  This is the luxury Watch
                </p>
                <button
                  className="btn-gallery"
                  onClick={() => handleIncrement(index)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn-gallery"
                  onClick={() => handleDecrement(index)}
                  disabled={counts[index] === 0}
                >
                  Remove from Cart
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Gallery;