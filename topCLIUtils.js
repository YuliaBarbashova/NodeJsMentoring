const { exec } = require("child_process");
const fs = require("fs");

const logFile = "activityMonitor.log";

const cmd =
  process.platform === "win32"
    ? "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\""
    : "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

let logData = "";

function update() {
  exec(cmd, (error, stdout, stderr) => {
    if (error) throw error;
    if (stderr) throw new Error(stderr);

    console.clear();
    console.log(stdout);
    logData = stdout;
  });
}

function writeLogs() {
  const currentTime = Math.floor(Date.now() / 1000);
  const dataToLog = `${currentTime}: ${logData}`;

  fs.appendFile(logFile, dataToLog, function (err) {
    if (err) throw err;
    logData = "";
  });
}

setInterval(update, 100);
setInterval(writeLogs, 60000);
