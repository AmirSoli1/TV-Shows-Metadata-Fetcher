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

    try {
      const response = await axios.post(
        "http://localhost:3001/fetch-metadata",
        urls
      );
      setMetadata(response.data.filter((result) => !result.error));
      setErrors(response.data.filter((result) => result.error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <h1>TV Shows Metadata Fetcher</h1>
      <p>
        <b>
          Please Enter the URLs of your favourite TV shows in the following
          format:
        </b>
        <br />
        https://api.tvmaze.com/singlesearch/shows?q=[TV_SHOW_NAME]
      </p>
      <p>(For example: https://api.tvmaze.com/singlesearch/shows?q=lost)</p>
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
