import React, { useState } from "react";
import { Range } from 'react-range';
import { Data2 } from "../../../data/Data";
import "./Categories.css";
const Categories = () => {
  const [rangeValues, setRangeValues] = useState(50)
  return (
    <div className="categories">
      <div className="products-controller">
      <Range
        step={0.1}
        min={0}
        max={100}
        values={rangeValues}
        onChange={(e) => setRangeValues(e.target.values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
      </div>
      <div className="product-gird">
        This is grid
      </div>
    </div>
  );
};

export default Categories;
