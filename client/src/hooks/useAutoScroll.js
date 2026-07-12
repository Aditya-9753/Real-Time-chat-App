/**
 * @file useAutoScroll.js
 * @description Custom hook for automatically scrolling to the bottom of a container.
 * Triggers whenever the messages array changes.
 */

import { useEffect, useRef } from 'react';

/**
 * @param {Array} deps - Dependency array — scroll triggers when these change
 * @returns {object} ref to attach to the scroll target element
 */
const useAutoScroll = (deps = []) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return bottomRef;
};

export default useAutoScroll;
