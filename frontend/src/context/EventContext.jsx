import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch activities from db
    const fetchEvents = async () => {
        try {
            const eventList = await axios.get(`${API}/events/`);
            const fetchedEvents = eventList?.data;

            setEvents(fetchedEvents);
        } catch (err) {
            console.error('Failed to fetch events.', err);
        } finally {
            setLoading(false);
        }
    };

    // Function for creating a activity
    const addEvent = async (data) => {

        try {
            const res = await axios.post(`${API}/events/`, data);
            const newEvent = res?.data;

            console.log(newEvent);

            setEvents((prev) => [...prev, newEvent]);
        } catch (err) {
            console.error('Failed to add event', err);
        }
    };

    // Update
    // const updateActivity = async (id, updatedData) => {
    //   try {
    //     const res = await axios.put(`/activities/${id}`, updatedData);
    //     setActivities((prev) =>
    //       prev.map((l) => (l._id === id ? res.data : l))
    //     );
    //   } catch (err) {
    //     console.error('Failed to update activity', err);
    //   }
    // };

    // Delete
    // const deleteActivity = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:4000/api/activities/${id}`);
    //         setActivities((prev) => prev.filter((l) => l._id !== id));
    //     } catch (err) {
    //         console.error('Failed to delete activity', err);
    //     }
    // };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventsContext.Provider value={{ events, addEvent }}>
            {children}
        </EventsContext.Provider>
    );
};
