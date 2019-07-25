const todofukenColor = [
    {
        id: 0,
        name: "hokkaidou",
        color: "#b3f8ff",
    },
    {
        id: 1,
        name: "aomori",
        color: "#ff3399",
    },
    {
        id: 2,
        name: "iwate",
        color: "#f5989d",
    },
    {
        id: 3,
        name: "miyagi",
        color: "#ff002a",
    },
    {
        id: 4,
        name: "akita",
        color: "#f172a3",
    },
    {
        id: 5,
        name: "yamagata",
        color: "#c633ff",
    },
    {
        id: 6,
        name: "fukushima",
        color: "#bf7fff",
    },
    {
        id: 7,
        name: "ibaraki",
        color: "#f7092d",
    },
    {
        id: 8,
        name: "tochigi",
        color: "#fffffc",
    },
    {
        id: 9,
        name: "gunma",
        color: "#ffeeff",
    },
    {
        id: 10,
        name: "saitama",
        color: "#f0908d",
    },
    {
        id: 11,
        name: "chiba",
        color: "#ff002a",
    },
    {
        id: 12,
        name: "tokyo",
        color: "#ffeeed",
    },
    {
        id: 13,
        name: "kanagawa",
        color: "#ff7500",
    },
    {
        id: 14,
        name: "niigata",
        color: "#ffd400",
    },
    {
        id: 15,
        name: "toyama",
        color: "#ff0097",
    },
    {
        id: 16,
        name: "ishikawa",
        color: "#c4ff89",
    },
    {
        id: 17,
        name: "fukui",
        color: "#ff002a",
    },
    {
        id: 18,
        name: "yamanasi",
        color: "#89c4ff",
    },
    {
        id: 19,
        name: "nagano",
        color: "#ff002a",
    },
    {
        id: 20,
        name: "gifu",
        color: "#33ffbd",
    },
    {
        id: 21,
        name: "sizuoka",
        color: "#fc0fc0",
    },
    {
        id: 22,
        name: "aichi",
        color: "#ff4d9f",
    },
    {
        id: 23,
        name: "mie",
        color: "#f0566e",
    },
    {
        id: 24,
        name: "siga",
        color: "#ffd400",
    },
    {
        id: 25,
        name: "kyoto",
        color: "#ff9f99",
    },
    {
        id: 26,
        name: "osaka",
        color: "#ff002a",
    },
    {
        id: 27,
        name: "hyougo",
        color: "#00a2ff",
    },
    {
        id: 28,
        name: "nara",
        color: "#ff737f",
    },
    {
        id: 29,
        name: "wakayama",
        color: "#ff9f99",
    },
    {
        id: 30,
        name: "tottori",
        color: "#80ff99",
    },
    {
        id: 31,
        name: "shimane",
        color: "#b3f8ff",
    },
    {
        id: 32,
        name: "okayama",
        color: "#7fbfff",
    },
    {
        id: 33,
        name: "hiroshima",
        color: "#ff9141",
    },
    {
        id: 34,
        name: "yamaguchi",
        color: "#fffffc",
    },
    {
        id: 35,
        name: "tokushima",
        color: "#ff737f",
    },
    {
        id: 36,
        name: "kagawa",
        color: "#ff007f",
    },
    {
        id: 37,
        name: "ehime",
        color: "#1affde",
    },
    {
        id: 38,
        name: "kouchi",
        color: "#d16eff",
    },
    {
        id: 39,
        name: "fukuoka",
        color: "#ff007f",
    },
    {
        id: 40,
        name: "saga",
        color: "#1a3c80",
    },
    {
        id: 41,
        name: "nagasaki",
        color: "#b3f8ff",
    },
    {
        id: 42,
        name: "kumamoto",
        color: "#fffffc",
    },
    {
        id: 43,
        name: "ooita",
        color: "#b3f8ff",
    },
    {
        id: 44,
        name: "miyazaki",
        color: "#ff7500",
    },
    {
        id: 45,
        name: "kagoshima",
        color: "#ffddcc",
    },
    {
        id: 46,
        name: "okinawa",
        color: "#ffffa3",
    },
];

const rarity =[];
for (let i = 0; i < 100; i++) {
    if (i < 70) {
        rarity.push(0);
    } else if (i < 90) {
        rarity.push(1);
    } else {
        rarity.push(2);
    }
}

const rarityStr = ["N", "R", "UR"];

function noneAll() {
    const iframe = document.getElementById('japan_svg').contentDocument;
    todofukenColor.forEach( dict => {
        const todofukenData = iframe.getElementsByClassName(dict.name);
        // HTML colloection has only legth,item,namedItem
        for (let i = 0; i < todofukenData.length; i++) {
            todofukenData[i].setAttribute("fill", "none");
        }
    });
}

function goGacha() {
    const result = [];
    for (let i = 0; i < 10; i++) {
        const resDict = {
            name: todofukenColor[ Math.floor( Math.random() * 47) ].name,
            rarity: rarity[ Math.floor( Math.random() * 100) ],
        };
        result.push(resDict);
    }
    let resultStr = "";
    for (let i = 0; i < 10; i++) {
        const saveData = todofukenColor.filter(el => el.name === result[i].name)[0];
        saveData["rarity"] = saveData["rarity"] || 0;
        if (saveData["rarity"] < result[i].rarity) saveData["rarity"] = result[i].rarity;
        let color;
        if (saveData["rarity"] === 0) {
            color = "#ffffff";
        } else if (saveData["rarity"] === 1) {
            color = "green";
        } else {
            color = saveData.color;
        }
        const iframe = document.getElementById('japan_svg').contentDocument;
        const todofukenData = iframe.getElementsByClassName(result[i].name);
        for (let i = 0; i < todofukenData.length; i++) {
            todofukenData[i].setAttribute("fill", color);
        }
        resultStr += rarityStr[result[i].rarity] + " " + result[i].name + " || ";
    }
    const newResult = document.createTextNode(resultStr);
    const result_div = document.getElementById('recent_result')
    result_div.replaceChild(newResult, result_div.firstChild);
}

window.onload = noneAll;