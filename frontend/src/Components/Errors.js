export default function Errors({ errors }) {
  return (
    <div className="results">
      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          {errors.map((error, index) => (
            <div key={index} className="error">
              <p>{error.error}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
