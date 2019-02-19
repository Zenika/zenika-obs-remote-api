const assert = require('chai').assert;
const sinon = require('sinon');

const OBSWebSocket = require('obs-websocket-js');
const remote = require('../obs/obs_remote');

const obs = new OBSWebSocket();

/*before( function () {
    remote.openConnection(obs);
});*/

describe('Testing obs remote when everything is ok', function() {

    it('Verify that OBS started recording', function() {
        const obsMock = sinon.mock(obs);
        obsMock.expects("send").once().withArgs('StartRecording')
            .returns(
                new Promise(function(resolve, reject){
                    resolve({
                        status: "ok"
                    });
                }));

        remote.startRecording(obs)
            .then(result => {
                console.log("Test gone well");
                console.log(result);
            })
            .catch(err => {
                console.log("Error while testing obs_remote.startRecording");
                console.log(err);
            });

        obsMock.verify();
        //assert.isTrue(remote.startRecording(), "OBS started recording");
    });

    it('Verify that OBS stopped recording', function() {
        const obsMock = sinon.mock(obs);
        obsMock.expects("send").once().withArgs('StopRecording')
            .returns(
                new Promise(function(resolve, reject){
                    resolve({
                        status: "ok"
                    });
                }));

        remote.stopRecording(obs)
            .then(result => {
                console.log("Test gone well");
                console.log(result);
            })
            .catch(err => {
                console.log("Error while testing obs_remote.stopRecording");
                console.log(err);
            });


        obsMock.verify();
    });
});

describe('Testing obs remote when nothing is ok', function() {

    it('Verify that error is handled when starting recording fails', function() {
        const obsMock = sinon.mock(obs);
        obsMock.expects("send").once().withArgs('StartRecording')
            .returns(
                new Promise(function(resolve, reject){
                    reject({
                        error: "This is an error, couldn't start recording for some reason"
                    });
                }));

        remote.startRecording(obs)
            .then(result => {
                console.log("Error while testing obs_remote.startRecording");
                console.log(result);
            })
            .catch(err => {
                console.log("Test gone well");
                console.log(err);
            });


        obsMock.verify();
    });

    /*it('Verify that error is handled when starting recording is actioned more than once', function() {
        const obsMock = sinon.mock(obs);
        obsMock.expects("send").atLeast(2).withArgs('StartRecording')
            .returns(
                new Promise(function(resolve, reject){
                    reject({
                        error: "recording already active"
                    });
                }));

        remote.startRecording(obs);

        obsMock.verify();
        //assert.isTrue(remote.startRecording(), "OBS started recording");
    });*/

    it('Verify that error is handled when stoping recording fails', function() {
        const obsMock = sinon.mock(obs);
        obsMock.expects("send").once().withArgs('StopRecording')
            .returns(
                new Promise(function(resolve, reject){
                    reject({
                        error: "This is an error, couldn't stop recording for some reason"
                    });
                }));

        remote.stopRecording(obs)
            .then(result => {
                console.log("Error while testing obs_remote.stopRecording");
                console.log(result);
            })
            .catch(err => {
                console.log("Test gone well");
                console.log(err);
            });

        obsMock.verify();
    });
});

/*after( function () {
    remote.closeConnection(obs);
});*/