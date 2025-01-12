import React, { useState, useEffect } from 'react';

const Resturant = () => {
  const [restaurants, setRestaurants] = useState([]); // List of restaurants
  const [editRestaurant, setEditRestaurant] = useState(null); // Restaurant being edited
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    location: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token'); 

  // Fetch all restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('http://localhost:5000/admin/getresturant', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch restaurants');
        }

        setRestaurants(data.restaurants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [token]);

  // Add a new restaurant
  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/admin/postresturant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newRestaurant),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add restaurant');
      }

      setSuccess('Restaurant added successfully!');
      setRestaurants([...restaurants, data.restaurant]);
      setNewRestaurant({ name: '', description: '', location: '', image: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a restaurant
  const handleDeleteRestaurant = async (id) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/admin/deleteresturant/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete restaurant');
      }

      setSuccess('Restaurant deleted successfully!');
      setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a restaurant
  const handleUpdateRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/admin/editresturant/${editRestaurant._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editRestaurant),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update restaurant');
      }

      setSuccess('Restaurant updated successfully!');
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant._id === editRestaurant._id ? data.restaurant : restaurant
        )
      );
      setEditRestaurant(null); // Exit edit mode
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Restaurant Management</h1>

      {/* Display Messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Add New Restaurant Form */}
      <div>
        <h2>{editRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
        <form onSubmit={editRestaurant ? handleUpdateRestaurant : handleAddRestaurant}>
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={editRestaurant ? editRestaurant.name : newRestaurant.name}
            onChange={(e) =>
              editRestaurant
                ? setEditRestaurant({ ...editRestaurant, name: e.target.value })
                : setNewRestaurant({ ...newRestaurant, name: e.target.value })
            }
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editRestaurant ? editRestaurant.description : newRestaurant.description}
            onChange={(e) =>
              editRestaurant
                ? setEditRestaurant({ ...editRestaurant, description: e.target.value })
                : setNewRestaurant({ ...newRestaurant, description: e.target.value })
            }
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editRestaurant ? editRestaurant.location : newRestaurant.location}
            onChange={(e) =>
              editRestaurant
                ? setEditRestaurant({ ...editRestaurant, location: e.target.value })
                : setNewRestaurant({ ...newRestaurant, location: e.target.value })
            }
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={editRestaurant ? editRestaurant.image : newRestaurant.image}
            onChange={(e) =>
              editRestaurant
                ? setEditRestaurant({ ...editRestaurant, image: e.target.value })
                : setNewRestaurant({ ...newRestaurant, image: e.target.value })
            }
          />
          <button type="submit" disabled={loading}>
            {editRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
          </button>
        </form>
      </div>

      <hr />

      {/* List of Restaurants */}
      <div>
        <h2>All Restaurants</h2>
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant._id} style={{ marginBottom: '10px' }}>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <p>{restaurant.location}</p>
                {restaurant.image && (
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                  />
                )}
                <button
                  onClick={() => setEditRestaurant(restaurant)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRestaurant(restaurant._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Resturant;
