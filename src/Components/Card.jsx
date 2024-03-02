import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Card = (image) => {
  const { id, title, url } = image;
  const stringLenth = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const lenthTitle = stringLenth(title, 30);
  return (
    <div>
      <div className=" max-w-sm mx-10 my-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link
          to={`/details/${id}`}
          data-tip={title}
          data-tooltip-id={`tooltip-${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <ReactTooltip
            id={`tooltip-${id}`}
            place="top"
            type="dark"
            effect="solid"
          >
            {title}
          </ReactTooltip>
          <div className="square-image-container">
            <img className="square-image rounded-t-lg" src={url} alt={title} />
          </div>
        </Link>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {lenthTitle}
          </h5>
          <Link
            to={`/details/${id}`}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
