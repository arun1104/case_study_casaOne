
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
