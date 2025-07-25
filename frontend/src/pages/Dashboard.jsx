import { StatsCard } from '../components/StatsCard';
import { Card } from '../components/Card'
import { useContext, useEffect, useState } from "react";
import { LearnerContext } from "../context/LearnerContext";
import { UsersIcon, ClockIcon, BarChartIcon, CalendarIcon, BriefcaseBusiness, PersonStanding } from 'lucide-react'
import { UsersContext } from "../context/UserContext";
import { EventsContext } from "../context/EventContext";
import { EmployeeContext } from "../context/employeeContext";

export default function Dashboard() {
    const [role, setRole] = useState('');

    const { learnersData } = useContext(LearnerContext);
    const { usersData, userProfile } = useContext(UsersContext);
    const { events } = useContext(EventsContext);
    const { employees } = useContext(EmployeeContext);

    const numberOfLearners = learnersData?.length;
    const numberOfemployees = employees?.length;
    const numberOfUsers = usersData?.length;
    const numberOfEvents = events?.length;

    useEffect(() => {
        const fetchLocalData = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            setRole(user.role);
        }

        fetchLocalData();
    }, [events]);

    console.log(events);


    return (
        <main className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Here's what's happening at Little Explorers Daycare
                    today.
                </p>
            </div>
            {/* Stats Card */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {role === 'admin' ? (
                    <>
                        <StatsCard
                            title="Total Learners"
                            value={numberOfLearners}
                            icon={<PersonStanding className="h-6 w-6 text-blue-600" />}
                            color="blue"
                        />
                        <StatsCard
                            title="Total Employees"
                            value={numberOfemployees}
                            icon={<BriefcaseBusiness className="h-6 w-6 text-green-600" />}
                            color="green"
                        />
                        <StatsCard
                            title="Total Users"
                            value={numberOfUsers}
                            icon={<UsersIcon className="h-6 w-6 text-green-600" />}
                            color="green"
                        />
                        <StatsCard
                            title="Total Events"
                            value={numberOfEvents}
                            icon={<BarChartIcon className="h-6 w-6 text-green-600" />}
                            color="green"
                        />
                    </>
                ) : (<>
                    <StatsCard
                        title="Total Learners"
                        value={numberOfLearners}
                        icon={<PersonStanding className="h-6 w-6 text-blue-600" />}
                        color="blue"
                    />
                </>)}
                {/* <StatsCard
                    title="Total Learners"
                    value={numberOfLearners}
                    icon={<UsersIcon className="h-6 w-6 text-blue-600" />}
                    color="blue"
                />
                <StatsCard
                    title="Total Employees"
                    value={numberOfemployees}
                    icon={<ClockIcon className="h-6 w-6 text-green-600" />}
                    color="green"
                />
                <StatsCard
                    title="Total Users"
                    value={numberOfUsers}
                    icon={<ClockIcon className="h-6 w-6 text-green-600" />}
                    color="green"
                /> */}
                {/* <StatsCard
                    title="Activities Planned"
                    value="8"
                    description="3 completed"
                    trend="neutral"
                    icon={<BarChartIcon className="h-6 w-6 text-purple-600" />}
                    color="purple"
                /> */}
                {/* <StatsCard
                    title="Parent Messages"
                    value="12"
                    description="5 unread"
                    trend="up"
                    icon={<CalendarIcon className="h-6 w-6 text-amber-600" />}
                    color="amber"
                /> */}
            </div>
            {/* Quick Actions */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Upcoming Events
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {events?.length > 0 ? events.map((event) => (
                            <li key={event._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2 w-2 rounded-full mr-3 flex flex-col
                      ${event.type === 'meeting' ? 'bg-blue-500' : event.type === 'field-trip' ? 'bg-green-500' : event.type === 'staff' ? 'bg-yellow-500' : 'bg-purple-500'}`}
                                        />
                                        <div className='flex flex-col gap-[-2px]'>
                                            <p className="text-sm font-medium text-gray-900">
                                                {event.name}
                                            </p><br />
                                            <p className="text-sm font-medium text-gray-900">
                                                {event.type}
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
                        )) : (<li className="px-4 py-4 sm:px-6">No events.</li>)}
                    </ul>
                </div>
            </div>
        </main>
    )
}