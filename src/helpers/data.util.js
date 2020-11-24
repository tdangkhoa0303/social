export const arrayToMap = (arr) => {
  let map = {};
  arr.forEach((e) => (map[e._id] = e));
  return map;
};
