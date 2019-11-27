const todofukenColor = [
    {
        id: 0,
        name: "hokkaidou",
        color: "#b3f8ff",
        jp: "北海道",
    },
    {
        id: 1,
        name: "aomori",
        color: "#ff3399",
        jp: "青森",
    },
    {
        id: 2,
        name: "iwate",
        color: "#f5989d",
        jp: "岩手",
    },
    {
        id: 3,
        name: "miyagi",
        color: "#ff002a",
        jp: "宮城",
    },
    {
        id: 4,
        name: "akita",
        color: "#f172a3",
        jp: "秋田",
    },
    {
        id: 5,
        name: "yamagata",
        color: "#c633ff",
        jp: "山形",
    },
    {
        id: 6,
        name: "fukushima",
        color: "#bf7fff",
        jp: "福島",
    },
    {
        id: 7,
        name: "ibaraki",
        color: "#f7092d",
        jp: "茨城",
    },
    {
        id: 8,
        name: "tochigi",
        color: "#fffffc",
        jp: "栃木",
    },
    {
        id: 9,
        name: "gunma",
        color: "#874da1",
        jp: "群馬",
    },
    {
        id: 10,
        name: "saitama",
        color: "#f0908d",
        jp: "埼玉",
    },
    {
        id: 11,
        name: "chiba",
        color: "#ff002a",
        jp: "千葉",
    },
    {
        id: 12,
        name: "tokyo",
        color: "#ffeeed",
        jp: "東京",
    },
    {
        id: 13,
        name: "kanagawa",
        color: "#ff7500",
        jp: "神奈川",
    },
    {
        id: 14,
        name: "niigata",
        color: "#ffd400",
        jp: "新潟",
    },
    {
        id: 15,
        name: "toyama",
        color: "#ff0097",
        jp: "富山",
    },
    {
        id: 16,
        name: "ishikawa",
        color: "#c4ff89",
        jp: "石川",
    },
    {
        id: 17,
        name: "fukui",
        color: "#ff002a",
        jp: "福井",
    },
    {
        id: 18,
        name: "yamanasi",
        color: "#89c4ff",
        jp: "山梨",
    },
    {
        id: 19,
        name: "nagano",
        color: "#ff002a",
        jp: "長野",
    },
    {
        id: 20,
        name: "gifu",
        color: "#33ffbd",
        jp: "岐阜",
    },
    {
        id: 21,
        name: "sizuoka",
        color: "#fc0fc0",
        jp: "静岡",
    },
    {
        id: 22,
        name: "aichi",
        color: "#ff4d9f",
        jp: "愛知",
    },
    {
        id: 23,
        name: "mie",
        color: "#f0566e",
        jp: "三重",
    },
    {
        id: 24,
        name: "siga",
        color: "#ffd400",
        jp: "滋賀",
    },
    {
        id: 25,
        name: "kyoto",
        color: "#ff9f99",
        jp: "京都",
    },
    {
        id: 26,
        name: "osaka",
        color: "#ff002a",
        jp: "大阪",
    },
    {
        id: 27,
        name: "hyougo",
        color: "#00a2ff",
        jp: "兵庫",
    },
    {
        id: 28,
        name: "nara",
        color: "#ff737f",
        jp: "奈良",
    },
    {
        id: 29,
        name: "wakayama",
        color: "#ff9f99",
        jp: "和歌山",
    },
    {
        id: 30,
        name: "tottori",
        color: "#80ff99",
        jp: "鳥取",
    },
    {
        id: 31,
        name: "shimane",
        color: "#b3f8ff",
        jp: "島根",
    },
    {
        id: 32,
        name: "okayama",
        color: "#7fbfff",
        jp: "岡山",
    },
    {
        id: 33,
        name: "hiroshima",
        color: "#ff9141",
        jp: "広島",
    },
    {
        id: 34,
        name: "yamaguchi",
        color: "#fffffc",
        jp: "山口",
    },
    {
        id: 35,
        name: "tokushima",
        color: "#ff737f",
        jp: "徳島",
    },
    {
        id: 36,
        name: "kagawa",
        color: "#ff007f",
        jp: "香川",
    },
    {
        id: 37,
        name: "ehime",
        color: "#1affde",
        jp: "愛媛",
    },
    {
        id: 38,
        name: "kouchi",
        color: "#d16eff",
        jp: "高知",
    },
    {
        id: 39,
        name: "fukuoka",
        color: "#ff007f",
        jp: "福岡",
    },
    {
        id: 40,
        name: "saga",
        color: "#1a3c80",
        jp: "佐賀",
    },
    {
        id: 41,
        name: "nagasaki",
        color: "#b3f8ff",
        jp: "長崎",
    },
    {
        id: 42,
        name: "kumamoto",
        color: "#fffffc",
        jp: "熊本",
    },
    {
        id: 43,
        name: "ooita",
        color: "#b3f8ff",
        jp: "大分",
    },
    {
        id: 44,
        name: "miyazaki",
        color: "#ff7500",
        jp: "宮崎",
    },
    {
        id: 45,
        name: "kagoshima",
        color: "#ffddcc",
        jp: "鹿児島",
    },
    {
        id: 46,
        name: "okinawa",
        color: "#ffffa3",
        jp: "沖縄",
    },
];

const rarity =[];
for (let i = 0; i < 100; i++) {
    if (i < 73) {
        rarity.push(0);
    } else if (i < 93) {
        rarity.push(1);
    } else {
        rarity.push(2);
    }
}

const rarityStr = ["N", "R", "UR"];

let count = 0;
let coin = 0;
function coinFunc() {
    coin += 1;
    document.getElementById('coin').innerHTML = coin;
    setTimeout(coinFunc, 1000);
}


function noneAll() {
    const iframe = document.getElementById('japan_svg').contentDocument;
    todofukenColor.forEach( dict => {
        const todofukenData = iframe.getElementsByClassName(dict.name);
        // HTML colloection has only legth,item,namedItem
        for (let i = 0; i < todofukenData.length; i++) {
            todofukenData[i].setAttribute("fill", "none");
        }
    });
    document.querySelector('html').setAttribute('lang', 'ja');
    if (coin === 0) coinFunc(coin);
}

function renew() {
    count = 0;
    todofukenColor.forEach( dict => {
        dict.rarity = -1;
    });
    const result_div = document.getElementById('recent_result');
    while (result_div.firstChild) {
        result_div.removeChild(result_div.firstChild);
    }
    const btn = document.getElementById('gacha');
    btn.innerHTML = "Gacha !";
    btn.onclick = goGacha;
    noneAll();
}

function goGacha() {
    if (coin < 10) {
        return;
    }
    let done = false;
    count += 10;
    coin -= 10;
    document.getElementById('coin').innerHTML = coin;
    const result_div = document.getElementById('recent_result');
    while (result_div.firstChild) {
        result_div.removeChild(result_div.firstChild);
    }
    const result = [];
    for (let i = 0; i < 10; i++) {
        const resDict = {
            name: todofukenColor[ Math.floor( Math.random() * 47) ].name,
            rarity: rarity[ Math.floor( Math.random() * 100) ],
        };
        result.push(resDict);
    }
    for (let i = 0; i < 10; i++) {
        const saveData = todofukenColor.filter(el => el.name === result[i].name)[0];
        saveData["rarity"] = saveData["rarity"] || -1;
        if (saveData["rarity"] < result[i].rarity) saveData["rarity"] = result[i].rarity;
        let color;
        if (saveData["rarity"] === 0) {
            color = "grey";
        } else if (saveData["rarity"] === 1) {
            color = "green";
        } else if (saveData["rarity"] === 2) {
            color = saveData.color;
        }
        const iframe = document.getElementById('japan_svg').contentDocument;
        const todofukenData = iframe.getElementsByClassName(result[i].name);
        for (let i = 0; i < todofukenData.length; i++) {
            todofukenData[i].setAttribute("fill", color);
        }
        if (result[i].rarity === 2) {
            if (todofukenColor.every( (data) => data.rarity === 2 )) {
                const btn = document.getElementById('gacha');
                btn.innerHTML = "Restart";
                btn.onclick = renew;
                done = true;
            }
        }
        const newImg = document.createElement('img');
        newImg.height = 64;
        newImg.width = 64;
        const test_png = (i % 2 === 0)? "nagasaki" : "hokkaidou";
        newImg.alt = saveData.jp + " " + rarityStr[result[i].rarity];
        newImg.src = "static/img/todofuken/" + test_png + "/" + rarityStr[result[i].rarity] + ".png";
        result_div.appendChild(newImg);
    }
    if (done) {
        const totalCount = document.createElement('p');
        totalCount.innerHTML = "Coin used: " + count;
        totalCount.style.color = 'red';
        result_div.appendChild(totalCount);
        done = false;
    }
}

function collection() {
    const result_div = document.getElementById('recent_result');
    while (result_div.firstChild) {
        result_div.removeChild(result_div.firstChild);
    }
    todofukenColor.forEach( dict => {
        const newP = document.createElement('p');
        newP.innerHTML = (dict.rarity >= 0)? dict.jp + ": " + rarityStr[dict.rarity] : dict.jp + ": " + "none";
        result_div.appendChild(newP);
    });
    const newCount = document.createElement('p');
    newCount.innerHTML = "Coin used: " + count;
    newCount.style.color = 'red';
    result_div.appendChild(newCount);
}

window.onload = noneAll;