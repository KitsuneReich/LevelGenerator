//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~     Nichole Boothroyd
//~     Generating Spaces!
//~
//~     UCSC Summer 2018: CMPM 147
//~
//~
//~
//~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var rooms = [ [],[],[] ,[] ,[],[] ,[] ,[] ,[] ,[] ];
var jData;   //var for holding json data
var img;

function preload() {
    //loads .json data
    jData = loadJSON('DonJon.json');
    img = loadImage('assets\/Tileset_64x64.png');
}

function setup() {
    createCanvas((64 * 16),(64 * 10));
    background('black');
    fill('black');
    var rowIndex = 0;
    var colIndex = 0;
    var step = 0;
    
    //Populate grid with a random assortment of pre-made tiles from json layers
    for(var i = 0; i < 10; i++) {
        drawLayer(random(jData.layers));
    }
    
    //Ensure that there is at least one exit on the grid
    console.log(rooms);
    if( checkExits(rooms) == false) {
        insertExit();
    }
    
    function checkExits (rooms) {
        var containsAnExit = false;
        rooms.forEach(function (array) {
                      //console.log(array.includes(15));
                      if (array.includes(15) == true) {
                        containsAnExit = true;
                      }
        });
        return containsAnExit;
    }
    
    function insertExit() {
        for (var i = 0; i < 16; i++) {
            if (rooms[0][i] == null) {
                rooms[0][i] = 15;
                image(img, i * 64, 0, 64, 64, 6 * 64, 64, [64], [64]);
                return;
            }
        }
    }

    function drawLayer(layer) {
        layer.data.forEach(function (tile) {
                           //Draw rect based on json Data
                           if(tile == 8) {
                           rooms[rowIndex][colIndex] = 8;
                           //extract sprite from tileset image and place
                           image(img, colIndex * 64, rowIndex * 64, 64, 64, 7 * 64, 0, [64], [64])
                           }
                           
                          if(tile == 15) {
                           rooms[rowIndex][colIndex] = 15;
                           //extract sprite from tileset image and place
                           image(img, colIndex * 64, rowIndex * 64, 64, 64, 6 * 64, 64, [64], [64]);
                           }
                           //Increment x
                           colIndex++;
                           
                           //Move to next row every 4 elements in the array
                           if (colIndex%4 == 0) {
                           rowIndex++;
                           colIndex = step;
                           //Move to back up to top and over 4 every 12 elements
                           if (rowIndex%10 == 0) {
                           rowIndex = 0;
                           step+= 4;
                           }
                           }
                           });
    }

}

function mouseClicked(){
    cursorX = floor(mouseX/64);
    cursorY = floor(mouseY/64);
    console.log(cursorY, cursorX);
    if(rooms[cursorY][cursorX] != null) {
        console.log("splicing");
        rect(cursorX * 64, cursorY * 64, 64, 64);
        rooms[cursorY].splice(cursorX, 1, null);
    }
    }
