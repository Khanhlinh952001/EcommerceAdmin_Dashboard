// src/hooks/useCustomer.js
import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebaseConfig';

const useCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const customersRef = ref(database, 'customers');
    
    const unsubscribe = onValue(customersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCustomers(Object.values(data)); // Convert the object to an array
      } else {
        setCustomers([]);
      }
    });

    return () => {
      off(customersRef);
    };
  }, []);

  return customers;
};

export default useCustomer;
