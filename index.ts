type vec3 = [number, number, number] | Float32Array;

namespace vec3 {
  export type readonly = Iterable<number>;

  export function create() {
    return vec3.of(0, 0, 0);
  }

  export function of(x: number, y: number, z: number): vec3 {
    return [x, y, z];
  }

  export function from(value: vec3.readonly): vec3;

  export function from([x, y, z]: vec3.readonly): vec3 {
    return vec3.of(x, y, z);
  }

  export function set(out: vec3, x: number, y: number, z: number) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  export function copy(out: vec3, source: vec3.readonly): vec3;

  export function copy(out: vec3, [x, y, z]: vec3.readonly) {
    return vec3.set(out, x, y, z);
  }

  export function add(out: vec3, a: vec3.readonly, b: vec3.readonly): vec3;

  export function add(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    out[0] = ax + bx;
    out[1] = ay + by;
    out[2] = az + bz;
    return out;
  }

  export function sub(out: vec3, a: vec3.readonly, b: vec3.readonly): vec3;

  export function sub(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    out[0] = ax - bx;
    out[1] = ay - by;
    out[2] = az - bz;
    return out;
  }

  export function mul(out: vec3, a: vec3.readonly, b: vec3.readonly): vec3;

  export function mul(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    out[0] = ax * bx;
    out[1] = ay * by;
    out[2] = az * bz;
    return out;
  }

  export function div(out: vec3, a: vec3.readonly, b: vec3.readonly): vec3;

  export function div(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    out[0] = ax / bx;
    out[1] = ay / by;
    out[2] = az / bz;
    return out;
  }

  export function dot(a: vec3.readonly, b: vec3.readonly): number;

  export function dot(
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    return ax * bx + ay * by + az * bz;
  }

  export function length(vector: vec3.readonly): number;

  export function length([x, y, z]: vec3.readonly) {
    return Math.hypot(x, y, z);
  }

  export function lengthSq(vector: vec3.readonly): number;

  export function lengthSq([x, y, z]: vec3.readonly) {
    return x ** 2 + y ** 2 + z ** 2;
  }

  export function scale(
    out: vec3,
    vector: vec3.readonly,
    scale: number
  ): vec3;

  export function scale(
    out: vec3,
    [x, y, z]: vec3.readonly,
    scale: number
  ) {
    out[0] = x * scale;
    out[1] = y * scale;
    out[2] = z * scale;
    return out;
  }

  export function normalize(out: vec3, vector: vec3.readonly) {
    const r = lengthSq(vector);
    return scale(out, vector, r >= 0 ? 1 / Math.sqrt(r) : 0);
  }

  export function cross(
    out: vec3,
    a: vec3.readonly,
    b: vec3.readonly
  ): vec3;

  export function cross(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly
  ) {
    out[0] = ay * bz - by * az;
    out[1] = az * bx - bz * ax;
    out[2] = ax * by - bx * ay;
    return out;
  }

  function _clamp(x: number, min: number, max: number) {
    return Math.min(max, Math.max(min, x));
  }

  export function clamp(
    out: vec3,
    [x, y, z]: vec3.readonly,
    min: number,
    max: number
  ) {
    out[0] = _clamp(y, min, max);
    out[1] = _clamp(z, min, max);
    out[2] = _clamp(x, min, max);
    return out;
  }

  // https://www.analyzemath.com/stepbystep_mathworksheets/3D_vectors/angle_vectors.png?ezimgfmt=rs:338x165/rscb1/ngcb1/notWebP

  export function angle(a: vec3.readonly, b: vec3.readonly) {
    const mag = length(a) * length(b);
    const cosine = mag && dot(a, b) / mag;
    return Math.acos(_clamp(cosine, -1, 1));
  }

  export function linear(
    out: vec3,
    a: vec3.readonly,
    b: vec3.readonly,
    t: number
  ): vec3;

  export function linear(
    out: vec3,
    [ax, ay, az]: vec3.readonly,
    [bx, by, bz]: vec3.readonly,
    t: number
  ) {
    out[0] = ax + (bx - ax) * t;
    out[1] = ay + (by - ay) * t;
    out[2] = az + (bz - az) * t;
    return out;
  }

  // TODO: export function quadratic(out: vec3, a: vec3.readonly, c: vec3.readonly, d: vec3.readonly, t: number): vec3;
  // TODO: export function cubic( out: vec3, a: vec3.readonly, b: vec3.readonly, c: vec3.readonly, d: vec3.readonly, t: number): vec3

  const EAX = vec3.create();
  const EBX = vec3.create();

  export function each(
    source: number[],
    visit: (
      vector: vec3.readonly,
      source: number[],
      index: number
    ) => void,
    stride = 3,
    offset = 0
  ) {
    for (let i = offset; i < source.length; i += stride) {
      visit(
        vec3.set(EAX, source[i], source[i + 1], source[i + 2]),
        source,
        i
      );
    }
  }

  export function map(
    source: number[],
    map: (
      vector: vec3.readonly,
      out: vec3,
      source: number[],
      index: number
    ) => vec3,
    stride = 3,
    offset = 0,
    clone = true
  ): Iterable<number> {
    if (stride < 3) throw "vec3.map's stride can not be lower than 3.";
    if (offset < 0) throw "vec3.map's offset can not be lower than 0.";
    const result = clone ? source.slice(0) : source;
    for (let i = offset; i < source.length; i += stride) {
      vec3.set(EAX, source[i], source[i + 1], source[i + 2]);
      const [x, y, z] = map(EAX, EBX, source, i);
      result[i] = x;
      result[i + 1] = y;
      result[i + 2] = z;
    }
    return result;
  }

  export function string(vector: vec3.readonly): string;

  export function string([x, y, z]: vec3.readonly) {
    return `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`;
  }
}

export default vec3;
