---
title: "Example: User Registration"
---

Example: User Registration
----------------------------------

### Introduction

This recipe is a walkthrough of how to use Trak.io's Javascript API for user registration workflow in a web app or website, whereby users are registering to get access to a private area, like a dashboard. The specific's might be a little different in your case, but we've pieced together different API methods so you can get a better feel for how it all works.

The code samples are all Javascript code that should be included to appear in the footer of your pages. This could mean adding your code directly to static pages or it could mean generating it with a helper, but always assume that our examples are what your rendered Javascript should look like.

### Techniques Covered in This Guide

In this guide we'll cover:

-   Getting your Trak.io API key and basic embed code

-   Using [channels](/channel.html) to seperate your marketing website from your web-app dashboard

-   Tracking a custom event called 'Registered'

-   Associating anonymous browsing behaviour of a known person using the [`trak.io.alias()`](/alias.html) method after they have registered (or logged in)

-   Saving properties about a person using [`trak.io.identify()`](/identify.html)

### Step 1: Add the Basic Code

Login to your <a href='https://dash.trak.io/sign_in' target='_blank'>trak.io dashboard</a> and then click in the top right corner on *My Account* and navigate to *embedding Trak.io on my site*.

Copy and paste the code into the source of your marketing website and your web app. Because Trak.io's JavaScript library is loaded asynchronously you can put it in your head without slowing your page down, we recommend placing it where ever you are including other JavaScript.  *Hint:* Use a server side include, you probably already have Google Analytics code installed this way.

Your code will look something like this:

    <script type="text/javascript">
      var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++) trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};
      trak.io.load("YOUR_API_TOKEN");
    </script>

At this point, Trak.io is ready to start tracking basic page views. If you push this live and then visit your site, you'll see page view events start appearing in people's activity feeds.

However, these aren't incredibly useful until combined with custom events and custom identity data.

### Step 2: Customise the Channel to Identify Your Marketing Website and Web App Differently

We're going to customise the channel so that we can distinguish between events our on marketing site and our web app. Channels are similiar in a way to custom profiles in Google Analytics. You might define your blog as one channel, your marketing website as another and your iOS app as another. If you don't provide a channel, the JavaScript library will use the current web site's subdomain.

Using Channels allows you to segment your data and track metrics on separate apps, while still allowing you to do aggregate and comparative reports across all channels if needed.

You can define a channel for all future events for the current user session (on a specific sub domain) using the [`trak.io.channel()`](/channel.html) method, or you can set the channel on the [`trak.io.load()`](/javascript.html#channel) method.

Let's customise our [`trak.io.load()`](/javascript.html) method now so we set the two different channels. Edit the code in your marketing website to add a channel called "Marketing website":

    <script type="text/javascript">
      var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++) trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};
      trak.io.load("YOUR_API_TOKEN", {
        "channel": "Marketing website"
      });
    </script>

And edit the code that appears in your web app to add a channel called "App dashboard":

    <script type="text/javascript">
      var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++) trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};
      trak.io.load('YOUR_API_TOKEN', { "channel": "App dashboard" });
    </script>

Now, all page views that are tracked between the front end marketing website, and our backend app dashboard, will be labelled with different channels. You'll see these marked on user timelines in your trak.io People dashboard using different colors. Click on the Key to see which labels/colors represent which channel.

### Step 3: Track a Custom 'Registered' Event

To get the most out of Trak.io you'll want to track much more interesting events than page views. We do this using the [`trak.io.track()`](/track.html) method.

Assuming you have a registration form that looks something like this:

    <form action='/register' method="POST">
      <label for='name'>Name</label>
      <input id='name' />
      <label for='email'>Email</label>
      <input id='email' type='email' />
      <label for='password'>Password</label>
      <input id='password' type='password' />
    </form>

If this form is submitted with AJAX, you would want to track a custom Trak.io event, and identify the user, on this same page, probably with the AJAX success callback. But let's assume your form registers the user, automatically logs them in, and redirects them to their dashboard after registration.

On your page users are sent to after a successful registration, use the [`trak.io.track()`](/track.html) method to track an event called 'Registered':

    trak.io.track("Registered");

You'll want to make sure this code is only added to the page after a successful registration (you don't want to sent a "Registered" event every time they view their homepage for example). If you are using a server side scripting language, session based "flash messages" can be a convient way to acheive this.

### Step 4: Identify The User

The Trak.io Javascript library generates a random string to use as a unique <a href='/distinct_id.html'>distinct ID</a> for each user session. But because we now know the email address of this user, since they have registered with our app, if we use that as a distinct ID it means we can identify the same user in a different browser session. We do this using the [`trak.io.identify()`](/identify.html) method.

We can also use [`trak.io.identify()`](/identify.html) to tell Trak.io things that we know about the person, lets assume we know their email address, twitter handle and full name.

Add this code into your footer only when a user first registers (on the success page is good) and each time they login. You only need to call this method when you start a user session or change their properties.

    trak.io.identify("john@johnsmith.com",{
      "email": "john@smith.com",
      "first_name": "John",
      "last_name": "Smith",
      "twitter": { "screen_name": "johnSmithy86" }
    });

This just did two things:

 * It replaced the distinct ID for the current visitor to use 'john@johnsmith.com'
 * It merged any previous anymous profile and browsing actions of this user with this known user profile (for example, if they came and browsed your marketing website this morning, but never registered or logged in)
 * It assigned some properties for the current visitor

### Summary

So to bring it all together, the registration success page in our app now has the following code (with comments to remind ourselves what's happening):

    <script type="text/javascript">
        // DON'T EDIT THIS PART
        var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++) trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};

        // CUSTOM JAVASCRIPT BELOW

        // Use your unique API Key and define a channel
        trak.io.load('YOUR_API_TOKEN', { "channel": "App Dashboard" });

        // Track a custom Registered event
        trak.io.track("Registered");

        // Alias this user to merge with any anonymous browsing behaviour
        trak.io.alias("john@johnsmith.com");

        // Save properties that we know about this user
        trak.io.identify({
          "email": "john@johnsmith.com",
          "first_name": "John",
          "last_name": "Smith",
          "twitter": { "screen_name": "johnSmithy86" }
        });
    </script>

