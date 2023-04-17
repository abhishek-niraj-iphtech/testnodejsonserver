const split = (str, index) => {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
};

module.exports = {
  split,
};
