print('Start #################################################################');

db = db.getSiblingDB('reply');

db.createUser(
    {
        user: "chatbot",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "reply"
            }
        ]
    }
);

db.createCollection('messages');

db.messages.insert({
    intent: 'Greeting',
    message: 'Hello :) How can I help you?'
});

db.messages.insert({
    intent: 'Delivery status',
    message: 'Wait a moment while we are looking for the delivery status information about your product.'
});

db.messages.insert({
    intent: 'Refund possibility',
    message: 'For refunds please contact the support.'
});

print('END #################################################################');