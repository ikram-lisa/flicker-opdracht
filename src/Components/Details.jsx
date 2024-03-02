import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FLICKER_KEY;
  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.photo) {
          setDetails(data.photo);
        } else {
          setError("Photo details not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (id) {
      fetchDetails();
    }
  }, [id, apiKey]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!details) {
    return <div>Loading...</div>;
  }
  const imageUrl = `https://farm${details.farm}.staticflickr.com/${details.server}/${details.id}_${details.secret}.jpg`;

  return (
    <div
      className="max-w-sm  bg-white mx-auto my-10"
      data-tip={details.title?._content}
      data-tooltip-id={`tooltip-${id}`}
    >
      <ReactTooltip id={`tooltip-${id}`} place="top" type="dark" effect="solid">
        {details.owner?.realname}
      </ReactTooltip>
      <img
        className="rounded-lg mb-10"
        src={imageUrl}
        alt={details.title?._content}
      />
      <h1 className="text-3xl text-center mb-10">{details.title?._content}</h1>
      <p className=" px-5 text-3xl ">{details.description?._content}</p>
    </div>
  );
};
export default Details;
