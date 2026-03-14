export function getCategoryStats(goals) {
  const categories = {};

  goals.forEach((goal) => {
    const cat = goal.category || "Other";

    if (!categories[cat]) {
      categories[cat] = {
        category: cat,
        active: 0,
        completed: 0,
        total: 0,
      };
    }

    categories[cat].total++;

    if (goal.status === "Completed") {
      categories[cat].completed++;
    } else {
      categories[cat].active++;
    }
  });

  return Object.values(categories);
}