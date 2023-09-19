import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Nav from "./components/Nav";
import BookPage from "./components/BookPage";
// import ClaimedBookPage from "./components/ClaimedBookPage";
import AddBook from "./components/AddBook";
import { useState } from "react";

function App() {
  const [claimedUrl, setClaimedUrl] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav setClaimedUrl={setClaimedUrl} claimedUrl={claimedUrl} />

        <Routes>
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/" element={<HomePage claimedUrl={0} />} />
          <Route path="/available/" element={<HomePage claimedUrl={0} />} />
          <Route path="/claimed/" element={<HomePage claimedUrl={1} />} />
          <Route path="/add-book/" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
