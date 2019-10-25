// test 0 - zmiana tekstu
function getCurrentId(increment = true) {
    if (document.currentId >= 0) {
        increment ? document.currentId++ : document.currentId--;
        return document.currentId < 0 ? 0 : document.currentId;
    } else {
        document.currentId = 0;
        return 0;
    }
}

document.testList = [{
    id: "T01",
    name: "DOM - manipulacja tekstem",
    run: T01,
    props: [
        { text: "Lorem ipsum etre metre done ome lolaes" },
        { text: "T01" }
    ],
    initTest: () => {
        let html = `
            <div id="T01">
                <h1 id="T01-h1"></h1>
                <h3 id="T01-h3"></h3>
                <p id="T01-p"></p>
                <span id="T01-span"></span> <br>
                <label id="T01-label"></label>
            </div>
            `
        $('#test-area').html(html);
    }
},
{
    id: "T02",
    name: "DOM - dodawanie elementu do listy",
    run: T02,
    props: [
        { html: `<div class="form-control"><label>Login:</label><input type="text" value="Dodano element do listy" placeholder="login"/></div><div class="form-control"><label>Hasło:</label><input type="password" value="12345678" placeholder="hasło"/></div>` },
        { html: `<h4>Dodano element do listy</h4>` }
    ],
    initTest: () => {
        let html = `
            <ul id="T02"></ul>
            `
        $('#test-area').html(html);
    }
},

{
    id: "T03",
    name: "DOM - edycja elementu listy",
    run: T03,
    props: [
        { targets: [0, 1, 2, 3, 4, 5, 6, 7], html: `<button type="button">Zmieniono element listy</button>` },
        { targets: [1, 7, 8, 9, 14, 2, 93, 24, 43, 21, 40, 56, 93, 53, 74, 34, 73, 65, 84, 29], html: `<input type="text" value="Zmieniono element listy"/>` },
    ],
    initTest: () => {
        let lista = ''
        for (let i = 0; i <= 100; i++) {
            lista += `<li> <h3>Element listy H2 - ${i} <h3></li>`
        }

        let html = `
            <ul id="T03">
                ${lista}
            </ul>
            `
        $('#test-area').html(html);

    }
},
{
    id: "T04",
    name: "DOM - usuwanie elementów listy",
    run: T04,
    props: [
        { targets: [0, 1] },
        { targets: [7, 0, 0, 5, 1, 0] },
    ],
    beforeTest: () => {
        let lista = ''
        for (let i = 0; i <= 10; i++) {
            lista += `<li> Prosty element listy ${i}</li>`
        }

        let html = `
            <ul id="T04">
                ${lista}
            </ul>
            `
        $('#test-area').html(html);

    }
},
{
    id: "T05",
    name: "CSS - dadanie stylów do elementu",
    run: T05,
    props: [
        { style: { "font-size": "26px", "font-weight": "700", "font-family": "Arial", "color": "orange", "height": "400px" } },
        { style: { "font-size": "12px", "font-weight": "400", "font-family": "Roboto", "color": "darkgrey", "height": "400px" } }
    ],
    beforeTest: () => {
        let html = `
                <p id="T05">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid vel aspernatur debitis ea fugit non blanditiis porro. In, autem. Ipsa labore voluptatibus accusantium beatae. Sit pariatur numquam animi id libero.</p>
            `
        $('#test-area').html(html);

    }
},
{
    id: "T06",
    name: "CSS - podmiana klasy ze stylami",
    run: T06,
    props: [
        { className: "T06a" },
        { className: "T06b" },
    ],
    beforeTest: () => {
        let html = `
            <div id="T06">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid vel aspernatur debitis ea fugit non blanditiis porro. In, autem. Ipsa labore voluptatibus accusantium beatae. Sit pariatur numquam animi id libero.
            </div>
            `
        $('#test-area').html(html);

    }
},
{
    id: "T07",
    name: "Zdarzenia - Pobieranie danych z formy",
    run: T07,
    props: [
        { username: "admin", password: "admin" },
        { username: "sadfaf234f2fvgn2r23r0vqwnmrtq233q2r0rtvq23m0q29tv34grq3jt24mv4qt23wmv09b3tqm9t02v", password: "2c3r3cr24fv3t24gv3y45tbh9hjmun034b345whnu9ty9w4h5my54ou5bgmn" },
    ],
    beforeTest: () => {
        let html = `
            <form id="T07">
                <div class="form-control">
                    <label>Login:</label>
                    <input type="text" id="T07-username" placeholder="login"/>
                </div>
                <div class="form-control">
                    <label>Hasło:</label>
                    <input type="password" id="T07-password" placeholder="hasło"/>
                </div>
                <button type="submit" id="T07-submit">Zaloguj się</button>
            </form>
            `
        $('#test-area').html(html);
    }
},
]

// T01 - zmiana tekstu
function T01({ text }) {
    $('#T01-h1').text(text);
    $('#T01-h3').text(text);
    $('#T01-p').text(text);
    $('#T01-label').text(text);
    $('#T01-span').text(text);
}

// T02 dodawanie elementu do DOM
function T02({ html }) {
    $("#T02").append($("<li></li>").html(html))
}

// T03 edycja elementów z listy
function T03({ targets, html }) {
    let list = $("#T03").children();

    targets.map((target) => {
        $(list[target]).html(html);
    })
}

// T04 usuwanie elementów z listy
function T04({ targets }) {
    let list = $("#T04").children();
    targets.map((target) => {
        list[target].remove();
    })
}

// T05 dodanie stylów do nieostylowanego elementu
function T05({ style }) {
    $("#T05").css(style)
}

// T06 podmiana klasy
function T06({ className }) {
    $("#T06").toggleClass(className);
}

// T07 
function T07({ username, password }) {
    let form = $('#T07');
    let inputUsername = $('#T07-username');
    let inputPassword = $('#T07-password');

    inputUsername.val(username);
    inputPassword.val(password);
    let submit = $('#T07-submit');
    form.on('submit', (e) => {
        e.preventDefault();
        console.log("Username: " + inputUsername.val() + "/n Password: " + inputPassword.val())
    })
    submit.click();
}