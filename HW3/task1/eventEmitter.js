class EventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let lstnr = this.listeners[eventName];
    if (lstnr) {
      for (let i = lstnr.length - 1; i >= 0; i--) {
        if (lstnr[i] === fn) {
          lstnr.splice(i, 1);
        }
      }
    }
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const wrapper = () => {
      fn();
      this.off(eventName, wrapper);
    };
    this.listeners[eventName].push(wrapper);
    return this;
  }

  emit(eventName, ...args) {
    let lstnr = this.listeners[eventName];
    if (!lstnr) return false;

    lstnr.forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  listenerCount(eventName) {
    let lstnr = this.listeners[eventName] || [];
    return lstnr.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
};

module.exports = EventEmitter;
