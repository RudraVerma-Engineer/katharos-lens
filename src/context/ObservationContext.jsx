import React, { createContext, useContext, useReducer, useEffect } from "react";

import {
  saveObservation,
  getAllObservations,
  deleteObservationById,
  updateObservationById,
} from "../storage/observationStorage.jsx";
import { isLoading } from "expo-font";

// initial state

const initialState = {
  observations: [],
  draftObservation: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  filters: {
    category: null,
    impact: null,
    dateRange: null,
  },
};

// action types

export const ACTIONS = {
  //Loading
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",

  // Observations CRUD
  LOAD_OBSERVATIONS: "LOAD_OBSERVATIONS",
  ADD_OBSERVATION: "ADD_OBSERVATION",
  UPDATE_OBSERVATION: "UPDATE_OBSERVATION",
  DELETE_OBSERVATION: "DELETE_OBSERVATION",

  //Draft (observation being created)
  SET_DRAFT: "SET_DRAFT",
  UPDATE_DRAFT: "UPDATE_DRAFT",
  CLEAR_DRAFT: "CLEAR_DRAFT",

  // Search & Filter
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_FILTER: "SET_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
};

//REDUCER
const observationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case ACTIONS.LOAD_OBSERVATIONS:
      return { ...state, observations: action.payload, isLoading: false };

    case ACTIONS.ADD_OBSERVATION:
      return {
        ...state,
        observations: [action.payload, ...state.observations],
        draftObservation: null,
      };

    case ACTIONS.UPDATE_OBSERVATION:
      return {
        ...state,
        observations: state.observations.map((obs) =>
          obs.id === action.payload.id ? action.payload : obs,
        ),
      };

    case ACTIONS.DELETE_OBSERVATION:
      return {
        ...state,
        observations: state.observations.filter(
          (obs) => obs.id !== action.payload,
        ),
      };

    case ACTIONS.SET_DRAFT:
      return { ...state, draftObservation: action.payload };

    case ACTIONS.UPDATE_DRAFT:
      return {
        ...state,
        draftObservation: {
          ...state.draftObservation,
          ...action.payload,
        },
      };

    case ACTIONS.CLEAR_DRAFT:
      return { ...state, draftObservation: null };

    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        filters: { category: null, impact: null, dateRange: null },
        searchQuery: "",
      };

    default:
      return state;
  }
};

//context
const ObservationContext = createContext(null);

// provider component

export const ObservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(observationReducer, initialState);

  //load observations from storage when app starts
  useEffect(() => {
    loadObservations();
  }, []);

  const loadObservations = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const data = await getAllObservations();
      dispatch({ type: ACTIONS.LOAD_OBSERVATIONS, payload: data });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Failed to load Observations",
      });
    }
  };

  const addObservation = async (observation) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const saved = await saveObservation(observation);
      dispatch({ type: ACTIONS.ADD_OBSERVATION, payload: saved });
      return saved;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Failed to save observation",
      });
      throw error;
    }
  };

  const updateObservation = async (observation) => {
    try {
      const updated = await updateObservationById(observation);
      dispatch({ type: ACTIONS.UPDATE_OBSERVATION, payload: updated });
      return updated;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Failed to update observation",
      });
      throw error;
    }
  };

  const deleteObservation = async (id) => {
    try {
      await deleteObservationById(id);
      dispatch({ type: ACTIONS.DELETE_OBSERVATION, payload: id });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Failed to delete observation",
      });
      throw error;
    }
  };

  const setDraft = (observation) => {
    dispatch({ type: ACTIONS.SET_DRAFT, payload: observation });
  };

  const updateDraft = (fields) => {
    dispatch({ type: ACTIONS.UPDATE_DRAFT, payload: fields });
  };

  const clearDraft = () => {
    dispatch({ type: ACTIONS.CLEAR_DRAFT });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  // computed/derived values

  const getFilteredObservations = () => {
    let result = [...state.observations];

    //search by keyword

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      result = result.filter(
        (obs) =>
          obs.title?.toLowerCase().includes(query) ||
          obs.description?.toLowerCase().includes(query),
      );
    }

    // filter by category
    if (state.filters.category) {
      result = result.filter((obs) => obs.category === state.filters.category);
    }

    if (state.filters.impact) {
      result = result.filter((obs) => obs.impact === state.filters.impact);
    }

    return result;
  };

  const getRecentObservations = (count = 5) => {
    return state.observations.slice(0, count);
  };

  const getStats = () => {
    const total = state.observations.length;

    //count observations from this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = state.observations.filter(
      (obs) => new Date(obs.createdAt) >= oneWeekAgo,
    ).length;

    //count unique categories used
    const categoriesUsed = new Set(
      state.observations.map((obs) => obs.category).filter(Boolean),
    ).size;

    return { total, thisWeek, categoriesUsed };
  };

  // value exposed to all screens

  const value = {
    //state
    observations: state.observations,
    draftObservation: state.draftObservation,
    isLoading: state.isLoading,
    error: state.error,
    searchQuery: state.searchQuery,
    filters: state.filters,

    // Actions
    loadObservations,
    addObservation,
    updateObservation,
    deleteObservation,
    setDraft,
    updateDraft,
    clearDraft,
    setSearchQuery,
    setFilter,
    clearFilters,

    //Computed
    getFilteredObservations,
    getRecentObservations,
    getStats,
  };

  return (
    <ObservationContext.Provider value={value}>
      {children}
    </ObservationContext.Provider>
  );
};



// custom hook 

export const useObservations =()=>{
    const context = useContext(ObservationContext);

    if(!context){
        throw new Error("useObservations must be used inside ObservationProvider");
    }

    return context;
}

export default ObservationContext;