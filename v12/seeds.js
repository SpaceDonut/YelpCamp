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
        name: "It's cold out here",
        image: "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2017/08/GJOverlandChairBryonDorr-2.jpg",
        description: "Love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater). Lick left leg for ninety minutes, still dirty i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk. Murr i hate humans they are so annoying fart in owners food cat ass trophy attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently kitty run to human with blood on mouth from frenzied attack on poor innocent mouse,"
    }
];

const seedDB = async () => {
    try {
        await Comment.deleteMany({});
        await Campground.deleteMany({});

    //     for (const seed of seeds) {
    //         let campground = await Campground.create(seed);
    //         let comment = await Comment.create({
    //             text: "This place is great, but me needs ma intranetz",
    //             author: "Homerino"
    //         });
    //         campground.comments.push(comment);
    //         campground.save();
    //     }
    } catch (err) {
        console.log(err);
    }
}

module.exports = seedDB;