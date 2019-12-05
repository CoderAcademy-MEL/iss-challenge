# API

![image](https://user-images.githubusercontent.com/34294344/59174962-e1227d80-8b96-11e9-9733-adeb90dfc31d.png)


```
"APIs are how we are going to build software in the future, we are just going to glue it together"
```

The term API is one of those technical words that most people think they understand, but have a tough time explaining. 

I'm going to give you a short primer on:
 1. What an API is
 2. Why you need to know it
 3. What you need to build one yourself

## Application Programming Interface

![api](https://cdn-images-1.medium.com/max/2400/1*OcmVkcsM5BWRHrg8GC17iw.png)

At the simplest level, APIs is an interface to allow applications to communicate with each other. 

To go one step further, an API also allows others to share data in a _standardized and documented way_.

An API is **NOT**:
 * A server
 * A database

We can think of an API as an _access point_ to a database.

### Types of APIs

#### Public APIs

Example: 
* [Facebook](https://developers.facebook.com/docs/graph-api)
* [Twitter](https://developer.twitter.com/en/docs)
* [Youtube](https://developers.google.com/youtube/v3/)

**Interesting Note**: `The Facebook - Cambridge Analytica scandal was an example of how a public API could be abused`


#### Private APIs

A good example might be information shared between a company and its customers / partners. 

For example, Spotify allows its partners access to its API so that BMW, Ford, Tesla vehicles can natively use Spotify in the built in dashboard systems.


#### The API Revolution

[Amazon Alexa](https://www.youtube.com/watch?v=YvT_gqs5ETk)

We can log into Uber by using our Google or Facebook login credentials. 

APIs allow Uber to request verification of your identity from Facebook. APIs on the Facebook side then confirm to Uber that the person who is signing in is who they say they are.


## Summary

Alright, hopefully you sort of understand. Seems kind of like a black box, where you request information, and then magically you get a response back. 

You don't need to know how that information is obtained, or the code it went through to get it. This is how many developers view APIs -- as a black box.

**_An analogy for those that are still figuring it out:_**
```
Imagine if the electrical sockets in each house on the block were different. Or imagine if the socket configuration changed everytime the power company updated their facilities. 
```

This would make it extremely _unpredictable_ and very difficult to build something that could _reliably_ and _consistently_ use power. 

By **standardizing** and **documenting** an interface, developers of appliances (TVs, fridges, washer/dryer, etc) can obtain electrical power from _any_ socket. 

# Working with APIs

![iss](https://wallpapercave.com/wp/DWdlNlL.jpg)

## Sweet & Simple
We can use the `fetch()` function and a URL to get data.

In this case, we are going to build a small appplication that is going to map the location in degrees of longitude and latitude of the International Space Station.

When we make a request to the ISS API, we will get back data in a `JSON` (**J**ava**S**cript **O**bject **N**otation) format. 

The fact that it returns a JSON format means that we can access this from many types of applications. Ones that are written in Java, Ruby, Python, JS, PHP, etc. This makes an API both _scalable_ and _platform independent_. 

## Where The ISS At?

Using the ["Where the ISS at"](https://wheretheiss.at/w/developer) REST API, we can get the current, past, or future position of the ISS. 

First thing we should always do is look at the API documentation.

We observe the following:
* No authentication required
* There are rate limits - 1 per second
  * You can track your usage using the `X-Rate-Limit` header
* All responses will return a JSON format
  * Successful responses will have a 2XX response code
  * Errors will have response codes other than 2XX

Second thing, what are the endpoints? 

> Side note: _an endpoint is another term for a URL or the `end` of a communication channel. Some people also think of an endpoint as the end of the URL_

Example Endpoint: `https://api.wheretheiss.at/v1/satellites`

Example Response:

```js
[
    {
    "name": "iss",
    "id": 25544
    }
]
```

Example Endpoint: `https://api.wheretheiss.at/v1/satellites/25544`

Example Response:

```js
{
    "name": "iss",
    "id": 25544,
    "latitude": 50.11496269845,
    "longitude": 118.07900427317,
    "altitude": 408.05526028199,
    "velocity": 27635.971970874,
    "visibility": "daylight",
    "footprint": 4446.1877699772,
    "timestamp": 1364069476,
    "daynum": 2456375.3411574,
    "solar_lat": 1.3327003598631,
    "solar_lon": 238.78610691196,
    "units": "kilometers"
}
```

## Client Side Programming Challenge


![image](https://user-images.githubusercontent.com/34294344/59183467-6a45ae80-8baf-11e9-8a8e-3f26728c52e1.png)

To Do:
1. Write an Asynchronous function to get ISS position data
2. Write some JS to insert lat, long into HTML page
3. Plot the lat and long on a map using [`Leaflet.js`](https://leafletjs.com/index.html)
    * Include Leaflet CSS in head section of HTML
    * Include Leaflet JS script file
   * Put a `div` element with a certain id where you want the map to be:
    ```html
    <div id="mapid"></div>
    ```
    Make sure the map container has a defined height in the CSS.
    ```css
      #mapid { height: 180px; }
    ```
4. Create a map object
  * Initialize map using the following:
    ```js
      const map = L.map('mapid').setView([0, 0], 1);
      // setView(lat, long, and zoom level)
    ```
  * If we look at our HTML page, we notice there is nothing shown but a grey box. We need to find some tiles. (We are going to use OpenStreetMaps)
      * Define a variable called `attribution` and assign the following: 
        ```js
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        ```
      * Define a variable called `tileURL` and assign the following:
        ```js
          const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        ```
      * Define a variable called `tiles` and assign the following: `L.tileLayer(tileUrl, { attribution });`
        * Add tiles by writing `tiles.addTo(map)`
        ```js
          const tiles = L.tileLayer(tileURL, {attribution})
          tiles.addTo(map)
        ```
5. Create a marker 
  ```js
    const marker = L.marker([0, 0]).addTo(map);
  ```
6. Update the marker everytime the position changes (or on refresh):
 
7. Change the marker to an ISS icon
  ```js
    // From docs

    let myIcon = L.icon({
        iconUrl: 'my-icon.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

  ```
8. Use `setInterval()` to automatically refresh every 2000 ms