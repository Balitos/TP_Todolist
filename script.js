$(document).ready(function () {
    var json;
    var array = [];

    // on vérifie si la variable json existe dans localStorage
    if ("json" in localStorage) {
        // on récupère la valeur de la variable et on le parse
        json = JSON.parse(localStorage.getItem("json"));

        for (var i = 0; i < json.length; i++) {
            let value = json[i];

            array.push(value);
            $(".list").append('<li class="items"><p class="text">' + value + '</p><div class="trash"><i class="fa fa-trash-o delete"></i></div></li>');
        }
    }

    // event lorsqu'on appuie sur une touche dans l'input dont l'identifiant est InputAjout
    $("#InputAjout").on("keypress", function (e) {
        // si c'est la touche entrée
        if (e.which == 13) {
            let saisie = $("#InputAjout").val();
            $("#InputAjout").val("");

            array.push(saisie);
            $(".list").append('<li class="items"><p class="text">' + saisie + '</p><div class="trash"><i class="fa fa-trash-o delete"></i></div></li>');

            // on remet à jour la variable stockée dans localStorage
            localStorage.setItem("json", JSON.stringify(array));
        }
    });

    // event lors du click sur le bouton removeAll
    $(".removeAll").on("click", function () {
        // on vide le tableau
        array = [];

        // on remet à jour la variable stockée dans localStorage
        localStorage.setItem("json", JSON.stringify(array));

        // on supprime tous les li qui ont la classe items pour l'affichage
        $("li.items").remove();
    });

    // event lors du click sur le bouton supprimer une tâche
    $(".trash").on("click", function () {
        // on supprime la valeur dans la tableau sauf que on ne connaît pas la position de la valeur dans le tableau
        // donc on utilise indexOf pour rechercher sa position
        let index = array.indexOf($(this).parent("li").find("p").html());
        if (index !== -1) array.splice(index, 1);

        // on remet à jour la variable stockée dans localStorage
        localStorage.setItem("json", JSON.stringify(array));

        // on supprime la todo pour l'affichage
        $(this).parent("li").remove();
    });
});