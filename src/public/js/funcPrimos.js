var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var flag = false;
        var elem = document.getElementById("progreso");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                redireccionar();
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }

    }

    function redireccionar() {
        var pert = document.getElementById("primoPerten").value;
        var pr1 = document.getElementById("cou").value;
        var veces = document.getElementById("vec").value - 1;
        var pr2 = document.getElementById("to").value;
        var link = "/sort/sorteo?primo=" + pr1 + "&pert=" + pert + "&vec=" + veces + "&to=" + pr2;
        window.location.href = link;
    }
}

function aceptacion() {
    var pr1 = document.getElementById("cou").value;
    var pr2 = document.getElementById("to").value;
    var link = '/sort/resultado?cou=' + pr1 + '&to=' + pr2;
    window.location.href = link;
}

function blinktext() {
    var f = document.getElementById('announcement');
    setInterval(function () {
        f.style.visibility = (f.style.visibility == 'hidden' ? '' : 'hidden');
    }, 1000);
}