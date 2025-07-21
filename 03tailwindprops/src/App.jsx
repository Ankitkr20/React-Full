import { useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-green-700 text-black p-4 rounded-xl mb-4">Tailwind Test</h1>
      <Card username = "Ankit" quality = "good"/>
      <Card username = "Kumar" quality = "bad"/>
    </>
  );
}

export default App;
