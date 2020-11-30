db.auth('admin', 'admin123');

db = db.getSiblingDB('replies');

db.createUser(
    {
        user: "chatbot",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "replies"
            }
        ]
    }
);