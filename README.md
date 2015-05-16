# protomorphism

Polymorphism via Clojure-style protocols.

## Install

`npm install protomorphism`

## Example

```js
const protocol = require('protomorphism')

// create a new protocol `Pattern`, which requires a
// `matches` function to be implemented
const Pattern = protocol({
  matches: function(pattern, string){
    // returns true if string matches pattern
  }
})

// Make all strings implement pattern by exact matching
Pattern.implementation(String, {
  matches: function(pattern, string){
    return pattern === string
  }
})

// Make all arrays implement pattern by reporting a match
// when the array contains the target string
Pattern.implementation(Array, {
  matches: function(arr, string){
    return arr.indexOf(string) !== -1
  }
})

// Make all regular expressions implement pattern
Pattern.implementation(RegExp, {
  matches: function(regexp, string){
    return !!regexp.test(string)
  }
})

const matches = Pattern.matches
const patterns = [
  'README.md',
  'README',
  ['README.md', 'readme.md'],
  /README\.(md|rdoc|txt)/i
]

let matched = patterns.some(function(pattern){
  return matches(pattern, input)
})
```