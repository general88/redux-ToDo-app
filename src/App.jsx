import { useState } from "react";

import "./App.css";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <section className="grid items-center h-screen shadow-2xl">
      <div className="grid items-center shadow-2xl mx-auto p-5">
        <AddTask />
        <ListTask />
      </div>
    </section>
  );
}

export default App;
