import ColorShape from "../ColorShape";

export default class MergingUtil {

    static mergeShapes(shape1, shape2) {
        let shape1V = shape1.vertices;
        let shape2V = shape2.vertices;

        let shape1Map = this.markSharedVertices(shape1V);
        let shape2Map = this.markSharedVertices(shape2V);

        shape1V = this.removeInteriorVertices(shape1V, shape1Map);
        shape2V = this.removeInteriorVertices(shape2V, shape2Map);

        let mergedVertices = this.mergeVertices(shape1V, shape2V, shape1Map, shape2Map);

        let shape1Neighbors = shape1.neighbors;
        let shape2Neighbors = shape2.neighbors;
        let mergedNeighbors = shape1Neighbors.concat(shape2Neighbors.filter((neighbor) => shape1Neighbors.indexOf(neighbor) < 0));
        mergedNeighbors = mergedNeighbors.splice(mergedNeighbors.indexOf(shape2.seed), 1);
        let mergedShape = new ColorShape("black", mergedVertices, mergedNeighbors, shape1.seed);

        return mergedShape;
    }

    static markSharedVertices(shapeVertices) {
        let sharedVertexMap = new Map();
        for(const vertex in shapeVertices) {
            if (shapeVertices.includes(vertex)) {
                sharedVertexMap.set(vertex, true);
            } else {
                sharedVertexMap.set(vertex, false);
            }
        }
        return sharedVertexMap;
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
                shapeVertices = shapeVertices.splice(i, 1);
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
        
        while(true) {
           if (shapeSelected == 1) {
               let vertex = shape1Vertices[shape1Index];
               /*if (!mergedVertices.includes(vertex)) {
                   mergedVertices.push(vertex);
               }*/
               mergedVertices.push(vertex);

               if (shape1Map.get(vertex)) {
                   shapeSelected = 2;
                   shape2Index = shape2Vertices.indexOf(vertex);
               } else {
                   shape1Index++;
                   if (shape1Index == shape1Vertices.length) {
                      break;
                   }
               }
           } else {
               let vertex = shape2Vertices[shape2Index];
            //    if (!mergedVertices.includes(vertex)) {
            //        mergedVertices.push(vertex);
            //    }
                mergedVertices.push(vertex);

               if (shape2Map.get(vertex)) {
                   shapeSelected = 2;
                   shape1Index = shape1Vertices.indexOf(vertex);
                   if (shape1Index == 0) {
                       break;
                   }
               } else {
                   shape2Index++;
                   if (shape2Index == shape2Vertices.length) {
                       shape2Index = 0;
                   }
               }
           } 
       }
       return mergedVertices;
    }
}