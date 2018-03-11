#react-express-server
This project uses express server to return json object from an api. This api is called from React layer and publishes the data in react-bootstrap table. Sorting occurs on button click based on value returned for each object in json. By default, sorting is done based on ascending order.

##Instructions

``npm install``  
``npm run dev``  

Open your browser and navigate to <http://localhost:8080>

To run test cases, use ``npm test``

##Application-features

1. Json object is returned from an API
2. API is built using express server
3. Communication between REACT and express server
4. Sorting on button click based on value returned by each json object
5. By default, sorting is done based on ascending order when react component is mounted