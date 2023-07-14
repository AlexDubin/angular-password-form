"use strict";
(self.webpackChunkangular_password_form =
  self.webpackChunkangular_password_form || []).push([
  [179],
  {
    755: () => {
      function ee(e) {
        return "function" == typeof e;
      }
      function so(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Oi = so(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function ao(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ct {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ee(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Oi ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  yf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Oi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Oi(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) yf(t);
            else {
              if (t instanceof ct) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ao(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && ao(n, t), t instanceof ct && t._removeParent(this);
        }
      }
      ct.EMPTY = (() => {
        const e = new ct();
        return (e.closed = !0), e;
      })();
      const gf = ct.EMPTY;
      function mf(e) {
        return (
          e instanceof ct ||
          (e && "closed" in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        );
      }
      function yf(e) {
        ee(e) ? e() : e.unsubscribe();
      }
      const Pn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Fi = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Fi;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Fi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function vf(e) {
        Fi.setTimeout(() => {
          const { onUnhandledError: t } = Pn;
          if (!t) throw e;
          t(e);
        });
      }
      function Df() {}
      const Bw = Ja("C", void 0, void 0);
      function Ja(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let kn = null;
      function Pi(e) {
        if (Pn.useDeprecatedSynchronousErrorHandling) {
          const t = !kn;
          if ((t && (kn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = kn;
            if (((kn = null), n)) throw r;
          }
        } else e();
      }
      class eu extends ct {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), mf(t) && t.add(this))
              : (this.destination = qw);
        }
        static create(t, n, r) {
          return new uo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? nu(
                (function Hw(e) {
                  return Ja("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? nu(
                (function jw(e) {
                  return Ja("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? nu(Bw, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Gw = Function.prototype.bind;
      function tu(e, t) {
        return Gw.call(e, t);
      }
      class zw {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              ki(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              ki(r);
            }
          else ki(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              ki(n);
            }
        }
      }
      class uo extends eu {
        constructor(t, n, r) {
          let o;
          if ((super(), ee(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Pn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && tu(t.next, i),
                  error: t.error && tu(t.error, i),
                  complete: t.complete && tu(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new zw(o);
        }
      }
      function ki(e) {
        Pn.useDeprecatedSynchronousErrorHandling
          ? (function Uw(e) {
              Pn.useDeprecatedSynchronousErrorHandling &&
                kn &&
                ((kn.errorThrown = !0), (kn.error = e));
            })(e)
          : vf(e);
      }
      function nu(e, t) {
        const { onStoppedNotification: n } = Pn;
        n && Fi.setTimeout(() => n(e, t));
      }
      const qw = {
          closed: !0,
          next: Df,
          error: function Ww(e) {
            throw e;
          },
          complete: Df,
        },
        ru =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Dn(e) {
        return e;
      }
      function Cf(e) {
        return 0 === e.length
          ? Dn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ye = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Qw(e) {
              return (
                (e && e instanceof eu) ||
                ((function Yw(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete);
                })(e) &&
                  mf(e))
              );
            })(n)
              ? n
              : new uo(n, r, o);
            return (
              Pi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = _f(r))((o, i) => {
              const s = new uo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ru]() {
            return this;
          }
          pipe(...n) {
            return Cf(n)(this);
          }
          toPromise(n) {
            return new (n = _f(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function _f(e) {
        var t;
        return null !== (t = e ?? Pn.Promise) && void 0 !== t ? t : Promise;
      }
      const Kw = so(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Xt = (() => {
        class e extends ye {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new wf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Kw();
          }
          next(n) {
            Pi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Pi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Pi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? gf
              : ((this.currentObservers = null),
                i.push(n),
                new ct(() => {
                  (this.currentObservers = null), ao(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ye();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new wf(t, n)), e;
      })();
      class wf extends Xt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : gf;
        }
      }
      class dt extends Xt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Ef(e) {
        return ee(e?.lift);
      }
      function Ie(e) {
        return (t) => {
          if (Ef(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function _e(e, t, n, r, o) {
        return new Xw(e, t, n, r, o);
      }
      class Xw extends eu {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function te(e, t) {
        return Ie((n, r) => {
          let o = 0;
          n.subscribe(
            _e(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function Cn(e) {
        return this instanceof Cn ? ((this.v = e), this) : new Cn(e);
      }
      function If(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function au(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Af = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Tf(e) {
        return ee(e?.then);
      }
      function Nf(e) {
        return ee(e[ru]);
      }
      function Rf(e) {
        return Symbol.asyncIterator && ee(e?.[Symbol.asyncIterator]);
      }
      function xf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Of = (function CE() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ff(e) {
        return ee(e?.[Of]);
      }
      function Pf(e) {
        return (function Mf(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof Cn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Cn(n.read());
              if (o) return yield Cn(void 0);
              yield yield Cn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function kf(e) {
        return ee(e?.getReader);
      }
      function ft(e) {
        if (e instanceof ye) return e;
        if (null != e) {
          if (Nf(e))
            return (function _E(e) {
              return new ye((t) => {
                const n = e[ru]();
                if (ee(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Af(e))
            return (function wE(e) {
              return new ye((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Tf(e))
            return (function EE(e) {
              return new ye((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, vf);
              });
            })(e);
          if (Rf(e)) return Lf(e);
          if (Ff(e))
            return (function bE(e) {
              return new ye((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (kf(e))
            return (function SE(e) {
              return Lf(Pf(e));
            })(e);
        }
        throw xf(e);
      }
      function Lf(e) {
        return new ye((t) => {
          (function ME(e, t) {
            var n, r, o, i;
            return (function bf(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = If(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Jt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ne(e, t, n = 1 / 0) {
        return ee(t)
          ? Ne((r, o) => te((i, s) => t(r, i, o, s))(ft(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Ie((r, o) =>
              (function IE(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let v = !1;
                    ft(n(g, c++)).subscribe(
                      _e(
                        t,
                        (_) => {
                          o?.(_), i ? h(_) : t.next(_);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const _ = u.shift();
                                s ? Jt(t, s, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              t.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    _e(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function ir(e = 1 / 0) {
        return Ne(Dn, e);
      }
      const Ot = new ye((e) => e.complete());
      function uu(e) {
        return e[e.length - 1];
      }
      function Vf(e) {
        return ee(uu(e)) ? e.pop() : void 0;
      }
      function lo(e) {
        return (function TE(e) {
          return e && ee(e.schedule);
        })(uu(e))
          ? e.pop()
          : void 0;
      }
      function $f(e, t = 0) {
        return Ie((n, r) => {
          n.subscribe(
            _e(
              r,
              (o) => Jt(r, e, () => r.next(o), t),
              () => Jt(r, e, () => r.complete(), t),
              (o) => Jt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Bf(e, t = 0) {
        return Ie((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function jf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ye((n) => {
          Jt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Jt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ae(e, t) {
        return t
          ? (function kE(e, t) {
              if (null != e) {
                if (Nf(e))
                  return (function RE(e, t) {
                    return ft(e).pipe(Bf(t), $f(t));
                  })(e, t);
                if (Af(e))
                  return (function OE(e, t) {
                    return new ye((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Tf(e))
                  return (function xE(e, t) {
                    return ft(e).pipe(Bf(t), $f(t));
                  })(e, t);
                if (Rf(e)) return jf(e, t);
                if (Ff(e))
                  return (function FE(e, t) {
                    return new ye((n) => {
                      let r;
                      return (
                        Jt(n, t, () => {
                          (r = e[Of]()),
                            Jt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ee(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (kf(e))
                  return (function PE(e, t) {
                    return jf(Pf(e), t);
                  })(e, t);
              }
              throw xf(e);
            })(e, t)
          : ft(e);
      }
      function F(...e) {
        return Ae(e, lo(e));
      }
      function Hf(e = {}) {
        const {
          connector: t = () => new Xt(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Ie((g, v) => {
            l++, !d && !c && f();
            const _ = (u = u ?? t());
            v.add(() => {
              l--, 0 === l && !d && !c && (a = lu(p, o));
            }),
              _.subscribe(v),
              !s &&
                l > 0 &&
                ((s = new uo({
                  next: (m) => _.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = lu(h, n, m)), _.error(m);
                  },
                  complete: () => {
                    (c = !0), f(), (a = lu(h, r)), _.complete();
                  },
                })),
                ft(g).subscribe(s));
          })(i);
        };
      }
      function lu(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new uo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return ft(t(...n)).subscribe(r);
      }
      function Ft(e, t) {
        return Ie((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            _e(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                ft(e(u, c)).subscribe(
                  (o = _e(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function $E(e, t) {
        return e === t;
      }
      function K(e) {
        for (let t in e) if (e[t] === K) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Li(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function we(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(we).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function cu(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const BE = K({ __forward_ref__: K });
      function ne(e) {
        return (
          (e.__forward_ref__ = ne),
          (e.toString = function () {
            return we(this());
          }),
          e
        );
      }
      function P(e) {
        return du(e) ? e() : e;
      }
      function du(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(BE) &&
          e.__forward_ref__ === ne
        );
      }
      function fu(e) {
        return e && !!e.ɵproviders;
      }
      class D extends Error {
        constructor(t, n) {
          super(
            (function Vi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function k(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function $i(e, t) {
        throw new D(-201, !1);
      }
      function ht(e, t) {
        null == e &&
          (function Z(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function T(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function _t(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Bi(e) {
        return Gf(e, ji) || Gf(e, Wf);
      }
      function Gf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function zf(e) {
        return e && (e.hasOwnProperty(hu) || e.hasOwnProperty(ZE))
          ? e[hu]
          : null;
      }
      const ji = K({ ɵprov: K }),
        hu = K({ ɵinj: K }),
        Wf = K({ ngInjectableDef: K }),
        ZE = K({ ngInjectorDef: K });
      var I = (() => (
        ((I = I || {})[(I.Default = 0)] = "Default"),
        (I[(I.Host = 1)] = "Host"),
        (I[(I.Self = 2)] = "Self"),
        (I[(I.SkipSelf = 4)] = "SkipSelf"),
        (I[(I.Optional = 8)] = "Optional"),
        I
      ))();
      let pu;
      function qe(e) {
        const t = pu;
        return (pu = e), t;
      }
      function Zf(e, t, n) {
        const r = Bi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & I.Optional
          ? null
          : void 0 !== t
          ? t
          : void $i(we(e));
      }
      const re = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        co = {},
        gu = "__NG_DI_FLAG__",
        Hi = "ngTempTokenPath",
        QE = /\n/gm,
        Yf = "__source";
      let sr;
      function _n(e) {
        const t = sr;
        return (sr = e), t;
      }
      function JE(e, t = I.Default) {
        if (void 0 === sr) throw new D(-203, !1);
        return null === sr
          ? Zf(e, void 0, t)
          : sr.get(e, t & I.Optional ? null : void 0, t);
      }
      function N(e, t = I.Default) {
        return (
          (function qf() {
            return pu;
          })() || JE
        )(P(e), t);
      }
      function b(e, t = I.Default) {
        return N(e, Ui(t));
      }
      function Ui(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function mu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = P(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new D(900, !1);
            let o,
              i = I.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = eb(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(N(o, i));
          } else t.push(N(r));
        }
        return t;
      }
      function fo(e, t) {
        return (e[gu] = t), (e.prototype[gu] = t), e;
      }
      function eb(e) {
        return e[gu];
      }
      function en(e) {
        return { toString: e }.toString();
      }
      var Pt = (() => (
          ((Pt = Pt || {})[(Pt.OnPush = 0)] = "OnPush"),
          (Pt[(Pt.Default = 1)] = "Default"),
          Pt
        ))(),
        nt = (() => {
          return (
            ((e = nt || (nt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            nt
          );
          var e;
        })();
      const kt = {},
        q = [],
        Gi = K({ ɵcmp: K }),
        yu = K({ ɵdir: K }),
        vu = K({ ɵpipe: K }),
        Kf = K({ ɵmod: K }),
        tn = K({ ɵfac: K }),
        ho = K({ __NG_ELEMENT_ID__: K }),
        Xf = K({ __NG_ENV_ID__: K });
      function Jf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Du(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            th(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function eh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function th(e) {
        return 64 === e.charCodeAt(0);
      }
      function po(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  nh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function nh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const rh = "ng-template";
      function rb(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Jf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function oh(e) {
        return 4 === e.type && e.value !== rh;
      }
      function ob(e, t, n) {
        return t === (4 !== e.type || n ? e.value : rh);
      }
      function ib(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function ub(e) {
            for (let t = 0; t < e.length; t++) if (eh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !ob(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (wt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!rb(e.attrs, l, n)) {
                    if (wt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = sb(8 & r ? "class" : u, o, oh(e), n);
                if (-1 === d) {
                  if (wt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Jf(h, l, 0)) || (2 & r && l !== f)) {
                    if (wt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !wt(r) && !wt(u)) return !1;
            if (s && wt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return wt(r) || s;
      }
      function wt(e) {
        return 0 == (1 & e);
      }
      function sb(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function lb(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function ih(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (ib(e, t[r], n)) return !0;
        return !1;
      }
      function sh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function db(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !wt(s) && ((t += sh(i, o)), (o = "")),
              (r = s),
              (i = i || !wt(r));
          n++;
        }
        return "" !== o && (t += sh(i, o)), t;
      }
      function go(e) {
        return en(() => {
          const t = uh(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Pt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || nt.Emulated,
              styles: e.styles || q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          lh(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = zi(r, !1)),
            (n.pipeDefs = zi(r, !0)),
            (n.id = (function Db(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function gb(e) {
        return Y(e) || Oe(e);
      }
      function mb(e) {
        return null !== e;
      }
      function Lt(e) {
        return en(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function ah(e, t) {
        if (null == e) return kt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function O(e) {
        return en(() => {
          const t = uh(e);
          return lh(t), t;
        });
      }
      function Ze(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function Y(e) {
        return e[Gi] || null;
      }
      function Oe(e) {
        return e[yu] || null;
      }
      function Ye(e) {
        return e[vu] || null;
      }
      function rt(e, t) {
        const n = e[Kf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function uh(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || kt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: ah(e.inputs, t),
          outputs: ah(e.outputs),
        };
      }
      function lh(e) {
        e.features?.forEach((t) => t(e));
      }
      function zi(e, t) {
        if (!e) return null;
        const n = t ? Ye : gb;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(mb);
      }
      const Ee = 0,
        E = 1,
        V = 2,
        ae = 3,
        Et = 4,
        mo = 5,
        Fe = 6,
        ur = 7,
        he = 8,
        lr = 9,
        Vn = 10,
        $ = 11,
        yo = 12,
        ch = 13,
        cr = 14,
        pe = 15,
        vo = 16,
        dr = 17,
        Vt = 18,
        Do = 19,
        dh = 20,
        wn = 21,
        nn = 22,
        Wi = 23,
        qi = 24,
        G = 25,
        Cu = 1,
        fh = 2,
        $t = 7,
        fr = 9,
        Pe = 11;
      function ot(e) {
        return Array.isArray(e) && "object" == typeof e[Cu];
      }
      function Qe(e) {
        return Array.isArray(e) && !0 === e[Cu];
      }
      function _u(e) {
        return 0 != (4 & e.flags);
      }
      function $n(e) {
        return e.componentOffset > -1;
      }
      function Yi(e) {
        return 1 == (1 & e.flags);
      }
      function bt(e) {
        return !!e.template;
      }
      function wu(e) {
        return 0 != (512 & e[V]);
      }
      function Bn(e, t) {
        return e.hasOwnProperty(tn) ? e[tn] : null;
      }
      let Sb =
          re.WeakRef ??
          class bb {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        Ib = 0,
        Bt = null,
        Qi = !1;
      function Te(e) {
        const t = Bt;
        return (Bt = e), t;
      }
      class yh {
        constructor() {
          (this.id = Ib++),
            (this.ref = (function Mb(e) {
              return new Sb(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (null != r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = Qi;
          Qi = !0;
          try {
            for (const [n, r] of this.consumers) {
              const o = r.consumerNode.deref();
              null != o && o.trackingVersion === r.atTrackingVersion
                ? o.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), o?.producers.delete(this.id));
            }
          } finally {
            Qi = t;
          }
        }
        producerAccessed() {
          if (Qi) throw new Error("");
          if (null === Bt) return;
          let t = Bt.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: Bt.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Bt.trackingVersion,
              }),
              Bt.producers.set(this.id, t),
              this.consumers.set(Bt.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = Bt.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Bt?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let vh = null;
      const Ch = () => {};
      class Rb extends yh {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = Ch),
            (this.registerOnCleanup = (o) => {
              this.cleanupFn = o;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = Te(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = Ch),
              this.watch(this.registerOnCleanup);
          } finally {
            Te(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class xb {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function pt() {
        return _h;
      }
      function _h(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Fb), Ob;
      }
      function Ob() {
        const e = Eh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === kt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Fb(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Eh(e) ||
            (function Pb(e, t) {
              return (e[wh] = t);
            })(e, { previous: kt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new xb(u && u.currentValue, t, a === kt)), (e[r] = t);
      }
      pt.ngInherit = !0;
      const wh = "__ngSimpleChanges__";
      function Eh(e) {
        return e[wh] || null;
      }
      const jt = function (e, t, n) {};
      function ie(e) {
        for (; Array.isArray(e); ) e = e[Ee];
        return e;
      }
      function Ji(e, t) {
        return ie(t[e]);
      }
      function Ke(e, t) {
        return ie(t[e.index]);
      }
      function Mh(e, t) {
        return e.data[t];
      }
      function it(e, t) {
        const n = t[e];
        return ot(n) ? n : n[Ee];
      }
      function En(e, t) {
        return null == t ? null : e[t];
      }
      function Ih(e) {
        e[dr] = 0;
      }
      function Hb(e) {
        1024 & e[V] || ((e[V] |= 1024), Th(e, 1));
      }
      function Ah(e) {
        1024 & e[V] && ((e[V] &= -1025), Th(e, -1));
      }
      function Th(e, t) {
        let n = e[ae];
        if (null === n) return;
        n[mo] += t;
        let r = n;
        for (
          n = n[ae];
          null !== n && ((1 === t && 1 === r[mo]) || (-1 === t && 0 === r[mo]));

        )
          (n[mo] += t), (r = n), (n = n[ae]);
      }
      const x = {
        lFrame: Hh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function xh() {
        return x.bindingsEnabled;
      }
      function y() {
        return x.lFrame.lView;
      }
      function W() {
        return x.lFrame.tView;
      }
      function Re() {
        let e = Ph();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Ph() {
        return x.lFrame.currentTNode;
      }
      function Ht(e, t) {
        const n = x.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Au() {
        return x.lFrame.isParent;
      }
      function gr() {
        return x.lFrame.bindingIndex++;
      }
      function eS(e, t) {
        const n = x.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Nu(t);
      }
      function Nu(e) {
        x.lFrame.currentDirectiveIndex = e;
      }
      function xu(e) {
        x.lFrame.currentQueryIndex = e;
      }
      function nS(e) {
        const t = e[E];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Fe] : null;
      }
      function Bh(e, t, n) {
        if (n & I.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & I.Host ||
              ((o = nS(i)), null === o || ((i = i[cr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (x.lFrame = jh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ou(e) {
        const t = jh(),
          n = e[E];
        (x.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function jh() {
        const e = x.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Hh(e) : t;
      }
      function Hh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Uh() {
        const e = x.lFrame;
        return (
          (x.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Gh = Uh;
      function Fu() {
        const e = Uh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function je() {
        return x.lFrame.selectedIndex;
      }
      function jn(e) {
        x.lFrame.selectedIndex = e;
      }
      let Wh = !0;
      function es() {
        return Wh;
      }
      function bn(e) {
        Wh = e;
      }
      function ts(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            l &&
              ((e.viewHooks ??= []).push(n, l),
              (e.viewCheckHooks ??= []).push(n, l)),
            null != c && (e.destroyHooks ??= []).push(n, c);
        }
      }
      function ns(e, t, n) {
        qh(e, t, 3, n);
      }
      function rs(e, t, n, r) {
        (3 & e[V]) === n && qh(e, t, n, r);
      }
      function Pu(e, t) {
        let n = e[V];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[V] = n));
      }
      function qh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[dr] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[dr] += 65536),
              (a < i || -1 == i) &&
                (cS(e, n, t, u), (e[dr] = (4294901760 & e[dr]) + u + 2)),
              u++;
      }
      function Zh(e, t) {
        jt(4, e, t);
        const n = Te(null);
        try {
          t.call(e);
        } finally {
          Te(n), jt(5, e, t);
        }
      }
      function cS(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[V] >> 13 < e[dr] >> 16 &&
            (3 & e[V]) === t &&
            ((e[V] += 8192), Zh(a, i))
          : Zh(a, i);
      }
      const mr = -1;
      class wo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Yh(e) {
        return e !== mr;
      }
      function os(e) {
        return 32767 & e;
      }
      function is(e, t) {
        let n = (function pS(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[cr]), n--;
        return r;
      }
      let Lu = !0;
      function ss(e) {
        const t = Lu;
        return (Lu = e), t;
      }
      const Qh = 255,
        Kh = 5;
      let gS = 0;
      const Ut = {};
      function as(e, t) {
        const n = Xh(e, t);
        if (-1 !== n) return n;
        const r = t[E];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Vu(r.data, e),
          Vu(t, null),
          Vu(r.blueprint, null));
        const o = $u(e, t),
          i = e.injectorIndex;
        if (Yh(o)) {
          const s = os(o),
            a = is(o, t),
            u = a[E].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Vu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Xh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function $u(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = ip(o)), null === r)) return mr;
          if ((n++, (o = o[cr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return mr;
      }
      function Bu(e, t, n) {
        !(function mS(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ho) && (r = n[ho]),
            null == r && (r = n[ho] = gS++);
          const o = r & Qh;
          t.data[e + (o >> Kh)] |= 1 << o;
        })(e, t, n);
      }
      function Jh(e, t, n) {
        if (n & I.Optional || void 0 !== e) return e;
        $i();
      }
      function ep(e, t, n, r) {
        if (
          (n & I.Optional && void 0 === r && (r = null),
          !(n & (I.Self | I.Host)))
        ) {
          const o = e[lr],
            i = qe(void 0);
          try {
            return o ? o.get(t, r, n & I.Optional) : Zf(t, r, n & I.Optional);
          } finally {
            qe(i);
          }
        }
        return Jh(r, 0, n);
      }
      function tp(e, t, n, r = I.Default, o) {
        if (null !== e) {
          if (2048 & t[V] && !(r & I.Self)) {
            const s = (function _S(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[V] && !(512 & s[V]);

              ) {
                const a = np(i, s, n, r | I.Self, Ut);
                if (a !== Ut) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[dh];
                  if (l) {
                    const c = l.get(n, Ut, r);
                    if (c !== Ut) return c;
                  }
                  (u = ip(s)), (s = s[cr]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Ut);
            if (s !== Ut) return s;
          }
          const i = np(e, t, n, r, Ut);
          if (i !== Ut) return i;
        }
        return ep(t, n, r, o);
      }
      function np(e, t, n, r, o) {
        const i = (function DS(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(ho) ? e[ho] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Qh : CS) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Bh(t, e, r)) return r & I.Host ? Jh(o, 0, r) : ep(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & I.Optional) return s;
            $i();
          } finally {
            Gh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Xh(e, t),
            u = mr,
            l = r & I.Host ? t[pe][Fe] : null;
          for (
            (-1 === a || r & I.SkipSelf) &&
            ((u = -1 === a ? $u(e, t) : t[a + 8]),
            u !== mr && op(r, !1)
              ? ((s = t[E]), (a = os(u)), (t = is(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[E];
            if (rp(i, a, c.data)) {
              const d = vS(a, t, n, s, r, l);
              if (d !== Ut) return d;
            }
            (u = t[a + 8]),
              u !== mr && op(r, t[E].data[a + 8] === l) && rp(i, a, t)
                ? ((s = c), (a = os(u)), (t = is(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function vS(e, t, n, r, o, i) {
        const s = t[E],
          a = s.data[e + 8],
          c = (function us(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && bt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? $n(a) && Lu : r != s && 0 != (3 & a.type),
            o & I.Host && i === a
          );
        return null !== c ? Hn(t, s, c, a) : Ut;
      }
      function Hn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function dS(e) {
            return e instanceof wo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function jE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new D(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Q(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : k(e);
              })(i[n])
            );
          const a = ss(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? qe(s.injectImpl) : null;
          Bh(e, r, I.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function lS(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = _h(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && qe(u), ss(a), (s.resolving = !1), Gh();
          }
        }
        return o;
      }
      function rp(e, t, n) {
        return !!(n[t + (e >> Kh)] & (1 << e));
      }
      function op(e, t) {
        return !(e & I.Self || (e & I.Host && t));
      }
      class yr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return tp(this._tNode, this._lView, t, Ui(r), n);
        }
      }
      function CS() {
        return new yr(Re(), y());
      }
      function xe(e) {
        return en(() => {
          const t = e.prototype.constructor,
            n = t[tn] || ju(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[tn] || ju(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function ju(e) {
        return du(e)
          ? () => {
              const t = ju(P(e));
              return t && t();
            }
          : Bn(e);
      }
      function ip(e) {
        const t = e[E],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Fe] : null;
      }
      const Dr = "__parameters__";
      function _r(e, t, n) {
        return en(() => {
          const r = (function Hu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Dr)
                ? u[Dr]
                : Object.defineProperty(u, Dr, { value: [] })[Dr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function So(e, t) {
        e.forEach((n) => (Array.isArray(n) ? So(n, t) : t(n)));
      }
      function ap(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function cs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function st(e, t, n) {
        let r = wr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function MS(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Uu(e, t) {
        const n = wr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function wr(e, t) {
        return (function up(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const fs = fo(_r("Optional"), 8),
        hs = fo(_r("SkipSelf"), 4);
      function vs(e) {
        return 128 == (128 & e.flags);
      }
      var Xe = (() => (
        ((Xe = Xe || {})[(Xe.Important = 1)] = "Important"),
        (Xe[(Xe.DashCase = 2)] = "DashCase"),
        Xe
      ))();
      const Zu = new Map();
      let QS = 0;
      const Qu = "__ngContext__";
      function ke(e, t) {
        ot(t)
          ? ((e[Qu] = t[Do]),
            (function XS(e) {
              Zu.set(e[Do], e);
            })(t))
          : (e[Qu] = t);
      }
      let Ku;
      function Xu(e, t) {
        return Ku(e, t);
      }
      function To(e) {
        const t = e[ae];
        return Qe(t) ? t[ae] : t;
      }
      function Ap(e) {
        return Np(e[yo]);
      }
      function Tp(e) {
        return Np(e[Et]);
      }
      function Np(e) {
        for (; null !== e && !Qe(e); ) e = e[Et];
        return e;
      }
      function Sr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Qe(r) ? (i = r) : ot(r) && ((s = !0), (r = r[Ee]));
          const a = ie(r);
          0 === e && null !== n
            ? null == o
              ? Pp(t, n, a)
              : Un(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Un(t, n, a, o || null, !0)
            : 2 === e
            ? (function bs(e, t, n) {
                const r = ws(e, t);
                r &&
                  (function yM(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function CM(e, t, n, r, o) {
                const i = n[$t];
                i !== ie(n) && Sr(t, e, r, i, o);
                for (let a = Pe; a < n.length; a++) {
                  const u = n[a];
                  Ro(u[E], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function _s(e, t, n) {
        return e.createElement(t, n);
      }
      function xp(e, t) {
        const n = e[fr],
          r = n.indexOf(t);
        Ah(t), n.splice(r, 1);
      }
      function el(e, t) {
        if (e.length <= Pe) return;
        const n = Pe + t,
          r = e[n];
        if (r) {
          const o = r[vo];
          null !== o && o !== e && xp(o, r), t > 0 && (e[n - 1][Et] = r[Et]);
          const i = cs(e, Pe + t);
          !(function lM(e, t) {
            Ro(e, t, t[$], 2, null, null), (t[Ee] = null), (t[Fe] = null);
          })(r[E], r);
          const s = i[Vt];
          null !== s && s.detachView(i[E]),
            (r[ae] = null),
            (r[Et] = null),
            (r[V] &= -129);
        }
        return r;
      }
      function Op(e, t) {
        if (!(256 & t[V])) {
          const n = t[$];
          t[Wi]?.destroy(),
            t[qi]?.destroy(),
            n.destroyNode && Ro(e, t, n, 3, null, null),
            (function fM(e) {
              let t = e[yo];
              if (!t) return tl(e[E], e);
              for (; t; ) {
                let n = null;
                if (ot(t)) n = t[yo];
                else {
                  const r = t[Pe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[Et] && t !== e; )
                    ot(t) && tl(t[E], t), (t = t[ae]);
                  null === t && (t = e), ot(t) && tl(t[E], t), (n = t && t[Et]);
                }
                t = n;
              }
            })(t);
        }
      }
      function tl(e, t) {
        if (!(256 & t[V])) {
          (t[V] &= -129),
            (t[V] |= 256),
            (function mM(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof wo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        jt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          jt(5, a, u);
                        }
                      }
                    else {
                      jt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        jt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function gM(e, t) {
              const n = e.cleanup,
                r = t[ur];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[ur] = null);
              const o = t[wn];
              if (null !== o) {
                t[wn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[E].type && t[$].destroy();
          const n = t[vo];
          if (null !== n && Qe(t[ae])) {
            n !== t[ae] && xp(n, t);
            const r = t[Vt];
            null !== r && r.detachView(e);
          }
          !(function JS(e) {
            Zu.delete(e[Do]);
          })(t);
        }
      }
      function nl(e, t, n) {
        return (function Fp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Ee];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === nt.None || i === nt.Emulated) return null;
            }
            return Ke(r, n);
          }
        })(e, t.parent, n);
      }
      function Un(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Pp(e, t, n) {
        e.appendChild(t, n);
      }
      function kp(e, t, n, r, o) {
        null !== r ? Un(e, t, n, r, o) : Pp(e, t, n);
      }
      function ws(e, t) {
        return e.parentNode(t);
      }
      let rl,
        al,
        $p = function Vp(e, t, n) {
          return 40 & e.type ? Ke(e, n) : null;
        };
      function Es(e, t, n, r) {
        const o = nl(e, r, t),
          i = t[$],
          a = (function Lp(e, t, n) {
            return $p(e, t, n);
          })(r.parent || t[Fe], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) kp(i, o, n[u], a, !1);
          else kp(i, o, n, a, !1);
        void 0 !== rl && rl(i, r, t, n, o);
      }
      function No(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ke(t, e);
          if (4 & n) return ol(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return No(e, r);
            {
              const o = e[t.index];
              return Qe(o) ? ol(-1, o) : ie(o);
            }
          }
          if (32 & n) return Xu(t, e)() || ie(e[t.index]);
          {
            const r = jp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : No(To(e[pe]), r)
              : No(e, t.next);
          }
        }
        return null;
      }
      function jp(e, t) {
        return null !== t ? e[pe][Fe].projection[t.projection] : null;
      }
      function ol(e, t) {
        const n = Pe + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[E].firstChild;
          if (null !== o) return No(r, o);
        }
        return t[$t];
      }
      function il(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && ke(ie(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) il(e, t, n.child, r, o, i, !1), Sr(t, e, o, a, i);
            else if (32 & u) {
              const l = Xu(n, r);
              let c;
              for (; (c = l()); ) Sr(t, e, o, c, i);
              Sr(t, e, o, a, i);
            } else 16 & u ? Up(e, t, r, n, o, i) : Sr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ro(e, t, n, r, o, i) {
        il(n, r, e.firstChild, t, o, i, !1);
      }
      function Up(e, t, n, r, o, i) {
        const s = n[pe],
          u = s[Fe].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Sr(t, e, o, u[l], i);
        else {
          let l = u;
          const c = s[ae];
          vs(r) && (l.flags |= 128), il(e, t, l, c, o, i, !0);
        }
      }
      function Gp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function zp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Du(e, t, r),
          null !== o && Gp(e, t, o),
          null !== i &&
            (function wM(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class Yp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = T({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const ko = new S("ENVIRONMENT_INITIALIZER"),
        ig = new S("INJECTOR", -1),
        sg = new S("INJECTOR_DEF_TYPES");
      class ag {
        get(t, n = co) {
          if (n === co) {
            const r = new Error(`NullInjectorError: No provider for ${we(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function YM(...e) {
        return { ɵproviders: lg(0, e), ɵfromNgModule: !0 };
      }
      function lg(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          So(t, (i) => {
            const s = i;
            hl(s, n, [], r) && ((o ||= []), o.push(s));
          }),
          void 0 !== o && cg(o, n),
          n
        );
      }
      function cg(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          pl(o, (i) => {
            t.push(i);
          });
        }
      }
      function hl(e, t, n, r) {
        if (!(e = P(e))) return !1;
        let o = null,
          i = zf(e);
        const s = !i && Y(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = zf(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) hl(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                So(i.imports, (c) => {
                  hl(c, t, n, r) && ((l ||= []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && cg(l, t);
            }
            if (!a) {
              const l = Bn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: q },
                { provide: sg, useValue: o, multi: !0 },
                { provide: ko, useValue: () => N(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              pl(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function pl(e, t) {
        for (let n of e)
          fu(n) && (n = n.ɵproviders), Array.isArray(n) ? pl(n, t) : t(n);
      }
      const QM = K({ provide: String, useValue: K });
      function gl(e) {
        return null !== e && "object" == typeof e && QM in e;
      }
      function Gn(e) {
        return "function" == typeof e;
      }
      const ml = new S("Set Injector scope."),
        As = {},
        XM = {};
      let yl;
      function Ts() {
        return void 0 === yl && (yl = new ag()), yl;
      }
      class an {}
      class vl extends an {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Cl(t, (s) => this.processProvider(s)),
            this.records.set(ig, Ir(void 0, this)),
            o.has("environment") && this.records.set(an, Ir(void 0, this));
          const i = this.records.get(ml);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(sg.multi, q, I.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = _n(this),
            r = qe(void 0);
          try {
            return t();
          } finally {
            _n(n), qe(r);
          }
        }
        get(t, n = co, r = I.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Xf)))
            return t[Xf](this);
          r = Ui(r);
          const o = _n(this),
            i = qe(void 0);
          try {
            if (!(r & I.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function rI(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && Bi(t);
                (a = u && this.injectableDefInScope(u) ? Ir(Dl(t), As) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & I.Self ? Ts() : this.parent).get(
              t,
              (n = r & I.Optional && n === co ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Hi] = s[Hi] || []).unshift(we(t)), o)) throw s;
              return (function tb(e, t, n, r) {
                const o = e[Hi];
                throw (
                  (t[Yf] && o.unshift(t[Yf]),
                  (e.message = (function nb(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = we(t);
                    if (Array.isArray(t)) o = t.map(we).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : we(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      QE,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Hi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            qe(i), _n(o);
          }
        }
        resolveInjectorInitializers() {
          const t = _n(this),
            n = qe(void 0);
          try {
            const r = this.get(ko.multi, q, I.Self);
            for (const o of r) o();
          } finally {
            _n(t), qe(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(we(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new D(205, !1);
        }
        processProvider(t) {
          let n = Gn((t = P(t))) ? t : P(t && t.provide);
          const r = (function eI(e) {
            return gl(e) ? Ir(void 0, e.useValue) : Ir(hg(e), As);
          })(t);
          if (Gn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Ir(void 0, As, !0)),
              (o.factory = () => mu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === As && ((n.value = XM), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function nI(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = P(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Dl(e) {
        const t = Bi(e),
          n = null !== t ? t.factory : Bn(e);
        if (null !== n) return n;
        if (e instanceof S) throw new D(204, !1);
        if (e instanceof Function)
          return (function JM(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Mo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new D(204, !1))
              );
            const n = (function qE(e) {
              return (e && (e[ji] || e[Wf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new D(204, !1);
      }
      function hg(e, t, n) {
        let r;
        if (Gn(e)) {
          const o = P(e);
          return Bn(o) || Dl(o);
        }
        if (gl(e)) r = () => P(e.useValue);
        else if (
          (function fg(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...mu(e.deps || []));
        else if (
          (function dg(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => N(P(e.useExisting));
        else {
          const o = P(e && (e.useClass || e.provide));
          if (
            !(function tI(e) {
              return !!e.deps;
            })(e)
          )
            return Bn(o) || Dl(o);
          r = () => new o(...mu(e.deps));
        }
        return r;
      }
      function Ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Cl(e, t) {
        for (const n of e)
          Array.isArray(n) ? Cl(n, t) : n && fu(n) ? Cl(n.ɵproviders, t) : t(n);
      }
      const Ns = new S("AppId", { providedIn: "root", factory: () => oI }),
        oI = "ng",
        pg = new S("Platform Initializer"),
        Ar = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        gg = new S("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function xo() {
              if (void 0 !== al) return al;
              if (typeof document < "u") return document;
              throw new D(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let yg = (e, t) => null;
      function vg(e, t) {
        return yg(e, t);
      }
      class hI {}
      class _g {}
      class gI {
        resolveComponentFactory(t) {
          throw (function pI(e) {
            const t = Error(`No component factory found for ${we(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ps = (() => {
        class e {}
        return (e.NULL = new gI()), e;
      })();
      function mI() {
        return Tr(Re(), y());
      }
      function Tr(e, t) {
        return new at(Ke(e, t));
      }
      let at = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = mI), e;
      })();
      class Eg {}
      let un = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function vI() {
                const e = y(),
                  n = it(Re().index, e);
                return (ot(n) ? n : e)[$];
              })()),
            e
          );
        })(),
        DI = (() => {
          class e {}
          return (
            (e.ɵprov = T({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Bo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const CI = new Bo("16.1.5"),
        Rl = {};
      function jo(e) {
        for (; e; ) {
          e[V] |= 64;
          const t = To(e);
          if (wu(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function xl(e) {
        return e.ngOriginalError;
      }
      class zn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && xl(t);
          for (; n && xl(n); ) n = xl(n);
          return n || null;
        }
      }
      const Mg = new S("", { providedIn: "root", factory: () => !1 });
      function ln(e) {
        return e instanceof Function ? e() : e;
      }
      class Rg extends yh {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          jo(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const o = Te(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            Te(o);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Ls = null;
      function xg() {
        return (Ls ??= new Rg()), Ls;
      }
      function Og(e, t) {
        return e[t] ?? xg();
      }
      function Fg(e, t) {
        const n = xg();
        n.hasReadASignal && ((e[t] = Ls), (n.lView = e), (Ls = new Rg()));
      }
      const B = {};
      function Ho(e) {
        Pg(W(), y(), je() + e, !1);
      }
      function Pg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[V])) {
            const i = e.preOrderCheckHooks;
            null !== i && ns(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && rs(t, i, 0, n);
          }
        jn(n);
      }
      function $g(e, t = null, n = null, r) {
        const o = Bg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Bg(e, t = null, n = null, r, o = new Set()) {
        const i = [n || q, YM(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : we(e))),
          new vl(i, t || Ts(), r || null, o)
        );
      }
      let Gt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return $g({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return $g({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = co),
          (e.NULL = new ag()),
          (e.ɵprov = T({ token: e, providedIn: "any", factory: () => N(ig) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function C(e, t = I.Default) {
        const n = y();
        return null === n ? N(e, t) : tp(Re(), n, P(e), t);
      }
      function Vs(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[Ee] = o),
          (d[V] = 140 | r),
          (null !== l || (e && 2048 & e[V])) && (d[V] |= 2048),
          Ih(d),
          (d[ae] = d[cr] = e),
          (d[he] = n),
          (d[Vn] = s || (e && e[Vn])),
          (d[$] = a || (e && e[$])),
          (d[lr] = u || (e && e[lr]) || null),
          (d[Fe] = i),
          (d[Do] = (function KS() {
            return QS++;
          })()),
          (d[nn] = c),
          (d[dh] = l),
          (d[pe] = 2 == t.type ? e[pe] : d),
          d
        );
      }
      function Rr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Ol(e, t, n, r, o) {
            const i = Ph(),
              s = Au(),
              u = (e.data[t] = (function jI(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function pr() {
                    return null !== x.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function Jb() {
              return x.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function _o() {
            const e = x.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ht(i, !0), i;
      }
      function Uo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Hg(e, t, n, r, o) {
        const i = Og(t, Wi),
          s = je(),
          a = 2 & r;
        try {
          if (
            (jn(-1), a && t.length > G && Pg(e, t, G, !1), jt(a ? 2 : 0, o), a)
          )
            i.runInContext(n, r, o);
          else {
            const l = Te(null);
            try {
              n(r, o);
            } finally {
              Te(l);
            }
          }
        } finally {
          a && null === t[Wi] && Fg(t, Wi), jn(s), jt(a ? 3 : 1, o);
        }
      }
      function Fl(e, t, n) {
        if (_u(t)) {
          const r = Te(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            Te(r);
          }
        }
      }
      function Pl(e, t, n) {
        xh() &&
          ((function ZI(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            $n(n) &&
              (function t0(e, t, n) {
                const r = Ke(t, e),
                  o = Ug(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = $s(
                  e,
                  Vs(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[Vn].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || as(n, t),
              ke(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Hn(t, e, a, n);
              ke(l, t),
                null !== s && n0(0, a - o, l, u, 0, s),
                bt(u) && (it(n.index, t)[he] = Hn(t, e, a, n));
            }
          })(e, t, n, Ke(n, t)),
          64 == (64 & n.flags) && Zg(e, t, n));
      }
      function kl(e, t, n = Ke) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Ug(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ll(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Ll(e, t, n, r, o, i, s, a, u, l, c) {
        const d = G + r,
          f = d + o,
          h = (function PI(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : B);
            return n;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[E] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let Gg = (e) => null;
      function zg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Wg(n, t, o, i)
              : r.hasOwnProperty(o) && Wg(n, t, r[o], i);
          }
        return n;
      }
      function Wg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Vl(e, t, n, r) {
        if (xh()) {
          const o = null === r ? null : { "": -1 },
            i = (function QI(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (ih(t, s.selectors, !1))
                    if ((r || (r = []), bt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          $l(e, t, a.length);
                      } else r.unshift(s), $l(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && qg(e, t, n, s, o, a),
            o &&
              (function KI(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new D(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = po(n.mergedAttrs, n.attrs);
      }
      function qg(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) Bu(as(n, t), e, r[l].type);
        !(function JI(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = Uo(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = po(n.mergedAttrs, c.hostAttrs)),
            e0(e, n, t, u, c),
            XI(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function HI(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = zg(d.inputs, c, u, f ? f.inputs : null)),
              (l = zg(d.outputs, c, l, p));
            const g = null === u || null === s || oh(t) ? null : r0(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function Zg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function tS() {
            return x.lFrame.currentDirectiveIndex;
          })();
        try {
          jn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Nu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                YI(u, l);
          }
        } finally {
          jn(-1), Nu(s);
        }
      }
      function YI(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function $l(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function XI(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          bt(t) && (n[""] = e);
        }
      }
      function e0(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Bn(o.type)),
          s = new wo(i, bt(o), C);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function WI(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function qI(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Uo(e, n, o.hostVars, B), o);
      }
      function n0(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Yg(r, n, s[a++], s[a++], s[a++]);
      }
      function Yg(e, t, n, r, o) {
        const i = Te(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          Te(i);
        }
      }
      function r0(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function Qg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function Kg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              xu(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function $s(e, t) {
        return e[yo] ? (e[ch][Et] = t) : (e[yo] = t), (e[ch] = t), t;
      }
      function jl(e, t, n) {
        xu(0);
        const r = Te(null);
        try {
          t(e, n);
        } finally {
          Te(r);
        }
      }
      function tm(e, t) {
        const n = e[lr],
          r = n ? n.get(zn, null) : null;
        r && r.handleError(t);
      }
      function Hl(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Yg(e.data[s], t[s], r, a, o);
        }
      }
      function o0(e, t) {
        const n = it(t, e),
          r = n[E];
        !(function s0(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[Ee];
        null !== o && null === n[nn] && (n[nn] = vg(o, n[lr])), Ul(r, n, n[he]);
      }
      function Ul(e, t, n) {
        Ou(t);
        try {
          const r = e.viewQuery;
          null !== r && jl(1, r, n);
          const o = e.template;
          null !== o && Hg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Kg(e, t),
            e.staticViewQueries && jl(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function a0(e, t) {
              for (let n = 0; n < t.length; n++) o0(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[V] &= -5), Fu();
        }
      }
      let nm = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, o) {
            const i = typeof Zone > "u" ? null : Zone.current,
              s = new Rb(
                n,
                (l) => {
                  this.all.has(l) && this.queue.set(l, i);
                },
                o
              );
            let a;
            this.all.add(s), s.notify();
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(u)), { destroy: u };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          (e.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          e
        );
      })();
      function Bs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = cu(o, a))
              : 2 == i && (r = cu(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Go(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(ie(i)), Qe(i))) {
            for (let a = Pe; a < i.length; a++) {
              const u = i[a],
                l = u[E].firstChild;
              null !== l && Go(u[E], u, l, r);
            }
            i[$t] !== i[Ee] && r.push(i[$t]);
          }
          const s = n.type;
          if (8 & s) Go(e, t, n.child, r);
          else if (32 & s) {
            const a = Xu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = jp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = To(t[pe]);
              Go(u[E], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function js(e, t, n, r = !0) {
        const o = t[Vn].rendererFactory;
        o.begin && o.begin();
        try {
          rm(e, t, e.template, n);
        } catch (s) {
          throw (r && tm(t, s), s);
        } finally {
          o.end && o.end(), t[Vn].effectManager?.flush();
        }
      }
      function rm(e, t, n, r) {
        const o = t[V];
        if (256 != (256 & o)) {
          t[Vn].effectManager?.flush(), Ou(t);
          try {
            Ih(t),
              (function Lh(e) {
                return (x.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Hg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && ns(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && rs(t, l, 0, null), Pu(t, 0);
            }
            if (
              ((function f0(e) {
                for (let t = Ap(e); null !== t; t = Tp(t)) {
                  if (!t[fh]) continue;
                  const n = t[fr];
                  for (let r = 0; r < n.length; r++) {
                    Hb(n[r]);
                  }
                }
              })(t),
              om(t, 2),
              null !== e.contentQueries && Kg(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && ns(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && rs(t, l, 1), Pu(t, 1);
            }
            !(function FI(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Og(t, qi);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) jn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    eS(a, s), r.runInContext(u, 2, t[s]);
                  }
                }
              } finally {
                null === t[qi] && Fg(t, qi), jn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && sm(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && jl(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && ns(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && rs(t, l, 2), Pu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[V] &= -73),
              Ah(t);
          } finally {
            Fu();
          }
        }
      }
      function om(e, t) {
        for (let n = Ap(e); null !== n; n = Tp(n))
          for (let r = Pe; r < n.length; r++) im(n[r], t);
      }
      function h0(e, t, n) {
        im(it(t, e), n);
      }
      function im(e, t) {
        if (
          !(function Bb(e) {
            return 128 == (128 & e[V]);
          })(e)
        )
          return;
        const n = e[E];
        if ((80 & e[V] && 0 === t) || 1024 & e[V] || 2 === t)
          rm(n, e, n.template, e[he]);
        else if (e[mo] > 0) {
          om(e, 1);
          const o = e[E].components;
          null !== o && sm(e, o, 1);
        }
      }
      function sm(e, t, n) {
        for (let r = 0; r < t.length; r++) h0(e, t[r], n);
      }
      class zo {
        get rootNodes() {
          const t = this._lView,
            n = t[E];
          return Go(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[he];
        }
        set context(t) {
          this._lView[he] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[V]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ae];
            if (Qe(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (el(t, r), cs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Op(this._lView[E], this._lView);
        }
        onDestroy(t) {
          !(function Nh(e, t) {
            if (256 == (256 & e[V])) throw new D(911, !1);
            null === e[wn] && (e[wn] = []), e[wn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          jo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[V] &= -129;
        }
        reattach() {
          this._lView[V] |= 128;
        }
        detectChanges() {
          js(this._lView[E], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new D(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function dM(e, t) {
              Ro(e, t, t[$], 2, null, null);
            })(this._lView[E], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new D(902, !1);
          this._appRef = t;
        }
      }
      class p0 extends zo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          js(t[E], t, t[he], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class am extends Ps {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Y(t);
          return new Wo(n, this.ngModule);
        }
      }
      function um(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class m0 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Ui(r);
          const o = this.injector.get(t, Rl, r);
          return o !== Rl || n === Rl ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Wo extends _g {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = um(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return um(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function fb(e) {
              return e.map(db).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof an ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new m0(t, i) : t,
            a = s.get(Eg, null);
          if (null === a) throw new D(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get(DI, null),
              effectManager: s.get(nm, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function kI(e, t, n, r) {
                  const i = r.get(Mg, !1) || n === nt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function LI(e) {
                      Gg(e);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : _s(
                  d,
                  f,
                  (function g0(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(f)
                ),
            v = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528,
            _ = Ll(0, null, null, 1, 0, null, null, null, null, null, null),
            m = Vs(null, _, null, v, null, null, c, d, s, null, null);
          let M, L;
          Ou(m);
          try {
            const H = this.componentDef;
            let $e,
              Xa = null;
            H.findHostDirectiveDefs
              ? (($e = []),
                (Xa = new Map()),
                H.findHostDirectiveDefs(H, $e, Xa),
                $e.push(H))
              : ($e = [H]);
            const pL = (function v0(e, t) {
                const n = e[E],
                  r = G;
                return (e[r] = t), Rr(n, r, 2, "#host", null);
              })(m, h),
              gL = (function D0(e, t, n, r, o, i, s) {
                const a = o[E];
                !(function C0(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = po(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Bs(t, t.mergedAttrs, !0), null !== n && zp(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = vg(t, o[lr]));
                const l = i.rendererFactory.createRenderer(t, n);
                let c = 16;
                n.signals ? (c = 4096) : n.onPush && (c = 64);
                const d = Vs(
                  o,
                  Ug(n),
                  null,
                  c,
                  o[e.index],
                  e,
                  i,
                  l,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && $l(a, e, r.length - 1),
                  $s(o, d),
                  (o[e.index] = d)
                );
              })(pL, h, H, $e, m, c, d);
            (L = Mh(_, G)),
              h &&
                (function w0(e, t, n, r) {
                  if (r) Du(e, n, ["ng-version", CI.full]);
                  else {
                    const { attrs: o, classes: i } = (function hb(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!wt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Du(e, n, o),
                      i && i.length > 0 && Gp(e, n, i.join(" "));
                  }
                })(d, H, h, r),
              void 0 !== n &&
                (function E0(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(L, this.ngContentSelectors, n),
              (M = (function _0(e, t, n, r, o, i) {
                const s = Re(),
                  a = o[E],
                  u = Ke(s, o);
                qg(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  ke(Hn(o, a, s.directiveStart + c, s), o);
                Zg(a, o, s), u && ke(u, o);
                const l = Hn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[he] = o[he] = l), null !== i))
                  for (const c of i) c(l, t);
                return Fl(a, s, e), l;
              })(gL, H, $e, Xa, m, [b0])),
              Ul(_, m, null);
          } finally {
            Fu();
          }
          return new y0(this.componentType, M, Tr(L, m), m, L);
        }
      }
      class y0 extends hI {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new p0(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Hl(i[E], i, o, t, n),
              this.previousInputValues.set(t, n),
              jo(it(this._tNode.index, i));
          }
        }
        get injector() {
          return new yr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function b0() {
        const e = Re();
        ts(y()[E], e);
      }
      function X(e) {
        let t = (function lm(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (bt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new D(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Hs(e.inputs)),
                (s.inputTransforms = Hs(e.inputTransforms)),
                (s.declaredInputs = Hs(e.declaredInputs)),
                (s.outputs = Hs(e.outputs));
              const a = o.hostBindings;
              a && A0(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && M0(e, u),
                l && I0(e, l),
                Li(e.inputs, o.inputs),
                Li(e.declaredInputs, o.declaredInputs),
                Li(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Li(s.inputTransforms, o.inputTransforms)),
                bt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === X && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function S0(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = po(o.hostAttrs, (n = po(n, o.hostAttrs))));
          }
        })(r);
      }
      function Hs(e) {
        return e === kt ? {} : e === q ? [] : e;
      }
      function M0(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function I0(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function A0(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function Us(e) {
        return (
          !!Gl(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Gl(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Le(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Ql(e, t, n, r, o, i, s, a) {
        const u = y(),
          l = W(),
          c = e + G,
          d = l.firstCreatePass
            ? (function J0(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Rr(t, e, 4, s || null, En(l, a));
                Vl(t, n, c, En(l, u)), ts(t, c);
                const d = (c.tView = Ll(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Ht(d, !1);
        const f = Mm(l, u, d, e);
        es() && Es(l, u, f, d),
          ke(f, u),
          $s(u, (u[c] = Qg(f, u, f, d))),
          Yi(d) && Pl(l, u, d),
          null != s && kl(u, d, a);
      }
      let Mm = function Im(e, t, n, r) {
        return bn(!0), t[$].createComment("");
      };
      function qn(e, t, n) {
        const r = y();
        return (
          Le(r, gr(), t) &&
            (function ut(e, t, n, r, o, i, s, a) {
              const u = Ke(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (Hl(e, n, c, r, o),
                  $n(t) &&
                    (function GI(e, t) {
                      const n = it(t, e);
                      16 & n[V] || (n[V] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function UI(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              W(),
              (function ue() {
                const e = x.lFrame;
                return Mh(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[$],
              n,
              !1
            ),
          qn
        );
      }
      function Kl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Hl(e, n, t.inputs[s], s, r);
      }
      function dn(e, t, n, r) {
        const o = y(),
          i = W(),
          s = G + e,
          a = o[$],
          u = i.firstCreatePass
            ? (function oA(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Rr(t, e, 2, r, En(s, o));
                return (
                  Vl(t, n, u, En(s, i)),
                  null !== u.attrs && Bs(u, u.attrs, !1),
                  null !== u.mergedAttrs && Bs(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = Am(i, o, u, a, t, e);
        o[s] = l;
        const c = Yi(u);
        return (
          Ht(u, !0),
          zp(a, l, u),
          32 != (32 & u.flags) && es() && Es(i, o, l, u),
          0 ===
            (function Gb() {
              return x.lFrame.elementDepthCount;
            })() && ke(l, o),
          (function zb() {
            x.lFrame.elementDepthCount++;
          })(),
          c && (Pl(i, o, u), Fl(i, u, o)),
          null !== r && kl(o, u),
          dn
        );
      }
      function fn() {
        let e = Re();
        Au()
          ? (function Tu() {
              x.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Ht(e, !1));
        const t = e;
        (function qb(e) {
          return x.skipHydrationRootTNode === e;
        })(t) &&
          (function Kb() {
            x.skipHydrationRootTNode = null;
          })(),
          (function Wb() {
            x.lFrame.elementDepthCount--;
          })();
        const n = W();
        return (
          n.firstCreatePass && (ts(n, e), _u(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function fS(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Kl(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function hS(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Kl(n, t, y(), t.stylesWithoutHost, !1),
          fn
        );
      }
      function Ko(e, t, n, r) {
        return dn(e, t, n, r), fn(), Ko;
      }
      let Am = (e, t, n, r, o, i) => (
        bn(!0),
        _s(
          r,
          o,
          (function zh() {
            return x.lFrame.currentNamespace;
          })()
        )
      );
      function Xo(e) {
        return !!e && "function" == typeof e.then;
      }
      function xm(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function He(e, t, n, r) {
        const o = y(),
          i = W(),
          s = Re();
        return (
          (function Fm(e, t, n, r, o, i, s) {
            const a = Yi(r),
              l =
                e.firstCreatePass &&
                (function Jg(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              c = t[he],
              d = (function Xg(e) {
                return e[ur] || (e[ur] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Ke(r, t),
                v = s ? s(g) : g,
                _ = d.length,
                m = s ? (L) => s(ie(L[r.index])) : r.index;
              let M = null;
              if (
                (!s &&
                  a &&
                  (M = (function cA(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[ur],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== M)
              )
                ((M.__ngLastListenerFn__ || M).__ngNextListenerFn__ = i),
                  (M.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = km(r, t, c, i, !1);
                const L = n.listen(v, o, i);
                d.push(i, L), l && l.push(o, m, _, _ + 1);
              }
            } else i = km(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let v = 0; v < g; v += 2) {
                  const H = t[p[v]][p[v + 1]].subscribe(i),
                    $e = d.length;
                  d.push(i, H), l && l.push(o, r.index, $e, -($e + 1));
                }
            }
          })(i, o, o[$], s, e, t, r),
          He
        );
      }
      function Pm(e, t, n, r) {
        try {
          return jt(6, t, n), !1 !== n(r);
        } catch (o) {
          return tm(e, o), !1;
        } finally {
          jt(7, t, n);
        }
      }
      function km(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          jo(e.componentOffset > -1 ? it(e.index, t) : t);
          let u = Pm(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Pm(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function ec(e = 1) {
        return (function rS(e) {
          return (x.lFrame.contextLView = (function oS(e, t) {
            for (; e > 0; ) (t = t[cr]), e--;
            return t;
          })(e, x.lFrame.contextLView))[he];
        })(e);
      }
      function Zs(e, t) {
        return (e << 17) | (t << 2);
      }
      function Mn(e) {
        return (e >> 17) & 32767;
      }
      function nc(e) {
        return 2 | e;
      }
      function Zn(e) {
        return (131068 & e) >> 2;
      }
      function rc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function oc(e) {
        return 1 | e;
      }
      function Wm(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Mn(i) : Zn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          DA(e[a], t) && ((u = !0), (e[a + 1] = r ? oc(c) : nc(c))),
            (a = r ? Mn(c) : Zn(c));
        }
        u && (e[n + 1] = r ? nc(i) : oc(i));
      }
      function DA(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && wr(e, t) >= 0)
        );
      }
      function Ys(e, t) {
        return (
          (function St(e, t, n, r) {
            const o = y(),
              i = W(),
              s = (function on(e) {
                const t = x.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function ty(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[je()],
                    s = (function ey(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function iy(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function AA(e, t, n, r) {
                      const o = (function Ru(e) {
                        const t = x.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Jo((n = ic(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = ic(o, e, t, n, r)), null === i)) {
                            let u = (function TA(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Zn(r)) return e[Mn(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = ic(null, e, t, u[1], r)),
                              (u = Jo(u, t.attrs, r)),
                              (function NA(e, t, n, r) {
                                e[Mn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function RA(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Jo(r, e[i].hostAttrs, n);
                              return Jo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function yA(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Mn(s),
                        u = Zn(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || wr(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = Mn(e[a + 1]);
                          (e[r + 1] = Zs(f, a)),
                            0 !== f && (e[f + 1] = rc(e[f + 1], r)),
                            (e[a + 1] = (function gA(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Zs(a, 0)),
                            0 !== a && (e[a + 1] = rc(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Zs(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = rc(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = nc(e[r + 1])),
                        Wm(e, c, r, !0),
                        Wm(e, c, r, !1),
                        (function vA(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            wr(i, t) >= 0 &&
                            (n[r + 1] = oc(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Zs(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== B &&
                Le(o, s, t) &&
                (function ry(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function mA(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? oy(u, t, n, o, Zn(l), s)
                      : void 0;
                  Qs(c) ||
                    (Qs(i) ||
                      ((function pA(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = oy(u, null, n, o, a, s))),
                    (function _M(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : Xe.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Xe.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Ji(je(), n), o, i));
                })(
                  i,
                  i.data[je()],
                  o,
                  o[$],
                  e,
                  (o[s + 1] = (function PA(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = we(
                              (function Sn(e) {
                                return e instanceof Yp
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Ys
        );
      }
      function ic(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Jo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Jo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                st(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function oy(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === B && (f = d ? q : void 0);
          let h = d ? Uu(f, r) : c === r ? f : void 0;
          if ((l && !Qs(h) && (h = Uu(u, r)), Qs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Mn(p) : Zn(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Uu(u, r));
        }
        return a;
      }
      function Qs(e) {
        return void 0 !== e;
      }
      function Ks(e, t = "") {
        const n = y(),
          r = W(),
          o = e + G,
          i = r.firstCreatePass ? Rr(r, o, 1, t, null) : r.data[o],
          s = sy(r, n, i, t, e);
        (n[o] = s), es() && Es(r, n, s, i), Ht(i, !1);
      }
      let sy = (e, t, n, r, o) => (
        bn(!0),
        (function Cs(e, t) {
          return e.createText(t);
        })(t[$], r)
      );
      function sc(e) {
        return ac("", e, ""), sc;
      }
      function ac(e, t, n) {
        const r = y(),
          o = (function Or(e, t, n, r) {
            return Le(e, gr(), n) ? t + k(n) + r : B;
          })(r, e, t, n);
        return (
          o !== B &&
            (function cn(e, t, n) {
              const r = Ji(t, e);
              !(function Rp(e, t, n) {
                e.setValue(t, n);
              })(e[$], r, n);
            })(r, je(), o),
          ac
        );
      }
      const Ur = "en-US";
      let Ay = Ur;
      function cc(e, t, n, r, o) {
        if (((e = P(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) cc(e[i], t, n, r, o);
        else {
          const i = W(),
            s = y();
          let a = Gn(e) ? e : P(e.provide),
            u = hg(e);
          const l = Re(),
            c = 1048575 & l.providerIndexes,
            d = l.directiveStart,
            f = l.providerIndexes >> 20;
          if (Gn(e) || !e.multi) {
            const h = new wo(u, o, C),
              p = fc(a, t, o ? c : c + f, d);
            -1 === p
              ? (Bu(as(l, s), i, a),
                dc(i, e, t.length),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = fc(a, t, c + f, d),
              p = fc(a, t, c, c + f),
              v = p >= 0 && n[p];
            if ((o && !v) || (!o && !(h >= 0 && n[h]))) {
              Bu(as(l, s), i, a);
              const _ = (function tN(e, t, n, r, o) {
                const i = new wo(e, n, C);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Jy(i, o, r && !n),
                  i
                );
              })(o ? eN : JT, n.length, o, r, u);
              !o && v && (n[p].providerFactory = _),
                dc(i, e, t.length, 0),
                t.push(a),
                l.directiveStart++,
                l.directiveEnd++,
                o && (l.providerIndexes += 1048576),
                n.push(_),
                s.push(_);
            } else dc(i, e, h > -1 ? h : p, Jy(n[o ? p : h], u, !o && r));
            !o && r && v && n[p].componentProviders++;
          }
        }
      }
      function dc(e, t, n, r) {
        const o = Gn(t),
          i = (function KM(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? P(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function Jy(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function fc(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function JT(e, t, n, r) {
        return hc(this.multi, []);
      }
      function eN(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Hn(n, n[E], this.providerFactory.index, r);
          (i = a.slice(0, s)), hc(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), hc(o, i);
        return i;
      }
      function hc(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function se(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function XT(e, t, n) {
              const r = W();
              if (r.firstCreatePass) {
                const o = bt(e);
                cc(n, r.data, r.blueprint, o, !0),
                  cc(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Gr {}
      class ev {}
      class pc extends Gr {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new am(this));
          const o = rt(t);
          (this._bootstrapComponents = ln(o.bootstrap)),
            (this._r3Injector = Bg(
              t,
              n,
              [
                { provide: Gr, useValue: this },
                { provide: Ps, useValue: this.componentFactoryResolver },
                ...r,
              ],
              we(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class gc extends ev {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new pc(this.moduleType, t, []);
        }
      }
      class tv extends Gr {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new am(this)),
            (this.instance = null);
          const n = new vl(
            [
              ...t.providers,
              { provide: Gr, useValue: this },
              { provide: Ps, useValue: this.componentFactoryResolver },
            ],
            t.parent || Ts(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function mc(e, t, n = null) {
        return new tv({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let oN = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = lg(0, n.type),
                o =
                  r.length > 0
                    ? mc([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = T({
            token: e,
            providedIn: "environment",
            factory: () => new e(N(an)),
          })),
          e
        );
      })();
      function nv(e) {
        e.getStandaloneInjector = (t) =>
          t.get(oN).getOrCreateStandaloneInjector(e);
      }
      function lv(e, t, n, r, o, i) {
        const s = t + n;
        return Le(e, s, o)
          ? (function Wt(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, i ? r.call(i, o) : r(o))
          : (function ii(e, t) {
              const n = e[t];
              return n === B ? void 0 : n;
            })(e, s + 1);
      }
      function gv(e, t, n) {
        const r = e + G,
          o = y(),
          i = (function hr(e, t) {
            return e[t];
          })(o, r);
        return (function si(e, t) {
          return e[E].data[t].pure;
        })(o, r)
          ? lv(
              o,
              (function Be() {
                const e = x.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              i.transform,
              n,
              i
            )
          : i.transform(n);
      }
      function vc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const le = class AN extends Xt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = vc(i)), o && (o = vc(o)), s && (s = vc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ct && t.add(a), a;
        }
      };
      let hn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = xN), e;
      })();
      const NN = hn,
        RN = class extends NN {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n, null);
          }
          createEmbeddedViewImpl(t, n, r) {
            const s = this._declarationTContainer.tView,
              a = Vs(
                this._declarationLView,
                s,
                t,
                4096 & this._declarationLView[V] ? 4096 : 16,
                null,
                s.declTNode,
                null,
                null,
                null,
                n || null,
                r || null
              );
            a[vo] = this._declarationLView[this._declarationTContainer.index];
            const l = this._declarationLView[Vt];
            return (
              null !== l && (a[Vt] = l.createEmbeddedView(s)),
              Ul(s, a, t),
              new zo(a)
            );
          }
        };
      function xN() {
        return (function na(e, t) {
          return 4 & e.type ? new RN(t, e, Tr(e, t)) : null;
        })(Re(), y());
      }
      let It = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $N), e;
      })();
      function $N() {
        return (function _v(e, t) {
          let n;
          const r = t[e.index];
          return (
            Qe(r)
              ? (n = r)
              : ((n = Qg(r, t, null, e)), (t[e.index] = n), $s(t, n)),
            wv(n, t, e, r),
            new Dv(n, e, t)
          );
        })(Re(), y());
      }
      const BN = It,
        Dv = class extends BN {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Tr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new yr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = $u(this._hostTNode, this._hostLView);
            if (Yh(t)) {
              const n = is(t, this._hostLView),
                r = os(t);
              return new yr(n[E].data[r + 8], n);
            }
            return new yr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Cv(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Pe;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function bo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new Wo(Y(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const v = (s ? l : this.parentInjector).get(an, null);
              v && (i = v);
            }
            Y(u.componentType ?? {});
            const h = u.create(l, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView,
              i = o[E];
            if (
              (function jb(e) {
                return Qe(e[ae]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const l = o[ae],
                  c = new Dv(l, l[Fe], l[ae]);
                c.detach(c.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            if (
              ((function hM(e, t, n, r) {
                const o = Pe + r,
                  i = n.length;
                r > 0 && (n[o - 1][Et] = t),
                  r < i - Pe
                    ? ((t[Et] = n[o]), ap(n, Pe + r, t))
                    : (n.push(t), (t[Et] = null)),
                  (t[ae] = n);
                const s = t[vo];
                null !== s &&
                  n !== s &&
                  (function pM(e, t) {
                    const n = e[fr];
                    t[pe] !== t[ae][ae][pe] && (e[fh] = !0),
                      null === n ? (e[fr] = [t]) : n.push(t);
                  })(s, t);
                const a = t[Vt];
                null !== a && a.insertView(e), (t[V] |= 128);
              })(i, o, a, s),
              !r)
            ) {
              const u = ol(s, a),
                l = o[$],
                c = ws(l, a[$t]);
              null !== c &&
                (function cM(e, t, n, r, o, i) {
                  (r[Ee] = o), (r[Fe] = t), Ro(e, r, n, 1, o, i);
                })(i, a[Fe], l, o, c, u);
            }
            return t.attachToViewContainerRef(), ap(_c(a), s, t), t;
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Cv(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = el(this._lContainer, n);
            r && (cs(_c(this._lContainer), n), Op(r[E], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = el(this._lContainer, n);
            return r && null != cs(_c(this._lContainer), n) ? new zo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Cv(e) {
        return e[8];
      }
      function _c(e) {
        return e[8] || (e[8] = []);
      }
      let wv = function Ev(e, t, n, r) {
        if (e[$t]) return;
        let o;
        (o =
          8 & n.type
            ? ie(r)
            : (function jN(e, t) {
                const n = e[$],
                  r = n.createComment(""),
                  o = Ke(t, e);
                return (
                  Un(
                    n,
                    ws(n, o),
                    r,
                    (function vM(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[$t] = o);
      };
      const xc = new S("Application Initializer");
      let Oc = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = b(xc, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const o of this.appInits) {
                const i = o();
                if (Xo(i)) n.push(i);
                else if (xm(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Zv = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const pn = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          b(pn, I.Optional | I.SkipSelf) ||
          (function vR() {
            return (typeof $localize < "u" && $localize.locale) || Ur;
          })(),
      });
      let Yv = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new dt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class CR {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Qv = (() => {
        class e {
          compileModuleSync(n) {
            return new gc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = ln(rt(n).declarations).reduce((s, a) => {
                const u = Y(a);
                return u && s.push(new Wo(u)), s;
              }, []);
            return new CR(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Jv(...e) {}
      class ce {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new le(!1)),
            (this.onMicrotaskEmpty = new le(!1)),
            (this.onStable = new le(!1)),
            (this.onError = new le(!1)),
            typeof Zone > "u")
          )
            throw new D(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function ER() {
              const e = "function" == typeof re.requestAnimationFrame;
              let t = re[e ? "requestAnimationFrame" : "setTimeout"],
                n = re[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function MR(e) {
              const t = () => {
                !(function SR(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(re, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Pc(e),
                                (e.isCheckStableRunning = !0),
                                Fc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Pc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return eD(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      tD(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return eD(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), tD(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Pc(e),
                          Fc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ce.isInAngularZone()) throw new D(909, !1);
        }
        static assertNotInAngularZone() {
          if (ce.isInAngularZone()) throw new D(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, bR, Jv, Jv);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const bR = {};
      function Fc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Pc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function eD(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function tD(e) {
        e._nesting--, Fc(e);
      }
      class IR {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new le()),
            (this.onMicrotaskEmpty = new le()),
            (this.onStable = new le()),
            (this.onError = new le());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const nD = new S("", { providedIn: "root", factory: rD });
      function rD() {
        const e = b(ce);
        let t = !0;
        return (function LE(...e) {
          const t = lo(e),
            n = (function NE(e, t) {
              return "number" == typeof uu(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? ft(r[0]) : ir(n)(Ae(r, t))) : Ot;
        })(
          new ye((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new ye((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ce.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ce.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Hf())
        );
      }
      const oD = new S(""),
        oa = new S("");
      let Vc,
        kc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Vc ||
                  ((function AR(e) {
                    Vc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ce.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(ce), N(Lc), N(oa));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Lc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Vc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        In = null;
      const iD = new S("AllowMultipleToken"),
        $c = new S("PlatformDestroyListeners"),
        Bc = new S("appBootstrapListener");
      class aD {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function lD(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new S(r);
        return (i = []) => {
          let s = jc();
          if (!s || s.injector.get(iD, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function RR(e) {
                  if (In && !In.get(iD, !1)) throw new D(400, !1);
                  (function sD() {
                    !(function Tb(e) {
                      vh = e;
                    })(() => {
                      throw new D(600, !1);
                    });
                  })(),
                    (In = e);
                  const t = e.get(dD);
                  (function uD(e) {
                    e.get(pg, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function cD(e = [], t) {
                    return Gt.create({
                      name: t,
                      providers: [
                        { provide: ml, useValue: "platform" },
                        { provide: $c, useValue: new Set([() => (In = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function OR(e) {
            const t = jc();
            if (!t) throw new D(401, !1);
            return t;
          })();
        };
      }
      function jc() {
        return In?.get(dD) ?? null;
      }
      let dD = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function FR(e = "zone.js", t) {
              return "noop" === e ? new IR() : "zone.js" === e ? new ce(t) : e;
            })(
              r?.ngZone,
              (function fD(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function rN(e, t, n) {
                  return new pc(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function yD(e) {
                    return [
                      { provide: ce, useFactory: e },
                      {
                        provide: ko,
                        multi: !0,
                        useFactory: () => {
                          const t = b(kR, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: mD, useFactory: PR },
                      { provide: nD, useFactory: rD },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(zn, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    ia(this._modules, i), a.unsubscribe();
                  });
                }),
                (function hD(e, t, n) {
                  try {
                    const r = n();
                    return Xo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(Oc);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function Ty(e) {
                          ht(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Ay = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(pn, Ur) || Ur),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = pD({}, r);
            return (function TR(e, t, n) {
              const r = new gc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(qr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new D(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new D(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get($c, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(Gt));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function pD(e, t) {
        return Array.isArray(t) ? t.reduce(pD, e) : { ...e, ...t };
      }
      let qr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = b(mD)),
              (this.zoneIsStable = b(nD)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = b(Yv).hasPendingTasks.pipe(
                Ft((n) => (n ? F(!1) : this.zoneIsStable)),
                (function VE(e, t = Dn) {
                  return (
                    (e = e ?? $E),
                    Ie((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        _e(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Hf()
              )),
              (this._injector = b(an));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof _g;
            if (!this._injector.get(Oc).done)
              throw (
                (!o &&
                  (function ar(e) {
                    const t = Y(e) || Oe(e) || Ye(e);
                    return null !== t && t.standalone;
                  })(n),
                new D(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(Ps).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function NR(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Gr),
              l = s.create(Gt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(oD, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  ia(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new D(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ia(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Bc, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ia(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new D(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ia(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const mD = new S("", {
        providedIn: "root",
        factory: () => b(zn).handleError.bind(void 0),
      });
      function PR() {
        const e = b(ce),
          t = b(zn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let kR = (() => {
        class e {
          constructor() {
            (this.zone = b(ce)), (this.applicationRef = b(qr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      let sa = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = VR), e;
      })();
      function VR(e) {
        return (function $R(e, t, n) {
          if ($n(e) && !n) {
            const r = it(e.index, t);
            return new zo(r, r);
          }
          return 47 & e.type ? new zo(t[pe], t) : null;
        })(Re(), y(), 16 == (16 & e));
      }
      class _D {
        constructor() {}
        supports(t) {
          return Us(t);
        }
        create(t) {
          return new zR(t);
        }
      }
      const GR = (e, t) => t;
      class zR {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || GR);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < ED(r, o, i)) ? n : r,
              a = ED(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Us(t))) throw new D(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function P0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new WR(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new wD()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new wD()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class WR {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class qR {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class wD {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new qR()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ED(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class bD {
        constructor() {}
        supports(t) {
          return t instanceof Map || Gl(t);
        }
        create() {
          return new ZR();
        }
      }
      class ZR {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Gl(t))) throw new D(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new YR(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class YR {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function SD() {
        return new la([new _D()]);
      }
      let la = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || SD()),
              deps: [[e, new hs(), new fs()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = T({ token: e, providedIn: "root", factory: SD })), e;
      })();
      function MD() {
        return new ui([new bD()]);
      }
      let ui = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || MD()),
              deps: [[e, new hs(), new fs()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new D(901, !1);
          }
        }
        return (e.ɵprov = T({ token: e, providedIn: "root", factory: MD })), e;
      })();
      const XR = lD(null, "core", []);
      let JR = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(qr));
          }),
          (e.ɵmod = Lt({ type: e })),
          (e.ɵinj = _t({})),
          e
        );
      })();
      let Zc = null;
      function An() {
        return Zc;
      }
      class dx {}
      const yt = new S("DocumentToken");
      let Yc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return b(hx);
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const fx = new S("Location Initialized");
      let hx = (() => {
        class e extends Yc {
          constructor() {
            super(),
              (this._doc = b(yt)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return An().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = An().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = An().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            this._history.pushState(n, r, o);
          }
          replaceState(n, r, o) {
            this._history.replaceState(n, r, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Qc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function OD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function gn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Kn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return b(PD);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const FD = new S("appBaseHref");
      let PD = (() => {
          class e extends Kn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  b(yt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Qc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  gn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + gn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + gn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(Yc), N(FD, 8));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        px = (() => {
          class e extends Kn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Qc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + gn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + gn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(Yc), N(FD, 8));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Kc = (() => {
          class e {
            constructor(n) {
              (this._subject = new le()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function yx(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(OD(kD(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + gn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function mx(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, kD(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + gn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + gn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = gn),
            (e.joinWithSlash = Qc),
            (e.stripTrailingSlash = OD),
            (e.ɵfac = function (n) {
              return new (n || e)(N(Kn));
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return (function gx() {
                  return new Kc(N(Kn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function kD(e) {
        return e.replace(/\/index.html$/, "");
      }
      const ad = /\s+/,
        zD = [];
      let WD = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this.initialClasses = zD),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(ad) : zD;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(ad) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const r of n) this._updateState(r, !0);
            else if (null != n)
              for (const r of Object.keys(n)) this._updateState(r, !!n[r]);
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const o = this.stateMap.get(n);
            void 0 !== o
              ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                (o.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                o = n[1];
              o.changed
                ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                : o.touched ||
                  (o.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (o.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(ad).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(la), C(ui), C(at), C(un));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class nO {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ZD = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new nO(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), YD(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              YD(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(It), C(hn), C(la));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function YD(e, t) {
        e.context.$implicit = t.item;
      }
      let QD = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new rO()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            KD("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            KD("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(It), C(hn));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class rO {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function KD(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${we(t)}'.`
          );
      }
      const fO =
        /(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])\S*/g;
      let JD = (() => {
          class e {
            transform(n) {
              if (null == n) return null;
              if ("string" != typeof n)
                throw (function Nt(e, t) {
                  return new D(2100, !1);
                })();
              return n.replace(
                fO,
                (r) => r[0].toUpperCase() + r.slice(1).toLowerCase()
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵpipe = Ze({
              name: "titlecase",
              type: e,
              pure: !0,
              standalone: !0,
            })),
            e
          );
        })(),
        IO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({})),
            e
          );
        })();
      function nC(e) {
        return "server" === e;
      }
      let RO = (() => {
        class e {}
        return (
          (e.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new xO(N(yt), window),
          })),
          e
        );
      })();
      class xO {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function OO(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              rC(this.window.history) ||
              rC(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function rC(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class rF extends dx {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class pd extends rF {
        static makeCurrent() {
          !(function cx(e) {
            Zc || (Zc = e);
          })(new pd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function oF() {
            return (
              (fi = fi || document.querySelector("base")),
              fi ? fi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function iF(e) {
                (wa = wa || document.createElement("a")),
                  wa.setAttribute("href", e);
                const t = wa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          fi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function eO(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let wa,
        fi = null,
        aF = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const gd = new S("EventManagerPlugins");
      let uC = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new D(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(gd), N(ce));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class lC {
        constructor(t) {
          this._doc = t;
        }
      }
      const md = "ng-app-id";
      let cC = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = nC(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${md}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(md), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(md, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r);
            n.appendChild(o);
            const i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(yt), N(Ns), N(gg, 8), N(Ar));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const yd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        vd = /%COMP%/g,
        dF = new S("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function fC(e, t) {
        return t.map((n) => n.replace(vd, e));
      }
      let hC = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, l = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = nC(a)),
              (this.defaultRenderer = new Dd(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === nt.ShadowDom &&
              (r = { ...r, encapsulation: nt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof gC
                ? o.applyToHost(n)
                : o instanceof Cd && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                l = this.sharedStylesHost,
                c = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case nt.Emulated:
                  i = new gC(u, l, r, this.appId, c, s, a, d);
                  break;
                case nt.ShadowDom:
                  return new gF(u, l, n, r, s, a, this.nonce, d);
                default:
                  i = new Cd(u, l, r, c, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              N(uC),
              N(cC),
              N(Ns),
              N(dF),
              N(yt),
              N(Ar),
              N(ce),
              N(gg)
            );
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Dd {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(yd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (pC(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (pC(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new D(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = yd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = yd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Xe.DashCase | Xe.Important)
            ? t.style.setProperty(n, r, o & Xe.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Xe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = An().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function pC(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class gF extends Dd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = fC(o.id, o.styles);
          for (const c of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Cd extends Dd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? fC(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class gC extends Cd {
        constructor(t, n, r, o, i, s, a, u) {
          const l = o + "-" + r.id;
          super(t, n, r, i, s, a, u, l),
            (this.contentAttr = (function fF(e) {
              return "_ngcontent-%COMP%".replace(vd, e);
            })(l)),
            (this.hostAttr = (function hF(e) {
              return "_nghost-%COMP%".replace(vd, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let mF = (() => {
        class e extends lC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(yt));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const mC = ["alt", "control", "meta", "shift"],
        yF = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        vF = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let DF = (() => {
        class e extends lC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => An().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              mC.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = yF[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                mC.forEach((s) => {
                  s !== o && (0, vF[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(yt));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const EF = lD(XR, "browser", [
          { provide: Ar, useValue: "browser" },
          {
            provide: pg,
            useValue: function CF() {
              pd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: yt,
            useFactory: function wF() {
              return (
                (function MM(e) {
                  al = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        bF = new S(""),
        DC = [
          {
            provide: oa,
            useClass: class sF {
              addToWindow(t) {
                (re.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new D(5103, !1);
                  return i;
                }),
                  (re.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (re.getAllAngularRootElements = () => t.getAllRootElements()),
                  re.frameworkStabilizers || (re.frameworkStabilizers = []),
                  re.frameworkStabilizers.push((r) => {
                    const o = re.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? An().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: oD, useClass: kc, deps: [ce, Lc, oa] },
          { provide: kc, useClass: kc, deps: [ce, Lc, oa] },
        ],
        CC = [
          { provide: ml, useValue: "root" },
          {
            provide: zn,
            useFactory: function _F() {
              return new zn();
            },
            deps: [],
          },
          { provide: gd, useClass: mF, multi: !0, deps: [yt, ce, Ar] },
          { provide: gd, useClass: DF, multi: !0, deps: [yt] },
          hC,
          cC,
          uC,
          { provide: Eg, useExisting: hC },
          { provide: class FO {}, useClass: aF, deps: [] },
          [],
        ];
      let SF = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: Ns, useValue: n.appId }],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(bF, 12));
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({ providers: [...CC, ...DC], imports: [IO, JR] })),
            e
          );
        })(),
        _C = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(yt));
            }),
            (e.ɵprov = T({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function IF() {
                        return new _C(N(yt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      typeof window < "u" && window;
      const { isArray: xF } = Array,
        { getPrototypeOf: OF, prototype: FF, keys: PF } = Object;
      function SC(e) {
        if (1 === e.length) {
          const t = e[0];
          if (xF(t)) return { args: t, keys: null };
          if (
            (function kF(e) {
              return e && "object" == typeof e && OF(e) === FF;
            })(t)
          ) {
            const n = PF(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: LF } = Array;
      function MC(e) {
        return te((t) =>
          (function VF(e, t) {
            return LF(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function IC(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      let AC = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(un), C(at));
            }),
            (e.ɵdir = O({ type: e })),
            e
          );
        })(),
        Xn = (() => {
          class e extends AC {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = xe(e)))(r || e);
              };
            })()),
            (e.ɵdir = O({ type: e, features: [X] })),
            e
          );
        })();
      const Rt = new S("NgValueAccessor"),
        jF = { provide: Rt, useExisting: ne(() => Ea), multi: !0 },
        UF = new S("CompositionEventMode");
      let Ea = (() => {
        class e extends AC {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function HF() {
                  const e = An() ? An().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(un), C(at), C(UF, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                He("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [se([jF]), X],
          })),
          e
        );
      })();
      const Ve = new S("NgValidators"),
        Rn = new S("NgAsyncValidators");
      function $C(e) {
        return null != e;
      }
      function BC(e) {
        return Xo(e) ? Ae(e) : e;
      }
      function jC(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function HC(e, t) {
        return t.map((n) => n(e));
      }
      function UC(e) {
        return e.map((t) =>
          (function zF(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function wd(e) {
        return null != e
          ? (function GC(e) {
              if (!e) return null;
              const t = e.filter($C);
              return 0 == t.length
                ? null
                : function (n) {
                    return jC(HC(n, t));
                  };
            })(UC(e))
          : null;
      }
      function Ed(e) {
        return null != e
          ? (function zC(e) {
              if (!e) return null;
              const t = e.filter($C);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function $F(...e) {
                      const t = Vf(e),
                        { args: n, keys: r } = SC(e),
                        o = new ye((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let u = s,
                            l = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            ft(n[c]).subscribe(
                              _e(
                                i,
                                (f) => {
                                  d || ((d = !0), l--), (a[c] = f);
                                },
                                () => u--,
                                void 0,
                                () => {
                                  (!u || !d) &&
                                    (l || i.next(r ? IC(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(MC(t)) : o;
                    })(HC(n, t).map(BC)).pipe(te(jC));
                  };
            })(UC(e))
          : null;
      }
      function WC(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function bd(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Sa(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function YC(e, t) {
        const n = bd(t);
        return (
          bd(e).forEach((o) => {
            Sa(n, o) || n.push(o);
          }),
          n
        );
      }
      function QC(e, t) {
        return bd(t).filter((n) => !Sa(e, n));
      }
      class KC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = wd(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Ed(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class ze extends KC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class xn extends KC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class XC {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let JC = (() => {
          class e extends XC {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(xn, 2));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  Ys("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [X],
            })),
            e
          );
        })(),
        e_ = (() => {
          class e extends XC {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(ze, 10));
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  Ys("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [X],
            })),
            e
          );
        })();
      const hi = "VALID",
        Ia = "INVALID",
        Yr = "PENDING",
        pi = "DISABLED";
      function Id(e) {
        return (Aa(e) ? e.validators : e) || null;
      }
      function Ad(e, t) {
        return (Aa(t) ? t.asyncValidators : e) || null;
      }
      function Aa(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class o_ {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === hi;
        }
        get invalid() {
          return this.status === Ia;
        }
        get pending() {
          return this.status == Yr;
        }
        get disabled() {
          return this.status === pi;
        }
        get enabled() {
          return this.status !== pi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(YC(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(YC(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(QC(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(QC(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Sa(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Sa(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Yr),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = pi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = hi),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === hi || this.status === Yr) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? pi : hi;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Yr), (this._hasOwnPendingAsyncValidator = !0);
            const n = BC(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new le()), (this.statusChanges = new le());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? pi
            : this.errors
            ? Ia
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Yr)
            ? Yr
            : this._anyControlsHaveStatus(Ia)
            ? Ia
            : hi;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Aa(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function YF(e) {
              return Array.isArray(e) ? wd(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function QF(e) {
              return Array.isArray(e) ? Ed(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class Td extends o_ {
        constructor(t, n, r) {
          super(Id(n), Ad(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          (function r_(e, t, n) {
            e._forEachChild((r, o) => {
              if (void 0 === n[o]) throw new D(1002, "");
            });
          })(this, 0, t),
            Object.keys(t).forEach((r) => {
              (function n_(e, t, n) {
                const r = e.controls;
                if (!(t ? Object.keys(r) : r).length) throw new D(1e3, "");
                if (!r[n]) throw new D(1001, "");
              })(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const Qr = new S("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Ta,
        }),
        Ta = "always";
      function gi(e, t, n = Ta) {
        Nd(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function JF(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && i_(e, t);
            });
          })(e, t),
          (function tP(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function eP(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && i_(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function XF(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function xa(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function Nd(e, t) {
        const n = (function qC(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators(WC(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = (function ZC(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(WC(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        xa(t._rawValidators, o), xa(t._rawAsyncValidators, o);
      }
      function i_(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const sP = { provide: ze, useExisting: ne(() => Fa) },
        mi = (() => Promise.resolve())();
      let Fa = (() => {
        class e extends ze {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new le()),
              (this.form = new Td({}, wd(n), Ed(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            mi.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                gi(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            mi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            mi.then(() => {
              const r = this._findContainer(n.path),
                o = new Td({});
              (function s_(e, t) {
                Nd(e, t);
              })(o, n),
                r.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            mi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            mi.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function a_(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(C(Ve, 10), C(Rn, 10), C(Qr, 8));
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                He("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [se([sP]), X],
          })),
          e
        );
      })();
      function u_(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function l_(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const c_ = class extends o_ {
          constructor(t = null, n, r) {
            super(Id(n), Ad(r, n)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              Aa(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = l_(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            u_(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            u_(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            l_(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        lP = { provide: xn, useExisting: ne(() => Fd) },
        h_ = (() => Promise.resolve())();
      let Fd = (() => {
          class e extends xn {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new c_()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new le()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function Od(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ea
                        ? (n = i)
                        : (function oP(e) {
                            return Object.getPrototypeOf(e.constructor) === Xn;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function xd(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              gi(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              h_.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function Zr(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              h_.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function Na(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                C(ze, 9),
                C(Ve, 10),
                C(Rn, 10),
                C(Rt, 10),
                C(sa, 8),
                C(Qr, 8)
              );
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [se([lP]), X, pt],
            })),
            e
          );
        })(),
        p_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = O({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        m_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({})),
            e
          );
        })(),
        OP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({ imports: [m_] })),
            e
          );
        })(),
        PP = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Qr, useValue: n.callSetDisabledState ?? Ta },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({ imports: [OP] })),
            e
          );
        })();
      function jd(...e) {
        const t = lo(e),
          n = Vf(e),
          { args: r, keys: o } = SC(e);
        if (0 === r.length) return Ae([], t);
        const i = new ye(
          (function LP(e, t, n = Dn) {
            return (r) => {
              F_(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    F_(
                      t,
                      () => {
                        const l = Ae(e[u], t);
                        let c = !1;
                        l.subscribe(
                          _e(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => IC(o, s) : Dn)
        );
        return n ? i.pipe(MC(n)) : i;
      }
      function F_(e, t, n) {
        e ? Jt(n, e, t) : t();
      }
      const Pa = so(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Hd(...e) {
        return (function VP() {
          return ir(1);
        })()(Ae(e, lo(e)));
      }
      function P_(e) {
        return new ye((t) => {
          ft(e()).subscribe(t);
        });
      }
      function yi(e, t) {
        const n = ee(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ye(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Ud() {
        return Ie((e, t) => {
          let n = null;
          e._refCount++;
          const r = _e(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class k_ extends ye {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Ef(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ct();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                _e(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ct.EMPTY));
          }
          return t;
        }
        refCount() {
          return Ud()(this);
        }
      }
      function Kr(e) {
        return e <= 0
          ? () => Ot
          : Ie((t, n) => {
              let r = 0;
              t.subscribe(
                _e(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function On(e, t) {
        return Ie((n, r) => {
          let o = 0;
          n.subscribe(_e(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function ka(e) {
        return Ie((t, n) => {
          let r = !1;
          t.subscribe(
            _e(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function L_(e = BP) {
        return Ie((t, n) => {
          let r = !1;
          t.subscribe(
            _e(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function BP() {
        return new Pa();
      }
      function er(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? On((o, i) => e(o, i, r)) : Dn,
            Kr(1),
            n ? ka(t) : L_(() => new Pa())
          );
      }
      function vi(e, t) {
        return ee(t) ? Ne(e, t, 1) : Ne(e, 1);
      }
      function We(e, t, n) {
        const r = ee(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ie((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                _e(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Dn;
      }
      function tr(e) {
        return Ie((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            _e(n, void 0, void 0, (s) => {
              (i = ft(e(s, tr(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Gd(e) {
        return e <= 0
          ? () => Ot
          : Ie((t, n) => {
              let r = [];
              t.subscribe(
                _e(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function zd(e) {
        return Ie((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const j = "primary",
        Di = Symbol("RouteTitle");
      class zP {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Xr(e) {
        return new zP(e);
      }
      function WP(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Qt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !V_(e[o], t[o]))) return !1;
        return !0;
      }
      function V_(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function $_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Fn(e) {
        return (function kP(e) {
          return !!e && (e instanceof ye || (ee(e.lift) && ee(e.subscribe)));
        })(e)
          ? e
          : Xo(e)
          ? Ae(Promise.resolve(e))
          : F(e);
      }
      const ZP = {
          exact: function H_(e, t, n) {
            if (
              !nr(e.segments, t.segments) ||
              !La(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !H_(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: U_,
        },
        B_ = {
          exact: function YP(e, t) {
            return Qt(e, t);
          },
          subset: function QP(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => V_(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function j_(e, t, n) {
        return (
          ZP[n.paths](e.root, t.root, n.matrixParams) &&
          B_[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function U_(e, t, n) {
        return G_(e, t, t.segments, n);
      }
      function G_(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!nr(o, n) || t.hasChildren() || !La(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!nr(e.segments, n) || !La(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !U_(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(nr(e.segments, o) && La(e.segments, o, r) && e.children[j]) &&
            G_(e.children[j], t, i, r)
          );
        }
      }
      function La(e, t, n) {
        return t.every((r, o) => B_[n](e[o].parameters, r.parameters));
      }
      class Jr {
        constructor(t = new J([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Xr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return JP.serialize(this);
        }
      }
      class J {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Va(this);
        }
      }
      class Ci {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Xr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return q_(this);
        }
      }
      function nr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let _i = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return new Wd();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class Wd {
        parse(t) {
          const n = new c1(t);
          return new Jr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${wi(t.root, !0)}`,
            r = (function n1(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${$a(n)}=${$a(o)}`).join("&")
                    : `${$a(n)}=${$a(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function e1(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const JP = new Wd();
      function Va(e) {
        return e.segments.map((t) => q_(t)).join("/");
      }
      function wi(e, t) {
        if (!e.hasChildren()) return Va(e);
        if (t) {
          const n = e.children[j] ? wi(e.children[j], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== j && r.push(`${o}:${wi(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function XP(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === j && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== j && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === j ? [wi(e.children[j], !1)] : [`${o}:${wi(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[j]
            ? `${Va(e)}/${n[0]}`
            : `${Va(e)}/(${n.join("//")})`;
        }
      }
      function z_(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function $a(e) {
        return z_(e).replace(/%3B/gi, ";");
      }
      function qd(e) {
        return z_(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ba(e) {
        return decodeURIComponent(e);
      }
      function W_(e) {
        return Ba(e.replace(/\+/g, "%20"));
      }
      function q_(e) {
        return `${qd(e.path)}${(function t1(e) {
          return Object.keys(e)
            .map((t) => `;${qd(t)}=${qd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const r1 = /^[^\/()?;#]+/;
      function Zd(e) {
        const t = e.match(r1);
        return t ? t[0] : "";
      }
      const o1 = /^[^\/()?;=#]+/,
        s1 = /^[^=?&#]+/,
        u1 = /^[^&#]+/;
      class c1 {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new J([], {})
              : new J([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[j] = new J(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Zd(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new D(4009, !1);
          return this.capture(t), new Ci(Ba(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function i1(e) {
            const t = e.match(o1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Zd(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Ba(n)] = Ba(r);
        }
        parseQueryParam(t) {
          const n = (function a1(e) {
            const t = e.match(s1);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function l1(e) {
              const t = e.match(u1);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = W_(n),
            i = W_(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Zd(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new D(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = j);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[j] : new J([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new D(4011, !1);
        }
      }
      function Z_(e) {
        return e.segments.length > 0 ? new J([], { [j]: e }) : e;
      }
      function Y_(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Y_(e.children[r]);
          if (r === j && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function d1(e) {
          if (1 === e.numberOfChildren && e.children[j]) {
            const t = e.children[j];
            return new J(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new J(e.segments, t));
      }
      function rr(e) {
        return e instanceof Jr;
      }
      function Q_(e) {
        let t;
        const o = Z_(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const l = n(u);
              s[u.outlet] = l;
            }
            const a = new J(i.url, s);
            return i === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function K_(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return Yd(o, o, o, n, r);
        const i = (function h1(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new J_(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, l]) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new J_(n, t, r);
        })(t);
        if (i.toRoot()) return Yd(o, o, new J([], {}), n, r);
        const s = (function p1(e, t, n) {
            if (e.isAbsolute) return new Ha(t, !0, 0);
            if (!n) return new Ha(t, !1, NaN);
            if (null === n.parent) return new Ha(n, !0, 0);
            const r = ja(e.commands[0]) ? 0 : 1;
            return (function g1(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new D(4005, !1);
                o = r.segments.length;
              }
              return new Ha(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? bi(s.segmentGroup, s.index, i.commands)
            : ew(s.segmentGroup, s.index, i.commands);
        return Yd(o, s.segmentGroup, a, n, r);
      }
      function ja(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ei(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Yd(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, l]) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : X_(e, t, n));
        const a = Z_(Y_(s));
        return new Jr(a, i, o);
      }
      function X_(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : X_(i, t, n);
          }),
          new J(e.segments, r)
        );
      }
      class J_ {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && ja(r[0]))
          )
            throw new D(4003, !1);
          const o = r.find(Ei);
          if (o && o !== $_(r)) throw new D(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ha {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function ew(e, t, n) {
        if (
          (e || (e = new J([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return bi(e, t, n);
        const r = (function y1(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Ei(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!nw(u, l, s)) return i;
                r += 2;
              } else {
                if (!nw(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new J(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[j] = new J(e.segments.slice(r.pathIndex), e.children)),
            bi(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new J(e.segments, {})
          : r.match && !e.hasChildren()
          ? Qd(e, t, n)
          : r.match
          ? bi(e, 0, o)
          : Qd(e, t, n);
      }
      function bi(e, t, n) {
        if (0 === n.length) return new J(e.segments, {});
        {
          const r = (function m1(e) {
              return Ei(e[0]) ? e[0].outlets : { [j]: e };
            })(n),
            o = {};
          if (
            !r[j] &&
            e.children[j] &&
            1 === e.numberOfChildren &&
            0 === e.children[j].segments.length
          ) {
            const i = bi(e.children[j], t, n);
            return new J(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = ew(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new J(e.segments, o)
          );
        }
      }
      function Qd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Ei(i)) {
            const u = v1(i.outlets);
            return new J(r, u);
          }
          if (0 === o && ja(n[0])) {
            r.push(new Ci(e.segments[t].path, tw(n[0]))), o++;
            continue;
          }
          const s = Ei(i) ? i.outlets[j] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && ja(a)
            ? (r.push(new Ci(s, tw(a))), (o += 2))
            : (r.push(new Ci(s, {})), o++);
        }
        return new J(r, {});
      }
      function v1(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = Qd(new J([], {}), 0, r));
          }),
          t
        );
      }
      function tw(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function nw(e, t, n) {
        return e == n.path && Qt(t, n.parameters);
      }
      const Si = "imperative";
      class Kt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Kd extends Kt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class or extends Kt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ua extends Kt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Mi extends Kt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Xd extends Kt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class D1 extends Kt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class C1 extends Kt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _1 extends Kt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class w1 extends Kt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class E1 extends Kt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class b1 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class S1 {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class M1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class I1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class A1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class T1 {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class rw {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class N1 {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Ii()),
            (this.attachRef = null);
        }
      }
      let Ii = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new N1()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class ow {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Jd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Jd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = ef(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return ef(t, this._root).map((n) => n.value);
        }
      }
      function Jd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Jd(e, n);
          if (r) return r;
        }
        return null;
      }
      function ef(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = ef(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class yn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function eo(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class iw extends ow {
        constructor(t, n) {
          super(t), (this.snapshot = n), tf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function sw(e, t) {
        const n = (function R1(e, t) {
            const s = new Ga([], {}, {}, "", {}, j, t, null, {});
            return new uw("", new yn(s, []));
          })(0, t),
          r = new dt([new Ci("", {})]),
          o = new dt({}),
          i = new dt({}),
          s = new dt({}),
          a = new dt(""),
          u = new to(r, o, s, a, i, j, t, n.root);
        return (u.snapshot = n.root), new iw(new yn(u, []), n);
      }
      class to {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title =
              this.dataSubject?.pipe(te((l) => l[Di])) ?? F(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(te((t) => Xr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(te((t) => Xr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function aw(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function x1(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ga {
        get title() {
          return this.data?.[Di];
        }
        constructor(t, n, r, o, i, s, a, u, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Xr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Xr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class uw extends ow {
        constructor(t, n) {
          super(n), (this.url = t), tf(this, n);
        }
        toString() {
          return lw(this._root);
        }
      }
      function tf(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => tf(e, n));
      }
      function lw(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(lw).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function nf(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Qt(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Qt(t.params, n.params) || e.paramsSubject.next(n.params),
            (function qP(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Qt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Qt(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function rf(e, t) {
        const n =
          Qt(e.params, t.params) &&
          (function KP(e, t) {
            return (
              nr(e, t) && e.every((n, r) => Qt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || rf(e.parent, t.parent))
        );
      }
      let cw = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = j),
              (this.activateEvents = new le()),
              (this.deactivateEvents = new le()),
              (this.attachEvents = new le()),
              (this.detachEvents = new le()),
              (this.parentContexts = b(Ii)),
              (this.location = b(It)),
              (this.changeDetector = b(sa)),
              (this.environmentInjector = b(an)),
              (this.inputBinder = b(za, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new D(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new D(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new D(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new D(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new O1(n, a, o.injector);
            (this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = O({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [pt],
          })),
          e
        );
      })();
      class O1 {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === to
            ? this.route
            : t === Ii
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const za = new S("");
      let dw = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              o = jd([r.queryParams, r.params, r.data])
                .pipe(
                  Ft(
                    ([i, s, a], u) => (
                      (a = { ...i, ...s, ...a }),
                      0 === u ? F(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function lx(e) {
                    const t = Y(e);
                    if (!t) return null;
                    const n = new Wo(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, i[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Ai(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function P1(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ai(e, r, o);
              return Ai(e, r);
            });
          })(e, t, n);
          return new yn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ai(e, a))),
                s
              );
            }
          }
          const r = (function k1(e) {
              return new to(
                new dt(e.url),
                new dt(e.params),
                new dt(e.queryParams),
                new dt(e.fragment),
                new dt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ai(e, i));
          return new yn(r, o);
        }
      }
      const sf = "ngNavigationCancelingError";
      function fw(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = rr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = hw(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function hw(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[sf] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function pw(e) {
        return gw(e) && rr(e.url);
      }
      function gw(e) {
        return e && e[sf];
      }
      let mw = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = go({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [nv],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Ko(0, "router-outlet");
            },
            dependencies: [cw],
            encapsulation: 2,
          })),
          e
        );
      })();
      function af(e) {
        const t = e.children && e.children.map(af),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== j &&
            (n.component = mw),
          n
        );
      }
      function xt(e) {
        return e.outlet || j;
      }
      function Ti(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class U1 {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            nf(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = eo(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = eo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = eo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = eo(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new T1(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new I1(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((nf(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                nf(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ti(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class yw {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Wa {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function G1(e, t, n) {
        const r = e._root;
        return Ni(r, t ? t._root : null, n, [r.value]);
      }
      function no(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function WE(e) {
              return null !== Bi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Ni(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = eo(t);
        return (
          e.children.forEach((s) => {
            (function W1(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function q1(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !nr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !nr(e.url, t.url) || !Qt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !rf(e, t) || !Qt(e.queryParams, t.queryParams);
                    default:
                      return !rf(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new yw(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Ni(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Wa(a.outlet.component, s));
              } else
                s && Ri(t, a, o),
                  o.canActivateChecks.push(new yw(r)),
                  Ni(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => Ri(a, n.getContext(s), o)),
          o
        );
      }
      function Ri(e, t, n) {
        const r = eo(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          Ri(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Wa(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function xi(e) {
        return "function" == typeof e;
      }
      function vw(e) {
        return e instanceof Pa || "EmptyError" === e?.name;
      }
      const qa = Symbol("INITIAL_VALUE");
      function ro() {
        return Ft((e) =>
          jd(
            e.map((t) =>
              t.pipe(
                Kr(1),
                (function $P(...e) {
                  const t = lo(e);
                  return Ie((n, r) => {
                    (t ? Hd(e, n, t) : Hd(e, n)).subscribe(r);
                  });
                })(qa)
              )
            )
          ).pipe(
            te((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === qa) return qa;
                  if (!1 === n || n instanceof Jr) return n;
                }
              return !0;
            }),
            On((t) => t !== qa),
            Kr(1)
          )
        );
      }
      function Dw(e) {
        return (function Zw(...e) {
          return Cf(e);
        })(
          We((t) => {
            if (rr(t)) throw fw(0, t);
          }),
          te((t) => !0 === t)
        );
      }
      class Za {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Cw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function oo(e) {
        return yi(new Za(e));
      }
      function _w(e) {
        return yi(new Cw(e));
      }
      class hk {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new D(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return F(r);
            if (o.numberOfChildren > 1 || !o.children[j])
              return yi(new D(4e3, !1));
            o = o.children[j];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Jr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new J(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new D(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const uf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function pk(e, t, n, r, o) {
        const i = lf(e, t, n);
        return i.matched
          ? ((r = (function L1(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = mc(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function ck(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? F(
                    o.map((s) => {
                      const a = no(s, e);
                      return Fn(
                        (function J1(e) {
                          return e && xi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(ro(), Dw())
                : F(!0);
            })(r, t, n).pipe(te((s) => (!0 === s ? i : { ...uf }))))
          : F(i);
      }
      function lf(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...uf }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || WP)(n, e, t);
        if (!o) return { ...uf };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function ww(e, t, n, r) {
        return n.length > 0 &&
          (function yk(e, t, n) {
            return n.some((r) => Ya(e, t, r) && xt(r) !== j);
          })(e, n, r)
          ? {
              segmentGroup: new J(t, mk(r, new J(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function vk(e, t, n) {
              return n.some((r) => Ya(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new J(e.segments, gk(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new J(e.segments, e.children), slicedSegments: n };
      }
      function gk(e, t, n, r, o) {
        const i = {};
        for (const s of r)
          if (Ya(e, n, s) && !o[xt(s)]) {
            const a = new J([], {});
            i[xt(s)] = a;
          }
        return { ...o, ...i };
      }
      function mk(e, t) {
        const n = {};
        n[j] = t;
        for (const r of e)
          if ("" === r.path && xt(r) !== j) {
            const o = new J([], {});
            n[xt(r)] = o;
          }
        return n;
      }
      function Ya(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class wk {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new hk(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new D(4002, !1);
        }
        recognize() {
          const t = ww(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            j
          ).pipe(
            tr((n) => {
              if (n instanceof Cw)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Za ? this.noMatchError(n) : n;
            }),
            te((n) => {
              const r = new Ga(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  j,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new yn(r, n),
                i = new uw("", o),
                s = (function f1(e, t, n = null, r = null) {
                  return K_(Q_(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            j
          ).pipe(
            tr((r) => {
              throw r instanceof Za ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = aw(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ae(o).pipe(
            vi((i) => {
              const s = r.children[i],
                a = (function j1(e, t) {
                  const n = e.filter((r) => xt(r) === t);
                  return n.push(...e.filter((r) => xt(r) !== t)), n;
                })(n, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function HP(e, t) {
              return Ie(
                (function jP(e, t, n, r, o) {
                  return (i, s) => {
                    let a = n,
                      u = t,
                      l = 0;
                    i.subscribe(
                      _e(
                        s,
                        (c) => {
                          const d = l++;
                          (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((i, s) => (i.push(...s), i)),
            ka(null),
            (function UP(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? On((o, i) => e(o, i, r)) : Dn,
                  Gd(1),
                  n ? ka(t) : L_(() => new Pa())
                );
            })(),
            Ne((i) => {
              if (null === i) return oo(r);
              const s = Ew(i);
              return (
                (function Ek(e) {
                  e.sort((t, n) =>
                    t.value.outlet === j
                      ? -1
                      : n.value.outlet === j
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                F(s)
              );
            })
          );
        }
        processSegment(t, n, r, o, i, s) {
          return Ae(n).pipe(
            vi((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                i,
                s
              ).pipe(
                tr((u) => {
                  if (u instanceof Za) return F(null);
                  throw u;
                })
              )
            ),
            er((a) => !!a),
            tr((a) => {
              if (vw(a))
                return (function Ck(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? F([])
                  : oo(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return (function Dk(e, t, n, r) {
            return (
              !!(xt(e) === r || (r !== j && Ya(t, n, e))) &&
              ("**" === e.path || lf(t, e, n).matched)
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
              : oo(o)
            : oo(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? _w(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                Ne((s) => {
                  const a = new J(s, {});
                  return this.processSegment(t, n, a, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = lf(n, o, i);
          if (!a) return oo(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            c
          );
          return o.redirectTo.startsWith("/")
            ? _w(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Ne((f) => this.processSegment(t, r, n, f.concat(l), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? $_(o).parameters : {};
            (a = F({
              snapshot: new Ga(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                bw(r),
                xt(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                Sw(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = pk(n, r, o, t).pipe(
              te(
                ({
                  matched: u,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new Ga(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          bw(r),
                          xt(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          Sw(r)
                        ),
                        consumedSegments: l,
                        remainingSegments: c,
                      }
                    : null
              )
            );
          return a.pipe(
            Ft((u) =>
              null === u
                ? oo(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    Ft(({ routes: l }) => {
                      const c = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = ww(n, f, h, l);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(c, l, p).pipe(
                          te((_) => (null === _ ? null : [new yn(d, _)]))
                        );
                      if (0 === l.length && 0 === g.length)
                        return F([new yn(d, [])]);
                      const v = xt(r) === i;
                      return this.processSegment(
                        c,
                        l,
                        p,
                        g,
                        v ? j : i,
                        !0
                      ).pipe(te((_) => [new yn(d, _)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? F({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? F({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function lk(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? F(!0)
                    : F(
                        o.map((s) => {
                          const a = no(s, e);
                          return Fn(
                            (function Y1(e) {
                              return e && xi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(ro(), Dw());
                })(t, n, r).pipe(
                  Ne((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          We((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function fk(e) {
                          return yi(hw(!1, 3));
                        })()
                  )
                )
            : F({ routes: [], injector: t });
        }
      }
      function bk(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function Ew(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!bk(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Ew(r.children);
          t.push(new yn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function bw(e) {
        return e.data || {};
      }
      function Sw(e) {
        return e.resolve || {};
      }
      function Mw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function cf(e) {
        return Ft((t) => {
          const n = e(t);
          return n ? Ae(n).pipe(te(() => t)) : F(t);
        });
      }
      const io = new S("ROUTES");
      let df = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = b(Qv));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return F(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Fn(n.loadComponent()).pipe(
                te(Iw),
                We((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                zd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new k_(r, () => new Xt()).pipe(Ud());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return F({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                te((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u, l;
                  return (
                    Array.isArray(a)
                      ? (l = a)
                      : ((u = a.create(n).injector),
                        (l = u.get(io, [], I.Self | I.Optional).flat())),
                    { routes: l.map(af), injector: u }
                  );
                }),
                zd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new k_(i, () => new Xt()).pipe(Ud());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Fn(n()).pipe(
              te(Iw),
              Ne((r) =>
                r instanceof ev || Array.isArray(r)
                  ? F(r)
                  : Ae(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Iw(e) {
        return (function Rk(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Qa = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Xt()),
              (this.configLoader = b(df)),
              (this.environmentInjector = b(an)),
              (this.urlSerializer = b(_i)),
              (this.rootContexts = b(Ii)),
              (this.inputBindingEnabled = null !== b(za, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => F(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new S1(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new b1(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new dt({
                id: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Si,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                On((r) => 0 !== r.id),
                te((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Ft((r) => {
                  let o = !1,
                    i = !1;
                  return F(r).pipe(
                    We((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Ft((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Mi(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Ot
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          Aw(s.source) && (n.browserUrlTree = s.extractedUrl),
                          F(s).pipe(
                            Ft((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Kd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? Ot
                                  : Promise.resolve(c)
                              );
                            }),
                            (function Sk(e, t, n, r, o, i) {
                              return Ne((s) =>
                                (function _k(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new wk(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    s,
                                    i
                                  ).recognize();
                                })(e, t, n, r, s.extractedUrl, o, i).pipe(
                                  te(({ state: a, tree: u }) => ({
                                    ...s,
                                    targetSnapshot: a,
                                    urlAfterRedirects: u,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            We((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                (r.urlAfterRedirects = c.urlAfterRedirects),
                                (this.currentNavigation = {
                                  ...this.currentNavigation,
                                  finalUrl: c.urlAfterRedirects,
                                }),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new D1(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new Kd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const v = sw(0, this.rootComponentType).snapshot;
                        return F(
                          (r = {
                            ...s,
                            targetSnapshot: v,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Mi(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Ot
                        );
                      }
                    }),
                    We((s) => {
                      const a = new C1(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    te(
                      (s) =>
                        (r = {
                          ...s,
                          guards: G1(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function tk(e, t) {
                      return Ne((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? F({ ...n, guardsResult: !0 })
                          : (function nk(e, t, n, r) {
                              return Ae(e).pipe(
                                Ne((o) =>
                                  (function uk(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? F(
                                          i.map((a) => {
                                            const u = Ti(t) ?? o,
                                              l = no(a, u);
                                            return Fn(
                                              (function X1(e) {
                                                return e && xi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(er());
                                          })
                                        ).pipe(ro())
                                      : F(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                er((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Ne((a) =>
                                a &&
                                (function Z1(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function rk(e, t, n, r) {
                                      return Ae(t).pipe(
                                        vi((o) =>
                                          Hd(
                                            (function ik(e, t) {
                                              return (
                                                null !== e && t && t(new M1(e)),
                                                F(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function ok(e, t) {
                                              return (
                                                null !== e && t && t(new A1(e)),
                                                F(!0)
                                              );
                                            })(o.route, r),
                                            (function ak(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function z1(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    P_(() =>
                                                      F(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              Ti(s.node) ?? n,
                                                            c = no(u, l);
                                                          return Fn(
                                                            (function K1(e) {
                                                              return (
                                                                e &&
                                                                xi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(er());
                                                        })
                                                      ).pipe(ro())
                                                    )
                                                  );
                                              return F(i).pipe(ro());
                                            })(e, o.path, n),
                                            (function sk(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return F(!0);
                                              const o = r.map((i) =>
                                                P_(() => {
                                                  const s = Ti(t) ?? n,
                                                    a = no(i, s);
                                                  return Fn(
                                                    (function Q1(e) {
                                                      return (
                                                        e && xi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(er());
                                                })
                                              );
                                              return F(o).pipe(ro());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        er((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : F(a)
                              ),
                              te((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    We((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), rr(s.guardsResult))
                      )
                        throw fw(0, s.guardsResult);
                      const a = new _1(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    On(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    cf((s) => {
                      if (s.guards.canActivateChecks.length)
                        return F(s).pipe(
                          We((a) => {
                            const u = new w1(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Ft((a) => {
                            let u = !1;
                            return F(a).pipe(
                              (function Mk(e, t) {
                                return Ne((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return F(n);
                                  let i = 0;
                                  return Ae(o).pipe(
                                    vi((s) =>
                                      (function Ik(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Mw(o) &&
                                            (i[Di] = o.title),
                                          (function Ak(e, t, n, r) {
                                            const o = (function Tk(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return F({});
                                            const i = {};
                                            return Ae(o).pipe(
                                              Ne((s) =>
                                                (function Nk(e, t, n, r) {
                                                  const o = Ti(t) ?? r,
                                                    i = no(e, o);
                                                  return Fn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  er(),
                                                  We((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Gd(1),
                                              (function GP(e) {
                                                return te(() => e);
                                              })(i),
                                              tr((s) => (vw(s) ? Ot : yi(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            te(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = aw(e, n).resolve),
                                                o &&
                                                  Mw(o) &&
                                                  (e.data[Di] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    We(() => i++),
                                    Gd(1),
                                    Ne((s) => (i === o.length ? F(n) : Ot))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              We({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          We((a) => {
                            const u = new E1(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    cf((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              We((c) => {
                                u.component = c;
                              }),
                              te(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return jd(a(s.targetSnapshot.root)).pipe(ka(), Kr(1));
                    }),
                    cf(() => this.afterPreactivation()),
                    te((s) => {
                      const a = (function F1(e, t, n) {
                        const r = Ai(e, t._root, n ? n._root : void 0);
                        return new iw(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    We((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n, r) =>
                      te(
                        (o) => (
                          new U1(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (s) => this.events.next(s),
                      this.inputBindingEnabled
                    ),
                    Kr(1),
                    We({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new or(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    zd(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    tr((s) => {
                      if (((i = !0), gw(s))) {
                        pw(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Ua(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), pw(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || Aw(r.source),
                            };
                          n.scheduleNavigation(u, Si, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new Xd(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return Ot;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ua(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Aw(e) {
        return e !== Si;
      }
      let Tw = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === j));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Di];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return b(xk);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        xk = (() => {
          class e extends Tw {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(N(_C));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Ok = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return b(Pk);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Fk {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let Pk = (() => {
        class e extends Fk {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = xe(e)))(r || e);
            };
          })()),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ka = new S("", { providedIn: "root", factory: () => ({}) });
      let kk = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return b(Lk);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Lk = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      var lt = (() => (
        ((lt = lt || {})[(lt.COMPLETE = 0)] = "COMPLETE"),
        (lt[(lt.FAILED = 1)] = "FAILED"),
        (lt[(lt.REDIRECTING = 2)] = "REDIRECTING"),
        lt
      ))();
      function Nw(e, t) {
        e.events
          .pipe(
            On(
              (n) =>
                n instanceof or ||
                n instanceof Ua ||
                n instanceof Xd ||
                n instanceof Mi
            ),
            te((n) =>
              n instanceof or || n instanceof Mi
                ? lt.COMPLETE
                : n instanceof Ua && (0 === n.code || 1 === n.code)
                ? lt.REDIRECTING
                : lt.FAILED
            ),
            On((n) => n !== lt.REDIRECTING),
            Kr(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function Vk(e) {
        throw e;
      }
      function $k(e, t, n) {
        return t.parse("/");
      }
      const Bk = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        jk = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Ct = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = b(Zv)),
              (this.isNgZoneEnabled = !1),
              (this.options = b(Ka, { optional: !0 }) || {}),
              (this.pendingTasks = b(Yv)),
              (this.errorHandler = this.options.errorHandler || Vk),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || $k),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = b(kk)),
              (this.routeReuseStrategy = b(Ok)),
              (this.titleStrategy = b(Tw)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = b(io, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = b(Qa)),
              (this.urlSerializer = b(_i)),
              (this.location = b(Kc)),
              (this.componentInputBindingEnabled = !!b(za, { optional: !0 })),
              (this.isNgZoneEnabled =
                b(ce) instanceof ce && ce.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Jr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = sw(0, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Si, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(af)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s;
            let d,
              c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            null !== c && (c = this.removeEmptyProps(c));
            try {
              d = Q_(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (d = this.currentUrlTree.root);
            }
            return K_(d, n, c, l ?? null);
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = rr(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Si, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function Hk(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new D(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...Bk } : !1 === r ? { ...jk } : r), rr(n)))
              return j_(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return j_(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l;
            s
              ? ((a = s.resolve), (u = s.reject), (l = s.promise))
              : (l = new Promise((d, f) => {
                  (a = d), (u = f);
                }));
            const c = this.pendingTasks.add();
            return (
              Nw(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(c));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(
                  r.id,
                  (this.browserPageId ?? 0) + 1
                ),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class Rw {}
      let zk = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                On((n) => n instanceof or),
                vi(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = mc(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Ae(o).pipe(ir());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : F(null);
              const i = o.pipe(
                Ne((s) =>
                  null === s
                    ? F(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ae([i, this.loader.loadComponent(r)]).pipe(ir())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(Ct), N(Qv), N(an), N(Rw), N(df));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const hf = new S("");
      let xw = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Kd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof or
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof Mi &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof rw &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new rw(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function jg() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function vn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Fw() {
        const e = b(Gt);
        return (t) => {
          const n = e.get(qr);
          if (t !== n.components[0]) return;
          const r = e.get(Ct),
            o = e.get(Pw);
          1 === e.get(pf) && r.initialNavigation(),
            e.get(kw, null, I.Optional)?.setUpPreloading(),
            e.get(hf, null, I.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const Pw = new S("", { factory: () => new Xt() }),
        pf = new S("", { providedIn: "root", factory: () => 1 }),
        kw = new S("");
      function Yk(e) {
        return vn(0, [
          { provide: kw, useExisting: zk },
          { provide: Rw, useExisting: e },
        ]);
      }
      const Lw = new S("ROUTER_FORROOT_GUARD"),
        Kk = [
          Kc,
          { provide: _i, useClass: Wd },
          Ct,
          Ii,
          {
            provide: to,
            useFactory: function Ow(e) {
              return e.routerState.root;
            },
            deps: [Ct],
          },
          df,
          [],
        ];
      function Xk() {
        return new aD("Router", Ct);
      }
      let Vw = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                Kk,
                [],
                { provide: io, multi: !0, useValue: n },
                {
                  provide: Lw,
                  useFactory: nL,
                  deps: [[Ct, new fs(), new hs()]],
                },
                { provide: Ka, useValue: r || {} },
                r?.useHash
                  ? { provide: Kn, useClass: px }
                  : { provide: Kn, useClass: PD },
                {
                  provide: hf,
                  useFactory: () => {
                    const e = b(RO),
                      t = b(ce),
                      n = b(Ka),
                      r = b(Qa),
                      o = b(_i);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new xw(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? Yk(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: aD, multi: !0, useFactory: Xk },
                r?.initialNavigation ? rL(r) : [],
                r?.bindToComponentInputs
                  ? vn(8, [dw, { provide: za, useExisting: dw }]).ɵproviders
                  : [],
                [
                  { provide: $w, useFactory: Fw },
                  { provide: Bc, multi: !0, useExisting: $w },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: io, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(N(Lw, 8));
          }),
          (e.ɵmod = Lt({ type: e })),
          (e.ɵinj = _t({})),
          e
        );
      })();
      function nL(e) {
        return "guarded";
      }
      function rL(e) {
        return [
          "disabled" === e.initialNavigation
            ? vn(3, [
                {
                  provide: xc,
                  multi: !0,
                  useFactory: () => {
                    const t = b(Ct);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: pf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? vn(2, [
                { provide: pf, useValue: 0 },
                {
                  provide: xc,
                  multi: !0,
                  deps: [Gt],
                  useFactory: (t) => {
                    const n = t.get(fx, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(Ct),
                              i = t.get(Pw);
                            Nw(o, () => {
                              r(!0);
                            }),
                              (t.get(Qa).afterPreactivation = () => (
                                r(!0), i.closed ? F(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const $w = new S(""),
        iL = [];
      let sL = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e })),
            (e.ɵinj = _t({ imports: [Vw.forRoot(iL), Vw] })),
            e
          );
        })(),
        aL = (() => {
          class e {
            calculateStrength(n) {
              n.split("");
              const i = ' ! @ # $ % ^ & * ( ) - _ + = { } : " , . < > ~ / ',
                s = "a-zA-Z",
                a = "0-9";
              return 0 === n.length
                ? ["gray", "gray", "gray"]
                : n.length < 8
                ? ["red", "red", "red"]
                : new RegExp(`^[${s}]+$`).test(n) ||
                  new RegExp(`^[${a}]+$`).test(n) ||
                  new RegExp(`^[${i}]+$`).test(n)
                ? ["red", "gray", "gray"]
                : new RegExp(`^[${s}]+[${i}]+$`).test(n) ||
                  new RegExp(`^[${i}]+[${a}]+$`).test(n) ||
                  new RegExp(`^[${s}]+[${a}]+$`).test(n) ||
                  new RegExp(`^[${a}]+[${i}]+$`).test(n) ||
                  new RegExp(`^[${a}]+[${s}]+$`).test(n) ||
                  new RegExp(`^[${i}]+[${s}]+$`).test(n)
                ? ["yellow", "yellow", "gray"]
                : ["green", "green", "green"];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function uL(e, t) {
        if (1 & e) {
          const n = (function Rm() {
            return y();
          })();
          dn(0, "button", 1),
            He("click", function () {
              return (
                (function Oh(e) {
                  return (x.lFrame.contextLView = e), e[he];
                })(n),
                (function Fh(e) {
                  return (x.lFrame.contextLView = null), e;
                })(ec().onClearClick())
              );
            }),
            Ks(1, "\u2715"),
            fn();
        }
      }
      let lL = (() => {
        class e {
          constructor() {
            (this.showButton = !1), (this.clearClick = new le());
          }
          onClearClick() {
            this.clearClick.emit();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = go({
            type: e,
            selectors: [["app-clear-button"]],
            inputs: { showButton: "showButton" },
            outputs: { clearClick: "clearClick" },
            decls: 1,
            vars: 1,
            consts: [
              ["class", "clear-button", 3, "click", 4, "ngIf"],
              [1, "clear-button", 3, "click"],
            ],
            template: function (n, r) {
              1 & n && Ql(0, uL, 2, 0, "button", 0),
                2 & n && qn("ngIf", r.showButton);
            },
            dependencies: [QD],
            styles: [
              ".clear-button[_ngcontent-%COMP%]{position:absolute;right:306px;top:145px;transform:translateY(-50%);background:transparent;border:none;outline:none;cursor:pointer;display:block;width:24px;height:24px;line-height:12px;text-align:center;font-weight:700;color:#9e9e9e;text-shadow:1px 1px 1px rgba(0,0,0,.3);border:1px solid rgba(0,0,0,.3);border-radius:4px;box-shadow:inset 0 -5px 45px #64646433,0 1px 1px #fff3;transition:box-shadow .5s ease,border .5s ease}.clear-button[_ngcontent-%COMP%]:hover{box-shadow:inset 0 -5px 45px #64646499,0 1px 1px #fff6;border:1px solid rgba(255,255,255,.6)}",
            ],
          })),
          e
        );
      })();
      function cL(e, t) {
        if ((1 & e && Ko(0, "div", 6), 2 & e)) {
          const n = t.index;
          qn("ngClass", ec().getStrengthClass(n));
        }
      }
      let dL = (() => {
          class e {
            constructor(n) {
              (this.passwordService = n),
                (this.password = ""),
                (this.passwordStrength = ["gray", "gray", "gray"]),
                (this.onChange = () => {}),
                (this.onTouch = () => {});
            }
            ngOnInit() {
              this.calculateStrength();
            }
            writeValue(n) {
              void 0 !== n && ((this.password = n), this.calculateStrength());
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            registerOnTouched(n) {
              this.onTouch = n;
            }
            setDisabledState(n) {}
            calculateStrength() {
              (this.passwordStrength = this.passwordService.calculateStrength(
                this.password
              )),
                this.onChange(this.password);
            }
            getStrengthClass(n) {
              return this.passwordStrength[n];
            }
            clearPassword() {
              (this.password = ""), this.calculateStrength(), this.onTouch();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(C(aL));
            }),
            (e.ɵcmp = go({
              type: e,
              selectors: [["app-password"]],
              features: [
                se([{ provide: Rt, useExisting: ne(() => e), multi: !0 }]),
              ],
              decls: 7,
              vars: 3,
              consts: [
                [1, "form-password-container"],
                ["for", "password", 1, "password-label"],
                [
                  "placeholder",
                  "Enter your password...",
                  "type",
                  "password",
                  "id",
                  "password",
                  "name",
                  "password",
                  1,
                  "password-input",
                  3,
                  "ngModel",
                  "ngModelChange",
                  "input",
                ],
                [3, "showButton", "clearClick"],
                [1, "wrapper"],
                [
                  "class",
                  "strength-section",
                  3,
                  "ngClass",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "strength-section", 3, "ngClass"],
              ],
              template: function (n, r) {
                1 & n &&
                  (dn(0, "form", 0)(1, "label", 1),
                  Ks(2, "Password"),
                  fn(),
                  dn(3, "input", 2),
                  He("ngModelChange", function (i) {
                    return (r.password = i);
                  })("input", function () {
                    return r.calculateStrength(), r.onTouch();
                  }),
                  fn(),
                  dn(4, "app-clear-button", 3),
                  He("clearClick", function () {
                    return r.clearPassword();
                  }),
                  fn()(),
                  dn(5, "div", 4),
                  Ql(6, cL, 1, 1, "div", 5),
                  fn()),
                  2 & n &&
                    (Ho(3),
                    qn("ngModel", r.password),
                    Ho(1),
                    qn("showButton", "" !== r.password),
                    Ho(2),
                    qn("ngForOf", r.passwordStrength));
              },
              dependencies: [WD, ZD, p_, Ea, JC, e_, Fd, Fa, lL],
              styles: [
                ".form-password-container[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:20px;align-items:center;flex-direction:column}.password-label[_ngcontent-%COMP%]{color:#fff;text-shadow:0 0 10px rgba(0,0,0,.3);letter-spacing:1px;text-align:left;font-size:18px;font-weight:400;margin-bottom:4px;margin-right:160px}.password-input[_ngcontent-%COMP%]{min-width:250px;background:rgba(0,0,0,.3);border:none;outline:none;padding:10px;font-size:13px;color:#fff;text-shadow:1px 1px 1px rgba(0,0,0,.3);border:1px solid rgba(0,0,0,.3);border-radius:4px;box-shadow:inset 0 -5px 45px #64646433,0 1px 1px #fff3;transition:box-shadow .5s ease,border .5s ease}.password-input[_ngcontent-%COMP%]:focus{box-shadow:inset 0 -5px 45px #64646499,0 1px 1px #fff6;border:1px solid rgba(255,255,255,.6)}.wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center}.strength-section[_ngcontent-%COMP%]{width:60px;height:8px;margin:14px;display:flex}.red[_ngcontent-%COMP%]{background-color:red}.yellow[_ngcontent-%COMP%]{background-color:#ff0}.green[_ngcontent-%COMP%]{background-color:green}.gray[_ngcontent-%COMP%]{background-color:gray}",
              ],
            })),
            e
          );
        })(),
        fL = (() => {
          class e {
            constructor() {
              this.title = "Password Tester";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = go({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 3,
              consts: [[1, "title"]],
              template: function (n, r) {
                1 & n &&
                  (dn(0, "h1", 0),
                  Ks(1),
                  (function pv(e, t) {
                    const n = W();
                    let r;
                    const o = e + G;
                    n.firstCreatePass
                      ? ((r = (function EN(e, t) {
                          if (t)
                            for (let n = t.length - 1; n >= 0; n--) {
                              const r = t[n];
                              if (e === r.name) return r;
                            }
                        })(t, n.pipeRegistry)),
                        (n.data[o] = r),
                        r.onDestroy &&
                          (n.destroyHooks ??= []).push(o, r.onDestroy))
                      : (r = n.data[o]);
                    const i = r.factory || (r.factory = Bn(r.type)),
                      s = qe(C);
                    try {
                      const a = ss(!1),
                        u = i();
                      return (
                        ss(a),
                        (function nA(e, t, n, r) {
                          n >= e.data.length &&
                            ((e.data[n] = null), (e.blueprint[n] = null)),
                            (t[n] = r);
                        })(n, y(), o, u),
                        u
                      );
                    } finally {
                      qe(s);
                    }
                  })(2, "titlecase"),
                  fn(),
                  Ko(3, "app-password")),
                  2 & n && (Ho(1), sc(gv(2, 1, r.title)));
              },
              dependencies: [dL, JD],
              styles: [
                "h1[_ngcontent-%COMP%]{color:#fff;text-shadow:0 0 10px rgba(0,0,0,.3);letter-spacing:1px;text-align:center;margin-top:30px}.title[_ngcontent-%COMP%]{font-size:36px;font-weight:700;margin-bottom:18px}",
              ],
            })),
            e
          );
        })(),
        hL = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Lt({ type: e, bootstrap: [fL] })),
            (e.ɵinj = _t({ imports: [SF, sL, PP] })),
            e
          );
        })();
      EF()
        .bootstrapModule(hL)
        .catch((e) => console.error(e));
    },
  },
  (ee) => {
    ee((ee.s = 755));
  },
]);
