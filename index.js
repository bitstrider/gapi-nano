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
            console.error("could not create GoogleAuth object instance:", error)
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
        return data.result.response.result
    })
}

module.exports = {init,run}
