import './App.css';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import setupReader from './setupReader';
import writeToPort from './writeToPort';

function App() {
  let [serialPort, setSerialPort] = useState(false);
  let [color, setColor] = useState({ r: 255, g: 0, b: 0 });
  let [readColor, setReadColor] = useState(false);

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

  function onPickedColor(color) {
    setColor(color.rgb);
    console.log(color.rgb);
  }

  if (readColor) {
    return (
      <div className="App">
        <strong>Read Color:</strong><br/>
        <pre type="code">{JSON.stringify(readColor, null, 2)}</pre>

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
