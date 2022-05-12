import { Routes, Route } from "react-router-dom";
import React from "react";
import Upload from "./upload";
import View from "./view";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Upload setHeaders />} />
                <Route path="/View" element={<View />} />
            </Routes>
        </div>
    );
}

export default App;
