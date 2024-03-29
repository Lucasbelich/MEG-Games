import "./App.css";
import "./App.css";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "../src/Context/CartContext";
import Cart from "./components/Cart/Cart";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter basename="MEG-Games/">
          <NavBar />
          <Routes>
            <Route path="*" element={<h1>NOT FOUND 404</h1>} />
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route
              path="/detail/:productId"
              element={<ItemDetailContainer />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
};

export default App;
