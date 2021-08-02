import ColorShape from "../ColorShape";

export default class MergingUtil {

    static mergeNeighbors(shape1, shape2) {
        // let shape1V = [...shape1.vertices];
        // let shape2V = [...shape2.vertices];

        // // remove the last element of each array as this will be the duplicate of the first vertex. Makes it easier to merge
        // shape1V.splice(shape1V.length - 1, 1);
        // shape2V.splice(shape2V.length - 1, 1);

        // // let shape1Map = this.markSharedVertices(shape1V, shape2V);
        // // let shape2Map = this.markSharedVertices(shape2V, shape1V);
     
        // shape1V = this.removeInteriorVertices(shape1V, shape1Map);
        // shape2V = this.removeInteriorVertices(shape2V, shape2Map);
        // let mergedVertices = this.mergeVertices(shape1V, shape2V, shape1Map, shape2Map);

        const shape1Neighbors = shape1.neighbors;
        const shape2Neighbors = shape2.neighbors;
        let mergedNeighbors = shape1Neighbors.concat(shape2Neighbors.filter((neighbor) => shape1Neighbors.indexOf(neighbor) < 0));
    
        mergedNeighbors.splice(mergedNeighbors.indexOf(shape2.seed), 1);
        mergedNeighbors.splice(mergedNeighbors.indexOf(shape1.seed), 1);
        // let mergedShape = new ColorShape("black", mergedVertices, mergedNeighbors, shape1.seed);
        
        return mergedNeighbors;
    }

    static markSharedVertices(shape1Vertices, shape2Vertices) {
        let sharedVertexMap = new Map();
        for(const vertex of shape1Vertices) {
            if (this.isVertexIn(shape2Vertices, vertex)) {
                sharedVertexMap.set(vertex, true);
            } else {
                sharedVertexMap.set(vertex, false);
            }
        }
        return sharedVertexMap;
    }

    static isVertexIn(array, vertex) {
        for(let v of array) {
            if(vertex[0] == v[0] && vertex[1] == v[1]) {
                return true;
            }
        }
        return false;
    }

    static indexOfVertex(array, vertex) {
        for(let i = 0; i < array.length; i++) {
            if (array[i][0] == vertex[0] && array[i][1] == vertex[1]) {
                return i;
            }
        }
        return -1;
    }

    static removeInteriorVertices(shapeVertices, shapeMap) {
        for (let i = 0; i < shapeVertices.length; i++) {
            let beforeIndex = i - 1;
            if (beforeIndex == -1) {
                 beforeIndex += shapeVertices.length;
            }
 
            let afterIndex = i + 1;
            if (afterIndex == shapeVertices.length) {
                afterIndex = 0;
            }
 
            let beforeIsShared = shapeMap.get(shapeVertices[beforeIndex]);
            let afterIsShared = shapeMap.get(shapeVertices[afterIndex]);
 
            if (beforeIsShared && afterIsShared) {
                shapeVertices.splice(i, 1);
                i--;
            }
        }
        return shapeVertices;
    }

    static mergeVertices(shape1Vertices, shape2Vertices, shape1Map, shape2Map) {
        let mergedVertices = [];
        let shape1Index = 0;
        let shape2Index = 0;
        let shapeSelected = 1;
        let start = true;

        const bounded = shape1Vertices.length + shape2Vertices.length;

        for(let i = 0; i < bounded; i++) {
            if (shapeSelected == 1) {
                if (start) {
                    start = false;
                } else {
                    if (shape1Index == 0) {
                        mergedVertices.push(shape1Vertices[0]);
                        return mergedVertices;
                    }
                }
               let vertex = shape1Vertices[shape1Index];
              
               mergedVertices.push(vertex);

               if (shape1Map.get(vertex)) {
                   shapeSelected = 2;
                   shape2Index = this.indexOfVertex(shape2Vertices, vertex) + 1;
                   if (shape2Index >= shape2Vertices.length) {
                        shape2Index = 0;
                   }
               } else {
                   shape1Index++;
                   if (shape1Index >= shape1Vertices.length) {
                        shape1Index = 0;
                   }
               }
           } else {
               let vertex = shape2Vertices[shape2Index];
               mergedVertices.push(vertex);

               if (shape2Map.get(vertex)) {
                   shapeSelected = 1;
                   shape1Index = this.indexOfVertex(shape1Vertices, vertex) + 1;
                   
                   if (shape1Index >= shape1Vertices.length) {
                        shape1Index = 0;
                   }
               } else {
                   shape2Index++;
                   if (shape2Index >= shape2Vertices.length) {
                       shape2Index = 0;
                   }
               }
           } 
       }
       throw new Error("Infinite Loop during merging shapes");
    }
}