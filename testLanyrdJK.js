/**
 * Created by jk on 26/01/15.
 */

//(function() {
  "use strict";

  //require("chai").should();

  //describe("Lanyrd client", function() {
    var LanyrdClient = require("./src/lanyrd-client"),
      lanyrdClient;

    //before(function() {
      lanyrdClient = new LanyrdClient();
    //});

    //describe('when fetching an event', function() {
    //  let event;
    var event;

      //before(function( done ) {
      //  this.timeout(5000);
        lanyrdClient.getEvent("2014", "lnug-november").then(function( _event ) {
          event = _event;
          done();
        })
          // this line causes an error, but stuff above works fine
          .done()
        ;
      //});

  //    it('should exist', function() {
  //      event.should.be.ok;
  //    });
  //
  //    it('should have a date', function() {
  //      event.date.should.equal("2014-11-26");
  //    });
  //
  //    it('should have a title', function() {
  //      event.title.should.equal("London Node.js User Group Meetup - November 2014");
  //    });
  //
  //    it('should have a starting time', function() {
  //      event.starting_hour.should.equal("6:30pm");
  //    });
  //
  //    it('should contain an array with all speakers', function() {
  //      event.speakers.length.should.equal(4);
  //    });
  //
  //    describe('a speaker presenting', function() {
  //      let speaker;
  //
  //      before(function() {
  //        speaker = event.speakers[0];
  //      });
  //
  //      it('should contain a link to his profile', function() {
  //        speaker.link.should.be.ok;
  //      });
  //
  //      it('should contain the name of his talk', function() {
  //        speaker.session.should.be.ok;
  //      });
  //
  //      it('should contain his name', function() {
  //        speaker.name.should.be.ok;
  //      });
  //    });
  //
  //    describe('if it is fetched again', function() {
  //      let newEvent;
  //      before(function( done ) {
  //        event.hasBeenCached = true;
  //        lanyrdClient.getEvent("2014", "lnug-november").then(function( _event ) {
  //          newEvent = _event;
  //          done();
  //        }).done();
  //      });
  //
  //      it('should have been cached', function() {
  //        newEvent.hasBeenCached.should.be.true;
  //      })
  //    });
  //  });
  //
  //});

//}());