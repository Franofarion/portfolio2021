import React, { useEffect, useState, useRef } from "react";
import MainItemsContainer from "./MainItemsContainer";
import jquery from "jquery";

export default function Main() {
  const [deltaY, setDeltaY] = useState(0);
  const [maxDelta, setMaxDelta] = useState(0);

  const scrollHandler = event => {
    let newDeltaY = deltaY + event.deltaY;

    newDeltaY = Math.max(0, newDeltaY);
    newDeltaY = Math.min(maxDelta, newDeltaY);

    setDeltaY(newDeltaY)
  };

  // IE, Chrome, Safari, Opera
  useEventListener("wheel", scrollHandler);

  // Firefox
  useEventListener("DOMMouseScroll", scrollHandler);


  useEffect(() => {
    const maxDeltaValue = jquery(".container-content").height() - window.innerHeight;

    setMaxDelta(maxDeltaValue);

  }, [deltaY, maxDelta])

  return (
    <MainItemsContainer deltaY={deltaY} maxDelta={maxDelta} />
  )
}

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
