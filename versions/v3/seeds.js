const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [{
        name: "Stardust Crusade",
        image: "https://campkartepe.com/wp-content/uploads/2016/05/summer_camp_for_adults.jpg",
        description: "Heaven's Door (ヘブンズ・ドアー（天国への扉） Hebunzu Doā) is the Stand of Rohan Kishibe, featured in Diamond is Unbreakable, and in the Thus Spoke Kishibe Rohan One-Shot series featuring Rohan. It is a small human-like Stand that turns people into books for Rohan to read. "
    },
    {
        name: "Water haven",
        image: "https://campkartepe.com/wp-content/uploads/2016/05/Camping-Shop-for-Family-Camping-Tents.jpeg",
        description: "Heaven's Door (ヘブンズ・ドアー（天国への扉） Hebunzu Doā) is the Stand of Rohan Kishibe, featured in Diamond is Unbreakable, and in the Thus Spoke Kishibe Rohan One-Shot series featuring Rohan. It is a small human-like Stand that turns people into books for Rohan to read. "
    },
    {
        name: "It's fucken cold",
        image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2017/08/GJOverlandChairBryonDorr-2.jpg",
        description: "blah blah blag blah blah blah "
    }
];

const seedDB = async () => {
    try {
        await Comment.deleteMany({});
        await Campground.deleteMany({});

        for (const seed of seeds) {
            let campground = await Campground.create(seed);
            let comment = await Comment.create({
                text: "This place is great, but me needs ma intranetz",
                author: "Homerino"
            });
            campground.comments.push(comment);
            campground.save();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;