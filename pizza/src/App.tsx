import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Loadable from "react-loadable";
import "./scss/app.scss";

//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
    loading: () => <div style={{ textAlign: "center" }}>Loading...</div>,
});
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route path="cart" element={<Cart />} />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
