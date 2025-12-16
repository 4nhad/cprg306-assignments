"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week9Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const login = async () => {
    try {
      await gitHubSignIn();
    } catch (e) {
      console.error(e);
      alert("Login failed — check the console.");
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut();
    } catch (e) {
      console.error(e);
      alert("Logout failed — check the console.");
    }
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Week 9</h1>

      {!user ? (
        <button onClick={login}>Login with GitHub</button>
      ) : (
        <>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={logout}>Logout</button>
          <p>
            <Link href="/week-9/shopping-list">Go to Shopping List</Link>
          </p>
        </>
      )}
    </main>
  );
}
