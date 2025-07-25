import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios(`${API}/employees/`);
        
        const employeeList = response.data;

        setEmployees(employeeList);
        localStorage.setItem('numberOfEmployees', employeeList.length);
      } catch (error) {
        setError(error.message || 'Failed to fetch employees.')
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, []); 

  // Function for creating a new employee
  const addEmployee = async (data) => {
    try {
      const res = await axios.post(`${API}/employees/`, data);
      setEmployees((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add employee', err);
    }
  };

  // Function for updating employee 
  const updateEmployee = async (id, data) => {

    console.log("Context update: ", id, data);
    

    try {
      // const res = await axios.put(`${API}/employees/${id}`, data);
      const res = await axios.put(`http://localhost:4000/api/employees/${id}`, data);
      const updatedInfo = res?.data;

      console.log(updatedInfo);
      

      setEmployees((prev) =>
        prev.map((e) => (e._id === id ? updatedInfo : e))
      );
    } catch (err) {
      console.error('Failed to update employee', err);
    }
  };

  // Function for deleting an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API}/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Failed to delete employee', err);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, loading, error, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  )
}