for (var place of arrayPlaces) {  
        ctx.beginPath();
        ctx.arc(place.posX,place.posY,radius,0,2*Math.PI)
        ctx.fillText(place.name, place.namePositionX, place.namePositionY);
        textWidth = ctx.measureText(place.nTokens).width;
        textHeight = sizeFontName - 5;
        ctx.fillText(place.nTokens, place.posX - textWidth / 2, place.posY + textHeight / 2)
        ctx.closePath();
        ctx.stroke();
}