# Dashboard
#### By Navaneet (Nav) Ramabadran



Dashboard is a web application that assists users by consolidating basic tools in one clean, user-friendly page. The current major widgets come in two flavors, personal identity protection/security and a simplified WolframAlpha analogue. More features are just around the corner!

### Technologies

React.js, Redux.js, Node.js, Robohash API, Metaweather API, Newton Microservice API, HaveIBeenPwned API, Unsplash Image API

### Features

HaveIBeenPwned API integration enables users to stay on top of their cyberidentity by searching for instances of vulnerability by email account or website domain. The Calculus and Trigonometry widget beautify math expressions returned by the Newton API.

Dashboard gives its user the ability to add a personal touch to their dashboard. Dashboard generates a new Robot Avatar for each user when they enter a new name. In the same vein, each visit to the Dashboard site loads a new professional-quality background image from the Unsplash Image API.

Features for imminent implementation include weather forecasts by location and setting a default user location by visitor geolocation data. Weather forecasting employs calls to the Metaweather API from the backend.

### Design Decisions

#### API Integration

The use of APIs for application data enables the use of a simple, lightweight Node backend. Some data comes from API calls in the frontend API Utils where a given API's Cross-Origin Resource Sharing (CORS) settings permit while others must be called from the backend. This created some interesting challenges that shall be discussed in greater detail later. However, none of the APIs required authorization tokens of any kind and no API enforced notable rate limits for calls from an IP Address.

Both, the Robohash and the Unsplash Image APIs support direct API URL embedding in <IMG> tags, making integration exceptionally simple. The Newton API for arithmetic evaluations expressly supports CORS. This allowed all Newton API calls to occur in the frontend API Utils.
  
Conversely, the Metaweather API expressly forbids CORS necessitating route in the Node backend. Frontend API Utils for weather/location data, in turn, access API data through these backend routes. 

Now, the HaveIBeenPwned API documentation unequivocally expresses the lack of authorization, API rate limits or blocking of CORS application accessability for ALL endpoints.

This is not true. As of January 27th, the breached account endpoint no longer supports CORS and requires API requests to include a User-Agent header. This does not apply for other endpoints such as the Domain endpoint which remains fully CORS-enabled. 

This, however, did require a re-think after initial API tests indicated a mismatch between error status codes the API returned with the response data and documentation on the endpoint.

#### UI/UX Choices

The Momentum browser extension for Chrome was a strong inspiration. Dashboard's clean interface and scenic imagery makes it a natural choice for browser homepage. However, it contains tools more powerful than Momentum. By retaining a single information box that toggles for various widgets/tools, Dashboard remains approachable to the user while lending itself to addition of more powerful tools over time.

### Future Plans

Weather implementation is a large feature to be rolled out soon. Everything necessary for its implementation apart from the React Component already exists in the Dashboard codebase. Users will be able to get weather by location. Users could enter a the partial or full name of a city/destination and choose from a list of location query matches. Alternatively, users that enable the application's access of their geolocation can rely on the application to do all the work. Geolocation data will automatically grab and find relevant weather forecasts. Finally, a weather peak component will exist in the top right corner to indicate today's prevailing weather.

A few User Interface tweaks would rely improve the overall flow, allowing user's to seemlessly flow forward and backward between widgets, menus and results. Finally, User Authentication with a proper database would allow repeat users save and persist their customizations and choices. They could even save prior work, API usage and results.
