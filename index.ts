type vec3 = [number, number, number] | Float32Array;

namespace vec3 {
  export type readonly = Iterable<number>;

  export function create() {
    return vec3.of(0, 0, 0);
  }

  export function of(x: number, y: number, z: number): vec3 {
    return [x, y, z];
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

  export function string(vector: vec3.readonly): string;
  export function string([x, y, z]: vec3.readonly) {
    return `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`;
  }
}

export default vec3;
