"use client";

import { useState } from "react";

type Item = {
  id: number;
  name: string;
};

type Meal = {
  idMeal: string;
  strMeal: string;
};

export default function Week8Page() {
  const items: Item[] = [
    { id: 1, name: "Chicken" },
    { id: 2, name: "Salmon" },
    { id: 3, name: "Beef" },
  ];

  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMeals(itemName: string) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${itemName}`
    );
    const data = await response.json();
    setMeals(data.meals ?? []);
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Week 8 – Shopping List</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => loadMeals(item.name)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <h2>Meal Ideas</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </main>
  );
}


