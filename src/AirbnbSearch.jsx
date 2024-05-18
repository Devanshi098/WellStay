import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function AirbnbSearch() {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [listings, setListings] = useState([]);
  const [adults, setadults] = useState('');
  const [children, setchildren] = useState('');
  const [showImage, setShowImage] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${adults}&children=${children}&infants=0&pets=0&page=1&currency=INR`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '918f620157msh114346aeb04e72fp1e766bjsnb71ae37e7c98',
          'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setListings(data.results);
      setShowImage(false);
    } catch (error) {
      console.error('Error fetching Airbnb listings:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleCardClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleClose = () => {
    setSelectedListing(null);
  };

  return (
    <div className="airbnb-search">
      <form className="search-form mt-6 flex-row" onSubmit={handleSubmit}>
        {/* Location */}
        <input className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px] mr-4" placeholder="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        {/* Check-in Date */}
        <input className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px] mr-4" type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        {/* Check-out Date */}
        <input className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px] mr-4" type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
        {/* No. of adults */}
        <input className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-4 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px] mr-4" placeholder="Adults" type="text" value={adults} onChange={(e) => setadults(e.target.value)} />
        {/* No. of children */}
        <input className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px] mr-4" placeholder="Children" type="text" value={children} onChange={(e) => setchildren(e.target.value)} />
        <button className="items-center text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 duration-200 ease-out gap-2 py-2 px-4 sm:px-6 rounded-lg shadow-md text-[14px] sm:text-[16px]">Search</button>
      </form>
      {showImage && (
        <img src="https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg" alt="Description of image" style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }} />
      )}
      <br />
      <br />
      <Grid container spacing={2}>
        {listings.map(listing => (
          <Grid item xs={12} sm={7} md={3} key={listing.id}>
            <Card onClick={() => handleCardClick(listing)} style={{ cursor: 'pointer', height: '100%' }}>
              <CardMedia
                component="img"
                style={{ height: '200px',borderRadius:'10px' }}
                image={listing.images[0]}
                alt={listing.name}
              />
              <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {listing.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.city}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedListing && (
        <Modal
          open={Boolean(selectedListing)}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            border: '2px solid #000', 
            boxShadow: 24,
            borderRadius:'30px', 
            p: 4 
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedListing.name}
            </Typography>
            <CardMedia
              component="img"
              style={{ height: '200px', width: '100%', margin: 'auto',borderRadius:'30px' }}
              image={selectedListing.images[0]}
              alt={selectedListing.name}
            />
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {selectedListing.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              RATING: {selectedListing.rating} OUT OF {selectedListing.reviewsCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              INR {selectedListing.price["rate"]} per night.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              BEDROOMS: {selectedListing.bedrooms}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              LOCATION: {selectedListing.address}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default AirbnbSearch;
