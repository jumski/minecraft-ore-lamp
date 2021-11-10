// polyfill copy pasted from https://developer.mozilla.org/en-US/docs/Web/API/TransformStream#Polyfilling_TextEncoderStream_and_TextDecoderStream
const tds = {
  start(){
    this.decoder = new TextDecoder(this.encoding, this.options)
  },
  transform(chunk, controller) {
    controller.enqueue(this.decoder.decode(chunk, { stream: true }))
  }
}

let _jstds_wm = new WeakMap(); /* info holder */
class TextDecoderStream extends window.TransformStream {
  constructor(encoding = 'utf-8', {...options} = {}) {
    let t = {...tds, encoding, options}

    super(t)
    _jstds_wm.set(this, t)
  }
  get encoding() {return _jstds_wm.get(this).decoder.encoding}
  get fatal() {return _jstds_wm.get(this).decoder.fatal}
  get ignoreBOM() {return _jstds_wm.get(this).decoder.ignoreBOM}
}

export default TextDecoderStream;
