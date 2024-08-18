export default function Metadata({ metadata }) {
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+>/gi, "");
  };

  return (
    <div className="results">
      {metadata.length > 0 && (
        <div>
          <h2>Metadata Results:</h2>
          {metadata.map((data, index) => (
            <div key={index} className="metadata">
              <h3>{data.title}</h3>
              <p>{stripHtmlTags(data.description)}</p>
              {data.image && <img src={data.image} alt="metadata" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
