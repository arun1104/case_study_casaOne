
# case_study_casaOne
**REST API to get reviews of a product**
Proposal:
Request Method: **GET**
Request Query Parameters:
1) productId - String
2) index- Integer - for pagination
3) count - Integer - for total number of reviews per api call.

Response format: **JSON**
 Response body:
 {
totalReviews: Number,
averageRating: Number,
individualRatings:[
rating: Number,
count: Number
}
],
reviews:[
review: String
email: String
rating: Number
]
}

## Prerequisites:
1) Nodejs Server
2) MongoDB

 ## Assumptions:
 1) The data model of reviews would be:
 [
 {
"productId":"123",
"rating":8,
"customerEmailId": "xbsbx",
"reviewText":"Excellent product."
},
 {
"productId":"123",
"rating":3,
"customerEmailId": "hshshs",
"reviewText":"Badproduct."
}
]

## Setup
npm install

## Running the Node Server
npm start

## Running tests
npm test

## API Documentation.
Refer swagger file.

## Postman Collection
Refer postman json file.

## Configurations
Refer .env file for modifying environment variables
