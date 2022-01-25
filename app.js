function change_screen(screen){
    switch (screen) {
        case "main-menu":
            document.getElementById("main-menu-btns").style.display = "grid";
            document.getElementById("credits").style.display = "none";
            document.getElementById("title").innerText = "Quiz Educativo";
            break;

        case "credits":
            document.getElementById("main-menu-btns").style.display = "none";
            document.getElementById("credits").style.display = "inline-flex";
            document.getElementById("title").innerText = "Créditos";
            break;
    
        default:
            break;
    }
}
