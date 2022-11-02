import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

function App() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
