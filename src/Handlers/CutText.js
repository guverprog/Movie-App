const cutText = (text, maxLength) => {
  if (text.length > maxLength) {
    let cut = text.slice(0, maxLength + 1);
    if (cut[cut.length - 1] !== ' ') {
      cut = cut.split(' ').reverse().slice(1).reverse().join(' ');
    }
    return `${cut} ...`;
  }
  return text;
};
export default cutText;
