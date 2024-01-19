class Point {
    #x;
    #y;
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    get_x() {
        return this.#x;
    }
    get_y() {
        return this.#y;
    }
    Show() {
        return `(${this.#x},${this.#y})`
    }
    Equals(p) {
        return p.get_x() == this.get_x() && p.get_y() == this.get_y();
    }
}

function fun2(points_arr, point) {
    for (let i = 0; i < points_arr.length; i++) {
        if (points_arr[i].Equals(point))
            return true;
    }
    return false;
}

function fun1(points_arr, x, y) {
    let p = new Point(x, y)
    return fun2(points_arr, p)
}
function d(point1, point2) {
    return Math.sqrt(((point1.get_x() - point2.get_x()) ** 2 + (point1.get_y() - point2.get_y()) ** 2))
}
function d_points(points) {
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
        total += d(points[i], points[i + 1])
    }
    return total;
}

const ctx = document.getElementById('myChart');
const points_arr = []
for (let i = 0; i < 6; i++) {
    points_arr.push(new Point(i, i + 1));
}
document.getElementById('d_value').innerText = `The total distant is : ${d_points(points_arr)}`;
new Chart(ctx, {
    type: 'line',
    data: {
        labels: points_arr.map(p => p.get_x()),
        datasets: [{
            label: '',
            data: points_arr.map(p => p.get_y()),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


document.querySelector("#code1").innerText = fun1.toString()
document.querySelector("#code2").innerText = fun2.toString()
document.querySelector("#code3").innerText = d.toString()
document.querySelector("#code4").innerText = d_points.toString()
let arr_1 = [new Point(1, 2), new Point(2, 1), new Point(1, 1)]
let arr_2 = [new Point(1, 2), new Point(3, 1), new Point(1, 1)]
document.getElementById('fun1_f').innerText = fun1(arr_1, 3, 3)
document.getElementById('fun1_t').innerText = fun1(arr_2, 1, 1)

document.getElementById('fun2_t').innerText = fun2(arr_1, new Point(3, 3))
document.getElementById('fun2_f').innerText = fun2(arr_2, new Point(1, 1))
