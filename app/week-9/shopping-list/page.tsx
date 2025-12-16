"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

type Item = {
  id: number;
  name: string;
};

type Meal = {
  idMeal: string;
  strMeal: string;
};

export default function ShoppingListPage() {
  const { user } = useUserAuth();

  // 🚫 If not logged in, block the page
  if (!user) {
    return (
      <main style={{ padding: "1rem" }}>
        <p>You must be logged in to view this page.</p>
        <Link href="/week-9">Go to login</Link>
      </main>
    );
  }

  // ✅ Your Week 8 code (unchanged)
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
      <h1>Week 9 – Shopping List</h1>
      <p>Logged in as {user.email}</p>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => loadMeals(item.name)}>{item.name}</button>
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






