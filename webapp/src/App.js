import './App.scss';
import './background.jpg';
import logo from './logo.png';
import { SketchPicker, SwatchesPicker } from 'react-color';
import { useState } from 'react';
import setupReader from './setupReader';
import writeToPort from './writeToPort';
import _, { debounce } from 'lodash';

const PREDEFINED_COLORS = [
  { name: 'Redstone', color: { r: 255, g: 0, b: 0 } },
  { name: 'Emerald', color: { r: 0, g: 255, b: 0 } },
  { name: 'Lapis Lazuli', color: { r: 0, g: 0, b: 255 } },
  { name: 'Gold', color: { r: 255, g: 100, b: 0 } },
  { name: 'Diamond', color: { r: 100, g: 245, b: 228 } },
]

function App() {
  let [currentColor, setCurrentColor] = useState(false);
  let [readingEnabled, setReadingEnabled] = useState(true);
  let [serialPort, setSerialPort] = useState(false);

  function areEqual(c1, c2) {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
  }

  async function writeColor({ r, g, b }) {
    const message = [r, g, b].join(',') + "\n";
    await writeToPort(serialPort, message);
  }

  function onPickerChange({ rgb }) {
    setReadingEnabled(false);
    setCurrentColor(rgb);
  }

  async function onColorPicked({ rgb }) {
    setReadingEnabled(false); // stop reading from device so it won't overwrite
    console.log('rgb', rgb);
    setCurrentColor(rgb); // just write color so it shows on picker and in other places

    await writeColor(rgb); // send color via serial

    setReadingEnabled(true); // now safe to enable reading again
  }

  async function connectButtonClicked() {
    let port = await navigator.serial.requestPort({});
    await port.open({ baudRate: 9600 });
    setSerialPort(port);

    let colorWasRead = false;

    setupReader(port, line => {
      if (!line.match(/\d+,\d+,\d+/)) {
        return;
      }

      let [red, green, blue] = line.split(/,/);
      let newColor = { r: Number(red), g: Number(green), b: Number(blue) };

      if (!colorWasRead) {
        console.log('newColor', newColor);
        setCurrentColor(newColor);
        colorWasRead = true;
      }
    });
  }

  if (currentColor) {
    return (
      <div className="App">
        <div className="mc-menu">
          <img style={{}} src={logo} alt="Lampka Franka"/>
          <div className="mc-button full">
            <div className="title">Lapis Lazuli</div>
          </div>
        </div>

        <strong>Current color:</strong><br/>
        <pre type="code">{JSON.stringify(currentColor, null, 2)}</pre>
        <label>Reading enabled: <input type="checkbox" disabled="disabled" checked={readingEnabled}/></label>

        <SketchPicker color={currentColor} onChange={onPickerChange} onChangeComplete={onColorPicked}/>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <button onClick={connectButtonClicked}>Podłącz lampkę!</button>
      </div>
    );
  }

}

export default App;
