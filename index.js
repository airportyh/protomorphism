"use strict"

class Protocol{
  constructor(spec){
    this.registry = new WeakMap
    for (let key in spec){
      this[key] = createFun(key).bind(this)
    }
    function createFun(funName){
      return function(thing) {
        if (this.hasImplementation(thing)) {
          let fun = this.registry.get(thing.constructor)[funName]
          let retval = fun.apply(this, arguments)
          return retval
        } else {
          throw new Error("No implementation found for " + thing.constructor.name); 
        }
      }
    }
  }
  implementation(type, impl){
    this.registry.set(type, impl)
  }
  hasImplementation(thing) {
    return this.registry.has(thing.constructor);
  }
}

module.exports = function(spec){
  return new Protocol(spec)
}