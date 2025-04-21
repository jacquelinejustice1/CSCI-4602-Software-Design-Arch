"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var manager_1 = require("./manager");
var app = express();
var manager = new manager_1.GatheringManager();
app.use(express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//let events = { };
app.get('/', function (req, res) { res.render('pages/index'); });
/*
This page should not change the manager object, but should pull the slugs in use by the
manager.
This page expects a dictionary with exactly one key named “slugs” which points the list
of slugs (an array of strings). My code builds “slugs” using the “events” variable
*/
app.get('/admin', function (req, res) {
    // Get just the slugs from gathering.
    var slugs = [];
    for (var _i = 0, _a = manager.gatherings.all_slugs; _i < _a.length; _i++) {
        var slug = _a[_i];
        slugs.push(slug);
    }
    res.render('pages/admin', { slugs: slugs });
});
/*
This page should not change the manager object, but should pull the emails of anyone
attending an event identified by the slug.

This page expects a dictionary with two keys. The first key is “slug” which points to a
single slug string. The second key is “emails” which points to a list of email addresses
(an array of strings).
*/
app.get('/getStats', function (req, res) {
    var slug = req.query.slug;
    // Get just the emails from events[slug].guest_list.
    var emails = [];
    for (var _i = 0, _a = manager.gatherings.get_guests(slug); _i < _a.length; _i++) {
        var email = _a[_i];
        emails.push(email);
    }
    res.render('pages/getStats', { slug: slug, emails: emails });
});
/*
You should take this data and add it to the manager object.

Hint: I called “addPerson” with some dummy data, then I called
“addPersonToGathering” to make this work.

This page expects a dictionary of three objects. All three values are pulled from the
HTTP POST request.
    − Key “slug”: a string for the slug
    − Key “name”: a string for the name of an attendee
    − Key “email”: a string for the email of the attendee

*/
app.post("/submitAttendance", function (req, res) {
    var slug = req.body.slug;
    var name = req.body.name;
    var email = req.body.email;
    manager.addPerson(name, email);
    manager.addPersonToGathering(email, slug);
    res.render('pages/submitAttendance', { slug: req.body.slug, email: req.body.email, name: req.body.name });
});
/*
This page does not change or utilize the manager object, thus it can be skipped.
This page expects a dictionary of one key: the desired slug (a string)
*/
app.get('/register', function (req, res) {
    res.render('pages/register', { slug: req.query.slug });
});
/*
This page does not change or utilize the manager object, thus it can be skipped.
This page expects a dictionary of one key: the desired slug (a string).
*/
app.get('/showEvent', function (req, res) {
    res.render('pages/showEvent', { slug: req.query.slug });
});
/*
This page should add a new gathering to the manager object.

This page expects a dictionary with a single key named “event”. The “event” entry
points to another dictionary that contains two keys: a key named “slug” (containing
the slug) and a key named “name” (containing the name of the event).(In hindsight, I
could have made this last bit easier.)

update the /makeEvent page so that it uses HTTP posts and expects four items (name, time, host, and
slug).
*/
app.post('/makeEvent', function (req, res) {
    var name = req.body.name.trim();
    var time = req.body.time.trim();
    var host = req.body.host.trim();
    var slug = req.body.slug.trim();
    manager.addGathering(name, time, host, slug);
    res.render('pages/makeEvent', { event: req.body });
});
app.listen(8080);
console.log('Server is listening on port 8080');
