import { useState } from "react";
import Card from "../Components/Card";
const Flicker = () => {
  // const apiKey = "ffffaa51ced546507a6441029967387b";
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FLICKER_KEY;

  const fetchImages = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(
      searchQuery
    )}&format=json&nojsoncallback=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setImages(data.photos.photo);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Search bar */}
      <form className="max-w-md mx-auto my-10" onSubmit={fetchImages}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {/* Images */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="card">
        {images.map(({ id, farm, server, secret, title, description }) => {
          const imgUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
          return <Card key={id} id={id} url={imgUrl} title={title} />;
        })}
      </div>
      {!loading && images.length === 0 && (
        <div className="flex justify-center p-4 rounded-lg">
          No images found !
        </div>
      )}
    </div>
  );
};
export default Flicker;
