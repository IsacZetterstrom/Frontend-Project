function getDateWithDay(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //   const newDate = date.split(/[- :]/);

  return new Date(date).toLocaleDateString("sv-SE", options);
}

const dateUtils = {
  getDateWithDay,
};

export default dateUtils;
