// william wall
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash');
chai.use(require('chai-things'));

const ReviewSchema = new Schema({
    title: String,
    description: String
});

const Review = mongoose.model("Review", ReviewSchema);

describe('Reviews', function () {
    before(function (done) {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
        });
        var testReview = new Review({
            title: "Honda Civic 2003",
            description: "Fast car, very nice!"
        });
        testReview.save(done);
    });

    let someReview;
    beforeEach((done) => {
        someReview = new Review({title: 'Review title 1', description: "Review description 1"});
        someReview.save()
            .then(() => done());
    });

    describe('GET /reviews', () => {
        it('should return all of the reviews objects', function () {

        });
    });
    describe('POST /reviews', function () {
        describe('Adding Reviews', function () {
            it('should save a review to database', function (done) {
                let aReview = new Review({title: 'Citroen', description: 'Great motor'});
                aReview.save()
                    .then(() => {
                        assert(!aReview.isNew);
                        done();
                    })
            });
        });
    });
    describe('PUT /reviews/:id/', () => {
        it('', function () {

        });
        it('', function () {

        });
    });

    describe('DELETE /reviews/:id', () => {
        let aReview = new Review({title: 'Review title delete-test', description: 'Great motor'});
        aReview.save()
        describe('Deleting Reviews', function () {
            it('should remove instance of the model review', function (done) {
                aReview.remove()
                    .then(() => Review.findOne({title: 'Review title delete-test'}))
                    .then((review) => {
                        assert(review === null);
                        done();
                    });
            });
            it('should find review by its title and remove', (done) => {
                Review.findOneAndRemove({title: 'Citroen' })
                    .then(() => Review.findOne({title: 'Citroen' }))
                    .then((review) => {
                        assert(review === null);
                        done();
                    });
            });

        });
    });
    describe('', function () {
        it('', function () {

        });
    });
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });
});