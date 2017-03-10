## Summary
This is a wrapper for the <b>Google API Client Library</b>, providing opinionated syntactic sugar for client authentication and making requests to a <b>Google Apps Script</b> via the <b>REST Execution API</b>

See: https://developers.google.com/apps-script/guides/rest/quickstart/js

## Basic Usage
In your html, include the browser build `gapi-nano.js` from the `dist` directory after `https://apis.google.com/js/api.js`

```html
<script src="https://apis.google.com/js/api.js"></script>
<script src="/dist/gapi-nano.js"></script>
```

Then in another script below that, pass in some options to `gapiNano.init` to get started

```html
<script>
  var options = {
    clientId: '[CLOUD PLATFORM CLIENT_ID]',
    discoveryDocs: ["https://script.googleapis.com/$discovery/rest?version=v1"],
    scope: '[SCOPE]',
    scriptId: '[SCRIPT_ID]'
  }

  gapiNano.init(options,function(signedIn){
    console.log("User signed in?", signedIn)

    gapiNano.run('sum',{a:1,b:2}).then(function(result){
      console.log('sum of 1 and 2 is', result)
    })

  })
</script>
```

## Functions

<dl>
<dt><a href="#init">init(options, authListener)</a> ⇒ <code>undefined</code></dt>
<dd><p>init - loads and authenticates gapi client using Auth2</p>
</dd>
<dt><a href="#run">run(fName, parameters)</a> ⇒ <code>Promise</code></dt>
<dd><p>run - calls a function from the script specified by scriptId option during init()</p>
</dd>
</dl>

<a name="init"></a>

## init(options, authListener) ⇒ <code>undefined</code>
`gapiNano.init` - loads and authenticates gapi client using Auth2


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Auth2 options, including clientId and scope |
| authListener | <code>function</code> | (optional) callback with a single boolean parameter, called whenever the authentication status changes |

<a name="run"></a>

## run(fName, parameters) ⇒ <code>Promise</code>
`gapiNano.run` - calls a function from the script specified by scriptId option during init()

**Returns**: <code>Promise</code> - a Promise object resolved with result of the function call  

| Param | Type | Description |
| --- | --- | --- |
| fName | <code>string</code> | the name of the function |
| parameters | <code>object</code> | (optional) the arguments passed to the function |


## Building Changes
To rebuild `dist/gapi-nano.js` from `index.js`, use the npm task:
```
$ npm run dist
```
Of course this requires `browserify` to be installed globally:
```
$ npm install -g browserify
```
