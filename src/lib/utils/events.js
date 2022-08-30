function on(eventType, identifier) {
  document.addEventListener(eventType, identifier);
}

function off(eventType, identifier) {
  document.removeEventListener(eventType, identifier);
}

function trigger(eventType, data) {
  const customEvent = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(customEvent);
}

export { on, off, trigger };
