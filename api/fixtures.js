const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/user");
const Task = require("./models/task");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.username);
    }

    const [Amanda, Steve, Mabel] = await User.create({
            username: 'Amanda',
        }, {
            username: 'Steve',
        }, {
            username: 'Mabel',
        },
    );

    await Task.create({
            user: Amanda,
            title: 'Fix car',
            status: 'new'
        }, {
            user: Steve,
            title: 'Do washing',
            status: 'new'
        }, {
            user: Mabel,
            title: 'Write assay',
            status: 'new'
        }, {
            user: Mabel,
            title: 'Repair phone',
            status: 'new'
        }
    );

    await mongoose.connection.close();
};

run().catch(e => console.error(e));