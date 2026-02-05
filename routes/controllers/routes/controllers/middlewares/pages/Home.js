import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/houses')
      .then(res=>setHouses(res.data))
      .catch(err=>console.log(err));
  },[]);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Available Houses</h1>
      <div className="grid grid-cols-3 gap-4">
        {houses.map(h => (
          <div key={h.id} className="border p-2 rounded shadow">
            <h2 className="text-xl">{h.title}</h2>
            <p>{h.city} - {h.neighborhood}</p>
            <p>{h.price} MAD / {h.price_type === 'per_month' ? 'month':'day'}</p>
            <Link to={`/house/${h.id}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
