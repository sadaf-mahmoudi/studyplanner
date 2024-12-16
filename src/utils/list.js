  const splitTodosIntoDays = (todos) => {
  const daysOfWeek = [
    { name: "Måndag", shortName: "må", items: [] },
    { name: "Tisdag", shortName: "ti", items: [] },
    { name: "Onsdag", shortName: "on", items: [] },
    { name: "Torsdag", shortName: "to", items: [] },
    { name: "Fredag", shortName: "fr", items: [] },
    { name: "Lördag", shortName: "lö", items: [] },
    { name: "Söndag", shortName: "sö", items: [] },
  ];

  todos.forEach((todo) => {
    const day = daysOfWeek.find((day) => day.shortName === todo.day);
    if (day) {
      day.items.push(todo);
    }
  });

  return daysOfWeek;
};

export { splitTodosIntoDays };

