import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestList.css'; 
const TestList = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tests',{
          withCredentials: true
        });
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error.response ? error.response.data : error.message);
      }
    };

    fetchTests();
  }, []);

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tests/${testId}`,{
        withCredentials: true
      });
      setTests(tests.filter(test => test._id !== testId)); 
    } catch (error) {
      console.error('Error deleting test:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="test-list">
      <h2>Test List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => (
            <tr key={test._id}>
              <td>{test.title}</td>
              <td>{test.description}</td>
              <td>
                <button onClick={() => handleDelete(test._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;
