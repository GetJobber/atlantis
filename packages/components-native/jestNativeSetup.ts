async function setTimezone(): Promise<void> {
  process.env.TZ = "UTC";
}

module.exports = setTimezone;
