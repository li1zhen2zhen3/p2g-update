webpackJsonp([3],{124:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(o),c=n(39),i=n(17),a=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"render",value:function(){var e=this;return u.default.createElement("div",null,u.default.createElement("div",null,"当前计数为",this.props.counter.count),u.default.createElement("button",{onClick:function(){return e.props.increment()}},"自增"),u.default.createElement("button",{onClick:function(){return e.props.decrement()}},"自减"),u.default.createElement("button",{onClick:function(){return e.props.reset()}},"重置"))}}]),t}(),f=function(e){return{counter:e.counter}},s=function(e){return{increment:function(){e((0,c.increment)())},decrement:function(){e((0,c.decrement)())},reset:function(){e((0,c.reset)())}}},l=(0,i.connect)(f,s)(a);t.default=l;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(a,"Counter","E:/react-family/src/pages/Counter/Counter.js"),__REACT_HOT_LOADER__.register(f,"mapStateToProps","E:/react-family/src/pages/Counter/Counter.js"),__REACT_HOT_LOADER__.register(s,"mapDispatchToProps","E:/react-family/src/pages/Counter/Counter.js"),__REACT_HOT_LOADER__.register(l,"default","E:/react-family/src/pages/Counter/Counter.js"))}});