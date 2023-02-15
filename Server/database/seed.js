const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users');
const PostModel = require('../models/Posts');
const PostCommentModel = require('../models/PostComment');
const FriendModel = require('../models/Friends');

const mongoose = require('mongoose');
const _ = require('lodash');

const {
    MONGO_URI,
    MONGO_DB_NAME,
    PORT,
    MONGO_USER,
    MONGO_PASS,
} = require('../constants/constants');

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedUsers() {
    console.log('seeding users...');
    const users = [];
    for (let i = 0; i < 1000; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const phonenumber = faker.phone.number('09########');
        const username = faker.internet.userName(firstName, lastName);
        const password = 'password';
        const salt = await bcrypt.genSalt(10);
        const confirmationEmail = faker.internet.email();
        const hashedPassword = await bcrypt.hash(password, salt);
        const birthday = faker.date.birthdate();
        const address = faker.address.streetAddress();
        const city = faker.address.city();
        const country = faker.address.country();
        const isActivated = true;

        users.push({
            phonenumber,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            birthday,
            address,
            city,
            country,
            confirmationEmail,
            isActivated,
        });
    }

    await UserModel.insertMany(users);
    console.log(`inserted ${users.length} records to collection users`);
}

async function seedFriends() {
    console.log('seeding friends...');
    const users = await UserModel.find();
    const friends = [];

    for (let i = 0; i < 200; i++) {
        const sender = _.sample(users)._id;
        const receiver = _.sample(users)._id;
        const status = '0';
        if (sender === receiver) continue;
        friends.push({
            sender,
            receiver,
            status,
        });
    }

    await FriendModel.insertMany(friends);
    console.log(`inserted ${friends.length} records to collection friends`);
}

async function seedPosts() {
    console.log('seeding posts...');
    const users = await UserModel.find();
    const posts = [];
    for (let i = 0; i < 100; i++) {
        const author = _.sample(users)._id;
        const described = faker.lorem.paragraph();
        const likeCounts = randomIntFromInterval(1, 50);
        const like = _.sampleSize(users, likeCounts);

        posts.push({
            author,
            described,
            like,
        });
    }

    await PostModel.insertMany(posts);
    console.log(`inserted ${posts.length} records to collection posts`);
}

async function seedComments() {
    console.log('seeding comments...');
    const users = await UserModel.find();
    const posts = await PostModel.find();
    const comments = [];

    for (let i = 0; i < 100; i++) {
        const user = _.sample(users)._id;
        const post = _.sample(posts)._id;
        const content = faker.lorem.paragraph();
        comments.push({
            user,
            post,
            content,
        });
    }

    await PostCommentModel.insertMany(comments);
    console.log(
        `inserted ${comments.length} records to collection post comments`
    );
}

async function seed() {
    mongoose
        .connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            user: MONGO_USER,
            pass: MONGO_PASS,
            dbName: MONGO_DB_NAME,
            useFindAndModify: false,
        })
        .then(async (mongoose) => {
            console.log('connected to database! seeding database...');
            // await mongoose.connection.db.dropDatabase();
            await seedUsers();
            await seedFriends();
            await seedPosts();
            await seedComments();
            mongoose.connection.close();
        });
}

seed();
