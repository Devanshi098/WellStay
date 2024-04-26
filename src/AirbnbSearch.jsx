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
  const [adults, setadults] = useState('');
  const [children, setchildren] = useState('');

  // const handleExpandClick = (id) => {
  //   setListings(prevListings => prevListings.map(listing => {
  //     if (listing.id === id) {
  //       return { ...listing, expanded: !listing.expanded };
  //     }
  //     return listing;
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkInDate}&checkout=${checkOutDate}&adults=${adults}&children=${children}&infants=0&pets=0&page=1&currency=INR`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '6112e6c475msh958a4061a13853dp1b5feejsnd2188ccd77d6',
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
      <form className="search-form mt-6 flex-row " onSubmit={handleSubmit}>
  {/* Your form input fields */}
  {/* Example: */}
  {/* Location */}
  <input className="w-40 bg-[#ff5a60] border border-black border-3 rounded-md px-3 py-2 mr-10 text-black placeholder-black text-center rounded"placeholder="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />    
  {/* Check-in Date */}
  <input className="mt-2 w-40 bg-[#ff5a60] border border-black rounded-md px-3 py-2 mr-10 text-black placeholder-black text-center" type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
  {/* Check-out Date */}
  <input className="mt-2 bg-[#ff5a60] w-40 border  border-black border-3  rounded-md px-3 py-2 mr-10 text-black placeholder-black text-center" type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
  <input className="mt-2 bg-[#ff5a60] w-40 border  border-black border-3 rounded-md px-3 py-2 mr-10 text-gray-700 placeholder-black text-center" placeholder="Adults" type="text" value={adults} onChange={(e) => setadults(e.target.value)} />
  <input className="mt-2 bg-[#ff5a60] w-40 border  border-black border-3  rounded-md px-3 py-2 mr-10 text-gray-700 placeholder-black text-center" placeholder="Children" type="text" value={children} onChange={(e) => setchildren(e.target.value)} />
  <button className="mt-2 bg-[#ff5a60] w-40 border border-black border-3  text-black  py-2 px-4 rounded" type="submit text-center">Search</button>
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
  style={{ height: '200px', width: '100%' ,margin:'auto' }} // Adjust height and width as needed
  image={listing.images[0]}
  alt={listing.name}
/>

              <CardContent style={{ height: '100px' }}> {/* Set fixed height for card content */}
                <Typography variant="body2" color="text.secondary">
                  {listing.description}
                </Typography>
              </CardContent>
              <Typography variant="body2" color="text.secondary"> RATING: {listing.rating} OUT OF {listing.reviewsCount}</Typography>
              <Typography variant="body2" color="text.secondary"> INR {listing.price["rate"]} per night.</Typography>
              <Typography variant="body2" color="text.secondary"> BEDROOMS: {listing.bedrooms} </Typography>
              <Typography variant="body2" color="text.secondary"> LOCATION: {listing.address} </Typography>
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
