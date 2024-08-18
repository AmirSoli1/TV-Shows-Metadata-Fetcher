import { useState } from "react";

import "../css/App.css";
import Header from "./Header";
import Metadata from "./Metadata";
import Errors from "./Errors";

export default function App() {
  const [metadata, setMetadata] = useState([]);
  const [errors, setErrors] = useState([]);

  return (
    <div className="App">
      <Header setMetadata={setMetadata} setErrors={setErrors} />
      <Metadata metadata={metadata} />
      <Errors errors={errors} />
    </div>
  );
}
