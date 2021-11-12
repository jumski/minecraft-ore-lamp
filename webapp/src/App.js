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

  let menuItems;
  if (currentColor) {
    menuItems = PREDEFINED_COLORS.map((color) => {
      return <div className="mc-button full" key={color.name}>
        <div className="title">{color.name}</div>
      </div>;
    });
    menuItems.push(<div className="mc-button full" key="Paleta barw">
      <div className="title">Paleta barw</div>
    </div>);
  }
  else {
    menuItems = [<div className="mc-button full" key="Podłącz lampkę!" onClick={connectButtonClicked}>
      <div className="title">Podłącz lampkę!</div>
    </div>];
  }

  return (
    <div className="App container">
      <div className="header">
        <img style={{}} src={logo} alt="Lampka Franka"/>
      </div>

      <div className="menu mc-menu">
        {menuItems}
      </div>

      {/* <SketchPicker color={currentColor} onChange={onPickerChange} onChangeComplete={onColorPicked}/> */}
    </div>
  );
}

export default App;
