import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
//import { getCategories } from "../../Utils/getProducts";
import { firestoreDb } from '../../services/firebase'
import { getDocs, collection } from 'firebase/firestore'


const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    /* getCategories().then((categories) => {
      setCategories(categories);
    }); */
    getDocs(collection(firestoreDb, "categories")).then(res => {
      const categories = res.docs.map(doc =>{
        return {id : doc.id, ...doc.data()}
      })
      setCategories(categories)
    })
  }, []);

  return (
    <nav className="NavBar">
      <NavLink to="/">
        <h3 className="logo">MEGGames</h3>
      </NavLink>
      <div className="Categories">
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={`/category/${cat.id}`}
            className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
          >
            {cat.description}
          </NavLink>
        ))}
      </div>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
