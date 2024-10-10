/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    bookingTime: new Date(),
    email: 'Jack@gmail.com',
    seatNumber: 1,
    travelClass: 'Economy',
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    bookingTime: new Date(),
    email: 'Rose@gmail.com',
    seatNumber: 2,
    travelClass: 'Business',
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { id, name, phone, email, seatNumber, travelClass, bookingTime } = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{seatNumber}</td>
      <td>{travelClass}</td>
      <td>{bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Seat Number</th>
          <th>Travel Class</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',        // Initialize as empty string
      phone: '',       // Initialize as empty string
      email: '',       // Initialize as empty string
      seatNumber: '',  // Initialize as empty string
      travelClass: '', // Initialize as empty string
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.name || !this.state.phone || !this.state.email || !this.state.seatNumber || !this.state.travelClass) {
      alert("Please fill in all the fields.");
      return;
    }

    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const newTraveller = {
      id: Date.now(), // A unique ID for the traveller
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      seatNumber: parseInt(this.state.seatNumber, 10),
      travelClass: this.state.travelClass,
      bookingTime: new Date(),
  };

  this.props.bookTraveller(newTraveller); // Pass the new traveller to the parent function
    
    // Reset form fields
    this.setState({
      name: '',
      phone: '',
      email: '',
      seatNumber: '',
      travelClass: '',
    });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	      {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          name="seatNumber"
          placeholder="Seat Number"
          value={this.state.seatNumber}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="travelClass"
          placeholder="Travel Class"
          value={this.state.travelClass}
          onChange={this.handleInputChange}
        />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.name) {
      alert("Please enter a name to delete.");
      return;
    }

    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    this.props.deleteTraveller(this.state.name);
    this.setState({ name: '' }); 
  }
  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
      <input
        type="text"
        name="name"
        placeholder="Enter Name to Delete"
        value={this.state.name}
        onChange={this.handleInputChange}
      />
      <button type="submit">Delete</button>
      </form>
    );
  }
}

//const testTravellers = [
  //{ id: 1, name: 'Test1', seatNumber: 1 },
  //{ id: 2, name: 'Test2', seatNumber: 2 }
//];

class Homepage extends React.Component {

  /*Q6. Visual Representation of reserved/unreserved tickets.*/
  renderSeatMap() {
    const totalSeats = 10;
    //const bookedSeats = testTravellers.length;
    const bookedSeats = this.props.travellers ? this.props.travellers.length : 0;
    const freeSeats = totalSeats - bookedSeats;

    console.log("Travellers:", this.props.travellers);

    return (
      <div>
        <p>Total Seats: {totalSeats}</p>
        <p>Free Seats: {freeSeats}</p>
        <div className="seat-map">
          {Array.from({ length: totalSeats }, (_, index) => (
            <div
              key={index}
              className={`seat ${index < bookedSeats ? "booked-seat" : "free-seat"}`}
            />
          ))}
        </div>

        {/* Legend for the seat colors */}
        <div className="legend">
          <div>
            <div className="color-box" style={{ backgroundColor: "grey" }}></div>
            <span>Booked Seat</span>
          </div>
          <div>
            <div className="color-box" style={{ backgroundColor: "green" }}></div>
            <span>Free Seat</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        {this.renderSeatMap()}
      </div>
    );
  }
}
  
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.setSelector = this.setSelector.bind(this);
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value){
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState(prevState => ({
        travellers: [...prevState.travellers, passenger],
      }));
  }


  deleteTraveller(passengerName) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState(prevState => ({
      travellers: prevState.travellers.filter(traveller => traveller.name !== passengerName),
    }));
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
	      <div>
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>Display Travellers</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	      </div>
  
        <div>
          {/* Only one of the below four divisions is rendered based on the button clicked by the user. */}
          {/* Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats. */}
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}  {/* Homepage Component */}
          {/* Q4. Code to call the component that adds a traveller. */}
          {this.state.selector === 2 && <Add bookTraveller={this.bookTraveller} />}  {/* Add Component */}
          {/* Q3. Code to call component that Displays Travellers. */}
          {this.state.selector === 3 && <Display travellers={this.state.travellers} />}  {/* Display Component */}
          {/* Q5. Code to call the component that deletes a traveller based on a given attribute. */}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}  {/* Delete Component */}
       </div>
     </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
