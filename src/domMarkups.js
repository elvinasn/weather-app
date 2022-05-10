const domMarkups = (() => {
  let currentData;
  const mainCard = async function (data) {
    currentData = await data;
    console.log(currentData);
  };
  return { mainCard };
})();
export { domMarkups };
