# Dashboard
#### Creator: [Navaneet (Nav) Ramabadran](https://www.navaneet.me)

Dashboard is a web application, suitable as a default homepage, that assists users by consolidating basic tools into one clean, user-friendly page. The current app's major widgets come in two flavors, personal identity protection/security and a simplified WolframAlpha analogue. More features are just around the corner!

[Demo Dashboard Now!](https://nav-dashboard.herokuapp.com/#/)

### Technologies

React.js, Redux.js, Express.js, Node.js, Robohash API, Metaweather API, Newton Microservice API, HaveIBeenPwned API, Unsplash Image API

### Features

HaveIBeenPwned API integration enables users to stay on top of their cyberidentity by searching for instances of vulnerability by email account or website domain (ex. Adobe). The Calculus and Trigonometry widget beautify math expressions returned by the Newton API.

Dashboard gives its user the ability to add a personal touch to their dashboard. Dashboard generates a new Robot Avatar for each user when they enter a new name. In the same vein, each visit to the Dashboard site loads a new professional-quality background image from the Unsplash Image API.

Features for imminent implementation include weather forecasts by location and setting a default user location by visitor geolocation data. Weather forecasting employs calls to the Metaweather API from the backend.

### Design Decisions

#### API Integration

The use of APIs for application data enables the use of a simple, lightweight Node backend. Some data comes from API calls in the frontend API Utils where a given API's Cross-Origin Resource Sharing (CORS) settings permit while others must be called from the backend. This created some interesting challenges that shall be discussed in greater detail later. However, none of the APIs required authorization tokens of any kind and no notable API-enforced rate limits for calls from an IP Address.

Both, the Robohash and the Unsplash Image APIs support direct API URL embedding in <IMG> tags, making integration exceptionally simple. The Newton API for arithmetic evaluations expressly supports CORS. This allowed all Newton API calls to occur in the frontend API Utils.
  
Conversely, the Metaweather API expressly forbids CORS necessitating route in the Node backend. Frontend API Utils for weather/location data, in turn, access API data through these backend routes. 

Now, the HaveIBeenPwned API documentation unequivocally expresses the lack of authorization, API rate limits or blocking of CORS application accessability across ALL endpoints.

This is not true. As of January 27th, the breached account endpoint no longer supports CORS and requires API requests to each include a User-Agent header. This does not apply for other endpoints such as the Domain endpoint which remains fully CORS-enabled. 

This, however, did require a re-think after initial API tests indicated a mismatch between error status codes the API returned with the response data and documentation on the endpoint.

#### UI/UX Choices

The Momentum browser extension for Chrome was a strong inspiration. Dashboard's clean interface and scenic imagery makes it a natural choice for browser homepage. However, it contains tools more powerful than Momentum. By retaining a single information box that toggles for various widgets/tools, Dashboard remains approachable to the user while lending itself to addition of more powerful tools over time.

### Future Plans

Weather implementation is a large feature to be rolled out soon. Everything necessary for its implementation apart from the React Component already exists in the Dashboard codebase. Users will be able to get weather by location. Users could enter a the partial or full name of a city/destination and choose from a list of location query matches. Alternatively, users that enable the application's access of their geolocation can rely on the application to do all the work. Geolocation data will automatically grab and find relevant weather forecasts. Finally, a weather peak component will exist in the top right corner to indicate today's prevailing weather.

Currently error handling is not explicitly performed. Future work would change backend routes to send JSON errors and frontend reducers to correctly handle errors across all actions. From there, errors can be displayed appropriately in the component.

A few User Interface tweaks would rely improve the overall flow, allowing user's to seemlessly flow forward and backward between widgets, menus and results. Finally, User Authentication with a proper database would allow repeat users save and persist their customizations and choices. They could even save prior work, API usage and results.

Other neat features would be a digital clock, notepad in the info box and inspirational quotes.

### Code Snippets

#### HaveIBeenPwned {breachedaccount} API Endpoint & Backend Route w/ User-Agent Headers

[Documentation for this endpoint](https://haveibeenpwned.com/API/v2#BreachesForAccount) indicate [CORS access](https://haveibeenpwned.com/API/v2#CORS) for API calls from the browser/frontend. Furthermore, the [test example](https://haveibeenpwned.com/api/v2/breachedaccount/test@example.com?domain=adobe.com) is broken.

```
  router.get('/:email', (req, res) => {
    let options = {
        headers: {
            "User-Agent": "dashboard",
            "Accept": "vnd.haveibeenpwned.v2+json"
        },
        url: `https://haveibeenpwned.com/api/breachedaccount/${req.params.email}`
    };
    request(
      options,
      (error, response, body) => {
        // console.log(body);
        if (response && response.statusCode == 200) {
          res.json({ msg: JSON.parse(body) });
        } else {
          // Print the error if one occurred
          console.log("error:", error);
          // Print the response status code if a response was received
          console.log("statusCode:", response && response.statusCode);
        }
      }
    );
});
```

#### List of Buttons to Select the type of Arithmetic Operation

The Newton API requires an operation and an mathematical expression. However, it can handle both Calculus and Trigonometric operations through the same interface. This can create issues if performing a Trigonometric operation on an expression with variables (ex. tan(x)). Newton does allow for the use of 'pi' to express π for all operations.

For that reason, Calculus operations are always available while Trigonometric operations are only available when no letter characters (apart from 'p' and 'i') are present in the math expression query.

```
  mathOperations() {
    let trig_ops = [];
    const { query } = this.state;

    // onClick fn to set the selected math operation and inputted expression
    const setMath = (option) =>
      this.setState({ operation: option.toLowerCase(), math: query });
    
    // buttons for Calculus operations 
    let alg_ops = Object.keys(ALG_OPS).map((option, idx) => (
      <button 
        key={idx} 
        onClick={() => setMath(option)} 
        className="option">
        {ALG_OPS[option]}
      </button>
    ));

    // buttons for Trigonometric operations do not appear for variables (x, y, z)
    // p and i are excluded so the user may input pi for π
    if (!query.match(/[a-h]|[j-o]|[q-z]/i)) {
      trig_ops = Object.keys(TRIG_OPS).map((option, idx) => (
        <button
          key={alg_ops.length + idx}
          onClick={() => setMath(option)}
          className="option"
        >
          {TRIG_OPS[option]}
        </button>
      ));
    }
    return alg_ops.concat(trig_ops);
  }
```

#### Beautifying Math Expressions

This function in the arithmetic component beautifies math expression by moving items following a "^" into the superscript. The current code does not however beautify expressions with regard to parantheses.

Neither does the current application check for valid parantheses when submitting an expression to the Newton API and remains an addition for a later time. The most common and efficient iteration of checking valid parantheses employs a simple stack data structure.

```
  beautifyMath(expression) {
    // boolean for when a value should be in superscript
    let superScript = false; 

    // an array of mapped react objects for prettified math expressions
    const prettyExpression = [...expression].map((ch, idx) => {
      if (ch === "^") superScript = true;
      if (" -+*/".includes(ch)) superScript = false;

      if (!!ch.match(/[a-z]/i)) {
        // variables and letters are italicized
        return superScript ? (
          <sup>
            <i key={idx}>{ch}</i>
          </sup>
        ) : (
          <i key={idx}>{ch}</i>
        );
      } else if (ch !== "^") {
        // all characters/numbers undergo the check for superscript
        return superScript ? (
          <sup key={idx}>{ch}</sup>
        ) : (
          <span key={idx}>{ch}</span>
        );
      }

      return <span key={idx}></span>
    });
    return prettyExpression;
  }
```

#### HaveIBeenPwned Domain API-Valid Inputs

The Domain API Endpoint does not provide for '.com' or 'www.' and instead requires the lone domain (ex. 'Adobe'). Hence, queries are sliced by "." and returns the string before the last period.

```
  case "DOMAIN":
    if (query.includes(".")) {
        query = query.split(".").slice(-2, -1);
    }
    this.props.fetchDomain(query);
    break;
```
