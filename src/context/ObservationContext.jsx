import React, { createContext, useContext, useReducer, useEffect } from "react";

import {
  saveObservation,
  getAllObservations,
  deleteObservationById,
  updateObservationById,
} from "../storage/observationStorage.jsx";


// initial state