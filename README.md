# detect-arguments
Detect javascript argument usage using proxies and es6 notation


<br>
<br>


npm install --save-dev detect-arguments


Example:
````
const detect = require('detect-arguments'),
resolve = (v) => {
  console.error(v);
},
reject = (v) => {
  console.error(v);
},
detector = detect({resolve,reject}); //create a detector using the arguments that we want to monitor.

//user defined function that will detect resolve and reject
function user_defined ({resolve,reject}) {
}

//detector.any will return false because the resolve and reject names have not been accessed yet
if (!detector.any()) {
  console.error('nothing detected yet');
}

//invoke the user_defined function with the detector
user_defined(detector);


//detector.any returns true because at least one of the arguments were accessed
if (detector.any()) {
  console.error('an argument was used!');
}

//detector.any returns true because resolve was accessed
if (detector.any({resolve})) {
  console.error('resolve was used!');
}

//detector.any also accepts an array of names
if (detector.any(['resolve'])) {
  console.error('I already told you! resolve was used');
}

//detector.all returns true because all arguments were accessed
if (detector.all()) {
  console.error('all arguments were used!');
}

//detector.all returns true because both resolve and reject were accessed
if (detector.all({resolve,reject})) {
  console.error('why do you keep asking? resolve and reject were used');
}

if (detector.all(['resolve'])) {
  console.error('resolve was definitely used!');
}
````


##API Reference
####detect-arguments
* require('detect-arguments') - returns detect function
* detect(iterable) - iterable can be either array or object.  Returns detector.

####detector
* detector.any([iterable]) - iterable can either object or array of names.  If no iterable is passed, the detector will
check if any arguments were accessed.  If an iterable is passed, the detector will check if any names within the iterable 
were accessed.  Returns true if a match was found and false otherwise.
* detector.all([iterable]) - iterable can either be object or array of names.  If no iterable was passed, the detector will verify
that all arguments were accessed.  If an iterable was passed, the detector will verify that all names contained in the iterable were accessed.
Returns true if all matches were found and false otherwise.
