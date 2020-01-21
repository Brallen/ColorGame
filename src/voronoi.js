import { Delaunay } from 'd3-delaunay';
import RNGUtil from './RNGUtil';

function generatePoints(count, width, height) {
  const points = [];

  for (let i = 0; i < count; i++) {
    points.push([ RNGUtil.randInRange(0, width), RNGUtil.randInRange(0, height) ]);
  }

  return points;
}

// PATCH: Fixes issues with view port boundaries not being considered in calculation of neighbors
function trueNeighbors(voronoi, points, i) {
  const n = new Set();
  const ai = new Set((voronoi.cellPolygon(i) || []).map(String));
  for (const j of voronoi.delaunay.neighbors(i))
    for (const c of voronoi.cellPolygon(j) || [])
      if (ai.has(String(c))) n.add(j);
  return [...n].map((value) => {
    return points[value];
  });
}

export function getVoronoiData(count, width, height) {
  const points = generatePoints(count, width, height);
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  const cellPolygons = [];
  for (let i = 0; i < count; i++) {
    console.log('Cell: ', points[i], 'neighbors: ', trueNeighbors(voronoi, points, i));
    cellPolygons.push({
      cell: voronoi.cellPolygon(i),
      neighbors: trueNeighbors(voronoi, points, i)
    });
  }

  return cellPolygons;
}