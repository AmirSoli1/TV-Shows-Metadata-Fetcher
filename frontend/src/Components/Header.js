import axios from "axios";
import { useState } from "react";

export default function Header({ setMetadata, setErrors }) {
  const [urls, setUrls] = useState(["", "", ""]);

  const handleChange = (e, index) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchMetadata = async (url, index) => {
      try {
        if (!url) {
          return { error: `URL ${index + 1} is empty` };
        }
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        return { error: `Failed to fetch metadata for URL ${index + 1}` };
      }
    };

    const results = await Promise.all(
      urls.map((url, index) => fetchMetadata(url, index))
    );
    console.log(results);
    setMetadata(results.filter((result) => !result.error));
    setErrors(results.filter((result) => result.error));
  };

  return (
    <header>
      <h1>TV Shows Metadata Fetcher</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {urls.map((url, index) => (
          <div key={index}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleChange(e, index)}
              placeholder={`URL ${index + 1}`}
            />
          </div>
        ))}
        <button type="button" onClick={() => setUrls([...urls, ""])}>
          +
        </button>
        <button
          type="button"
          onClick={() =>
            urls.length > 3
              ? setUrls(urls.slice(0, urls.length - 1))
              : setUrls(urls)
          }
        >
          -
        </button>
        <button type="submit">Submit</button>
        <button
          type="reset"
          onClick={() => {
            setUrls(["", "", ""]);
            setMetadata([]);
            setErrors([]);
          }}
        >
          Reset
        </button>
      </form>
    </header>
  );
}
