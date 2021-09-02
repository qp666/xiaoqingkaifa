let arr = [
    { a: 1, b: 12, c: 13 },
    { a: 1, b: 164, c: 14532 },
    { a: 1, b: 22, c: 23 },
    { a: 3, b: 32, c: 33 }, //
    { a: 4, b: 42, c: 43 },
    { a: 4, b: 765, c: 46453 },
]

let arr2 = [
    { a: 1, b: 111, c: 1111 },
    { a: 2, b: 222, c: 2222 },
    { a: 5, b: 333, c: 3333 },
    { a: 3, b: 333, c: 3333 },
    { a: 5, b: 333, c: 3333 },
    { a: 6, b: 333, c: 3333 },
    { a: 4, b: 444, c: 4444 }
]

let arr3 = arr.map((item) => {
    return item.a
})

let arr4 = arr2.filter((item) => {
    return arr3.includes(item.a)
})

console.log(arr4);
console.log(arr3);