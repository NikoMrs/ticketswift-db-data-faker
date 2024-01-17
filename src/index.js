const { fakerIT: faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const crypto = require('crypto')

const { client, ObjectId, getDbLocations, getDbEvents, getDbArtists, getDbUsers} = require("./services/database.service");

const User = require('./schemas/user.schema');
const Event = require('./schemas/event.schema');
const Location = require('./schemas/location.schema');
const Purchase = require('./schemas/purchase.schema');
const Artist = require('./schemas/artist.schema');


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.DATABASE_URL);

        console.log("connected to db");
    } catch (error) {
        console.error(error);
    }
};

async function generateUsers(num){

    const users = [];
  
    for (let i = 0; i < num; i++) {

        const email = faker.internet.email();
        const password = faker.lorem.words(5);
        const pwd = crypto.createHash('sha256').update(password).digest('hex');
    
        users.push({
            email,
            pwd,
        });
    }
  
    return users;

};

async function generateLocations(num){

    const locations = [];
  
    for (let i = 0; i < num; i++) {

        const name = faker.company.name();
        const type = faker.commerce.department();
        const capacity = faker.number.int({min: 25, max: 5000});

        // const country = faker.location.country();
        // country = "Italy"
        // const region = faker.location.state();
        // const city = faker.location.city();
        // const postalCode = faker.location.zipCode();
        // const address = faker.location.streetAddress();

        // Parto dalle coordinate e uso Google maps regione, città, zip...

        // const coordinates = {
        //     latitude: parseFloat(faker.location.latitude()),
        //     longitude: parseFloat(faker.location.longitude())
        // };
        // console.log(coordinates['latitude'] + ", " + coordinates['longitude']);

        // const nearbyCoordinates = faker.location.nearbyGPSCoordinate({
        //     origin: [coordinates['latitude'], coordinates['longitude']],
        //     radius: 3000
        // });
        // console.log(nearbyCoordinates[0] + ", " + nearbyCoordinates[1]);

        const coordinatesApiUrl = "http://api.3geonames.org/randomland.IT.json";
        const coordinatesApiResponse = await fetch(coordinatesApiUrl);
        const coordinatesApiJson = await coordinatesApiResponse.json();
        const coordinates = {
            latitude: coordinatesApiJson['nearest']['latt'],
            longitude: coordinatesApiJson['nearest']['longt']
        };
            
        let locationApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
        locationApiUrl += "latlng=" + coordinates.latitude + "," + coordinates.longitude;
        locationApiUrl += "&result_type=route|administrative_area_level_3|country|postal_code"
        locationApiUrl += "&key=" + process.env.GOOGLE_MAPS_API_KEY;
        //const locationApiResponse = await fetch(locationApiUrl);
        //const locationApiJson = await locationApiResponse.json();
        const locationApiJson = require('../test.json');
        
        const locationData = locationApiJson['results'][0]['address_components'];

        const city = locationData.find(obj => obj.types.includes("administrative_area_level_3")).long_name;
        const route = locationData.find(obj => obj.types.includes("route")).long_name
        const streetNumber = locationData.find(obj => obj.types.includes("street_number"));
        const address = (streetNumber != undefined) ? route + " " + streetNumber.long_name : route;
        const country = locationData.find(obj => obj.types.includes("country")).long_name;
        const postalCode = locationData.find(obj => obj.types.includes("postal_code")).long_name;

        locations.push({
            name,
            type,
            capacity,
            country,
            city,
            postalCode,
            address,
            coordinates
        });
    }

    return locations;

};

async function generateArtists(num){

    const artists = [];
  
    for (let i = 0; i < num; i++) {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName();
        const name = firstName + " " + lastName;
        const awards = [];
        const socialName = name.replace(/ /g, "_");
        const socialMedia = {
            twitter: `@${socialName}`,
            facebook: socialName,
            instagram: socialName
        }
    
        artists.push({
            name,
            awards,
            socialMedia
        });
    }
  
    return artists;

};

async function generateEvents(num){

    const events = [];
    const allArtists = await getDbArtists();
    const allVenue = await getDbLocations();
  
    for (let i = 0; i < num; i++) {

        const randomArtist = allArtists[getRandomInt(allArtists.length)];
        const artist = randomArtist;
        const artistId = randomArtist['_id'];

        const randomVenue = allVenue[getRandomInt(allVenue.length)];
        const location = randomVenue;
        const locationId = randomVenue['_id'];
        const locationCapacity = randomVenue['capacity'];

        let tickets = [];
        standardPrice = faker.number.int({min: 25, max: 150})
        tickets.push({
            name: "Standard Ticket",
            availability: faker.number.int({min: 0, max: locationCapacity}),
            price: standardPrice,
            _id: new ObjectId()
        });
        if(getRandomInt(3) == 2){
            tickets.push({
                name: "Premium Ticket",
                availability: faker.number.int(),
                price: faker.number.int({min: standardPrice + 25, max: standardPrice + 125}),
                _id: new ObjectId()
            });
        }

        let name = faker.word.words({count: {min: 3, max: 5}});
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const saleStart = faker.date.past();
        const saleEnd = faker.date.future();
        const date = faker.date.future();
        const genre = faker.commerce.department();
        const subgenre = [faker.commerce.department()];
        const coordinates = randomVenue['coordinates'];
    
        events.push({
            artistId,
            artist,
            locationId,
            location,
            name,
            tickets,
            saleStart,
            saleEnd,
            date,
            genre,
            subgenre,
            coordinates
        });

    }
  
    return events;

};

async function generatePurchases(num){

    const purchases = [];
    const allEvents = await getDbEvents();
    const allUsers = await getDbUsers();
  
    for (let i = 0; i < num; i++) {

        const randomUser = allUsers[getRandomInt(allUsers.length)];
        const userId = randomUser['_id'];

        let cart = []
        const cartItems = getRandomInt(2)+1;

        for (let j = 0; j < cartItems; j++) {

            const randomEvent = allEvents[getRandomInt(allEvents.length)];
            const eventTickets = randomEvent['tickets'];
            const randomTicket = eventTickets[getRandomInt(eventTickets.length)];

            const item = {
                ticketId: randomTicket['_id'],
                quantity: faker.number.int({min: 0, max: randomTicket['availability']}),
                price: faker.commerce.price()
            };

            cart.push(item);

        }

        const date = faker.date.past();

        const state = "completed";
    
        purchases.push({
            cart,
            userId,
            date,
            state
        });
    }
  
    return purchases;

};


async function setUp(num){

    connectDB()

    const newUsers = await generateUsers(num);
    await User.insertMany(newUsers);
    console.log("New users created successfully")

    const newLocations = await generateLocations(num);
    await Location.insertMany(newLocations);
    console.log("New locations created successfully")

    const newArtists = await generateArtists(num);
    await Artist.insertMany(newArtists);
    console.log("New artists created successfully")

    const newEvents = await generateEvents(num);
    await Event.insertMany(newEvents);
    console.log("New events created successfully")

    const newPurchases = await generatePurchases(num);
    await Purchase.insertMany(newPurchases);
    console.log("New purchases created successfully")

    process.exit(0);

}

setUp(5)
