import React, { useState, useEffect } from 'react';

function getHSLString(hue, saturation, lightness) {
  return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`
}

function App() {
  const [hsl, setHsl] = useState({
    hue: 180,
    saturation: 50,
    lightness: 50,
  });
  // List of previously stored colours
  const [colours, setColours] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    colour: null
  });

  // Change stored HSL values depending on range inputs
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setHsl({ ...hsl, [name]: value });
  }

  // Store current HSL values
  function handleSubmit(e) {
    e.preventDefault();

    const hslData = {
      lightness: hsl.lightness,
      hsl: getHSLString(hsl.hue, hsl.saturation, hsl.lightness)
    };

    setColours([hslData, ...colours]);
  }

  // Call without arguments to reset the alert/modal
  function showAlert(show=false, colour=null) {
    setAlert({show, colour});
  }

  // Ensure no more than 5 previous colours
  useEffect(() => {
    if (colours.length > 5) {
      setColours(colours.slice(0, 5));
    }
  }, [colours]);

  // Remove modal after 2.5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 2500);

    return () => clearTimeout(timeout);
  }, [alert.colour]);

  return (
    <div>
      {alert.show && <div className="modal">Copied "{alert.colour}" to clipboard</div>}

      {/* Colour picker could be its own component */}
      <form className="colour-picker-form" onSubmit={handleSubmit}>
        <div 
          className="colour-preview" 
          style={{ backgroundColor: `${getHSLString(hsl.hue, hsl.saturation, hsl.lightness)}`}}
        ></div>

        <div>
          <label>H: {hsl.hue}</label>
          <input 
            type="range" 
            name="hue" 
            min="0" 
            max="360" 
            value={hsl.hue}
            onInput={handleInput}
          />
        </div>

        <div>
          <label>S: {hsl.saturation}</label>
          <input 
            type="range" 
            name="saturation" 
            min="0" 
            max="100" 
            value={hsl.saturation}
            onInput={handleInput}
          />
        </div>

        <div>
          <label>L: {hsl.lightness}</label>
          <input 
            type="range" 
            name="lightness" 
            min="0" 
            max="100" 
            value={hsl.lightness}
            onInput={handleInput}
          />
        </div>

        <button type="submit" className="btn">Store Colour</button>
      </form>

      {/* Modal could be its own component */}
      <div className="colours">{colours.map((colour, index) => {
        return (
          <div 
            key={index} 
            className="colour-block" 
            style={{backgroundColor: `${colour.hsl}`}}
            onClick={() => showAlert(true, colour.hsl)}
          >
            <div style={{ color: `${colour.lightness < 50 ? "white" : "black"}` }}>{colour.hsl}</div>
          </div>
        );
      })}</div>
    </div>
  );
}

export default App;
