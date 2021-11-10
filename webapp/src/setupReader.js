import TextDecoderStream from './TextDecoderStream';

export default function setupReader(port, onLatestLine) {
  let lineBuffer = '';
  let appendStream = new WritableStream({
    write(chunk) {
      lineBuffer += chunk;

      let lines = lineBuffer.split('\n');

      if (lines.length > 1) {
        lineBuffer = lines.pop();
        let line = lines.pop().trim()
        onLatestLine(line);
      }
    }
  });

  port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeTo(appendStream);
}

