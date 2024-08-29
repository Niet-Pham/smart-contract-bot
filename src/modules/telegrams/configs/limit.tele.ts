const globalConfig = {
  reservoir: 30,
  reservoirRefreshAmount: 30,
  reservoirRefreshInterval: 1500,
};

const groupConfig = {
  maxConcurrent: 1,
  minTime: 1000,
  reservoir: 20,
  reservoirRefreshAmount: 20,
  reservoirRefreshInterval: 60000,
};

const outConfig = {
  maxConcurrent: 1,
  minTime: 1500,
};

export { globalConfig, groupConfig, outConfig };
