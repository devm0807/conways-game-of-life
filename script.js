let rows = 17;
let cols = 34;
let gap = 1000;

var arr = [];
for (var i = 0; i < rows+200; i++) {
    arr[i] = [];
    for (var j = 0; j < cols+200; j++) {
        arr[i][j] = 0;
    }
}

for (let i = 0; i < rows*cols; i++) {
    var cfa = document.createElement('div');
    cfa.setAttribute('class', 'cell');
    cfa.setAttribute('id', i);
    document.getElementsByClassName("grid")[0].appendChild(cfa);
}

let grid = document.getElementsByClassName('cell')
grid[0].style.height=screen.height-400 + "px";
const changeColor = function(cell) {
    if (cell.style.background === 'black') {
        cell.style.background = "white";
    } else {
        cell.style.background = "black";
    }
}

function cellSize(cols,rows)
{
    for(let i=0;i<grid.length;i++)
    {
        grid[i].style.width=((screen.width-17)/cols + "px");
        grid[i].style.height=((screen.height-200)/rows + "px");
    }
}
cellSize(cols,rows);

Array.from(grid).forEach(
    (cell) => {
        cell.addEventListener("click", () => clickHandler(cell));
    }
)

let cells = Array.from(grid);

const clickHandler = function(cell) {
    var index = parseInt(cell.id);
    changeColor(cells[index]);

    var i = ~~(index / cols);
    var j = index - i * cols;
    arr[i+100][j+100] = 1 - arr[i+100][j+100];

}

function show(arr) {
    for (let i = 100; i < rows+100; i++) 
    {
        for(let j=100;j<cols+100;j++)
        {
            let index=cols*(i-100)+(j-100);
        if (arr[i][j] == 1) {
            cells[index].style.background = "black";
        } else cells[index].style.background = "white";
    }
    }
}

function transform() {
    var newarr = [];
    for (var i = 0; i < rows+200; i++) {
        newarr[i] = [];
        for (var j = 0; j < cols+200; j++) {
            newarr[i][j] = 0;
        }
    }

    for (var i = 1; i < rows + 199; i++) {
        for (var j = 1; j < cols + 199; j++) {
            var x = calc(i, j);
            if (arr[i][j] == 1) {
                if (x == 2 || x == 3) {
                    newarr[i][j] = 1;
                }
            } else {
                if (x == 3) newarr[i][j] = 1;
            }
        }
    }

    arr = newarr;
    show(arr);
}

let stbutn = document.querySelector('#start');
stbutn.addEventListener("click", () => Itr());

let pabutn = document.querySelector('#stop');
document.querySelector("#stop").style.background="green";
pabutn.addEventListener("click", () => Stop());

let clbutn = document.querySelector('#clear');
clbutn.addEventListener("click", () => Clear());

function calc(i, j) {
    var x = arr[i - 1][j - 1] + arr[i - 1][j] + arr[i - 1][j + 1] + arr[i][j - 1] + arr[i][j + 1] + arr[i + 1][j - 1] + arr[i + 1][j] + arr[i + 1][j + 1];
    return x;
}

let clr;
function Itr()
{
    let color=document.querySelector("#start").style.background;

    if(color!="green")
    {
        document.querySelector("#start").style.background="green";
        document.querySelector("#stop").style.background="rgb(73, 226, 43)";
        clr = setInterval(transform,gap);
    }
}

function Stop()
{
    let color=document.querySelector("#stop").style.background;
    if(color!="green")
    {
        document.querySelector("#stop").style.background="green";
        document.querySelector("#start").style.background="rgb(73, 226, 43)";
        clearInterval(clr);
    }
}

function Clear()
{
    for (var i = 0; i < rows+200; i++) {
        for (var j = 0; j < cols+200; j++) {
            arr[i][j] = 0;
        }
    }
    show(arr);
}

function toInt(s)
{
    let num=0;
    let temp=1;
    for(let i=s.length-1;i>=0;i--)
    {
        num+= (s[i]-'0')*temp;
        temp*=10;
    }
    return num;
}

let rowslider = document.getElementById("row");
let rowoutput = document.getElementById("rowval");
rowoutput.innerHTML = rowslider.value;

rowslider.oninput = function() {
    rowoutput.innerHTML = this.value;
    setR();
}

let colslider = document.getElementById("col");
let coloutput = document.getElementById("colval");
coloutput.innerHTML = colslider.value;

colslider.oninput = function() {
    coloutput.innerHTML = this.value;
    setC();
}

let spslider = document.getElementById("speed");

spslider.oninput = function() {
    gap= 2100-this.value;
}

function setR(){
    let nrow=document.querySelector("#row").value;

    let rnum=toInt(nrow);
    if(rnum==0) rnum=17;
    rnum+=200;

    let narr=[];
    for(let i=0;i<rnum;i++)
    {
        narr[i]=[];
    }

    rows+=200;
    cols+=200;
    if(rows<rnum)
    {
        let st1=~~((rnum-rows)/2);
        if(rnum%2==0) st1++;
        for(let i=st1;i<st1+rows;i++)
        {
            for(let j=0;j<cols;j++)
            {
                narr[i][j]=arr[i-st1][j];
            }
        }
    }
    else
    {
        let st1=~~((rows-rnum)/2);
        if(rnum%2==1) st1++;
        for(let i=st1;i<st1+rnum;i++)
        {
            for(let j=0;j<cols;j++)
            {
                narr[i-st1][j]=arr[i][j];
            }
        }
    }

    let cnum=cols;

    rows-=200;
    cols-=200;
    rnum-=200;
    cnum-=200;
    if(rows*cols<rnum*cnum)
    {
        for (let i = rows*cols; i < rnum*cnum; i++) {
            var cfa = document.createElement('div');
            cfa.setAttribute('class', 'cell');
            cfa.setAttribute('id', i);
            document.getElementsByClassName("grid")[0].appendChild(cfa);
        }

        let grid = document.getElementsByClassName('cell');
        for(let i=(rows)*(cols);i<(rnum)*(cnum);i++)
        {
            grid[i].addEventListener("click", () => clickHandler(grid[i]));
        }
    }
    else
    {
        console.log("cheater");
        let grid = document.getElementsByClassName('cell');
        for(let i=rows*cols-1;i>=rnum*cnum;i--)
        {
            let ch=grid[i];
            document.getElementsByClassName('grid')[0].removeChild(ch);
        }
    }
    let grid = document.getElementsByClassName('cell');
    cells = Array.from(grid);

    rows=rnum;
    cols=cnum;
    arr=narr;

    cellSize(cols,rows);
    show(arr);
}

function setC(){
    let ncol=document.querySelector("#col").value;

    let cnum=toInt(ncol);

    if(cnum==0) cnum=33;
    cnum+=200;

    rows+=200;
    cols+=200;
    let rnum=rows;

    let narr=[];
    for(let i=0;i<rnum;i++)
    {
        narr[i]=[];
        for(let j=0;j<cnum;j++)
        {
            narr[i][j]=0;
        }
    }

    if(cols<cnum)
    {
        let st1=~~((cnum-cols)/2);
        if(cnum%2==0) st1++;
        for(let j=st1;j<st1+cols;j++)
        {
            for(let i=0;i<rnum;i++)
            {
                narr[i][j]=arr[i][j-st1];
            }
        }
    }
    else
    {
        let st1=~~((cols-cnum)/2);
        if(cnum%2==0) st1++;
        for(let j=st1;j<st1+cnum;j++)
        {
            for(let i=0;i<rnum;i++)
            {
                narr[i][j-st1]=arr[i][j];
            }
        }
    }

    rows-=200;
    cols-=200;
    rnum-=200;
    cnum-=200;
    if(rows*cols<rnum*cnum)
    {
        for (let i = rows*cols; i < rnum*cnum; i++) {
            var cfa = document.createElement('div');
            cfa.setAttribute('class', 'cell');
            cfa.setAttribute('id', i);
            document.getElementsByClassName("grid")[0].appendChild(cfa);
        }

        let grid = document.getElementsByClassName('cell');
        for(let i=(rows)*(cols);i<(rnum)*(cnum);i++)
        {
            grid[i].addEventListener("click", () => clickHandler(grid[i]));
        }
    }
    else
    {
        console.log("cheater");
        let grid = document.getElementsByClassName('cell');
        for(let i=rows*cols-1;i>=rnum*cnum;i--)
        {
            let ch=grid[i];
            document.getElementsByClassName('grid')[0].removeChild(ch);
        }
    }
    let grid = document.getElementsByClassName('cell');
    cells = Array.from(grid);

    rows=rnum;
    cols=cnum;
    arr=narr;

    cellSize(cols,rows);
    show(arr);
}

function setRC()
{
    setR();
    setC();
}