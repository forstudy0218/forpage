var download_page = new Vue ({
    el: "#DLframe",
    data: {
        apkLinks: [
           "static/assets/sdk3.apk",
           "static/assets/onw.apk",
        ],
        info: [
            {
                app_name: "Sudoku (android 5 or up)",
                file_name: "sudoku0218",
            },
            {
                app_name: "One Night Werewolf (android 5 or up)",
                file_name: "onw0218",
            },
        ],
        color_name: ["white", "#968c8c"],
    },
})