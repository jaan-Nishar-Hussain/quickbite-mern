import React, { useState } from 'react';

const Dashboard = () => {
  const [food, setFood] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    available: true,
    restaurant: '',
  });

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    location: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const handleFoodChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleRestaurantChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const response = await fetch('http://localhost:5000/admin/adminpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(food),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add food');
      }
      console.log('menu added',food)
      setSuccess('Food added successfully!',);
      setFood({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        available: true,
        restaurant: '',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const response = await fetch('http://localhost:5000/admin/postresturant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(restaurant),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add restaurant');
      }

      console.log('resturant added ',restaurant)
      setRestaurant({
        name: '',
        description: '',
        location: '',
        image: '',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel Dashboard</h1>

      {/* Display Loading, Success, and Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Add Food Form */}
      <div>
        <h2>Add Food Item</h2>
        <form onSubmit={handleAddFood}>
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={food.name}
            onChange={handleFoodChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={food.price}
            onChange={handleFoodChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={food.category}
            onChange={handleFoodChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={food.image}
            onChange={handleFoodChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={food.description}
            onChange={handleFoodChange}
          />
          <input
            type="text"
            name="restaurant"
            placeholder="Restaurant"
            value={food.restaurant}
            onChange={handleFoodChange}
          />
          <button type="submit" disabled={loading}>Add Food</button>
        </form>
      </div>

      <hr />

      {/* Add Restaurant Form */}
      <div>
        <h2>Add Restaurant</h2>
        <form onSubmit={handleAddRestaurant}>
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={restaurant.name}
            onChange={handleRestaurantChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={restaurant.description}
            onChange={handleRestaurantChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={restaurant.location}
            onChange={handleRestaurantChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={restaurant.image}
            onChange={handleRestaurantChange}
          />
          <button type="submit" disabled={loading}>Add Restaurant</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
