import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL;

export const Calendar = () => {
    const [events,setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: '',
        type: 'Meeting',
        description: ''
    });
    const [showHistory, setShowHistory] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All");

    useEffect(() => {
        axios.get(`${API}/events`)
            .then(res => {
                const now = new Date();

                const past = res.data.filter(event => new Date(event.date) < now);
                const upcoming = res.data.filter(event => new Date(event.date) >= now);

                console.log(past);
                
                setPastEvents(past);
                setUpcomingEvents(upcoming);
                setEvents(res.data);
            })
            .catch(err => console.error(err));
    }, [])

    const days = Array.from({ length: 35 }, (_, i) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - 4 + i);
        return {
            date,
            isCurrentMonth: date.getMonth() === currentDate.getMonth(),
            isToday: date.toDateString() === new Date().toDateString(),
            events: events.filter(e => new Date(e.date).toDateString() === date.toDateString()),
        };
    });

    // Handles add event
    const handleAddEvent = async (e) => {
        e.preventDefault();

        const formattedType = newEvent.type.toLowerCase().replace(' ', '-')
        const newEventObj = {
            id: Date.now(),
            ...newEvent,
            type: formattedType
        };

        try {
            const response = await axios.post(`${API}/events`, newEventObj);
            // setEvents(prev => [...prev, response.data]);
            toast.success('Event added successfully!');
        } catch (error) {
            console.error('Failed to add event:', error);
            toast.error('Failed to add event.');
        }

        setNewEvent({
            name: '',
            date: '',
            type: 'Meeting',
            description: ''
        });
    };

    const nextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    // Handles filtering past events
    const handleViewHistory = () => {
        const today = new Date();
        const history = pastEvents.filter(e => new Date(e.date) < today);
        setPastEvents(history);
        setShowHistory(true);
    };

    // Filtered past events
    const filteredPastEvents = pastEvents.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "All" || event.type === filterType.toLowerCase().replace(" ", "-");
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View and manage all daycare events, activities, and important dates.
                </p>
            </div>
            {/* Calendar Header */}
            <div className="flex items-center">
                <div className="flex-1">
                    <h2 className="font-semibold text-gray-900">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                </div>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={prevMonth}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={goToToday}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={nextMonth}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {/* Calender Grid */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="grid grid-cols-7 gap-px border-b border-gray-200 bg-gray-200">
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Sun
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Mon
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Tue
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Wed
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Thu
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Fri
                        </div>
                    </div>
                    <div className="bg-white py-2">
                        <div className="text-center text-sm font-medium text-gray-500">
                            Sat
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`bg-white px-2 py-2 h-28 ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
                        >
                            <div className="flex items-center">
                                <span
                                    className={`text-sm font-medium 
                    ${day.isToday ? 'bg-purple-600 text-white h-6 w-6 rounded-full flex items-center justify-center' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
                                >
                                    {day.date.getDate()}
                                </span>
                            </div>
                            <div className="mt-1 space-y-1">
                                {day.events.map((event) => (
                                    <div
                                        key={event._id}
                                        className={`px-2 py-1 text-xs rounded-lg overflow-hidden 
                      ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : event.type === 'field-trip' ? 'bg-green-100 text-green-800' : event.type === 'staff' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}
                                    >
                                        {event.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Event Section */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="flex items-center justify-between px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Upcoming Events
                    </h3>
                    <button
                        onClick={handleViewHistory}
                        className="px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        View Event History
                    </button>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {upcomingEvents.map((event) => (
                            <li key={event._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2 w-2 flex flex-col rounded-full mr-3
                      ${event.type === 'meeting' ? 'bg-blue-500' : event.type === 'field-trip' ? 'bg-green-500' : event.type === 'staff' ? 'bg-yellow-500' : 'bg-purple-500'}`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {event.name}
                                            </p>
                                            <p className="text-sm font-normal text-gray-700">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {showHistory && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                            <div className="flex justify-between items-center px-4 py-2 border-b">
                                <h2 className="text-lg font-semibold">Past Event History</h2>
                                <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
                            </div>
                            <div className="p-4">
                                {/* Search & Filter */}
                                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="w-full sm:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="All">All Types</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Field Trip">Field Trip</option>
                                        <option value="Staff Event">Staff Event</option>
                                        <option value="Special Celebration">Special Celebration</option>
                                    </select>
                                </div>

                                {/* Event List */}
                                <div className="max-h-90 overflow-y-auto">
                                    {filteredPastEvents.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {filteredPastEvents.map(event => (
                                                <li key={event._id} className="py-2">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">{event.name}</span>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(event.date).toLocaleDateString('en-GB')}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 capitalize">{event.type.replace("-", " ")}</p>
                                                    <p className="text-sm text-gray-600">{event.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No events match your search/filter.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Event Types Info */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Event Types
                        </h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="h-4 w-4 rounded-full bg-blue-500 mr-3"></div>
                                <span className="text-sm text-gray-700">
                                    Meetings & Conferences
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 rounded-full bg-green-500 mr-3"></div>
                                <span className="text-sm text-gray-700">Field Trips</span>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 rounded-full bg-yellow-500 mr-3"></div>
                                <span className="text-sm text-gray-700">Staff Events</span>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 rounded-full bg-purple-500 mr-3"></div>
                                <span className="text-sm text-gray-700">
                                    Special Celebrations
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg sm:col-span-2">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Add New Event
                        </h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <form className="space-y-4" onSubmit={handleAddEvent}>
                            <div>
                                <label
                                    htmlFor="event-name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    name="event-name"
                                    id="event-name"
                                    required
                                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                    className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="event-date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="event-date"
                                        id="event-date"
                                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                        className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="event-type"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Event Type
                                    </label>
                                    <select
                                        id="event-type"
                                        name="event-type"
                                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                                        className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        required
                                    >
                                        <option>Meeting</option>
                                        <option>Field Trip</option>
                                        <option>Staff Event</option>
                                        <option>Special Celebration</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="event-description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="event-description"
                                    name="event-description"
                                    rows={3}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    required
                                    className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
