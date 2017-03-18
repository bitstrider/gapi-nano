(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gapiNano = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use-strict'

/**
 * init - loads and authenticates gapi client using Auth2
 *
 * @param  {object} options      Auth2 options, including clientId and scope
 * @param  {function} authListener (optional) callback with a single boolean parameter, called whenever the authentication status changes
 * @return {undefined}
 */
function init(options, authListener) {

    this.options = JSON.parse(JSON.stringify(options)); //clone options, since gapi.client.init() will sanitize the object

    gapi.load('client:auth2', () => {

        gapi.client.init(options).then(() => {
            let authInstance = gapi.auth2.getAuthInstance();

            if (authListener) {
                // Bind listener to auth event
                authInstance.isSignedIn.listen(authListener);

                // Handle the initial sign-in state.
                authListener(authInstance.isSignedIn.get());
            }
        }, (err) => {
            console.error("could not create GoogleAuth object instance:", err)
        })

    })
}

/**
 * run - calls a function from the script specified by scriptId option during init()
 *
 * @param  {string} fName      the name of the function
 * @param  {object} parameters (optional) the arguments passed to the function
 * @return {Promise}            a Promise object resolved with result of the function call
 */
function run(fName, parameters) {

    return gapi.client.script.scripts.run({
        scriptId: this.options.scriptId,
        resource: {
            'function': fName,
            parameters
        }
    }).then((data) => {
        if(data.error) {
          console.error("script execution error:", data.error)
          return data.error
        }
        return data.result.response.result
    }, function (err) {
        console.error("failed to request script execution:", err)
    })
}

module.exports = {init,run}

},{}]},{},[1])(1)
});