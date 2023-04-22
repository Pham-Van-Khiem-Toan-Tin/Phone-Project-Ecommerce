const { useState, useEffect } = require("react");

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      }
    }, [value,delay]);
    return debouncedValue;
}

module.exports = useDebounce;