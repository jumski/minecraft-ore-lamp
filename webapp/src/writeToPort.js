
export default async function writeToPort(port, str) {
  if (port && port.writable) {
    const writer = port.writable.getWriter();
    const textEncoder = new TextEncoder();
    const bytes = textEncoder.encode(str);

    console.log('writing to port', str, bytes);
    await writer.write(bytes);
    writer.releaseLock();
  }
}
