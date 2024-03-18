const EventEmitter = require("../task1/eventEmitter");
const fetch = require("node-fetch");

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    const start = process.hrtime();
    const data = await asyncFunc(...args);
    this.emit("data", data);
    const diff = process.hrtime(start);
    this.emit("end", diff);
    return data;
  }
}

const fetchFromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", (diff) =>
  console.log(`Done with execute: ${diff[0] * 1e9 + diff[1]} nanoseconds`)
);

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
