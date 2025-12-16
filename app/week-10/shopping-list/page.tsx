"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

type FirestoreItem = {
  id: string;
  name: string;
};

export default function ShoppingListPage() {
  const { user } = useUserAuth();

  const [items, setItems] = useState<FirestoreItem[]>([]);
  const [newItemName, setNewItemName] = useState("");

  // 🚫 Block access when logged out
  if (!user) {
    return (
      <main style={{ padding: "1rem" }}>
        <p>You must be logged in to view this page.</p>
        <Link href="/week-10">Go to login</Link>
      </main>
    );
  }

  // ✅ Load items from Firestore after login
  useEffect(() => {
    async function load() {
      const firestoreItems = await getItems(user.uid);
      setItems(firestoreItems);
    }
    load();
  }, [user]);

  // ✅ Add item to Firestore and update UI
  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    const name = newItemName.trim();
    if (!name) return;

    const itemToSave = { name };
    const id = await addItem(user.uid, itemToSave);

    setItems([...items, { id, ...itemToSave }]);
    setNewItemName("");
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Week 10 – Shopping List (Firestore)</h1>
      <p>Logged in as {user.email}</p>

      <form onSubmit={handleAddItem} style={{ marginTop: "1rem" }}>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Add
        </button>
      </form>

      <h2 style={{ marginTop: "1rem" }}>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}







