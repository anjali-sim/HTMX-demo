import React, { useEffect } from "react";
import htmx from "htmx.org";

function EnhancedComponent() {
//   const handleClick = (event) => {
//     htmx.process(event.target);
//   };
  useEffect(() => {
    htmx.process(document.getElementById('htmx-element'));
  }, []);

  return (
    <div>
      <h1>React Component with HTMX</h1>
      <div className="border border-bottom-8 border-gray-300">
    <div className="flex flex-col max-w-sm m-auto">
      <button
        id="htmx-element"
        className="bg-sky-600 text-white py-2 px-3 my-5 rounded-lg w-full"
        // className="htmx-element"
        // onClick={handleClick}
        hx-get="http://localhost:5000/hello"
        hx-trigger="click"
        hx-swap="outerHTML"
      >
        Click me to load data from server!
      </button>
      </div>
      </div>
    </div>
  );
}

export default EnhancedComponent;
