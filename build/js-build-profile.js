({
    appDir: "../public/js/", // where is located js files to optimize
    baseUrl: "modules", // relative to appDir
    dir: "../public/gen/js/", // the output directory for optimized js
    modules: [
        {
            name: "main"
        },
        {
            name: "views/home"
        },
        {
            name: "views/friend/add"
        },
        {
            name: "views/login"
        },
        {
            name: "views/friend/detail"
        },
        {
            name: "views/test/page"
        }
    ]
})
