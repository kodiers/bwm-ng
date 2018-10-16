const Rental = require('./models/rental');
const User = require('./models/user');

class FakeDb {
  constructor() {
    this.rentals = [{
      title: "Nice view on ocean",
      city: "San Francisco",
      street: "Main street",
      category: "condo",
      image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
      bedrooms: 4,
      shared: true,
      description: "Very nice apartment in center of the city.",
      dailyRate: 43
    },
      {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }];

    this.users = [{
      username: "testuser",
      email: "test@gmail.com",
      password: "p@ssw0rd"
    }, {
        username: "testuser2",
        email: "test2@gmail.com",
        password: "p@ssw0rd"
      }];
  }

  async cleanDB() {
    await User.deleteMany();
    await Rental.deleteMany();
  }

  pushRentalsToDB() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }

  async seedDB() {
    await this.cleanDB();
    this.pushRentalsToDB();
  }
}

module.exports = FakeDb;
