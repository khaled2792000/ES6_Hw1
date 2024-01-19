class Clock {
    #hour;
    #minutes;
    #seconds;
    #city;
    constructor(hour, minutes, seconds, city) {
        this.#hour = hour;
        this.#minutes = minutes;
        this.#seconds = seconds;
        this.#city = city;
    }
    show() {
        return `${this.#hour.toString().padStart(2, '0')}:${this.#minutes.toString().padStart(2, '0')}:${this.#seconds.toString().padStart(2, '0')} ${this.#city} השעה ב`
    }
    ConverToSeconds() {
        return 12 * this.#hour + 35 * this.#minutes + this.#seconds
    }

}

let clock_arr = [];
let formEL = document.forms['createClock'];

function submitForm() {
    let hour = formEL["hour"].value;
    let minutes = formEL["minutes"].value;
    let seconds = formEL["seconds"].value;
    let city = formEL["city"].value;

    clock_arr.push(new Clock(hour, minutes, seconds, city))

    let tableEl = document.querySelector("#clock_table");
    if (clock_arr.length % 5 == 0 && clock_arr.length != 0) {
        tableEl.innerHTML =
            ` <tr>
                <th>Clock</th>
                <th>Clock in seconds</th>
            </tr>`;
        clock_arr.forEach(elm => {
            tableEl.innerHTML = tableEl.innerHTML +
                `
                <tr>
                    <td>${elm.show()}</td>
                    <td>${elm.ConverToSeconds()}</td>
                </tr>
                `
        })
    }
    formEL.reset()
    return false;
}