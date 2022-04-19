(async () => {
    const json = await (await fetch("/lang/lokewrz.json")).json();
    const svg = await (await fetch("/icons/LokewrzLangChars.svg")).text();
    let txt = document.createElement("h");
    txt.innerHTML = svg;
    document.querySelector(".letters .list").appendChild(txt);

    const engLtrs = "abcdefghijklmnopqrstuvwxyz".split("");
    
    const lokewrz = (english) => {
        charout.innerHTML = "";
        if(!english) { throw new Error("English String not given."); }
        english = english + ``;
        const s = english.toLowerCase().split("");
        let o = s.map(x => {
            if(engLtrs.includes(x)) {
                drawChar(json[engLtrs.indexOf(x)]);
                return json[engLtrs.indexOf(x)];
            } else {
                charout.innerHTML += x.replace(/ /g, "<space></space>");
                return x;
            }

        }).join(" ");

        return o;
    };
    
    const inp = document.querySelector("input");
    const txtout = document.querySelector(".output p");
    let charout = document.querySelector(".output .chars");
    const onkey = () => {
        if(inp.value && inp.value != "") {
            const l = lokewrz(inp.value);
            txtout.textContent = l;
        } else {
            txtout.textContent = "";
        }
    };

    const drawChar = (charname) => {
        const chr = document.createElement("img");
        chr.src = `icons/chars/${charname}.png`;
        chr.className = "char";
        charout.appendChild(chr);
    };

    inp.addEventListener("keydown", onkey);
    inp.addEventListener("keyup", onkey);

    document.querySelector(".letters .list").innerHTML += json.map((k, p) => `${k}: [${engLtrs[p]}]`).join(" ");
})();