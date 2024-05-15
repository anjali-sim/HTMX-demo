import React, { useEffect } from "react";
import htmx from "htmx.org";

const FetchUser=() => {
    useEffect(() => {
        htmx.process(document.getElementById('htmx-get'));
      }, []);

  return (
    <div className="border border-bottom-8 border-gray-300">
    <div className="flex flex-col max-w-sm m-auto">
      {/* <button id="htmx-get" hx-get="http://localhost:5000/users" hx-trigger="click" hx-target="#users" hx-confirm="Are you sure you want to fetch users?"
        className="bg-sky-600 text-white py-2 px-3 my-5 rounded-lg w-full">
        Get Users
      </button>
      <div id="users"></div> */}

      <button id="htmx-get" hx-get="http://localhost:5000/fetch" hx-trigger="click" hx-swap="outerHTML" hx-indicator="#loader" hx-vals='{"limit": 5}'
        className="bg-sky-600 text-white py-2 px-3 my-5 rounded-lg w-100">
        Fetch Users
      </button>
      <span className="htmx-indicator" id="loader">
         {/* Loading... */}
        <img src="./images/loader.gif" alt="Loading..." className="m-auto h-30 w-30" />
      </span>
    </div>
  </div>
  );
}

export default FetchUser;
