// db.js - Firebase implementation for data storage

import db from './firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, where } from 'firebase/firestore';

// Collection names
const COLLECTIONS = {
  BOOKINGS: 'bookings',
  LADDER_MEN: 'ladder_men',
  LADDER_WOMEN: 'ladder_women'
};

// Function to add a booking
async function addBooking(data) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
      ...data,
      timestamp: new Date().getTime()
    });
    console.log("Booking added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding booking: ", error);
    throw error;
  }
}

// Function to get all bookings
async function getBookings() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.BOOKINGS), orderBy("timestamp", "desc"))
    );
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    console.error("Error getting bookings: ", error);
    return [];
  }
}

// Function to add a player to men's ladder
async function addPlayerToMenLadder(data) {
  try {
    // Get current count to determine rank
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.LADDER_MEN));
    const rank = querySnapshot.size + 1;
    
    const docRef = await addDoc(collection(db, COLLECTIONS.LADDER_MEN), {
      ...data,
      rank: rank,
      won: 0,
      lost: 0
    });
    console.log("Player added to men's ladder with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding player to men's ladder: ", error);
    throw error;
  }
}

// Function to add a player to women's ladder
async function addPlayerToWomenLadder(data) {
  try {
    // Get current count to determine rank
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.LADDER_WOMEN));
    const rank = querySnapshot.size + 1;
    
    const docRef = await addDoc(collection(db, COLLECTIONS.LADDER_WOMEN), {
      ...data,
      rank: rank,
      won: 0,
      lost: 0
    });
    console.log("Player added to women's ladder with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding player to women's ladder: ", error);
    throw error;
  }
}

// Function to get men's ladder
async function getMenLadder() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.LADDER_MEN), orderBy("rank", "asc"))
    );
    const ladder = [];
    querySnapshot.forEach((doc) => {
      ladder.push({ id: doc.id, ...doc.data() });
    });
    return ladder;
  } catch (error) {
    console.error("Error getting men's ladder: ", error);
    return [];
  }
}

// Function to get women's ladder
async function getWomenLadder() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTIONS.LADDER_WOMEN), orderBy("rank", "asc"))
    );
    const ladder = [];
    querySnapshot.forEach((doc) => {
      ladder.push({ id: doc.id, ...doc.data() });
    });
    return ladder;
  } catch (error) {
    console.error("Error getting women's ladder: ", error);
    return [];
  }
}

// Function to update a player in men's ladder
async function updateMenLadderPlayer(id, data) {
  try {
    const playerRef = doc(db, COLLECTIONS.LADDER_MEN, id);
    await updateDoc(playerRef, data);
    console.log("Player updated in men's ladder");
    return true;
  } catch (error) {
    console.error("Error updating player in men's ladder: ", error);
    throw error;
  }
}

// Function to update a player in women's ladder
async function updateWomenLadderPlayer(id, data) {
  try {
    const playerRef = doc(db, COLLECTIONS.LADDER_WOMEN, id);
    await updateDoc(playerRef, data);
    console.log("Player updated in women's ladder");
    return true;
  } catch (error) {
    console.error("Error updating player in women's ladder: ", error);
    throw error;
  }
}

// Initialize the database with sample data if empty
async function initializeDatabase() {
  try {
    // Check if men's ladder is empty
    const menLadder = await getMenLadder();
    if (menLadder.length === 0) {
      // Add sample men players
      const initialMenLadder = [
        { name: 'John Smith', rank: 1, won: 12, lost: 3 },
        { name: 'Michael Johnson', rank: 2, won: 10, lost: 4 },
        { name: 'David Williams', rank: 3, won: 8, lost: 5 },
        { name: 'Robert Brown', rank: 4, won: 7, lost: 6 },
        { name: 'James Davis', rank: 5, won: 5, lost: 4 }
      ];
      
      for (const player of initialMenLadder) {
        await addDoc(collection(db, COLLECTIONS.LADDER_MEN), player);
      }
      console.log("Initialized men's ladder with sample data");
    }
    
    // Check if women's ladder is empty
    const womenLadder = await getWomenLadder();
    if (womenLadder.length === 0) {
      // Add sample women players
      const initialWomenLadder = [
        { name: 'Sarah Johnson', rank: 1, won: 11, lost: 2 },
        { name: 'Emily Davis', rank: 2, won: 9, lost: 3 },
        { name: 'Jessica Wilson', rank: 3, won: 8, lost: 4 },
        { name: 'Amanda Taylor', rank: 4, won: 6, lost: 5 },
        { name: 'Olivia Martin', rank: 5, won: 4, lost: 3 }
      ];
      
      for (const player of initialWomenLadder) {
        await addDoc(collection(db, COLLECTIONS.LADDER_WOMEN), player);
      }
      console.log("Initialized women's ladder with sample data");
    }
    
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

// Export the database functions
window.db = {
  initializeDatabase,
  addBooking,
  getBookings,
  getMenLadder,
  getWomenLadder,
  addPlayerToMenLadder,
  addPlayerToWomenLadder,
  updateMenLadderPlayer,
  updateWomenLadderPlayer
};
