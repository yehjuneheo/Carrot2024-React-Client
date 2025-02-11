import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/ProductService.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('/api/products/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/'); // Redirect to the product list after successful submission
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="add-product-container">
          <Navbar />
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="titleBox">
                    Post Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <div className="input-grid">
                  <label>
                      Product Name:
                      <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      Price:
                      <input
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      Location:
                      <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      Category:
                      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                          <option value="">Select a category</option>
                          {/* Replace with your actual CATEGORY_CHOICES */}
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="home">Home</option>
                      </select>
                  </label>
                  <label>
                      Image:
                      <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                      />
                  </label>
                </div>
                <label htmlFor="content">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}                    />
                </label>
                <div className="button-container">
                  <button type="submit">Submit Product</button>
                  <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default AddProduct;
