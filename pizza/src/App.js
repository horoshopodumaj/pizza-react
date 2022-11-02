import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const SeacrhContext = createContext();

function App() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className="wrapper">
            <SeacrhContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="cart" element={<Cart />} />
                    </Routes>
                </div>
            </SeacrhContext.Provider>
        </div>
    );
}

export default App;
