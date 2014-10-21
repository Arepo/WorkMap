WorkMap
====================

WorkMap is a final project developed during weeks 11 and 12 at [Makers Academy](http://www.makersacademy.com). It is a hiring service based on geographical location. The live version, complete with mock data, is online [here](http://workmap.herokuapp.com/).

The team that developed WorkMap is (in alphabetical order): [Sasha Cooper](https://github.com/Arepo), [Robin Doble](https://github.com/robindoble), [James Kemp](https://github.com/jbk1), [Federico Maffei](https://github.com/federicomaffei) and [James Whyte](https://github.com/jwhyte88).

![WORKMAP](https://dl.dropboxusercontent.com/u/9315601/workmap.png)

====================

###Project background

We developed the project to its current state (minus a couple of bugfixes) following the [Agile software development methodology](http://en.wikipedia.org/wiki/Agile_software_development) over 10 days (July 21st - August 1st 2014).

To manage our workflow we divided our time into two [Sprints](http://en.wikipedia.org/wiki/Scrum_(software_development)#Sprint), one each week. Each started with a [Sprint planning meeting](http://en.wikipedia.org/wiki/Scrum_(software_development)#Sprint_planning_meeting), in which we went through various user stories with the product owner, deciding which items from the product backlog had the highest priority, and finally estimating how much time we needed to translate them into shippable and tested features.

Our user stories were split into three categories to enable us to pair effectively. These categories are listed below:

	* Unsigned-in user stories
	* Signed-in user stories (Users looking to apply for jobs)
	* Signed-in employer stories (Users looking to advertise jobs)

###Sprint 1

During Sprint 1 our focus was on delivering a shippable version of the WorkMap website where any user, signed in or not, could view jobs on a map based on geolocation, and a signed in employer could post a job offering to the map. The features developed from this iteration, which we developed as far as possible with TDD, are:

	* Users can browse jobs on a map.
	* Users can search for jobs based on postcode or address.
	* Users can click on a marker on the map to get more info on that job opportunity.
	* Employers can post jobs on a map.
	* Employers can create accounts to manage their offers.

###Sprint 2

During Sprint 2 our focus was improving the user experience by allowing a signed in user to apply for a job, registering a profile, and setting up a payment system for the signed in employers. The features we developed in this iteration (with less testing than we'd have liked, since we were constantly spiking in Javascript) are:

	* Users can register accounts (linked with profile pictures and PDF resumes).
	* Users can apply for jobs directly through the main page.
	* Users can filter results on the map based on job category, pay, distance and whether the job is part time or full time.
	* Users can click on any job listed and be redirected on the relevant job on the map.
	* Employers can pay for job postings via Stripe (£5 per job, flat rate and considerably cheaper than competitors!)

====================

###The programming languages and technologies we used are:

  * Ruby

  * Javascript / JQuery

  * Rails framework

  * Rspec

  * Capybara

  * PhantomJS / Poltergeist

  * AJAX

  * JBuilder

  * SCSS

  * Google Maps API

  * Stripe

====================

###Video demo of the website:

[https://vimeo.com/federicomaffei/workmap](https://vimeo.com/federicomaffei/workmap)

====================

###How to run the application:

  * In the browser enter: [http://workmap.herokuapp.com/](http://workmap.herokuapp.com/)

###How to test the application (due to the lack of S3, Devise and base keys a number of tests will fail):

  * From the command line enter:
```bash
git clone git@github.com:federicomaffei/workmap.git
cd workmap
rspec
```

====================
