import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// storage key all observations saved under this key
const OBSERVATIONS_KEY = "@katharos_observations";

//save a new observation
export const saveObservation = async (observationData) => {
  try {
    const newObservation = {
      id: uuidv4(),
      title: observationData.title || "",
      description: observationData.description || "",
      category: observationData.category || "Other",
      impact: observationData.impact || "Medium",
      confidence: observationData.confidence || "Medium",
      attachment: observationData.attachment || null, //{uri,type,name}
      voiceNote: observationData.voiceNote || null,
      status: "submitted",
      createdAt: newDate().toISOString(),
      updatedAt: newDate().toISOString(),
    };

    // get eisting observation

    const existing = await getAllObservations();

    //add new one at the front (newest first)
    const updated = [newObservation, ...existing];

    //save back to storage
    await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(updated));

    return newObservation;
  } catch (error) {
    console.error("Error saving observation:", error);
    throw error;
  }
};

// get all observations

export const getAllObservations = async () => {
  try {
    const data = await AsyncStorage.getItem(OBSERVATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading observation:", error);
    return [];
  }
};

// get one observation by ID

export const getObservationById = async (id) => {
  try {
    const all = await getAllObservations();
    return all.find((obs) => obs.id === id) || null;
  } catch (error) {
    return null;
  }
};

// update an observatoin

export const updateObservationById = async (updatedObservation) => {
  try {
    const all = await getAllObservations();
    const updated = all.map((obs) =>
      obs.id === updatedObservation.id
        ? { ...obs, ...updatedObservation, updatedAt: newDate().toISOString() }
        : obs,
    );
    await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(updated));
    return updatedObservation;
  } catch (error) {
    console.error("Error updating Observation:", error);
    throw error;
  }
};

// delete an observation

export const deleteObservationById = async (id) => {
  try {
    const all = await getAllObservations();
    const filtered = all.filter((obs) => obs.id !== id);
    await AsyncStorage.setItem(OBSERVATIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting Observation:", error);
    throw error;
  }
};

// clear all observations ( for dev/ testing)

export const clearAllObservations = async () => {
  try {
    await AsyncStorage.removeItem(OBSERVATIONS_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing observations:", error);
    throw error;
  }
};

// seed with dummy data ( for testing UI)
export const seedDummyData = async () => {
  const dummyObservations = [
    {
      id: uuidv4(),
      title: "Inventory Reconciliation Issues",
      description:
        "Dealers continue reporting inventory mismatches during month-end reconciliation. This has been happening for 3 consecutive months.",
      category: "Operations",
      impact: "High",
      confidence: "High",
      attachment: null,
      status: "submitted",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      title: "New Enterprise Client Opportunity",
      description:
        "TechCorp expressed interest in a 500-seat license during our quarterly call. Decision maker is the CTO.",
      category: "Sales",
      impact: "High",
      confidence: "Medium",
      attachment: null,
      status: "submitted",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Customer Onboarding Friction",
      description:
        "Multiple new customers reported confusion during the onboarding flow. The verification step takes too long.",
      category: "Customer Experience",
      impact: "Medium",
      confidence: "High",
      attachment: null,
      status: "submitted",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Q3 Budget Variance Noticed",
      description:
        "Marketing spend is 15% over budget for Q3 but ROI metrics are also up by 22%. Worth reviewing the allocation.",
      category: "Finance",
      impact: "Medium",
      confidence: "Medium",
      attachment: null,
      status: "submitted",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Delivery SLA Breach Risk",
      description:
        "Current logistics partner is struggling with same-day deliveries in Tier 2 cities. May need backup vendor.",
      category: "Delivery",
      impact: "High",
      confidence: "Low",
      attachment: null,
      status: "submitted",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  await AsyncStorage.setItem(
    OBSERVATIONS_KEY,
    JSON.stringify(dummyObservations),
  );
  return dummyObservations;
};
