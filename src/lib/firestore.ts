import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "./firebase";
import { calculateStreak } from "@/utils/helpers";

export type HabitFrequency = "daily" | "weekly" | "monthly" | string;

import { Habit, HabitInput } from "@/types/habit";

const db: Firestore = getFirestore(getFirebaseApp());

const habitsCollection = (userId: string) => collection(db, "users", userId, "habits");

const serialize = (data: DocumentData, id: string): Habit => {
  const createdAt = data.createdAt?.toDate?.() ?? new Date();
  const updatedAt = data.updatedAt?.toDate?.() ?? createdAt;

  return {
    id,
    title: data.title ?? data.name,
    name: data.name,
    description: data.description,
    goal: data.goal,
    category: data.category,
    frequency: data.frequency,
    streak: data.streak ?? 0,
    lastCompleted: data.lastCompleted ?? null,
    completedDates: data.completedDates ?? [],
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    userId: data.userId,
  };
};

export const createHabit = async (userId: string, habit: HabitInput): Promise<void> => {
  const payload = {
    ...habit,
    userId,
    streak: 0,
    lastCompleted: null,
    completedDates: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await addDoc(habitsCollection(userId), payload);
};

export const getHabits = (userId: string, onUpdate: (habits: Habit[]) => void): (() => void) => {
  const habitsQuery = query(habitsCollection(userId), orderBy("createdAt", "desc"));
  return onSnapshot(habitsQuery, (snapshot) => {
    const habits = snapshot.docs.map((docSnapshot) => serialize(docSnapshot.data(), docSnapshot.id));
    onUpdate(habits);
  });
};

export const updateHabit = async (userId: string, habitId: string, updates: Partial<HabitInput>): Promise<void> => {
  const habitRef = doc(habitsCollection(userId), habitId);
  await updateDoc(habitRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteHabit = async (userId: string, habitId: string): Promise<void> => {
  const habitRef = doc(habitsCollection(userId), habitId);
  await deleteDoc(habitRef);
};

export const markHabitComplete = async (userId: string, habitId: string): Promise<void> => {
  const habitRef = doc(habitsCollection(userId), habitId);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(habitRef);
    if (!snapshot.exists()) {
      throw new Error("Habit no longer exists.");
    }

    const data = snapshot.data();
    const completedDates: string[] = Array.isArray(data.completedDates) ? [...data.completedDates] : [];
    const nowIso = new Date().toISOString();
    const alreadyCompletedToday = completedDates.some((date) => {
      const existing = new Date(date);
      const now = new Date(nowIso);
      return (
        existing.getFullYear() === now.getFullYear() &&
        existing.getMonth() === now.getMonth() &&
        existing.getDate() === now.getDate()
      );
    });

    const updatedDates = alreadyCompletedToday ? completedDates : [...completedDates, nowIso];

    const streak = calculateStreak(updatedDates);

    transaction.update(habitRef, {
      completedDates: updatedDates,
      lastCompleted: nowIso,
      streak,
      updatedAt: serverTimestamp(),
    });
  });
};
