const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "conection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6120ec61a77e5f68d8a26245',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, obcaecati laudantium, rerum dolore sunt, facere deserunt soluta unde eos dolor reiciendis. Facere asperiores sit a, recusandae voluptas dolore perspiciatis dicta?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqzxwbidp/image/upload/v1629801713/YelpCamp/crycosl5c6eoniiflkrl.jpg',
                    filename: 'YelpCamp/crycosl5c6eoniiflkrl'
                },
                {
                    url: 'https://res.cloudinary.com/dqzxwbidp/image/upload/v1629801712/YelpCamp/vmhmwiu7nnkacxs11h7b.jpg',
                    filename: 'YelpCamp/vmhmwiu7nnkacxs11h7b'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})