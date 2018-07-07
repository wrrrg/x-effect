//get habits - filtering to only show visible habits. This might not be necessary.
export default (habits, { name, sortBy, startDate, endDate }) => {
  return habits
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || habit.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || habit.createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
