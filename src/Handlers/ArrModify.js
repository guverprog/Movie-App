const ArrModify = (arr1, arr2) => {
  const element = arr1.results.map((el) => {
    const ratedItem = arr2.results.find((item) => item.id === el.id);
    return ratedItem || el;
  });
  return element;
};
export default ArrModify;
