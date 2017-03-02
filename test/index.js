var detect = require('../libs'),
assert = require('assert');


const a=1,b=2,
fn2 = ({a,b}) => {},
fn1 = ({b}) => {},
fn0 = () => {};

describe('Calling function takes no arguments and ',function () {
    var d;
    beforeEach(function () {
        d = detect({a,b});
        //call function with 1 match
        (() => {})(d);
    });
    it('any with no args returns false',function () {
        assert(!d.any())
    });
    it('all with no args returns false',function () {
        assert(!d.all())
    });
    it('any with arg dictionary returns false',function () {
        assert(!d.any({a,b}))
    });
    it('any with arg array returns false',function () {
        assert(!d.any(['a','b']))
    });
    it('all with arg array returns false',function () {
        assert(!d.all(['a','b']))
    });
});

describe('Calling function resolves 1 argument and',function () {
    var d;
    beforeEach(function () {
        d = detect({a,b});
        //call function with 1 match
        (({b}) => {})(d);
    });
    it('any with no args returns true',function () {
        assert(d.any())
    });
    it('all with no args returns false',function () {
        assert(!d.all())
    });
    it('any with matching arg dictionary returns true',function () {
        assert(d.any({a,b}))
    });
    it('any with non-matching arg dictionary returns false',function () {
        assert(!d.any({a}))
    });
    it('any with matching arg array returns true',function () {
        assert(d.any(['a','b']))
    });
    it('all with matching arg dictionary returns true',function () {
        assert(d.all({b}))
    });
    it('all with non-complete matching arg dictionary returns false',function () {
        assert(!d.all({a,b}))
    });
    it('all with matching arg array returns true',function () {
        assert(d.all(['b']))
    });
    it('all with non-complete matching arg array returns false',function () {
        assert(!d.all(['a','b']))
    });
});

describe('Calling function resolves 2 arguments and ',function () {
    var d;
    beforeEach(function () {
        d = detect({a,b});
        //call function with 1 match
        (({a,b}) => {})(d);
    });
    it('any with no args returns true',function () {
        assert(d.any())
    });
    it('all with no args returns true',function () {
        assert(d.all())
    });
    it('any with matching arg dictionary returns true',function () {
        assert(d.any({a}))
    });
    it('any with non-matching arg dictionary returns false',function () {
        assert(!d.any({c:1}))
    });
    it('any with matching arg array returns true',function () {
        assert(d.any(['a']))
    });
    it('all with matching arg dictionary returns true',function () {
        assert(d.all({a}))
    });
    it('all with non-complete matching arg dictionary returns false',function () {
        assert(!d.all({a,b,c:1}))
    });
    it('all with matching arg array returns true',function () {
        assert(d.all(['b','a']))
    });
    it('all with non-complete matching arg array returns false',function () {
        assert(!d.all(['a','b','c']))
    });
});
