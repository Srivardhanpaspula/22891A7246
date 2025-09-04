export const logger = {
    info: (message,details = {}) =>
        recordLog("Info",message,details),
    error:(message,details = {}) => recordLog("ERROR", message, details),
};

function recordLog(level, message, details) {
  const entry = {
    level,
    message,
    details,
    timestamp: new Date().toISOString(),
  };

  const existingLogs = JSON.parse(localStorage.getItem("logs") || "[]");
  existingLogs.push(entry);
  localStorage.setItem("logs", JSON.stringify(existingLogs));
};
