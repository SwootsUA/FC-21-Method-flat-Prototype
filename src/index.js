'use strict';

function MyArray(...args) {
    this.length = 0;

    for (let i = 0; i < args.length; i++) {
        this.push(args[i]);
    }
}

MyArray.isMyArray = function (obj) {
    return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayPrototype();

function MyArrayPrototype() {
    this.push = function () {
        if (arguments) {
            for (let i = 0; i < arguments.length; i++) {
                this[this.length++] = arguments[i];
            }
        }
        return this.length;
    };

    this.forEach = function (callback, thisArg) {
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };

    this.flat = function (depth = 1) {
        const returnArray = new MyArray();

        this.forEach(item => {
            if ((MyArray.isMyArray(item) || Array.isArray(item)) && depth > 0) {
                item.flat(depth - 1).forEach(flatItem => returnArray.push(flatItem));
            } else {
                returnArray.push(item);
            }
        });

        return returnArray;
    };
}

const flatArray = new MyArray(
    [1, 2, ['a', 'b', ['c', 'd']]],
    3,
    4,
    new MyArray(5, 6, new MyArray(7, 8))
);

console.group('Correct arguments');
console.log('flatArray.flat(0):');
console.log(flatArray.flat(0)); // returs same copy

console.log('\nflatArray.flat() / flatArray.flat(1):');
console.log(flatArray.flat()); // same as flat(1)
console.log(flatArray.flat(1));

console.log('\nflatArray.flat(2):');
console.log(flatArray.flat(2));

console.log('\nflatArray.flat(Infinity):');
console.log(flatArray.flat(Infinity)); // fully flat
console.groupEnd();

console.group('Wrong arguments (all return same copy)');
console.log(flatArray.flat(-100));
console.log(flatArray.flat(NaN));
console.log(flatArray.flat('string'));
console.groupEnd();
