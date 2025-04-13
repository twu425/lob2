import {
  E as h,
  U as qe,
  T as se,
  $ as L,
  M as U,
  _ as Ne,
  k as me,
  w as O,
  p as F,
  P as Qe,
  F as xe,
  O as G,
  a0 as Y,
  a1 as Je,
  a2 as k,
  S as _e,
  y,
  a3 as Ze,
  a4 as be,
  a5 as et,
  a6 as Te,
  b as tt,
  a7 as rt,
  a8 as st,
  a9 as at,
  aa as j,
  ab as K,
  D as ye,
  o as A,
  R as ae,
  X as it,
  ac as nt,
  ad as ie,
  s as ne,
  e as v,
  ae as ot,
} from "./index-C-OVggYW.js";
import {
  U as D,
  T as P,
  R as X,
  h as q,
  S as Se,
  c as ve,
  i as we,
  d as lt,
  r as Ce,
  n as ct,
  m as Be,
  a as ut,
  g as dt,
  j as ht,
  k as pt,
  B as Me,
} from "./colorToUniform-lteTeJk6.js";
import { g as ft } from "./getBatchSamplersUniformGroup-DdN_XinD.js";
class Pe {
  static init(e) {
    Object.defineProperty(this, "resizeTo", {
      set(t) {
        globalThis.removeEventListener("resize", this.queueResize),
          (this._resizeTo = t),
          t &&
            (globalThis.addEventListener("resize", this.queueResize),
            this.resize());
      },
      get() {
        return this._resizeTo;
      },
    }),
      (this.queueResize = () => {
        this._resizeTo &&
          (this._cancelResize(),
          (this._resizeId = requestAnimationFrame(() => this.resize())));
      }),
      (this._cancelResize = () => {
        this._resizeId &&
          (cancelAnimationFrame(this._resizeId), (this._resizeId = null));
      }),
      (this.resize = () => {
        if (!this._resizeTo) return;
        this._cancelResize();
        let t, r;
        if (this._resizeTo === globalThis.window)
          (t = globalThis.innerWidth), (r = globalThis.innerHeight);
        else {
          const { clientWidth: s, clientHeight: i } = this._resizeTo;
          (t = s), (r = i);
        }
        this.renderer.resize(t, r), this.render();
      }),
      (this._resizeId = null),
      (this._resizeTo = null),
      (this.resizeTo = e.resizeTo || null);
  }
  static destroy() {
    globalThis.removeEventListener("resize", this.queueResize),
      this._cancelResize(),
      (this._cancelResize = null),
      (this.queueResize = null),
      (this.resizeTo = null),
      (this.resize = null);
  }
}
Pe.extension = h.Application;
class Re {
  static init(e) {
    (e = Object.assign({ autoStart: !0, sharedTicker: !1 }, e)),
      Object.defineProperty(this, "ticker", {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this),
            (this._ticker = t),
            t && t.add(this.render, this, qe.LOW);
        },
        get() {
          return this._ticker;
        },
      }),
      (this.stop = () => {
        this._ticker.stop();
      }),
      (this.start = () => {
        this._ticker.start();
      }),
      (this._ticker = null),
      (this.ticker = e.sharedTicker ? se.shared : new se()),
      e.autoStart && this.start();
  }
  static destroy() {
    if (this._ticker) {
      const e = this._ticker;
      (this.ticker = null), e.destroy();
    }
  }
}
Re.extension = h.Application;
class Ue {
  constructor(e) {
    this._renderer = e;
  }
  push(e, t, r) {
    this._renderer.renderPipes.batch.break(r),
      r.add({
        renderPipeId: "filter",
        canBundle: !1,
        action: "pushFilter",
        container: t,
        filterEffect: e,
      });
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r),
      r.add({ renderPipeId: "filter", action: "popFilter", canBundle: !1 });
  }
  execute(e) {
    e.action === "pushFilter"
      ? this._renderer.filter.push(e)
      : e.action === "popFilter" && this._renderer.filter.pop();
  }
  destroy() {
    this._renderer = null;
  }
}
Ue.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "filter",
};
const gt = new U();
function mt(a, e) {
  return (
    e.clear(),
    ke(a, e),
    e.isValid || e.set(0, 0, 0, 0),
    a.renderGroup
      ? e.applyMatrix(a.renderGroup.localTransform)
      : e.applyMatrix(a.parentRenderGroup.worldTransform),
    e
  );
}
function ke(a, e) {
  if (a.localDisplayStatus !== 7 || !a.measurable) return;
  const t = !!a.effects.length;
  let r = e;
  if (((a.renderGroup || t) && (r = L.get().clear()), a.boundsArea))
    e.addRect(a.boundsArea, a.worldTransform);
  else {
    if (a.renderPipeId) {
      const i = a.bounds;
      r.addFrame(i.minX, i.minY, i.maxX, i.maxY, a.groupTransform);
    }
    const s = a.children;
    for (let i = 0; i < s.length; i++) ke(s[i], r);
  }
  if (t) {
    let s = !1;
    for (let i = 0; i < a.effects.length; i++)
      a.effects[i].addBounds &&
        (s || ((s = !0), r.applyMatrix(a.parentRenderGroup.worldTransform)),
        a.effects[i].addBounds(r, !0));
    s &&
      (r.applyMatrix(a.parentRenderGroup.worldTransform.copyTo(gt).invert()),
      e.addBounds(r, a.relativeGroupTransform)),
      e.addBounds(r),
      L.return(r);
  } else
    a.renderGroup && (e.addBounds(r, a.relativeGroupTransform), L.return(r));
}
function xt(a, e) {
  e.clear();
  const t = e.matrix;
  for (let r = 0; r < a.length; r++) {
    const s = a[r];
    s.globalDisplayStatus < 7 ||
      ((e.matrix = s.worldTransform), s.addBounds(e));
  }
  return (e.matrix = t), e;
}
const _t = new Ne({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      location: 0,
      format: "float32x2",
      stride: 2 * 4,
      offset: 0,
    },
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3]),
});
class Fe {
  constructor(e) {
    (this._filterStackIndex = 0),
      (this._filterStack = []),
      (this._filterGlobalUniforms = new D({
        uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
        uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
        uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
        uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
        uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
        uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" },
      })),
      (this._globalFilterBindGroup = new me({})),
      (this.renderer = e);
  }
  get activeBackTexture() {
    var e;
    return (e = this._activeFilterData) == null ? void 0 : e.backTexture;
  }
  push(e) {
    var f;
    const t = this.renderer,
      r = e.filterEffect.filters;
    this._filterStack[this._filterStackIndex] ||
      (this._filterStack[this._filterStackIndex] = this._getFilterData());
    const s = this._filterStack[this._filterStackIndex];
    if ((this._filterStackIndex++, r.length === 0)) {
      s.skip = !0;
      return;
    }
    const i = s.bounds;
    e.renderables
      ? xt(e.renderables, i)
      : e.filterEffect.filterArea
      ? (i.clear(),
        i.addRect(e.filterEffect.filterArea),
        i.applyMatrix(e.container.worldTransform))
      : mt(e.container, i);
    const n = t.renderTarget.rootRenderTarget.colorTexture.source;
    let o = n._resolution,
      l = 0,
      c = n.antialias,
      u = !1,
      d = !1;
    for (let _ = 0; _ < r.length; _++) {
      const p = r[_];
      if (
        ((o = Math.min(o, p.resolution)),
        (l += p.padding),
        p.antialias !== "inherit" &&
          (p.antialias === "on" ? (c = !0) : (c = !1)),
        !!!(p.compatibleRenderers & t.type))
      ) {
        d = !1;
        break;
      }
      if (
        p.blendRequired &&
        !(((f = t.backBuffer) == null ? void 0 : f.useBackBuffer) ?? !0)
      ) {
        O(
          "Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."
        ),
          (d = !1);
        break;
      }
      (d = p.enabled || d), (u = u || p.blendRequired);
    }
    if (!d) {
      s.skip = !0;
      return;
    }
    const g = t.renderTarget.rootViewPort;
    if (
      (i
        .scale(o)
        .fitBounds(0, g.width, 0, g.height)
        .scale(1 / o)
        .pad(l)
        .ceil(),
      !i.isPositive)
    ) {
      s.skip = !0;
      return;
    }
    (s.skip = !1),
      (s.bounds = i),
      (s.blendRequired = u),
      (s.container = e.container),
      (s.filterEffect = e.filterEffect),
      (s.previousRenderSurface = t.renderTarget.renderSurface),
      (s.inputTexture = P.getOptimalTexture(i.width, i.height, o, c)),
      t.renderTarget.bind(s.inputTexture, !0),
      t.globalUniforms.push({ offset: i });
  }
  pop() {
    const e = this.renderer;
    this._filterStackIndex--;
    const t = this._filterStack[this._filterStackIndex];
    if (t.skip) return;
    this._activeFilterData = t;
    const r = t.inputTexture,
      s = t.bounds;
    let i = F.EMPTY;
    if ((e.renderTarget.finishRenderPass(), t.blendRequired)) {
      const o =
          this._filterStackIndex > 0
            ? this._filterStack[this._filterStackIndex - 1].bounds
            : null,
        l = e.renderTarget.getRenderTarget(t.previousRenderSurface);
      i = this.getBackTexture(l, s, o);
    }
    t.backTexture = i;
    const n = t.filterEffect.filters;
    if (
      (this._globalFilterBindGroup.setResource(r.source.style, 2),
      this._globalFilterBindGroup.setResource(i.source, 3),
      e.globalUniforms.pop(),
      n.length === 1)
    )
      n[0].apply(this, r, t.previousRenderSurface, !1), P.returnTexture(r);
    else {
      let o = t.inputTexture,
        l = P.getOptimalTexture(s.width, s.height, o.source._resolution, !1),
        c = 0;
      for (c = 0; c < n.length - 1; ++c) {
        n[c].apply(this, o, l, !0);
        const d = o;
        (o = l), (l = d);
      }
      n[c].apply(this, o, t.previousRenderSurface, !1),
        P.returnTexture(o),
        P.returnTexture(l);
    }
    t.blendRequired && P.returnTexture(i);
  }
  getBackTexture(e, t, r) {
    const s = e.colorTexture.source._resolution,
      i = P.getOptimalTexture(t.width, t.height, s, !1);
    let n = t.minX,
      o = t.minY;
    r && ((n -= r.minX), (o -= r.minY)),
      (n = Math.floor(n * s)),
      (o = Math.floor(o * s));
    const l = Math.ceil(t.width * s),
      c = Math.ceil(t.height * s);
    return (
      this.renderer.renderTarget.copyToTexture(
        e,
        i,
        { x: n, y: o },
        { width: l, height: c },
        { x: 0, y: 0 }
      ),
      i
    );
  }
  applyFilter(e, t, r, s) {
    const i = this.renderer,
      n = this._filterStack[this._filterStackIndex],
      o = n.bounds,
      l = Qe.shared,
      u = n.previousRenderSurface === r;
    let d =
        this.renderer.renderTarget.rootRenderTarget.colorTexture.source
          ._resolution,
      g = this._filterStackIndex - 1;
    for (; g > 0 && this._filterStack[g].skip; ) --g;
    g > 0 && (d = this._filterStack[g].inputTexture.source._resolution);
    const f = this._filterGlobalUniforms,
      _ = f.uniforms,
      p = _.uOutputFrame,
      x = _.uInputSize,
      m = _.uInputPixel,
      T = _.uInputClamp,
      b = _.uGlobalFrame,
      B = _.uOutputTexture;
    if (u) {
      let M = this._filterStackIndex;
      for (; M > 0; ) {
        M--;
        const C = this._filterStack[this._filterStackIndex - 1];
        if (!C.skip) {
          (l.x = C.bounds.minX), (l.y = C.bounds.minY);
          break;
        }
      }
      (p[0] = o.minX - l.x), (p[1] = o.minY - l.y);
    } else (p[0] = 0), (p[1] = 0);
    (p[2] = t.frame.width),
      (p[3] = t.frame.height),
      (x[0] = t.source.width),
      (x[1] = t.source.height),
      (x[2] = 1 / x[0]),
      (x[3] = 1 / x[1]),
      (m[0] = t.source.pixelWidth),
      (m[1] = t.source.pixelHeight),
      (m[2] = 1 / m[0]),
      (m[3] = 1 / m[1]),
      (T[0] = 0.5 * m[2]),
      (T[1] = 0.5 * m[3]),
      (T[2] = t.frame.width * x[2] - 0.5 * m[2]),
      (T[3] = t.frame.height * x[3] - 0.5 * m[3]);
    const w = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    (b[0] = l.x * d),
      (b[1] = l.y * d),
      (b[2] = w.source.width * d),
      (b[3] = w.source.height * d);
    const R = this.renderer.renderTarget.getRenderTarget(r);
    if (
      (i.renderTarget.bind(r, !!s),
      r instanceof F
        ? ((B[0] = r.frame.width), (B[1] = r.frame.height))
        : ((B[0] = R.width), (B[1] = R.height)),
      (B[2] = R.isRoot ? -1 : 1),
      f.update(),
      i.renderPipes.uniformBatch)
    ) {
      const M = i.renderPipes.uniformBatch.getUboResource(f);
      this._globalFilterBindGroup.setResource(M, 0);
    } else this._globalFilterBindGroup.setResource(f, 0);
    this._globalFilterBindGroup.setResource(t.source, 1),
      this._globalFilterBindGroup.setResource(t.source.style, 2),
      (e.groups[0] = this._globalFilterBindGroup),
      i.encoder.draw({
        geometry: _t,
        shader: e,
        state: e._state,
        topology: "triangle-list",
      }),
      i.type === X.WEBGL && i.renderTarget.finishRenderPass();
  }
  _getFilterData() {
    return {
      skip: !1,
      inputTexture: null,
      bounds: new xe(),
      container: null,
      filterEffect: null,
      blendRequired: !1,
      previousRenderSurface: null,
    };
  }
  calculateSpriteMatrix(e, t) {
    const r = this._activeFilterData,
      s = e.set(
        r.inputTexture._source.width,
        0,
        0,
        r.inputTexture._source.height,
        r.bounds.minX,
        r.bounds.minY
      ),
      i = t.worldTransform.copyTo(U.shared);
    return (
      i.invert(),
      s.prepend(i),
      s.scale(1 / t.texture.frame.width, 1 / t.texture.frame.height),
      s.translate(t.anchor.x, t.anchor.y),
      s
    );
  }
}
Fe.extension = { type: [h.WebGLSystem, h.WebGPUSystem], name: "filter" };
function bt(a) {
  const e = a._stroke,
    t = a._fill,
    s = [
      `div { ${[
        `color: ${G.shared.setValue(t.color).toHex()}`,
        `font-size: ${a.fontSize}px`,
        `font-family: ${a.fontFamily}`,
        `font-weight: ${a.fontWeight}`,
        `font-style: ${a.fontStyle}`,
        `font-variant: ${a.fontVariant}`,
        `letter-spacing: ${a.letterSpacing}px`,
        `text-align: ${a.align}`,
        `padding: ${a.padding}px`,
        `white-space: ${
          a.whiteSpace === "pre" && a.wordWrap ? "pre-wrap" : a.whiteSpace
        }`,
        ...(a.lineHeight ? [`line-height: ${a.lineHeight}px`] : []),
        ...(a.wordWrap
          ? [
              `word-wrap: ${a.breakWords ? "break-all" : "break-word"}`,
              `max-width: ${a.wordWrapWidth}px`,
            ]
          : []),
        ...(e ? [Ae(e)] : []),
        ...(a.dropShadow ? [Ge(a.dropShadow)] : []),
        ...a.cssOverrides,
      ].join(";")} }`,
    ];
  return Tt(a.tagStyles, s), s.join(" ");
}
function Ge(a) {
  const e = G.shared.setValue(a.color).setAlpha(a.alpha).toHexa(),
    t = Math.round(Math.cos(a.angle) * a.distance),
    r = Math.round(Math.sin(a.angle) * a.distance),
    s = `${t}px ${r}px`;
  return a.blur > 0
    ? `text-shadow: ${s} ${a.blur}px ${e}`
    : `text-shadow: ${s} ${e}`;
}
function Ae(a) {
  return [
    `-webkit-text-stroke-width: ${a.width}px`,
    `-webkit-text-stroke-color: ${G.shared.setValue(a.color).toHex()}`,
    `text-stroke-width: ${a.width}px`,
    `text-stroke-color: ${G.shared.setValue(a.color).toHex()}`,
    "paint-order: stroke",
  ].join(";");
}
const oe = {
    fontSize: "font-size: {{VALUE}}px",
    fontFamily: "font-family: {{VALUE}}",
    fontWeight: "font-weight: {{VALUE}}",
    fontStyle: "font-style: {{VALUE}}",
    fontVariant: "font-variant: {{VALUE}}",
    letterSpacing: "letter-spacing: {{VALUE}}px",
    align: "text-align: {{VALUE}}",
    padding: "padding: {{VALUE}}px",
    whiteSpace: "white-space: {{VALUE}}",
    lineHeight: "line-height: {{VALUE}}px",
    wordWrapWidth: "max-width: {{VALUE}}px",
  },
  le = {
    fill: (a) => `color: ${G.shared.setValue(a).toHex()}`,
    breakWords: (a) => `word-wrap: ${a ? "break-all" : "break-word"}`,
    stroke: Ae,
    dropShadow: Ge,
  };
function Tt(a, e) {
  for (const t in a) {
    const r = a[t],
      s = [];
    for (const i in r)
      le[i]
        ? s.push(le[i](r[i]))
        : oe[i] && s.push(oe[i].replace("{{VALUE}}", r[i]));
    e.push(`${t} { ${s.join(";")} }`);
  }
}
class N extends Y {
  constructor(e = {}) {
    super(e),
      (this._cssOverrides = []),
      this.cssOverrides ?? (this.cssOverrides = e.cssOverrides),
      (this.tagStyles = e.tagStyles ?? {});
  }
  set cssOverrides(e) {
    (this._cssOverrides = e instanceof Array ? e : [e]), this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    return (
      (this._styleKey = Je(this) + this._cssOverrides.join("-")), this._styleKey
    );
  }
  update() {
    (this._cssStyle = null), super.update();
  }
  clone() {
    return new N({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides,
    });
  }
  get cssStyle() {
    return this._cssStyle || (this._cssStyle = bt(this)), this._cssStyle;
  }
  addOverride(...e) {
    const t = e.filter((r) => !this.cssOverrides.includes(r));
    t.length > 0 && (this.cssOverrides.push(...t), this.update());
  }
  removeOverride(...e) {
    const t = e.filter((r) => this.cssOverrides.includes(r));
    t.length > 0 &&
      ((this.cssOverrides = this.cssOverrides.filter((r) => !t.includes(r))),
      this.update());
  }
  set fill(e) {
    typeof e != "string" &&
      typeof e != "number" &&
      O("[HTMLTextStyle] only color fill is not supported by HTMLText"),
      (super.fill = e);
  }
  set stroke(e) {
    e &&
      typeof e != "string" &&
      typeof e != "number" &&
      O("[HTMLTextStyle] only color stroke is not supported by HTMLText"),
      (super.stroke = e);
  }
}
const ce = "http://www.w3.org/2000/svg",
  ue = "http://www.w3.org/1999/xhtml";
class De {
  constructor() {
    (this.svgRoot = document.createElementNS(ce, "svg")),
      (this.foreignObject = document.createElementNS(ce, "foreignObject")),
      (this.domElement = document.createElementNS(ue, "div")),
      (this.styleElement = document.createElementNS(ue, "style")),
      (this.image = new Image());
    const {
      foreignObject: e,
      svgRoot: t,
      styleElement: r,
      domElement: s,
    } = this;
    e.setAttribute("width", "10000"),
      e.setAttribute("height", "10000"),
      (e.style.overflow = "hidden"),
      t.appendChild(e),
      e.appendChild(r),
      e.appendChild(s);
  }
}
let de;
function yt(a, e, t, r) {
  r = r || de || (de = new De());
  const { domElement: s, styleElement: i, svgRoot: n } = r;
  (s.innerHTML = `<style>${e.cssStyle}</style><div>${a}</div>`),
    s.setAttribute(
      "style",
      "transform-origin: top left; display: inline-block"
    ),
    t && (i.textContent = t),
    document.body.appendChild(n);
  const o = s.getBoundingClientRect();
  n.remove();
  const l = k.measureFont(e.fontStyle).descent;
  return { width: o.width, height: o.height + l };
}
class ze {
  constructor(e, t) {
    (this.state = _e.for2d()),
      (this._graphicsBatchesHash = Object.create(null)),
      (this.renderer = e),
      (this._adaptor = t),
      this._adaptor.init();
  }
  validateRenderable(e) {
    const t = e.context,
      r = !!this._graphicsBatchesHash[e.uid],
      s = this.renderer.graphicsContext.updateGpuContext(t);
    return !!(s.isBatchable || r !== s.isBatchable);
  }
  addRenderable(e, t) {
    const r = this.renderer.graphicsContext.updateGpuContext(e.context);
    e._didGraphicsUpdate && ((e._didGraphicsUpdate = !1), this._rebuild(e)),
      r.isBatchable
        ? this._addToBatcher(e, t)
        : (this.renderer.renderPipes.batch.break(t), t.add(e));
  }
  updateRenderable(e) {
    const t = this._graphicsBatchesHash[e.uid];
    if (t)
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        s.batcher.updateElement(s);
      }
  }
  destroyRenderable(e) {
    this._graphicsBatchesHash[e.uid] && this._removeBatchForRenderable(e.uid);
  }
  execute(e) {
    if (!e.isRenderable) return;
    const t = this.renderer,
      r = e.context;
    if (!t.graphicsContext.getGpuContext(r).batches.length) return;
    const i = r.customShader || this._adaptor.shader;
    this.state.blendMode = e.groupBlendMode;
    const n = i.resources.localUniforms.uniforms;
    (n.uTransformMatrix = e.groupTransform),
      (n.uRound = t._roundPixels | e._roundPixels),
      q(e.groupColorAlpha, n.uColor, 0),
      this._adaptor.execute(this, e);
  }
  _rebuild(e) {
    const t = !!this._graphicsBatchesHash[e.uid],
      r = this.renderer.graphicsContext.updateGpuContext(e.context);
    t && this._removeBatchForRenderable(e.uid),
      r.isBatchable && this._initBatchesForRenderable(e),
      (e.batched = r.isBatchable);
  }
  _addToBatcher(e, t) {
    const r = this.renderer.renderPipes.batch,
      s = this._getBatchesForRenderable(e);
    for (let i = 0; i < s.length; i++) {
      const n = s[i];
      r.addToBatch(n, t);
    }
  }
  _getBatchesForRenderable(e) {
    return (
      this._graphicsBatchesHash[e.uid] || this._initBatchesForRenderable(e)
    );
  }
  _initBatchesForRenderable(e) {
    const t = e.context,
      r = this.renderer.graphicsContext.getGpuContext(t),
      s = this.renderer._roundPixels | e._roundPixels,
      i = r.batches.map((n) => {
        const o = y.get(Ze);
        return n.copyTo(o), (o.renderable = e), (o.roundPixels = s), o;
      });
    return (
      this._graphicsBatchesHash[e.uid] === void 0 &&
        e.on("destroyed", () => {
          this.destroyRenderable(e);
        }),
      (this._graphicsBatchesHash[e.uid] = i),
      i
    );
  }
  _removeBatchForRenderable(e) {
    this._graphicsBatchesHash[e].forEach((t) => {
      y.return(t);
    }),
      (this._graphicsBatchesHash[e] = null);
  }
  destroy() {
    (this.renderer = null),
      this._adaptor.destroy(),
      (this._adaptor = null),
      (this.state = null);
    for (const e in this._graphicsBatchesHash)
      this._removeBatchForRenderable(e);
    this._graphicsBatchesHash = null;
  }
}
ze.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "graphics",
};
class Q {
  constructor() {
    (this.batcher = null),
      (this.batch = null),
      (this.roundPixels = 0),
      (this._uvUpdateId = -1),
      (this._textureMatrixUpdateId = -1);
  }
  get blendMode() {
    return this.mesh.groupBlendMode;
  }
  reset() {
    (this.mesh = null),
      (this.texture = null),
      (this.batcher = null),
      (this.batch = null);
  }
  packIndex(e, t, r) {
    const s = this.geometry.indices;
    for (let i = 0; i < s.length; i++) e[t++] = s[i] + r;
  }
  packAttributes(e, t, r, s) {
    const i = this.mesh,
      n = this.geometry,
      o = i.groupTransform,
      l = (s << 16) | (this.roundPixels & 65535),
      c = o.a,
      u = o.b,
      d = o.c,
      g = o.d,
      f = o.tx,
      _ = o.ty,
      p = n.positions,
      x = n.getBuffer("aUV"),
      m = x.data;
    let T = m;
    const b = this.texture.textureMatrix;
    b.isSimple ||
      ((T = this._transformedUvs),
      (this._textureMatrixUpdateId !== b._updateID ||
        this._uvUpdateId !== x._updateID) &&
        ((!T || T.length < m.length) &&
          (T = this._transformedUvs = new Float32Array(m.length)),
        (this._textureMatrixUpdateId = b._updateID),
        (this._uvUpdateId = x._updateID),
        b.multiplyUvs(m, T)));
    const B = i.groupColorAlpha;
    for (let w = 0; w < p.length; w += 2) {
      const R = p[w],
        M = p[w + 1];
      (e[r] = c * R + d * M + f),
        (e[r + 1] = u * R + g * M + _),
        (e[r + 2] = T[w]),
        (e[r + 3] = T[w + 1]),
        (t[r + 4] = B),
        (t[r + 5] = l),
        (r += 6);
    }
  }
  get vertexSize() {
    return this.geometry.positions.length / 2;
  }
  get indexSize() {
    return this.geometry.indices.length;
  }
}
class He {
  constructor(e, t) {
    (this.localUniforms = new D({
      uTransformMatrix: { value: new U(), type: "mat3x3<f32>" },
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uRound: { value: 0, type: "f32" },
    })),
      (this.localUniformsBindGroup = new me({ 0: this.localUniforms })),
      (this._meshDataHash = Object.create(null)),
      (this._gpuBatchableMeshHash = Object.create(null)),
      (this.renderer = e),
      (this._adaptor = t),
      this._adaptor.init();
  }
  validateRenderable(e) {
    const t = this._getMeshData(e),
      r = t.batched,
      s = e.batched;
    if (((t.batched = s), r !== s)) return !0;
    if (s) {
      const i = e._geometry;
      if (
        i.indices.length !== t.indexSize ||
        i.positions.length !== t.vertexSize
      )
        return (
          (t.indexSize = i.indices.length),
          (t.vertexSize = i.positions.length),
          !0
        );
      const n = this._getBatchableMesh(e),
        o = e.texture;
      if (n.texture._source !== o._source && n.texture._source !== o._source)
        return !n.batcher.checkAndUpdateTexture(n, o);
    }
    return !1;
  }
  addRenderable(e, t) {
    const r = this.renderer.renderPipes.batch,
      { batched: s } = this._getMeshData(e);
    if (s) {
      const i = this._getBatchableMesh(e);
      (i.texture = e._texture), (i.geometry = e._geometry), r.addToBatch(i);
    } else r.break(t), t.add({ renderPipeId: "mesh", mesh: e });
  }
  updateRenderable(e) {
    if (e.batched) {
      const t = this._gpuBatchableMeshHash[e.uid];
      (t.texture = e._texture),
        (t.geometry = e._geometry),
        t.batcher.updateElement(t);
    }
  }
  destroyRenderable(e) {
    this._meshDataHash[e.uid] = null;
    const t = this._gpuBatchableMeshHash[e.uid];
    t && (y.return(t), (this._gpuBatchableMeshHash[e.uid] = null));
  }
  execute({ mesh: e }) {
    if (!e.isRenderable) return;
    e.state.blendMode = be(e.groupBlendMode, e.texture._source);
    const t = this.localUniforms;
    (t.uniforms.uTransformMatrix = e.groupTransform),
      (t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels),
      t.update(),
      q(e.groupColorAlpha, t.uniforms.uColor, 0),
      this._adaptor.execute(this, e);
  }
  _getMeshData(e) {
    return this._meshDataHash[e.uid] || this._initMeshData(e);
  }
  _initMeshData(e) {
    var t, r;
    return (
      (this._meshDataHash[e.uid] = {
        batched: e.batched,
        indexSize: (t = e._geometry.indices) == null ? void 0 : t.length,
        vertexSize: (r = e._geometry.positions) == null ? void 0 : r.length,
      }),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      this._meshDataHash[e.uid]
    );
  }
  _getBatchableMesh(e) {
    return this._gpuBatchableMeshHash[e.uid] || this._initBatchableMesh(e);
  }
  _initBatchableMesh(e) {
    const t = y.get(Q);
    return (
      (t.mesh = e),
      (t.texture = e._texture),
      (t.roundPixels = this.renderer._roundPixels | e._roundPixels),
      (this._gpuBatchableMeshHash[e.uid] = t),
      (t.mesh = e),
      t
    );
  }
  destroy() {
    for (const e in this._gpuBatchableMeshHash)
      this._gpuBatchableMeshHash[e] && y.return(this._gpuBatchableMeshHash[e]);
    (this._gpuBatchableMeshHash = null),
      (this._meshDataHash = null),
      (this.localUniforms = null),
      (this.localUniformsBindGroup = null),
      this._adaptor.destroy(),
      (this._adaptor = null),
      (this.renderer = null);
  }
}
He.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "mesh",
};
class Oe {
  constructor(e) {
    (this._gpuSpriteHash = Object.create(null)), (this._renderer = e);
  }
  addRenderable(e, t) {
    const r = this._getGpuSprite(e);
    e._didSpriteUpdate && this._updateBatchableSprite(e, r),
      this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    e._didSpriteUpdate && this._updateBatchableSprite(e, t),
      t.batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = e._texture,
      r = this._getGpuSprite(e);
    return r.texture._source !== t._source
      ? !r.batcher.checkAndUpdateTexture(r, t)
      : !1;
  }
  destroyRenderable(e) {
    const t = this._gpuSpriteHash[e.uid];
    y.return(t), (this._gpuSpriteHash[e.uid] = null);
  }
  _updateBatchableSprite(e, t) {
    (e._didSpriteUpdate = !1), t.geometry.update(e), (t.texture = e._texture);
  }
  _getGpuSprite(e) {
    return this._gpuSpriteHash[e.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = new Q();
    return (
      (t.geometry = new et()),
      (t.mesh = e),
      (t.texture = e._texture),
      (t.roundPixels = this._renderer._roundPixels | e._roundPixels),
      (this._gpuSpriteHash[e.uid] = t),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      t
    );
  }
  destroy() {
    for (const e in this._gpuSpriteHash)
      this._gpuSpriteHash[e].geometry.destroy();
    (this._gpuSpriteHash = null), (this._renderer = null);
  }
}
Oe.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "nineSliceSprite",
};
const St = {
    name: "tiling-bit",
    vertex: {
      header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
      main: `
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `,
    },
    fragment: {
      header: `
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,
      main: `

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `,
    },
  },
  vt = {
    name: "tiling-bit",
    vertex: {
      header: `
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `,
      main: `
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `,
    },
    fragment: {
      header: `
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,
      main: `

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `,
    },
  };
let I, E;
class wt extends Se {
  constructor() {
    I ?? (I = ve({ name: "tiling-sprite-shader", bits: [lt, St, Ce] })),
      E ?? (E = we({ name: "tiling-sprite-shader", bits: [ct, vt, Be] }));
    const e = new D({
      uMapCoord: { value: new U(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new U(), type: "mat3x3<f32>" },
      uSizeAnchor: {
        value: new Float32Array([100, 100, 0.5, 0.5]),
        type: "vec4<f32>",
      },
    });
    super({
      glProgram: E,
      gpuProgram: I,
      resources: {
        localUniforms: new D({
          uTransformMatrix: { value: new U(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" },
        }),
        tilingUniforms: e,
        uTexture: F.EMPTY.source,
        uSampler: F.EMPTY.source.style,
      },
    });
  }
  updateUniforms(e, t, r, s, i, n) {
    const o = this.resources.tilingUniforms,
      l = n.width,
      c = n.height,
      u = n.textureMatrix,
      d = o.uniforms.uTextureTransform;
    d.set(
      (r.a * l) / e,
      (r.b * l) / t,
      (r.c * c) / e,
      (r.d * c) / t,
      r.tx / e,
      r.ty / t
    ),
      d.invert(),
      (o.uniforms.uMapCoord = u.mapCoord),
      (o.uniforms.uClampFrame = u.uClampFrame),
      (o.uniforms.uClampOffset = u.uClampOffset),
      (o.uniforms.uTextureTransform = d),
      (o.uniforms.uSizeAnchor[0] = e),
      (o.uniforms.uSizeAnchor[1] = t),
      (o.uniforms.uSizeAnchor[2] = s),
      (o.uniforms.uSizeAnchor[3] = i),
      n &&
        ((this.resources.uTexture = n.source),
        (this.resources.uSampler = n.source.style));
  }
}
class Ct extends Te {
  constructor() {
    super({
      positions: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      uvs: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
    });
  }
}
function Bt(a, e) {
  const t = a.anchor.x,
    r = a.anchor.y;
  (e[0] = -t * a.width),
    (e[1] = -r * a.height),
    (e[2] = (1 - t) * a.width),
    (e[3] = -r * a.height),
    (e[4] = (1 - t) * a.width),
    (e[5] = (1 - r) * a.height),
    (e[6] = -t * a.width),
    (e[7] = (1 - r) * a.height);
}
function Mt(a, e, t, r) {
  let s = 0;
  const i = a.length / e,
    n = r.a,
    o = r.b,
    l = r.c,
    c = r.d,
    u = r.tx,
    d = r.ty;
  for (t *= e; s < i; ) {
    const g = a[t],
      f = a[t + 1];
    (a[t] = n * g + l * f + u), (a[t + 1] = o * g + c * f + d), (t += e), s++;
  }
}
function Pt(a, e) {
  const t = a.texture,
    r = t.frame.width,
    s = t.frame.height;
  let i = 0,
    n = 0;
  a._applyAnchorToTexture && ((i = a.anchor.x), (n = a.anchor.y)),
    (e[0] = e[6] = -i),
    (e[2] = e[4] = 1 - i),
    (e[1] = e[3] = -n),
    (e[5] = e[7] = 1 - n);
  const o = U.shared;
  o.copyFrom(a._tileTransform.matrix),
    (o.tx /= a.width),
    (o.ty /= a.height),
    o.invert(),
    o.scale(a.width / r, a.height / s),
    Mt(e, 2, 0, o);
}
const z = new Ct();
class We {
  constructor(e) {
    (this._state = _e.default2d),
      (this._tilingSpriteDataHash = Object.create(null)),
      (this._renderer = e);
  }
  validateRenderable(e) {
    const t = this._getTilingSpriteData(e),
      r = t.canBatch;
    this._updateCanBatch(e);
    const s = t.canBatch;
    if (s && s === r) {
      const { batchableMesh: i } = t;
      if (i && i.texture._source !== e.texture._source)
        return !i.batcher.checkAndUpdateTexture(i, e.texture);
    }
    return r !== s;
  }
  addRenderable(e, t) {
    const r = this._renderer.renderPipes.batch;
    this._updateCanBatch(e);
    const s = this._getTilingSpriteData(e),
      { geometry: i, canBatch: n } = s;
    if (n) {
      s.batchableMesh || (s.batchableMesh = new Q());
      const o = s.batchableMesh;
      e._didTilingSpriteUpdate &&
        ((e._didTilingSpriteUpdate = !1),
        this._updateBatchableMesh(e),
        (o.geometry = i),
        (o.mesh = e),
        (o.texture = e._texture)),
        (o.roundPixels = this._renderer._roundPixels | e._roundPixels),
        r.addToBatch(o);
    } else
      r.break(t),
        s.shader || (s.shader = new wt()),
        this.updateRenderable(e),
        t.add(e);
  }
  execute(e) {
    const { shader: t } = this._tilingSpriteDataHash[e.uid];
    t.groups[0] = this._renderer.globalUniforms.bindGroup;
    const r = t.resources.localUniforms.uniforms;
    (r.uTransformMatrix = e.groupTransform),
      (r.uRound = this._renderer._roundPixels | e._roundPixels),
      q(e.groupColorAlpha, r.uColor, 0),
      (this._state.blendMode = be(e.groupBlendMode, e.texture._source)),
      this._renderer.encoder.draw({
        geometry: z,
        shader: t,
        state: this._state,
      });
  }
  updateRenderable(e) {
    const t = this._getTilingSpriteData(e),
      { canBatch: r } = t;
    if (r) {
      const { batchableMesh: s } = t;
      e._didTilingSpriteUpdate && this._updateBatchableMesh(e),
        s.batcher.updateElement(s);
    } else if (e._didTilingSpriteUpdate) {
      const { shader: s } = t;
      s.updateUniforms(
        e.width,
        e.height,
        e._tileTransform.matrix,
        e.anchor.x,
        e.anchor.y,
        e.texture
      );
    }
    e._didTilingSpriteUpdate = !1;
  }
  destroyRenderable(e) {
    var r;
    const t = this._getTilingSpriteData(e);
    (t.batchableMesh = null),
      (r = t.shader) == null || r.destroy(),
      (this._tilingSpriteDataHash[e.uid] = null);
  }
  _getTilingSpriteData(e) {
    return this._tilingSpriteDataHash[e.uid] || this._initTilingSpriteData(e);
  }
  _initTilingSpriteData(e) {
    const t = new Te({
      indices: z.indices,
      positions: z.positions.slice(),
      uvs: z.uvs.slice(),
    });
    return (
      (this._tilingSpriteDataHash[e.uid] = {
        canBatch: !0,
        renderable: e,
        geometry: t,
      }),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      this._tilingSpriteDataHash[e.uid]
    );
  }
  _updateBatchableMesh(e) {
    const t = this._getTilingSpriteData(e),
      { geometry: r } = t,
      s = e.texture.source.style;
    s.addressMode !== "repeat" && ((s.addressMode = "repeat"), s.update()),
      Pt(e, r.uvs),
      Bt(e, r.positions);
  }
  destroy() {
    for (const e in this._tilingSpriteDataHash)
      this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);
    (this._tilingSpriteDataHash = null), (this._renderer = null);
  }
  _updateCanBatch(e) {
    const t = this._getTilingSpriteData(e),
      r = e.texture;
    let s = !0;
    return (
      this._renderer.type === X.WEBGL &&
        (s = this._renderer.context.supports.nonPowOf2wrapping),
      (t.canBatch = r.textureMatrix.isSimple && (s || r.source.isPowerOfTwo)),
      t.canBatch
    );
  }
}
We.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "tilingSprite",
};
const Rt = {
    name: "local-uniform-msdf-bit",
    vertex: {
      header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,
      main: `
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,
      end: `
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `,
    },
    fragment: {
      header: `
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,
      main: ` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `,
    },
  },
  Ut = {
    name: "local-uniform-msdf-bit",
    vertex: {
      header: `
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,
      main: `
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,
      end: `
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `,
    },
    fragment: {
      header: `
            uniform float uDistance;
         `,
      main: ` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `,
    },
  },
  kt = {
    name: "msdf-bit",
    fragment: {
      header: `
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `,
    },
  },
  Ft = {
    name: "msdf-bit",
    fragment: {
      header: `
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `,
    },
  };
let $, V;
class Gt extends Se {
  constructor() {
    const e = new D({
        uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
        uTransformMatrix: { value: new U(), type: "mat3x3<f32>" },
        uDistance: { value: 4, type: "f32" },
        uRound: { value: 0, type: "f32" },
      }),
      t = tt();
    $ ?? ($ = ve({ name: "sdf-shader", bits: [ut, dt(t), Rt, kt, Ce] })),
      V ?? (V = we({ name: "sdf-shader", bits: [ht, pt(t), Ut, Ft, Be] })),
      super({
        glProgram: V,
        gpuProgram: $,
        resources: { localUniforms: e, batchSamplers: ft(t) },
      });
  }
}
class Le {
  constructor(e) {
    (this._gpuBitmapText = {}), (this._renderer = e);
  }
  validateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    return (
      e._didTextUpdate && ((e._didTextUpdate = !1), this._updateContext(e, t)),
      this._renderer.renderPipes.graphics.validateRenderable(t)
    );
  }
  addRenderable(e, t) {
    const r = this._getGpuBitmapText(e);
    he(e, r),
      e._didTextUpdate && ((e._didTextUpdate = !1), this._updateContext(e, r)),
      this._renderer.renderPipes.graphics.addRenderable(r, t),
      r.context.customShader && this._updateDistanceField(e);
  }
  destroyRenderable(e) {
    this._destroyRenderableByUid(e.uid);
  }
  _destroyRenderableByUid(e) {
    const t = this._gpuBitmapText[e].context;
    t.customShader && (y.return(t.customShader), (t.customShader = null)),
      y.return(this._gpuBitmapText[e]),
      (this._gpuBitmapText[e] = null);
  }
  updateRenderable(e) {
    const t = this._getGpuBitmapText(e);
    he(e, t),
      this._renderer.renderPipes.graphics.updateRenderable(t),
      t.context.customShader && this._updateDistanceField(e);
  }
  _updateContext(e, t) {
    const { context: r } = t,
      s = rt.getFont(e.text, e._style);
    r.clear(),
      s.distanceField.type !== "none" &&
        (r.customShader || (r.customShader = y.get(Gt)));
    const i = Array.from(e.text),
      n = e._style;
    let o = s.baseLineOffset;
    const l = st(i, n, s);
    let c = 0;
    const u = n.padding,
      d = l.scale;
    let g = l.width,
      f = l.height + l.offsetY;
    n._stroke && ((g += n._stroke.width / d), (f += n._stroke.width / d)),
      r.translate(-e._anchor._x * g - u, -e._anchor._y * f - u).scale(d, d);
    const _ = s.applyFillAsTint ? n._fill.color : 16777215;
    for (let p = 0; p < l.lines.length; p++) {
      const x = l.lines[p];
      for (let m = 0; m < x.charPositions.length; m++) {
        const T = i[c++],
          b = s.chars[T];
        b != null &&
          b.texture &&
          r.texture(
            b.texture,
            _ || "black",
            Math.round(x.charPositions[m] + b.xOffset),
            Math.round(o + b.yOffset)
          );
      }
      o += s.lineHeight;
    }
  }
  _getGpuBitmapText(e) {
    return this._gpuBitmapText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = y.get(at);
    return (
      (this._gpuBitmapText[e.uid] = t),
      this._updateContext(e, t),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      this._gpuBitmapText[e.uid]
    );
  }
  _updateDistanceField(e) {
    const t = this._getGpuBitmapText(e).context,
      r = e._style.fontFamily,
      s = j.get(`${r}-bitmap`),
      { a: i, b: n, c: o, d: l } = e.groupTransform,
      c = Math.sqrt(i * i + n * n),
      u = Math.sqrt(o * o + l * l),
      d = (Math.abs(c) + Math.abs(u)) / 2,
      g = s.baseRenderedFontSize / e._style.fontSize,
      f = d * s.distanceField.range * (1 / g);
    t.customShader.resources.localUniforms.uniforms.uDistance = f;
  }
  destroy() {
    for (const e in this._gpuBitmapText) this._destroyRenderableByUid(e);
    (this._gpuBitmapText = null), (this._renderer = null);
  }
}
Le.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "bitmapText",
};
function he(a, e) {
  (e.groupTransform = a.groupTransform),
    (e.groupColorAlpha = a.groupColorAlpha),
    (e.groupColor = a.groupColor),
    (e.groupBlendMode = a.groupBlendMode),
    (e.globalDisplayStatus = a.globalDisplayStatus),
    (e.groupTransform = a.groupTransform),
    (e.localDisplayStatus = a.localDisplayStatus),
    (e.groupAlpha = a.groupAlpha),
    (e._roundPixels = a._roundPixels);
}
class Ie {
  constructor(e) {
    (this._gpuText = Object.create(null)),
      (this._renderer = e),
      this._renderer.runners.resolutionChange.add(this);
  }
  resolutionChange() {
    for (const e in this._gpuText) {
      const r = this._gpuText[e].batchableSprite.renderable;
      r._autoResolution &&
        ((r._resolution = this._renderer.resolution), r.onViewUpdate());
    }
  }
  validateRenderable(e) {
    const t = this._getGpuText(e),
      r = e._getKey();
    return t.textureNeedsUploading
      ? ((t.textureNeedsUploading = !1), !0)
      : t.currentKey !== r;
  }
  addRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e),
      this._renderer.renderPipes.batch.addToBatch(r);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey),
      y.return(t.batchableSprite),
      (this._gpuText[e] = null);
  }
  _updateText(e) {
    const t = e._getKey(),
      r = this._getGpuText(e),
      s = r.batchableSprite;
    r.currentKey !== t &&
      this._updateGpuText(e).catch((n) => {
        console.error(n);
      }),
      (e._didTextUpdate = !1);
    const i = e._style.padding;
    K(s.bounds, e._anchor, s.texture, i);
  }
  async _updateGpuText(e) {
    e._didTextUpdate = !1;
    const t = this._getGpuText(e);
    if (t.generatingTexture) return;
    const r = e._getKey();
    this._renderer.htmlText.decreaseReferenceCount(t.currentKey),
      (t.generatingTexture = !0),
      (t.currentKey = r);
    const s = e.resolution ?? this._renderer.resolution,
      i = await this._renderer.htmlText.getManagedTexture(
        e.text,
        s,
        e._style,
        e._getKey()
      ),
      n = t.batchableSprite;
    (n.texture = t.texture = i),
      (t.generatingTexture = !1),
      (t.textureNeedsUploading = !0),
      e.onViewUpdate();
    const o = e._style.padding;
    K(n.bounds, e._anchor, n.texture, o);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = {
        texture: F.EMPTY,
        currentKey: "--",
        batchableSprite: y.get(Me),
        textureNeedsUploading: !1,
        generatingTexture: !1,
      },
      r = t.batchableSprite;
    return (
      (r.renderable = e),
      (r.texture = F.EMPTY),
      (r.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
      (r.roundPixels = this._renderer._roundPixels | e._roundPixels),
      (e._resolution = e._autoResolution
        ? this._renderer.resolution
        : e.resolution),
      (this._gpuText[e.uid] = t),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      t
    );
  }
  destroy() {
    for (const e in this._gpuText) this._destroyRenderableById(e);
    (this._gpuText = null), (this._renderer = null);
  }
}
Ie.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "htmlText",
};
function At() {
  const { userAgent: a } = ye.get().getNavigator();
  return /^((?!chrome|android).)*safari/i.test(a);
}
const Dt = new xe();
function Ee(a, e, t, r) {
  const s = Dt;
  (s.minX = 0),
    (s.minY = 0),
    (s.maxX = (a.width / r) | 0),
    (s.maxY = (a.height / r) | 0);
  const i = P.getOptimalTexture(s.width, s.height, r, !1);
  return (
    (i.source.uploadMethodId = "image"),
    (i.source.resource = a),
    (i.source.alphaMode = "premultiply-alpha-on-upload"),
    (i.frame.width = e / r),
    (i.frame.height = t / r),
    i.source.emit("update", i.source),
    i.updateUvs(),
    i
  );
}
function zt(a, e) {
  const t = e.fontFamily,
    r = [],
    s = {},
    i = /font-family:([^;"\s]+)/g,
    n = a.match(i);
  function o(l) {
    s[l] || (r.push(l), (s[l] = !0));
  }
  if (Array.isArray(t)) for (let l = 0; l < t.length; l++) o(t[l]);
  else o(t);
  n &&
    n.forEach((l) => {
      const c = l.split(":")[1].trim();
      o(c);
    });
  for (const l in e.tagStyles) {
    const c = e.tagStyles[l].fontFamily;
    o(c);
  }
  return r;
}
async function Ht(a) {
  const t = await (await ye.get().fetch(a)).blob(),
    r = new FileReader();
  return await new Promise((i, n) => {
    (r.onloadend = () => i(r.result)), (r.onerror = n), r.readAsDataURL(t);
  });
}
async function pe(a, e) {
  const t = await Ht(e);
  return `@font-face {
        font-family: "${a.fontFamily}";
        src: url('${t}');
        font-weight: ${a.fontWeight};
        font-style: ${a.fontStyle};
    }`;
}
const H = new Map();
async function Ot(a, e, t) {
  const r = a
    .filter((s) => j.has(`${s}-and-url`))
    .map((s, i) => {
      if (!H.has(s)) {
        const { url: n } = j.get(`${s}-and-url`);
        i === 0
          ? H.set(s, pe(e, n))
          : H.set(
              s,
              pe(
                {
                  fontWeight: t.fontWeight,
                  fontStyle: t.fontStyle,
                  fontFamily: s,
                },
                n
              )
            );
      }
      return H.get(s);
    });
  return (await Promise.all(r)).join(`
`);
}
function Wt(a, e, t, r, s) {
  const { domElement: i, styleElement: n, svgRoot: o } = s;
  (i.innerHTML = `<style>${e.cssStyle}</style><div>${a}</div>`),
    i.setAttribute(
      "style",
      `transform: scale(${t});transform-origin: top left; display: inline-block`
    ),
    (n.textContent = r);
  const { width: l, height: c } = s.image;
  return (
    o.setAttribute("width", l.toString()),
    o.setAttribute("height", c.toString()),
    new XMLSerializer().serializeToString(o)
  );
}
function Lt(a, e) {
  const t = A.getOptimalCanvasAndContext(a.width, a.height, e),
    { context: r } = t;
  return (
    r.clearRect(0, 0, a.width, a.height),
    r.drawImage(a, 0, 0),
    A.returnCanvasAndContext(t),
    t.canvas
  );
}
function It(a, e, t) {
  return new Promise(async (r) => {
    t && (await new Promise((s) => setTimeout(s, 100))),
      (a.onload = () => {
        r();
      }),
      (a.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`),
      (a.crossOrigin = "anonymous");
  });
}
class J {
  constructor(e) {
    (this._activeTextures = {}),
      (this._renderer = e),
      (this._createCanvas = e.type === X.WEBGPU);
  }
  getTexture(e) {
    return this._buildTexturePromise(e.text, e.resolution, e.style);
  }
  getManagedTexture(e, t, r, s) {
    if (this._activeTextures[s])
      return this._increaseReferenceCount(s), this._activeTextures[s].promise;
    const i = this._buildTexturePromise(e, t, r).then(
      (n) => ((this._activeTextures[s].texture = n), n)
    );
    return (
      (this._activeTextures[s] = { texture: null, promise: i, usageCount: 1 }),
      i
    );
  }
  async _buildTexturePromise(e, t, r) {
    const s = y.get(De),
      i = zt(e, r),
      n = await Ot(i, r, N.defaultTextStyle),
      o = yt(e, r, n, s),
      l = Math.ceil(Math.ceil(Math.max(1, o.width) + r.padding * 2) * t),
      c = Math.ceil(Math.ceil(Math.max(1, o.height) + r.padding * 2) * t),
      u = s.image;
    (u.width = l | 0), (u.height = c | 0);
    const d = Wt(e, r, t, n, s);
    await It(u, d, At() && i.length > 0);
    let g = u;
    this._createCanvas && (g = Lt(u, t));
    const f = Ee(g, u.width, u.height, t);
    return (
      this._createCanvas && this._renderer.texture.initSource(f.source),
      y.return(s),
      f
    );
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    t &&
      (t.usageCount--,
      t.usageCount === 0 &&
        (t.texture
          ? this._cleanUp(t)
          : t.promise
              .then((r) => {
                (t.texture = r), this._cleanUp(t);
              })
              .catch(() => {
                O("HTMLTextSystem: Failed to clean texture");
              }),
        (this._activeTextures[e] = null)));
  }
  _cleanUp(e) {
    P.returnTexture(e.texture),
      (e.texture.source.resource = null),
      (e.texture.source.uploadMethodId = "unknown");
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  destroy() {
    this._activeTextures = null;
  }
}
J.extension = {
  type: [h.WebGLSystem, h.WebGPUSystem, h.CanvasSystem],
  name: "htmlText",
};
J.defaultFontOptions = {
  fontFamily: "Arial",
  fontStyle: "normal",
  fontWeight: "normal",
};
class $e {
  constructor(e) {
    (this._gpuText = Object.create(null)),
      (this._renderer = e),
      this._renderer.runners.resolutionChange.add(this);
  }
  resolutionChange() {
    for (const e in this._gpuText) {
      const r = this._gpuText[e].batchableSprite.renderable;
      r._autoResolution &&
        ((r._resolution = this._renderer.resolution), r.onViewUpdate());
    }
  }
  validateRenderable(e) {
    const t = this._getGpuText(e),
      r = e._getKey();
    if (t.currentKey !== r) {
      const { width: s, height: i } = this._renderer.canvasText.getTextureSize(
        e.text,
        e.resolution,
        e._style
      );
      return !(
        this._renderer.canvasText.getReferenceCount(t.currentKey) === 1 &&
        s === t.texture._source.width &&
        i === t.texture._source.height
      );
    }
    return !1;
  }
  addRenderable(e, t) {
    const s = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e),
      this._renderer.renderPipes.batch.addToBatch(s);
  }
  updateRenderable(e) {
    const r = this._getGpuText(e).batchableSprite;
    e._didTextUpdate && this._updateText(e), r.batcher.updateElement(r);
  }
  destroyRenderable(e) {
    this._destroyRenderableById(e.uid);
  }
  _destroyRenderableById(e) {
    const t = this._gpuText[e];
    this._renderer.canvasText.decreaseReferenceCount(t.currentKey),
      y.return(t.batchableSprite),
      (this._gpuText[e] = null);
  }
  _updateText(e) {
    const t = e._getKey(),
      r = this._getGpuText(e),
      s = r.batchableSprite;
    r.currentKey !== t && this._updateGpuText(e), (e._didTextUpdate = !1);
    const i = e._style.padding;
    K(s.bounds, e._anchor, s.texture, i);
  }
  _updateGpuText(e) {
    const t = this._getGpuText(e),
      r = t.batchableSprite;
    t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey),
      (t.texture = r.texture = this._renderer.canvasText.getManagedTexture(e)),
      (t.currentKey = e._getKey()),
      (r.texture = t.texture);
  }
  _getGpuText(e) {
    return this._gpuText[e.uid] || this.initGpuText(e);
  }
  initGpuText(e) {
    const t = { texture: null, currentKey: "--", batchableSprite: y.get(Me) };
    return (
      (t.batchableSprite.renderable = e),
      (t.batchableSprite.bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
      (t.batchableSprite.roundPixels =
        this._renderer._roundPixels | e._roundPixels),
      (this._gpuText[e.uid] = t),
      (e._resolution = e._autoResolution
        ? this._renderer.resolution
        : e.resolution),
      this._updateText(e),
      e.on("destroyed", () => {
        this.destroyRenderable(e);
      }),
      t
    );
  }
  destroy() {
    for (const e in this._gpuText) this._destroyRenderableById(e);
    (this._gpuText = null), (this._renderer = null);
  }
}
$e.extension = {
  type: [h.WebGLPipes, h.WebGPUPipes, h.CanvasPipes],
  name: "text",
};
function fe(a, e, t) {
  for (let r = 0, s = 4 * t * e; r < e; ++r, s += 4)
    if (a[s + 3] !== 0) return !1;
  return !0;
}
function ge(a, e, t, r, s) {
  const i = 4 * e;
  for (let n = r, o = r * i + 4 * t; n <= s; ++n, o += i)
    if (a[o + 3] !== 0) return !1;
  return !0;
}
function Et(a, e = 1) {
  const { width: t, height: r } = a,
    s = a.getContext("2d", { willReadFrequently: !0 });
  if (s === null) throw new TypeError("Failed to get canvas 2D context");
  const n = s.getImageData(0, 0, t, r).data;
  let o = 0,
    l = 0,
    c = t - 1,
    u = r - 1;
  for (; l < r && fe(n, t, l); ) ++l;
  if (l === r) return ae.EMPTY;
  for (; fe(n, t, u); ) --u;
  for (; ge(n, t, o, l, u); ) ++o;
  for (; ge(n, t, c, l, u); ) --c;
  return ++c, ++u, new ae(o / e, l / e, (c - o) / e, (u - l) / e);
}
class Ve {
  constructor(e) {
    (this._activeTextures = {}), (this._renderer = e);
  }
  getTextureSize(e, t, r) {
    const s = k.measureText(e || " ", r);
    let i = Math.ceil(Math.ceil(Math.max(1, s.width) + r.padding * 2) * t),
      n = Math.ceil(Math.ceil(Math.max(1, s.height) + r.padding * 2) * t);
    return (
      (i = Math.ceil(i - 1e-6)),
      (n = Math.ceil(n - 1e-6)),
      (i = ne(i)),
      (n = ne(n)),
      { width: i, height: n }
    );
  }
  getTexture(e, t, r, s) {
    typeof e == "string" &&
      (it(
        "8.0.0",
        "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"
      ),
      (e = { text: e, style: r, resolution: t })),
      e.style instanceof Y || (e.style = new Y(e.style));
    const { texture: i, canvasAndContext: n } = this.createTextureAndCanvas(e);
    return (
      this._renderer.texture.initSource(i._source),
      A.returnCanvasAndContext(n),
      i
    );
  }
  createTextureAndCanvas(e) {
    const { text: t, style: r } = e,
      s = e.resolution ?? this._renderer.resolution,
      i = k.measureText(t || " ", r),
      n = Math.ceil(Math.ceil(Math.max(1, i.width) + r.padding * 2) * s),
      o = Math.ceil(Math.ceil(Math.max(1, i.height) + r.padding * 2) * s),
      l = A.getOptimalCanvasAndContext(n, o),
      { canvas: c } = l;
    this.renderTextToCanvas(t, r, s, l);
    const u = Ee(c, n, o, s);
    if (r.trim) {
      const d = Et(c, s);
      u.frame.copyFrom(d), u.updateUvs();
    }
    return { texture: u, canvasAndContext: l };
  }
  getManagedTexture(e) {
    e._resolution = e._autoResolution
      ? this._renderer.resolution
      : e.resolution;
    const t = e._getKey();
    if (this._activeTextures[t])
      return this._increaseReferenceCount(t), this._activeTextures[t].texture;
    const { texture: r, canvasAndContext: s } = this.createTextureAndCanvas(e);
    return (
      (this._activeTextures[t] = {
        canvasAndContext: s,
        texture: r,
        usageCount: 1,
      }),
      r
    );
  }
  _increaseReferenceCount(e) {
    this._activeTextures[e].usageCount++;
  }
  decreaseReferenceCount(e) {
    const t = this._activeTextures[e];
    if ((t.usageCount--, t.usageCount === 0)) {
      A.returnCanvasAndContext(t.canvasAndContext), P.returnTexture(t.texture);
      const r = t.texture.source;
      (r.resource = null),
        (r.uploadMethodId = "unknown"),
        (r.alphaMode = "no-premultiply-alpha"),
        (this._activeTextures[e] = null);
    }
  }
  getReferenceCount(e) {
    return this._activeTextures[e].usageCount;
  }
  renderTextToCanvas(e, t, r, s) {
    var b, B, w, R, M;
    const { canvas: i, context: n } = s,
      o = nt(t),
      l = k.measureText(e || " ", t),
      c = l.lines,
      u = l.lineHeight,
      d = l.lineWidths,
      g = l.maxLineWidth,
      f = l.fontProperties,
      _ = i.height;
    n.resetTransform(), n.scale(r, r);
    const p = t.padding * 2;
    if (
      (n.clearRect(0, 0, l.width + 4 + p, l.height + 4 + p),
      (b = t._stroke) != null && b.width)
    ) {
      const C = t._stroke;
      (n.lineWidth = C.width),
        (n.miterLimit = C.miterLimit),
        (n.lineJoin = C.join),
        (n.lineCap = C.cap);
    }
    n.font = o;
    let x, m;
    const T = t.dropShadow ? 2 : 1;
    for (let C = 0; C < T; ++C) {
      const Z = t.dropShadow && C === 0,
        W = Z ? Math.ceil(Math.max(1, _) + t.padding * 2) : 0,
        Ye = W * r;
      if (Z) {
        (n.fillStyle = "black"), (n.strokeStyle = "black");
        const S = t.dropShadow,
          je = S.color,
          Ke = S.alpha;
        n.shadowColor = G.shared.setValue(je).setAlpha(Ke).toRgbaString();
        const Xe = S.blur * r,
          re = S.distance * r;
        (n.shadowBlur = Xe),
          (n.shadowOffsetX = Math.cos(S.angle) * re),
          (n.shadowOffsetY = Math.sin(S.angle) * re + Ye);
      } else
        (n.globalAlpha = ((B = t._fill) == null ? void 0 : B.alpha) ?? 1),
          (n.fillStyle = t._fill ? ie(t._fill, n) : null),
          (w = t._stroke) != null &&
            w.width &&
            (n.strokeStyle = ie(t._stroke, n)),
          (n.shadowColor = "black");
      let ee = (u - f.fontSize) / 2;
      u - f.fontSize < 0 && (ee = 0);
      const te = ((R = t._stroke) == null ? void 0 : R.width) ?? 0;
      for (let S = 0; S < c.length; S++)
        (x = te / 2),
          (m = te / 2 + S * u + f.ascent + ee),
          t.align === "right"
            ? (x += g - d[S])
            : t.align === "center" && (x += (g - d[S]) / 2),
          (M = t._stroke) != null &&
            M.width &&
            this._drawLetterSpacing(
              c[S],
              t,
              s,
              x + t.padding,
              m + t.padding - W,
              !0
            ),
          t._fill !== void 0 &&
            this._drawLetterSpacing(
              c[S],
              t,
              s,
              x + t.padding,
              m + t.padding - W
            );
    }
  }
  _drawLetterSpacing(e, t, r, s, i, n = !1) {
    const { context: o } = r,
      l = t.letterSpacing;
    let c = !1;
    if (
      (k.experimentalLetterSpacingSupported &&
        (k.experimentalLetterSpacing
          ? ((o.letterSpacing = `${l}px`),
            (o.textLetterSpacing = `${l}px`),
            (c = !0))
          : ((o.letterSpacing = "0px"), (o.textLetterSpacing = "0px"))),
      l === 0 || c)
    ) {
      n ? o.strokeText(e, s, i) : o.fillText(e, s, i);
      return;
    }
    let u = s;
    const d = k.graphemeSegmenter(e);
    let g = o.measureText(e).width,
      f = 0;
    for (let _ = 0; _ < d.length; ++_) {
      const p = d[_];
      n ? o.strokeText(p, u, i) : o.fillText(p, u, i);
      let x = "";
      for (let m = _ + 1; m < d.length; ++m) x += d[m];
      (f = o.measureText(x).width), (u += g - f + l), (g = f);
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
Ve.extension = {
  type: [h.WebGLSystem, h.WebGPUSystem, h.CanvasSystem],
  name: "canvasText",
};
v.add(Pe);
v.add(Re);
v.add(ze);
v.add(ot);
v.add(He);
v.add(Ve);
v.add($e);
v.add(Le);
v.add(J);
v.add(Ie);
v.add(We);
v.add(Oe);
v.add(Fe);
v.add(Ue);
