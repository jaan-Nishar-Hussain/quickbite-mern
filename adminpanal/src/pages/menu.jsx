import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [food, setFood] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    resturant: '', // Add restaurant field
  });

  const [menuItems, setMenuItems] = useState([]); // State to hold menu items
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editId, setEditId] = useState(null); // State to track the ID of the item being edited

  useEffect(() => {
    // Fetch menu items when the component mounts
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/getall');
        const data = await response.json();
        setMenuItems(data); // Update state with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, []);

  const handleFoodChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdateFood = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    console.log('Food object:', food); // Log the food object

    try {
      const response = await fetch(`http://localhost:5000/admin/${editMode ? `edit/${editId}` : 'adminpost'}`, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(food), // Ensure `food` contains all fields
      });

      const responseData = await response.json();
      console.log('Response data:', responseData); // Log the response data

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add or update food');
      }

      console.log('Food added or updated successfully:', responseData);

      // Fetch the updated menu items
      const updatedResponse = await fetch('http://localhost:5000/admin/getall');
      const updatedData = await updatedResponse.json();
      setMenuItems(updatedData); // Update state with fetched menu items

      // Reset form and edit mode
      setFood({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        resturant: '',
      });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error adding or updating food:', error.message);
    }
  };

  const handleEdit = (item) => {
    setFood({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      resturant: item.resturant._id, // Assuming resturant is populated
    });
    setEditMode(true);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const response = await fetch(`http://localhost:5000/admin/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      console.log('Response data:', responseData); // Log the response data

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to delete food');
      }

      console.log('Food deleted successfully:', responseData);

      // Fetch the updated menu items
      const updatedResponse = await fetch('http://localhost:5000/admin/getall');
      const updatedData = await updatedResponse.json();
      setMenuItems(updatedData); // Update state with fetched menu items
    } catch (error) {
      console.error('Error deleting food:', error.message);
    }
  };

  return (
    <div>
      <h1>Manage Menu</h1>
      <form onSubmit={handleAddOrUpdateFood}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleFoodChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={food.price}
          onChange={handleFoodChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={food.category}
          onChange={handleFoodChange}
          required
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
          name="resturant"
          placeholder="Restaurant ID"
          value={food.resturant}
          onChange={handleFoodChange}
          required
        />
        <button type="submit">{editMode ? 'Update Food' : 'Add Food'}</button>
      </form>

      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <p>Category: {item.category}</p>
            <p>Description: {item.description}</p>
            <p>Restaurant: {item.resturant ? item.resturant.name : 'Unknown'}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;