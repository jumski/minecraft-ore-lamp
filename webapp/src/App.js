import './App.css';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import setupReader from './setupReader';
import writeToPort from './writeToPort';

const PREDEFINED_COLORS = [
  { name: 'Redstone', color: { r: 255, g: 0, b: 0 } },
  { name: 'Emerald', color: { r: 0, g: 255, b: 0 } },
  { name: 'Lapis Lazuli', color: { r: 0, g: 0, b: 255 } },
  { name: 'Gold', color: { r: 255, g: 100, b: 0 } },
  { name: 'Diamond', color: { r: 100, g: 245, b: 228 } },
]

function App() {
  let [serialPort, setSerialPort] = useState(false);
  // let [color, setColor] = useState({ r: 255, g: 0, b: 0 });
  let [readColor, setReadColor] = useState(false);

  function writeColor({ r, g, b }) {
    writeToPort(serialPort, [r, g, b].join(',') + "\n");
  }

  async function connectButtonClicked() {
    let port = await navigator.serial.requestPort({});
    await port.open({ baudRate: 9600 });
    setSerialPort(port);

    setupReader(port, line => {
      if (!line.match(/\d+,\d+,\d+/)) {
        return;
      }

      let [red, green, blue] = line.split(/,/);
      let newColor = { r: Number(red), g: Number(green), b: Number(blue) };
      setReadColor(newColor);
    });
  }

//   function onPickedColor(color) {
//     setColor(color.rgb);
//     console.log(color.rgb);
//   }

  const predefinedColorButtons = PREDEFINED_COLORS.map(({ name, color }) => {
    let bgColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    return <button
      onClick={() => writeColor(color)}
      key={name}
      style={{backgroundColor: bgColor}}>
      { name }
    </button>;
  });

  if (readColor) {
    return (
      <div className="App">
        <strong>Read Color:</strong><br/>
        <pre type="code">{JSON.stringify(readColor, null, 2)}</pre>

        {predefinedColorButtons}

        {/* <SketchPicker color={color} onChange={onPickedColor}/> */}
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <button onClick={connectButtonClicked}>Connect!</button>
      </div>
    );
  }

}

export default App;
