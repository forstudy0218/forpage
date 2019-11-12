var dorumap = new Vue ({
    el: "#drmap",
    data: {
        toggle: false,
        mapLinks: [
            "https://www.google.com/maps/d/embed?mid=1mpwTdMyfeIxW-hPIuxNJWBvEhmbLpO8T",
            "https://www.google.com/maps/d/embed?mid=1tepL3mWWTHbmlP1MNfgGVr8v6MerxQRo",
            "https://www.google.com/maps/d/u/0/embed?mid=1nDmqeP0z1dj88erO_c9fXtVoSymXjHXW",
            "https://www.google.com/maps/d/u/0/embed?mid=1xkzhWPq8YRmHaYp_pQ0hbx_pTrwx4gWR",
            "https://www.google.com/maps/d/embed?mid=12xv4jP4h8iRRRfkB8oPlU-qSbpDunv_b",
            "https://www.google.com/maps/d/embed?mid=18mZEhPVCaSgM8EZCqbCBXQOzGcFMym0C",
            "https://www.google.com/maps/d/embed?mid=158MLhntpH-KdlpcR4w5DsWPfog49Ckjs",
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