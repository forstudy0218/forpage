var dorumap = new Vue ({
    el: "#drmap",
    data: {
        toggle: false,
        mapLinks: [
            "https://www.google.com/maps/d/embed?mid=1mteCHkijze8j2aRWv5Q0WmG0TdArqHJV",
            "https://www.google.com/maps/d/embed?mid=1mpwTdMyfeIxW-hPIuxNJWBvEhmbLpO8T",
            "https://www.google.com/maps/d/embed?mid=1tepL3mWWTHbmlP1MNfgGVr8v6MerxQRo",
            "https://www.google.com/maps/d/u/0/embed?mid=1nDmqeP0z1dj88erO_c9fXtVoSymXjHXW",
            "https://www.google.com/maps/d/u/0/embed?mid=1xkzhWPq8YRmHaYp_pQ0hbx_pTrwx4gWR",
            "https://www.google.com/maps/d/embed?mid=12xv4jP4h8iRRRfkB8oPlU-qSbpDunv_b",
            "https://www.google.com/maps/d/embed?mid=18mZEhPVCaSgM8EZCqbCBXQOzGcFMym0C",
            "https://www.google.com/maps/d/embed?mid=158MLhntpH-KdlpcR4w5DsWPfog49Ckjs",
            "https://www.google.com/maps/d/embed?mid=1eGIMvMeHd3Qmt4lPDgMq54if2os9_A23",
            "https://www.google.com/maps/d/embed?mid=18jsT1tohv0Rpg9_UWA59chMN_2KxM01t",
            "https://www.google.com/maps/d/embed?mid=1a1sekNasjOmmEqwLVtz9Tk0DV3PVnRBC",
            "https://www.google.com/maps/d/embed?mid=1BGtC3VRFGXBIJA1GGH-XoMaKgklJDdpZ",
            "https://www.google.com/maps/d/embed?mid=1S9cHQB5X6Hp5SUy4Wmiyxr0UeoZTQmbZ",
            "https://www.google.com/maps/d/embed?mid=1qd8Hslc3tCMGRTqpXSM2ZoXajLxZqFZp",
            "https://www.google.com/maps/d/embed?mid=16bKxiFBQmEGE1mER7piyd0uUQ9RmeyGQ",
            "https://www.google.com/maps/d/embed?mid=1BcsDGfOZGtdNc82QR0luz6Zac-XlLLQK",
            "https://www.google.com/maps/d/embed?mid=11aDBHJPHV3k3Rv1nyp9ZjOQ63q3nMeRC",
            "https://www.google.com/maps/d/embed?mid=1g_Aohfg_e9sbkdEMxAzxeuDxG_a-sMFm",
            "https://www.google.com/maps/d/embed?mid=15unA5toTf8T3MLD53xje_G8lOUwLGFGu",
            "https://www.google.com/maps/d/embed?mid=1JWe-kv2KEUlVbdNQ-HNFsnU97bK8JqFM",
            "https://www.google.com/maps/d/embed?mid=1CkOdqawpP0R0-WE5pg-NtOgkLOv02xQ2",
            "https://www.google.com/maps/d/embed?mid=1pWgrSDqN4oJO-p2DyYysw4MQCI698p6T",
            "https://www.google.com/maps/d/embed?mid=16Bx-_H9hovwRXUFPhewrdVpp2hkoIh2o",
            "https://www.google.com/maps/d/embed?mid=1fU0XmQk2Z0QDsvTNBRLQH0xeyxkPN-z2",
            "https://www.google.com/maps/d/embed?mid=1IqGybATAsnwKCZxD1dplIhmeOu3KZcOR",
            "https://www.google.com/maps/d/embed?mid=1oeywwIFLjSGBttSrxfSVUCuV7R3DUx7s",
            "https://www.google.com/maps/d/embed?mid=1w5x8BvhXFQ1ZtVhCzh9m7QVNVf6B4FEU",
            "https://www.google.com/maps/d/embed?mid=1y_b-Ave3Lrp84tLDiYEAgZ1VS7vIxp8b",
            "https://www.google.com/maps/d/embed?mid=1gh5XLzu1bY9CNppeX4lPICtRwGN0lIZZ",
            "https://www.google.com/maps/d/embed?mid=1U1QIuuNePP00F6B7y9HqSwPc-6R0A_Yj",
        ],
        mapsrc: "",
        mapstyle: {
            'background-image': 'url(/static/img/gm.png)',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'height': '100vh',
        },
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
    },
    mounted() {
        let picdate = new Date();
        if (picdate.getHours() % 2 == 0) {
            this.mapstyle['background-image'] = 'url(/static/img/chichibu.png)';
        }
    }
})