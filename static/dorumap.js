var dorumap = new Vue ({
    el: "#drmap",
    data: {
        toggle: false,
        mapLinks: [
            "https://www.google.com/maps/d/embed?mid=1mpwTdMyfeIxW-hPIuxNJWBvEhmbLpO8T",
        ],
        mapsrc: "",
    },
    methods: {
        toggleMap: function() {
            this.toggle = false;
            this.mapsrc = "";
        },
        showMap: function(index) {
            this.mapsrc = this.mapLinks[index];
            this.toggle = true;
        }
    }
})