import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function AirbnbSearch() {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [listings, setListings] = useState([]);

  const handleExpandClick = (id) => {
    setListings(prevListings => prevListings.map(listing => {
      if (listing.id === id) {
        return { ...listing, expanded: !listing.expanded };
      }
      return listing;
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '6d8e5bba7emshd1578a3937d5b4ap101ddejsn8d1743b672c9',
          'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedListings = data.results.map(listing => ({ ...listing, expanded: false }));
      setListings(formattedListings);
    } catch (error) {
      console.error('Error fetching Airbnb listings:', error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount or when dependencies change
    handleSubmit();
  }, []); // Empty dependency array means it only runs once on mount

  return (
    <div className="airbnb-search">
      <form onSubmit={handleSubmit}>
        {/* Your form input fields */}
        {/* Example: */}
        {/* Location */}
        <input placeholder="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />    
        {/* Check-in Date */}
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        {/* Check-out Date */}
        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <br/>
      <br/>
      <Grid container spacing={2}>
        {listings.map(listing => (
          <Grid item xs={6} sm={4} md={3} key={listing.id}>
            <Card style={{ height: '100%' }}> {/* Set card height to 100% */}
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                    🤚
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={listing.name}
                subheader={listing.city}
              />
              <CardMedia
                component="img"
                height="140" 
                image={listing.images[0]}
                alt={listing.name}
              />
              <CardContent style={{ height: '100px' }}> {/* Set fixed height for card content */}
                <Typography variant="body2" color="text.secondary">
                  {listing.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleExpandClick(listing.id)}
                  aria-expanded={listing.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={listing.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {/* Additional information, if needed */}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AirbnbSearch;
