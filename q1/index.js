class Counter {
    constructor(number) {
        if (!isNaN(number))
            this.value = +number ?? 0;
    }
    Initialize(number) {
        this.super(number)
    }
    Increment() {
        this.value++;
    }
    //
    static * Go(obj) {
        for (let i = obj.value; i >= 0; i--) {
            yield i;
        }
    }
}
let counter;
function start() {
    counter = new Counter(document.querySelector("input").value)
    console.log(counter)
}
function increment() {
    counter.Increment();
    document.querySelector("input").value = counter.value;
}
function go() {
    document.querySelector('#printCounter').innerText = ""
    for (let number of Counter.Go(counter)) {
        document.querySelector('#printCounter').innerText = number + ' ' + document.querySelector('#printCounter').innerText;
    }
}
