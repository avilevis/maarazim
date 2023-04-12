const dbLocal = require("db-local");
const {Schema} = new dbLocal({path: "./databases"});

export const items = Schema("itemsCollection", {
    id: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    sub_title: {
        type: String
    },
    image: {
        type: String,
    },
    info: {
        type: String
    },
    enable: {
        type: Boolean,
        default: true
    }
});
