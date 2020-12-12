var content = $("<div></div>");

var size = 4
var width = 300;
var height = width;
var spacing = 10;

var data = [];

function makeContent() {
    content.addClass("my-content");
    content.width(width);
    content.height(height);
    $("h1").parent().append(content);
}

function makeTiles() {
    var tilesN = size * size - 1;
    var tileW = (width - spacing * (size + 1)) / size;
    var tileH = (height - spacing * (size + 1)) / size;
    for (var j = 0; j < size; j++) {
        data.push([]);
    }
    for (var i = 0; i < tilesN; i += 1) {
        var value = i + 1;
        var tile = $("<div>" + value + "</div>");
        tile.addClass("my-tile");
        content.append(tile);
        tile.width(tileW).height(tileH);
        tile.css("font-size", Math.floor(tileH * 2 / 3) + "px");
        tile.css("line-height", tileH + "px");
        var col = i % size;
        var row = Math.floor(i / size);
        positionTile(tile, col, row, false);
        data[row].push(value);
    }
    data[size - 1].push(0);
    $(".my-tile").click(tileClicked);
}

function positionTile(tile, col, row, smooth) {
    var x = col * (tile.width() + spacing) + spacing;
    var y = row * (tile.height() + spacing) + spacing;
    if (!smooth) {
      tile.css("left", x);
      tile.css("top", y);
    } else {
        tile.animate({
            left: x,
            top: y
        },  700,);
    }
}

function tileClicked(event) {
    var tile = $(event.currentTarget);
    var value = parseInt(tile.text());
    var x, y;
    outer:
    for (y = 0; y < size; y += 1) {
        for (x = 0; x < size; x += 1) {
            if (data[y][x] == value) {
                break outer;
            }
        }

    }
    moveTile(tile, x, y);
}

function moveTile(tile, col , row) {
      var dx = 0;
      var dy = 0;
      if (col > 0 && data[row][col - 1] == 0) {
          dx = -1;
        } else if (col < size - 1 && data[row][col + 1] == 0) {
            dx = 1;
        } else if (row > 0 && data[row - 1][col] == 0) {
          dy = -1;
        }  else if (row < size - 1 && data[row + 1][col] == 0) {
            dy = 1;
        } else {
            return;
        }
        var value = data[row][col];
        data[row + dy][col + dx] = value;
        data[row][col] = 0;
        positionTile(tile, col + dx, row + dy, true);

}


makeContent();
makeTiles();


$.ajax({
  url: "text.txt",
}).done(function(data) {
  console.log();
});
