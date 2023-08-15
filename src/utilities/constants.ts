import { CircleGeometry, Vector2, Shape, BufferGeometry} from 'three'

export const _MS_IN_A_DAY:number = 86400000
export const _PI:number = 3.14159265359
export const _scale= 0.01;
export const _earthOrginRadius = 6378;
export const _kmScale = 20/6378;
export const _earthRadius = _earthOrginRadius*_kmScale;

export const _timeScale = 240000;

export const _radsPerRevolution = 2 * Math.PI;
export const _secsPerRevolution = 24 * 60 * 60 * 1000;
export const _angularVelocity = _radsPerRevolution / _secsPerRevolution *_timeScale;

export const BLOOM_SCENE = 2
export const windTurbineNumber = 100
export const windTurbineCircle = 50
export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const boundary = new CircleGeometry(windTurbineCircle, windTurbineNumber).rotateX(-Math.PI/2);

export const geometryWidth = 85.276 * 1000 * 0.001,
             geometryHeight = 111 * 1000 * 0.001

export const BoundaryPts = [
    new Vector2(-2, 25),
    new Vector2(12, 25),
    new Vector2(20, 40),
    new Vector2(16, 48),
    new Vector2(-2, 46),
    new Vector2(-12, 40),
    new Vector2(-2, 25),
]

const californiaShape = new Shape(BoundaryPts);       //先画出shape
const spacedPoints = californiaShape.getSpacedPoints( windTurbineNumber );
export const boundaryGeometry = new BufferGeometry().setFromPoints( spacedPoints );
boundaryGeometry.rotateX(-Math.PI/2 )

function get_polygon_centroid(pts) {
    var first = pts[0], last = pts[pts.length-1];
    if (first.x != last.x || first.y != last.y) pts.push(first);
    var twicearea=0,
    x=0, y=0,
    nPts = pts.length,
    p1, p2, f;
    for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
       p1 = pts[i]; p2 = pts[j];
       f = p1.x*p2.y - p2.x*p1.y;
       twicearea += f;          
       x += ( p1.x + p2.x ) * f;
       y += ( p1.y + p2.y ) * f;
    }
    f = twicearea * 3;
    return { x:x/f, y:y/f };
}

export const centroid = get_polygon_centroid(BoundaryPts)
