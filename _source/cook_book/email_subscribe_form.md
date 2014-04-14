---
title: "Example: Email Subscribe Form"
---

## Example: Email Subscribe Form

### Introduction

This cookbook guide is a walkthrough of how to use Trak.io's
Javascript API for an email subscription form: perhaps a blog newsletter, a blog
comment, or a beta waiting list. We want to use this opportunity to identify
this visitor so that we can understand who is using our website, and how.

The code samples are all Javascript code that can be included anywhere in your page.
We recommend placing it where you have placed other JavaScript code. We've used jQuery for this example but the same principle can be used with most popular JavaScript libraries.

### Techniques Covered In This Guide

In this guide we'll cover:

-   Getting your Trak.io API key and basic embed code

-   Using channels to label these events as 'Blog'

-   Delaying a form submit to identify a visitor using the email value from the
   form (with help from jQuery)

### Step 1: Get Your Embed Code and API Key

After logging in, click on the *My Account* dropdown menu and navigate to
*Embedding trak.io on my site*. You'll see something like this:

    <script type="text/javascript">
      var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++);trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};
      trak.io.load('YOUR_API_TOKEN');
    </script>

Be sure to replace your own API key, and embed this into your site. At this point, trak.io will start tracking all page views by visitors.

### Step 2: Defining a Custom Channel Label

Channels are similiar to using custom profiles in Google Analtyics - it allows
you to seperate out your Blog, Marketing site, App Dashboard, Emails etc.
without relying on subdomains. A channel groups together all communications and
interactions between your customers and one of your properties. If you don't
provide a channel, the JavaScript library will use the current web site's subdomain.

We want to define this channel as 'Blog' using the <a href='/javascript.html#channel'>channel</a> option.
Your code will now look something like this:

    <script type="text/javascript">
      var trak=trak||[];trak.io=trak.io||{};trak.io.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d29p64779x43zo.cloudfront.net/v1/trak.io.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){trak.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"];for(var s=0;s<i.length;s++) trak.io[i[s]]=r(i[s]);trak.io.initialize.apply(trak.io,arguments)};
      trak.io.load('YOUR_API_TOKEN', {
        channel: 'Blog'
      });
    </script>

### Step 3: Identifying Visitors on Form Submit

Let's assume we have a very barebones newsletter subscribe form like the
following:

    <form action="process.php" method="post" id="myForm" >
      <input type="email" placeholder="Enter your email address" value="" name="EMAIL" class="required email">
      <input type="submit" value="Subscribe" name="subscribe">
    </form>

We're going to use jQuery to make the javascript a little simpler. First, here's
the full code, and we'll break it down afterwards:

    <script type="text/javascript">
    $(document).ready(function(){
      // Grab a reference to our form
      form = $('#myForm');
      // Run the function when the form submits
      form.on('submit', function(e) {
        // Stop the form from submitting... for now
        e.preventDefault();
        // Get the email address the user has entered
        email = $(e.target).find('[name=EMAIL]').val();
        // Track the event and pass the email address as a property of the event
        // and define a callback function to run once the call is complete
        trak.io.track('Newsletter form submitted', { email: email }, function(){
          // Identify this visitor using their email address as a distinct ID
          // and as a new property
          trak.io.identify(email, { email: email }, function() {
            // Submit the form as normal now all trak.io calls are complete
            $(e.target).unbind('submit').trigger('submit');
          });
        });
      });
    });
    </script>

First, lets select our form and override the default behaviour on submit. Allowing the form to submit straight away may cause the browser to cancel the call to trak.io's API that we are about to make:

    <script type="text/javascript">
    $(document).ready(function(){
      form = $('#myForm');
      form.on('submit', function(e) {
        e.preventDefault();
      });
    });
    </script>

Now we track an event called 'Newsletter form submitted' and pass the email
property as some extra information with the event:

    email = $(e.target).find('[name=EMAIL]').val();
    trak.io.track('Newsletter form submitted', { email: email });

Now let's modify the <code><a href='/track.html'>trak.io.track()</a></code> method to add a callback function, this
will fire once the track call is complete. We're going to identify this visitor using the <code><a href='/identify.html'>trak.io.identify()</a></code> method,
so we know who they are rather than an anonymous guest:

    trak.io.track('Newsletter form submitted', { email: email }, function() {
      trak.io.identify(email, { email: email });
    });

The last thing we are going to do is add a callback function to the identify method. This will unbind our submit event (so we don't end up in an infinite loop) and then trigger the submit event for the form.

    trak.io.identify(email, { email: email }, function() {
      $(e.target).unbind('submit').trigger('submit');
    });

### Summary

Putting it all together:

    <script type="text/javascript">
    $(document).ready(function(){
      form = $('#myForm');
      form.on('submit', function(e) {
        e.preventDefault();
        email = $(e.target).find('[name=EMAIL]').val();
        trak.io.track('Newsletter form submitted', { email: email }, function(){
          trak.io.identify(email, { email: email }, function() {
            $(e.target).unbind('submit').trigger('submit');
          });
        });
      });
    });
    </script>

You can use this code for any newsletter signups, blog comments, lead capture
forms and basically anywhere where your visitors can quickly add their email
address!