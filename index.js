"use strict"

class Protocol{
  constructor(spec){
    this.registry = new WeakMap
    for (let key in spec){
      this[key] = createFun(key).bind(this)
    }
    function createFun(funName){
      return function(thing){
        let fun = this.registry.get(thing.constructor)[funName]
        let retval = fun.apply(this, arguments)
        return retval
      }
    }
  }
  implementation(type, impl){
    this.registry.set(type, impl)
  }
}

module.exports = function(spec){
  return new Protocol(spec)
}