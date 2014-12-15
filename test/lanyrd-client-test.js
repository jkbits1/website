(function() {
    "use strict";

    require("chai").should();

    describe("Lanyrd client", function() {
        let LanyrdClient = require("../src/lanyrd-client"),
            lanyrdClient;

        before(function() {
            lanyrdClient = new LanyrdClient();
        });

        describe('when fetching an event', function() {
            let event;

            before(function( done ) {
                this.timeout(5000);
                lanyrdClient.getEvent("2014", "lnug-november").then(function( _event ) {
                    event = _event;
                    done();
                }).done();
            });

            it('should exist', function() {
                event.should.be.ok;
            });

            it('should have a date', function() {
                event.date.should.equal("2014-11-26");
            });

            it('should contain an array with all speakers', function() {
                event.speakers.length.should.equal(4);
            });

            describe('a speaker presenting', function() {
                let speaker;
                
                before(function() {
                    speaker = event.speakers[0];
                });

                it('should contain a link to his profile', function() {
                    speaker.link.should.be.ok;
                });

                it('should contain the name of his talk', function() {
                    speaker.session.should.be.ok;
                });

                it('should contain his name', function() {
                    speaker.name.should.be.ok;
                });
            });
        });

    });

}());