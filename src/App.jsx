import AirbnbSearch from "./AirbnbSearch";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Filters */}
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Filters />
        {/* Rentals */}
        <AirbnbSearch/>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;