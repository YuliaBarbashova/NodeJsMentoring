const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

const sourceFile = path.join(__dirname, "./dataCsv.csv");
const targetFile = path.join(__dirname, "./dataTxt.txt");

const readStream = fs.createReadStream(sourceFile);

const writeStream = fs.createWriteStream(targetFile);

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const json = JSON.parse(chunk.toString());
    this.push(
      `{"book": "${json["Book"]}", "author": "${json["Author"]}", "price": ${json["Price"]}}\n`
    );
    callback();
  },
});

readStream.on("error", (err) => console.log(`Error in readStream: ${err}`));
writeStream.on("error", (err) => console.log(`Error in writeStream: ${err}`));
transformStream.on("error", (err) =>
  console.log(`Error in transformStream: ${err}`)
);

readStream
  .pipe(csv())
  .pipe(transformStream)
  .pipe(writeStream)
  .on("finish", () => console.log("The conversion process is complete!\n"));
