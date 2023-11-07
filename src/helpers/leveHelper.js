import Tile from "../objects/Tile.js";

export function getTileById(id, position){
    switch(id){
        case 0: 
            return new Tile(position, false);
        case 1:
            return new Tile(position, true);
    }
}