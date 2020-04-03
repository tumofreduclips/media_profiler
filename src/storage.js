const uuidKey = "pb_user_uuid";

const storage = {
    save_uuid : async (uuid) => {
        window.localStorage.setItem(uuidKey, uuid);
    },

    get_uuid : async () => {
        return  window.localStorage.getItem(uuidKey);
    },

    clear_all : async () => {
        window.localStorage.clear();
    }
};
