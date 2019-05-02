# Marlo Frontend Engineering Skills Interview

## Project Details

Please consider this document as a set of requirements, and deliver the code necessary to fulfill these requirements. If a requirement seems ambiguous, state your understanding of the requirements in a readme or inline comments along with your solution.

## Scenario

Your mission is to write a small single page app to display a QR code image with a unique link as its contents.

The app should use the [QR Code API](http://goqr.me/api/) to create the QR code.

---

## Deliverables

There is a single deliverable for this project:

1. A single page app used to display a QR code when given a UUID in the URL

## Specs

### App:

* You must use the React framework to build your SPA.
* Your SPA should have a single URL route: a UUID (i.e. localhost:3000/a26c1fc1-37e9-4f89-8ca2-01165c2367b1). 
* Your SPA should then use the [QR Code API](http://goqr.me/api/) to encode the UUID as part of a unique link. The link should be of the format:

```bash
https://interviews.getmarlo.com/?id=uuid-from-url
```

* Your SPA should then return the QR code image to the user.
* The QR code image should be centered in the page, with a styled div behind making the QR code appear raised.
* The QR code should redirect to the formatted unique link when clicked.
* Feel free to have fun with the rest of the design.

## How we'll review your code:

We did this project ourselves so we should have a good time comparing versions. Once complete, we'll be reviewing your code for:

* **Completeness** - Did you complete an implementation that meets the spec?
* **Correctness** - Does your solution perform the correct functionality? (i.e., Does it work when we run it?)
* **Clarity** - Can we understand your code and the decisions you made in the implementation?
* **Code Quality** - Is your code well structured and clean? Does it use common idioms?

## Project length:

Please do not spend more than four hours on the project. Code quality and completeness will both be considered. Be sure to commit your code regularly as you work through your solution. This is helpful for us to understand how you work.

## Once finished

* To deliver your project, simply commit your final work and push to the `project` branch of the private Github repo provided by Marlo. 

* Open a pull request to merge your `project` branch to `master`.

  * Make sure to add a description to your pull request with any details you want to provide.

  * At the very least, It is useful to provide a description of how to run your project.