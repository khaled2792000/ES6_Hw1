const E_name_input = document.getElementById('name');
const E_color_input = document.getElementById('color');
const E_age_input = document.getElementById('age');
const E_weight_input = document.getElementById('weight');
const E_picture_input = document.getElementById('picture');
const E_imported_image = document.getElementById('importedIMG');
const E_drop_elements = document.getElementById('dropElements');
const E_form_duckCreate = document.getElementById('duckForm');

const E_show_duck_button = document.getElementById('showButton');
const E_play_quack = document.getElementById('quackButton');

const E_duck_details = document.getElementById('duckDetails');
const E_show_duckImage = document.getElementById('duckImage');



const display_element = (...elements) => elements.forEach(element => {
    element.style.display = 'block'
});
const hide_element = (...elements) => elements.forEach(element => {
    element.style.display = 'none'
});


E_form_duckCreate.addEventListener('submit', function (event) {
    event.preventDefault();
    const duck = new Duck(E_name_input.value, E_color_input.value, E_age_input.value, E_weight_input.value, E_picture_input.value);
    E_form_duckCreate.reset();
    E_imported_image.src = ''
    document.querySelector('form button[type="submit"]').disabled = true;
    display_element(E_show_duck_button, E_play_quack);

    E_show_duck_button.onclick = function () {
        E_duck_details.textContent = duck.show();
        E_show_duckImage.src = duck.picture;
        display_element(E_show_duckImage);
    };

    E_play_quack.onclick = function () {
        E_show_duckImage.src = ''
        E_duck_details.textContent = duck.quack();
        let playCount = 0;
        let quackSound = document.getElementById('quackSound');

        function playSound() {
            if (playCount < 3) {
                quackSound.play();
                playCount++;
            }
        }

        quackSound.onended = playSound;
        playSound();
    };

});
class Duck {
    constructor(name, color, age, weight, picture) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.picture = picture;
    }

    show() {
        return `Name: ${this.name}, Color: ${this.color}, Age: ${this.age}, Weight: ${this.weight}`;
    }

    quack() {
        const times = (this.age * this.weight) / 2;
        let quackString = '';
        for (let i = 0; i < times; i++) {
            quackString += 'Quack';
        }
        return quackString;
    }
}
function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener('loadend', () => {
                    E_imported_image.src = reader.result;
                    E_picture_input.value = reader.result
                    hide_element(E_drop_elements)
                    display_element(E_imported_image);

                });
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file}`);
        });
    }
}
function dragOverHandler(ev) {
    ev.preventDefault();
}
function changePictureURL(e) {
    E_imported_image.src = e.target.value;
    hide_element(E_drop_elements)
    display_element(E_imported_image)
}
E_imported_image.onerror = function () {
    hide_element(E_imported_image)
    display_element(E_drop_elements)
};

function onUploadFile(e) {
    file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', () => {
        E_imported_image.src = reader.result;
        E_picture_input.value = reader.result;
        hide_element(E_drop_elements)
        display_element(E_imported_image)

    });
    hide_element(E_drop_elements)
    display_element(E_imported_image)
}