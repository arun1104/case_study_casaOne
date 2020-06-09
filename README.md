# case_study_casaOne

 <br/>**REST API to get reviews of a product**<br/>
 <br/>**Request Method: GET**<br/>
 <br/>**Request Query Parameters:**
 <br/> 1) pagination - Integer <br/>2) product id - String<br/>
 <br/>**Response format: JSON**<br/>
 <br/>**Response body:**<br/>
 {<br/>
totalReviews: BigInteger,<br/>
averageRating: Decimal,<br/>
individualRatings:[<br/>{<br/>
rating: Integer,<br/>
count: BigInteger<br/>
}<br/>],<br/>
}
