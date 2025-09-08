var georaster_browser_bundle_min$1 = { exports: {} };
var georaster_browser_bundle_min = georaster_browser_bundle_min$1.exports;
var hasRequiredGeoraster_browser_bundle_min;
function requireGeoraster_browser_bundle_min() {
  if (hasRequiredGeoraster_browser_bundle_min) return georaster_browser_bundle_min$1.exports;
  hasRequiredGeoraster_browser_bundle_min = 1;
  (function(module, exports) {
    !(function(t, e) {
      module.exports = e();
    })("undefined" != typeof self ? self : georaster_browser_bundle_min, (function() {
      return (function(t) {
        var e = {};
        function r(n) {
          if (e[n]) return e[n].exports;
          var i = e[n] = { i: n, l: false, exports: {} };
          return t[n].call(i.exports, i, i.exports, r), i.l = true, i.exports;
        }
        return r.m = t, r.c = e, r.d = function(t2, e2, n) {
          r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
        }, r.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r.t = function(t2, e2) {
          if (1 & e2 && (t2 = r(t2)), 8 & e2) return t2;
          if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2) for (var i in t2) r.d(n, i, (function(e3) {
            return t2[e3];
          }).bind(null, i));
          return n;
        }, r.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return r.d(e2, "a", e2), e2;
        }, r.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, r.p = "", r(r.s = 107);
      })([function(t, e, r) {
        const n = r(73);
        t.exports = function(t2) {
          return "+" === t2[0] && (t2 = t2.substring(1)), (t2 = (t2 = n(t2)).replace(/^0+(?=\d)/, "")).includes(".") && (t2 = t2.replace(/\.?0+$/, "")), "" === t2 && (t2 = "0"), "-0" === t2 && (t2 = "0"), t2;
        };
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(15), s = r(32);
        function a(t2, e2, r2) {
          t2 = i(t2), e2 = i(e2);
          const a2 = "-" !== t2[0], u = "-" !== e2[0], c = o(t2), l = o(e2);
          if (c || l) return a2 == u ? "Infinity" : "-Infinity";
          if ("0" === e2) throw new Error("[preciso] division by zero");
          if ("" === t2 || "0" === t2) return "0";
          const f = a2 !== u ? "-" : "";
          return a2 || (t2 = n(t2)), u || (e2 = n(e2)), f + s(t2, e2, r2);
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return n;
        })), r.d(e, "b", (function() {
          return i;
        })), r.d(e, "c", (function() {
          return o;
        })), r.d(e, "d", (function() {
          return s;
        })), r.d(e, "e", (function() {
          return a;
        }));
        const n = Symbol("thread.errors"), i = Symbol("thread.events"), o = Symbol("thread.terminate"), s = Symbol("thread.transferable"), a = Symbol("thread.worker");
      }, function(t, e) {
        var r;
        r = /* @__PURE__ */ (function() {
          return this;
        })();
        try {
          r = r || new Function("return this")();
        } catch (t2) {
          "object" == typeof window && (r = window);
        }
        t.exports = r;
      }, function(t, e, r) {
        const n = r(0);
        function i(t2) {
          return "-" === (t2 = n(t2))[0] ? t2.substring(1) : t2;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        function n(t2, e2) {
          const r2 = t2.length, n2 = e2.length, i = t2.indexOf("."), o = e2.indexOf("."), s = -1 === i ? r2 : i, a = -1 === o ? n2 : o, u = s - a;
          let c = u < 0 ? -1 * u : 0, l = u <= 0 ? 0 : u, f = Math.max(s, a) + 1 + Math.max(r2 - s, n2 - a) - 1, h = 0;
          for (; h < f; ) {
            const r3 = h - c, n3 = r3 === s ? "." : t2[r3] || "0", i2 = h - l, o2 = i2 === a ? "." : e2[i2] || "0";
            if (n3 !== o2) {
              if (n3 > o2) return ">";
              if (n3 < o2) return "<";
            }
            h++;
          }
          return "=";
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(5), i = r(0), o = r(9), s = r(31), a = r(15);
        function u(t2, e2, { infinity_minus_infinity: r2 = "NaN" } = {}) {
          t2 = i(t2), e2 = i(e2);
          const u2 = "-" !== t2[0], c = "-" !== e2[0], l = !u2, f = !c, h = a(t2), d = a(e2);
          if (h && d) return u2 && c ? "Infinity" : l & f ? "-Infinity" : r2;
          if (h) return u2 ? "Infinity" : "-Infinity";
          if (d) return c ? "Infinity" : "-Infinity";
          if (u2 && c) return o(t2, e2);
          if (l && f) return "-" + o(t2.substring(1), e2.substring(1));
          if (l && c) switch (t2 = t2.substring(1), n(t2, e2)) {
            case "=":
              return "0";
            case "<":
              return s(e2, t2);
            case ">":
              return "-" + s(t2, e2);
          }
          else if (u2 && !c) switch (e2 = e2.substring(1), n(t2, e2)) {
            case "=":
              return "0";
            case "<":
              return "-" + s(e2, t2);
            case ">":
              return s(t2, e2);
          }
        }
        t.exports = u, t.exports.default = u;
      }, function(t, e, r) {
        (function(t2) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <http://feross.org>
           * @license  MIT
           */
          var n = r(108), i = r(109), o = r(60);
          function s() {
            return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
          }
          function a(t3, e2) {
            if (s() < e2) throw new RangeError("Invalid typed array length");
            return u.TYPED_ARRAY_SUPPORT ? (t3 = new Uint8Array(e2)).__proto__ = u.prototype : (null === t3 && (t3 = new u(e2)), t3.length = e2), t3;
          }
          function u(t3, e2, r2) {
            if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t3, e2, r2);
            if ("number" == typeof t3) {
              if ("string" == typeof e2) throw new Error("If encoding is specified then the first argument must be a string");
              return f(this, t3);
            }
            return c(this, t3, e2, r2);
          }
          function c(t3, e2, r2, n2) {
            if ("number" == typeof e2) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e2 instanceof ArrayBuffer ? (function(t4, e3, r3, n3) {
              if (e3.byteLength, r3 < 0 || e3.byteLength < r3) throw new RangeError("'offset' is out of bounds");
              if (e3.byteLength < r3 + (n3 || 0)) throw new RangeError("'length' is out of bounds");
              e3 = void 0 === r3 && void 0 === n3 ? new Uint8Array(e3) : void 0 === n3 ? new Uint8Array(e3, r3) : new Uint8Array(e3, r3, n3);
              u.TYPED_ARRAY_SUPPORT ? (t4 = e3).__proto__ = u.prototype : t4 = h(t4, e3);
              return t4;
            })(t3, e2, r2, n2) : "string" == typeof e2 ? (function(t4, e3, r3) {
              "string" == typeof r3 && "" !== r3 || (r3 = "utf8");
              if (!u.isEncoding(r3)) throw new TypeError('"encoding" must be a valid string encoding');
              var n3 = 0 | p(e3, r3), i2 = (t4 = a(t4, n3)).write(e3, r3);
              i2 !== n3 && (t4 = t4.slice(0, i2));
              return t4;
            })(t3, e2, r2) : (function(t4, e3) {
              if (u.isBuffer(e3)) {
                var r3 = 0 | d(e3.length);
                return 0 === (t4 = a(t4, r3)).length || e3.copy(t4, 0, 0, r3), t4;
              }
              if (e3) {
                if ("undefined" != typeof ArrayBuffer && e3.buffer instanceof ArrayBuffer || "length" in e3) return "number" != typeof e3.length || (n3 = e3.length) != n3 ? a(t4, 0) : h(t4, e3);
                if ("Buffer" === e3.type && o(e3.data)) return h(t4, e3.data);
              }
              var n3;
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            })(t3, e2);
          }
          function l(t3) {
            if ("number" != typeof t3) throw new TypeError('"size" argument must be a number');
            if (t3 < 0) throw new RangeError('"size" argument must not be negative');
          }
          function f(t3, e2) {
            if (l(e2), t3 = a(t3, e2 < 0 ? 0 : 0 | d(e2)), !u.TYPED_ARRAY_SUPPORT) for (var r2 = 0; r2 < e2; ++r2) t3[r2] = 0;
            return t3;
          }
          function h(t3, e2) {
            var r2 = e2.length < 0 ? 0 : 0 | d(e2.length);
            t3 = a(t3, r2);
            for (var n2 = 0; n2 < r2; n2 += 1) t3[n2] = 255 & e2[n2];
            return t3;
          }
          function d(t3) {
            if (t3 >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | t3;
          }
          function p(t3, e2) {
            if (u.isBuffer(t3)) return t3.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t3) || t3 instanceof ArrayBuffer)) return t3.byteLength;
            "string" != typeof t3 && (t3 = "" + t3);
            var r2 = t3.length;
            if (0 === r2) return 0;
            for (var n2 = false; ; ) switch (e2) {
              case "ascii":
              case "latin1":
              case "binary":
                return r2;
              case "utf8":
              case "utf-8":
              case void 0:
                return B(t3).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r2;
              case "hex":
                return r2 >>> 1;
              case "base64":
                return G(t3).length;
              default:
                if (n2) return B(t3).length;
                e2 = ("" + e2).toLowerCase(), n2 = true;
            }
          }
          function y(t3, e2, r2) {
            var n2 = false;
            if ((void 0 === e2 || e2 < 0) && (e2 = 0), e2 > this.length) return "";
            if ((void 0 === r2 || r2 > this.length) && (r2 = this.length), r2 <= 0) return "";
            if ((r2 >>>= 0) <= (e2 >>>= 0)) return "";
            for (t3 || (t3 = "utf8"); ; ) switch (t3) {
              case "hex":
                return C(this, e2, r2);
              case "utf8":
              case "utf-8":
                return k(this, e2, r2);
              case "ascii":
                return T(this, e2, r2);
              case "latin1":
              case "binary":
                return O(this, e2, r2);
              case "base64":
                return E(this, e2, r2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return P(this, e2, r2);
              default:
                if (n2) throw new TypeError("Unknown encoding: " + t3);
                t3 = (t3 + "").toLowerCase(), n2 = true;
            }
          }
          function g(t3, e2, r2) {
            var n2 = t3[e2];
            t3[e2] = t3[r2], t3[r2] = n2;
          }
          function m(t3, e2, r2, n2, i2) {
            if (0 === t3.length) return -1;
            if ("string" == typeof r2 ? (n2 = r2, r2 = 0) : r2 > 2147483647 ? r2 = 2147483647 : r2 < -2147483648 && (r2 = -2147483648), r2 = +r2, isNaN(r2) && (r2 = i2 ? 0 : t3.length - 1), r2 < 0 && (r2 = t3.length + r2), r2 >= t3.length) {
              if (i2) return -1;
              r2 = t3.length - 1;
            } else if (r2 < 0) {
              if (!i2) return -1;
              r2 = 0;
            }
            if ("string" == typeof e2 && (e2 = u.from(e2, n2)), u.isBuffer(e2)) return 0 === e2.length ? -1 : b(t3, e2, r2, n2, i2);
            if ("number" == typeof e2) return e2 &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(t3, e2, r2) : Uint8Array.prototype.lastIndexOf.call(t3, e2, r2) : b(t3, [e2], r2, n2, i2);
            throw new TypeError("val must be string, number or Buffer");
          }
          function b(t3, e2, r2, n2, i2) {
            var o2, s2 = 1, a2 = t3.length, u2 = e2.length;
            if (void 0 !== n2 && ("ucs2" === (n2 = String(n2).toLowerCase()) || "ucs-2" === n2 || "utf16le" === n2 || "utf-16le" === n2)) {
              if (t3.length < 2 || e2.length < 2) return -1;
              s2 = 2, a2 /= 2, u2 /= 2, r2 /= 2;
            }
            function c2(t4, e3) {
              return 1 === s2 ? t4[e3] : t4.readUInt16BE(e3 * s2);
            }
            if (i2) {
              var l2 = -1;
              for (o2 = r2; o2 < a2; o2++) if (c2(t3, o2) === c2(e2, -1 === l2 ? 0 : o2 - l2)) {
                if (-1 === l2 && (l2 = o2), o2 - l2 + 1 === u2) return l2 * s2;
              } else -1 !== l2 && (o2 -= o2 - l2), l2 = -1;
            } else for (r2 + u2 > a2 && (r2 = a2 - u2), o2 = r2; o2 >= 0; o2--) {
              for (var f2 = true, h2 = 0; h2 < u2; h2++) if (c2(t3, o2 + h2) !== c2(e2, h2)) {
                f2 = false;
                break;
              }
              if (f2) return o2;
            }
            return -1;
          }
          function v(t3, e2, r2, n2) {
            r2 = Number(r2) || 0;
            var i2 = t3.length - r2;
            n2 ? (n2 = Number(n2)) > i2 && (n2 = i2) : n2 = i2;
            var o2 = e2.length;
            if (o2 % 2 != 0) throw new TypeError("Invalid hex string");
            n2 > o2 / 2 && (n2 = o2 / 2);
            for (var s2 = 0; s2 < n2; ++s2) {
              var a2 = parseInt(e2.substr(2 * s2, 2), 16);
              if (isNaN(a2)) return s2;
              t3[r2 + s2] = a2;
            }
            return s2;
          }
          function w(t3, e2, r2, n2) {
            return q(B(e2, t3.length - r2), t3, r2, n2);
          }
          function x(t3, e2, r2, n2) {
            return q((function(t4) {
              for (var e3 = [], r3 = 0; r3 < t4.length; ++r3) e3.push(255 & t4.charCodeAt(r3));
              return e3;
            })(e2), t3, r2, n2);
          }
          function _(t3, e2, r2, n2) {
            return x(t3, e2, r2, n2);
          }
          function S(t3, e2, r2, n2) {
            return q(G(e2), t3, r2, n2);
          }
          function A(t3, e2, r2, n2) {
            return q((function(t4, e3) {
              for (var r3, n3, i2, o2 = [], s2 = 0; s2 < t4.length && !((e3 -= 2) < 0); ++s2) r3 = t4.charCodeAt(s2), n3 = r3 >> 8, i2 = r3 % 256, o2.push(i2), o2.push(n3);
              return o2;
            })(e2, t3.length - r2), t3, r2, n2);
          }
          function E(t3, e2, r2) {
            return 0 === e2 && r2 === t3.length ? n.fromByteArray(t3) : n.fromByteArray(t3.slice(e2, r2));
          }
          function k(t3, e2, r2) {
            r2 = Math.min(t3.length, r2);
            for (var n2 = [], i2 = e2; i2 < r2; ) {
              var o2, s2, a2, u2, c2 = t3[i2], l2 = null, f2 = c2 > 239 ? 4 : c2 > 223 ? 3 : c2 > 191 ? 2 : 1;
              if (i2 + f2 <= r2) switch (f2) {
                case 1:
                  c2 < 128 && (l2 = c2);
                  break;
                case 2:
                  128 == (192 & (o2 = t3[i2 + 1])) && (u2 = (31 & c2) << 6 | 63 & o2) > 127 && (l2 = u2);
                  break;
                case 3:
                  o2 = t3[i2 + 1], s2 = t3[i2 + 2], 128 == (192 & o2) && 128 == (192 & s2) && (u2 = (15 & c2) << 12 | (63 & o2) << 6 | 63 & s2) > 2047 && (u2 < 55296 || u2 > 57343) && (l2 = u2);
                  break;
                case 4:
                  o2 = t3[i2 + 1], s2 = t3[i2 + 2], a2 = t3[i2 + 3], 128 == (192 & o2) && 128 == (192 & s2) && 128 == (192 & a2) && (u2 = (15 & c2) << 18 | (63 & o2) << 12 | (63 & s2) << 6 | 63 & a2) > 65535 && u2 < 1114112 && (l2 = u2);
              }
              null === l2 ? (l2 = 65533, f2 = 1) : l2 > 65535 && (l2 -= 65536, n2.push(l2 >>> 10 & 1023 | 55296), l2 = 56320 | 1023 & l2), n2.push(l2), i2 += f2;
            }
            return (function(t4) {
              var e3 = t4.length;
              if (e3 <= 4096) return String.fromCharCode.apply(String, t4);
              var r3 = "", n3 = 0;
              for (; n3 < e3; ) r3 += String.fromCharCode.apply(String, t4.slice(n3, n3 += 4096));
              return r3;
            })(n2);
          }
          e.Buffer = u, e.SlowBuffer = function(t3) {
            +t3 != t3 && (t3 = 0);
            return u.alloc(+t3);
          }, e.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t2.TYPED_ARRAY_SUPPORT ? t2.TYPED_ARRAY_SUPPORT : (function() {
            try {
              var t3 = new Uint8Array(1);
              return t3.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                return 42;
              } }, 42 === t3.foo() && "function" == typeof t3.subarray && 0 === t3.subarray(1, 1).byteLength;
            } catch (t4) {
              return false;
            }
          })(), e.kMaxLength = s(), u.poolSize = 8192, u._augment = function(t3) {
            return t3.__proto__ = u.prototype, t3;
          }, u.from = function(t3, e2, r2) {
            return c(null, t3, e2, r2);
          }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: true })), u.alloc = function(t3, e2, r2) {
            return (function(t4, e3, r3, n2) {
              return l(e3), e3 <= 0 ? a(t4, e3) : void 0 !== r3 ? "string" == typeof n2 ? a(t4, e3).fill(r3, n2) : a(t4, e3).fill(r3) : a(t4, e3);
            })(null, t3, e2, r2);
          }, u.allocUnsafe = function(t3) {
            return f(null, t3);
          }, u.allocUnsafeSlow = function(t3) {
            return f(null, t3);
          }, u.isBuffer = function(t3) {
            return !(null == t3 || !t3._isBuffer);
          }, u.compare = function(t3, e2) {
            if (!u.isBuffer(t3) || !u.isBuffer(e2)) throw new TypeError("Arguments must be Buffers");
            if (t3 === e2) return 0;
            for (var r2 = t3.length, n2 = e2.length, i2 = 0, o2 = Math.min(r2, n2); i2 < o2; ++i2) if (t3[i2] !== e2[i2]) {
              r2 = t3[i2], n2 = e2[i2];
              break;
            }
            return r2 < n2 ? -1 : n2 < r2 ? 1 : 0;
          }, u.isEncoding = function(t3) {
            switch (String(t3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, u.concat = function(t3, e2) {
            if (!o(t3)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t3.length) return u.alloc(0);
            var r2;
            if (void 0 === e2) for (e2 = 0, r2 = 0; r2 < t3.length; ++r2) e2 += t3[r2].length;
            var n2 = u.allocUnsafe(e2), i2 = 0;
            for (r2 = 0; r2 < t3.length; ++r2) {
              var s2 = t3[r2];
              if (!u.isBuffer(s2)) throw new TypeError('"list" argument must be an Array of Buffers');
              s2.copy(n2, i2), i2 += s2.length;
            }
            return n2;
          }, u.byteLength = p, u.prototype._isBuffer = true, u.prototype.swap16 = function() {
            var t3 = this.length;
            if (t3 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e2 = 0; e2 < t3; e2 += 2) g(this, e2, e2 + 1);
            return this;
          }, u.prototype.swap32 = function() {
            var t3 = this.length;
            if (t3 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e2 = 0; e2 < t3; e2 += 4) g(this, e2, e2 + 3), g(this, e2 + 1, e2 + 2);
            return this;
          }, u.prototype.swap64 = function() {
            var t3 = this.length;
            if (t3 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e2 = 0; e2 < t3; e2 += 8) g(this, e2, e2 + 7), g(this, e2 + 1, e2 + 6), g(this, e2 + 2, e2 + 5), g(this, e2 + 3, e2 + 4);
            return this;
          }, u.prototype.toString = function() {
            var t3 = 0 | this.length;
            return 0 === t3 ? "" : 0 === arguments.length ? k(this, 0, t3) : y.apply(this, arguments);
          }, u.prototype.equals = function(t3) {
            if (!u.isBuffer(t3)) throw new TypeError("Argument must be a Buffer");
            return this === t3 || 0 === u.compare(this, t3);
          }, u.prototype.inspect = function() {
            var t3 = "", r2 = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t3 = this.toString("hex", 0, r2).match(/.{2}/g).join(" "), this.length > r2 && (t3 += " ... ")), "<Buffer " + t3 + ">";
          }, u.prototype.compare = function(t3, e2, r2, n2, i2) {
            if (!u.isBuffer(t3)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e2 && (e2 = 0), void 0 === r2 && (r2 = t3 ? t3.length : 0), void 0 === n2 && (n2 = 0), void 0 === i2 && (i2 = this.length), e2 < 0 || r2 > t3.length || n2 < 0 || i2 > this.length) throw new RangeError("out of range index");
            if (n2 >= i2 && e2 >= r2) return 0;
            if (n2 >= i2) return -1;
            if (e2 >= r2) return 1;
            if (this === t3) return 0;
            for (var o2 = (i2 >>>= 0) - (n2 >>>= 0), s2 = (r2 >>>= 0) - (e2 >>>= 0), a2 = Math.min(o2, s2), c2 = this.slice(n2, i2), l2 = t3.slice(e2, r2), f2 = 0; f2 < a2; ++f2) if (c2[f2] !== l2[f2]) {
              o2 = c2[f2], s2 = l2[f2];
              break;
            }
            return o2 < s2 ? -1 : s2 < o2 ? 1 : 0;
          }, u.prototype.includes = function(t3, e2, r2) {
            return -1 !== this.indexOf(t3, e2, r2);
          }, u.prototype.indexOf = function(t3, e2, r2) {
            return m(this, t3, e2, r2, true);
          }, u.prototype.lastIndexOf = function(t3, e2, r2) {
            return m(this, t3, e2, r2, false);
          }, u.prototype.write = function(t3, e2, r2, n2) {
            if (void 0 === e2) n2 = "utf8", r2 = this.length, e2 = 0;
            else if (void 0 === r2 && "string" == typeof e2) n2 = e2, r2 = this.length, e2 = 0;
            else {
              if (!isFinite(e2)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              e2 |= 0, isFinite(r2) ? (r2 |= 0, void 0 === n2 && (n2 = "utf8")) : (n2 = r2, r2 = void 0);
            }
            var i2 = this.length - e2;
            if ((void 0 === r2 || r2 > i2) && (r2 = i2), t3.length > 0 && (r2 < 0 || e2 < 0) || e2 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n2 || (n2 = "utf8");
            for (var o2 = false; ; ) switch (n2) {
              case "hex":
                return v(this, t3, e2, r2);
              case "utf8":
              case "utf-8":
                return w(this, t3, e2, r2);
              case "ascii":
                return x(this, t3, e2, r2);
              case "latin1":
              case "binary":
                return _(this, t3, e2, r2);
              case "base64":
                return S(this, t3, e2, r2);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return A(this, t3, e2, r2);
              default:
                if (o2) throw new TypeError("Unknown encoding: " + n2);
                n2 = ("" + n2).toLowerCase(), o2 = true;
            }
          }, u.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };
          function T(t3, e2, r2) {
            var n2 = "";
            r2 = Math.min(t3.length, r2);
            for (var i2 = e2; i2 < r2; ++i2) n2 += String.fromCharCode(127 & t3[i2]);
            return n2;
          }
          function O(t3, e2, r2) {
            var n2 = "";
            r2 = Math.min(t3.length, r2);
            for (var i2 = e2; i2 < r2; ++i2) n2 += String.fromCharCode(t3[i2]);
            return n2;
          }
          function C(t3, e2, r2) {
            var n2 = t3.length;
            (!e2 || e2 < 0) && (e2 = 0), (!r2 || r2 < 0 || r2 > n2) && (r2 = n2);
            for (var i2 = "", o2 = e2; o2 < r2; ++o2) i2 += U(t3[o2]);
            return i2;
          }
          function P(t3, e2, r2) {
            for (var n2 = t3.slice(e2, r2), i2 = "", o2 = 0; o2 < n2.length; o2 += 2) i2 += String.fromCharCode(n2[o2] + 256 * n2[o2 + 1]);
            return i2;
          }
          function I(t3, e2, r2) {
            if (t3 % 1 != 0 || t3 < 0) throw new RangeError("offset is not uint");
            if (t3 + e2 > r2) throw new RangeError("Trying to access beyond buffer length");
          }
          function R(t3, e2, r2, n2, i2, o2) {
            if (!u.isBuffer(t3)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e2 > i2 || e2 < o2) throw new RangeError('"value" argument is out of bounds');
            if (r2 + n2 > t3.length) throw new RangeError("Index out of range");
          }
          function j(t3, e2, r2, n2) {
            e2 < 0 && (e2 = 65535 + e2 + 1);
            for (var i2 = 0, o2 = Math.min(t3.length - r2, 2); i2 < o2; ++i2) t3[r2 + i2] = (e2 & 255 << 8 * (n2 ? i2 : 1 - i2)) >>> 8 * (n2 ? i2 : 1 - i2);
          }
          function M(t3, e2, r2, n2) {
            e2 < 0 && (e2 = 4294967295 + e2 + 1);
            for (var i2 = 0, o2 = Math.min(t3.length - r2, 4); i2 < o2; ++i2) t3[r2 + i2] = e2 >>> 8 * (n2 ? i2 : 3 - i2) & 255;
          }
          function L(t3, e2, r2, n2, i2, o2) {
            if (r2 + n2 > t3.length) throw new RangeError("Index out of range");
            if (r2 < 0) throw new RangeError("Index out of range");
          }
          function F(t3, e2, r2, n2, o2) {
            return o2 || L(t3, 0, r2, 4), i.write(t3, e2, r2, n2, 23, 4), r2 + 4;
          }
          function N(t3, e2, r2, n2, o2) {
            return o2 || L(t3, 0, r2, 8), i.write(t3, e2, r2, n2, 52, 8), r2 + 8;
          }
          u.prototype.slice = function(t3, e2) {
            var r2, n2 = this.length;
            if ((t3 = ~~t3) < 0 ? (t3 += n2) < 0 && (t3 = 0) : t3 > n2 && (t3 = n2), (e2 = void 0 === e2 ? n2 : ~~e2) < 0 ? (e2 += n2) < 0 && (e2 = 0) : e2 > n2 && (e2 = n2), e2 < t3 && (e2 = t3), u.TYPED_ARRAY_SUPPORT) (r2 = this.subarray(t3, e2)).__proto__ = u.prototype;
            else {
              var i2 = e2 - t3;
              r2 = new u(i2, void 0);
              for (var o2 = 0; o2 < i2; ++o2) r2[o2] = this[o2 + t3];
            }
            return r2;
          }, u.prototype.readUIntLE = function(t3, e2, r2) {
            t3 |= 0, e2 |= 0, r2 || I(t3, e2, this.length);
            for (var n2 = this[t3], i2 = 1, o2 = 0; ++o2 < e2 && (i2 *= 256); ) n2 += this[t3 + o2] * i2;
            return n2;
          }, u.prototype.readUIntBE = function(t3, e2, r2) {
            t3 |= 0, e2 |= 0, r2 || I(t3, e2, this.length);
            for (var n2 = this[t3 + --e2], i2 = 1; e2 > 0 && (i2 *= 256); ) n2 += this[t3 + --e2] * i2;
            return n2;
          }, u.prototype.readUInt8 = function(t3, e2) {
            return e2 || I(t3, 1, this.length), this[t3];
          }, u.prototype.readUInt16LE = function(t3, e2) {
            return e2 || I(t3, 2, this.length), this[t3] | this[t3 + 1] << 8;
          }, u.prototype.readUInt16BE = function(t3, e2) {
            return e2 || I(t3, 2, this.length), this[t3] << 8 | this[t3 + 1];
          }, u.prototype.readUInt32LE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), (this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16) + 16777216 * this[t3 + 3];
          }, u.prototype.readUInt32BE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), 16777216 * this[t3] + (this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3]);
          }, u.prototype.readIntLE = function(t3, e2, r2) {
            t3 |= 0, e2 |= 0, r2 || I(t3, e2, this.length);
            for (var n2 = this[t3], i2 = 1, o2 = 0; ++o2 < e2 && (i2 *= 256); ) n2 += this[t3 + o2] * i2;
            return n2 >= (i2 *= 128) && (n2 -= Math.pow(2, 8 * e2)), n2;
          }, u.prototype.readIntBE = function(t3, e2, r2) {
            t3 |= 0, e2 |= 0, r2 || I(t3, e2, this.length);
            for (var n2 = e2, i2 = 1, o2 = this[t3 + --n2]; n2 > 0 && (i2 *= 256); ) o2 += this[t3 + --n2] * i2;
            return o2 >= (i2 *= 128) && (o2 -= Math.pow(2, 8 * e2)), o2;
          }, u.prototype.readInt8 = function(t3, e2) {
            return e2 || I(t3, 1, this.length), 128 & this[t3] ? -1 * (255 - this[t3] + 1) : this[t3];
          }, u.prototype.readInt16LE = function(t3, e2) {
            e2 || I(t3, 2, this.length);
            var r2 = this[t3] | this[t3 + 1] << 8;
            return 32768 & r2 ? 4294901760 | r2 : r2;
          }, u.prototype.readInt16BE = function(t3, e2) {
            e2 || I(t3, 2, this.length);
            var r2 = this[t3 + 1] | this[t3] << 8;
            return 32768 & r2 ? 4294901760 | r2 : r2;
          }, u.prototype.readInt32LE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16 | this[t3 + 3] << 24;
          }, u.prototype.readInt32BE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), this[t3] << 24 | this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3];
          }, u.prototype.readFloatLE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), i.read(this, t3, true, 23, 4);
          }, u.prototype.readFloatBE = function(t3, e2) {
            return e2 || I(t3, 4, this.length), i.read(this, t3, false, 23, 4);
          }, u.prototype.readDoubleLE = function(t3, e2) {
            return e2 || I(t3, 8, this.length), i.read(this, t3, true, 52, 8);
          }, u.prototype.readDoubleBE = function(t3, e2) {
            return e2 || I(t3, 8, this.length), i.read(this, t3, false, 52, 8);
          }, u.prototype.writeUIntLE = function(t3, e2, r2, n2) {
            (t3 = +t3, e2 |= 0, r2 |= 0, n2) || R(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
            var i2 = 1, o2 = 0;
            for (this[e2] = 255 & t3; ++o2 < r2 && (i2 *= 256); ) this[e2 + o2] = t3 / i2 & 255;
            return e2 + r2;
          }, u.prototype.writeUIntBE = function(t3, e2, r2, n2) {
            (t3 = +t3, e2 |= 0, r2 |= 0, n2) || R(this, t3, e2, r2, Math.pow(2, 8 * r2) - 1, 0);
            var i2 = r2 - 1, o2 = 1;
            for (this[e2 + i2] = 255 & t3; --i2 >= 0 && (o2 *= 256); ) this[e2 + i2] = t3 / o2 & 255;
            return e2 + r2;
          }, u.prototype.writeUInt8 = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), this[e2] = 255 & t3, e2 + 1;
          }, u.prototype.writeUInt16LE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : j(this, t3, e2, true), e2 + 2;
          }, u.prototype.writeUInt16BE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : j(this, t3, e2, false), e2 + 2;
          }, u.prototype.writeUInt32LE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2 + 3] = t3 >>> 24, this[e2 + 2] = t3 >>> 16, this[e2 + 1] = t3 >>> 8, this[e2] = 255 & t3) : M(this, t3, e2, true), e2 + 4;
          }, u.prototype.writeUInt32BE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : M(this, t3, e2, false), e2 + 4;
          }, u.prototype.writeIntLE = function(t3, e2, r2, n2) {
            if (t3 = +t3, e2 |= 0, !n2) {
              var i2 = Math.pow(2, 8 * r2 - 1);
              R(this, t3, e2, r2, i2 - 1, -i2);
            }
            var o2 = 0, s2 = 1, a2 = 0;
            for (this[e2] = 255 & t3; ++o2 < r2 && (s2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e2 + o2 - 1] && (a2 = 1), this[e2 + o2] = (t3 / s2 >> 0) - a2 & 255;
            return e2 + r2;
          }, u.prototype.writeIntBE = function(t3, e2, r2, n2) {
            if (t3 = +t3, e2 |= 0, !n2) {
              var i2 = Math.pow(2, 8 * r2 - 1);
              R(this, t3, e2, r2, i2 - 1, -i2);
            }
            var o2 = r2 - 1, s2 = 1, a2 = 0;
            for (this[e2 + o2] = 255 & t3; --o2 >= 0 && (s2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e2 + o2 + 1] && (a2 = 1), this[e2 + o2] = (t3 / s2 >> 0) - a2 & 255;
            return e2 + r2;
          }, u.prototype.writeInt8 = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), t3 < 0 && (t3 = 255 + t3 + 1), this[e2] = 255 & t3, e2 + 1;
          }, u.prototype.writeInt16LE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : j(this, t3, e2, true), e2 + 2;
          }, u.prototype.writeInt16BE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : j(this, t3, e2, false), e2 + 2;
          }, u.prototype.writeInt32LE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8, this[e2 + 2] = t3 >>> 16, this[e2 + 3] = t3 >>> 24) : M(this, t3, e2, true), e2 + 4;
          }, u.prototype.writeInt32BE = function(t3, e2, r2) {
            return t3 = +t3, e2 |= 0, r2 || R(this, t3, e2, 4, 2147483647, -2147483648), t3 < 0 && (t3 = 4294967295 + t3 + 1), u.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : M(this, t3, e2, false), e2 + 4;
          }, u.prototype.writeFloatLE = function(t3, e2, r2) {
            return F(this, t3, e2, true, r2);
          }, u.prototype.writeFloatBE = function(t3, e2, r2) {
            return F(this, t3, e2, false, r2);
          }, u.prototype.writeDoubleLE = function(t3, e2, r2) {
            return N(this, t3, e2, true, r2);
          }, u.prototype.writeDoubleBE = function(t3, e2, r2) {
            return N(this, t3, e2, false, r2);
          }, u.prototype.copy = function(t3, e2, r2, n2) {
            if (r2 || (r2 = 0), n2 || 0 === n2 || (n2 = this.length), e2 >= t3.length && (e2 = t3.length), e2 || (e2 = 0), n2 > 0 && n2 < r2 && (n2 = r2), n2 === r2) return 0;
            if (0 === t3.length || 0 === this.length) return 0;
            if (e2 < 0) throw new RangeError("targetStart out of bounds");
            if (r2 < 0 || r2 >= this.length) throw new RangeError("sourceStart out of bounds");
            if (n2 < 0) throw new RangeError("sourceEnd out of bounds");
            n2 > this.length && (n2 = this.length), t3.length - e2 < n2 - r2 && (n2 = t3.length - e2 + r2);
            var i2, o2 = n2 - r2;
            if (this === t3 && r2 < e2 && e2 < n2) for (i2 = o2 - 1; i2 >= 0; --i2) t3[i2 + e2] = this[i2 + r2];
            else if (o2 < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i2 = 0; i2 < o2; ++i2) t3[i2 + e2] = this[i2 + r2];
            else Uint8Array.prototype.set.call(t3, this.subarray(r2, r2 + o2), e2);
            return o2;
          }, u.prototype.fill = function(t3, e2, r2, n2) {
            if ("string" == typeof t3) {
              if ("string" == typeof e2 ? (n2 = e2, e2 = 0, r2 = this.length) : "string" == typeof r2 && (n2 = r2, r2 = this.length), 1 === t3.length) {
                var i2 = t3.charCodeAt(0);
                i2 < 256 && (t3 = i2);
              }
              if (void 0 !== n2 && "string" != typeof n2) throw new TypeError("encoding must be a string");
              if ("string" == typeof n2 && !u.isEncoding(n2)) throw new TypeError("Unknown encoding: " + n2);
            } else "number" == typeof t3 && (t3 &= 255);
            if (e2 < 0 || this.length < e2 || this.length < r2) throw new RangeError("Out of range index");
            if (r2 <= e2) return this;
            var o2;
            if (e2 >>>= 0, r2 = void 0 === r2 ? this.length : r2 >>> 0, t3 || (t3 = 0), "number" == typeof t3) for (o2 = e2; o2 < r2; ++o2) this[o2] = t3;
            else {
              var s2 = u.isBuffer(t3) ? t3 : B(new u(t3, n2).toString()), a2 = s2.length;
              for (o2 = 0; o2 < r2 - e2; ++o2) this[o2 + e2] = s2[o2 % a2];
            }
            return this;
          };
          var D = /[^+\/0-9A-Za-z-_]/g;
          function U(t3) {
            return t3 < 16 ? "0" + t3.toString(16) : t3.toString(16);
          }
          function B(t3, e2) {
            var r2;
            e2 = e2 || 1 / 0;
            for (var n2 = t3.length, i2 = null, o2 = [], s2 = 0; s2 < n2; ++s2) {
              if ((r2 = t3.charCodeAt(s2)) > 55295 && r2 < 57344) {
                if (!i2) {
                  if (r2 > 56319) {
                    (e2 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  if (s2 + 1 === n2) {
                    (e2 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  i2 = r2;
                  continue;
                }
                if (r2 < 56320) {
                  (e2 -= 3) > -1 && o2.push(239, 191, 189), i2 = r2;
                  continue;
                }
                r2 = 65536 + (i2 - 55296 << 10 | r2 - 56320);
              } else i2 && (e2 -= 3) > -1 && o2.push(239, 191, 189);
              if (i2 = null, r2 < 128) {
                if ((e2 -= 1) < 0) break;
                o2.push(r2);
              } else if (r2 < 2048) {
                if ((e2 -= 2) < 0) break;
                o2.push(r2 >> 6 | 192, 63 & r2 | 128);
              } else if (r2 < 65536) {
                if ((e2 -= 3) < 0) break;
                o2.push(r2 >> 12 | 224, r2 >> 6 & 63 | 128, 63 & r2 | 128);
              } else {
                if (!(r2 < 1114112)) throw new Error("Invalid code point");
                if ((e2 -= 4) < 0) break;
                o2.push(r2 >> 18 | 240, r2 >> 12 & 63 | 128, r2 >> 6 & 63 | 128, 63 & r2 | 128);
              }
            }
            return o2;
          }
          function G(t3) {
            return n.toByteArray((function(t4) {
              if ((t4 = (function(t5) {
                return t5.trim ? t5.trim() : t5.replace(/^\s+|\s+$/g, "");
              })(t4).replace(D, "")).length < 2) return "";
              for (; t4.length % 4 != 0; ) t4 += "=";
              return t4;
            })(t3));
          }
          function q(t3, e2, r2, n2) {
            for (var i2 = 0; i2 < n2 && !(i2 + r2 >= e2.length || i2 >= t3.length); ++i2) e2[i2 + r2] = t3[i2];
            return i2;
          }
        }).call(this, r(3));
      }, function(t, e) {
        var r, n, i = t.exports = {};
        function o() {
          throw new Error("setTimeout has not been defined");
        }
        function s() {
          throw new Error("clearTimeout has not been defined");
        }
        function a(t2) {
          if (r === setTimeout) return setTimeout(t2, 0);
          if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(t2, 0);
          try {
            return r(t2, 0);
          } catch (e2) {
            try {
              return r.call(null, t2, 0);
            } catch (e3) {
              return r.call(this, t2, 0);
            }
          }
        }
        !(function() {
          try {
            r = "function" == typeof setTimeout ? setTimeout : o;
          } catch (t2) {
            r = o;
          }
          try {
            n = "function" == typeof clearTimeout ? clearTimeout : s;
          } catch (t2) {
            n = s;
          }
        })();
        var u, c = [], l = false, f = -1;
        function h() {
          l && u && (l = false, u.length ? c = u.concat(c) : f = -1, c.length && d());
        }
        function d() {
          if (!l) {
            var t2 = a(h);
            l = true;
            for (var e2 = c.length; e2; ) {
              for (u = c, c = []; ++f < e2; ) u && u[f].run();
              f = -1, e2 = c.length;
            }
            u = null, l = false, (function(t3) {
              if (n === clearTimeout) return clearTimeout(t3);
              if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t3);
              try {
                n(t3);
              } catch (e3) {
                try {
                  return n.call(null, t3);
                } catch (e4) {
                  return n.call(this, t3);
                }
              }
            })(t2);
          }
        }
        function p(t2, e2) {
          this.fun = t2, this.array = e2;
        }
        function y() {
        }
        i.nextTick = function(t2) {
          var e2 = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var r2 = 1; r2 < arguments.length; r2++) e2[r2 - 1] = arguments[r2];
          c.push(new p(t2, e2)), 1 !== c.length || l || a(d);
        }, p.prototype.run = function() {
          this.fun.apply(null, this.array);
        }, i.title = "browser", i.browser = true, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = y, i.addListener = y, i.once = y, i.off = y, i.removeListener = y, i.removeAllListeners = y, i.emit = y, i.prependListener = y, i.prependOnceListener = y, i.listeners = function(t2) {
          return [];
        }, i.binding = function(t2) {
          throw new Error("process.binding is not supported");
        }, i.cwd = function() {
          return "/";
        }, i.chdir = function(t2) {
          throw new Error("process.chdir is not supported");
        }, i.umask = function() {
          return 0;
        };
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(30);
        function i(t2, e2) {
          const r2 = t2.length, i2 = e2.length, o = t2.indexOf("."), s = e2.indexOf("."), a = -1 === o ? r2 : o, u = -1 === s ? i2 : s;
          if (-1 === o && -1 === s && r2 < n && i2 < n) return (Number(t2) + Number(e2)).toFixed();
          const c = a - u;
          let l = Math.max(a, u), f = Math.max(r2 - a - 1, i2 - u - 1), h = c < 0 ? -1 * c : 0, d = c <= 0 ? 0 : c, p = l + 1 + f - 1, y = "", g = 0, m = p;
          if (f > 0) {
            for (; m > p - f; ) {
              const r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
              let i3 = Number(r3) + Number(n2) + g;
              i3 >= 10 ? (i3 -= 10, g = 1) : g = 0, "" === y && 0 === i3 || (y = i3 + y), m--;
            }
            y && (y = "." + y), m--;
          }
          if (l > 0) for (; m >= 0; ) {
            const r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
            let i3 = Number(r3) + Number(n2) + g;
            i3 >= 10 ? (i3 -= 10, g = 1) : g = 0, y = i3 + y, m--;
          }
          return 1 === g && (y = g + y), "." === y[0] && (y = "0" + y), y;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e) {
        "function" == typeof Object.create ? t.exports = function(t2, e2) {
          e2 && (t2.super_ = e2, t2.prototype = Object.create(e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }));
        } : t.exports = function(t2, e2) {
          if (e2) {
            t2.super_ = e2;
            var r = function() {
            };
            r.prototype = e2.prototype, t2.prototype = new r(), t2.prototype.constructor = t2;
          }
        };
      }, function(t, e, r) {
        function n(t2) {
          return /^[-+]?0(\.0+)?(e[\.\d]+)?$/.test(t2);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        (function(n) {
          e.formatArgs = function(e2) {
            if (e2[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e2[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
            const r2 = "color: " + this.color;
            e2.splice(1, 0, r2, "color: inherit");
            let n2 = 0, i2 = 0;
            e2[0].replace(/%[a-zA-Z%]/g, (t2) => {
              "%%" !== t2 && (n2++, "%c" === t2 && (i2 = n2));
            }), e2.splice(i2, 0, r2);
          }, e.save = function(t2) {
            try {
              t2 ? e.storage.setItem("debug", t2) : e.storage.removeItem("debug");
            } catch (t3) {
            }
          }, e.load = function() {
            let t2;
            try {
              t2 = e.storage.getItem("debug");
            } catch (t3) {
            }
            !t2 && void 0 !== n && "env" in n && (t2 = n.env.DEBUG);
            return t2;
          }, e.useColors = function() {
            if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return true;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
          }, e.storage = (function() {
            try {
              return localStorage;
            } catch (t2) {
            }
          })(), e.destroy = /* @__PURE__ */ (() => {
            let t2 = false;
            return () => {
              t2 || (t2 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
            };
          })(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.log = console.debug || console.log || (() => {
          }), t.exports = r(134)(e);
          const { formatters: i } = t.exports;
          i.j = function(t2) {
            try {
              return JSON.stringify(t2);
            } catch (t3) {
              return "[UnexpectedJSONParseError]: " + t3.message;
            }
          };
        }).call(this, r(8));
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return o;
        })), r.d(e, "b", (function() {
          return s;
        }));
        const n = { deserialize: (t2) => Object.assign(Error(t2.message), { name: t2.name, stack: t2.stack }), serialize: (t2) => ({ __error_marker: "$$error", message: t2.message, name: t2.name, stack: t2.stack }) };
        let i = { deserialize(t2) {
          return (e2 = t2) && "object" == typeof e2 && "__error_marker" in e2 && "$$error" === e2.__error_marker ? n.deserialize(t2) : t2;
          var e2;
        }, serialize: (t2) => t2 instanceof Error ? n.serialize(t2) : t2 };
        function o(t2) {
          return i.deserialize(t2);
        }
        function s(t2) {
          return i.serialize(t2);
        }
      }, function(t, e, r) {
        var n = r(28), i = Object.keys || function(t2) {
          var e2 = [];
          for (var r2 in t2) e2.push(r2);
          return e2;
        };
        t.exports = f;
        var o = Object.create(r(21));
        o.inherits = r(10);
        var s = r(61), a = r(65);
        o.inherits(f, s);
        for (var u = i(a.prototype), c = 0; c < u.length; c++) {
          var l = u[c];
          f.prototype[l] || (f.prototype[l] = a.prototype[l]);
        }
        function f(t2) {
          if (!(this instanceof f)) return new f(t2);
          s.call(this, t2), a.call(this, t2), t2 && false === t2.readable && (this.readable = false), t2 && false === t2.writable && (this.writable = false), this.allowHalfOpen = true, t2 && false === t2.allowHalfOpen && (this.allowHalfOpen = false), this.once("end", h);
        }
        function h() {
          this.allowHalfOpen || this._writableState.ended || n.nextTick(d, this);
        }
        function d(t2) {
          t2.end();
        }
        Object.defineProperty(f.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
          return this._writableState.highWaterMark;
        } }), Object.defineProperty(f.prototype, "destroyed", { get: function() {
          return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed);
        }, set: function(t2) {
          void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t2, this._writableState.destroyed = t2);
        } }), f.prototype._destroy = function(t2, e2) {
          this.push(null), this.end(), n.nextTick(e2, t2);
        };
      }, function(t, e, r) {
        function n(t2) {
          return !!t2.match(/^(|-|\+)inf(inity)?$/i);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(0), i = r(15);
        function o(t2) {
          return !i(t2) && (!(t2 = n(t2)).includes(".") && !t2.includes("/"));
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(5), s = r(48), a = r(36);
        function u(t2, { max_decimal_digits: e2 } = {}) {
          let r2 = i(t2[0]), u2 = n(r2), c = "-" === r2[0] ? "-" : "";
          const l = t2.length;
          for (let e3 = 1; e3 < l; e3++) {
            const a2 = i(t2[e3]), l2 = "-" === a2[0] ? "-" : "", f = n(a2);
            c = c !== l2 ? "-" : "";
            u2 = "<" === o(u2, f) ? s(f, u2) : s(u2, f), r2 = c + u2;
          }
          return "number" == typeof e2 && (r2 = a(r2, { digits: e2 })), r2;
        }
        t.exports = u, t.exports.default = u;
      }, function(t, e, r) {
        const n = r(184);
        t.exports = function(t2) {
          return "+" === t2[0] && (t2 = t2.substring(1)), (t2 = (t2 = n(t2)).replace(/^0+(?=\d)/, "")).includes(".") && (t2 = t2.replace(/\.?0+$/, "")), "" === t2 && (t2 = "0"), t2;
        };
      }, function(t, e, r) {
        let n;
        function i() {
          return n || (n = (function() {
            try {
              throw new Error();
            } catch (t2) {
              const e2 = ("" + t2.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
              if (e2) return ("" + e2[0]).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, "$1") + "/";
            }
            return "/";
          })()), n;
        }
        r.d(e, "a", (function() {
          return o;
        })), r.d(e, "b", (function() {
          return c;
        }));
        const o = "undefined" != typeof navigator && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4, s = (t2) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(t2);
        function a(t2) {
          const e2 = new Blob([t2], { type: "application/javascript" });
          return URL.createObjectURL(e2);
        }
        let u;
        function c() {
          return u || (u = (function() {
            if ("undefined" == typeof Worker) return class {
              constructor() {
                throw Error("No web worker implementation available. You might have tried to spawn a worker within a worker in a browser that doesn't support workers in workers.");
              }
            };
            class t2 extends Worker {
              constructor(t3, e3) {
                var r2, n2;
                "string" == typeof t3 && e3 && e3._baseURL ? t3 = new URL(t3, e3._baseURL) : "string" == typeof t3 && !s(t3) && i().match(/^file:\/\//i) && (t3 = new URL(t3, i().replace(/\/[^\/]+$/, "/")), (null === (r2 = null == e3 ? void 0 : e3.CORSWorkaround) || void 0 === r2 || r2) && (t3 = a(`importScripts(${JSON.stringify(t3)});`))), "string" == typeof t3 && s(t3) && (null === (n2 = null == e3 ? void 0 : e3.CORSWorkaround) || void 0 === n2 || n2) && (t3 = a(`importScripts(${JSON.stringify(t3)});`)), super(t3, e3);
              }
            }
            class e2 extends t2 {
              constructor(t3, e3) {
                super(window.URL.createObjectURL(t3), e3);
              }
              static fromText(t3, r2) {
                const n2 = new window.Blob([t3], { type: "text/javascript" });
                return new e2(n2, r2);
              }
            }
            return { blob: e2, default: t2 };
          })()), u;
        }
      }, function(t, e, r) {
        var n, i;
        r.d(e, "a", (function() {
          return n;
        })), r.d(e, "b", (function() {
          return i;
        })), (function(t2) {
          t2.cancel = "cancel", t2.run = "run";
        })(n || (n = {})), (function(t2) {
          t2.error = "error", t2.init = "init", t2.result = "result", t2.running = "running", t2.uncaughtError = "uncaughtError";
        })(i || (i = {}));
      }, function(t, e, r) {
        function n(t2) {
          return Object.prototype.toString.call(t2);
        }
        e.isArray = function(t2) {
          return Array.isArray ? Array.isArray(t2) : "[object Array]" === n(t2);
        }, e.isBoolean = function(t2) {
          return "boolean" == typeof t2;
        }, e.isNull = function(t2) {
          return null === t2;
        }, e.isNullOrUndefined = function(t2) {
          return null == t2;
        }, e.isNumber = function(t2) {
          return "number" == typeof t2;
        }, e.isString = function(t2) {
          return "string" == typeof t2;
        }, e.isSymbol = function(t2) {
          return "symbol" == typeof t2;
        }, e.isUndefined = function(t2) {
          return void 0 === t2;
        }, e.isRegExp = function(t2) {
          return "[object RegExp]" === n(t2);
        }, e.isObject = function(t2) {
          return "object" == typeof t2 && null !== t2;
        }, e.isDate = function(t2) {
          return "[object Date]" === n(t2);
        }, e.isError = function(t2) {
          return "[object Error]" === n(t2) || t2 instanceof Error;
        }, e.isFunction = function(t2) {
          return "function" == typeof t2;
        }, e.isPrimitive = function(t2) {
          return null === t2 || "boolean" == typeof t2 || "number" == typeof t2 || "string" == typeof t2 || "symbol" == typeof t2 || void 0 === t2;
        }, e.isBuffer = r(7).Buffer.isBuffer;
      }, function(t, e, r) {
        const n = r(11), i = r(50);
        function o(t2) {
          return n(t2) ? "" : i(t2);
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(35);
        function i(t2, e2) {
          return n(t2, "2", e2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return o;
        }));
        var n = r(2);
        function i(t2) {
          throw Error(t2);
        }
        const o = { errors: (t2) => t2[n.a] || i("Error observable not found. Make sure to pass a thread instance as returned by the spawn() promise."), events: (t2) => t2[n.b] || i("Events observable not found. Make sure to pass a thread instance as returned by the spawn() promise."), terminate: (t2) => t2[n.c]() };
      }, function(t, e) {
      }, function(t, e, r) {
        const n = () => "function" == typeof Symbol, i = (t2) => n() && Boolean(Symbol[t2]), o = (t2) => i(t2) ? Symbol[t2] : "@@" + t2;
        i("asyncIterator") || (Symbol.asyncIterator = Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator"));
        const s = o("iterator"), a = o("observable"), u = o("species");
        function c(t2, e2) {
          const r2 = t2[e2];
          if (null != r2) {
            if ("function" != typeof r2) throw new TypeError(r2 + " is not a function");
            return r2;
          }
        }
        function l(t2) {
          let e2 = t2.constructor;
          return void 0 !== e2 && (e2 = e2[u], null === e2 && (e2 = void 0)), void 0 !== e2 ? e2 : v;
        }
        function f(t2) {
          f.log ? f.log(t2) : setTimeout(() => {
            throw t2;
          }, 0);
        }
        function h(t2) {
          Promise.resolve().then(() => {
            try {
              t2();
            } catch (t3) {
              f(t3);
            }
          });
        }
        function d(t2) {
          const e2 = t2._cleanup;
          if (void 0 !== e2 && (t2._cleanup = void 0, e2)) try {
            if ("function" == typeof e2) e2();
            else {
              const t3 = c(e2, "unsubscribe");
              t3 && t3.call(e2);
            }
          } catch (t3) {
            f(t3);
          }
        }
        function p(t2) {
          t2._observer = void 0, t2._queue = void 0, t2._state = "closed";
        }
        function y(t2, e2, r2) {
          t2._state = "running";
          const n2 = t2._observer;
          try {
            const i2 = n2 ? c(n2, e2) : void 0;
            switch (e2) {
              case "next":
                i2 && i2.call(n2, r2);
                break;
              case "error":
                if (p(t2), !i2) throw r2;
                i2.call(n2, r2);
                break;
              case "complete":
                p(t2), i2 && i2.call(n2);
            }
          } catch (t3) {
            f(t3);
          }
          "closed" === t2._state ? d(t2) : "running" === t2._state && (t2._state = "ready");
        }
        function g(t2, e2, r2) {
          if ("closed" !== t2._state) return "buffering" === t2._state ? (t2._queue = t2._queue || [], void t2._queue.push({ type: e2, value: r2 })) : "ready" !== t2._state ? (t2._state = "buffering", t2._queue = [{ type: e2, value: r2 }], void h(() => (function(t3) {
            const e3 = t3._queue;
            if (e3) {
              t3._queue = void 0, t3._state = "ready";
              for (const r3 of e3) if (y(t3, r3.type, r3.value), "closed" === t3._state) break;
            }
          })(t2))) : void y(t2, e2, r2);
        }
        class m {
          constructor(t2, e2) {
            this._cleanup = void 0, this._observer = t2, this._queue = void 0, this._state = "initializing";
            const r2 = new b(this);
            try {
              this._cleanup = e2.call(void 0, r2);
            } catch (t3) {
              r2.error(t3);
            }
            "initializing" === this._state && (this._state = "ready");
          }
          get closed() {
            return "closed" === this._state;
          }
          unsubscribe() {
            "closed" !== this._state && (p(this), d(this));
          }
        }
        class b {
          constructor(t2) {
            this._subscription = t2;
          }
          get closed() {
            return "closed" === this._subscription._state;
          }
          next(t2) {
            g(this._subscription, "next", t2);
          }
          error(t2) {
            g(this._subscription, "error", t2);
          }
          complete() {
            g(this._subscription, "complete");
          }
        }
        class v {
          constructor(t2) {
            if (!(this instanceof v)) throw new TypeError("Observable cannot be called as a function");
            if ("function" != typeof t2) throw new TypeError("Observable initializer must be a function");
            this._subscriber = t2;
          }
          subscribe(t2, e2, r2) {
            return "object" == typeof t2 && null !== t2 || (t2 = { next: t2, error: e2, complete: r2 }), new m(t2, this._subscriber);
          }
          pipe(t2, ...e2) {
            let r2 = this;
            for (const n2 of [t2, ...e2]) r2 = n2(r2);
            return r2;
          }
          tap(t2, e2, r2) {
            const n2 = "object" != typeof t2 || null === t2 ? { next: t2, error: e2, complete: r2 } : t2;
            return new v((t3) => this.subscribe({ next(e3) {
              n2.next && n2.next(e3), t3.next(e3);
            }, error(e3) {
              n2.error && n2.error(e3), t3.error(e3);
            }, complete() {
              n2.complete && n2.complete(), t3.complete();
            }, start(t4) {
              n2.start && n2.start(t4);
            } }));
          }
          forEach(t2) {
            return new Promise((e2, r2) => {
              if ("function" != typeof t2) return void r2(new TypeError(t2 + " is not a function"));
              function n2() {
                i2.unsubscribe(), e2(void 0);
              }
              const i2 = this.subscribe({ next(e3) {
                try {
                  t2(e3, n2);
                } catch (t3) {
                  r2(t3), i2.unsubscribe();
                }
              }, error(t3) {
                r2(t3);
              }, complete() {
                e2(void 0);
              } });
            });
          }
          map(t2) {
            if ("function" != typeof t2) throw new TypeError(t2 + " is not a function");
            return new (l(this))((e2) => this.subscribe({ next(r2) {
              let n2 = r2;
              try {
                n2 = t2(r2);
              } catch (t3) {
                return e2.error(t3);
              }
              e2.next(n2);
            }, error(t3) {
              e2.error(t3);
            }, complete() {
              e2.complete();
            } }));
          }
          filter(t2) {
            if ("function" != typeof t2) throw new TypeError(t2 + " is not a function");
            return new (l(this))((e2) => this.subscribe({ next(r2) {
              try {
                if (!t2(r2)) return;
              } catch (t3) {
                return e2.error(t3);
              }
              e2.next(r2);
            }, error(t3) {
              e2.error(t3);
            }, complete() {
              e2.complete();
            } }));
          }
          reduce(t2, e2) {
            if ("function" != typeof t2) throw new TypeError(t2 + " is not a function");
            const r2 = l(this), n2 = arguments.length > 1;
            let i2 = false, o2 = e2;
            return new r2((e3) => this.subscribe({ next(r3) {
              const s2 = !i2;
              if (i2 = true, !s2 || n2) try {
                o2 = t2(o2, r3);
              } catch (t3) {
                return e3.error(t3);
              }
              else o2 = r3;
            }, error(t3) {
              e3.error(t3);
            }, complete() {
              if (!i2 && !n2) return e3.error(new TypeError("Cannot reduce an empty sequence"));
              e3.next(o2), e3.complete();
            } }));
          }
          concat(...t2) {
            const e2 = l(this);
            return new e2((r2) => {
              let n2, i2 = 0;
              return (function o2(s2) {
                n2 = s2.subscribe({ next(t3) {
                  r2.next(t3);
                }, error(t3) {
                  r2.error(t3);
                }, complete() {
                  i2 === t2.length ? (n2 = void 0, r2.complete()) : o2(e2.from(t2[i2++]));
                } });
              })(this), () => {
                n2 && (n2.unsubscribe(), n2 = void 0);
              };
            });
          }
          flatMap(t2) {
            if ("function" != typeof t2) throw new TypeError(t2 + " is not a function");
            const e2 = l(this);
            return new e2((r2) => {
              const n2 = [], i2 = this.subscribe({ next(i3) {
                let s2;
                if (t2) try {
                  s2 = t2(i3);
                } catch (t3) {
                  return r2.error(t3);
                }
                else s2 = i3;
                const a2 = e2.from(s2).subscribe({ next(t3) {
                  r2.next(t3);
                }, error(t3) {
                  r2.error(t3);
                }, complete() {
                  const t3 = n2.indexOf(a2);
                  t3 >= 0 && n2.splice(t3, 1), o2();
                } });
                n2.push(a2);
              }, error(t3) {
                r2.error(t3);
              }, complete() {
                o2();
              } });
              function o2() {
                i2.closed && 0 === n2.length && r2.complete();
              }
              return () => {
                n2.forEach((t3) => t3.unsubscribe()), i2.unsubscribe();
              };
            });
          }
          [a]() {
            return this;
          }
          static from(t2) {
            const e2 = "function" == typeof this ? this : v;
            if (null == t2) throw new TypeError(t2 + " is not an object");
            const r2 = c(t2, a);
            if (r2) {
              const n2 = r2.call(t2);
              if (Object(n2) !== n2) throw new TypeError(n2 + " is not an object");
              return (function(t3) {
                return t3 instanceof v;
              })(n2) && n2.constructor === e2 ? n2 : new e2((t3) => n2.subscribe(t3));
            }
            if (i("iterator")) {
              const r3 = c(t2, s);
              if (r3) return new e2((e3) => {
                h(() => {
                  if (!e3.closed) {
                    for (const n2 of r3.call(t2)) if (e3.next(n2), e3.closed) return;
                    e3.complete();
                  }
                });
              });
            }
            if (Array.isArray(t2)) return new e2((e3) => {
              h(() => {
                if (!e3.closed) {
                  for (const r3 of t2) if (e3.next(r3), e3.closed) return;
                  e3.complete();
                }
              });
            });
            throw new TypeError(t2 + " is not observable");
          }
          static of(...t2) {
            return new ("function" == typeof this ? this : v)((e2) => {
              h(() => {
                if (!e2.closed) {
                  for (const r2 of t2) if (e2.next(r2), e2.closed) return;
                  e2.complete();
                }
              });
            });
          }
          static get [u]() {
            return this;
          }
        }
        n() && Object.defineProperty(v, Symbol("extensions"), { value: { symbol: a, hostReportError: f }, configurable: true });
        e.a = v;
      }, function(t, e, r) {
        var n;
        r.d(e, "a", (function() {
          return n;
        })), (function(t2) {
          t2.internalError = "internalError", t2.message = "message", t2.termination = "termination";
        })(n || (n = {}));
      }, function(t, e, r) {
        (function(e2) {
          void 0 === e2 || !e2.version || 0 === e2.version.indexOf("v0.") || 0 === e2.version.indexOf("v1.") && 0 !== e2.version.indexOf("v1.8.") ? t.exports = { nextTick: function(t2, r2, n, i) {
            if ("function" != typeof t2) throw new TypeError('"callback" argument must be a function');
            var o, s, a = arguments.length;
            switch (a) {
              case 0:
              case 1:
                return e2.nextTick(t2);
              case 2:
                return e2.nextTick((function() {
                  t2.call(null, r2);
                }));
              case 3:
                return e2.nextTick((function() {
                  t2.call(null, r2, n);
                }));
              case 4:
                return e2.nextTick((function() {
                  t2.call(null, r2, n, i);
                }));
              default:
                for (o = new Array(a - 1), s = 0; s < o.length; ) o[s++] = arguments[s];
                return e2.nextTick((function() {
                  t2.apply(null, o);
                }));
            }
          } } : t.exports = e2;
        }).call(this, r(8));
      }, function(t, e, r) {
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        function i(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }
        e.assign = function(t2) {
          for (var e2 = Array.prototype.slice.call(arguments, 1); e2.length; ) {
            var r2 = e2.shift();
            if (r2) {
              if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
              for (var n2 in r2) i(r2, n2) && (t2[n2] = r2[n2]);
            }
          }
          return t2;
        }, e.shrinkBuf = function(t2, e2) {
          return t2.length === e2 ? t2 : t2.subarray ? t2.subarray(0, e2) : (t2.length = e2, t2);
        };
        var o = { arraySet: function(t2, e2, r2, n2, i2) {
          if (e2.subarray && t2.subarray) t2.set(e2.subarray(r2, r2 + n2), i2);
          else for (var o2 = 0; o2 < n2; o2++) t2[i2 + o2] = e2[r2 + o2];
        }, flattenChunks: function(t2) {
          var e2, r2, n2, i2, o2, s2;
          for (n2 = 0, e2 = 0, r2 = t2.length; e2 < r2; e2++) n2 += t2[e2].length;
          for (s2 = new Uint8Array(n2), i2 = 0, e2 = 0, r2 = t2.length; e2 < r2; e2++) o2 = t2[e2], s2.set(o2, i2), i2 += o2.length;
          return s2;
        } }, s = { arraySet: function(t2, e2, r2, n2, i2) {
          for (var o2 = 0; o2 < n2; o2++) t2[i2 + o2] = e2[r2 + o2];
        }, flattenChunks: function(t2) {
          return [].concat.apply([], t2);
        } };
        e.setTyped = function(t2) {
          t2 ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, o)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, s));
        }, e.setTyped(n);
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER: n } = r(74), i = n.toString().length - 1;
        t.exports = { MAX_SAFE_INTEGER_LENGTH: i };
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(30);
        function i(t2, e2) {
          const r2 = t2.length, i2 = e2.length, o = t2.indexOf("."), s = e2.indexOf("."), a = -1 === o ? r2 : o, u = -1 === s ? i2 : s;
          if (-1 === o && -1 === s && r2 < n && i2 < n) return (Number(t2) - Number(e2)).toFixed();
          const c = a - u;
          let l = Math.max(a, u), f = Math.max(r2 - a - 1, i2 - u - 1), h = c < 0 ? -1 * c : 0, d = c <= 0 ? 0 : c, p = l + 1 + f - 1, y = "", g = 0, m = p;
          if (f > 0) {
            for (; m > p - f; ) {
              let r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
              r3 -= g, g = 0;
              let i3 = r3 - n2;
              if (i3 < 0) for (; i3 < 0; ) g++, i3 += 10;
              else g && g--;
              "" === y && 0 === i3 || (y = i3 + y), m--;
            }
            "" !== y && (y = "." + y), m--;
          }
          if (l > 0) {
            for (; m > 0; ) {
              let r4 = t2[m - h] || "0", n3 = e2[m - d] || "0";
              r4 -= g, g = 0;
              let i4 = r4 - n3;
              if (i4 < 0) for (; i4 < 0; ) g++, i4 += 10;
              else g && g--;
              y = i4 + y, m--;
            }
            const r3 = t2[0 - h] || "0", n2 = e2[0 - d] || "0";
            let i3 = Number(r3) - (g > 0 ? 1 : 0) - Number(n2);
            0 !== i3 && (y = i3 + y), y = y.replace(/^0+/, "");
          }
          return "." === y[0] && (y = "0" + y), y;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(5), i = r(6), o = r(33), s = r(49);
        function a(t2, e2, { format: r2 = "string", max_decimal_digits: a2 = 100, ellipsis: u = false } = {}) {
          "0" === t2[0] && (t2 = t2.substring(1)), "0" === e2[0] && (e2 = e2.substring(1));
          const c = t2.indexOf("."), l = e2.indexOf("."), f = -1 === c ? t2.length : c, h = -1 === l ? 0 : e2.length - 1 - l;
          let d = false;
          t2 = t2.replace(/\./, ""), e2 = e2.replace(/\./, "");
          const p = t2.length;
          let y, g = "", m = "", b = -1 * h, v = 0;
          for (let r3 = 0; r3 < p; r3++) {
            if (g += t2[r3], y = n(g, e2), ">" === y) {
              let t3 = 1, r4 = i(e2, e2), s2 = e2;
              for (; ">" !== n(r4, g); ) t3++, s2 = r4, r4 = i(r4, e2);
              if (t3 = t3.toString(), "" !== m) for (let e3 = t3.length; e3 <= v; e3++) m += "0";
              m += t3, g = o(g, s2), v = 0;
            } else {
              if ("<" === y) {
                "" === m && b++, v++;
                continue;
              }
              if ("=" === y) {
                if ("" !== m) for (let t3 = 0; t3 < v; t3++) m += "0";
                m += "1", g = "0", v = 0;
              }
            }
          }
          if (g.match(/^0+$/g)) "<" === y && (m += g.substring(0, g.length - 1));
          else {
            const t3 = {}, r3 = f - b - m.length + a2 + 1;
            "" === m && (v = 0);
            for (let s2 = 0; s2 < r3; s2++) {
              if (g += "0", u) if (g in t3) {
                if (t3[g]++, t3[g] > 3) {
                  m += "...", d = true;
                  break;
                }
              } else t3[g] = 1;
              const r4 = n(g, e2);
              if (">" === r4) {
                let t4 = 1, r5 = i(e2, e2), s3 = e2;
                for (; ">" !== n(r5, g); ) t4++, s3 = r5, r5 = i(r5, e2);
                t4 = t4.toString();
                for (let e3 = t4.length; e3 <= v; e3++) m += "0";
                if (m += t4, g = o(g, s3), "0" === g) break;
                v = 0;
              } else {
                if ("<" === r4) {
                  v++;
                  continue;
                }
                if ("=" === r4) {
                  for (let t4 = 0; t4 < v; t4++) m += "0";
                  m += "1", v = 0;
                  break;
                }
              }
            }
          }
          const w = f - b, x = m.length;
          let _;
          if (w === x) _ = 0;
          else if (w < 0) m = "0." + "0".repeat(Math.abs(w)) + m, _ = x - w;
          else if (w > x) {
            for (let t3 = x; t3 < w; t3++) m += "0";
            _ = 0;
          } else w < x ? (m = m.substring(0, w) + "." + m.substring(w), _ = x - w) : 0 === w && (m = "0." + m, _ = x);
          m = m.replace(/^0+/, ""), m = m.replace(/\.\d+0+$/, "");
          const S = _ - a2;
          return d || S > 0 && (m = s(m.substring(0, m.length - S + 1))), "." === m[0] && (m = "0" + m), "object" === r2 ? { quotient: m, extra_decimals: S } : m;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(0), i = r(5), o = r(15), s = r(9), a = r(31);
        function u(t2, e2, { infinity_minus_infinity: r2 = "NaN" } = {}) {
          t2 = n(t2), e2 = n(e2);
          const u2 = !("-" === t2[0]), c = !("-" === e2[0]), l = o(t2), f = o(e2);
          if (l && f) {
            if (u2 === c) return r2;
            if (u2) return "Infinity";
            if (c) return "-Infinity";
          } else {
            if (l) return t2;
            if (f) return c ? "-Infinity" : "Infinity";
          }
          if (u2) {
            if (c) {
              const r3 = i(t2, e2);
              return ">" === r3 ? a(t2, e2) : "<" === r3 ? "-" + a(e2, t2) : "0";
            }
            return s(t2, e2.substring(1));
          }
          if (c) return "-" + s(t2.substring(1), e2);
          {
            t2 = t2.substring(1), e2 = e2.substring(1);
            const r3 = i(t2, e2);
            return ">" === r3 ? "-" + a(t2, e2) : "<" === r3 ? a(e2, t2) : "0";
          }
        }
        t.exports = u, t.exports.default = u;
      }, function(t, e, r) {
        const n = r(0), i = r(5);
        function o(t2, e2) {
          t2 = n(t2), e2 = n(e2);
          const r2 = "-" !== t2[0], o2 = "-" !== e2[0];
          return r2 ? o2 ? i(t2, e2) : ">" : o2 ? "<" : i(e2.substring(1), t2.substring(1));
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(1), s = r(77), a = r(16), u = r(52), c = r(78), l = r(11), f = r(53), h = r(54), d = r(81), p = r(37), y = r(36), g = r(22), m = r(85);
        function b(t2, e2, { zero_to_the_power_of_zero: r2 = "1", ellipsis: b2 = false, imaginary: v = true, max_decimal_digits: w = 100, fraction: x = false } = {}) {
          t2 = i(t2), e2 = i(e2);
          const _ = v && u(t2);
          _ && (t2 = t2.replace(/i$/, ""));
          const S = l(t2), A = l(e2);
          if (S && A) return r2;
          if (A) return "1";
          const E = g(e2);
          if (S) {
            if ("+" === E) return "0";
            if ("-" === E) return "Infinity";
          }
          const k = a(e2);
          if ("+" === E && k) {
            let r3 = h(t2, e2);
            return "number" == typeof w && (r3 = y(r3, { digits: w })), _ && c(e2) && (r3 += "i"), r3;
          }
          if ("-" === E && k) {
            const r3 = "1", i2 = h(t2, n(e2));
            return o(r3, i2, { ellipsis: b2, max_decimal_digits: w });
          }
          if (!k) {
            e2 = n(e2);
            let [r3, i2] = e2.includes("/") ? e2.split("/") : s(e2);
            [r3, i2] = m(r3, i2);
            let o2 = p(t2, i2, { imaginary: v }), a2 = f(r3, o2);
            return "number" == typeof w && (a2 = y(a2, { digits: w })), "-" === E && (a2 = d(a2, { fraction: x, max_decimal_digits: w })), a2;
          }
        }
        t.exports = b, t.exports.default = b;
      }, function(t, e, r) {
        const n = r(52), i = r(164);
        function o(t2, { digits: e2 = 0 } = {}) {
          return n(t2) ? i(t2.substring(0, t2.length - 1), { digits: e2 }) + "i" : i(t2, { digits: e2 });
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(5), s = r(82), a = r(16), u = r(80), c = r(54), l = r(83);
        function f(t2, e2, { imaginary: r2 = true, max_decimal_digits: f2 = 100 } = {}) {
          if (t2 = i(t2), "1" === (e2 = i(e2))) return t2;
          if ("1" === t2) return "1";
          if (!a(e2)) throw new Error("[preciso] can't find fractional roots");
          if (u(e2)) throw new Error("[preciso] can't find root of negative indexes");
          const h = n(t2), d = u(t2), p = s(e2), y = d && p;
          if (y && !r2) throw new Error("[preciso] root has an imaginary number");
          const g = d && !p ? "-" : "", m = l(h, e2), b = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
          let v = "";
          for (let t3 = 0; t3 < m; t3++) for (let r3 = 0; r3 < b.length; r3++) {
            const n2 = v + b[r3];
            let i2 = n2 + "0".repeat(m - t3 - 1);
            const s2 = c(i2, e2), a2 = o(s2, h);
            if ("=" === a2) return y && (i2 += "i"), g + i2;
            if ("<" === a2) {
              v = n2;
              break;
            }
          }
          let w = v + ".";
          for (let t3 = 0; t3 < f2; t3++) {
            let t4 = false;
            for (let r3 = 0; r3 < b.length; r3++) {
              let n2 = w + b[r3];
              const i2 = c(n2, e2), s2 = o(i2, h);
              if ("=" === s2) return y && (n2 += "i"), g + n2;
              if ("<" === s2) {
                w = n2, t4 = true;
                break;
              }
            }
            if (!t4) break;
          }
          return y && (w += "i"), g + w;
        }
        t.exports = f, t.exports.default = f;
      }, function(t, e, r) {
        r(18);
        function n(t2, e2) {
          const r2 = t2.length, n2 = e2.length, i = t2.indexOf("."), o = e2.indexOf("."), s = -1 === i ? r2 : i, a = -1 === o ? n2 : o, u = s - a;
          let c = u < 0 ? -1 * u : 0, l = u <= 0 ? 0 : u, f = Math.max(s, a) + 1 + Math.max(r2 - s, n2 - a) - 1, h = 0;
          for (; h < f; ) {
            const r3 = h - c, n3 = r3 === s ? "." : t2[r3] || "0", i2 = h - l, o2 = i2 === a ? "." : e2[i2] || "0";
            if (n3 !== o2) {
              if (n3 > o2) return ">";
              if (n3 < o2) return "<";
            }
            h++;
          }
          return "=";
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        var n = r(140);
        function i() {
          this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
        }
        var o = /^([a-z0-9.+-]+:)/i, s = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, u = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]), c = ["'"].concat(u), l = ["%", "/", "?", ";", "#"].concat(c), f = ["/", "?", "#"], h = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, p = { javascript: true, "javascript:": true }, y = { javascript: true, "javascript:": true }, g = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true }, m = r(142);
        function b(t2, e2, r2) {
          if (t2 && "object" == typeof t2 && t2 instanceof i) return t2;
          var n2 = new i();
          return n2.parse(t2, e2, r2), n2;
        }
        i.prototype.parse = function(t2, e2, r2) {
          if ("string" != typeof t2) throw new TypeError("Parameter 'url' must be a string, not " + typeof t2);
          var i2 = t2.indexOf("?"), s2 = -1 !== i2 && i2 < t2.indexOf("#") ? "?" : "#", u2 = t2.split(s2);
          u2[0] = u2[0].replace(/\\/g, "/");
          var b2 = t2 = u2.join(s2);
          if (b2 = b2.trim(), !r2 && 1 === t2.split("#").length) {
            var v = a.exec(b2);
            if (v) return this.path = b2, this.href = b2, this.pathname = v[1], v[2] ? (this.search = v[2], this.query = e2 ? m.parse(this.search.substr(1)) : this.search.substr(1)) : e2 && (this.search = "", this.query = {}), this;
          }
          var w = o.exec(b2);
          if (w) {
            var x = (w = w[0]).toLowerCase();
            this.protocol = x, b2 = b2.substr(w.length);
          }
          if (r2 || w || b2.match(/^\/\/[^@/]+@[^@/]+/)) {
            var _ = "//" === b2.substr(0, 2);
            !_ || w && y[w] || (b2 = b2.substr(2), this.slashes = true);
          }
          if (!y[w] && (_ || w && !g[w])) {
            for (var S, A, E = -1, k = 0; k < f.length; k++) {
              -1 !== (T = b2.indexOf(f[k])) && (-1 === E || T < E) && (E = T);
            }
            -1 !== (A = -1 === E ? b2.lastIndexOf("@") : b2.lastIndexOf("@", E)) && (S = b2.slice(0, A), b2 = b2.slice(A + 1), this.auth = decodeURIComponent(S)), E = -1;
            for (k = 0; k < l.length; k++) {
              var T;
              -1 !== (T = b2.indexOf(l[k])) && (-1 === E || T < E) && (E = T);
            }
            -1 === E && (E = b2.length), this.host = b2.slice(0, E), b2 = b2.slice(E), this.parseHost(), this.hostname = this.hostname || "";
            var O = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!O) for (var C = this.hostname.split(/\./), P = (k = 0, C.length); k < P; k++) {
              var I = C[k];
              if (I && !I.match(h)) {
                for (var R = "", j = 0, M = I.length; j < M; j++) I.charCodeAt(j) > 127 ? R += "x" : R += I[j];
                if (!R.match(h)) {
                  var L = C.slice(0, k), F = C.slice(k + 1), N = I.match(d);
                  N && (L.push(N[1]), F.unshift(N[2])), F.length && (b2 = "/" + F.join(".") + b2), this.hostname = L.join(".");
                  break;
                }
              }
            }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), O || (this.hostname = n.toASCII(this.hostname));
            var D = this.port ? ":" + this.port : "", U = this.hostname || "";
            this.host = U + D, this.href += this.host, O && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== b2[0] && (b2 = "/" + b2));
          }
          if (!p[x]) for (k = 0, P = c.length; k < P; k++) {
            var B = c[k];
            if (-1 !== b2.indexOf(B)) {
              var G = encodeURIComponent(B);
              G === B && (G = escape(B)), b2 = b2.split(B).join(G);
            }
          }
          var q = b2.indexOf("#");
          -1 !== q && (this.hash = b2.substr(q), b2 = b2.slice(0, q));
          var z = b2.indexOf("?");
          if (-1 !== z ? (this.search = b2.substr(z), this.query = b2.substr(z + 1), e2 && (this.query = m.parse(this.query)), b2 = b2.slice(0, z)) : e2 && (this.search = "", this.query = {}), b2 && (this.pathname = b2), g[x] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            D = this.pathname || "";
            var H = this.search || "";
            this.path = D + H;
          }
          return this.href = this.format(), this;
        }, i.prototype.format = function() {
          var t2 = this.auth || "";
          t2 && (t2 = (t2 = encodeURIComponent(t2)).replace(/%3A/i, ":"), t2 += "@");
          var e2 = this.protocol || "", r2 = this.pathname || "", n2 = this.hash || "", i2 = false, o2 = "";
          this.host ? i2 = t2 + this.host : this.hostname && (i2 = t2 + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (i2 += ":" + this.port)), this.query && "object" == typeof this.query && Object.keys(this.query).length && (o2 = m.stringify(this.query));
          var s2 = this.search || o2 && "?" + o2 || "";
          return e2 && ":" !== e2.substr(-1) && (e2 += ":"), this.slashes || (!e2 || g[e2]) && false !== i2 ? (i2 = "//" + (i2 || ""), r2 && "/" !== r2.charAt(0) && (r2 = "/" + r2)) : i2 || (i2 = ""), n2 && "#" !== n2.charAt(0) && (n2 = "#" + n2), s2 && "?" !== s2.charAt(0) && (s2 = "?" + s2), e2 + i2 + (r2 = r2.replace(/[?#]/g, (function(t3) {
            return encodeURIComponent(t3);
          }))) + (s2 = s2.replace("#", "%23")) + n2;
        }, i.prototype.resolve = function(t2) {
          return this.resolveObject(b(t2, false, true)).format();
        }, i.prototype.resolveObject = function(t2) {
          if ("string" == typeof t2) {
            var e2 = new i();
            e2.parse(t2, false, true), t2 = e2;
          }
          for (var r2 = new i(), n2 = Object.keys(this), o2 = 0; o2 < n2.length; o2++) {
            var s2 = n2[o2];
            r2[s2] = this[s2];
          }
          if (r2.hash = t2.hash, "" === t2.href) return r2.href = r2.format(), r2;
          if (t2.slashes && !t2.protocol) {
            for (var a2 = Object.keys(t2), u2 = 0; u2 < a2.length; u2++) {
              var c2 = a2[u2];
              "protocol" !== c2 && (r2[c2] = t2[c2]);
            }
            return g[r2.protocol] && r2.hostname && !r2.pathname && (r2.pathname = "/", r2.path = r2.pathname), r2.href = r2.format(), r2;
          }
          if (t2.protocol && t2.protocol !== r2.protocol) {
            if (!g[t2.protocol]) {
              for (var l2 = Object.keys(t2), f2 = 0; f2 < l2.length; f2++) {
                var h2 = l2[f2];
                r2[h2] = t2[h2];
              }
              return r2.href = r2.format(), r2;
            }
            if (r2.protocol = t2.protocol, t2.host || y[t2.protocol]) r2.pathname = t2.pathname;
            else {
              for (var d2 = (t2.pathname || "").split("/"); d2.length && !(t2.host = d2.shift()); ) ;
              t2.host || (t2.host = ""), t2.hostname || (t2.hostname = ""), "" !== d2[0] && d2.unshift(""), d2.length < 2 && d2.unshift(""), r2.pathname = d2.join("/");
            }
            if (r2.search = t2.search, r2.query = t2.query, r2.host = t2.host || "", r2.auth = t2.auth, r2.hostname = t2.hostname || t2.host, r2.port = t2.port, r2.pathname || r2.search) {
              var p2 = r2.pathname || "", m2 = r2.search || "";
              r2.path = p2 + m2;
            }
            return r2.slashes = r2.slashes || t2.slashes, r2.href = r2.format(), r2;
          }
          var b2 = r2.pathname && "/" === r2.pathname.charAt(0), v = t2.host || t2.pathname && "/" === t2.pathname.charAt(0), w = v || b2 || r2.host && t2.pathname, x = w, _ = r2.pathname && r2.pathname.split("/") || [], S = (d2 = t2.pathname && t2.pathname.split("/") || [], r2.protocol && !g[r2.protocol]);
          if (S && (r2.hostname = "", r2.port = null, r2.host && ("" === _[0] ? _[0] = r2.host : _.unshift(r2.host)), r2.host = "", t2.protocol && (t2.hostname = null, t2.port = null, t2.host && ("" === d2[0] ? d2[0] = t2.host : d2.unshift(t2.host)), t2.host = null), w = w && ("" === d2[0] || "" === _[0])), v) r2.host = t2.host || "" === t2.host ? t2.host : r2.host, r2.hostname = t2.hostname || "" === t2.hostname ? t2.hostname : r2.hostname, r2.search = t2.search, r2.query = t2.query, _ = d2;
          else if (d2.length) _ || (_ = []), _.pop(), _ = _.concat(d2), r2.search = t2.search, r2.query = t2.query;
          else if (null != t2.search) {
            if (S) r2.host = _.shift(), r2.hostname = r2.host, (O = !!(r2.host && r2.host.indexOf("@") > 0) && r2.host.split("@")) && (r2.auth = O.shift(), r2.hostname = O.shift(), r2.host = r2.hostname);
            return r2.search = t2.search, r2.query = t2.query, null === r2.pathname && null === r2.search || (r2.path = (r2.pathname ? r2.pathname : "") + (r2.search ? r2.search : "")), r2.href = r2.format(), r2;
          }
          if (!_.length) return r2.pathname = null, r2.search ? r2.path = "/" + r2.search : r2.path = null, r2.href = r2.format(), r2;
          for (var A = _.slice(-1)[0], E = (r2.host || t2.host || _.length > 1) && ("." === A || ".." === A) || "" === A, k = 0, T = _.length; T >= 0; T--) "." === (A = _[T]) ? _.splice(T, 1) : ".." === A ? (_.splice(T, 1), k++) : k && (_.splice(T, 1), k--);
          if (!w && !x) for (; k--; k) _.unshift("..");
          !w || "" === _[0] || _[0] && "/" === _[0].charAt(0) || _.unshift(""), E && "/" !== _.join("/").substr(-1) && _.push("");
          var O, C = "" === _[0] || _[0] && "/" === _[0].charAt(0);
          S && (r2.hostname = C ? "" : _.length ? _.shift() : "", r2.host = r2.hostname, (O = !!(r2.host && r2.host.indexOf("@") > 0) && r2.host.split("@")) && (r2.auth = O.shift(), r2.hostname = O.shift(), r2.host = r2.hostname));
          return (w = w || r2.host && _.length) && !C && _.unshift(""), _.length > 0 ? r2.pathname = _.join("/") : (r2.pathname = null, r2.path = null), null === r2.pathname && null === r2.search || (r2.path = (r2.pathname ? r2.pathname : "") + (r2.search ? r2.search : "")), r2.auth = t2.auth || r2.auth, r2.slashes = r2.slashes || t2.slashes, r2.href = r2.format(), r2;
        }, i.prototype.parseHost = function() {
          var t2 = this.host, e2 = s.exec(t2);
          e2 && (":" !== (e2 = e2[0]) && (this.port = e2.substr(1)), t2 = t2.substr(0, t2.length - e2.length)), t2 && (this.hostname = t2);
        }, e.parse = b, e.resolve = function(t2, e2) {
          return b(t2, false, true).resolve(e2);
        }, e.resolveObject = function(t2, e2) {
          return t2 ? b(t2, false, true).resolveObject(e2) : e2;
        }, e.format = function(t2) {
          return "string" == typeof t2 && (t2 = b(t2)), t2 instanceof i ? t2.format() : i.prototype.format.call(t2);
        }, e.Url = i;
      }, function(t, e, r) {
        (function(t2) {
          var n = r(136), i = r(70), o = r(138), s = r(139), a = r(39), u = e;
          u.request = function(e2, r2) {
            e2 = "string" == typeof e2 ? a.parse(e2) : o(e2);
            var i2 = -1 === t2.location.protocol.search(/^https?:$/) ? "http:" : "", s2 = e2.protocol || i2, u2 = e2.hostname || e2.host, c = e2.port, l = e2.path || "/";
            u2 && -1 !== u2.indexOf(":") && (u2 = "[" + u2 + "]"), e2.url = (u2 ? s2 + "//" + u2 : "") + (c ? ":" + c : "") + l, e2.method = (e2.method || "GET").toUpperCase(), e2.headers = e2.headers || {};
            var f = new n(e2);
            return r2 && f.on("response", r2), f;
          }, u.get = function(t3, e2) {
            var r2 = u.request(t3, e2);
            return r2.end(), r2;
          }, u.ClientRequest = n, u.IncomingMessage = i.IncomingMessage, u.Agent = function() {
          }, u.Agent.defaultMaxSockets = 4, u.globalAgent = new u.Agent(), u.STATUS_CODES = s, u.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
        }).call(this, r(3));
      }, , function(t, e, r) {
        (e = t.exports = r(61)).Stream = e, e.Readable = e, e.Writable = r(65), e.Duplex = r(14), e.Transform = r(67), e.PassThrough = r(122);
      }, function(t, e, r) {
        var n = r(7), i = n.Buffer;
        function o(t2, e2) {
          for (var r2 in t2) e2[r2] = t2[r2];
        }
        function s(t2, e2, r2) {
          return i(t2, e2, r2);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, e), e.Buffer = s), o(i, s), s.from = function(t2, e2, r2) {
          if ("number" == typeof t2) throw new TypeError("Argument must not be a number");
          return i(t2, e2, r2);
        }, s.alloc = function(t2, e2, r2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          var n2 = i(t2);
          return void 0 !== e2 ? "string" == typeof r2 ? n2.fill(e2, r2) : n2.fill(e2) : n2.fill(0), n2;
        }, s.allocUnsafe = function(t2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          return i(t2);
        }, s.allocUnsafeSlow = function(t2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          return n.SlowBuffer(t2);
        };
      }, function(t, e, r) {
        var n = SyntaxError, i = Function, o = TypeError, s = function(t2) {
          try {
            return i('"use strict"; return (' + t2 + ").constructor;")();
          } catch (t3) {
          }
        }, a = Object.getOwnPropertyDescriptor;
        if (a) try {
          a({}, "");
        } catch (t2) {
          a = null;
        }
        var u = function() {
          throw new o();
        }, c = a ? (function() {
          try {
            return u;
          } catch (t2) {
            try {
              return a(arguments, "callee").get;
            } catch (t3) {
              return u;
            }
          }
        })() : u, l = r(145)(), f = r(147)(), h = Object.getPrototypeOf || (f ? function(t2) {
          return t2.__proto__;
        } : null), d = {}, p = "undefined" != typeof Uint8Array && h ? h(Uint8Array) : void 0, y = { "%AggregateError%": "undefined" == typeof AggregateError ? void 0 : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? void 0 : ArrayBuffer, "%ArrayIteratorPrototype%": l && h ? h([][Symbol.iterator]()) : void 0, "%AsyncFromSyncIteratorPrototype%": void 0, "%AsyncFunction%": d, "%AsyncGenerator%": d, "%AsyncGeneratorFunction%": d, "%AsyncIteratorPrototype%": d, "%Atomics%": "undefined" == typeof Atomics ? void 0 : Atomics, "%BigInt%": "undefined" == typeof BigInt ? void 0 : BigInt, "%BigInt64Array%": "undefined" == typeof BigInt64Array ? void 0 : BigInt64Array, "%BigUint64Array%": "undefined" == typeof BigUint64Array ? void 0 : BigUint64Array, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? void 0 : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": "undefined" == typeof Float32Array ? void 0 : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? void 0 : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? void 0 : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": d, "%Int8Array%": "undefined" == typeof Int8Array ? void 0 : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? void 0 : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? void 0 : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": l && h ? h(h([][Symbol.iterator]())) : void 0, "%JSON%": "object" == typeof JSON ? JSON : void 0, "%Map%": "undefined" == typeof Map ? void 0 : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && l && h ? h((/* @__PURE__ */ new Map())[Symbol.iterator]()) : void 0, "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? void 0 : Promise, "%Proxy%": "undefined" == typeof Proxy ? void 0 : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": "undefined" == typeof Reflect ? void 0 : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? void 0 : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && l && h ? h((/* @__PURE__ */ new Set())[Symbol.iterator]()) : void 0, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? void 0 : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": l && h ? h(""[Symbol.iterator]()) : void 0, "%Symbol%": l ? Symbol : void 0, "%SyntaxError%": n, "%ThrowTypeError%": c, "%TypedArray%": p, "%TypeError%": o, "%Uint8Array%": "undefined" == typeof Uint8Array ? void 0 : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? void 0 : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? void 0 : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? void 0 : Uint32Array, "%URIError%": URIError, "%WeakMap%": "undefined" == typeof WeakMap ? void 0 : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? void 0 : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? void 0 : WeakSet };
        if (h) try {
          null.error;
        } catch (t2) {
          var g = h(h(t2));
          y["%Error.prototype%"] = g;
        }
        var m = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, b = r(45), v = r(149), w = b.call(Function.call, Array.prototype.concat), x = b.call(Function.apply, Array.prototype.splice), _ = b.call(Function.call, String.prototype.replace), S = b.call(Function.call, String.prototype.slice), A = b.call(Function.call, RegExp.prototype.exec), E = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, k = /\\(\\)?/g, T = function(t2) {
          var e2 = S(t2, 0, 1), r2 = S(t2, -1);
          if ("%" === e2 && "%" !== r2) throw new n("invalid intrinsic syntax, expected closing `%`");
          if ("%" === r2 && "%" !== e2) throw new n("invalid intrinsic syntax, expected opening `%`");
          var i2 = [];
          return _(t2, E, (function(t3, e3, r3, n2) {
            i2[i2.length] = r3 ? _(n2, k, "$1") : e3 || t3;
          })), i2;
        }, O = function(t2, e2) {
          var r2, i2 = t2;
          if (v(m, i2) && (i2 = "%" + (r2 = m[i2])[0] + "%"), v(y, i2)) {
            var a2 = y[i2];
            if (a2 === d && (a2 = (function t3(e3) {
              var r3;
              if ("%AsyncFunction%" === e3) r3 = s("async function () {}");
              else if ("%GeneratorFunction%" === e3) r3 = s("function* () {}");
              else if ("%AsyncGeneratorFunction%" === e3) r3 = s("async function* () {}");
              else if ("%AsyncGenerator%" === e3) {
                var n2 = t3("%AsyncGeneratorFunction%");
                n2 && (r3 = n2.prototype);
              } else if ("%AsyncIteratorPrototype%" === e3) {
                var i3 = t3("%AsyncGenerator%");
                i3 && h && (r3 = h(i3.prototype));
              }
              return y[e3] = r3, r3;
            })(i2)), void 0 === a2 && !e2) throw new o("intrinsic " + t2 + " exists, but is not available. Please file an issue!");
            return { alias: r2, name: i2, value: a2 };
          }
          throw new n("intrinsic " + t2 + " does not exist!");
        };
        t.exports = function(t2, e2) {
          if ("string" != typeof t2 || 0 === t2.length) throw new o("intrinsic name must be a non-empty string");
          if (arguments.length > 1 && "boolean" != typeof e2) throw new o('"allowMissing" argument must be a boolean');
          if (null === A(/^%?[^%]*%?$/, t2)) throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
          var r2 = T(t2), i2 = r2.length > 0 ? r2[0] : "", s2 = O("%" + i2 + "%", e2), u2 = s2.name, c2 = s2.value, l2 = false, f2 = s2.alias;
          f2 && (i2 = f2[0], x(r2, w([0, 1], f2)));
          for (var h2 = 1, d2 = true; h2 < r2.length; h2 += 1) {
            var p2 = r2[h2], g2 = S(p2, 0, 1), m2 = S(p2, -1);
            if (('"' === g2 || "'" === g2 || "`" === g2 || '"' === m2 || "'" === m2 || "`" === m2) && g2 !== m2) throw new n("property names with quotes must have matching quotes");
            if ("constructor" !== p2 && d2 || (l2 = true), v(y, u2 = "%" + (i2 += "." + p2) + "%")) c2 = y[u2];
            else if (null != c2) {
              if (!(p2 in c2)) {
                if (!e2) throw new o("base intrinsic for " + t2 + " exists, but the property is not available.");
                return;
              }
              if (a && h2 + 1 >= r2.length) {
                var b2 = a(c2, p2);
                c2 = (d2 = !!b2) && "get" in b2 && !("originalValue" in b2.get) ? b2.get : c2[p2];
              } else d2 = v(c2, p2), c2 = c2[p2];
              d2 && !l2 && (y[u2] = c2);
            }
          }
          return c2;
        };
      }, function(t, e, r) {
        var n = r(148);
        t.exports = Function.prototype.bind || n;
      }, function(t, e, r) {
        var n = String.prototype.replace, i = /%20/g, o = "RFC1738", s = "RFC3986";
        t.exports = { default: s, formatters: { RFC1738: function(t2) {
          return n.call(t2, i, "+");
        }, RFC3986: function(t2) {
          return String(t2);
        } }, RFC1738: o, RFC3986: s };
      }, function(t, e, r) {
        const n = r(5), i = r(11), o = r(48), s = r(9);
        function a(t2, e2, r2 = "1") {
          if (i(t2)) return "0";
          let a2 = t2, u = t2;
          for (; "<" === n(u, e2); ) u = s(u, r2), a2 = o(a2, u);
          return a2;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(30);
        function i(t2, e2) {
          if ("0" === t2 || "0" === e2) return "0";
          const r2 = t2.indexOf("."), i2 = e2.indexOf("."), o = (-1 === r2 ? t2.length : r2) + (-1 === i2 ? e2.length : i2), s = (-1 === r2 ? 0 : t2.length - 1 - r2) + (-1 === i2 ? 0 : e2.length - 1 - i2);
          if (0 === s && o < n) return (Number(t2) * Number(e2)).toFixed(0);
          const a = t2.replace(".", ""), u = e2.replace(".", ""), c = a.length, l = u.length, f = [];
          let h = c;
          for (; h >= 0; ) {
            const t3 = h, e3 = h -= 15, r3 = a.substring(e3, t3);
            f.push([Number(r3), r3.length]);
          }
          const d = [], p = [];
          for (let t3 = 0, e3 = l - 1; e3 >= 0; e3--, t3++) {
            const r3 = u[e3], n2 = Number(r3);
            let i3 = 0, o2 = "";
            const s2 = f.length - 1;
            f.forEach(([t4, e4], r4) => {
              let a2 = (i3 + n2 * t4).toString();
              const u2 = a2.length;
              if (u2 > e4 && r4 !== s2) {
                const t5 = -1 * e4;
                o2 = a2.slice(t5) + o2, i3 = Number(a2.slice(0, t5));
              } else {
                const t5 = e4 - u2;
                for (let e5 = 0; e5 < t5; e5++) a2 = "0" + a2;
                i3 = 0, o2 = a2 + o2;
              }
            }), o2 += "0".repeat(t3), d.push(o2), p.push([Array.from(o2).map((t4) => Number(t4)), o2.length]);
          }
          const y = d.length, g = p[p.length - 1][1] + y;
          let m = "", b = 0;
          for (let t3 = 0; t3 < g; t3++) {
            let e3 = b;
            const r3 = Math.min(t3, y - 1);
            for (let n2 = 0; n2 <= r3; n2++) {
              const [r4, i3] = p[n2], o2 = i3 - 1 - t3;
              o2 >= 0 && (e3 += r4[o2]);
            }
            e3 >= 10 ? (e3 = e3.toString(), m = e3[e3.length - 1] + m, b = Number(e3.slice(0, -1))) : (m = e3 + m, b = 0);
          }
          if (0 === s) m = m.replace(/^0+/, "");
          else {
            const t3 = m.length - s;
            m = m.substring(0, t3) + "." + m.substring(t3), m = m.replace(/^0+/, ""), m = m.replace(/\.?0+$/, ""), "." === m[0] && (m = "0" + m);
          }
          return m;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(6), i = r(160), o = ["5", "6", "7", "8", "9"];
        function s(t2) {
          if (t2.match(/\.9+$/)) return n(i(t2), "1");
          "+" === t2[0] && (t2 = t2.substring(1));
          const e2 = t2.length;
          let r2 = "";
          const s2 = t2[t2.length - 1];
          if (o.includes(s2)) {
            let n2;
            for (n2 = e2 - 2; n2 >= 0; n2--) {
              const e3 = t2[n2];
              if ("." === e3 || "-" === e3) continue;
              const i2 = Number(e3) + 1;
              if (10 !== i2) {
                r2 = i2 + r2;
                break;
              }
              r2 = "0" + r2;
            }
            n2 > 0 && (r2 = t2.substring(0, n2) + r2);
          } else r2 = t2.substring(0, e2 - 1);
          return "." === r2[r2.length - 1] && (r2 = r2.substring(0, r2.length - 1)), r2.indexOf(".") > -1 && (r2 = r2.replace(/0+$/, "")), r2;
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        function n(t2) {
          return "-" === t2[0] ? "-" : "+";
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(0);
        function i(t2) {
          const e2 = (t2 = n(t2)).indexOf(".");
          return -1 === e2 ? "0" : (t2.length - e2 - 1).toString();
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        function n(t2) {
          return t2.includes("i");
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(79);
        function i() {
          const t2 = Array.from(arguments), e2 = "object" == typeof t2[t2.length - 1] ? t2[t2.length - 1] : void 0, r2 = Array.isArray(t2[0]) ? t2[0] : e2 ? t2.slice(0, t2.length - 1) : t2;
          return n(r2, e2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(17);
        function i(t2, e2) {
          const r2 = Number(e2);
          let i2 = t2;
          for (let e3 = 1; e3 < r2; e3++) i2 = n([i2, t2]);
          return i2;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(6);
        function i(t2) {
          let e2 = "0";
          for (let r2 of t2) e2 = n(e2, r2);
          return e2;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e) {
        const r = 9007199254740991 .toString().length - 1;
        t.exports = { MAX_SAFE_INTEGER: 9007199254740991, MAX_SAFE_INTEGER_LENGTH: r };
      }, function(t, e, r) {
        (function(t2) {
          r.d(e, "a", (function() {
            return m;
          }));
          var n = r(12), i = r.n(n), o = r(26), s = r(13), a = r(104), u = r(2), c = r(27), l = r(59), f = function(t3, e2, r2, n2) {
            return new (r2 || (r2 = Promise))((function(i2, o2) {
              function s2(t4) {
                try {
                  u2(n2.next(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function a2(t4) {
                try {
                  u2(n2.throw(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function u2(t4) {
                var e3;
                t4.done ? i2(t4.value) : (e3 = t4.value, e3 instanceof r2 ? e3 : new r2((function(t5) {
                  t5(e3);
                }))).then(s2, a2);
              }
              u2((n2 = n2.apply(t3, [])).next());
            }));
          };
          const h = i()("threads:master:messages"), d = i()("threads:master:spawn"), p = i()("threads:master:thread-utils"), y = void 0 !== t2 && t2.env.THREADS_WORKER_INIT_TIMEOUT ? Number.parseInt(t2.env.THREADS_WORKER_INIT_TIMEOUT, 10) : 1e4;
          function g(t3, e2, r2, n2) {
            const i2 = r2.filter((t4) => t4.type === c.a.internalError).map((t4) => t4.error);
            return Object.assign(t3, { [u.a]: i2, [u.b]: r2, [u.c]: n2, [u.e]: e2 });
          }
          function m(t3, e2) {
            return f(this, void 0, void 0, (function* () {
              d("Initializing new thread");
              const r2 = e2 && e2.timeout ? e2.timeout : y, n2 = (yield (function(t4, e3, r3) {
                return f(this, void 0, void 0, (function* () {
                  let n3;
                  const i3 = new Promise((t5, i4) => {
                    n3 = setTimeout(() => i4(Error(r3)), e3);
                  }), o2 = yield Promise.race([t4, i3]);
                  return clearTimeout(n3), o2;
                }));
              })((function(t4) {
                return new Promise((e3, r3) => {
                  const n3 = (i3) => {
                    var o2;
                    h("Message from worker before finishing initialization:", i3.data), (o2 = i3.data) && "init" === o2.type ? (t4.removeEventListener("message", n3), e3(i3.data)) : ((t5) => t5 && "uncaughtError" === t5.type)(i3.data) && (t4.removeEventListener("message", n3), r3(Object(s.a)(i3.data.error)));
                  };
                  t4.addEventListener("message", n3);
                });
              })(t3), r2, `Timeout: Did not receive an init message from worker after ${r2}ms. Make sure the worker calls expose().`)).exposed, { termination: i2, terminate: u2 } = (function(t4) {
                const [e3, r3] = Object(a.a)();
                return { terminate: () => f(this, void 0, void 0, (function* () {
                  p("Terminating worker"), yield t4.terminate(), r3();
                })), termination: e3 };
              })(t3), m2 = (function(t4, e3) {
                return new o.a((r3) => {
                  const n3 = (t5) => {
                    const e4 = { type: c.a.message, data: t5.data };
                    r3.next(e4);
                  }, i3 = (t5) => {
                    p("Unhandled promise rejection event in thread:", t5);
                    const e4 = { type: c.a.internalError, error: Error(t5.reason) };
                    r3.next(e4);
                  };
                  t4.addEventListener("message", n3), t4.addEventListener("unhandledrejection", i3), e3.then(() => {
                    const e4 = { type: c.a.termination };
                    t4.removeEventListener("message", n3), t4.removeEventListener("unhandledrejection", i3), r3.next(e4), r3.complete();
                  });
                });
              })(t3, i2);
              if ("function" === n2.type) {
                return g(Object(l.a)(t3), t3, m2, u2);
              }
              if ("module" === n2.type) {
                return g(Object(l.b)(t3, n2.methods), t3, m2, u2);
              }
              {
                const t4 = n2.type;
                throw Error("Worker init message states unexpected type of expose(): " + t4);
              }
            }));
          }
        }).call(this, r(8));
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return g;
        }));
        var n = r(12), i = r.n(n), o = r(103), s = r(201), a = r(26);
        function u(t2) {
          return Promise.all(t2.map((t3) => {
            const e2 = (t4) => ({ status: "fulfilled", value: t4 }), r2 = (t4) => ({ status: "rejected", reason: t4 }), n2 = Promise.resolve(t3);
            try {
              return n2.then(e2, r2);
            } catch (t4) {
              return Promise.reject(t4);
            }
          }));
        }
        var c, l = r(19);
        !(function(t2) {
          t2.initialized = "initialized", t2.taskCanceled = "taskCanceled", t2.taskCompleted = "taskCompleted", t2.taskFailed = "taskFailed", t2.taskQueued = "taskQueued", t2.taskQueueDrained = "taskQueueDrained", t2.taskStart = "taskStart", t2.terminated = "terminated";
        })(c || (c = {}));
        var f = r(24), h = function(t2, e2, r2, n2) {
          return new (r2 || (r2 = Promise))((function(i2, o2) {
            function s2(t3) {
              try {
                u2(n2.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function a2(t3) {
              try {
                u2(n2.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function u2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof r2 ? e3 : new r2((function(t4) {
                t4(e3);
              }))).then(s2, a2);
            }
            u2((n2 = n2.apply(t2, [])).next());
          }));
        };
        let d = 1;
        class p {
          constructor(t2, e2) {
            this.eventSubject = new o.a(), this.initErrors = [], this.isClosing = false, this.nextTaskID = 1, this.taskQueue = [];
            const r2 = "number" == typeof e2 ? { size: e2 } : e2 || {}, { size: n2 = l.a } = r2;
            this.debug = i()("threads:pool:" + (r2.name || String(d++)).replace(/\W/g, " ").trim().replace(/\s+/g, "-")), this.options = r2, this.workers = (function(t3, e3) {
              return (function(t4) {
                const e4 = [];
                for (let r3 = 0; r3 < t4; r3++) e4.push(r3);
                return e4;
              })(e3).map(() => ({ init: t3(), runningTasks: [] }));
            })(t2, n2), this.eventObservable = Object(s.a)(a.a.from(this.eventSubject)), Promise.all(this.workers.map((t3) => t3.init)).then(() => this.eventSubject.next({ type: c.initialized, size: this.workers.length }), (t3) => {
              this.debug("Error while initializing pool worker:", t3), this.eventSubject.error(t3), this.initErrors.push(t3);
            });
          }
          findIdlingWorker() {
            const { concurrency: t2 = 1 } = this.options;
            return this.workers.find((e2) => e2.runningTasks.length < t2);
          }
          runPoolTask(t2, e2) {
            return h(this, void 0, void 0, (function* () {
              const r2 = this.workers.indexOf(t2) + 1;
              this.debug(`Running task #${e2.id} on worker #${r2}...`), this.eventSubject.next({ type: c.taskStart, taskID: e2.id, workerID: r2 });
              try {
                const n2 = yield e2.run(yield t2.init);
                this.debug(`Task #${e2.id} completed successfully`), this.eventSubject.next({ type: c.taskCompleted, returnValue: n2, taskID: e2.id, workerID: r2 });
              } catch (t3) {
                this.debug(`Task #${e2.id} failed`), this.eventSubject.next({ type: c.taskFailed, taskID: e2.id, error: t3, workerID: r2 });
              }
            }));
          }
          run(t2, e2) {
            return h(this, void 0, void 0, (function* () {
              const r2 = (() => h(this, void 0, void 0, (function* () {
                var n2;
                yield (n2 = 0, new Promise((t3) => setTimeout(t3, n2)));
                try {
                  yield this.runPoolTask(t2, e2);
                } finally {
                  t2.runningTasks = t2.runningTasks.filter((t3) => t3 !== r2), this.isClosing || this.scheduleWork();
                }
              })))();
              t2.runningTasks.push(r2);
            }));
          }
          scheduleWork() {
            this.debug("Attempt de-queueing a task in order to run it...");
            const t2 = this.findIdlingWorker();
            if (!t2) return;
            const e2 = this.taskQueue.shift();
            if (!e2) return this.debug("Task queue is empty"), void this.eventSubject.next({ type: c.taskQueueDrained });
            this.run(t2, e2);
          }
          taskCompletion(t2) {
            return new Promise((e2, r2) => {
              const n2 = this.events().subscribe((i2) => {
                i2.type === c.taskCompleted && i2.taskID === t2 ? (n2.unsubscribe(), e2(i2.returnValue)) : i2.type === c.taskFailed && i2.taskID === t2 ? (n2.unsubscribe(), r2(i2.error)) : i2.type === c.terminated && (n2.unsubscribe(), r2(Error("Pool has been terminated before task was run.")));
              });
            });
          }
          settled(t2 = false) {
            return h(this, void 0, void 0, (function* () {
              const e2 = () => {
                return t3 = this.workers, e3 = (t4) => t4.runningTasks, t3.reduce((t4, r3) => [...t4, ...e3(r3)], []);
                var t3, e3;
              }, r2 = [], n2 = this.eventObservable.subscribe((t3) => {
                t3.type === c.taskFailed && r2.push(t3.error);
              });
              return this.initErrors.length > 0 ? Promise.reject(this.initErrors[0]) : t2 && 0 === this.taskQueue.length ? (yield u(e2()), r2) : (yield new Promise((t3, e3) => {
                const r3 = this.eventObservable.subscribe({ next(e4) {
                  e4.type === c.taskQueueDrained && (r3.unsubscribe(), t3(void 0));
                }, error: e3 });
              }), yield u(e2()), n2.unsubscribe(), r2);
            }));
          }
          completed(t2 = false) {
            return h(this, void 0, void 0, (function* () {
              const e2 = this.settled(t2), r2 = new Promise((t3, r3) => {
                const n3 = this.eventObservable.subscribe({ next(i2) {
                  i2.type === c.taskQueueDrained ? (n3.unsubscribe(), t3(e2)) : i2.type === c.taskFailed && (n3.unsubscribe(), r3(i2.error));
                }, error: r3 });
              }), n2 = yield Promise.race([e2, r2]);
              if (n2.length > 0) throw n2[0];
            }));
          }
          events() {
            return this.eventObservable;
          }
          queue(t2) {
            const { maxQueuedJobs: e2 = 1 / 0 } = this.options;
            if (this.isClosing) throw Error("Cannot schedule pool tasks after terminate() has been called.");
            if (this.initErrors.length > 0) throw this.initErrors[0];
            const r2 = this.nextTaskID++, n2 = this.taskCompletion(r2);
            n2.catch((t3) => {
              this.debug(`Task #${r2} errored:`, t3);
            });
            const i2 = { id: r2, run: t2, cancel: () => {
              -1 !== this.taskQueue.indexOf(i2) && (this.taskQueue = this.taskQueue.filter((t3) => t3 !== i2), this.eventSubject.next({ type: c.taskCanceled, taskID: i2.id }));
            }, then: n2.then.bind(n2) };
            if (this.taskQueue.length >= e2) throw Error("Maximum number of pool tasks queued. Refusing to queue another one.\nThis usually happens for one of two reasons: We are either at peak workload right now or some tasks just won't finish, thus blocking the pool.");
            return this.debug(`Queueing task #${i2.id}...`), this.taskQueue.push(i2), this.eventSubject.next({ type: c.taskQueued, taskID: i2.id }), this.scheduleWork(), i2;
          }
          terminate(t2) {
            return h(this, void 0, void 0, (function* () {
              this.isClosing = true, t2 || (yield this.completed(true)), this.eventSubject.next({ type: c.terminated, remainingQueue: [...this.taskQueue] }), this.eventSubject.complete(), yield Promise.all(this.workers.map((t3) => h(this, void 0, void 0, (function* () {
                return f.a.terminate(yield t3.init);
              }))));
            }));
          }
        }
        function y(t2, e2) {
          return new p(t2, e2);
        }
        p.EventType = c, y.EventType = c;
        const g = y;
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return b;
        })), r.d(e, "b", (function() {
          return v;
        }));
        var n = r(12), i = r.n(n), o = r(26), s = r(201), a = r(13);
        const u = () => {
        }, c = (t2) => t2, l = (t2) => Promise.resolve().then(t2);
        function f(t2) {
          throw t2;
        }
        class h extends o.a {
          constructor(t2) {
            super((e2) => {
              const r2 = this, n2 = Object.assign(Object.assign({}, e2), { complete() {
                e2.complete(), r2.onCompletion();
              }, error(t3) {
                e2.error(t3), r2.onError(t3);
              }, next(t3) {
                e2.next(t3), r2.onNext(t3);
              } });
              try {
                return this.initHasRun = true, t2(n2);
              } catch (t3) {
                n2.error(t3);
              }
            }), this.initHasRun = false, this.fulfillmentCallbacks = [], this.rejectionCallbacks = [], this.firstValueSet = false, this.state = "pending";
          }
          onNext(t2) {
            this.firstValueSet || (this.firstValue = t2, this.firstValueSet = true);
          }
          onError(t2) {
            this.state = "rejected", this.rejection = t2;
            for (const e2 of this.rejectionCallbacks) l(() => e2(t2));
          }
          onCompletion() {
            this.state = "fulfilled";
            for (const t2 of this.fulfillmentCallbacks) l(() => t2(this.firstValue));
          }
          then(t2, e2) {
            const r2 = t2 || c, n2 = e2 || f;
            let i2 = false;
            return new Promise((t3, e3) => {
              const o2 = (r3) => {
                if (!i2) {
                  i2 = true;
                  try {
                    t3(n2(r3));
                  } catch (t4) {
                    e3(t4);
                  }
                }
              };
              return this.initHasRun || this.subscribe({ error: o2 }), "fulfilled" === this.state ? t3(r2(this.firstValue)) : "rejected" === this.state ? (i2 = true, t3(n2(this.rejection))) : (this.fulfillmentCallbacks.push((e4) => {
                try {
                  t3(r2(e4));
                } catch (t4) {
                  o2(t4);
                }
              }), void this.rejectionCallbacks.push(o2));
            });
          }
          catch(t2) {
            return this.then(void 0, t2);
          }
          finally(t2) {
            const e2 = t2 || u;
            return this.then((t3) => (e2(), t3), () => e2());
          }
          static from(t2) {
            return (function(t3) {
              return t3 && "function" == typeof t3.then;
            })(t2) ? new h((e2) => {
              t2.then((t3) => {
                e2.next(t3), e2.complete();
              }, (t3) => {
                e2.error(t3);
              });
            }) : super.from(t2);
          }
        }
        var d = r(105), p = r(20);
        const y = i()("threads:master:messages");
        let g = 1;
        function m(t2, e2) {
          return new o.a((r2) => {
            let n2;
            const i2 = (o2) => {
              var s2;
              if (y("Message from worker:", o2.data), o2.data && o2.data.uid === e2) {
                if ((s2 = o2.data) && s2.type === p.b.running) n2 = o2.data.resultType;
                else if (((t3) => t3 && t3.type === p.b.result)(o2.data)) "promise" === n2 ? (void 0 !== o2.data.payload && r2.next(Object(a.a)(o2.data.payload)), r2.complete(), t2.removeEventListener("message", i2)) : (o2.data.payload && r2.next(Object(a.a)(o2.data.payload)), o2.data.complete && (r2.complete(), t2.removeEventListener("message", i2)));
                else if (((t3) => t3 && t3.type === p.b.error)(o2.data)) {
                  const e3 = Object(a.a)(o2.data.error);
                  r2.error(e3), t2.removeEventListener("message", i2);
                }
              }
            };
            return t2.addEventListener("message", i2), () => {
              if ("observable" === n2 || !n2) {
                const r3 = { type: p.a.cancel, uid: e2 };
                t2.postMessage(r3);
              }
              t2.removeEventListener("message", i2);
            };
          });
        }
        function b(t2, e2) {
          return (...r2) => {
            const n2 = g++, { args: i2, transferables: o2 } = (function(t3) {
              if (0 === t3.length) return { args: [], transferables: [] };
              const e3 = [], r3 = [];
              for (const n4 of t3) Object(d.a)(n4) ? (e3.push(Object(a.b)(n4.send)), r3.push(...n4.transferables)) : e3.push(Object(a.b)(n4));
              return { args: e3, transferables: 0 === r3.length ? r3 : (n3 = r3, Array.from(new Set(n3))) };
              var n3;
            })(r2), u2 = { type: p.a.run, uid: n2, method: e2, args: i2 };
            y("Sending command to run function to worker:", u2);
            try {
              t2.postMessage(u2, o2);
            } catch (t3) {
              return h.from(Promise.reject(t3));
            }
            return h.from(Object(s.a)(m(t2, n2)));
          };
        }
        function v(t2, e2) {
          const r2 = {};
          for (const n2 of e2) r2[n2] = b(t2, n2);
          return r2;
        }
      }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t2) {
          return "[object Array]" == r.call(t2);
        };
      }, function(t, e, r) {
        (function(e2, n) {
          var i = r(28);
          t.exports = v;
          var o, s = r(60);
          v.ReadableState = b;
          r(62).EventEmitter;
          var a = function(t2, e3) {
            return t2.listeners(e3).length;
          }, u = r(63), c = r(43).Buffer, l = (void 0 !== e2 ? e2 : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {
          };
          var f = Object.create(r(21));
          f.inherits = r(10);
          var h = r(115), d = void 0;
          d = h && h.debuglog ? h.debuglog("stream") : function() {
          };
          var p, y = r(116), g = r(64);
          f.inherits(v, u);
          var m = ["error", "close", "destroy", "pause", "resume"];
          function b(t2, e3) {
            t2 = t2 || {};
            var n2 = e3 instanceof (o = o || r(14));
            this.objectMode = !!t2.objectMode, n2 && (this.objectMode = this.objectMode || !!t2.readableObjectMode);
            var i2 = t2.highWaterMark, s2 = t2.readableHighWaterMark, a2 = this.objectMode ? 16 : 16384;
            this.highWaterMark = i2 || 0 === i2 ? i2 : n2 && (s2 || 0 === s2) ? s2 : a2, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new y(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.destroyed = false, this.defaultEncoding = t2.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, t2.encoding && (p || (p = r(66).StringDecoder), this.decoder = new p(t2.encoding), this.encoding = t2.encoding);
          }
          function v(t2) {
            if (o = o || r(14), !(this instanceof v)) return new v(t2);
            this._readableState = new b(t2, this), this.readable = true, t2 && ("function" == typeof t2.read && (this._read = t2.read), "function" == typeof t2.destroy && (this._destroy = t2.destroy)), u.call(this);
          }
          function w(t2, e3, r2, n2, i2) {
            var o2, s2 = t2._readableState;
            null === e3 ? (s2.reading = false, (function(t3, e4) {
              if (e4.ended) return;
              if (e4.decoder) {
                var r3 = e4.decoder.end();
                r3 && r3.length && (e4.buffer.push(r3), e4.length += e4.objectMode ? 1 : r3.length);
              }
              e4.ended = true, S(t3);
            })(t2, s2)) : (i2 || (o2 = (function(t3, e4) {
              var r3;
              n3 = e4, c.isBuffer(n3) || n3 instanceof l || "string" == typeof e4 || void 0 === e4 || t3.objectMode || (r3 = new TypeError("Invalid non-string/buffer chunk"));
              var n3;
              return r3;
            })(s2, e3)), o2 ? t2.emit("error", o2) : s2.objectMode || e3 && e3.length > 0 ? ("string" == typeof e3 || s2.objectMode || Object.getPrototypeOf(e3) === c.prototype || (e3 = (function(t3) {
              return c.from(t3);
            })(e3)), n2 ? s2.endEmitted ? t2.emit("error", new Error("stream.unshift() after end event")) : x(t2, s2, e3, true) : s2.ended ? t2.emit("error", new Error("stream.push() after EOF")) : (s2.reading = false, s2.decoder && !r2 ? (e3 = s2.decoder.write(e3), s2.objectMode || 0 !== e3.length ? x(t2, s2, e3, false) : E(t2, s2)) : x(t2, s2, e3, false))) : n2 || (s2.reading = false));
            return (function(t3) {
              return !t3.ended && (t3.needReadable || t3.length < t3.highWaterMark || 0 === t3.length);
            })(s2);
          }
          function x(t2, e3, r2, n2) {
            e3.flowing && 0 === e3.length && !e3.sync ? (t2.emit("data", r2), t2.read(0)) : (e3.length += e3.objectMode ? 1 : r2.length, n2 ? e3.buffer.unshift(r2) : e3.buffer.push(r2), e3.needReadable && S(t2)), E(t2, e3);
          }
          Object.defineProperty(v.prototype, "destroyed", { get: function() {
            return void 0 !== this._readableState && this._readableState.destroyed;
          }, set: function(t2) {
            this._readableState && (this._readableState.destroyed = t2);
          } }), v.prototype.destroy = g.destroy, v.prototype._undestroy = g.undestroy, v.prototype._destroy = function(t2, e3) {
            this.push(null), e3(t2);
          }, v.prototype.push = function(t2, e3) {
            var r2, n2 = this._readableState;
            return n2.objectMode ? r2 = true : "string" == typeof t2 && ((e3 = e3 || n2.defaultEncoding) !== n2.encoding && (t2 = c.from(t2, e3), e3 = ""), r2 = true), w(this, t2, e3, false, r2);
          }, v.prototype.unshift = function(t2) {
            return w(this, t2, null, true, false);
          }, v.prototype.isPaused = function() {
            return false === this._readableState.flowing;
          }, v.prototype.setEncoding = function(t2) {
            return p || (p = r(66).StringDecoder), this._readableState.decoder = new p(t2), this._readableState.encoding = t2, this;
          };
          function _(t2, e3) {
            return t2 <= 0 || 0 === e3.length && e3.ended ? 0 : e3.objectMode ? 1 : t2 != t2 ? e3.flowing && e3.length ? e3.buffer.head.data.length : e3.length : (t2 > e3.highWaterMark && (e3.highWaterMark = (function(t3) {
              return t3 >= 8388608 ? t3 = 8388608 : (t3--, t3 |= t3 >>> 1, t3 |= t3 >>> 2, t3 |= t3 >>> 4, t3 |= t3 >>> 8, t3 |= t3 >>> 16, t3++), t3;
            })(t2)), t2 <= e3.length ? t2 : e3.ended ? e3.length : (e3.needReadable = true, 0));
          }
          function S(t2) {
            var e3 = t2._readableState;
            e3.needReadable = false, e3.emittedReadable || (d("emitReadable", e3.flowing), e3.emittedReadable = true, e3.sync ? i.nextTick(A, t2) : A(t2));
          }
          function A(t2) {
            d("emit readable"), t2.emit("readable"), C(t2);
          }
          function E(t2, e3) {
            e3.readingMore || (e3.readingMore = true, i.nextTick(k, t2, e3));
          }
          function k(t2, e3) {
            for (var r2 = e3.length; !e3.reading && !e3.flowing && !e3.ended && e3.length < e3.highWaterMark && (d("maybeReadMore read 0"), t2.read(0), r2 !== e3.length); ) r2 = e3.length;
            e3.readingMore = false;
          }
          function T(t2) {
            d("readable nexttick read 0"), t2.read(0);
          }
          function O(t2, e3) {
            e3.reading || (d("resume read 0"), t2.read(0)), e3.resumeScheduled = false, e3.awaitDrain = 0, t2.emit("resume"), C(t2), e3.flowing && !e3.reading && t2.read(0);
          }
          function C(t2) {
            var e3 = t2._readableState;
            for (d("flow", e3.flowing); e3.flowing && null !== t2.read(); ) ;
          }
          function P(t2, e3) {
            return 0 === e3.length ? null : (e3.objectMode ? r2 = e3.buffer.shift() : !t2 || t2 >= e3.length ? (r2 = e3.decoder ? e3.buffer.join("") : 1 === e3.buffer.length ? e3.buffer.head.data : e3.buffer.concat(e3.length), e3.buffer.clear()) : r2 = (function(t3, e4, r3) {
              var n2;
              t3 < e4.head.data.length ? (n2 = e4.head.data.slice(0, t3), e4.head.data = e4.head.data.slice(t3)) : n2 = t3 === e4.head.data.length ? e4.shift() : r3 ? (function(t4, e5) {
                var r4 = e5.head, n3 = 1, i2 = r4.data;
                t4 -= i2.length;
                for (; r4 = r4.next; ) {
                  var o2 = r4.data, s2 = t4 > o2.length ? o2.length : t4;
                  if (s2 === o2.length ? i2 += o2 : i2 += o2.slice(0, t4), 0 === (t4 -= s2)) {
                    s2 === o2.length ? (++n3, r4.next ? e5.head = r4.next : e5.head = e5.tail = null) : (e5.head = r4, r4.data = o2.slice(s2));
                    break;
                  }
                  ++n3;
                }
                return e5.length -= n3, i2;
              })(t3, e4) : (function(t4, e5) {
                var r4 = c.allocUnsafe(t4), n3 = e5.head, i2 = 1;
                n3.data.copy(r4), t4 -= n3.data.length;
                for (; n3 = n3.next; ) {
                  var o2 = n3.data, s2 = t4 > o2.length ? o2.length : t4;
                  if (o2.copy(r4, r4.length - t4, 0, s2), 0 === (t4 -= s2)) {
                    s2 === o2.length ? (++i2, n3.next ? e5.head = n3.next : e5.head = e5.tail = null) : (e5.head = n3, n3.data = o2.slice(s2));
                    break;
                  }
                  ++i2;
                }
                return e5.length -= i2, r4;
              })(t3, e4);
              return n2;
            })(t2, e3.buffer, e3.decoder), r2);
            var r2;
          }
          function I(t2) {
            var e3 = t2._readableState;
            if (e3.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            e3.endEmitted || (e3.ended = true, i.nextTick(R, e3, t2));
          }
          function R(t2, e3) {
            t2.endEmitted || 0 !== t2.length || (t2.endEmitted = true, e3.readable = false, e3.emit("end"));
          }
          function j(t2, e3) {
            for (var r2 = 0, n2 = t2.length; r2 < n2; r2++) if (t2[r2] === e3) return r2;
            return -1;
          }
          v.prototype.read = function(t2) {
            d("read", t2), t2 = parseInt(t2, 10);
            var e3 = this._readableState, r2 = t2;
            if (0 !== t2 && (e3.emittedReadable = false), 0 === t2 && e3.needReadable && (e3.length >= e3.highWaterMark || e3.ended)) return d("read: emitReadable", e3.length, e3.ended), 0 === e3.length && e3.ended ? I(this) : S(this), null;
            if (0 === (t2 = _(t2, e3)) && e3.ended) return 0 === e3.length && I(this), null;
            var n2, i2 = e3.needReadable;
            return d("need readable", i2), (0 === e3.length || e3.length - t2 < e3.highWaterMark) && d("length less than watermark", i2 = true), e3.ended || e3.reading ? d("reading or ended", i2 = false) : i2 && (d("do read"), e3.reading = true, e3.sync = true, 0 === e3.length && (e3.needReadable = true), this._read(e3.highWaterMark), e3.sync = false, e3.reading || (t2 = _(r2, e3))), null === (n2 = t2 > 0 ? P(t2, e3) : null) ? (e3.needReadable = true, t2 = 0) : e3.length -= t2, 0 === e3.length && (e3.ended || (e3.needReadable = true), r2 !== t2 && e3.ended && I(this)), null !== n2 && this.emit("data", n2), n2;
          }, v.prototype._read = function(t2) {
            this.emit("error", new Error("_read() is not implemented"));
          }, v.prototype.pipe = function(t2, e3) {
            var r2 = this, o2 = this._readableState;
            switch (o2.pipesCount) {
              case 0:
                o2.pipes = t2;
                break;
              case 1:
                o2.pipes = [o2.pipes, t2];
                break;
              default:
                o2.pipes.push(t2);
            }
            o2.pipesCount += 1, d("pipe count=%d opts=%j", o2.pipesCount, e3);
            var u2 = (!e3 || false !== e3.end) && t2 !== n.stdout && t2 !== n.stderr ? l2 : v2;
            function c2(e4, n2) {
              d("onunpipe"), e4 === r2 && n2 && false === n2.hasUnpiped && (n2.hasUnpiped = true, d("cleanup"), t2.removeListener("close", m2), t2.removeListener("finish", b2), t2.removeListener("drain", f2), t2.removeListener("error", g2), t2.removeListener("unpipe", c2), r2.removeListener("end", l2), r2.removeListener("end", v2), r2.removeListener("data", y2), h2 = true, !o2.awaitDrain || t2._writableState && !t2._writableState.needDrain || f2());
            }
            function l2() {
              d("onend"), t2.end();
            }
            o2.endEmitted ? i.nextTick(u2) : r2.once("end", u2), t2.on("unpipe", c2);
            var f2 = /* @__PURE__ */ (function(t3) {
              return function() {
                var e4 = t3._readableState;
                d("pipeOnDrain", e4.awaitDrain), e4.awaitDrain && e4.awaitDrain--, 0 === e4.awaitDrain && a(t3, "data") && (e4.flowing = true, C(t3));
              };
            })(r2);
            t2.on("drain", f2);
            var h2 = false;
            var p2 = false;
            function y2(e4) {
              d("ondata"), p2 = false, false !== t2.write(e4) || p2 || ((1 === o2.pipesCount && o2.pipes === t2 || o2.pipesCount > 1 && -1 !== j(o2.pipes, t2)) && !h2 && (d("false write response, pause", o2.awaitDrain), o2.awaitDrain++, p2 = true), r2.pause());
            }
            function g2(e4) {
              d("onerror", e4), v2(), t2.removeListener("error", g2), 0 === a(t2, "error") && t2.emit("error", e4);
            }
            function m2() {
              t2.removeListener("finish", b2), v2();
            }
            function b2() {
              d("onfinish"), t2.removeListener("close", m2), v2();
            }
            function v2() {
              d("unpipe"), r2.unpipe(t2);
            }
            return r2.on("data", y2), (function(t3, e4, r3) {
              if ("function" == typeof t3.prependListener) return t3.prependListener(e4, r3);
              t3._events && t3._events[e4] ? s(t3._events[e4]) ? t3._events[e4].unshift(r3) : t3._events[e4] = [r3, t3._events[e4]] : t3.on(e4, r3);
            })(t2, "error", g2), t2.once("close", m2), t2.once("finish", b2), t2.emit("pipe", r2), o2.flowing || (d("pipe resume"), r2.resume()), t2;
          }, v.prototype.unpipe = function(t2) {
            var e3 = this._readableState, r2 = { hasUnpiped: false };
            if (0 === e3.pipesCount) return this;
            if (1 === e3.pipesCount) return t2 && t2 !== e3.pipes || (t2 || (t2 = e3.pipes), e3.pipes = null, e3.pipesCount = 0, e3.flowing = false, t2 && t2.emit("unpipe", this, r2)), this;
            if (!t2) {
              var n2 = e3.pipes, i2 = e3.pipesCount;
              e3.pipes = null, e3.pipesCount = 0, e3.flowing = false;
              for (var o2 = 0; o2 < i2; o2++) n2[o2].emit("unpipe", this, { hasUnpiped: false });
              return this;
            }
            var s2 = j(e3.pipes, t2);
            return -1 === s2 || (e3.pipes.splice(s2, 1), e3.pipesCount -= 1, 1 === e3.pipesCount && (e3.pipes = e3.pipes[0]), t2.emit("unpipe", this, r2)), this;
          }, v.prototype.on = function(t2, e3) {
            var r2 = u.prototype.on.call(this, t2, e3);
            if ("data" === t2) false !== this._readableState.flowing && this.resume();
            else if ("readable" === t2) {
              var n2 = this._readableState;
              n2.endEmitted || n2.readableListening || (n2.readableListening = n2.needReadable = true, n2.emittedReadable = false, n2.reading ? n2.length && S(this) : i.nextTick(T, this));
            }
            return r2;
          }, v.prototype.addListener = v.prototype.on, v.prototype.resume = function() {
            var t2 = this._readableState;
            return t2.flowing || (d("resume"), t2.flowing = true, (function(t3, e3) {
              e3.resumeScheduled || (e3.resumeScheduled = true, i.nextTick(O, t3, e3));
            })(this, t2)), this;
          }, v.prototype.pause = function() {
            return d("call pause flowing=%j", this._readableState.flowing), false !== this._readableState.flowing && (d("pause"), this._readableState.flowing = false, this.emit("pause")), this;
          }, v.prototype.wrap = function(t2) {
            var e3 = this, r2 = this._readableState, n2 = false;
            for (var i2 in t2.on("end", (function() {
              if (d("wrapped end"), r2.decoder && !r2.ended) {
                var t3 = r2.decoder.end();
                t3 && t3.length && e3.push(t3);
              }
              e3.push(null);
            })), t2.on("data", (function(i3) {
              (d("wrapped data"), r2.decoder && (i3 = r2.decoder.write(i3)), r2.objectMode && null == i3) || (r2.objectMode || i3 && i3.length) && (e3.push(i3) || (n2 = true, t2.pause()));
            })), t2) void 0 === this[i2] && "function" == typeof t2[i2] && (this[i2] = /* @__PURE__ */ (function(e4) {
              return function() {
                return t2[e4].apply(t2, arguments);
              };
            })(i2));
            for (var o2 = 0; o2 < m.length; o2++) t2.on(m[o2], this.emit.bind(this, m[o2]));
            return this._read = function(e4) {
              d("wrapped _read", e4), n2 && (n2 = false, t2.resume());
            }, this;
          }, Object.defineProperty(v.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
            return this._readableState.highWaterMark;
          } }), v._fromList = P;
        }).call(this, r(3), r(8));
      }, function(t, e, r) {
        var n, i = "object" == typeof Reflect ? Reflect : null, o = i && "function" == typeof i.apply ? i.apply : function(t2, e2, r2) {
          return Function.prototype.apply.call(t2, e2, r2);
        };
        n = i && "function" == typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function(t2) {
          return Object.getOwnPropertyNames(t2).concat(Object.getOwnPropertySymbols(t2));
        } : function(t2) {
          return Object.getOwnPropertyNames(t2);
        };
        var s = Number.isNaN || function(t2) {
          return t2 != t2;
        };
        function a() {
          a.init.call(this);
        }
        t.exports = a, t.exports.once = function(t2, e2) {
          return new Promise((function(r2, n2) {
            function i2(r3) {
              t2.removeListener(e2, o2), n2(r3);
            }
            function o2() {
              "function" == typeof t2.removeListener && t2.removeListener("error", i2), r2([].slice.call(arguments));
            }
            m(t2, e2, o2, { once: true }), "error" !== e2 && (function(t3, e3, r3) {
              "function" == typeof t3.on && m(t3, "error", e3, r3);
            })(t2, i2, { once: true });
          }));
        }, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
        var u = 10;
        function c(t2) {
          if ("function" != typeof t2) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t2);
        }
        function l(t2) {
          return void 0 === t2._maxListeners ? a.defaultMaxListeners : t2._maxListeners;
        }
        function f(t2, e2, r2, n2) {
          var i2, o2, s2, a2;
          if (c(r2), void 0 === (o2 = t2._events) ? (o2 = t2._events = /* @__PURE__ */ Object.create(null), t2._eventsCount = 0) : (void 0 !== o2.newListener && (t2.emit("newListener", e2, r2.listener ? r2.listener : r2), o2 = t2._events), s2 = o2[e2]), void 0 === s2) s2 = o2[e2] = r2, ++t2._eventsCount;
          else if ("function" == typeof s2 ? s2 = o2[e2] = n2 ? [r2, s2] : [s2, r2] : n2 ? s2.unshift(r2) : s2.push(r2), (i2 = l(t2)) > 0 && s2.length > i2 && !s2.warned) {
            s2.warned = true;
            var u2 = new Error("Possible EventEmitter memory leak detected. " + s2.length + " " + String(e2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            u2.name = "MaxListenersExceededWarning", u2.emitter = t2, u2.type = e2, u2.count = s2.length, a2 = u2, console && console.warn && console.warn(a2);
          }
          return t2;
        }
        function h() {
          if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function d(t2, e2, r2) {
          var n2 = { fired: false, wrapFn: void 0, target: t2, type: e2, listener: r2 }, i2 = h.bind(n2);
          return i2.listener = r2, n2.wrapFn = i2, i2;
        }
        function p(t2, e2, r2) {
          var n2 = t2._events;
          if (void 0 === n2) return [];
          var i2 = n2[e2];
          return void 0 === i2 ? [] : "function" == typeof i2 ? r2 ? [i2.listener || i2] : [i2] : r2 ? (function(t3) {
            for (var e3 = new Array(t3.length), r3 = 0; r3 < e3.length; ++r3) e3[r3] = t3[r3].listener || t3[r3];
            return e3;
          })(i2) : g(i2, i2.length);
        }
        function y(t2) {
          var e2 = this._events;
          if (void 0 !== e2) {
            var r2 = e2[t2];
            if ("function" == typeof r2) return 1;
            if (void 0 !== r2) return r2.length;
          }
          return 0;
        }
        function g(t2, e2) {
          for (var r2 = new Array(e2), n2 = 0; n2 < e2; ++n2) r2[n2] = t2[n2];
          return r2;
        }
        function m(t2, e2, r2, n2) {
          if ("function" == typeof t2.on) n2.once ? t2.once(e2, r2) : t2.on(e2, r2);
          else {
            if ("function" != typeof t2.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t2);
            t2.addEventListener(e2, (function i2(o2) {
              n2.once && t2.removeEventListener(e2, i2), r2(o2);
            }));
          }
        }
        Object.defineProperty(a, "defaultMaxListeners", { enumerable: true, get: function() {
          return u;
        }, set: function(t2) {
          if ("number" != typeof t2 || t2 < 0 || s(t2)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t2 + ".");
          u = t2;
        } }), a.init = function() {
          void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        }, a.prototype.setMaxListeners = function(t2) {
          if ("number" != typeof t2 || t2 < 0 || s(t2)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t2 + ".");
          return this._maxListeners = t2, this;
        }, a.prototype.getMaxListeners = function() {
          return l(this);
        }, a.prototype.emit = function(t2) {
          for (var e2 = [], r2 = 1; r2 < arguments.length; r2++) e2.push(arguments[r2]);
          var n2 = "error" === t2, i2 = this._events;
          if (void 0 !== i2) n2 = n2 && void 0 === i2.error;
          else if (!n2) return false;
          if (n2) {
            var s2;
            if (e2.length > 0 && (s2 = e2[0]), s2 instanceof Error) throw s2;
            var a2 = new Error("Unhandled error." + (s2 ? " (" + s2.message + ")" : ""));
            throw a2.context = s2, a2;
          }
          var u2 = i2[t2];
          if (void 0 === u2) return false;
          if ("function" == typeof u2) o(u2, this, e2);
          else {
            var c2 = u2.length, l2 = g(u2, c2);
            for (r2 = 0; r2 < c2; ++r2) o(l2[r2], this, e2);
          }
          return true;
        }, a.prototype.addListener = function(t2, e2) {
          return f(this, t2, e2, false);
        }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(t2, e2) {
          return f(this, t2, e2, true);
        }, a.prototype.once = function(t2, e2) {
          return c(e2), this.on(t2, d(this, t2, e2)), this;
        }, a.prototype.prependOnceListener = function(t2, e2) {
          return c(e2), this.prependListener(t2, d(this, t2, e2)), this;
        }, a.prototype.removeListener = function(t2, e2) {
          var r2, n2, i2, o2, s2;
          if (c(e2), void 0 === (n2 = this._events)) return this;
          if (void 0 === (r2 = n2[t2])) return this;
          if (r2 === e2 || r2.listener === e2) 0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete n2[t2], n2.removeListener && this.emit("removeListener", t2, r2.listener || e2));
          else if ("function" != typeof r2) {
            for (i2 = -1, o2 = r2.length - 1; o2 >= 0; o2--) if (r2[o2] === e2 || r2[o2].listener === e2) {
              s2 = r2[o2].listener, i2 = o2;
              break;
            }
            if (i2 < 0) return this;
            0 === i2 ? r2.shift() : (function(t3, e3) {
              for (; e3 + 1 < t3.length; e3++) t3[e3] = t3[e3 + 1];
              t3.pop();
            })(r2, i2), 1 === r2.length && (n2[t2] = r2[0]), void 0 !== n2.removeListener && this.emit("removeListener", t2, s2 || e2);
          }
          return this;
        }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(t2) {
          var e2, r2, n2;
          if (void 0 === (r2 = this._events)) return this;
          if (void 0 === r2.removeListener) return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== r2[t2] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete r2[t2]), this;
          if (0 === arguments.length) {
            var i2, o2 = Object.keys(r2);
            for (n2 = 0; n2 < o2.length; ++n2) "removeListener" !== (i2 = o2[n2]) && this.removeAllListeners(i2);
            return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
          }
          if ("function" == typeof (e2 = r2[t2])) this.removeListener(t2, e2);
          else if (void 0 !== e2) for (n2 = e2.length - 1; n2 >= 0; n2--) this.removeListener(t2, e2[n2]);
          return this;
        }, a.prototype.listeners = function(t2) {
          return p(this, t2, true);
        }, a.prototype.rawListeners = function(t2) {
          return p(this, t2, false);
        }, a.listenerCount = function(t2, e2) {
          return "function" == typeof t2.listenerCount ? t2.listenerCount(e2) : y.call(t2, e2);
        }, a.prototype.listenerCount = y, a.prototype.eventNames = function() {
          return this._eventsCount > 0 ? n(this._events) : [];
        };
      }, function(t, e, r) {
        t.exports = r(62).EventEmitter;
      }, function(t, e, r) {
        var n = r(28);
        function i(t2, e2) {
          t2.emit("error", e2);
        }
        t.exports = { destroy: function(t2, e2) {
          var r2 = this, o = this._readableState && this._readableState.destroyed, s = this._writableState && this._writableState.destroyed;
          return o || s ? (e2 ? e2(t2) : t2 && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = true, n.nextTick(i, this, t2)) : n.nextTick(i, this, t2)), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(t2 || null, (function(t3) {
            !e2 && t3 ? r2._writableState ? r2._writableState.errorEmitted || (r2._writableState.errorEmitted = true, n.nextTick(i, r2, t3)) : n.nextTick(i, r2, t3) : e2 && e2(t3);
          })), this);
        }, undestroy: function() {
          this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finalCalled = false, this._writableState.prefinished = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
        } };
      }, function(t, e, r) {
        (function(e2, n, i) {
          var o = r(28);
          function s(t2) {
            var e3 = this;
            this.next = null, this.entry = null, this.finish = function() {
              !(function(t3, e4, r2) {
                var n2 = t3.entry;
                t3.entry = null;
                for (; n2; ) {
                  var i2 = n2.callback;
                  e4.pendingcb--, i2(r2), n2 = n2.next;
                }
                e4.corkedRequestsFree.next = t3;
              })(e3, t2);
            };
          }
          t.exports = b;
          var a, u = !e2.browser && ["v0.10", "v0.9."].indexOf(e2.version.slice(0, 5)) > -1 ? n : o.nextTick;
          b.WritableState = m;
          var c = Object.create(r(21));
          c.inherits = r(10);
          var l = { deprecate: r(120) }, f = r(63), h = r(43).Buffer, d = (void 0 !== i ? i : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).Uint8Array || function() {
          };
          var p, y = r(64);
          function g() {
          }
          function m(t2, e3) {
            a = a || r(14), t2 = t2 || {};
            var n2 = e3 instanceof a;
            this.objectMode = !!t2.objectMode, n2 && (this.objectMode = this.objectMode || !!t2.writableObjectMode);
            var i2 = t2.highWaterMark, c2 = t2.writableHighWaterMark, l2 = this.objectMode ? 16 : 16384;
            this.highWaterMark = i2 || 0 === i2 ? i2 : n2 && (c2 || 0 === c2) ? c2 : l2, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
            var f2 = false === t2.decodeStrings;
            this.decodeStrings = !f2, this.defaultEncoding = t2.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(t3) {
              !(function(t4, e4) {
                var r2 = t4._writableState, n3 = r2.sync, i3 = r2.writecb;
                if ((function(t5) {
                  t5.writing = false, t5.writecb = null, t5.length -= t5.writelen, t5.writelen = 0;
                })(r2), e4) !(function(t5, e5, r3, n4, i4) {
                  --e5.pendingcb, r3 ? (o.nextTick(i4, n4), o.nextTick(A, t5, e5), t5._writableState.errorEmitted = true, t5.emit("error", n4)) : (i4(n4), t5._writableState.errorEmitted = true, t5.emit("error", n4), A(t5, e5));
                })(t4, r2, n3, e4, i3);
                else {
                  var s2 = _(r2);
                  s2 || r2.corked || r2.bufferProcessing || !r2.bufferedRequest || x(t4, r2), n3 ? u(w, t4, r2, s2, i3) : w(t4, r2, s2, i3);
                }
              })(e3, t3);
            }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s(this);
          }
          function b(t2) {
            if (a = a || r(14), !(p.call(b, this) || this instanceof a)) return new b(t2);
            this._writableState = new m(t2, this), this.writable = true, t2 && ("function" == typeof t2.write && (this._write = t2.write), "function" == typeof t2.writev && (this._writev = t2.writev), "function" == typeof t2.destroy && (this._destroy = t2.destroy), "function" == typeof t2.final && (this._final = t2.final)), f.call(this);
          }
          function v(t2, e3, r2, n2, i2, o2, s2) {
            e3.writelen = n2, e3.writecb = s2, e3.writing = true, e3.sync = true, r2 ? t2._writev(i2, e3.onwrite) : t2._write(i2, o2, e3.onwrite), e3.sync = false;
          }
          function w(t2, e3, r2, n2) {
            r2 || (function(t3, e4) {
              0 === e4.length && e4.needDrain && (e4.needDrain = false, t3.emit("drain"));
            })(t2, e3), e3.pendingcb--, n2(), A(t2, e3);
          }
          function x(t2, e3) {
            e3.bufferProcessing = true;
            var r2 = e3.bufferedRequest;
            if (t2._writev && r2 && r2.next) {
              var n2 = e3.bufferedRequestCount, i2 = new Array(n2), o2 = e3.corkedRequestsFree;
              o2.entry = r2;
              for (var a2 = 0, u2 = true; r2; ) i2[a2] = r2, r2.isBuf || (u2 = false), r2 = r2.next, a2 += 1;
              i2.allBuffers = u2, v(t2, e3, true, e3.length, i2, "", o2.finish), e3.pendingcb++, e3.lastBufferedRequest = null, o2.next ? (e3.corkedRequestsFree = o2.next, o2.next = null) : e3.corkedRequestsFree = new s(e3), e3.bufferedRequestCount = 0;
            } else {
              for (; r2; ) {
                var c2 = r2.chunk, l2 = r2.encoding, f2 = r2.callback;
                if (v(t2, e3, false, e3.objectMode ? 1 : c2.length, c2, l2, f2), r2 = r2.next, e3.bufferedRequestCount--, e3.writing) break;
              }
              null === r2 && (e3.lastBufferedRequest = null);
            }
            e3.bufferedRequest = r2, e3.bufferProcessing = false;
          }
          function _(t2) {
            return t2.ending && 0 === t2.length && null === t2.bufferedRequest && !t2.finished && !t2.writing;
          }
          function S(t2, e3) {
            t2._final((function(r2) {
              e3.pendingcb--, r2 && t2.emit("error", r2), e3.prefinished = true, t2.emit("prefinish"), A(t2, e3);
            }));
          }
          function A(t2, e3) {
            var r2 = _(e3);
            return r2 && (!(function(t3, e4) {
              e4.prefinished || e4.finalCalled || ("function" == typeof t3._final ? (e4.pendingcb++, e4.finalCalled = true, o.nextTick(S, t3, e4)) : (e4.prefinished = true, t3.emit("prefinish")));
            })(t2, e3), 0 === e3.pendingcb && (e3.finished = true, t2.emit("finish"))), r2;
          }
          c.inherits(b, f), m.prototype.getBuffer = function() {
            for (var t2 = this.bufferedRequest, e3 = []; t2; ) e3.push(t2), t2 = t2.next;
            return e3;
          }, (function() {
            try {
              Object.defineProperty(m.prototype, "buffer", { get: l.deprecate((function() {
                return this.getBuffer();
              }), "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
            } catch (t2) {
            }
          })(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance], Object.defineProperty(b, Symbol.hasInstance, { value: function(t2) {
            return !!p.call(this, t2) || this === b && (t2 && t2._writableState instanceof m);
          } })) : p = function(t2) {
            return t2 instanceof this;
          }, b.prototype.pipe = function() {
            this.emit("error", new Error("Cannot pipe, not readable"));
          }, b.prototype.write = function(t2, e3, r2) {
            var n2, i2 = this._writableState, s2 = false, a2 = !i2.objectMode && (n2 = t2, h.isBuffer(n2) || n2 instanceof d);
            return a2 && !h.isBuffer(t2) && (t2 = (function(t3) {
              return h.from(t3);
            })(t2)), "function" == typeof e3 && (r2 = e3, e3 = null), a2 ? e3 = "buffer" : e3 || (e3 = i2.defaultEncoding), "function" != typeof r2 && (r2 = g), i2.ended ? (function(t3, e4) {
              var r3 = new Error("write after end");
              t3.emit("error", r3), o.nextTick(e4, r3);
            })(this, r2) : (a2 || (function(t3, e4, r3, n3) {
              var i3 = true, s3 = false;
              return null === r3 ? s3 = new TypeError("May not write null values to stream") : "string" == typeof r3 || void 0 === r3 || e4.objectMode || (s3 = new TypeError("Invalid non-string/buffer chunk")), s3 && (t3.emit("error", s3), o.nextTick(n3, s3), i3 = false), i3;
            })(this, i2, t2, r2)) && (i2.pendingcb++, s2 = (function(t3, e4, r3, n3, i3, o2) {
              if (!r3) {
                var s3 = (function(t4, e5, r4) {
                  t4.objectMode || false === t4.decodeStrings || "string" != typeof e5 || (e5 = h.from(e5, r4));
                  return e5;
                })(e4, n3, i3);
                n3 !== s3 && (r3 = true, i3 = "buffer", n3 = s3);
              }
              var a3 = e4.objectMode ? 1 : n3.length;
              e4.length += a3;
              var u2 = e4.length < e4.highWaterMark;
              u2 || (e4.needDrain = true);
              if (e4.writing || e4.corked) {
                var c2 = e4.lastBufferedRequest;
                e4.lastBufferedRequest = { chunk: n3, encoding: i3, isBuf: r3, callback: o2, next: null }, c2 ? c2.next = e4.lastBufferedRequest : e4.bufferedRequest = e4.lastBufferedRequest, e4.bufferedRequestCount += 1;
              } else v(t3, e4, false, a3, n3, i3, o2);
              return u2;
            })(this, i2, a2, t2, e3, r2)), s2;
          }, b.prototype.cork = function() {
            this._writableState.corked++;
          }, b.prototype.uncork = function() {
            var t2 = this._writableState;
            t2.corked && (t2.corked--, t2.writing || t2.corked || t2.bufferProcessing || !t2.bufferedRequest || x(this, t2));
          }, b.prototype.setDefaultEncoding = function(t2) {
            if ("string" == typeof t2 && (t2 = t2.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t2 + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t2);
            return this._writableState.defaultEncoding = t2, this;
          }, Object.defineProperty(b.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
            return this._writableState.highWaterMark;
          } }), b.prototype._write = function(t2, e3, r2) {
            r2(new Error("_write() is not implemented"));
          }, b.prototype._writev = null, b.prototype.end = function(t2, e3, r2) {
            var n2 = this._writableState;
            "function" == typeof t2 ? (r2 = t2, t2 = null, e3 = null) : "function" == typeof e3 && (r2 = e3, e3 = null), null != t2 && this.write(t2, e3), n2.corked && (n2.corked = 1, this.uncork()), n2.ending || (function(t3, e4, r3) {
              e4.ending = true, A(t3, e4), r3 && (e4.finished ? o.nextTick(r3) : t3.once("finish", r3));
              e4.ended = true, t3.writable = false;
            })(this, n2, r2);
          }, Object.defineProperty(b.prototype, "destroyed", { get: function() {
            return void 0 !== this._writableState && this._writableState.destroyed;
          }, set: function(t2) {
            this._writableState && (this._writableState.destroyed = t2);
          } }), b.prototype.destroy = y.destroy, b.prototype._undestroy = y.undestroy, b.prototype._destroy = function(t2, e3) {
            this.end(), e3(t2);
          };
        }).call(this, r(8), r(118).setImmediate, r(3));
      }, function(t, e, r) {
        var n = r(121).Buffer, i = n.isEncoding || function(t2) {
          switch ((t2 = "" + t2) && t2.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
              return true;
            default:
              return false;
          }
        };
        function o(t2) {
          var e2;
          switch (this.encoding = (function(t3) {
            var e3 = (function(t4) {
              if (!t4) return "utf8";
              for (var e4; ; ) switch (t4) {
                case "utf8":
                case "utf-8":
                  return "utf8";
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return "utf16le";
                case "latin1":
                case "binary":
                  return "latin1";
                case "base64":
                case "ascii":
                case "hex":
                  return t4;
                default:
                  if (e4) return;
                  t4 = ("" + t4).toLowerCase(), e4 = true;
              }
            })(t3);
            if ("string" != typeof e3 && (n.isEncoding === i || !i(t3))) throw new Error("Unknown encoding: " + t3);
            return e3 || t3;
          })(t2), this.encoding) {
            case "utf16le":
              this.text = u, this.end = c, e2 = 4;
              break;
            case "utf8":
              this.fillLast = a, e2 = 4;
              break;
            case "base64":
              this.text = l, this.end = f, e2 = 3;
              break;
            default:
              return this.write = h, void (this.end = d);
          }
          this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(e2);
        }
        function s(t2) {
          return t2 <= 127 ? 0 : t2 >> 5 == 6 ? 2 : t2 >> 4 == 14 ? 3 : t2 >> 3 == 30 ? 4 : -1;
        }
        function a(t2) {
          var e2 = this.lastTotal - this.lastNeed, r2 = (function(t3, e3, r3) {
            if (128 != (192 & e3[0])) return t3.lastNeed = 0, "�".repeat(r3);
            if (t3.lastNeed > 1 && e3.length > 1) {
              if (128 != (192 & e3[1])) return t3.lastNeed = 1, "�".repeat(r3 + 1);
              if (t3.lastNeed > 2 && e3.length > 2 && 128 != (192 & e3[2])) return t3.lastNeed = 2, "�".repeat(r3 + 2);
            }
          })(this, t2, e2);
          return void 0 !== r2 ? r2 : this.lastNeed <= t2.length ? (t2.copy(this.lastChar, e2, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t2.copy(this.lastChar, e2, 0, t2.length), void (this.lastNeed -= t2.length));
        }
        function u(t2, e2) {
          if ((t2.length - e2) % 2 == 0) {
            var r2 = t2.toString("utf16le", e2);
            if (r2) {
              var n2 = r2.charCodeAt(r2.length - 1);
              if (n2 >= 55296 && n2 <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t2[t2.length - 2], this.lastChar[1] = t2[t2.length - 1], r2.slice(0, -1);
            }
            return r2;
          }
          return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t2[t2.length - 1], t2.toString("utf16le", e2, t2.length - 1);
        }
        function c(t2) {
          var e2 = t2 && t2.length ? this.write(t2) : "";
          if (this.lastNeed) {
            var r2 = this.lastTotal - this.lastNeed;
            return e2 + this.lastChar.toString("utf16le", 0, r2);
          }
          return e2;
        }
        function l(t2, e2) {
          var r2 = (t2.length - e2) % 3;
          return 0 === r2 ? t2.toString("base64", e2) : (this.lastNeed = 3 - r2, this.lastTotal = 3, 1 === r2 ? this.lastChar[0] = t2[t2.length - 1] : (this.lastChar[0] = t2[t2.length - 2], this.lastChar[1] = t2[t2.length - 1]), t2.toString("base64", e2, t2.length - r2));
        }
        function f(t2) {
          var e2 = t2 && t2.length ? this.write(t2) : "";
          return this.lastNeed ? e2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e2;
        }
        function h(t2) {
          return t2.toString(this.encoding);
        }
        function d(t2) {
          return t2 && t2.length ? this.write(t2) : "";
        }
        e.StringDecoder = o, o.prototype.write = function(t2) {
          if (0 === t2.length) return "";
          var e2, r2;
          if (this.lastNeed) {
            if (void 0 === (e2 = this.fillLast(t2))) return "";
            r2 = this.lastNeed, this.lastNeed = 0;
          } else r2 = 0;
          return r2 < t2.length ? e2 ? e2 + this.text(t2, r2) : this.text(t2, r2) : e2 || "";
        }, o.prototype.end = function(t2) {
          var e2 = t2 && t2.length ? this.write(t2) : "";
          return this.lastNeed ? e2 + "�".repeat(this.lastTotal - this.lastNeed) : e2;
        }, o.prototype.text = function(t2, e2) {
          var r2 = (function(t3, e3, r3) {
            var n3 = e3.length - 1;
            if (n3 < r3) return 0;
            var i2 = s(e3[n3]);
            if (i2 >= 0) return i2 > 0 && (t3.lastNeed = i2 - 1), i2;
            if (--n3 < r3) return 0;
            if ((i2 = s(e3[n3])) >= 0) return i2 > 0 && (t3.lastNeed = i2 - 2), i2;
            if (--n3 < r3) return 0;
            if ((i2 = s(e3[n3])) >= 0) return i2 > 0 && (2 === i2 ? i2 = 0 : t3.lastNeed = i2 - 3), i2;
            return 0;
          })(this, t2, e2);
          if (!this.lastNeed) return t2.toString("utf8", e2);
          this.lastTotal = r2;
          var n2 = t2.length - (r2 - this.lastNeed);
          return t2.copy(this.lastChar, 0, n2), t2.toString("utf8", e2, n2);
        }, o.prototype.fillLast = function(t2) {
          if (this.lastNeed <= t2.length) return t2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
          t2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t2.length), this.lastNeed -= t2.length;
        };
      }, function(t, e, r) {
        t.exports = s;
        var n = r(14), i = Object.create(r(21));
        function o(t2, e2) {
          var r2 = this._transformState;
          r2.transforming = false;
          var n2 = r2.writecb;
          if (!n2) return this.emit("error", new Error("write callback called multiple times"));
          r2.writechunk = null, r2.writecb = null, null != e2 && this.push(e2), n2(t2);
          var i2 = this._readableState;
          i2.reading = false, (i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
        }
        function s(t2) {
          if (!(this instanceof s)) return new s(t2);
          n.call(this, t2), this._transformState = { afterTransform: o.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, t2 && ("function" == typeof t2.transform && (this._transform = t2.transform), "function" == typeof t2.flush && (this._flush = t2.flush)), this.on("prefinish", a);
        }
        function a() {
          var t2 = this;
          "function" == typeof this._flush ? this._flush((function(e2, r2) {
            u(t2, e2, r2);
          })) : u(this, null, null);
        }
        function u(t2, e2, r2) {
          if (e2) return t2.emit("error", e2);
          if (null != r2 && t2.push(r2), t2._writableState.length) throw new Error("Calling transform done when ws.length != 0");
          if (t2._transformState.transforming) throw new Error("Calling transform done when still transforming");
          return t2.push(null);
        }
        i.inherits = r(10), i.inherits(s, n), s.prototype.push = function(t2, e2) {
          return this._transformState.needTransform = false, n.prototype.push.call(this, t2, e2);
        }, s.prototype._transform = function(t2, e2, r2) {
          throw new Error("_transform() is not implemented");
        }, s.prototype._write = function(t2, e2, r2) {
          var n2 = this._transformState;
          if (n2.writecb = r2, n2.writechunk = t2, n2.writeencoding = e2, !n2.transforming) {
            var i2 = this._readableState;
            (n2.needTransform || i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
          }
        }, s.prototype._read = function(t2) {
          var e2 = this._transformState;
          null !== e2.writechunk && e2.writecb && !e2.transforming ? (e2.transforming = true, this._transform(e2.writechunk, e2.writeencoding, e2.afterTransform)) : e2.needTransform = true;
        }, s.prototype._destroy = function(t2, e2) {
          var r2 = this;
          n.prototype._destroy.call(this, t2, (function(t3) {
            e2(t3), r2.emit("close");
          }));
        };
      }, function(t, e, r) {
        (function(t2) {
          var n = r(198), i = r(58), o = r(57);
          const s = "undefined" != typeof navigator ? navigator.hardwareConcurrency : null;
          e.a = class {
            constructor(e2 = s) {
              const r2 = new n.a(t2);
              this.pool = Object(i.a)(() => Object(o.a)(r2), e2);
            }
            async decode(t3, e2) {
              return new Promise((r2, n2) => {
                this.pool.queue(async (i2) => {
                  try {
                    const n3 = await i2(t3, e2);
                    r2(n3);
                  } catch (t4) {
                    n2(t4);
                  }
                });
              });
            }
            destroy() {
              this.pool.terminate(true);
            }
          };
        }).call(this, r(133));
      }, function(t, e, r) {
        (function(t2) {
          e.fetch = a(t2.fetch) && a(t2.ReadableStream), e.writableStream = a(t2.WritableStream), e.abortController = a(t2.AbortController), e.blobConstructor = false;
          try {
            new Blob([new ArrayBuffer(1)]), e.blobConstructor = true;
          } catch (t3) {
          }
          var r2;
          function n() {
            if (void 0 !== r2) return r2;
            if (t2.XMLHttpRequest) {
              r2 = new t2.XMLHttpRequest();
              try {
                r2.open("GET", t2.XDomainRequest ? "/" : "https://example.com");
              } catch (t3) {
                r2 = null;
              }
            } else r2 = null;
            return r2;
          }
          function i(t3) {
            var e2 = n();
            if (!e2) return false;
            try {
              return e2.responseType = t3, e2.responseType === t3;
            } catch (t4) {
            }
            return false;
          }
          var o = void 0 !== t2.ArrayBuffer, s = o && a(t2.ArrayBuffer.prototype.slice);
          function a(t3) {
            return "function" == typeof t3;
          }
          e.arraybuffer = e.fetch || o && i("arraybuffer"), e.msstream = !e.fetch && s && i("ms-stream"), e.mozchunkedarraybuffer = !e.fetch && o && i("moz-chunked-arraybuffer"), e.overrideMimeType = e.fetch || !!n() && a(n().overrideMimeType), e.vbArray = a(t2.VBArray), r2 = null;
        }).call(this, r(3));
      }, function(t, e, r) {
        (function(t2, n, i) {
          var o = r(69), s = r(10), a = r(42), u = e.readyStates = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 }, c = e.IncomingMessage = function(e2, r2, s2, u2) {
            var c2 = this;
            if (a.Readable.call(c2), c2._mode = s2, c2.headers = {}, c2.rawHeaders = [], c2.trailers = {}, c2.rawTrailers = [], c2.on("end", (function() {
              t2.nextTick((function() {
                c2.emit("close");
              }));
            })), "fetch" === s2) {
              if (c2._fetchResponse = r2, c2.url = r2.url, c2.statusCode = r2.status, c2.statusMessage = r2.statusText, r2.headers.forEach((function(t3, e3) {
                c2.headers[e3.toLowerCase()] = t3, c2.rawHeaders.push(e3, t3);
              })), o.writableStream) {
                var l = new WritableStream({ write: function(t3) {
                  return new Promise((function(e3, r3) {
                    c2._destroyed ? r3() : c2.push(new n(t3)) ? e3() : c2._resumeFetch = e3;
                  }));
                }, close: function() {
                  i.clearTimeout(u2), c2._destroyed || c2.push(null);
                }, abort: function(t3) {
                  c2._destroyed || c2.emit("error", t3);
                } });
                try {
                  return void r2.body.pipeTo(l).catch((function(t3) {
                    i.clearTimeout(u2), c2._destroyed || c2.emit("error", t3);
                  }));
                } catch (t3) {
                }
              }
              var f = r2.body.getReader();
              !(function t3() {
                f.read().then((function(e3) {
                  if (!c2._destroyed) {
                    if (e3.done) return i.clearTimeout(u2), void c2.push(null);
                    c2.push(new n(e3.value)), t3();
                  }
                })).catch((function(t4) {
                  i.clearTimeout(u2), c2._destroyed || c2.emit("error", t4);
                }));
              })();
            } else {
              if (c2._xhr = e2, c2._pos = 0, c2.url = e2.responseURL, c2.statusCode = e2.status, c2.statusMessage = e2.statusText, e2.getAllResponseHeaders().split(/\r?\n/).forEach((function(t3) {
                var e3 = t3.match(/^([^:]+):\s*(.*)/);
                if (e3) {
                  var r3 = e3[1].toLowerCase();
                  "set-cookie" === r3 ? (void 0 === c2.headers[r3] && (c2.headers[r3] = []), c2.headers[r3].push(e3[2])) : void 0 !== c2.headers[r3] ? c2.headers[r3] += ", " + e3[2] : c2.headers[r3] = e3[2], c2.rawHeaders.push(e3[1], e3[2]);
                }
              })), c2._charset = "x-user-defined", !o.overrideMimeType) {
                var h = c2.rawHeaders["mime-type"];
                if (h) {
                  var d = h.match(/;\s*charset=([^;])(;|$)/);
                  d && (c2._charset = d[1].toLowerCase());
                }
                c2._charset || (c2._charset = "utf-8");
              }
            }
          };
          s(c, a.Readable), c.prototype._read = function() {
            var t3 = this._resumeFetch;
            t3 && (this._resumeFetch = null, t3());
          }, c.prototype._onXHRProgress = function() {
            var t3 = this, e2 = t3._xhr, r2 = null;
            switch (t3._mode) {
              case "text:vbarray":
                if (e2.readyState !== u.DONE) break;
                try {
                  r2 = new i.VBArray(e2.responseBody).toArray();
                } catch (t4) {
                }
                if (null !== r2) {
                  t3.push(new n(r2));
                  break;
                }
              case "text":
                try {
                  r2 = e2.responseText;
                } catch (e3) {
                  t3._mode = "text:vbarray";
                  break;
                }
                if (r2.length > t3._pos) {
                  var o2 = r2.substr(t3._pos);
                  if ("x-user-defined" === t3._charset) {
                    for (var s2 = new n(o2.length), a2 = 0; a2 < o2.length; a2++) s2[a2] = 255 & o2.charCodeAt(a2);
                    t3.push(s2);
                  } else t3.push(o2, t3._charset);
                  t3._pos = r2.length;
                }
                break;
              case "arraybuffer":
                if (e2.readyState !== u.DONE || !e2.response) break;
                r2 = e2.response, t3.push(new n(new Uint8Array(r2)));
                break;
              case "moz-chunked-arraybuffer":
                if (r2 = e2.response, e2.readyState !== u.LOADING || !r2) break;
                t3.push(new n(new Uint8Array(r2)));
                break;
              case "ms-stream":
                if (r2 = e2.response, e2.readyState !== u.LOADING) break;
                var c2 = new i.MSStreamReader();
                c2.onprogress = function() {
                  c2.result.byteLength > t3._pos && (t3.push(new n(new Uint8Array(c2.result.slice(t3._pos)))), t3._pos = c2.result.byteLength);
                }, c2.onload = function() {
                  t3.push(null);
                }, c2.readAsArrayBuffer(r2);
            }
            t3._xhr.readyState === u.DONE && "ms-stream" !== t3._mode && t3.push(null);
          };
        }).call(this, r(8), r(7).Buffer, r(3));
      }, function(t, e, r) {
        var n = r(46), i = Object.prototype.hasOwnProperty, o = Array.isArray, s = (function() {
          for (var t2 = [], e2 = 0; e2 < 256; ++e2) t2.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
          return t2;
        })(), a = function(t2, e2) {
          for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t2.length; ++n2) void 0 !== t2[n2] && (r2[n2] = t2[n2]);
          return r2;
        };
        t.exports = { arrayToObject: a, assign: function(t2, e2) {
          return Object.keys(e2).reduce((function(t3, r2) {
            return t3[r2] = e2[r2], t3;
          }), t2);
        }, combine: function(t2, e2) {
          return [].concat(t2, e2);
        }, compact: function(t2) {
          for (var e2 = [{ obj: { o: t2 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var i2 = e2[n2], s2 = i2.obj[i2.prop], a2 = Object.keys(s2), u = 0; u < a2.length; ++u) {
            var c = a2[u], l = s2[c];
            "object" == typeof l && null !== l && -1 === r2.indexOf(l) && (e2.push({ obj: s2, prop: c }), r2.push(l));
          }
          return (function(t3) {
            for (; t3.length > 1; ) {
              var e3 = t3.pop(), r3 = e3.obj[e3.prop];
              if (o(r3)) {
                for (var n3 = [], i3 = 0; i3 < r3.length; ++i3) void 0 !== r3[i3] && n3.push(r3[i3]);
                e3.obj[e3.prop] = n3;
              }
            }
          })(e2), t2;
        }, decode: function(t2, e2, r2) {
          var n2 = t2.replace(/\+/g, " ");
          if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
          try {
            return decodeURIComponent(n2);
          } catch (t3) {
            return n2;
          }
        }, encode: function(t2, e2, r2, i2, o2) {
          if (0 === t2.length) return t2;
          var a2 = t2;
          if ("symbol" == typeof t2 ? a2 = Symbol.prototype.toString.call(t2) : "string" != typeof t2 && (a2 = String(t2)), "iso-8859-1" === r2) return escape(a2).replace(/%u[0-9a-f]{4}/gi, (function(t3) {
            return "%26%23" + parseInt(t3.slice(2), 16) + "%3B";
          }));
          for (var u = "", c = 0; c < a2.length; ++c) {
            var l = a2.charCodeAt(c);
            45 === l || 46 === l || 95 === l || 126 === l || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || o2 === n.RFC1738 && (40 === l || 41 === l) ? u += a2.charAt(c) : l < 128 ? u += s[l] : l < 2048 ? u += s[192 | l >> 6] + s[128 | 63 & l] : l < 55296 || l >= 57344 ? u += s[224 | l >> 12] + s[128 | l >> 6 & 63] + s[128 | 63 & l] : (c += 1, l = 65536 + ((1023 & l) << 10 | 1023 & a2.charCodeAt(c)), u += s[240 | l >> 18] + s[128 | l >> 12 & 63] + s[128 | l >> 6 & 63] + s[128 | 63 & l]);
          }
          return u;
        }, isBuffer: function(t2) {
          return !(!t2 || "object" != typeof t2) && !!(t2.constructor && t2.constructor.isBuffer && t2.constructor.isBuffer(t2));
        }, isRegExp: function(t2) {
          return "[object RegExp]" === Object.prototype.toString.call(t2);
        }, maybeMap: function(t2, e2) {
          if (o(t2)) {
            for (var r2 = [], n2 = 0; n2 < t2.length; n2 += 1) r2.push(e2(t2[n2]));
            return r2;
          }
          return e2(t2);
        }, merge: function t2(e2, r2, n2) {
          if (!r2) return e2;
          if ("object" != typeof r2) {
            if (o(e2)) e2.push(r2);
            else {
              if (!e2 || "object" != typeof e2) return [e2, r2];
              (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
            }
            return e2;
          }
          if (!e2 || "object" != typeof e2) return [e2].concat(r2);
          var s2 = e2;
          return o(e2) && !o(r2) && (s2 = a(e2, n2)), o(e2) && o(r2) ? (r2.forEach((function(r3, o2) {
            if (i.call(e2, o2)) {
              var s3 = e2[o2];
              s3 && "object" == typeof s3 && r3 && "object" == typeof r3 ? e2[o2] = t2(s3, r3, n2) : e2.push(r3);
            } else e2[o2] = r3;
          })), e2) : Object.keys(r2).reduce((function(e3, o2) {
            var s3 = r2[o2];
            return i.call(e3, o2) ? e3[o2] = t2(e3[o2], s3, n2) : e3[o2] = s3, e3;
          }), s2);
        } };
      }, function(t, e, r) {
        function n(t2) {
          try {
            t2[Symbol.iterator] = function() {
              return this;
            };
          } catch (t3) {
          }
        }
        function i(t2) {
          t2["@@iterator"] = function() {
            return this;
          };
        }
        function o(t2) {
          const e2 = { next: t2 };
          return n(e2), i(e2), e2;
        }
        function s(t2) {
          try {
            return t2.constructor.name.endsWith("Array");
          } catch {
            return false;
          }
        }
        function a(t2) {
          try {
            return "function" == typeof t2.next;
          } catch {
            return false;
          }
        }
        function u(t2) {
          try {
            return "@@iterator" in t2;
          } catch {
            return false;
          }
        }
        function c(t2) {
          try {
            return Symbol.iterator in t2.constructor.prototype;
          } catch {
            return false;
          }
        }
        function l(t2) {
          try {
            return Symbol.iterator in t2 && "function" == typeof t2.next && false === t2.propertyIsEnumerable("next");
          } catch {
            return false;
          }
        }
        function f(t2) {
          const e2 = t2["@@iterator"];
          return a(e2) ? e2 : "function" == typeof e2 ? e2() : void 0;
        }
        function h(t2) {
          let e2 = 0, r2 = t2.length;
          return o(() => e2++ < r2 ? { value: t2[e2], done: false } : { done: true });
        }
        function d(t2) {
          if (l(t2)) return t2;
          if (c(t2)) return t2[Symbol.iterator]();
          if (a(t2)) return o(t2.next);
          if (u(t2)) return f(t2);
          if ("string" == typeof t2 || s(t2)) return h(t2);
          throw "[iter-fun] unable to determine iterator";
        }
        t.exports = { addSymbolIterator: n, addSymbolIteratorFallback: i, isIterator: l, isArray: s, hasNext: a, hasSymbolIterator: c, hasIterator: u, getIterator: f, createIterator: h, getOrCreateIterator: d, wrapNextFunction: o, zip: function(t2) {
          return t2 = t2.map(d), o((function() {
            const e2 = t2.map((t3) => t3.next());
            return e2.every(({ done: t3 }) => t3) ? { done: true } : { done: false, value: e2.map(({ value: t3 }) => t3) };
          }));
        } };
      }, function(t, e, r) {
        function n(t2) {
          "+" === t2[0] && (t2 = t2.substring(1));
          const e2 = "-" === t2[0] ? "-" : "";
          "-" === e2 && (t2 = t2.substring(1));
          const r2 = t2.indexOf("e");
          if (-1 === r2) return e2 + t2;
          let n2 = t2.indexOf(".");
          -1 === n2 && (n2 = r2);
          const i = Number(t2.substring(r2 + 1)), o = t2.substring(0, r2).replace(".", ""), s = n2 + i, a = o.length;
          if (s >= a) {
            const t3 = s - a;
            let r3 = o;
            for (let e3 = 0; e3 < t3; e3++) r3 += "0";
            return e2 + r3;
          }
          if (s < 0) {
            let t3 = "0.";
            for (let e3 = 0; e3 > s; e3--) t3 += "0";
            return t3 += o, e2 + t3;
          }
          return e2 + o.substring(0, s) + "." + o.substring(s);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        t.exports = { MAX_SAFE_INTEGER: 9007199254740991 };
      }, function(t, e, r) {
        const n = r(47);
        function i(t2) {
          return "0" === t2 ? "1" : n("1", t2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(9), s = r(22);
        function a(t2) {
          if (-1 === (t2 = i(t2)).indexOf(".")) return t2;
          const e2 = s(t2);
          return t2 = n(t2).split(".")[0], "+" === e2 ? o(t2, "1") : "-" === e2 ? "0" === t2 || "" === t2 ? "0" : "-" + t2 : void 0;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(51);
        function i(t2) {
          const e2 = n(t2);
          return [t2.replace(/\./g, "").replace(/^0/, ""), 1 + "0".repeat(e2)];
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(0), i = r(16);
        function o(t2) {
          if (t2 = n(t2), !i(t2)) throw new Error("can't call is_odd on decimal");
          return ["1", "3", "5", "7", "9"].includes(t2.charAt(t2.length - 1));
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(52), i = r(15), o = r(78), s = r(11), a = r(17), u = r(50);
        function c(t2, { max_decimal_digits: e2, infinity_times_zero: r2 = "NaN" } = {}) {
          const c2 = t2.some((t3) => i(t3)), l = t2.some((t3) => s(t3));
          if (c2 && l) return r2;
          if (c2) {
            return t2.filter((t3) => "-" === u(t3)).length % 2 == 0 ? "Infinity" : "-Infinity";
          }
          if (l) return "0";
          const f = o(t2.filter((t3) => n(t3)).length.toString());
          let h = a(t2.map((t3) => t3.replace(/i$/, "")), { max_decimal_digits: e2 });
          return f && (h += "i"), h;
        }
        t.exports = c, t.exports.default = c;
      }, function(t, e, r) {
        const n = r(0);
        function i(t2) {
          return "-" === (t2 = n(t2))[0];
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(1), i = r(165), o = r(166);
        function s(t2, { max_decimal_digits: e2 = 100, fraction: r2 = false } = {}) {
          if (i(t2)) {
            const [i2, s2] = o(t2);
            return r2 ? s2 + "/" + i2 : n(s2, i2, { max_decimal_digits: e2 });
          }
          return r2 ? "1/" + t2 : n("1", t2, { max_decimal_digits: e2 });
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        const n = r(0), i = r(16);
        function o(t2) {
          if (t2 = n(t2), !i(t2)) throw new Error("can't call is_even on decimal");
          return ["0", "2", "4", "6", "8"].includes(t2.charAt(t2.length - 1));
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(76), i = r(84), o = r(1);
        function s(t2, e2) {
          const r2 = i(t2);
          return "0" === r2 ? "0" : n(o(r2, e2, { max_decimal_digits: 1 }));
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        const n = r(4), i = r(0);
        function o(t2) {
          const e2 = (t2 = n(i(t2))).indexOf(".");
          return (-1 === e2 ? t2.length : e2).toString();
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(1), i = r(82), o = r(86), s = r(87);
        function a(t2, e2) {
          const r2 = s("2", o(["1000", e2, e2]));
          for (; t2.endsWith("0") && e2.endsWith("0"); ) t2 = t2.substring(0, t2.length - 1), e2 = e2.substring(0, e2.length - 1);
          for (; i(t2) && i(e2); ) t2 = n(t2, "2"), e2 = n(e2, "2");
          let a2 = true;
          for (; a2; ) {
            a2 = false;
            for (let i2 = 0; i2 < r2.length; i2++) {
              const o2 = r2[i2], s2 = o2.length + 1, u = n(t2, o2, { ellipsis: true, max_decimal_digits: s2 });
              if (-1 === u.indexOf(".")) {
                const r3 = n(e2, o2, { ellipsis: true, max_decimal_digits: s2 });
                if (-1 === r3.indexOf(".")) {
                  t2 = u, e2 = r3, a2 = true;
                  break;
                }
              }
            }
          }
          return [t2, e2];
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(0), i = r(34);
        function o(t2) {
          "string" == typeof t2 && (t2 = Array.prototype.slice.call(arguments));
          let e2 = n(t2[0]);
          const r2 = t2.length;
          for (let n2 = 1; n2 < r2; n2++) {
            const r3 = t2[n2];
            "<" === i(r3, e2) && (e2 = r3);
          }
          return e2;
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(5), i = r(1), o = r(16), s = r(9);
        function a(t2 = "0", e2 = "100") {
          const r2 = ["2", "3", "5", "7", "11"].filter((r3) => "<" !== n(r3, t2) && ">" !== n(r3, e2));
          let a2 = "13";
          for (; ">" !== n(a2, e2); ) /^\d+5/.test(a2) || /^(\d)\1+/.test(a2) || ["9", "7", "3"].every((t3) => !o(i(a2, t3))) && r2.push(a2), a2 = s(a2, "2");
          return r2;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(6), i = r(1);
        function o({ max_decimal_digits: t2 = 100, steps: e2 = 100 } = {}) {
          let r2 = "1", o2 = "1";
          for (let s = 1; s < e2; s++) o2 = i(o2, s.toString(), { max_decimal_digits: t2 }), r2 = n(r2, o2);
          return r2;
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(0), i = r(90), o = r(91), s = r(11), a = r(88), u = r(35);
        function c(t2, { max_decimal_digits: e2 = 100 } = {}) {
          const r2 = a({ max_decimal_digits: 2 * e2 });
          return i(t2) ? "0" : o(t2) ? "Infinity" : s(t2) ? "1" : (t2 = n(t2), u(r2, t2, { max_decimal_digits: e2 }));
        }
        t.exports = c, t.exports.default = c;
      }, function(t, e, r) {
        function n(t2) {
          return !!t2.match(/^-inf(inity)?$/i);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        function n(t2) {
          return !!t2.match(/^\+?inf(inity)?$/i);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(37);
        function i(t2, e2) {
          return n(t2, "2", e2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        function n(t2) {
          const e2 = t2.indexOf(".");
          return -1 === e2 ? t2 : t2.substring(0, e2);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(95), i = r(185);
        function o(t2, e2, { precise: r2 = false } = { precise: false }) {
          return r2 ? i(n(t2.toString(), e2.toString()), "2") : (t2 + e2) / 2;
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(38), i = r(18), o = r(96), s = r(97);
        function a(t2, e2) {
          t2 = i(t2), e2 = i(e2);
          const r2 = "-" !== t2[0], a2 = "-" !== e2[0];
          if (r2 && a2) return o(t2, e2);
          if (!r2 && !a2) return "-" + o(t2.substring(1), e2.substring(1));
          if (!r2 && a2) switch (t2 = t2.substring(1), n(t2, e2)) {
            case "=":
              return "0";
            case "<":
              return s(e2, t2);
            case ">":
              return "-" + s(t2, e2);
          }
          else if (r2 && !a2) switch (e2 = e2.substring(1), n(t2, e2)) {
            case "=":
              return "0";
            case "<":
              return "-" + s(e2, t2);
            case ">":
              return s(t2, e2);
          }
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(56);
        t.exports = function(t2, e2) {
          const r2 = t2.length, i = e2.length, o = t2.indexOf("."), s = e2.indexOf("."), a = -1 === o ? r2 : o, u = -1 === s ? i : s;
          if (-1 === o && -1 === s && r2 < n && i < n) return (Number(t2) + Number(e2)).toFixed();
          const c = a - u;
          let l = Math.max(a, u), f = Math.max(r2 - a - 1, i - u - 1), h = c < 0 ? -1 * c : 0, d = c <= 0 ? 0 : c, p = l + 1 + f - 1, y = "", g = 0, m = p;
          if (f > 0) {
            for (; m > p - f; ) {
              const r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
              let i2 = Number(r3) + Number(n2) + g;
              i2 >= 10 ? (i2 -= 10, g = 1) : g = 0, "" === y && 0 === i2 || (y = i2 + y), m--;
            }
            y && (y = "." + y), m--;
          }
          if (l > 0) for (; m >= 0; ) {
            const r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
            let i2 = Number(r3) + Number(n2) + g;
            i2 >= 10 ? (i2 -= 10, g = 1) : g = 0, y = i2 + y, m--;
          }
          return 1 === g && (y = g + y), "." === y[0] && (y = "0" + y), y;
        };
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(56);
        t.exports = function(t2, e2) {
          const r2 = t2.length, i = e2.length, o = t2.indexOf("."), s = e2.indexOf("."), a = -1 === o ? r2 : o, u = -1 === s ? i : s;
          if (-1 === o && -1 === s && r2 < n && i < n) return (Number(t2) - Number(e2)).toFixed();
          const c = a - u;
          let l = Math.max(a, u), f = Math.max(r2 - a - 1, i - u - 1), h = c < 0 ? -1 * c : 0, d = c <= 0 ? 0 : c, p = l + 1 + f - 1, y = "", g = 0, m = p;
          if (f > 0) {
            for (; m > p - f; ) {
              let r3 = t2[m - h] || "0", n2 = e2[m - d] || "0";
              r3 -= g, g = 0;
              let i2 = r3 - n2;
              if (i2 < 0) for (; i2 < 0; ) g++, i2 += 10;
              else g && g--;
              "" === y && 0 === i2 || (y = i2 + y), m--;
            }
            "" !== y && (y = "." + y), m--;
          }
          if (l > 0) {
            for (; m > 0; ) {
              let r4 = t2[m - h] || "0", n3 = e2[m - d] || "0";
              r4 -= g, g = 0;
              let i3 = r4 - n3;
              if (i3 < 0) for (; i3 < 0; ) g++, i3 += 10;
              else g && g--;
              y = i3 + y, m--;
            }
            const r3 = t2[0 - h] || "0", n2 = e2[0 - d] || "0";
            let i2 = Number(r3) - (g > 0 ? 1 : 0) - Number(n2);
            0 !== i2 && (y = i2 + y), y = y.replace(/^0+/, "");
          }
          return "." === y[0] && (y = "0" + y), y;
        };
      }, function(t, e, r) {
        const n = r(18);
        function i(t2) {
          return "-" === (t2 = n(t2))[0] ? t2.substring(1) : t2;
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        t.exports = { countIn1D: function(t2) {
          return t2.reduce((function(t3, e2) {
            return void 0 === t3[e2] ? t3[e2] = 1 : t3[e2]++, t3;
          }), {});
        }, countIn2D: function(t2) {
          return t2.reduce((function(t3, e2) {
            return e2.forEach((function(e3) {
              void 0 === t3[e3] ? t3[e3] = 1 : t3[e3]++;
            })), t3;
          }), {});
        }, unflatten: function(t2, e2) {
          for (var r2 = e2.height, n = e2.width, i = [], o = 0; o < r2; o++) {
            var s = o * n, a = s + n;
            i.push(t2.subarray(s, a));
          }
          return i;
        } };
      }, function(t, e, r) {
        r.r(e), r.d(e, "globals", (function() {
          return n;
        })), r.d(e, "rgb", (function() {
          return i;
        })), r.d(e, "getDecoder", (function() {
          return U;
        })), r.d(e, "setLogger", (function() {
          return xt;
        })), r.d(e, "GeoTIFF", (function() {
          return Tt;
        })), r.d(e, "MultiGeoTIFF", (function() {
          return Ot;
        })), r.d(e, "fromUrl", (function() {
          return Ct;
        })), r.d(e, "fromArrayBuffer", (function() {
          return Pt;
        })), r.d(e, "fromFile", (function() {
          return It;
        })), r.d(e, "fromBlob", (function() {
          return Rt;
        })), r.d(e, "fromUrls", (function() {
          return jt;
        })), r.d(e, "writeArrayBuffer", (function() {
          return Mt;
        })), r.d(e, "Pool", (function() {
          return Y.a;
        }));
        var n = {};
        r.r(n), r.d(n, "fieldTagNames", (function() {
          return a;
        })), r.d(n, "fieldTags", (function() {
          return u;
        })), r.d(n, "fieldTagTypes", (function() {
          return c;
        })), r.d(n, "arrayFields", (function() {
          return l;
        })), r.d(n, "fieldTypeNames", (function() {
          return f;
        })), r.d(n, "fieldTypes", (function() {
          return h;
        })), r.d(n, "photometricInterpretations", (function() {
          return d;
        })), r.d(n, "ExtraSamplesValues", (function() {
          return p;
        })), r.d(n, "geoKeyNames", (function() {
          return y;
        })), r.d(n, "geoKeys", (function() {
          return g;
        }));
        var i = {};
        r.r(i), r.d(i, "fromWhiteIsZero", (function() {
          return m;
        })), r.d(i, "fromBlackIsZero", (function() {
          return b;
        })), r.d(i, "fromPalette", (function() {
          return v;
        })), r.d(i, "fromCMYK", (function() {
          return w;
        })), r.d(i, "fromYCbCr", (function() {
          return x;
        })), r.d(i, "fromCIELab", (function() {
          return _;
        }));
        var o = r(101), s = r.n(o);
        const a = { 315: "Artist", 258: "BitsPerSample", 265: "CellLength", 264: "CellWidth", 320: "ColorMap", 259: "Compression", 33432: "Copyright", 306: "DateTime", 338: "ExtraSamples", 266: "FillOrder", 289: "FreeByteCounts", 288: "FreeOffsets", 291: "GrayResponseCurve", 290: "GrayResponseUnit", 316: "HostComputer", 270: "ImageDescription", 257: "ImageLength", 256: "ImageWidth", 271: "Make", 281: "MaxSampleValue", 280: "MinSampleValue", 272: "Model", 254: "NewSubfileType", 274: "Orientation", 262: "PhotometricInterpretation", 284: "PlanarConfiguration", 296: "ResolutionUnit", 278: "RowsPerStrip", 277: "SamplesPerPixel", 305: "Software", 279: "StripByteCounts", 273: "StripOffsets", 255: "SubfileType", 263: "Threshholding", 282: "XResolution", 283: "YResolution", 326: "BadFaxLines", 327: "CleanFaxData", 343: "ClipPath", 328: "ConsecutiveBadFaxLines", 433: "Decode", 434: "DefaultImageColor", 269: "DocumentName", 336: "DotRange", 321: "HalftoneHints", 346: "Indexed", 347: "JPEGTables", 285: "PageName", 297: "PageNumber", 317: "Predictor", 319: "PrimaryChromaticities", 532: "ReferenceBlackWhite", 339: "SampleFormat", 340: "SMinSampleValue", 341: "SMaxSampleValue", 559: "StripRowCounts", 330: "SubIFDs", 292: "T4Options", 293: "T6Options", 325: "TileByteCounts", 323: "TileLength", 324: "TileOffsets", 322: "TileWidth", 301: "TransferFunction", 318: "WhitePoint", 344: "XClipPathUnits", 286: "XPosition", 529: "YCbCrCoefficients", 531: "YCbCrPositioning", 530: "YCbCrSubSampling", 345: "YClipPathUnits", 287: "YPosition", 37378: "ApertureValue", 40961: "ColorSpace", 36868: "DateTimeDigitized", 36867: "DateTimeOriginal", 34665: "Exif IFD", 36864: "ExifVersion", 33434: "ExposureTime", 41728: "FileSource", 37385: "Flash", 40960: "FlashpixVersion", 33437: "FNumber", 42016: "ImageUniqueID", 37384: "LightSource", 37500: "MakerNote", 37377: "ShutterSpeedValue", 37510: "UserComment", 33723: "IPTC", 34675: "ICC Profile", 700: "XMP", 42112: "GDAL_METADATA", 42113: "GDAL_NODATA", 34377: "Photoshop", 33550: "ModelPixelScale", 33922: "ModelTiepoint", 34264: "ModelTransformation", 34735: "GeoKeyDirectory", 34736: "GeoDoubleParams", 34737: "GeoAsciiParams" }, u = {};
        for (const t2 in a) a.hasOwnProperty(t2) && (u[a[t2]] = parseInt(t2, 10));
        const c = { 256: "SHORT", 257: "SHORT", 258: "SHORT", 259: "SHORT", 262: "SHORT", 273: "LONG", 274: "SHORT", 277: "SHORT", 278: "LONG", 279: "LONG", 282: "RATIONAL", 283: "RATIONAL", 284: "SHORT", 286: "SHORT", 287: "RATIONAL", 296: "SHORT", 305: "ASCII", 306: "ASCII", 338: "SHORT", 339: "SHORT", 513: "LONG", 514: "LONG", 1024: "SHORT", 1025: "SHORT", 2048: "SHORT", 2049: "ASCII", 33550: "DOUBLE", 33922: "DOUBLE", 34665: "LONG", 34735: "SHORT", 34737: "ASCII", 42113: "ASCII" }, l = [u.BitsPerSample, u.ExtraSamples, u.SampleFormat, u.StripByteCounts, u.StripOffsets, u.StripRowCounts, u.TileByteCounts, u.TileOffsets], f = { 1: "BYTE", 2: "ASCII", 3: "SHORT", 4: "LONG", 5: "RATIONAL", 6: "SBYTE", 7: "UNDEFINED", 8: "SSHORT", 9: "SLONG", 10: "SRATIONAL", 11: "FLOAT", 12: "DOUBLE", 13: "IFD", 16: "LONG8", 17: "SLONG8", 18: "IFD8" }, h = {};
        for (const t2 in f) f.hasOwnProperty(t2) && (h[f[t2]] = parseInt(t2, 10));
        const d = { WhiteIsZero: 0, BlackIsZero: 1, RGB: 2, Palette: 3, TransparencyMask: 4, CMYK: 5, YCbCr: 6, CIELab: 8, ICCLab: 9 }, p = { Unspecified: 0, Assocalpha: 1, Unassalpha: 2 }, y = { 1024: "GTModelTypeGeoKey", 1025: "GTRasterTypeGeoKey", 1026: "GTCitationGeoKey", 2048: "GeographicTypeGeoKey", 2049: "GeogCitationGeoKey", 2050: "GeogGeodeticDatumGeoKey", 2051: "GeogPrimeMeridianGeoKey", 2052: "GeogLinearUnitsGeoKey", 2053: "GeogLinearUnitSizeGeoKey", 2054: "GeogAngularUnitsGeoKey", 2055: "GeogAngularUnitSizeGeoKey", 2056: "GeogEllipsoidGeoKey", 2057: "GeogSemiMajorAxisGeoKey", 2058: "GeogSemiMinorAxisGeoKey", 2059: "GeogInvFlatteningGeoKey", 2060: "GeogAzimuthUnitsGeoKey", 2061: "GeogPrimeMeridianLongGeoKey", 2062: "GeogTOWGS84GeoKey", 3072: "ProjectedCSTypeGeoKey", 3073: "PCSCitationGeoKey", 3074: "ProjectionGeoKey", 3075: "ProjCoordTransGeoKey", 3076: "ProjLinearUnitsGeoKey", 3077: "ProjLinearUnitSizeGeoKey", 3078: "ProjStdParallel1GeoKey", 3079: "ProjStdParallel2GeoKey", 3080: "ProjNatOriginLongGeoKey", 3081: "ProjNatOriginLatGeoKey", 3082: "ProjFalseEastingGeoKey", 3083: "ProjFalseNorthingGeoKey", 3084: "ProjFalseOriginLongGeoKey", 3085: "ProjFalseOriginLatGeoKey", 3086: "ProjFalseOriginEastingGeoKey", 3087: "ProjFalseOriginNorthingGeoKey", 3088: "ProjCenterLongGeoKey", 3089: "ProjCenterLatGeoKey", 3090: "ProjCenterEastingGeoKey", 3091: "ProjCenterNorthingGeoKey", 3092: "ProjScaleAtNatOriginGeoKey", 3093: "ProjScaleAtCenterGeoKey", 3094: "ProjAzimuthAngleGeoKey", 3095: "ProjStraightVertPoleLongGeoKey", 3096: "ProjRectifiedGridAngleGeoKey", 4096: "VerticalCSTypeGeoKey", 4097: "VerticalCitationGeoKey", 4098: "VerticalDatumGeoKey", 4099: "VerticalUnitsGeoKey" }, g = {};
        for (const t2 in y) y.hasOwnProperty(t2) && (g[y[t2]] = parseInt(t2, 10));
        function m(t2, e2) {
          const { width: r2, height: n2 } = t2, i2 = new Uint8Array(r2 * n2 * 3);
          let o2;
          for (let r3 = 0, n3 = 0; r3 < t2.length; ++r3, n3 += 3) o2 = 256 - t2[r3] / e2 * 256, i2[n3] = o2, i2[n3 + 1] = o2, i2[n3 + 2] = o2;
          return i2;
        }
        function b(t2, e2) {
          const { width: r2, height: n2 } = t2, i2 = new Uint8Array(r2 * n2 * 3);
          let o2;
          for (let r3 = 0, n3 = 0; r3 < t2.length; ++r3, n3 += 3) o2 = t2[r3] / e2 * 256, i2[n3] = o2, i2[n3 + 1] = o2, i2[n3 + 2] = o2;
          return i2;
        }
        function v(t2, e2) {
          const { width: r2, height: n2 } = t2, i2 = new Uint8Array(r2 * n2 * 3), o2 = e2.length / 3, s2 = e2.length / 3 * 2;
          for (let r3 = 0, n3 = 0; r3 < t2.length; ++r3, n3 += 3) {
            const a2 = t2[r3];
            i2[n3] = e2[a2] / 65536 * 256, i2[n3 + 1] = e2[a2 + o2] / 65536 * 256, i2[n3 + 2] = e2[a2 + s2] / 65536 * 256;
          }
          return i2;
        }
        function w(t2) {
          const { width: e2, height: r2 } = t2, n2 = new Uint8Array(e2 * r2 * 3);
          for (let e3 = 0, r3 = 0; e3 < t2.length; e3 += 4, r3 += 3) {
            const i2 = t2[e3], o2 = t2[e3 + 1], s2 = t2[e3 + 2], a2 = t2[e3 + 3];
            n2[r3] = (255 - i2) / 256 * 255 * ((255 - a2) / 256), n2[r3 + 1] = (255 - o2) / 256 * 255 * ((255 - a2) / 256), n2[r3 + 2] = (255 - s2) / 256 * 255 * ((255 - a2) / 256);
          }
          return n2;
        }
        function x(t2) {
          const { width: e2, height: r2 } = t2, n2 = new Uint8ClampedArray(e2 * r2 * 3);
          for (let e3 = 0, r3 = 0; e3 < t2.length; e3 += 3, r3 += 3) {
            const i2 = t2[e3], o2 = t2[e3 + 1], s2 = t2[e3 + 2];
            n2[r3] = i2 + 1.402 * (s2 - 128), n2[r3 + 1] = i2 - 0.34414 * (o2 - 128) - 0.71414 * (s2 - 128), n2[r3 + 2] = i2 + 1.772 * (o2 - 128);
          }
          return n2;
        }
        function _(t2) {
          const { width: e2, height: r2 } = t2, n2 = new Uint8Array(e2 * r2 * 3);
          for (let e3 = 0, r3 = 0; e3 < t2.length; e3 += 3, r3 += 3) {
            let i2, o2, s2, a2 = (t2[e3 + 0] + 16) / 116, u2 = (t2[e3 + 1] << 24 >> 24) / 500 + a2, c2 = a2 - (t2[e3 + 2] << 24 >> 24) / 200;
            u2 = 0.95047 * (u2 * u2 * u2 > 8856e-6 ? u2 * u2 * u2 : (u2 - 16 / 116) / 7.787), a2 = 1 * (a2 * a2 * a2 > 8856e-6 ? a2 * a2 * a2 : (a2 - 16 / 116) / 7.787), c2 = 1.08883 * (c2 * c2 * c2 > 8856e-6 ? c2 * c2 * c2 : (c2 - 16 / 116) / 7.787), i2 = 3.2406 * u2 + -1.5372 * a2 + -0.4986 * c2, o2 = -0.9689 * u2 + 1.8758 * a2 + 0.0415 * c2, s2 = 0.0557 * u2 + -0.204 * a2 + 1.057 * c2, i2 = i2 > 31308e-7 ? 1.055 * i2 ** (1 / 2.4) - 0.055 : 12.92 * i2, o2 = o2 > 31308e-7 ? 1.055 * o2 ** (1 / 2.4) - 0.055 : 12.92 * o2, s2 = s2 > 31308e-7 ? 1.055 * s2 ** (1 / 2.4) - 0.055 : 12.92 * s2, n2[r3] = 255 * Math.max(0, Math.min(1, i2)), n2[r3 + 1] = 255 * Math.max(0, Math.min(1, o2)), n2[r3 + 2] = 255 * Math.max(0, Math.min(1, s2));
          }
          return n2;
        }
        function S(t2, e2) {
          let r2 = t2.length - e2, n2 = 0;
          do {
            for (let r3 = e2; r3 > 0; r3--) t2[n2 + e2] += t2[n2], n2++;
            r2 -= e2;
          } while (r2 > 0);
        }
        function A(t2, e2, r2) {
          let n2 = 0, i2 = t2.length;
          const o2 = i2 / r2;
          for (; i2 > e2; ) {
            for (let r3 = e2; r3 > 0; --r3) t2[n2 + e2] += t2[n2], ++n2;
            i2 -= e2;
          }
          const s2 = t2.slice();
          for (let e3 = 0; e3 < o2; ++e3) for (let n3 = 0; n3 < r2; ++n3) t2[r2 * e3 + n3] = s2[(r2 - n3 - 1) * o2 + e3];
        }
        class E {
          decode(t2, e2) {
            const r2 = this.decodeBlock(e2), n2 = t2.Predictor || 1;
            if (1 !== n2) {
              const e3 = !t2.StripOffsets;
              return (function(t3, e4, r3, n3, i2, o2) {
                if (1 === e4) return t3;
                for (let t4 = 0; t4 < i2.length; ++t4) {
                  if (i2[t4] % 8 != 0) throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
                  if (i2[t4] !== i2[0]) throw new Error("When decoding with predictor, all samples must have the same size.");
                }
                const s2 = i2[0] / 8, a2 = 2 === o2 ? 1 : i2.length;
                for (let o3 = 0; o3 < n3 && !(o3 * a2 * r3 * s2 >= t3.byteLength); ++o3) {
                  let n4;
                  if (2 === e4) {
                    switch (i2[0]) {
                      case 8:
                        n4 = new Uint8Array(t3, o3 * a2 * r3 * s2, a2 * r3 * s2);
                        break;
                      case 16:
                        n4 = new Uint16Array(t3, o3 * a2 * r3 * s2, a2 * r3 * s2 / 2);
                        break;
                      case 32:
                        n4 = new Uint32Array(t3, o3 * a2 * r3 * s2, a2 * r3 * s2 / 4);
                        break;
                      default:
                        throw new Error(`Predictor 2 not allowed with ${i2[0]} bits per sample.`);
                    }
                    S(n4, a2);
                  } else 3 === e4 && (n4 = new Uint8Array(t3, o3 * a2 * r3 * s2, a2 * r3 * s2), A(n4, a2, s2));
                }
                return t3;
              })(r2, n2, e3 ? t2.TileWidth : t2.ImageWidth, e3 ? t2.TileLength : t2.RowsPerStrip || t2.ImageLength, t2.BitsPerSample, t2.PlanarConfiguration);
            }
            return r2;
          }
        }
        class k extends E {
          decodeBlock(t2) {
            return t2;
          }
        }
        function T(t2, e2) {
          for (let r2 = e2.length - 1; r2 >= 0; r2--) t2.push(e2[r2]);
          return t2;
        }
        function O(t2) {
          const e2 = new Uint16Array(4093), r2 = new Uint8Array(4093);
          for (let t3 = 0; t3 <= 257; t3++) e2[t3] = 4096, r2[t3] = t3;
          let n2 = 258, i2 = 9, o2 = 0;
          function s2() {
            n2 = 258, i2 = 9;
          }
          function a2(t3) {
            const e3 = (function(t4, e4, r3) {
              const n3 = e4 % 8, i3 = Math.floor(e4 / 8), o3 = 8 - n3, s3 = e4 + r3 - 8 * (i3 + 1);
              let a3 = 8 * (i3 + 2) - (e4 + r3);
              const u3 = 8 * (i3 + 2) - e4;
              if (a3 = Math.max(0, a3), i3 >= t4.length) return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), 257;
              let c3 = t4[i3] & 2 ** (8 - n3) - 1;
              c3 <<= r3 - o3;
              let l3 = c3;
              if (i3 + 1 < t4.length) {
                let e5 = t4[i3 + 1] >>> a3;
                e5 <<= Math.max(0, r3 - u3), l3 += e5;
              }
              if (s3 > 8 && i3 + 2 < t4.length) {
                const n4 = 8 * (i3 + 3) - (e4 + r3);
                l3 += t4[i3 + 2] >>> n4;
              }
              return l3;
            })(t3, o2, i2);
            return o2 += i2, e3;
          }
          function u2(t3, i3) {
            return r2[n2] = i3, e2[n2] = t3, n2++, n2 - 1;
          }
          function c2(t3) {
            const n3 = [];
            for (let i3 = t3; 4096 !== i3; i3 = e2[i3]) n3.push(r2[i3]);
            return n3;
          }
          const l2 = [];
          s2();
          const f2 = new Uint8Array(t2);
          let h2, d2 = a2(f2);
          for (; 257 !== d2; ) {
            if (256 === d2) {
              for (s2(), d2 = a2(f2); 256 === d2; ) d2 = a2(f2);
              if (257 === d2) break;
              if (d2 > 256) throw new Error("corrupted code at scanline " + d2);
              T(l2, c2(d2)), h2 = d2;
            } else if (d2 < n2) {
              const t3 = c2(d2);
              T(l2, t3), u2(h2, t3[t3.length - 1]), h2 = d2;
            } else {
              const t3 = c2(h2);
              if (!t3) throw new Error(`Bogus entry. Not in dictionary, ${h2} / ${n2}, position: ${o2}`);
              T(l2, t3), l2.push(t3[t3.length - 1]), u2(h2, t3[t3.length - 1]), h2 = d2;
            }
            n2 + 1 >= 2 ** i2 && (12 === i2 ? h2 = void 0 : i2++), d2 = a2(f2);
          }
          return new Uint8Array(l2);
        }
        class C extends E {
          decodeBlock(t2) {
            return O(t2).buffer;
          }
        }
        const P = new Int32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
        function I(t2, e2) {
          let r2 = 0;
          const n2 = [];
          let i2 = 16;
          for (; i2 > 0 && !t2[i2 - 1]; ) --i2;
          n2.push({ children: [], index: 0 });
          let o2, s2 = n2[0];
          for (let a2 = 0; a2 < i2; a2++) {
            for (let i3 = 0; i3 < t2[a2]; i3++) {
              for (s2 = n2.pop(), s2.children[s2.index] = e2[r2]; s2.index > 0; ) s2 = n2.pop();
              for (s2.index++, n2.push(s2); n2.length <= a2; ) n2.push(o2 = { children: [], index: 0 }), s2.children[s2.index] = o2.children, s2 = o2;
              r2++;
            }
            a2 + 1 < i2 && (n2.push(o2 = { children: [], index: 0 }), s2.children[s2.index] = o2.children, s2 = o2);
          }
          return n2[0].children;
        }
        function R(t2, e2, r2, n2, i2, o2, s2, a2, u2) {
          const { mcusPerLine: c2, progressive: l2 } = r2, f2 = e2;
          let h2 = e2, d2 = 0, p2 = 0;
          function y2() {
            if (p2 > 0) return p2--, d2 >> p2 & 1;
            if (d2 = t2[h2++], 255 === d2) {
              const e3 = t2[h2++];
              if (e3) throw new Error("unexpected marker: " + (d2 << 8 | e3).toString(16));
            }
            return p2 = 7, d2 >>> 7;
          }
          function g2(t3) {
            let e3, r3 = t3;
            for (; null !== (e3 = y2()); ) {
              if (r3 = r3[e3], "number" == typeof r3) return r3;
              if ("object" != typeof r3) throw new Error("invalid huffman sequence");
            }
            return null;
          }
          function m2(t3) {
            let e3 = t3, r3 = 0;
            for (; e3 > 0; ) {
              const t4 = y2();
              if (null === t4) return;
              r3 = r3 << 1 | t4, --e3;
            }
            return r3;
          }
          function b2(t3) {
            const e3 = m2(t3);
            return e3 >= 1 << t3 - 1 ? e3 : e3 + (-1 << t3) + 1;
          }
          let v2 = 0;
          let w2, x2 = 0;
          function _2(t3, e3, r3, n3, i3) {
            const o3 = r3 % c2, s3 = (r3 / c2 | 0) * t3.v + n3, a3 = o3 * t3.h + i3;
            e3(t3, t3.blocks[s3][a3]);
          }
          function S2(t3, e3, r3) {
            const n3 = r3 / t3.blocksPerLine | 0, i3 = r3 % t3.blocksPerLine;
            e3(t3, t3.blocks[n3][i3]);
          }
          const A2 = n2.length;
          let E2, k2, T2, O2, C2, I2;
          I2 = l2 ? 0 === o2 ? 0 === a2 ? function(t3, e3) {
            const r3 = g2(t3.huffmanTableDC), n3 = 0 === r3 ? 0 : b2(r3) << u2;
            t3.pred += n3, e3[0] = t3.pred;
          } : function(t3, e3) {
            e3[0] |= y2() << u2;
          } : 0 === a2 ? function(t3, e3) {
            if (v2 > 0) return void v2--;
            let r3 = o2;
            const n3 = s2;
            for (; r3 <= n3; ) {
              const n4 = g2(t3.huffmanTableAC), i3 = 15 & n4, o3 = n4 >> 4;
              if (0 === i3) {
                if (o3 < 15) {
                  v2 = m2(o3) + (1 << o3) - 1;
                  break;
                }
                r3 += 16;
              } else {
                r3 += o3;
                e3[P[r3]] = b2(i3) * (1 << u2), r3++;
              }
            }
          } : function(t3, e3) {
            let r3 = o2;
            const n3 = s2;
            let i3 = 0;
            for (; r3 <= n3; ) {
              const n4 = P[r3], o3 = e3[n4] < 0 ? -1 : 1;
              switch (x2) {
                case 0: {
                  const e4 = g2(t3.huffmanTableAC), r4 = 15 & e4;
                  if (i3 = e4 >> 4, 0 === r4) i3 < 15 ? (v2 = m2(i3) + (1 << i3), x2 = 4) : (i3 = 16, x2 = 1);
                  else {
                    if (1 !== r4) throw new Error("invalid ACn encoding");
                    w2 = b2(r4), x2 = i3 ? 2 : 3;
                  }
                  continue;
                }
                case 1:
                case 2:
                  e3[n4] ? e3[n4] += (y2() << u2) * o3 : (i3--, 0 === i3 && (x2 = 2 === x2 ? 3 : 0));
                  break;
                case 3:
                  e3[n4] ? e3[n4] += (y2() << u2) * o3 : (e3[n4] = w2 << u2, x2 = 0);
                  break;
                case 4:
                  e3[n4] && (e3[n4] += (y2() << u2) * o3);
              }
              r3++;
            }
            4 === x2 && (v2--, 0 === v2 && (x2 = 0));
          } : function(t3, e3) {
            const r3 = g2(t3.huffmanTableDC), n3 = 0 === r3 ? 0 : b2(r3);
            t3.pred += n3, e3[0] = t3.pred;
            let i3 = 1;
            for (; i3 < 64; ) {
              const r4 = g2(t3.huffmanTableAC), n4 = 15 & r4, o3 = r4 >> 4;
              if (0 === n4) {
                if (o3 < 15) break;
                i3 += 16;
              } else {
                i3 += o3;
                e3[P[i3]] = b2(n4), i3++;
              }
            }
          };
          let R2, j2, M2 = 0;
          j2 = 1 === A2 ? n2[0].blocksPerLine * n2[0].blocksPerColumn : c2 * r2.mcusPerColumn;
          const L2 = i2 || j2;
          for (; M2 < j2; ) {
            for (k2 = 0; k2 < A2; k2++) n2[k2].pred = 0;
            if (v2 = 0, 1 === A2) for (E2 = n2[0], C2 = 0; C2 < L2; C2++) S2(E2, I2, M2), M2++;
            else for (C2 = 0; C2 < L2; C2++) {
              for (k2 = 0; k2 < A2; k2++) {
                E2 = n2[k2];
                const { h: t3, v: e3 } = E2;
                for (T2 = 0; T2 < e3; T2++) for (O2 = 0; O2 < t3; O2++) _2(E2, I2, M2, T2, O2);
              }
              if (M2++, M2 === j2) break;
            }
            if (p2 = 0, R2 = t2[h2] << 8 | t2[h2 + 1], R2 < 65280) throw new Error("marker was not found");
            if (!(R2 >= 65488 && R2 <= 65495)) break;
            h2 += 2;
          }
          return h2 - f2;
        }
        function j(t2, e2) {
          const r2 = [], { blocksPerLine: n2, blocksPerColumn: i2 } = e2, o2 = n2 << 3, s2 = new Int32Array(64), a2 = new Uint8Array(64);
          function u2(t3, r3, n3) {
            const i3 = e2.quantizationTable;
            let o3, s3, a3, u3, c2, l2, f2, h2, d2;
            const p2 = n3;
            let y2;
            for (y2 = 0; y2 < 64; y2++) p2[y2] = t3[y2] * i3[y2];
            for (y2 = 0; y2 < 8; ++y2) {
              const t4 = 8 * y2;
              0 !== p2[1 + t4] || 0 !== p2[2 + t4] || 0 !== p2[3 + t4] || 0 !== p2[4 + t4] || 0 !== p2[5 + t4] || 0 !== p2[6 + t4] || 0 !== p2[7 + t4] ? (o3 = 5793 * p2[0 + t4] + 128 >> 8, s3 = 5793 * p2[4 + t4] + 128 >> 8, a3 = p2[2 + t4], u3 = p2[6 + t4], c2 = 2896 * (p2[1 + t4] - p2[7 + t4]) + 128 >> 8, h2 = 2896 * (p2[1 + t4] + p2[7 + t4]) + 128 >> 8, l2 = p2[3 + t4] << 4, f2 = p2[5 + t4] << 4, d2 = o3 - s3 + 1 >> 1, o3 = o3 + s3 + 1 >> 1, s3 = d2, d2 = 3784 * a3 + 1567 * u3 + 128 >> 8, a3 = 1567 * a3 - 3784 * u3 + 128 >> 8, u3 = d2, d2 = c2 - f2 + 1 >> 1, c2 = c2 + f2 + 1 >> 1, f2 = d2, d2 = h2 + l2 + 1 >> 1, l2 = h2 - l2 + 1 >> 1, h2 = d2, d2 = o3 - u3 + 1 >> 1, o3 = o3 + u3 + 1 >> 1, u3 = d2, d2 = s3 - a3 + 1 >> 1, s3 = s3 + a3 + 1 >> 1, a3 = d2, d2 = 2276 * c2 + 3406 * h2 + 2048 >> 12, c2 = 3406 * c2 - 2276 * h2 + 2048 >> 12, h2 = d2, d2 = 799 * l2 + 4017 * f2 + 2048 >> 12, l2 = 4017 * l2 - 799 * f2 + 2048 >> 12, f2 = d2, p2[0 + t4] = o3 + h2, p2[7 + t4] = o3 - h2, p2[1 + t4] = s3 + f2, p2[6 + t4] = s3 - f2, p2[2 + t4] = a3 + l2, p2[5 + t4] = a3 - l2, p2[3 + t4] = u3 + c2, p2[4 + t4] = u3 - c2) : (d2 = 5793 * p2[0 + t4] + 512 >> 10, p2[0 + t4] = d2, p2[1 + t4] = d2, p2[2 + t4] = d2, p2[3 + t4] = d2, p2[4 + t4] = d2, p2[5 + t4] = d2, p2[6 + t4] = d2, p2[7 + t4] = d2);
            }
            for (y2 = 0; y2 < 8; ++y2) {
              const t4 = y2;
              0 !== p2[8 + t4] || 0 !== p2[16 + t4] || 0 !== p2[24 + t4] || 0 !== p2[32 + t4] || 0 !== p2[40 + t4] || 0 !== p2[48 + t4] || 0 !== p2[56 + t4] ? (o3 = 5793 * p2[0 + t4] + 2048 >> 12, s3 = 5793 * p2[32 + t4] + 2048 >> 12, a3 = p2[16 + t4], u3 = p2[48 + t4], c2 = 2896 * (p2[8 + t4] - p2[56 + t4]) + 2048 >> 12, h2 = 2896 * (p2[8 + t4] + p2[56 + t4]) + 2048 >> 12, l2 = p2[24 + t4], f2 = p2[40 + t4], d2 = o3 - s3 + 1 >> 1, o3 = o3 + s3 + 1 >> 1, s3 = d2, d2 = 3784 * a3 + 1567 * u3 + 2048 >> 12, a3 = 1567 * a3 - 3784 * u3 + 2048 >> 12, u3 = d2, d2 = c2 - f2 + 1 >> 1, c2 = c2 + f2 + 1 >> 1, f2 = d2, d2 = h2 + l2 + 1 >> 1, l2 = h2 - l2 + 1 >> 1, h2 = d2, d2 = o3 - u3 + 1 >> 1, o3 = o3 + u3 + 1 >> 1, u3 = d2, d2 = s3 - a3 + 1 >> 1, s3 = s3 + a3 + 1 >> 1, a3 = d2, d2 = 2276 * c2 + 3406 * h2 + 2048 >> 12, c2 = 3406 * c2 - 2276 * h2 + 2048 >> 12, h2 = d2, d2 = 799 * l2 + 4017 * f2 + 2048 >> 12, l2 = 4017 * l2 - 799 * f2 + 2048 >> 12, f2 = d2, p2[0 + t4] = o3 + h2, p2[56 + t4] = o3 - h2, p2[8 + t4] = s3 + f2, p2[48 + t4] = s3 - f2, p2[16 + t4] = a3 + l2, p2[40 + t4] = a3 - l2, p2[24 + t4] = u3 + c2, p2[32 + t4] = u3 - c2) : (d2 = 5793 * n3[y2 + 0] + 8192 >> 14, p2[0 + t4] = d2, p2[8 + t4] = d2, p2[16 + t4] = d2, p2[24 + t4] = d2, p2[32 + t4] = d2, p2[40 + t4] = d2, p2[48 + t4] = d2, p2[56 + t4] = d2);
            }
            for (y2 = 0; y2 < 64; ++y2) {
              const t4 = 128 + (p2[y2] + 8 >> 4);
              r3[y2] = t4 < 0 ? 0 : t4 > 255 ? 255 : t4;
            }
          }
          for (let t3 = 0; t3 < i2; t3++) {
            const i3 = t3 << 3;
            for (let t4 = 0; t4 < 8; t4++) r2.push(new Uint8Array(o2));
            for (let o3 = 0; o3 < n2; o3++) {
              u2(e2.blocks[t3][o3], a2, s2);
              let n3 = 0;
              const c2 = o3 << 3;
              for (let t4 = 0; t4 < 8; t4++) {
                const e3 = r2[i3 + t4];
                for (let t5 = 0; t5 < 8; t5++) e3[c2 + t5] = a2[n3++];
              }
            }
          }
          return r2;
        }
        class M {
          constructor() {
            this.jfif = null, this.adobe = null, this.quantizationTables = [], this.huffmanTablesAC = [], this.huffmanTablesDC = [], this.resetFrames();
          }
          resetFrames() {
            this.frames = [];
          }
          parse(t2) {
            let e2 = 0;
            function r2() {
              const r3 = t2[e2] << 8 | t2[e2 + 1];
              return e2 += 2, r3;
            }
            function n2() {
              const n3 = r2(), i3 = t2.subarray(e2, e2 + n3 - 2);
              return e2 += i3.length, i3;
            }
            function i2(t3) {
              let e3, r3, n3 = 0, i3 = 0;
              for (r3 in t3.components) t3.components.hasOwnProperty(r3) && (e3 = t3.components[r3], n3 < e3.h && (n3 = e3.h), i3 < e3.v && (i3 = e3.v));
              const o3 = Math.ceil(t3.samplesPerLine / 8 / n3), s2 = Math.ceil(t3.scanLines / 8 / i3);
              for (r3 in t3.components) if (t3.components.hasOwnProperty(r3)) {
                e3 = t3.components[r3];
                const a2 = Math.ceil(Math.ceil(t3.samplesPerLine / 8) * e3.h / n3), u2 = Math.ceil(Math.ceil(t3.scanLines / 8) * e3.v / i3), c2 = o3 * e3.h, l2 = s2 * e3.v, f2 = [];
                for (let t4 = 0; t4 < l2; t4++) {
                  const t5 = [];
                  for (let e4 = 0; e4 < c2; e4++) t5.push(new Int32Array(64));
                  f2.push(t5);
                }
                e3.blocksPerLine = a2, e3.blocksPerColumn = u2, e3.blocks = f2;
              }
              t3.maxH = n3, t3.maxV = i3, t3.mcusPerLine = o3, t3.mcusPerColumn = s2;
            }
            let o2 = r2();
            if (65496 !== o2) throw new Error("SOI not found");
            for (o2 = r2(); 65497 !== o2; ) {
              switch (o2) {
                case 65280:
                  break;
                case 65504:
                case 65505:
                case 65506:
                case 65507:
                case 65508:
                case 65509:
                case 65510:
                case 65511:
                case 65512:
                case 65513:
                case 65514:
                case 65515:
                case 65516:
                case 65517:
                case 65518:
                case 65519:
                case 65534: {
                  const t3 = n2();
                  65504 === o2 && 74 === t3[0] && 70 === t3[1] && 73 === t3[2] && 70 === t3[3] && 0 === t3[4] && (this.jfif = { version: { major: t3[5], minor: t3[6] }, densityUnits: t3[7], xDensity: t3[8] << 8 | t3[9], yDensity: t3[10] << 8 | t3[11], thumbWidth: t3[12], thumbHeight: t3[13], thumbData: t3.subarray(14, 14 + 3 * t3[12] * t3[13]) }), 65518 === o2 && 65 === t3[0] && 100 === t3[1] && 111 === t3[2] && 98 === t3[3] && 101 === t3[4] && 0 === t3[5] && (this.adobe = { version: t3[6], flags0: t3[7] << 8 | t3[8], flags1: t3[9] << 8 | t3[10], transformCode: t3[11] });
                  break;
                }
                case 65499: {
                  const n3 = r2() + e2 - 2;
                  for (; e2 < n3; ) {
                    const n4 = t2[e2++], i3 = new Int32Array(64);
                    if (n4 >> 4 == 0) for (let r3 = 0; r3 < 64; r3++) {
                      i3[P[r3]] = t2[e2++];
                    }
                    else {
                      if (n4 >> 4 != 1) throw new Error("DQT: invalid table spec");
                      for (let t3 = 0; t3 < 64; t3++) {
                        i3[P[t3]] = r2();
                      }
                    }
                    this.quantizationTables[15 & n4] = i3;
                  }
                  break;
                }
                case 65472:
                case 65473:
                case 65474: {
                  r2();
                  const n3 = { extended: 65473 === o2, progressive: 65474 === o2, precision: t2[e2++], scanLines: r2(), samplesPerLine: r2(), components: {}, componentsOrder: [] }, s2 = t2[e2++];
                  let a2;
                  for (let r3 = 0; r3 < s2; r3++) {
                    a2 = t2[e2];
                    const r4 = t2[e2 + 1] >> 4, i3 = 15 & t2[e2 + 1], o3 = t2[e2 + 2];
                    n3.componentsOrder.push(a2), n3.components[a2] = { h: r4, v: i3, quantizationIdx: o3 }, e2 += 3;
                  }
                  i2(n3), this.frames.push(n3);
                  break;
                }
                case 65476: {
                  const n3 = r2();
                  for (let r3 = 2; r3 < n3; ) {
                    const n4 = t2[e2++], i3 = new Uint8Array(16);
                    let o3 = 0;
                    for (let r4 = 0; r4 < 16; r4++, e2++) i3[r4] = t2[e2], o3 += i3[r4];
                    const s2 = new Uint8Array(o3);
                    for (let r4 = 0; r4 < o3; r4++, e2++) s2[r4] = t2[e2];
                    r3 += 17 + o3, n4 >> 4 == 0 ? this.huffmanTablesDC[15 & n4] = I(i3, s2) : this.huffmanTablesAC[15 & n4] = I(i3, s2);
                  }
                  break;
                }
                case 65501:
                  r2(), this.resetInterval = r2();
                  break;
                case 65498: {
                  r2();
                  const n3 = t2[e2++], i3 = [], o3 = this.frames[0];
                  for (let r3 = 0; r3 < n3; r3++) {
                    const r4 = o3.components[t2[e2++]], n4 = t2[e2++];
                    r4.huffmanTableDC = this.huffmanTablesDC[n4 >> 4], r4.huffmanTableAC = this.huffmanTablesAC[15 & n4], i3.push(r4);
                  }
                  const s2 = t2[e2++], a2 = t2[e2++], u2 = t2[e2++], c2 = R(t2, e2, o3, i3, this.resetInterval, s2, a2, u2 >> 4, 15 & u2);
                  e2 += c2;
                  break;
                }
                case 65535:
                  255 !== t2[e2] && e2--;
                  break;
                default:
                  if (255 === t2[e2 - 3] && t2[e2 - 2] >= 192 && t2[e2 - 2] <= 254) {
                    e2 -= 3;
                    break;
                  }
                  throw new Error("unknown JPEG marker " + o2.toString(16));
              }
              o2 = r2();
            }
          }
          getResult() {
            const { frames: t2 } = this;
            if (0 === this.frames.length) throw new Error("no frames were decoded");
            this.frames.length > 1 && console.warn("more than one frame is not supported");
            for (let t3 = 0; t3 < this.frames.length; t3++) {
              const e3 = this.frames[t3].components;
              for (const t4 of Object.keys(e3)) e3[t4].quantizationTable = this.quantizationTables[e3[t4].quantizationIdx], delete e3[t4].quantizationIdx;
            }
            const e2 = t2[0], { components: r2, componentsOrder: n2 } = e2, i2 = [], o2 = e2.samplesPerLine, s2 = e2.scanLines;
            for (let t3 = 0; t3 < n2.length; t3++) {
              const o3 = r2[n2[t3]];
              i2.push({ lines: j(0, o3), scaleX: o3.h / e2.maxH, scaleY: o3.v / e2.maxV });
            }
            const a2 = new Uint8Array(o2 * s2 * i2.length);
            let u2 = 0;
            for (let t3 = 0; t3 < s2; ++t3) for (let e3 = 0; e3 < o2; ++e3) for (let r3 = 0; r3 < i2.length; ++r3) {
              const n3 = i2[r3];
              a2[u2] = n3.lines[0 | t3 * n3.scaleY][0 | e3 * n3.scaleX], ++u2;
            }
            return a2;
          }
        }
        class L extends E {
          constructor(t2) {
            super(), this.reader = new M(), t2.JPEGTables && this.reader.parse(t2.JPEGTables);
          }
          decodeBlock(t2) {
            return this.reader.resetFrames(), this.reader.parse(new Uint8Array(t2)), this.reader.getResult().buffer;
          }
        }
        var F = r(102);
        class N extends E {
          decodeBlock(t2) {
            return Object(F.inflate)(new Uint8Array(t2)).buffer;
          }
        }
        class D extends E {
          decodeBlock(t2) {
            const e2 = new DataView(t2), r2 = [];
            for (let n2 = 0; n2 < t2.byteLength; ++n2) {
              let t3 = e2.getInt8(n2);
              if (t3 < 0) {
                const i2 = e2.getUint8(n2 + 1);
                t3 = -t3;
                for (let e3 = 0; e3 <= t3; ++e3) r2.push(i2);
                n2 += 1;
              } else {
                for (let i2 = 0; i2 <= t3; ++i2) r2.push(e2.getUint8(n2 + i2 + 1));
                n2 += t3 + 1;
              }
            }
            return new Uint8Array(r2).buffer;
          }
        }
        function U(t2) {
          switch (t2.Compression) {
            case void 0:
            case 1:
              return new k();
            case 5:
              return new C();
            case 6:
              throw new Error("old style JPEG compression is not supported.");
            case 7:
              return new L(t2);
            case 8:
            case 32946:
              return new N();
            case 32773:
              return new D();
            default:
              throw new Error("Unknown compression method identifier: " + t2.Compression);
          }
        }
        function B(t2, e2, r2, n2 = 1) {
          return new (Object.getPrototypeOf(t2)).constructor(e2 * r2 * n2);
        }
        function G(t2, e2, r2) {
          return (1 - r2) * t2 + r2 * e2;
        }
        function q(t2, e2, r2, n2, i2, o2 = "nearest") {
          switch (o2.toLowerCase()) {
            case "nearest":
              return (function(t3, e3, r3, n3, i3) {
                const o3 = e3 / n3, s2 = r3 / i3;
                return t3.map((t4) => {
                  const a2 = B(t4, n3, i3);
                  for (let u2 = 0; u2 < i3; ++u2) {
                    const i4 = Math.min(Math.round(s2 * u2), r3 - 1);
                    for (let r4 = 0; r4 < n3; ++r4) {
                      const s3 = Math.min(Math.round(o3 * r4), e3 - 1), c2 = t4[i4 * e3 + s3];
                      a2[u2 * n3 + r4] = c2;
                    }
                  }
                  return a2;
                });
              })(t2, e2, r2, n2, i2);
            case "bilinear":
            case "linear":
              return (function(t3, e3, r3, n3, i3) {
                const o3 = e3 / n3, s2 = r3 / i3;
                return t3.map((t4) => {
                  const a2 = B(t4, n3, i3);
                  for (let u2 = 0; u2 < i3; ++u2) {
                    const i4 = s2 * u2, c2 = Math.floor(i4), l2 = Math.min(Math.ceil(i4), r3 - 1);
                    for (let r4 = 0; r4 < n3; ++r4) {
                      const s3 = o3 * r4, f2 = s3 % 1, h2 = Math.floor(s3), d2 = Math.min(Math.ceil(s3), e3 - 1), p2 = t4[c2 * e3 + h2], y2 = t4[c2 * e3 + d2], g2 = t4[l2 * e3 + h2], m2 = t4[l2 * e3 + d2], b2 = G(G(p2, y2, f2), G(g2, m2, f2), i4 % 1);
                      a2[u2 * n3 + r4] = b2;
                    }
                  }
                  return a2;
                });
              })(t2, e2, r2, n2, i2);
            default:
              throw new Error(`Unsupported resampling method: '${o2}'`);
          }
        }
        function z(t2, e2, r2, n2, i2, o2, s2 = "nearest") {
          switch (s2.toLowerCase()) {
            case "nearest":
              return (function(t3, e3, r3, n3, i3, o3) {
                const s3 = e3 / n3, a2 = r3 / i3, u2 = B(t3, n3, i3, o3);
                for (let c2 = 0; c2 < i3; ++c2) {
                  const i4 = Math.min(Math.round(a2 * c2), r3 - 1);
                  for (let r4 = 0; r4 < n3; ++r4) {
                    const a3 = Math.min(Math.round(s3 * r4), e3 - 1);
                    for (let s4 = 0; s4 < o3; ++s4) {
                      const l2 = t3[i4 * e3 * o3 + a3 * o3 + s4];
                      u2[c2 * n3 * o3 + r4 * o3 + s4] = l2;
                    }
                  }
                }
                return u2;
              })(t2, e2, r2, n2, i2, o2);
            case "bilinear":
            case "linear":
              return (function(t3, e3, r3, n3, i3, o3) {
                const s3 = e3 / n3, a2 = r3 / i3, u2 = B(t3, n3, i3, o3);
                for (let c2 = 0; c2 < i3; ++c2) {
                  const i4 = a2 * c2, l2 = Math.floor(i4), f2 = Math.min(Math.ceil(i4), r3 - 1);
                  for (let r4 = 0; r4 < n3; ++r4) {
                    const a3 = s3 * r4, h2 = a3 % 1, d2 = Math.floor(a3), p2 = Math.min(Math.ceil(a3), e3 - 1);
                    for (let s4 = 0; s4 < o3; ++s4) {
                      const a4 = t3[l2 * e3 * o3 + d2 * o3 + s4], y2 = t3[l2 * e3 * o3 + p2 * o3 + s4], g2 = t3[f2 * e3 * o3 + d2 * o3 + s4], m2 = t3[f2 * e3 * o3 + p2 * o3 + s4], b2 = G(G(a4, y2, h2), G(g2, m2, h2), i4 % 1);
                      u2[c2 * n3 * o3 + r4 * o3 + s4] = b2;
                    }
                  }
                }
                return u2;
              })(t2, e2, r2, n2, i2, o2);
            default:
              throw new Error(`Unsupported resampling method: '${s2}'`);
          }
        }
        function H(t2, e2, r2) {
          let n2 = 0;
          for (let i2 = e2; i2 < r2; ++i2) n2 += t2[i2];
          return n2;
        }
        function W(t2, e2, r2) {
          switch (t2) {
            case 1:
              switch (e2) {
                case 8:
                  return new Uint8Array(r2);
                case 16:
                  return new Uint16Array(r2);
                case 32:
                  return new Uint32Array(r2);
              }
              break;
            case 2:
              switch (e2) {
                case 8:
                  return new Int8Array(r2);
                case 16:
                  return new Int16Array(r2);
                case 32:
                  return new Int32Array(r2);
              }
              break;
            case 3:
              switch (e2) {
                case 32:
                  return new Float32Array(r2);
                case 64:
                  return new Float64Array(r2);
              }
          }
          throw Error("Unsupported data format/bitsPerSample");
        }
        var V = class {
          constructor(t2, e2, r2, n2, i2, o2) {
            this.fileDirectory = t2, this.geoKeys = e2, this.dataView = r2, this.littleEndian = n2, this.tiles = i2 ? {} : null, this.isTiled = !t2.StripOffsets;
            const s2 = t2.PlanarConfiguration;
            if (this.planarConfiguration = void 0 === s2 ? 1 : s2, 1 !== this.planarConfiguration && 2 !== this.planarConfiguration) throw new Error("Invalid planar configuration.");
            this.source = o2;
          }
          getFileDirectory() {
            return this.fileDirectory;
          }
          getGeoKeys() {
            return this.geoKeys;
          }
          getWidth() {
            return this.fileDirectory.ImageWidth;
          }
          getHeight() {
            return this.fileDirectory.ImageLength;
          }
          getSamplesPerPixel() {
            return this.fileDirectory.SamplesPerPixel;
          }
          getTileWidth() {
            return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
          }
          getTileHeight() {
            return this.isTiled ? this.fileDirectory.TileLength : void 0 !== this.fileDirectory.RowsPerStrip ? Math.min(this.fileDirectory.RowsPerStrip, this.getHeight()) : this.getHeight();
          }
          getBytesPerPixel() {
            let t2 = 0;
            for (let e2 = 0; e2 < this.fileDirectory.BitsPerSample.length; ++e2) {
              const r2 = this.fileDirectory.BitsPerSample[e2];
              if (r2 % 8 != 0) throw new Error(`Sample bit-width of ${r2} is not supported.`);
              if (r2 !== this.fileDirectory.BitsPerSample[0]) throw new Error("Differing size of samples in a pixel are not supported.");
              t2 += r2;
            }
            return t2 / 8;
          }
          getSampleByteSize(t2) {
            if (t2 >= this.fileDirectory.BitsPerSample.length) throw new RangeError(`Sample index ${t2} is out of range.`);
            const e2 = this.fileDirectory.BitsPerSample[t2];
            if (e2 % 8 != 0) throw new Error(`Sample bit-width of ${e2} is not supported.`);
            return e2 / 8;
          }
          getReaderForSample(t2) {
            const e2 = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[t2] : 1, r2 = this.fileDirectory.BitsPerSample[t2];
            switch (e2) {
              case 1:
                switch (r2) {
                  case 8:
                    return DataView.prototype.getUint8;
                  case 16:
                    return DataView.prototype.getUint16;
                  case 32:
                    return DataView.prototype.getUint32;
                }
                break;
              case 2:
                switch (r2) {
                  case 8:
                    return DataView.prototype.getInt8;
                  case 16:
                    return DataView.prototype.getInt16;
                  case 32:
                    return DataView.prototype.getInt32;
                }
                break;
              case 3:
                switch (r2) {
                  case 32:
                    return DataView.prototype.getFloat32;
                  case 64:
                    return DataView.prototype.getFloat64;
                }
            }
            throw Error("Unsupported data format/bitsPerSample");
          }
          getArrayForSample(t2, e2) {
            return W(this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[t2] : 1, this.fileDirectory.BitsPerSample[t2], e2);
          }
          async getTileOrStrip(t2, e2, r2, n2) {
            const i2 = Math.ceil(this.getWidth() / this.getTileWidth()), o2 = Math.ceil(this.getHeight() / this.getTileHeight());
            let s2;
            const { tiles: a2 } = this;
            let u2, c2;
            1 === this.planarConfiguration ? s2 = e2 * i2 + t2 : 2 === this.planarConfiguration && (s2 = r2 * i2 * o2 + e2 * i2 + t2), this.isTiled ? (u2 = this.fileDirectory.TileOffsets[s2], c2 = this.fileDirectory.TileByteCounts[s2]) : (u2 = this.fileDirectory.StripOffsets[s2], c2 = this.fileDirectory.StripByteCounts[s2]);
            const l2 = await this.source.fetch(u2, c2);
            let f2;
            return null === a2 ? f2 = n2.decode(this.fileDirectory, l2) : a2[s2] || (f2 = n2.decode(this.fileDirectory, l2), a2[s2] = f2), { x: t2, y: e2, sample: r2, data: await f2 };
          }
          async _readRaster(t2, e2, r2, n2, i2, o2, s2, a2) {
            const u2 = this.getTileWidth(), c2 = this.getTileHeight(), l2 = Math.max(Math.floor(t2[0] / u2), 0), f2 = Math.min(Math.ceil(t2[2] / u2), Math.ceil(this.getWidth() / this.getTileWidth())), h2 = Math.max(Math.floor(t2[1] / c2), 0), d2 = Math.min(Math.ceil(t2[3] / c2), Math.ceil(this.getHeight() / this.getTileHeight())), p2 = t2[2] - t2[0];
            let y2 = this.getBytesPerPixel();
            const g2 = [], m2 = [];
            for (let t3 = 0; t3 < e2.length; ++t3) 1 === this.planarConfiguration ? g2.push(H(this.fileDirectory.BitsPerSample, 0, e2[t3]) / 8) : g2.push(0), m2.push(this.getReaderForSample(e2[t3]));
            const b2 = [], { littleEndian: v2 } = this;
            for (let o3 = h2; o3 < d2; ++o3) for (let s3 = l2; s3 < f2; ++s3) for (let a3 = 0; a3 < e2.length; ++a3) {
              const l3 = a3, f3 = e2[a3];
              2 === this.planarConfiguration && (y2 = this.getSampleByteSize(f3));
              const h3 = this.getTileOrStrip(s3, o3, f3, i2);
              b2.push(h3), h3.then((i3) => {
                const o4 = i3.data, s4 = new DataView(o4), a4 = i3.y * c2, f4 = i3.x * u2, h4 = (i3.y + 1) * c2, d3 = (i3.x + 1) * u2, b3 = m2[l3], w2 = Math.min(c2, c2 - (h4 - t2[3])), x2 = Math.min(u2, u2 - (d3 - t2[2]));
                for (let i4 = Math.max(0, t2[1] - a4); i4 < w2; ++i4) for (let o5 = Math.max(0, t2[0] - f4); o5 < x2; ++o5) {
                  const c3 = (i4 * u2 + o5) * y2, h5 = b3.call(s4, c3 + g2[l3], v2);
                  let d4;
                  n2 ? (d4 = (i4 + a4 - t2[1]) * p2 * e2.length + (o5 + f4 - t2[0]) * e2.length + l3, r2[d4] = h5) : (d4 = (i4 + a4 - t2[1]) * p2 + o5 + f4 - t2[0], r2[l3][d4] = h5);
                }
              });
            }
            if (await Promise.all(b2), o2 && t2[2] - t2[0] !== o2 || s2 && t2[3] - t2[1] !== s2) {
              let i3;
              return i3 = n2 ? z(r2, t2[2] - t2[0], t2[3] - t2[1], o2, s2, e2.length, a2) : q(r2, t2[2] - t2[0], t2[3] - t2[1], o2, s2, a2), i3.width = o2, i3.height = s2, i3;
            }
            return r2.width = o2 || t2[2] - t2[0], r2.height = s2 || t2[3] - t2[1], r2;
          }
          async readRasters({ window: t2, samples: e2 = [], interleave: r2, pool: n2 = null, width: i2, height: o2, resampleMethod: s2, fillValue: a2 } = {}) {
            const u2 = t2 || [0, 0, this.getWidth(), this.getHeight()];
            if (u2[0] > u2[2] || u2[1] > u2[3]) throw new Error("Invalid subsets");
            const c2 = (u2[2] - u2[0]) * (u2[3] - u2[1]);
            if (e2 && e2.length) {
              for (let t3 = 0; t3 < e2.length; ++t3) if (e2[t3] >= this.fileDirectory.SamplesPerPixel) return Promise.reject(new RangeError(`Invalid sample index '${e2[t3]}'.`));
            } else for (let t3 = 0; t3 < this.fileDirectory.SamplesPerPixel; ++t3) e2.push(t3);
            let l2;
            if (r2) {
              l2 = W(this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, Math.max.apply(null, this.fileDirectory.BitsPerSample), c2 * e2.length), a2 && l2.fill(a2);
            } else {
              l2 = [];
              for (let t3 = 0; t3 < e2.length; ++t3) {
                const r3 = this.getArrayForSample(e2[t3], c2);
                Array.isArray(a2) && t3 < a2.length ? r3.fill(a2[t3]) : a2 && !Array.isArray(a2) && r3.fill(a2), l2.push(r3);
              }
            }
            const f2 = n2 || U(this.fileDirectory);
            return await this._readRaster(u2, e2, l2, r2, f2, i2, o2, s2);
          }
          async readRGB({ window: t2, pool: e2 = null, width: r2, height: n2, resampleMethod: i2, enableAlpha: o2 = false } = {}) {
            const s2 = t2 || [0, 0, this.getWidth(), this.getHeight()];
            if (s2[0] > s2[2] || s2[1] > s2[3]) throw new Error("Invalid subsets");
            const a2 = this.fileDirectory.PhotometricInterpretation;
            if (a2 === d.RGB) {
              let i3 = [0, 1, 2];
              if (this.fileDirectory.ExtraSamples !== p.Unspecified && o2) {
                i3 = [];
                for (let t3 = 0; t3 < this.fileDirectory.BitsPerSample.length; t3 += 1) i3.push(t3);
              }
              return this.readRasters({ window: t2, interleave: true, samples: i3, pool: e2, width: r2, height: n2 });
            }
            let u2;
            switch (a2) {
              case d.WhiteIsZero:
              case d.BlackIsZero:
              case d.Palette:
                u2 = [0];
                break;
              case d.CMYK:
                u2 = [0, 1, 2, 3];
                break;
              case d.YCbCr:
              case d.CIELab:
                u2 = [0, 1, 2];
                break;
              default:
                throw new Error("Invalid or unsupported photometric interpretation.");
            }
            const c2 = { window: s2, interleave: true, samples: u2, pool: e2, width: r2, height: n2, resampleMethod: i2 }, { fileDirectory: l2 } = this, f2 = await this.readRasters(c2), h2 = 2 ** this.fileDirectory.BitsPerSample[0];
            let y2;
            switch (a2) {
              case d.WhiteIsZero:
                y2 = m(f2, h2);
                break;
              case d.BlackIsZero:
                y2 = b(f2, h2);
                break;
              case d.Palette:
                y2 = v(f2, l2.ColorMap);
                break;
              case d.CMYK:
                y2 = w(f2);
                break;
              case d.YCbCr:
                y2 = x(f2);
                break;
              case d.CIELab:
                y2 = _(f2);
                break;
              default:
                throw new Error("Unsupported photometric interpretation.");
            }
            return y2.width = f2.width, y2.height = f2.height, y2;
          }
          getTiePoints() {
            if (!this.fileDirectory.ModelTiepoint) return [];
            const t2 = [];
            for (let e2 = 0; e2 < this.fileDirectory.ModelTiepoint.length; e2 += 6) t2.push({ i: this.fileDirectory.ModelTiepoint[e2], j: this.fileDirectory.ModelTiepoint[e2 + 1], k: this.fileDirectory.ModelTiepoint[e2 + 2], x: this.fileDirectory.ModelTiepoint[e2 + 3], y: this.fileDirectory.ModelTiepoint[e2 + 4], z: this.fileDirectory.ModelTiepoint[e2 + 5] });
            return t2;
          }
          getGDALMetadata(t2 = null) {
            const e2 = {};
            if (!this.fileDirectory.GDAL_METADATA) return null;
            const r2 = this.fileDirectory.GDAL_METADATA, n2 = s()(r2.substring(0, r2.length - 1));
            if (!n2[0].tagName) throw new Error("Failed to parse GDAL metadata XML.");
            const i2 = n2[0];
            if ("GDALMetadata" !== i2.tagName) throw new Error("Unexpected GDAL metadata XML tag.");
            let o2 = i2.children.filter((t3) => "Item" === t3.tagName);
            t2 && (o2 = o2.filter((e3) => Number(e3.attributes.sample) === t2));
            for (let t3 = 0; t3 < o2.length; ++t3) {
              const r3 = o2[t3];
              e2[r3.attributes.name] = r3.children[0];
            }
            return e2;
          }
          getGDALNoData() {
            if (!this.fileDirectory.GDAL_NODATA) return null;
            const t2 = this.fileDirectory.GDAL_NODATA;
            return Number(t2.substring(0, t2.length - 1));
          }
          getOrigin() {
            const t2 = this.fileDirectory.ModelTiepoint, e2 = this.fileDirectory.ModelTransformation;
            if (t2 && 6 === t2.length) return [t2[3], t2[4], t2[5]];
            if (e2) return [e2[3], e2[7], e2[11]];
            throw new Error("The image does not have an affine transformation.");
          }
          getResolution(t2 = null) {
            const e2 = this.fileDirectory.ModelPixelScale, r2 = this.fileDirectory.ModelTransformation;
            if (e2) return [e2[0], -e2[1], e2[2]];
            if (r2) return [r2[0], r2[5], r2[10]];
            if (t2) {
              const [e3, r3, n2] = t2.getResolution();
              return [e3 * t2.getWidth() / this.getWidth(), r3 * t2.getHeight() / this.getHeight(), n2 * t2.getWidth() / this.getWidth()];
            }
            throw new Error("The image does not have an affine transformation.");
          }
          pixelIsArea() {
            return 1 === this.geoKeys.GTRasterTypeGeoKey;
          }
          getBoundingBox() {
            const t2 = this.getOrigin(), e2 = this.getResolution(), r2 = t2[0], n2 = t2[1], i2 = r2 + e2[0] * this.getWidth(), o2 = n2 + e2[1] * this.getHeight();
            return [Math.min(r2, i2), Math.min(n2, o2), Math.max(r2, i2), Math.max(n2, o2)];
          }
        };
        class $ {
          constructor(t2) {
            this._dataView = new DataView(t2);
          }
          get buffer() {
            return this._dataView.buffer;
          }
          getUint64(t2, e2) {
            const r2 = this.getUint32(t2, e2), n2 = this.getUint32(t2 + 4, e2);
            let i2;
            if (e2) {
              if (i2 = r2 + 2 ** 32 * n2, !Number.isSafeInteger(i2)) throw new Error(i2 + " exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");
              return i2;
            }
            if (i2 = 2 ** 32 * r2 + n2, !Number.isSafeInteger(i2)) throw new Error(i2 + " exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");
            return i2;
          }
          getInt64(t2, e2) {
            let r2 = 0;
            const n2 = (128 & this._dataView.getUint8(t2 + (e2 ? 7 : 0))) > 0;
            let i2 = true;
            for (let o2 = 0; o2 < 8; o2++) {
              let s2 = this._dataView.getUint8(t2 + (e2 ? o2 : 7 - o2));
              n2 && (i2 ? 0 !== s2 && (s2 = 255 & ~(s2 - 1), i2 = false) : s2 = 255 & ~s2), r2 += s2 * 256 ** o2;
            }
            return n2 && (r2 = -r2), r2;
          }
          getUint8(t2, e2) {
            return this._dataView.getUint8(t2, e2);
          }
          getInt8(t2, e2) {
            return this._dataView.getInt8(t2, e2);
          }
          getUint16(t2, e2) {
            return this._dataView.getUint16(t2, e2);
          }
          getInt16(t2, e2) {
            return this._dataView.getInt16(t2, e2);
          }
          getUint32(t2, e2) {
            return this._dataView.getUint32(t2, e2);
          }
          getInt32(t2, e2) {
            return this._dataView.getInt32(t2, e2);
          }
          getFloat32(t2, e2) {
            return this._dataView.getFloat32(t2, e2);
          }
          getFloat64(t2, e2) {
            return this._dataView.getFloat64(t2, e2);
          }
        }
        class K {
          constructor(t2, e2, r2, n2) {
            this._dataView = new DataView(t2), this._sliceOffset = e2, this._littleEndian = r2, this._bigTiff = n2;
          }
          get sliceOffset() {
            return this._sliceOffset;
          }
          get sliceTop() {
            return this._sliceOffset + this.buffer.byteLength;
          }
          get littleEndian() {
            return this._littleEndian;
          }
          get bigTiff() {
            return this._bigTiff;
          }
          get buffer() {
            return this._dataView.buffer;
          }
          covers(t2, e2) {
            return this.sliceOffset <= t2 && this.sliceTop >= t2 + e2;
          }
          readUint8(t2) {
            return this._dataView.getUint8(t2 - this._sliceOffset, this._littleEndian);
          }
          readInt8(t2) {
            return this._dataView.getInt8(t2 - this._sliceOffset, this._littleEndian);
          }
          readUint16(t2) {
            return this._dataView.getUint16(t2 - this._sliceOffset, this._littleEndian);
          }
          readInt16(t2) {
            return this._dataView.getInt16(t2 - this._sliceOffset, this._littleEndian);
          }
          readUint32(t2) {
            return this._dataView.getUint32(t2 - this._sliceOffset, this._littleEndian);
          }
          readInt32(t2) {
            return this._dataView.getInt32(t2 - this._sliceOffset, this._littleEndian);
          }
          readFloat32(t2) {
            return this._dataView.getFloat32(t2 - this._sliceOffset, this._littleEndian);
          }
          readFloat64(t2) {
            return this._dataView.getFloat64(t2 - this._sliceOffset, this._littleEndian);
          }
          readUint64(t2) {
            const e2 = this.readUint32(t2), r2 = this.readUint32(t2 + 4);
            let n2;
            if (this._littleEndian) {
              if (n2 = e2 + 2 ** 32 * r2, !Number.isSafeInteger(n2)) throw new Error(n2 + " exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");
              return n2;
            }
            if (n2 = 2 ** 32 * e2 + r2, !Number.isSafeInteger(n2)) throw new Error(n2 + " exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");
            return n2;
          }
          readInt64(t2) {
            let e2 = 0;
            const r2 = (128 & this._dataView.getUint8(t2 + (this._littleEndian ? 7 : 0))) > 0;
            let n2 = true;
            for (let i2 = 0; i2 < 8; i2++) {
              let o2 = this._dataView.getUint8(t2 + (this._littleEndian ? i2 : 7 - i2));
              r2 && (n2 ? 0 !== o2 && (o2 = 255 & ~(o2 - 1), n2 = false) : o2 = 255 & ~o2), e2 += o2 * 256 ** i2;
            }
            return r2 && (e2 = -e2), e2;
          }
          readOffset(t2) {
            return this._bigTiff ? this.readUint64(t2) : this.readUint32(t2);
          }
        }
        var Y = r(68), Z = r(7), X = r(25), Q = r(40), J = r.n(Q), tt = r(106), et = r.n(tt), rt = r(39), nt = r.n(rt);
        class it {
          constructor(t2, { blockSize: e2 = 65536 } = {}) {
            this.retrievalFunction = t2, this.blockSize = e2, this.blockRequests = /* @__PURE__ */ new Map(), this.blocks = /* @__PURE__ */ new Map(), this.blockIdsAwaitingRequest = null;
          }
          async fetch(t2, e2, r2 = false) {
            const n2 = t2 + e2, i2 = [], o2 = [], s2 = [];
            for (let e3 = Math.floor(t2 / this.blockSize) * this.blockSize; e3 < n2; e3 += this.blockSize) {
              const t3 = Math.floor(e3 / this.blockSize);
              this.blocks.has(t3) || this.blockRequests.has(t3) || o2.push(t3), this.blockRequests.has(t3) && s2.push(this.blockRequests.get(t3)), i2.push(t3);
            }
            if (this.blockIdsAwaitingRequest) for (let t3 = 0; t3 < o2.length; ++t3) {
              const e3 = o2[t3];
              this.blockIdsAwaitingRequest.add(e3);
            }
            else this.blockIdsAwaitingRequest = new Set(o2);
            if (r2 || await (async function(t3) {
              return new Promise((e3) => setTimeout(e3, t3));
            })(), this.blockIdsAwaitingRequest) {
              const t3 = (function(t4) {
                if (0 === t4.length) return [];
                const e3 = [];
                let r3 = [];
                e3.push(r3);
                for (let n3 = 0; n3 < t4.length; ++n3) 0 === n3 || t4[n3] === t4[n3 - 1] + 1 ? r3.push(t4[n3]) : (r3 = [t4[n3]], e3.push(r3));
                return e3;
              })(Array.from(this.blockIdsAwaitingRequest).sort());
              for (const e3 of t3) {
                const t4 = this.requestData(e3[0] * this.blockSize, e3.length * this.blockSize);
                for (let r3 = 0; r3 < e3.length; ++r3) {
                  const n3 = e3[r3];
                  this.blockRequests.set(n3, (async () => {
                    const e4 = await t4, i3 = r3 * this.blockSize, o3 = Math.min(i3 + this.blockSize, e4.data.byteLength), s3 = e4.data.slice(i3, o3);
                    this.blockRequests.delete(n3), this.blocks.set(n3, { data: s3, offset: e4.offset + i3, length: s3.byteLength, top: e4.offset + o3 });
                  })());
                }
              }
              this.blockIdsAwaitingRequest = null;
            }
            const a2 = [];
            for (const t3 of o2) this.blockRequests.has(t3) && a2.push(this.blockRequests.get(t3));
            await Promise.all(a2), await Promise.all(s2);
            return (function(t3, e3, r3) {
              const n3 = e3 + r3, i3 = new ArrayBuffer(r3), o3 = new Uint8Array(i3);
              for (const r4 of t3) {
                const t4 = r4.offset - e3, i4 = r4.top - n3;
                let s3, a3 = 0, u2 = 0;
                t4 < 0 ? a3 = -t4 : t4 > 0 && (u2 = t4), s3 = i4 < 0 ? r4.length - a3 : n3 - r4.offset - a3;
                const c2 = new Uint8Array(r4.data, a3, s3);
                o3.set(c2, u2);
              }
              return i3;
            })(i2.map((t3) => this.blocks.get(t3)), t2, e2);
          }
          async requestData(t2, e2) {
            const r2 = await this.retrievalFunction(t2, e2);
            return r2.length ? r2.length !== r2.data.byteLength && (r2.data = r2.data.slice(0, r2.length)) : r2.length = r2.data.byteLength, r2.top = r2.offset + r2.length, r2;
          }
        }
        function ot(t2, e2) {
          const { forceXHR: r2 } = e2;
          if ("function" == typeof fetch && !r2) return (function(t3, { headers: e3 = {}, blockSize: r3 } = {}) {
            return new it(async (r4, n2) => {
              const i2 = await fetch(t3, { headers: { ...e3, Range: `bytes=${r4}-${r4 + n2 - 1}` } });
              if (i2.ok) {
                if (206 === i2.status) {
                  return { data: i2.arrayBuffer ? await i2.arrayBuffer() : (await i2.buffer()).buffer, offset: r4, length: n2 };
                }
                {
                  const t4 = i2.arrayBuffer ? await i2.arrayBuffer() : (await i2.buffer()).buffer;
                  return { data: t4, offset: 0, length: t4.byteLength };
                }
              }
              throw new Error("Error fetching data.");
            }, { blockSize: r3 });
          })(t2, e2);
          if ("undefined" != typeof XMLHttpRequest) return (function(t3, { headers: e3 = {}, blockSize: r3 } = {}) {
            return new it(async (r4, n2) => new Promise((i2, o2) => {
              const s2 = new XMLHttpRequest();
              s2.open("GET", t3), s2.responseType = "arraybuffer";
              const a2 = { ...e3, Range: `bytes=${r4}-${r4 + n2 - 1}` };
              for (const [t4, e4] of Object.entries(a2)) s2.setRequestHeader(t4, e4);
              s2.onload = () => {
                const t4 = s2.response;
                206 === s2.status ? i2({ data: t4, offset: r4, length: n2 }) : i2({ data: t4, offset: 0, length: t4.byteLength });
              }, s2.onerror = o2, s2.send();
            }), { blockSize: r3 });
          })(t2, e2);
          if (J.a.get) return (function(t3, { headers: e3 = {}, blockSize: r3 } = {}) {
            return new it(async (r4, n2) => new Promise((i2, o2) => {
              const s2 = nt.a.parse(t3);
              ("http:" === s2.protocol ? J.a : et.a).get({ ...s2, headers: { ...e3, Range: `bytes=${r4}-${r4 + n2 - 1}` } }, (t4) => {
                const e4 = [];
                t4.on("data", (t5) => {
                  e4.push(t5);
                }), t4.on("end", () => {
                  const t5 = Z.Buffer.concat(e4).buffer;
                  i2({ data: t5, offset: r4, length: t5.byteLength });
                });
              }).on("error", o2);
            }), { blockSize: r3 });
          })(t2, e2);
          throw new Error("No remote source available");
        }
        function st(t2) {
          const e2 = (function(t3, e3, r2) {
            return new Promise((n2, i2) => {
              Object(X.open)(t3, e3, r2, (t4, e4) => {
                t4 ? i2(t4) : n2(e4);
              });
            });
          })(t2, "r");
          return { async fetch(t3, r2) {
            const n2 = await e2, { buffer: i2 } = await (function(...t4) {
              return new Promise((e3, r3) => {
                Object(X.read)(...t4, (t5, n3, i3) => {
                  t5 ? r3(t5) : e3({ bytesRead: n3, buffer: i3 });
                });
              });
            })(n2, Z.Buffer.alloc(r2), 0, r2, t3);
            return i2.buffer;
          }, async close() {
            const t3 = await e2;
            return await (function(t4) {
              return new Promise((e3, r2) => {
                Object(X.close)(t4, (t5) => {
                  t5 ? r2(t5) : e3();
                });
              });
            })(t3);
          } };
        }
        function at(t2, e2) {
          for (const r2 in e2) e2.hasOwnProperty(r2) && (t2[r2] = e2[r2]);
        }
        function ut(t2, e2) {
          if (t2.length < e2.length) return false;
          return t2.substr(t2.length - e2.length) === e2;
        }
        function ct(t2) {
          const e2 = {};
          for (const r2 in t2) if (t2.hasOwnProperty(r2)) {
            e2[t2[r2]] = r2;
          }
          return e2;
        }
        function lt(t2, e2) {
          const r2 = [];
          for (let n2 = 0; n2 < t2; n2++) r2.push(e2(n2));
          return r2;
        }
        const ft = ct(a), ht = ct(y), dt = {};
        at(dt, ft), at(dt, ht);
        const pt = ct(f), yt = { nextZero: (t2, e2) => {
          let r2 = e2;
          for (; 0 !== t2[r2]; ) r2++;
          return r2;
        }, readUshort: (t2, e2) => t2[e2] << 8 | t2[e2 + 1], readShort: (t2, e2) => {
          const r2 = yt.ui8;
          return r2[0] = t2[e2 + 1], r2[1] = t2[e2 + 0], yt.i16[0];
        }, readInt: (t2, e2) => {
          const r2 = yt.ui8;
          return r2[0] = t2[e2 + 3], r2[1] = t2[e2 + 2], r2[2] = t2[e2 + 1], r2[3] = t2[e2 + 0], yt.i32[0];
        }, readUint: (t2, e2) => {
          const r2 = yt.ui8;
          return r2[0] = t2[e2 + 3], r2[1] = t2[e2 + 2], r2[2] = t2[e2 + 1], r2[3] = t2[e2 + 0], yt.ui32[0];
        }, readASCII: (t2, e2, r2) => r2.map((r3) => String.fromCharCode(t2[e2 + r3])).join(""), readFloat: (t2, e2) => {
          const r2 = yt.ui8;
          return lt(4, (n2) => {
            r2[n2] = t2[e2 + 3 - n2];
          }), yt.fl32[0];
        }, readDouble: (t2, e2) => {
          const r2 = yt.ui8;
          return lt(8, (n2) => {
            r2[n2] = t2[e2 + 7 - n2];
          }), yt.fl64[0];
        }, writeUshort: (t2, e2, r2) => {
          t2[e2] = r2 >> 8 & 255, t2[e2 + 1] = 255 & r2;
        }, writeUint: (t2, e2, r2) => {
          t2[e2] = r2 >> 24 & 255, t2[e2 + 1] = r2 >> 16 & 255, t2[e2 + 2] = r2 >> 8 & 255, t2[e2 + 3] = r2 >> 0 & 255;
        }, writeASCII: (t2, e2, r2) => {
          lt(r2.length, (n2) => {
            t2[e2 + n2] = r2.charCodeAt(n2);
          });
        }, ui8: new Uint8Array(8) };
        yt.fl64 = new Float64Array(yt.ui8.buffer), yt.writeDouble = (t2, e2, r2) => {
          yt.fl64[0] = r2, lt(8, (r3) => {
            t2[e2 + r3] = yt.ui8[7 - r3];
          });
        };
        const gt = (t2) => {
          const e2 = new Uint8Array(1e3);
          let r2 = 4;
          const n2 = yt;
          e2[0] = 77, e2[1] = 77, e2[3] = 42;
          let i2 = 8;
          if (n2.writeUint(e2, r2, i2), r2 += 4, t2.forEach((r3, o3) => {
            const s2 = ((t3, e3, r4, n3) => {
              let i3 = r4;
              const o4 = Object.keys(n3).filter((t4) => null != t4 && "undefined" !== t4);
              t3.writeUshort(e3, i3, o4.length), i3 += 2;
              let s3 = i3 + 12 * o4.length + 4;
              for (const r5 of o4) {
                let o5 = null;
                "number" == typeof r5 ? o5 = r5 : "string" == typeof r5 && (o5 = parseInt(r5, 10));
                const a2 = c[o5], u2 = pt[a2];
                if (null == a2 || void 0 === a2 || void 0 === a2) throw new Error("unknown type of tag: " + o5);
                let l2 = n3[r5];
                if (void 0 === l2) throw new Error("failed to get value for key " + r5);
                "ASCII" === a2 && "string" == typeof l2 && false === ut(l2, "\0") && (l2 += "\0");
                const f2 = l2.length;
                t3.writeUshort(e3, i3, o5), i3 += 2, t3.writeUshort(e3, i3, u2), i3 += 2, t3.writeUint(e3, i3, f2), i3 += 4;
                let h2 = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][u2] * f2, d2 = i3;
                h2 > 4 && (t3.writeUint(e3, i3, s3), d2 = s3), "ASCII" === a2 ? t3.writeASCII(e3, d2, l2) : "SHORT" === a2 ? lt(f2, (r6) => {
                  t3.writeUshort(e3, d2 + 2 * r6, l2[r6]);
                }) : "LONG" === a2 ? lt(f2, (r6) => {
                  t3.writeUint(e3, d2 + 4 * r6, l2[r6]);
                }) : "RATIONAL" === a2 ? lt(f2, (r6) => {
                  t3.writeUint(e3, d2 + 8 * r6, Math.round(1e4 * l2[r6])), t3.writeUint(e3, d2 + 8 * r6 + 4, 1e4);
                }) : "DOUBLE" === a2 && lt(f2, (r6) => {
                  t3.writeDouble(e3, d2 + 8 * r6, l2[r6]);
                }), h2 > 4 && (h2 += 1 & h2, s3 += h2), i3 += 4;
              }
              return [i3, s3];
            })(n2, e2, i2, r3);
            i2 = s2[1], o3 < t2.length - 1 && n2.writeUint(e2, s2[0], i2);
          }), e2.slice) return e2.slice(0, i2).buffer;
          const o2 = new Uint8Array(i2);
          for (let t3 = 0; t3 < i2; t3++) o2[t3] = e2[t3];
          return o2.buffer;
        }, mt = [["Compression", 1], ["PlanarConfiguration", 1], ["XPosition", 0], ["YPosition", 0], ["ResolutionUnit", 1], ["ExtraSamples", 0], ["GeoAsciiParams", "WGS 84\0"], ["ModelTiepoint", [0, 0, 0, -180, 90, 0]], ["GTModelTypeGeoKey", 2], ["GTRasterTypeGeoKey", 1], ["GeographicTypeGeoKey", 4326], ["GeogCitationGeoKey", "WGS 84"]];
        function bt(t2, e2) {
          let r2, n2, i2, o2;
          "number" == typeof t2[0] ? (r2 = e2.height || e2.ImageLength, i2 = e2.width || e2.ImageWidth, n2 = t2.length / (r2 * i2), o2 = t2) : (n2 = t2.length, r2 = t2[0].length, i2 = t2[0][0].length, o2 = [], lt(r2, (e3) => {
            lt(i2, (r3) => {
              lt(n2, (n3) => {
                o2.push(t2[n3][e3][r3]);
              });
            });
          })), e2.ImageLength = r2, delete e2.height, e2.ImageWidth = i2, delete e2.width, e2.BitsPerSample || (e2.BitsPerSample = lt(n2, () => 8)), mt.forEach((t3) => {
            const r3 = t3[0];
            if (!e2[r3]) {
              const n3 = t3[1];
              e2[r3] = n3;
            }
          }), e2.PhotometricInterpretation || (e2.PhotometricInterpretation = 3 === e2.BitsPerSample.length ? 2 : 1), e2.SamplesPerPixel || (e2.SamplesPerPixel = [n2]), e2.StripByteCounts || (e2.StripByteCounts = [n2 * r2 * i2]), e2.ModelPixelScale || (e2.ModelPixelScale = [360 / i2, 180 / r2, 0]), e2.SampleFormat || (e2.SampleFormat = lt(n2, () => 1));
          const s2 = Object.keys(e2).filter((t3) => ut(t3, "GeoKey")).sort((t3, e3) => dt[t3] - dt[e3]);
          if (!e2.GeoKeyDirectory) {
            const t3 = [1, 1, 0, s2.length];
            s2.forEach((r3) => {
              const n3 = Number(dt[r3]);
              let i3, o3, s3;
              t3.push(n3), "SHORT" === c[n3] ? (i3 = 1, o3 = 0, s3 = e2[r3]) : "GeogCitationGeoKey" === r3 ? (i3 = e2.GeoAsciiParams.length, o3 = Number(dt.GeoAsciiParams), s3 = 0) : console.log("[geotiff.js] couldn't get TIFFTagLocation for " + r3), t3.push(o3), t3.push(i3), t3.push(s3);
            }), e2.GeoKeyDirectory = t3;
          }
          for (const t3 in s2) s2.hasOwnProperty(t3) && delete e2[t3];
          ["Compression", "ExtraSamples", "GeographicTypeGeoKey", "GTModelTypeGeoKey", "GTRasterTypeGeoKey", "ImageLength", "ImageWidth", "PhotometricInterpretation", "PlanarConfiguration", "ResolutionUnit", "SamplesPerPixel", "XPosition", "YPosition"].forEach((t3) => {
            var r3;
            e2[t3] && (e2[t3] = (r3 = e2[t3], Array.isArray(r3) ? r3 : [r3]));
          });
          const a2 = ((t3) => {
            const e3 = {};
            for (const r3 in t3) "StripOffsets" !== r3 && (dt[r3] || console.error(r3, "not in name2code:", Object.keys(dt)), e3[dt[r3]] = t3[r3]);
            return e3;
          })(e2);
          return ((t3, e3, r3, n3) => {
            if (null == r3) throw new Error("you passed into encodeImage a width of type " + r3);
            if (null == e3) throw new Error("you passed into encodeImage a width of type " + e3);
            const i3 = { 256: [e3], 257: [r3], 273: [1e3], 278: [r3], 305: "geotiff.js" };
            if (n3) for (const t4 in n3) n3.hasOwnProperty(t4) && (i3[t4] = n3[t4]);
            const o3 = new Uint8Array(gt([i3])), s3 = new Uint8Array(t3), a3 = i3[277], u2 = new Uint8Array(1e3 + e3 * r3 * a3);
            return lt(o3.length, (t4) => {
              u2[t4] = o3[t4];
            }), (function(t4, e4) {
              const { length: r4 } = t4;
              for (let n4 = 0; n4 < r4; n4++) e4(t4[n4], n4);
            })(s3, (t4, e4) => {
              u2[1e3 + e4] = t4;
            }), u2.buffer;
          })(o2, i2, r2, a2);
        }
        class vt {
          log() {
          }
          info() {
          }
          warn() {
          }
          error() {
          }
          time() {
          }
          timeEnd() {
          }
        }
        function xt(t2 = new vt()) {
        }
        function _t(t2) {
          switch (t2) {
            case h.BYTE:
            case h.ASCII:
            case h.SBYTE:
            case h.UNDEFINED:
              return 1;
            case h.SHORT:
            case h.SSHORT:
              return 2;
            case h.LONG:
            case h.SLONG:
            case h.FLOAT:
            case h.IFD:
              return 4;
            case h.RATIONAL:
            case h.SRATIONAL:
            case h.DOUBLE:
            case h.LONG8:
            case h.SLONG8:
            case h.IFD8:
              return 8;
            default:
              throw new RangeError("Invalid field type: " + t2);
          }
        }
        function St(t2, e2, r2, n2) {
          let i2 = null, o2 = null;
          const s2 = _t(e2);
          switch (e2) {
            case h.BYTE:
            case h.ASCII:
            case h.UNDEFINED:
              i2 = new Uint8Array(r2), o2 = t2.readUint8;
              break;
            case h.SBYTE:
              i2 = new Int8Array(r2), o2 = t2.readInt8;
              break;
            case h.SHORT:
              i2 = new Uint16Array(r2), o2 = t2.readUint16;
              break;
            case h.SSHORT:
              i2 = new Int16Array(r2), o2 = t2.readInt16;
              break;
            case h.LONG:
            case h.IFD:
              i2 = new Uint32Array(r2), o2 = t2.readUint32;
              break;
            case h.SLONG:
              i2 = new Int32Array(r2), o2 = t2.readInt32;
              break;
            case h.LONG8:
            case h.IFD8:
              i2 = new Array(r2), o2 = t2.readUint64;
              break;
            case h.SLONG8:
              i2 = new Array(r2), o2 = t2.readInt64;
              break;
            case h.RATIONAL:
              i2 = new Uint32Array(2 * r2), o2 = t2.readUint32;
              break;
            case h.SRATIONAL:
              i2 = new Int32Array(2 * r2), o2 = t2.readInt32;
              break;
            case h.FLOAT:
              i2 = new Float32Array(r2), o2 = t2.readFloat32;
              break;
            case h.DOUBLE:
              i2 = new Float64Array(r2), o2 = t2.readFloat64;
              break;
            default:
              throw new RangeError("Invalid field type: " + e2);
          }
          if (e2 !== h.RATIONAL && e2 !== h.SRATIONAL) for (let e3 = 0; e3 < r2; ++e3) i2[e3] = o2.call(t2, n2 + e3 * s2);
          else for (let e3 = 0; e3 < r2; e3 += 2) i2[e3] = o2.call(t2, n2 + e3 * s2), i2[e3 + 1] = o2.call(t2, n2 + (e3 * s2 + 4));
          return e2 === h.ASCII ? String.fromCharCode.apply(null, i2) : i2;
        }
        class At {
          constructor(t2, e2, r2) {
            this.fileDirectory = t2, this.geoKeyDirectory = e2, this.nextIFDByteOffset = r2;
          }
        }
        class Et extends Error {
          constructor(t2) {
            super("No image at index " + t2), this.index = t2;
          }
        }
        class kt {
          async readRasters(t2 = {}) {
            const { window: e2, width: r2, height: n2 } = t2;
            let { resX: i2, resY: o2, bbox: s2 } = t2;
            const a2 = await this.getImage();
            let u2 = a2;
            const c2 = await this.getImageCount(), l2 = a2.getBoundingBox();
            if (e2 && s2) throw new Error('Both "bbox" and "window" passed.');
            if (r2 || n2) {
              if (e2) {
                const [t4, r3] = a2.getOrigin(), [n3, i3] = a2.getResolution();
                s2 = [t4 + e2[0] * n3, r3 + e2[1] * i3, t4 + e2[2] * n3, r3 + e2[3] * i3];
              }
              const t3 = s2 || l2;
              if (r2) {
                if (i2) throw new Error("Both width and resX passed");
                i2 = (t3[2] - t3[0]) / r2;
              }
              if (n2) {
                if (o2) throw new Error("Both width and resY passed");
                o2 = (t3[3] - t3[1]) / n2;
              }
            }
            if (i2 || o2) {
              const t3 = [];
              for (let e3 = 0; e3 < c2; ++e3) {
                const r3 = await this.getImage(e3), { SubfileType: n3, NewSubfileType: i3 } = r3.fileDirectory;
                (0 === e3 || 2 === n3 || 1 & i3) && t3.push(r3);
              }
              t3.sort((t4, e3) => t4.getWidth() - e3.getWidth());
              for (let e3 = 0; e3 < t3.length; ++e3) {
                const r3 = t3[e3], n3 = (l2[2] - l2[0]) / r3.getWidth(), s3 = (l2[3] - l2[1]) / r3.getHeight();
                if (u2 = r3, i2 && i2 > n3 || o2 && o2 > s3) break;
              }
            }
            let f2 = e2;
            if (s2) {
              const [t3, e3] = a2.getOrigin(), [r3, n3] = u2.getResolution(a2);
              f2 = [Math.round((s2[0] - t3) / r3), Math.round((s2[1] - e3) / n3), Math.round((s2[2] - t3) / r3), Math.round((s2[3] - e3) / n3)], f2 = [Math.min(f2[0], f2[2]), Math.min(f2[1], f2[3]), Math.max(f2[0], f2[2]), Math.max(f2[1], f2[3])];
            }
            return u2.readRasters({ ...t2, window: f2 });
          }
        }
        class Tt extends kt {
          constructor(t2, e2, r2, n2, i2 = {}) {
            super(), this.source = t2, this.littleEndian = e2, this.bigTiff = r2, this.firstIFDOffset = n2, this.cache = i2.cache || false, this.ifdRequests = [], this.ghostValues = null;
          }
          async getSlice(t2, e2) {
            const r2 = this.bigTiff ? 4048 : 1024;
            return new K(await this.source.fetch(t2, void 0 !== e2 ? e2 : r2), t2, this.littleEndian, this.bigTiff);
          }
          async parseFileDirectoryAt(t2) {
            const e2 = this.bigTiff ? 20 : 12, r2 = this.bigTiff ? 8 : 2;
            let n2 = await this.getSlice(t2);
            const i2 = this.bigTiff ? n2.readUint64(t2) : n2.readUint16(t2), o2 = i2 * e2 + (this.bigTiff ? 16 : 6);
            n2.covers(t2, o2) || (n2 = await this.getSlice(t2, o2));
            const s2 = {};
            let u2 = t2 + (this.bigTiff ? 8 : 2);
            for (let t3 = 0; t3 < i2; u2 += e2, ++t3) {
              const t4 = n2.readUint16(u2), e3 = n2.readUint16(u2 + 2), r3 = this.bigTiff ? n2.readUint64(u2 + 4) : n2.readUint32(u2 + 4);
              let i3, o3;
              const c3 = _t(e3), f3 = u2 + (this.bigTiff ? 12 : 8);
              if (c3 * r3 <= (this.bigTiff ? 8 : 4)) i3 = St(n2, e3, r3, f3);
              else {
                const t5 = n2.readOffset(f3), o4 = _t(e3) * r3;
                if (n2.covers(t5, o4)) i3 = St(n2, e3, r3, t5);
                else {
                  i3 = St(await this.getSlice(t5, o4), e3, r3, t5);
                }
              }
              o3 = 1 === r3 && -1 === l.indexOf(t4) && e3 !== h.RATIONAL && e3 !== h.SRATIONAL ? i3[0] : i3, s2[a[t4]] = o3;
            }
            const c2 = (function(t3) {
              const e3 = t3.GeoKeyDirectory;
              if (!e3) return null;
              const r3 = {};
              for (let n3 = 4; n3 <= 4 * e3[3]; n3 += 4) {
                const i3 = y[e3[n3]], o3 = e3[n3 + 1] ? a[e3[n3 + 1]] : null, s3 = e3[n3 + 2], u3 = e3[n3 + 3];
                let c3 = null;
                if (o3) {
                  if (c3 = t3[o3], null == c3) throw new Error(`Could not get value of geoKey '${i3}'.`);
                  "string" == typeof c3 ? c3 = c3.substring(u3, u3 + s3 - 1) : c3.subarray && (c3 = c3.subarray(u3, u3 + s3), 1 === s3 && (c3 = c3[0]));
                } else c3 = u3;
                r3[i3] = c3;
              }
              return r3;
            })(s2), f2 = n2.readOffset(t2 + r2 + e2 * i2);
            return new At(s2, c2, f2);
          }
          async requestIFD(t2) {
            if (this.ifdRequests[t2]) return this.ifdRequests[t2];
            if (0 === t2) return this.ifdRequests[t2] = this.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[t2];
            if (!this.ifdRequests[t2 - 1]) try {
              this.ifdRequests[t2 - 1] = this.requestIFD(t2 - 1);
            } catch (e2) {
              if (e2 instanceof Et) throw new Et(t2);
              throw e2;
            }
            return this.ifdRequests[t2] = (async () => {
              const e2 = await this.ifdRequests[t2 - 1];
              if (0 === e2.nextIFDByteOffset) throw new Et(t2);
              return this.parseFileDirectoryAt(e2.nextIFDByteOffset);
            })(), this.ifdRequests[t2];
          }
          async getImage(t2 = 0) {
            const e2 = await this.requestIFD(t2);
            return new V(e2.fileDirectory, e2.geoKeyDirectory, this.dataView, this.littleEndian, this.cache, this.source);
          }
          async getImageCount() {
            let t2 = 0, e2 = true;
            for (; e2; ) try {
              await this.requestIFD(t2), ++t2;
            } catch (t3) {
              if (!(t3 instanceof Et)) throw t3;
              e2 = false;
            }
            return t2;
          }
          async getGhostValues() {
            const t2 = this.bigTiff ? 16 : 8;
            if (this.ghostValues) return this.ghostValues;
            const e2 = "GDAL_STRUCTURAL_METADATA_SIZE=", r2 = e2.length + 100;
            let n2 = await this.getSlice(t2, r2);
            if (e2 === St(n2, h.ASCII, e2.length, t2)) {
              const e3 = St(n2, h.ASCII, r2, t2).split("\n")[0], i2 = Number(e3.split("=")[1].split(" ")[0]) + e3.length;
              i2 > r2 && (n2 = await this.getSlice(t2, i2));
              const o2 = St(n2, h.ASCII, i2, t2);
              this.ghostValues = {}, o2.split("\n").filter((t3) => t3.length > 0).map((t3) => t3.split("=")).forEach(([t3, e4]) => {
                this.ghostValues[t3] = e4;
              });
            }
            return this.ghostValues;
          }
          static async fromSource(t2, e2) {
            const r2 = await t2.fetch(0, 1024), n2 = new $(r2), i2 = n2.getUint16(0, 0);
            let o2;
            if (18761 === i2) o2 = true;
            else {
              if (19789 !== i2) throw new TypeError("Invalid byte order value.");
              o2 = false;
            }
            const s2 = n2.getUint16(2, o2);
            let a2;
            if (42 === s2) a2 = false;
            else {
              if (43 !== s2) throw new TypeError("Invalid magic number.");
              a2 = true;
              if (8 !== n2.getUint16(4, o2)) throw new Error("Unsupported offset byte-size.");
            }
            const u2 = a2 ? n2.getUint64(8, o2) : n2.getUint32(4, o2);
            return new Tt(t2, o2, a2, u2, e2);
          }
          close() {
            return "function" == typeof this.source.close && this.source.close();
          }
        }
        e.default = Tt;
        class Ot extends kt {
          constructor(t2, e2) {
            super(), this.mainFile = t2, this.overviewFiles = e2, this.imageFiles = [t2].concat(e2), this.fileDirectoriesPerFile = null, this.fileDirectoriesPerFileParsing = null, this.imageCount = null;
          }
          async parseFileDirectoriesPerFile() {
            const t2 = [this.mainFile.parseFileDirectoryAt(this.mainFile.firstIFDOffset)].concat(this.overviewFiles.map((t3) => t3.parseFileDirectoryAt(t3.firstIFDOffset)));
            return this.fileDirectoriesPerFile = await Promise.all(t2), this.fileDirectoriesPerFile;
          }
          async getImage(t2 = 0) {
            await this.getImageCount(), await this.parseFileDirectoriesPerFile();
            let e2 = 0, r2 = 0;
            for (let n2 = 0; n2 < this.imageFiles.length; n2++) {
              const i2 = this.imageFiles[n2];
              for (let o2 = 0; o2 < this.imageCounts[n2]; o2++) {
                if (t2 === e2) {
                  const t3 = await i2.requestIFD(r2);
                  return new V(t3.fileDirectory, i2.geoKeyDirectory, i2.dataView, i2.littleEndian, i2.cache, i2.source);
                }
                e2++, r2++;
              }
              r2 = 0;
            }
            throw new RangeError("Invalid image index");
          }
          async getImageCount() {
            if (null !== this.imageCount) return this.imageCount;
            const t2 = [this.mainFile.getImageCount()].concat(this.overviewFiles.map((t3) => t3.getImageCount()));
            return this.imageCounts = await Promise.all(t2), this.imageCount = this.imageCounts.reduce((t3, e2) => t3 + e2, 0), this.imageCount;
          }
        }
        async function Ct(t2, e2 = {}) {
          return Tt.fromSource(ot(t2, e2));
        }
        async function Pt(t2) {
          return Tt.fromSource(/* @__PURE__ */ (function(t3) {
            return { fetch: async (e2, r2) => t3.slice(e2, e2 + r2) };
          })(t2));
        }
        async function It(t2) {
          return Tt.fromSource(st(t2));
        }
        async function Rt(t2) {
          return Tt.fromSource((e2 = t2, { fetch: async (t3, r2) => new Promise((n2, i2) => {
            const o2 = e2.slice(t3, t3 + r2), s2 = new FileReader();
            s2.onload = (t4) => n2(t4.target.result), s2.onerror = i2, s2.readAsArrayBuffer(o2);
          }) }));
          var e2;
        }
        async function jt(t2, e2 = [], r2 = {}) {
          const n2 = await Tt.fromSource(ot(t2, r2)), i2 = await Promise.all(e2.map((t3) => Tt.fromSource(ot(t3, r2))));
          return new Ot(n2, i2);
        }
        async function Mt(t2, e2) {
          return bt(t2, e2);
        }
      }, function(t, e, r) {
        function n(t2, e2) {
          var r2 = (e2 = e2 || {}).pos || 0, i = "<".charCodeAt(0), o = ">".charCodeAt(0), s = "-".charCodeAt(0), a = "/".charCodeAt(0), u = "!".charCodeAt(0), c = "'".charCodeAt(0), l = '"'.charCodeAt(0);
          function f() {
            for (var e3 = []; t2[r2]; ) if (t2.charCodeAt(r2) == i) {
              if (t2.charCodeAt(r2 + 1) === a) return (r2 = t2.indexOf(">", r2)) + 1 && (r2 += 1), e3;
              if (t2.charCodeAt(r2 + 1) === u) {
                if (t2.charCodeAt(r2 + 2) == s) {
                  for (; -1 !== r2 && (t2.charCodeAt(r2) !== o || t2.charCodeAt(r2 - 1) != s || t2.charCodeAt(r2 - 2) != s || -1 == r2); ) r2 = t2.indexOf(">", r2 + 1);
                  -1 === r2 && (r2 = t2.length);
                } else for (r2 += 2; t2.charCodeAt(r2) !== o && t2[r2]; ) r2++;
                r2++;
                continue;
              }
              var n2 = y();
              e3.push(n2);
            } else {
              var c2 = h();
              c2.trim().length > 0 && e3.push(c2), r2++;
            }
            return e3;
          }
          function h() {
            var e3 = r2;
            return -2 === (r2 = t2.indexOf("<", r2) - 1) && (r2 = t2.length), t2.slice(e3, r2 + 1);
          }
          function d() {
            for (var e3 = r2; -1 === "\n	>/= ".indexOf(t2[r2]) && t2[r2]; ) r2++;
            return t2.slice(e3, r2);
          }
          var p = e2.noChildNodes || ["img", "br", "input", "meta", "link"];
          function y() {
            r2++;
            const e3 = d(), n2 = {};
            let i2 = [];
            for (; t2.charCodeAt(r2) !== o && t2[r2]; ) {
              var s2 = t2.charCodeAt(r2);
              if (s2 > 64 && s2 < 91 || s2 > 96 && s2 < 123) {
                for (var u2 = d(), h2 = t2.charCodeAt(r2); h2 && h2 !== c && h2 !== l && !(h2 > 64 && h2 < 91 || h2 > 96 && h2 < 123) && h2 !== o; ) r2++, h2 = t2.charCodeAt(r2);
                if (h2 === c || h2 === l) {
                  var y2 = g();
                  if (-1 === r2) return { tagName: e3, attributes: n2, children: i2 };
                } else y2 = null, r2--;
                n2[u2] = y2;
              }
              r2++;
            }
            if (t2.charCodeAt(r2 - 1) !== a) if ("script" == e3) {
              var m2 = r2 + 1;
              r2 = t2.indexOf("<\/script>", r2), i2 = [t2.slice(m2, r2 - 1)], r2 += 9;
            } else if ("style" == e3) {
              m2 = r2 + 1;
              r2 = t2.indexOf("</style>", r2), i2 = [t2.slice(m2, r2 - 1)], r2 += 8;
            } else -1 == p.indexOf(e3) && (r2++, i2 = f());
            else r2++;
            return { tagName: e3, attributes: n2, children: i2 };
          }
          function g() {
            var e3 = t2[r2], n2 = ++r2;
            return r2 = t2.indexOf(e3, n2), t2.slice(n2, r2);
          }
          var m, b = null;
          if (void 0 !== e2.attrValue) {
            e2.attrName = e2.attrName || "id";
            for (b = []; -1 !== (m = void 0, m = new RegExp("\\s" + e2.attrName + `\\s*=['"]` + e2.attrValue + `['"]`).exec(t2), r2 = m ? m.index : -1); ) -1 !== (r2 = t2.lastIndexOf("<", r2)) && b.push(y()), t2 = t2.substr(r2), r2 = 0;
          } else b = e2.parseNode ? y() : f();
          return e2.filter && (b = n.filter(b, e2.filter)), e2.setPos && (b.pos = r2), b;
        }
        n.simplify = function(t2) {
          var e2 = {};
          if (!t2.length) return "";
          if (1 === t2.length && "string" == typeof t2[0]) return t2[0];
          for (var r2 in t2.forEach((function(t3) {
            if ("object" == typeof t3) {
              e2[t3.tagName] || (e2[t3.tagName] = []);
              var r3 = n.simplify(t3.children || []);
              e2[t3.tagName].push(r3), t3.attributes && (r3._attributes = t3.attributes);
            }
          })), e2) 1 == e2[r2].length && (e2[r2] = e2[r2][0]);
          return e2;
        }, n.filter = function(t2, e2) {
          var r2 = [];
          return t2.forEach((function(t3) {
            if ("object" == typeof t3 && e2(t3) && r2.push(t3), t3.children) {
              var i = n.filter(t3.children, e2);
              r2 = r2.concat(i);
            }
          })), r2;
        }, n.stringify = function(t2) {
          var e2 = "";
          function r2(t3) {
            if (t3) for (var r3 = 0; r3 < t3.length; r3++) "string" == typeof t3[r3] ? e2 += t3[r3].trim() : n2(t3[r3]);
          }
          function n2(t3) {
            for (var n3 in e2 += "<" + t3.tagName, t3.attributes) null === t3.attributes[n3] ? e2 += " " + n3 : -1 === t3.attributes[n3].indexOf('"') ? e2 += " " + n3 + '="' + t3.attributes[n3].trim() + '"' : e2 += " " + n3 + "='" + t3.attributes[n3].trim() + "'";
            e2 += ">", r2(t3.children), e2 += "</" + t3.tagName + ">";
          }
          return r2(t2), e2;
        }, n.toContentString = function(t2) {
          if (Array.isArray(t2)) {
            var e2 = "";
            return t2.forEach((function(t3) {
              e2 = (e2 += " " + n.toContentString(t3)).trim();
            })), e2;
          }
          return "object" == typeof t2 ? n.toContentString(t2.children) : " " + t2;
        }, n.getElementById = function(t2, e2, r2) {
          var i = n(t2, { attrValue: e2 });
          return r2 ? n.simplify(i) : i[0];
        }, n.getElementsByClassName = function(t2, e2, r2) {
          const i = n(t2, { attrName: "class", attrValue: "[a-zA-Z0-9-s ]*" + e2 + "[a-zA-Z0-9-s ]*" });
          return r2 ? n.simplify(i) : i;
        }, n.parseStream = function(t2, e2) {
          if ("string" == typeof e2 && (e2 = e2.length + 2), "string" == typeof t2) {
            var i = r(25);
            t2 = i.createReadStream(t2, { start: e2 }), e2 = 0;
          }
          var o = e2, s = "";
          return t2.on("data", (function(e3) {
            s += e3;
            for (var r2 = 0; ; ) {
              if (!(o = s.indexOf("<", o) + 1)) return void (o = r2);
              if ("/" !== s[o + 1]) {
                var i2 = n(s, { pos: o - 1, parseNode: true, setPos: true });
                if ((o = i2.pos) > s.length - 1 || o < r2) return s = s.slice(r2), o = 0, void (r2 = 0);
                t2.emit("xml", i2), r2 = o;
              } else o += 1, r2 = pos;
            }
          })), t2.on("end", (function() {
            console.log("end");
          })), t2;
        }, n.transformStream = function(t2) {
          const e2 = r(114);
          "string" == typeof t2 && (t2 = t2.length + 2);
          var i = t2 || 0, o = "";
          return e2({ readableObjectMode: true }, (function(t3, e3, r2) {
            o += t3;
            for (var s = 0; ; ) {
              if (!(i = o.indexOf("<", i) + 1)) return i = s, r2();
              if ("/" !== o[i + 1]) {
                var a = n(o, { pos: i - 1, parseNode: true, setPos: true });
                if ((i = a.pos) > o.length - 1 || i < s) return o = o.slice(s), i = 0, s = 0, r2();
                this.push(a), s = i;
              } else i += 1, s = pos;
            }
            r2();
          }));
        }, t.exports = n, n.xml = n;
      }, function(t, e, r) {
        var n = r(123), i = r(29), o = r(128), s = r(129), a = r(130), u = r(131), c = r(132), l = Object.prototype.toString;
        function f(t2) {
          if (!(this instanceof f)) return new f(t2);
          this.options = i.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t2 || {});
          var e2 = this.options;
          e2.raw && e2.windowBits >= 0 && e2.windowBits < 16 && (e2.windowBits = -e2.windowBits, 0 === e2.windowBits && (e2.windowBits = -15)), !(e2.windowBits >= 0 && e2.windowBits < 16) || t2 && t2.windowBits || (e2.windowBits += 32), e2.windowBits > 15 && e2.windowBits < 48 && 0 == (15 & e2.windowBits) && (e2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new u(), this.strm.avail_out = 0;
          var r2 = n.inflateInit2(this.strm, e2.windowBits);
          if (r2 !== s.Z_OK) throw new Error(a[r2]);
          if (this.header = new c(), n.inflateGetHeader(this.strm, this.header), e2.dictionary && ("string" == typeof e2.dictionary ? e2.dictionary = o.string2buf(e2.dictionary) : "[object ArrayBuffer]" === l.call(e2.dictionary) && (e2.dictionary = new Uint8Array(e2.dictionary)), e2.raw && (r2 = n.inflateSetDictionary(this.strm, e2.dictionary)) !== s.Z_OK)) throw new Error(a[r2]);
        }
        function h(t2, e2) {
          var r2 = new f(e2);
          if (r2.push(t2, true), r2.err) throw r2.msg || a[r2.err];
          return r2.result;
        }
        f.prototype.push = function(t2, e2) {
          var r2, a2, u2, c2, f2, h2 = this.strm, d = this.options.chunkSize, p = this.options.dictionary, y = false;
          if (this.ended) return false;
          a2 = e2 === ~~e2 ? e2 : true === e2 ? s.Z_FINISH : s.Z_NO_FLUSH, "string" == typeof t2 ? h2.input = o.binstring2buf(t2) : "[object ArrayBuffer]" === l.call(t2) ? h2.input = new Uint8Array(t2) : h2.input = t2, h2.next_in = 0, h2.avail_in = h2.input.length;
          do {
            if (0 === h2.avail_out && (h2.output = new i.Buf8(d), h2.next_out = 0, h2.avail_out = d), (r2 = n.inflate(h2, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && p && (r2 = n.inflateSetDictionary(this.strm, p)), r2 === s.Z_BUF_ERROR && true === y && (r2 = s.Z_OK, y = false), r2 !== s.Z_STREAM_END && r2 !== s.Z_OK) return this.onEnd(r2), this.ended = true, false;
            h2.next_out && (0 !== h2.avail_out && r2 !== s.Z_STREAM_END && (0 !== h2.avail_in || a2 !== s.Z_FINISH && a2 !== s.Z_SYNC_FLUSH) || ("string" === this.options.to ? (u2 = o.utf8border(h2.output, h2.next_out), c2 = h2.next_out - u2, f2 = o.buf2string(h2.output, u2), h2.next_out = c2, h2.avail_out = d - c2, c2 && i.arraySet(h2.output, h2.output, u2, c2, 0), this.onData(f2)) : this.onData(i.shrinkBuf(h2.output, h2.next_out)))), 0 === h2.avail_in && 0 === h2.avail_out && (y = true);
          } while ((h2.avail_in > 0 || 0 === h2.avail_out) && r2 !== s.Z_STREAM_END);
          return r2 === s.Z_STREAM_END && (a2 = s.Z_FINISH), a2 === s.Z_FINISH ? (r2 = n.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === s.Z_OK) : a2 !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), h2.avail_out = 0, true);
        }, f.prototype.onData = function(t2) {
          this.chunks.push(t2);
        }, f.prototype.onEnd = function(t2) {
          t2 === s.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = t2, this.msg = this.strm.msg;
        }, e.Inflate = f, e.inflate = h, e.inflateRaw = function(t2, e2) {
          return (e2 = e2 || {}).raw = true, h(t2, e2);
        }, e.ungzip = h;
      }, function(t, e, r) {
        var n = r(26);
        class i extends n.a {
          constructor() {
            super((t2) => (this._observers.add(t2), () => this._observers.delete(t2))), this._observers = /* @__PURE__ */ new Set();
          }
          next(t2) {
            for (const e2 of this._observers) e2.next(t2);
          }
          error(t2) {
            for (const e2 of this._observers) e2.error(t2);
          }
          complete() {
            for (const t2 of this._observers) t2.complete();
          }
        }
        e.a = i;
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return i;
        }));
        const n = () => {
        };
        function i() {
          let t2, e2 = false, r2 = n;
          return [new Promise((n2) => {
            e2 ? n2(t2) : r2 = n2;
          }), (n2) => {
            e2 = true, t2 = n2, r2(t2);
          }];
        }
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return i;
        }));
        var n = r(2);
        function i(t2) {
          return t2 && "object" == typeof t2 && t2[n.d];
        }
      }, function(t, e, r) {
        var n = r(40), i = r(39), o = t.exports;
        for (var s in n) n.hasOwnProperty(s) && (o[s] = n[s]);
        function a(t2) {
          if ("string" == typeof t2 && (t2 = i.parse(t2)), t2.protocol || (t2.protocol = "https:"), "https:" !== t2.protocol) throw new Error('Protocol "' + t2.protocol + '" not supported. Expected "https:"');
          return t2;
        }
        o.request = function(t2, e2) {
          return t2 = a(t2), n.request.call(this, t2, e2);
        }, o.get = function(t2, e2) {
          return t2 = a(t2), n.get.call(this, t2, e2);
        };
      }, function(t, e, r) {
        (function(e2) {
          var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
            return typeof t2;
          } : function(t2) {
            return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
          }, i = /* @__PURE__ */ (function() {
            function t2(t3, e3) {
              for (var r2 = 0; r2 < e3.length; r2++) {
                var n2 = e3[r2];
                n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
              }
            }
            return function(e3, r2, n2) {
              return r2 && t2(e3.prototype, r2), n2 && t2(e3, n2), e3;
            };
          })(), o = f(r(110)), s = f(r(111)), a = f(r(113)), u = r(99), c = r(100), l = f(r(197));
          function f(t2) {
            return t2 && t2.__esModule ? t2 : { default: t2 };
          }
          function h(t2, e3) {
            var r2 = e3.left, n2 = e3.top, i2 = e3.right, o2 = e3.bottom, s2 = e3.width, a2 = e3.height, c2 = e3.resampleMethod;
            return t2.readRasters({ window: [r2, n2, i2, o2], width: s2, height: a2, resampleMethod: c2 || "bilinear" }).then((function(t3) {
              return t3.map((function(t4) {
                return (0, u.unflatten)(t4, { height: a2, width: s2 });
              }));
            }));
          }
          var d = (function() {
            function t2(r2, i2, o2) {
              !(function(t3, e3) {
                if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
              })(this, t2), o2 && console.log("starting GeoRaster.constructor with", r2, i2), this._web_worker_is_available = "undefined" != typeof window && void 0 !== window.Worker, this._blob_is_available = "undefined" != typeof Blob, this._url_is_available = "undefined" != typeof URL, "object" === (void 0 === r2 ? "undefined" : n(r2)) && r2.constructor && "Buffer" === r2.constructor.name && false === e2.isBuffer(r2) && (r2 = new e2(r2)), "string" == typeof r2 ? (o2 && console.log("data is a url"), this._data = r2, this._url = r2, this.rasterType = "geotiff", this.sourceType = "url") : "undefined" != typeof Blob && r2 instanceof Blob ? (this._data = r2, this.rasterType = "geotiff", this.sourceType = "Blob") : void 0 !== e2 && e2.isBuffer(r2) ? (o2 && console.log("data is a buffer"), this._data = r2.buffer.slice(r2.byteOffset, r2.byteOffset + r2.byteLength), this.rasterType = "geotiff", this.sourceType = "Buffer") : r2 instanceof ArrayBuffer ? (this._data = r2, this.rasterType = "geotiff", this.sourceType = "ArrayBuffer", this._metadata = i2) : Array.isArray(r2) && i2 && (this._data = r2, this.rasterType = "object", this._metadata = i2), o2 && console.log("this after construction:", this);
            }
            return i(t2, [{ key: "preinitialize", value: function(t3) {
              var e3 = this;
              if (t3 && console.log("starting preinitialize"), this._url) {
                var r2 = this._url + ".ovr";
                return (function(t4) {
                  try {
                    return (0, o.default)(t4, { method: "HEAD" }).then((function(t5) {
                      return 200 === t5.status;
                    })).catch((function(t5) {
                      return false;
                    }));
                  } catch (t5) {
                    return Promise.resolve(false);
                  }
                })(r2).then((function(n2) {
                  return t3 && console.log("overview exists:", n2), n2 ? (0, c.fromUrls)(e3._url, [r2], { cache: true, forceXHR: false }) : (0, c.fromUrl)(e3._url, { cache: true, forceXHR: false });
                }));
              }
              return Promise.resolve();
            } }, { key: "initialize", value: function(t3) {
              var e3 = this;
              return this.preinitialize(t3).then((function(r2) {
                return new Promise((function(n2, i2) {
                  if (t3 && console.log("starting GeoRaster.initialize"), t3 && console.log("this", e3), "object" === e3.rasterType || "geotiff" === e3.rasterType || "tiff" === e3.rasterType) if (e3._web_worker_is_available) {
                    var o2 = new s.default();
                    o2.onmessage = function(i3) {
                      t3 && console.log("main thread received message:", i3);
                      var o3 = i3.data;
                      for (var s2 in o3) e3[s2] = o3[s2];
                      e3._url && (e3._geotiff = r2, e3.getValues = function(t4) {
                        return h(this._geotiff, t4);
                      }), e3.toCanvas = function(t4) {
                        return (0, l.default)(this, t4);
                      }, n2(e3);
                    }, t3 && console.log("about to postMessage"), e3._data instanceof ArrayBuffer ? o2.postMessage({ data: e3._data, rasterType: e3.rasterType, sourceType: e3.sourceType, metadata: e3._metadata }, [e3._data]) : o2.postMessage({ data: e3._data, rasterType: e3.rasterType, sourceType: e3.sourceType, metadata: e3._metadata });
                  } else t3 && console.log("web worker is not available"), (0, a.default)({ data: e3._data, rasterType: e3.rasterType, sourceType: e3.sourceType, metadata: e3._metadata }, t3).then((function(i3) {
                    t3 && console.log("result:", i3), e3._url && (i3._geotiff = r2, i3.getValues = function(t4) {
                      return h(this._geotiff, t4);
                    }), i3.toCanvas = function(t4) {
                      return (0, l.default)(this, t4);
                    }, n2(i3);
                  })).catch(i2);
                  else i2("couldn't find a way to parse");
                }));
              }));
            } }]), t2;
          })(), p = function(t2, e3, r2) {
            if (r2 && console.log("starting parseGeoraster with ", t2, e3), void 0 === t2) {
              throw Error("[Georaster.parseGeoraster] Error. You passed in undefined to parseGeoraster. We can't make a raster out of nothing!");
            }
            return new d(t2, e3, r2).initialize(r2);
          };
          void 0 !== t.exports && (t.exports = p), "undefined" != typeof window ? window.parseGeoraster = p : "undefined" != typeof self && (self.parseGeoraster = p);
        }).call(this, r(7).Buffer);
      }, function(t, e, r) {
        e.byteLength = function(t2) {
          var e2 = c(t2), r2 = e2[0], n2 = e2[1];
          return 3 * (r2 + n2) / 4 - n2;
        }, e.toByteArray = function(t2) {
          var e2, r2, n2 = c(t2), s2 = n2[0], a2 = n2[1], u2 = new o((function(t3, e3, r3) {
            return 3 * (e3 + r3) / 4 - r3;
          })(0, s2, a2)), l2 = 0, f = a2 > 0 ? s2 - 4 : s2;
          for (r2 = 0; r2 < f; r2 += 4) e2 = i[t2.charCodeAt(r2)] << 18 | i[t2.charCodeAt(r2 + 1)] << 12 | i[t2.charCodeAt(r2 + 2)] << 6 | i[t2.charCodeAt(r2 + 3)], u2[l2++] = e2 >> 16 & 255, u2[l2++] = e2 >> 8 & 255, u2[l2++] = 255 & e2;
          2 === a2 && (e2 = i[t2.charCodeAt(r2)] << 2 | i[t2.charCodeAt(r2 + 1)] >> 4, u2[l2++] = 255 & e2);
          1 === a2 && (e2 = i[t2.charCodeAt(r2)] << 10 | i[t2.charCodeAt(r2 + 1)] << 4 | i[t2.charCodeAt(r2 + 2)] >> 2, u2[l2++] = e2 >> 8 & 255, u2[l2++] = 255 & e2);
          return u2;
        }, e.fromByteArray = function(t2) {
          for (var e2, r2 = t2.length, i2 = r2 % 3, o2 = [], s2 = 0, a2 = r2 - i2; s2 < a2; s2 += 16383) o2.push(l(t2, s2, s2 + 16383 > a2 ? a2 : s2 + 16383));
          1 === i2 ? (e2 = t2[r2 - 1], o2.push(n[e2 >> 2] + n[e2 << 4 & 63] + "==")) : 2 === i2 && (e2 = (t2[r2 - 2] << 8) + t2[r2 - 1], o2.push(n[e2 >> 10] + n[e2 >> 4 & 63] + n[e2 << 2 & 63] + "="));
          return o2.join("");
        };
        for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) n[a] = s[a], i[s.charCodeAt(a)] = a;
        function c(t2) {
          var e2 = t2.length;
          if (e2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
          var r2 = t2.indexOf("=");
          return -1 === r2 && (r2 = e2), [r2, r2 === e2 ? 0 : 4 - r2 % 4];
        }
        function l(t2, e2, r2) {
          for (var i2, o2, s2 = [], a2 = e2; a2 < r2; a2 += 3) i2 = (t2[a2] << 16 & 16711680) + (t2[a2 + 1] << 8 & 65280) + (255 & t2[a2 + 2]), s2.push(n[(o2 = i2) >> 18 & 63] + n[o2 >> 12 & 63] + n[o2 >> 6 & 63] + n[63 & o2]);
          return s2.join("");
        }
        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
      }, function(t, e) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        e.read = function(t2, e2, r, n, i) {
          var o, s, a = 8 * i - n - 1, u = (1 << a) - 1, c = u >> 1, l = -7, f = r ? i - 1 : 0, h = r ? -1 : 1, d = t2[e2 + f];
          for (f += h, o = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; o = 256 * o + t2[e2 + f], f += h, l -= 8) ;
          for (s = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; s = 256 * s + t2[e2 + f], f += h, l -= 8) ;
          if (0 === o) o = 1 - c;
          else {
            if (o === u) return s ? NaN : 1 / 0 * (d ? -1 : 1);
            s += Math.pow(2, n), o -= c;
          }
          return (d ? -1 : 1) * s * Math.pow(2, o - n);
        }, e.write = function(t2, e2, r, n, i, o) {
          var s, a, u, c = 8 * o - i - 1, l = (1 << c) - 1, f = l >> 1, h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n ? 0 : o - 1, p = n ? 1 : -1, y = e2 < 0 || 0 === e2 && 1 / e2 < 0 ? 1 : 0;
          for (e2 = Math.abs(e2), isNaN(e2) || e2 === 1 / 0 ? (a = isNaN(e2) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e2) / Math.LN2), e2 * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e2 += s + f >= 1 ? h / u : h * Math.pow(2, 1 - f)) * u >= 2 && (s++, u /= 2), s + f >= l ? (a = 0, s = l) : s + f >= 1 ? (a = (e2 * u - 1) * Math.pow(2, i), s += f) : (a = e2 * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; t2[r + d] = 255 & a, d += p, a /= 256, i -= 8) ;
          for (s = s << i | a, c += i; c > 0; t2[r + d] = 255 & s, d += p, s /= 256, c -= 8) ;
          t2[r + d - p] |= 128 * y;
        };
      }, function(t, e) {
        var r = "undefined" != typeof self ? self : this, n = (function() {
          function t2() {
            this.fetch = false, this.DOMException = r.DOMException;
          }
          return t2.prototype = r, new t2();
        })();
        !(function(t2) {
          !(function(e2) {
            var r2 = "URLSearchParams" in t2, n2 = "Symbol" in t2 && "iterator" in Symbol, i2 = "FileReader" in t2 && "Blob" in t2 && (function() {
              try {
                return new Blob(), true;
              } catch (t3) {
                return false;
              }
            })(), o = "FormData" in t2, s = "ArrayBuffer" in t2;
            if (s) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], u = ArrayBuffer.isView || function(t3) {
              return t3 && a.indexOf(Object.prototype.toString.call(t3)) > -1;
            };
            function c(t3) {
              if ("string" != typeof t3 && (t3 = String(t3)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t3)) throw new TypeError("Invalid character in header field name");
              return t3.toLowerCase();
            }
            function l(t3) {
              return "string" != typeof t3 && (t3 = String(t3)), t3;
            }
            function f(t3) {
              var e3 = { next: function() {
                var e4 = t3.shift();
                return { done: void 0 === e4, value: e4 };
              } };
              return n2 && (e3[Symbol.iterator] = function() {
                return e3;
              }), e3;
            }
            function h(t3) {
              this.map = {}, t3 instanceof h ? t3.forEach((function(t4, e3) {
                this.append(e3, t4);
              }), this) : Array.isArray(t3) ? t3.forEach((function(t4) {
                this.append(t4[0], t4[1]);
              }), this) : t3 && Object.getOwnPropertyNames(t3).forEach((function(e3) {
                this.append(e3, t3[e3]);
              }), this);
            }
            function d(t3) {
              if (t3.bodyUsed) return Promise.reject(new TypeError("Already read"));
              t3.bodyUsed = true;
            }
            function p(t3) {
              return new Promise((function(e3, r3) {
                t3.onload = function() {
                  e3(t3.result);
                }, t3.onerror = function() {
                  r3(t3.error);
                };
              }));
            }
            function y(t3) {
              var e3 = new FileReader(), r3 = p(e3);
              return e3.readAsArrayBuffer(t3), r3;
            }
            function g(t3) {
              if (t3.slice) return t3.slice(0);
              var e3 = new Uint8Array(t3.byteLength);
              return e3.set(new Uint8Array(t3)), e3.buffer;
            }
            function m() {
              return this.bodyUsed = false, this._initBody = function(t3) {
                var e3;
                this._bodyInit = t3, t3 ? "string" == typeof t3 ? this._bodyText = t3 : i2 && Blob.prototype.isPrototypeOf(t3) ? this._bodyBlob = t3 : o && FormData.prototype.isPrototypeOf(t3) ? this._bodyFormData = t3 : r2 && URLSearchParams.prototype.isPrototypeOf(t3) ? this._bodyText = t3.toString() : s && i2 && ((e3 = t3) && DataView.prototype.isPrototypeOf(e3)) ? (this._bodyArrayBuffer = g(t3.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : s && (ArrayBuffer.prototype.isPrototypeOf(t3) || u(t3)) ? this._bodyArrayBuffer = g(t3) : this._bodyText = t3 = Object.prototype.toString.call(t3) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof t3 ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r2 && URLSearchParams.prototype.isPrototypeOf(t3) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
              }, i2 && (this.blob = function() {
                var t3 = d(this);
                if (t3) return t3;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]));
              }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? d(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(y);
              }), this.text = function() {
                var t3, e3, r3, n3 = d(this);
                if (n3) return n3;
                if (this._bodyBlob) return t3 = this._bodyBlob, e3 = new FileReader(), r3 = p(e3), e3.readAsText(t3), r3;
                if (this._bodyArrayBuffer) return Promise.resolve((function(t4) {
                  for (var e4 = new Uint8Array(t4), r4 = new Array(e4.length), n4 = 0; n4 < e4.length; n4++) r4[n4] = String.fromCharCode(e4[n4]);
                  return r4.join("");
                })(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
              }, o && (this.formData = function() {
                return this.text().then(w);
              }), this.json = function() {
                return this.text().then(JSON.parse);
              }, this;
            }
            h.prototype.append = function(t3, e3) {
              t3 = c(t3), e3 = l(e3);
              var r3 = this.map[t3];
              this.map[t3] = r3 ? r3 + ", " + e3 : e3;
            }, h.prototype.delete = function(t3) {
              delete this.map[c(t3)];
            }, h.prototype.get = function(t3) {
              return t3 = c(t3), this.has(t3) ? this.map[t3] : null;
            }, h.prototype.has = function(t3) {
              return this.map.hasOwnProperty(c(t3));
            }, h.prototype.set = function(t3, e3) {
              this.map[c(t3)] = l(e3);
            }, h.prototype.forEach = function(t3, e3) {
              for (var r3 in this.map) this.map.hasOwnProperty(r3) && t3.call(e3, this.map[r3], r3, this);
            }, h.prototype.keys = function() {
              var t3 = [];
              return this.forEach((function(e3, r3) {
                t3.push(r3);
              })), f(t3);
            }, h.prototype.values = function() {
              var t3 = [];
              return this.forEach((function(e3) {
                t3.push(e3);
              })), f(t3);
            }, h.prototype.entries = function() {
              var t3 = [];
              return this.forEach((function(e3, r3) {
                t3.push([r3, e3]);
              })), f(t3);
            }, n2 && (h.prototype[Symbol.iterator] = h.prototype.entries);
            var b = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function v(t3, e3) {
              var r3, n3, i3 = (e3 = e3 || {}).body;
              if (t3 instanceof v) {
                if (t3.bodyUsed) throw new TypeError("Already read");
                this.url = t3.url, this.credentials = t3.credentials, e3.headers || (this.headers = new h(t3.headers)), this.method = t3.method, this.mode = t3.mode, this.signal = t3.signal, i3 || null == t3._bodyInit || (i3 = t3._bodyInit, t3.bodyUsed = true);
              } else this.url = String(t3);
              if (this.credentials = e3.credentials || this.credentials || "same-origin", !e3.headers && this.headers || (this.headers = new h(e3.headers)), this.method = (r3 = e3.method || this.method || "GET", n3 = r3.toUpperCase(), b.indexOf(n3) > -1 ? n3 : r3), this.mode = e3.mode || this.mode || null, this.signal = e3.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i3) throw new TypeError("Body not allowed for GET or HEAD requests");
              this._initBody(i3);
            }
            function w(t3) {
              var e3 = new FormData();
              return t3.trim().split("&").forEach((function(t4) {
                if (t4) {
                  var r3 = t4.split("="), n3 = r3.shift().replace(/\+/g, " "), i3 = r3.join("=").replace(/\+/g, " ");
                  e3.append(decodeURIComponent(n3), decodeURIComponent(i3));
                }
              })), e3;
            }
            function x(t3, e3) {
              e3 || (e3 = {}), this.type = "default", this.status = void 0 === e3.status ? 200 : e3.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e3 ? e3.statusText : "OK", this.headers = new h(e3.headers), this.url = e3.url || "", this._initBody(t3);
            }
            v.prototype.clone = function() {
              return new v(this, { body: this._bodyInit });
            }, m.call(v.prototype), m.call(x.prototype), x.prototype.clone = function() {
              return new x(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new h(this.headers), url: this.url });
            }, x.error = function() {
              var t3 = new x(null, { status: 0, statusText: "" });
              return t3.type = "error", t3;
            };
            var _ = [301, 302, 303, 307, 308];
            x.redirect = function(t3, e3) {
              if (-1 === _.indexOf(e3)) throw new RangeError("Invalid status code");
              return new x(null, { status: e3, headers: { location: t3 } });
            }, e2.DOMException = t2.DOMException;
            try {
              new e2.DOMException();
            } catch (t3) {
              e2.DOMException = function(t4, e3) {
                this.message = t4, this.name = e3;
                var r3 = Error(t4);
                this.stack = r3.stack;
              }, e2.DOMException.prototype = Object.create(Error.prototype), e2.DOMException.prototype.constructor = e2.DOMException;
            }
            function S(t3, r3) {
              return new Promise((function(n3, o2) {
                var s2 = new v(t3, r3);
                if (s2.signal && s2.signal.aborted) return o2(new e2.DOMException("Aborted", "AbortError"));
                var a2 = new XMLHttpRequest();
                function u2() {
                  a2.abort();
                }
                a2.onload = function() {
                  var t4, e3, r4 = { status: a2.status, statusText: a2.statusText, headers: (t4 = a2.getAllResponseHeaders() || "", e3 = new h(), t4.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function(t5) {
                    var r5 = t5.split(":"), n4 = r5.shift().trim();
                    if (n4) {
                      var i4 = r5.join(":").trim();
                      e3.append(n4, i4);
                    }
                  })), e3) };
                  r4.url = "responseURL" in a2 ? a2.responseURL : r4.headers.get("X-Request-URL");
                  var i3 = "response" in a2 ? a2.response : a2.responseText;
                  n3(new x(i3, r4));
                }, a2.onerror = function() {
                  o2(new TypeError("Network request failed"));
                }, a2.ontimeout = function() {
                  o2(new TypeError("Network request failed"));
                }, a2.onabort = function() {
                  o2(new e2.DOMException("Aborted", "AbortError"));
                }, a2.open(s2.method, s2.url, true), "include" === s2.credentials ? a2.withCredentials = true : "omit" === s2.credentials && (a2.withCredentials = false), "responseType" in a2 && i2 && (a2.responseType = "blob"), s2.headers.forEach((function(t4, e3) {
                  a2.setRequestHeader(e3, t4);
                })), s2.signal && (s2.signal.addEventListener("abort", u2), a2.onreadystatechange = function() {
                  4 === a2.readyState && s2.signal.removeEventListener("abort", u2);
                }), a2.send(void 0 === s2._bodyInit ? null : s2._bodyInit);
              }));
            }
            S.polyfill = true, t2.fetch || (t2.fetch = S, t2.Headers = h, t2.Request = v, t2.Response = x), e2.Headers = h, e2.Request = v, e2.Response = x, e2.fetch = S, Object.defineProperty(e2, "__esModule", { value: true });
          })({});
        })(n), n.fetch.ponyfill = true, delete n.fetch.polyfill;
        var i = n;
        (e = i.fetch).default = i.fetch, e.fetch = i.fetch, e.Headers = i.Headers, e.Request = i.Request, e.Response = i.Response, t.exports = e;
      }, function(t, e, r) {
        t.exports = function() {
          return r(112)('!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=106)}([function(t,e,r){"use strict";const n=r(73);t.exports=function(t){return"+"===t[0]&&(t=t.substring(1)),(t=(t=n(t)).replace(/^0+(?=\\d)/,"")).includes(".")&&(t=t.replace(/\\.?0+$/,"")),""===t&&(t="0"),"-0"===t&&(t="0"),t}},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(15),s=r(32);function a(t,e,r){t=i(t),e=i(e);const a="-"!==t[0],u="-"!==e[0],c=o(t),l=o(e);if(c||l)return a==u?"Infinity":"-Infinity";if("0"===e)throw new Error("[preciso] division by zero");if(""===t||"0"===t)return"0";const f=a!==u?"-":"";return a||(t=n(t)),u||(e=n(e)),f+s(t,e,r)}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return s})),r.d(e,"e",(function(){return a}));const n=Symbol("thread.errors"),i=Symbol("thread.events"),o=Symbol("thread.terminate"),s=Symbol("thread.transferable"),a=Symbol("thread.worker")},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";const n=r(0);function i(t){return"-"===(t=n(t))[0]?t.substring(1):t}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";function n(t,e){const r=t.length,n=e.length,i=t.indexOf("."),o=e.indexOf("."),s=-1===i?r:i,a=-1===o?n:o,u=s-a;let c=u<0?-1*u:0,l=u<=0?0:u,f=Math.max(s,a)+1+Math.max(r-s,n-a)-1,h=0;for(;h<f;){const r=h-c,n=r===s?".":t[r]||"0",i=h-l,o=i===a?".":e[i]||"0";if(n!==o){if(n>o)return">";if(n<o)return"<"}h++}return"="}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(5),i=r(0),o=r(8),s=r(31),a=r(15);function u(t,e,{infinity_minus_infinity:r="NaN"}={}){t=i(t),e=i(e);const u="-"!==t[0],c="-"!==e[0],l=!u,f=!c,h=a(t),d=a(e);if(h&&d)return u&&c?"Infinity":l&f?"-Infinity":r;if(h)return u?"Infinity":"-Infinity";if(d)return c?"Infinity":"-Infinity";if(u&&c)return o(t,e);if(l&&f)return"-"+o(t.substring(1),e.substring(1));if(l&&c)switch(t=t.substring(1),n(t,e)){case"=":return"0";case"<":return s(e,t);case">":return"-"+s(t,e)}else if(u&&!c)switch(e=e.substring(1),n(t,e)){case"=":return"0";case"<":return"-"+s(e,t);case">":return s(t,e)}}t.exports=u,t.exports.default=u},function(t,e){var r,n,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===o||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:o}catch(t){r=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var u,c=[],l=!1,f=-1;function h(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&d())}function d(){if(!l){var t=a(h);l=!0;for(var e=c.length;e;){for(u=c,c=[];++f<e;)u&&u[f].run();f=-1,e=c.length}u=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function y(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];c.push(new p(t,e)),1!==c.length||l||a(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=y,i.addListener=y,i.once=y,i.off=y,i.removeListener=y,i.removeAllListeners=y,i.emit=y,i.prependListener=y,i.prependOnceListener=y,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(t,e,r){"use strict";const{MAX_SAFE_INTEGER_LENGTH:n}=r(30);function i(t,e){const r=t.length,i=e.length,o=t.indexOf("."),s=e.indexOf("."),a=-1===o?r:o,u=-1===s?i:s;if(-1===o&&-1===s&&r<n&&i<n)return(Number(t)+Number(e)).toFixed();const c=a-u;let l=Math.max(a,u),f=Math.max(r-a-1,i-u-1),h=c<0?-1*c:0,d=c<=0?0:c,p=l+1+f-1,y="",g=0,m=p;if(f>0){for(;m>p-f;){const r=t[m-h]||"0",n=e[m-d]||"0";let i=Number(r)+Number(n)+g;i>=10?(i-=10,g=1):g=0,""===y&&0===i||(y=i+y),m--}y&&(y="."+y),m--}if(l>0)for(;m>=0;){const r=t[m-h]||"0",n=e[m-d]||"0";let i=Number(r)+Number(n)+g;i>=10?(i-=10,g=1):g=0,y=i+y,m--}return 1===g&&(y=g+y),"."===y[0]&&(y="0"+y),y}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";(function(t){\n/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <http://feross.org>\n * @license  MIT\n */\nvar n=r(108),i=r(109),o=r(61);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=u.prototype:(null===t&&(t=new u(e)),t.length=e),t}function u(t,e,r){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return f(this,t)}return c(this,t,e,r)}function c(t,e,r,n){if("number"==typeof e)throw new TypeError(\'"value" argument must not be a number\');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("\'offset\' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("\'length\' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?(t=e).__proto__=u.prototype:t=h(t,e);return t}(t,e,r,n):"string"==typeof e?function(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!u.isEncoding(r))throw new TypeError(\'"encoding" must be a valid string encoding\');var n=0|p(e,r),i=(t=a(t,n)).write(e,r);i!==n&&(t=t.slice(0,i));return t}(t,e,r):function(t,e){if(u.isBuffer(e)){var r=0|d(e.length);return 0===(t=a(t,r)).length||e.copy(t,0,0,r),t}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(n=e.length)!=n?a(t,0):h(t,e);if("Buffer"===e.type&&o(e.data))return h(t,e.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function l(t){if("number"!=typeof t)throw new TypeError(\'"size" argument must be a number\');if(t<0)throw new RangeError(\'"size" argument must not be negative\')}function f(t,e){if(l(e),t=a(t,e<0?0:0|d(e)),!u.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function h(t,e){var r=e.length<0?0:0|d(e.length);t=a(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function d(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function p(t,e){if(u.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return B(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return G(t).length;default:if(n)return B(t).length;e=(""+e).toLowerCase(),n=!0}}function y(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return O(this,e,r);case"utf8":case"utf-8":return k(this,e,r);case"ascii":return T(this,e,r);case"latin1":case"binary":return C(this,e,r);case"base64":return E(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function g(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function m(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:b(t,e,r,n,i);if("number"==typeof e)return e&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):b(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,e,r,n,i){var o,s=1,a=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,u/=2,r/=2}function c(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){var l=-1;for(o=r;o<a;o++)if(c(t,o)===c(e,-1===l?0:o-l)){if(-1===l&&(l=o),o-l+1===u)return l*s}else-1!==l&&(o-=o-l),l=-1}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var f=!0,h=0;h<u;h++)if(c(t,o+h)!==c(e,h)){f=!1;break}if(f)return o}return-1}function v(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[r+s]=a}return s}function w(t,e,r,n){return q(B(e,t.length-r),t,r,n)}function x(t,e,r,n){return q(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function _(t,e,r,n){return x(t,e,r,n)}function S(t,e,r,n){return q(G(e),t,r,n)}function A(t,e,r,n){return q(function(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function E(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function k(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,s,a,u,c=t[i],l=null,f=c>239?4:c>223?3:c>191?2:1;if(i+f<=r)switch(f){case 1:c<128&&(l=c);break;case 2:128==(192&(o=t[i+1]))&&(u=(31&c)<<6|63&o)>127&&(l=u);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(u=(15&c)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(l=u);break;case 4:o=t[i+1],s=t[i+2],a=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(l=u)}null===l?(l=65533,f=1):l>65535&&(l-=65536,n.push(l>>>10&1023|55296),l=56320|1023&l),n.push(l),i+=f}return function(t){var e=t.length;if(e<=4096)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=4096));return r}(n)}e.Buffer=u,e.SlowBuffer=function(t){+t!=t&&(t=0);return u.alloc(+t)},e.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=s(),u.poolSize=8192,u._augment=function(t){return t.__proto__=u.prototype,t},u.from=function(t,e,r){return c(null,t,e,r)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(t,e,r){return function(t,e,r,n){return l(e),e<=0?a(t,e):void 0!==r?"string"==typeof n?a(t,e).fill(r,n):a(t,e).fill(r):a(t,e)}(null,t,e,r)},u.allocUnsafe=function(t){return f(null,t)},u.allocUnsafeSlow=function(t){return f(null,t)},u.isBuffer=function(t){return!(null==t||!t._isBuffer)},u.compare=function(t,e){if(!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!o(t))throw new TypeError(\'"list" argument must be an Array of Buffers\');if(0===t.length)return u.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=u.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var s=t[r];if(!u.isBuffer(s))throw new TypeError(\'"list" argument must be an Array of Buffers\');s.copy(n,i),i+=s.length}return n},u.byteLength=p,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)g(this,e,e+1);return this},u.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)g(this,e,e+3),g(this,e+1,e+2);return this},u.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)g(this,e,e+7),g(this,e+1,e+6),g(this,e+2,e+5),g(this,e+3,e+4);return this},u.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?k(this,0,t):y.apply(this,arguments)},u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},u.prototype.compare=function(t,e,r,n,i){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0),a=Math.min(o,s),c=this.slice(n,i),l=t.slice(e,r),f=0;f<a;++f)if(c[f]!==l[f]){o=c[f],s=l[f];break}return o<s?-1:s<o?1:0},u.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return m(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return m(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return v(this,t,e,r);case"utf8":case"utf-8":return w(this,t,e,r);case"ascii":return x(this,t,e,r);case"latin1":case"binary":return _(this,t,e,r);case"base64":return S(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function T(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function C(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function O(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=U(t[o]);return i}function I(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function P(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function R(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError(\'"buffer" argument must be a Buffer instance\');if(e>i||e<o)throw new RangeError(\'"value" argument is out of bounds\');if(r+n>t.length)throw new RangeError("Index out of range")}function j(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function M(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255}function L(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function F(t,e,r,n,o){return o||L(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function N(t,e,r,n,o){return o||L(t,0,r,8),i.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),u.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=u.prototype;else{var i=e-t;r=new u(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+t]}return r},u.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||P(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},u.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||P(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},u.prototype.readUInt8=function(t,e){return e||P(t,1,this.length),this[t]},u.prototype.readUInt16LE=function(t,e){return e||P(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUInt16BE=function(t,e){return e||P(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUInt32LE=function(t,e){return e||P(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUInt32BE=function(t,e){return e||P(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||P(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||P(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},u.prototype.readInt8=function(t,e){return e||P(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){e||P(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){e||P(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return e||P(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return e||P(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readFloatLE=function(t,e){return e||P(t,4,this.length),i.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return e||P(t,4,this.length),i.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return e||P(t,8,this.length),i.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return e||P(t,8,this.length),i.read(this,t,!1,52,8)},u.prototype.writeUIntLE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||R(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUIntBE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||R(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,1,255,0),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):j(this,t,e,!0),e+2},u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):j(this,t,e,!1),e+2},u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):M(this,t,e,!0),e+4},u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):M(this,t,e,!1),e+4},u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);R(this,t,e,r,i-1,-i)}var o=0,s=1,a=0;for(this[e]=255&t;++o<r&&(s*=256);)t<0&&0===a&&0!==this[e+o-1]&&(a=1),this[e+o]=(t/s>>0)-a&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);R(this,t,e,r,i-1,-i)}var o=r-1,s=1,a=0;for(this[e+o]=255&t;--o>=0&&(s*=256);)t<0&&0===a&&0!==this[e+o+1]&&(a=1),this[e+o]=(t/s>>0)-a&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,1,127,-128),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):j(this,t,e,!0),e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):j(this,t,e,!1),e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):M(this,t,e,!0),e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||R(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):M(this,t,e,!1),e+4},u.prototype.writeFloatLE=function(t,e,r){return F(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return F(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return N(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return N(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,o=n-r;if(this===t&&r<e&&e<n)for(i=o-1;i>=0;--i)t[i+e]=this[i+r];else if(o<1e3||!u.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+o),e);return o},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var s=u.isBuffer(t)?t:B(new u(t,n).toString()),a=s.length;for(o=0;o<r-e;++o)this[o+e]=s[o%a]}return this};var D=/[^+\\/0-9A-Za-z-_]/g;function U(t){return t<16?"0"+t.toString(16):t.toString(16)}function B(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function G(t){return n.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\\s+|\\s+$/g,"")}(t).replace(D,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function q(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}}).call(this,r(3))},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){if(e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}}},function(t,e,r){"use strict";function n(t){return/^[-+]?0(\\.0+)?(e[\\.\\d]+)?$/.test(t)}t.exports=n,t.exports.default=n},function(t,e,r){(function(n){e.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;e.splice(1,0,r,"color: inherit");let n=0,i=0;e[0].replace(/%[a-zA-Z%]/g,t=>{"%%"!==t&&(n++,"%c"===t&&(i=n))}),e.splice(i,0,r)},e.save=function(t){try{t?e.storage.setItem("debug",t):e.storage.removeItem("debug")}catch(t){}},e.load=function(){let t;try{t=e.storage.getItem("debug")}catch(t){}!t&&void 0!==n&&"env"in n&&(t=n.env.DEBUG);return t},e.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/)},e.storage=function(){try{return localStorage}catch(t){}}(),e.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.log=console.debug||console.log||(()=>{}),t.exports=r(129)(e);const{formatters:i}=t.exports;i.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}}).call(this,r(7))},function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return s}));const n={deserialize:t=>Object.assign(Error(t.message),{name:t.name,stack:t.stack}),serialize:t=>({__error_marker:"$$error",message:t.message,name:t.name,stack:t.stack})};let i={deserialize(t){return(e=t)&&"object"==typeof e&&"__error_marker"in e&&"$$error"===e.__error_marker?n.deserialize(t):t;var e},serialize:t=>t instanceof Error?n.serialize(t):t};function o(t){return i.deserialize(t)}function s(t){return i.serialize(t)}},function(t,e,r){"use strict";var n=r(28),i=Object.keys||function(t){var e=[];for(var r in t)e.push(r);return e};t.exports=f;var o=Object.create(r(21));o.inherits=r(10);var s=r(60),a=r(65);o.inherits(f,s);for(var u=i(a.prototype),c=0;c<u.length;c++){var l=u[c];f.prototype[l]||(f.prototype[l]=a.prototype[l])}function f(t){if(!(this instanceof f))return new f(t);s.call(this,t),a.call(this,t),t&&!1===t.readable&&(this.readable=!1),t&&!1===t.writable&&(this.writable=!1),this.allowHalfOpen=!0,t&&!1===t.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",h)}function h(){this.allowHalfOpen||this._writableState.ended||n.nextTick(d,this)}function d(t){t.end()}Object.defineProperty(f.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(f.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(t){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=t,this._writableState.destroyed=t)}}),f.prototype._destroy=function(t,e){this.push(null),this.end(),n.nextTick(e,t)}},function(t,e,r){"use strict";function n(t){return!!t.match(/^(|-|\\+)inf(inity)?$/i)}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(0),i=r(15);function o(t){return!i(t)&&(!(t=n(t)).includes(".")&&!t.includes("/"))}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(5),s=r(48),a=r(36);function u(t,{max_decimal_digits:e}={}){let r=i(t[0]),u=n(r),c="-"===r[0]?"-":"";const l=t.length;for(let e=1;e<l;e++){const a=i(t[e]),l="-"===a[0]?"-":"",f=n(a);c=c!==l?"-":"";u="<"===o(u,f)?s(f,u):s(u,f),r=c+u}return"number"==typeof e&&(r=a(r,{digits:e})),r}t.exports=u,t.exports.default=u},function(t,e,r){const n=r(179);t.exports=function(t){return"+"===t[0]&&(t=t.substring(1)),(t=(t=n(t)).replace(/^0+(?=\\d)/,"")).includes(".")&&(t=t.replace(/\\.?0+$/,"")),""===t&&(t="0"),t}},function(t,e,r){"use strict";let n;function i(){return n||(n=function(){try{throw new Error}catch(t){const e=(""+t.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\\/\\/[^)\\n]+/g);if(e)return(""+e[0]).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\\/\\/.+)?\\/[^/]+(?:\\?.*)?$/,"$1")+"/"}return"/"}()),n}r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return c}));const o="undefined"!=typeof navigator&&navigator.hardwareConcurrency?navigator.hardwareConcurrency:4,s=t=>/^[a-zA-Z][a-zA-Z\\d+\\-.]*:/.test(t);function a(t){const e=new Blob([t],{type:"application/javascript"});return URL.createObjectURL(e)}let u;function c(){return u||(u=function(){if("undefined"==typeof Worker)return class{constructor(){throw Error("No web worker implementation available. You might have tried to spawn a worker within a worker in a browser that doesn\'t support workers in workers.")}};class t extends Worker{constructor(t,e){var r,n;"string"==typeof t&&e&&e._baseURL?t=new URL(t,e._baseURL):"string"==typeof t&&!s(t)&&i().match(/^file:\\/\\//i)&&(t=new URL(t,i().replace(/\\/[^\\/]+$/,"/")),(null===(r=null==e?void 0:e.CORSWorkaround)||void 0===r||r)&&(t=a(`importScripts(${JSON.stringify(t)});`))),"string"==typeof t&&s(t)&&(null===(n=null==e?void 0:e.CORSWorkaround)||void 0===n||n)&&(t=a(`importScripts(${JSON.stringify(t)});`)),super(t,e)}}class e extends t{constructor(t,e){super(window.URL.createObjectURL(t),e)}static fromText(t,r){const n=new window.Blob([t],{type:"text/javascript"});return new e(n,r)}}return{blob:e,default:t}}()),u}},function(t,e,r){"use strict";var n,i;r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return i})),function(t){t.cancel="cancel",t.run="run"}(n||(n={})),function(t){t.error="error",t.init="init",t.result="result",t.running="running",t.uncaughtError="uncaughtError"}(i||(i={}))},function(t,e,r){function n(t){return Object.prototype.toString.call(t)}e.isArray=function(t){return Array.isArray?Array.isArray(t):"[object Array]"===n(t)},e.isBoolean=function(t){return"boolean"==typeof t},e.isNull=function(t){return null===t},e.isNullOrUndefined=function(t){return null==t},e.isNumber=function(t){return"number"==typeof t},e.isString=function(t){return"string"==typeof t},e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=function(t){return void 0===t},e.isRegExp=function(t){return"[object RegExp]"===n(t)},e.isObject=function(t){return"object"==typeof t&&null!==t},e.isDate=function(t){return"[object Date]"===n(t)},e.isError=function(t){return"[object Error]"===n(t)||t instanceof Error},e.isFunction=function(t){return"function"==typeof t},e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=r(9).Buffer.isBuffer},function(t,e,r){"use strict";const n=r(11),i=r(50);function o(t){return n(t)?"":i(t)}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(35);function i(t,e){return n(t,"2",e)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(2);function i(t){throw Error(t)}const o={errors:t=>t[n.a]||i("Error observable not found. Make sure to pass a thread instance as returned by the spawn() promise."),events:t=>t[n.b]||i("Events observable not found. Make sure to pass a thread instance as returned by the spawn() promise."),terminate:t=>t[n.c]()}},function(t,e){},function(t,e,r){"use strict";const n=()=>"function"==typeof Symbol,i=t=>n()&&Boolean(Symbol[t]),o=t=>i(t)?Symbol[t]:"@@"+t;i("asyncIterator")||(Symbol.asyncIterator=Symbol.asyncIterator||Symbol.for("Symbol.asyncIterator"));const s=o("iterator"),a=o("observable"),u=o("species");function c(t,e){const r=t[e];if(null!=r){if("function"!=typeof r)throw new TypeError(r+" is not a function");return r}}function l(t){let e=t.constructor;return void 0!==e&&(e=e[u],null===e&&(e=void 0)),void 0!==e?e:v}function f(t){f.log?f.log(t):setTimeout(()=>{throw t},0)}function h(t){Promise.resolve().then(()=>{try{t()}catch(t){f(t)}})}function d(t){const e=t._cleanup;if(void 0!==e&&(t._cleanup=void 0,e))try{if("function"==typeof e)e();else{const t=c(e,"unsubscribe");t&&t.call(e)}}catch(t){f(t)}}function p(t){t._observer=void 0,t._queue=void 0,t._state="closed"}function y(t,e,r){t._state="running";const n=t._observer;try{const i=n?c(n,e):void 0;switch(e){case"next":i&&i.call(n,r);break;case"error":if(p(t),!i)throw r;i.call(n,r);break;case"complete":p(t),i&&i.call(n)}}catch(t){f(t)}"closed"===t._state?d(t):"running"===t._state&&(t._state="ready")}function g(t,e,r){if("closed"!==t._state)return"buffering"===t._state?(t._queue=t._queue||[],void t._queue.push({type:e,value:r})):"ready"!==t._state?(t._state="buffering",t._queue=[{type:e,value:r}],void h(()=>function(t){const e=t._queue;if(e){t._queue=void 0,t._state="ready";for(const r of e)if(y(t,r.type,r.value),"closed"===t._state)break}}(t))):void y(t,e,r)}class m{constructor(t,e){this._cleanup=void 0,this._observer=t,this._queue=void 0,this._state="initializing";const r=new b(this);try{this._cleanup=e.call(void 0,r)}catch(t){r.error(t)}"initializing"===this._state&&(this._state="ready")}get closed(){return"closed"===this._state}unsubscribe(){"closed"!==this._state&&(p(this),d(this))}}class b{constructor(t){this._subscription=t}get closed(){return"closed"===this._subscription._state}next(t){g(this._subscription,"next",t)}error(t){g(this._subscription,"error",t)}complete(){g(this._subscription,"complete")}}class v{constructor(t){if(!(this instanceof v))throw new TypeError("Observable cannot be called as a function");if("function"!=typeof t)throw new TypeError("Observable initializer must be a function");this._subscriber=t}subscribe(t,e,r){return"object"==typeof t&&null!==t||(t={next:t,error:e,complete:r}),new m(t,this._subscriber)}pipe(t,...e){let r=this;for(const n of[t,...e])r=n(r);return r}tap(t,e,r){const n="object"!=typeof t||null===t?{next:t,error:e,complete:r}:t;return new v(t=>this.subscribe({next(e){n.next&&n.next(e),t.next(e)},error(e){n.error&&n.error(e),t.error(e)},complete(){n.complete&&n.complete(),t.complete()},start(t){n.start&&n.start(t)}}))}forEach(t){return new Promise((e,r)=>{if("function"!=typeof t)return void r(new TypeError(t+" is not a function"));function n(){i.unsubscribe(),e(void 0)}const i=this.subscribe({next(e){try{t(e,n)}catch(t){r(t),i.unsubscribe()}},error(t){r(t)},complete(){e(void 0)}})})}map(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return new(l(this))(e=>this.subscribe({next(r){let n=r;try{n=t(r)}catch(t){return e.error(t)}e.next(n)},error(t){e.error(t)},complete(){e.complete()}}))}filter(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return new(l(this))(e=>this.subscribe({next(r){try{if(!t(r))return}catch(t){return e.error(t)}e.next(r)},error(t){e.error(t)},complete(){e.complete()}}))}reduce(t,e){if("function"!=typeof t)throw new TypeError(t+" is not a function");const r=l(this),n=arguments.length>1;let i=!1,o=e;return new r(e=>this.subscribe({next(r){const s=!i;if(i=!0,!s||n)try{o=t(o,r)}catch(t){return e.error(t)}else o=r},error(t){e.error(t)},complete(){if(!i&&!n)return e.error(new TypeError("Cannot reduce an empty sequence"));e.next(o),e.complete()}}))}concat(...t){const e=l(this);return new e(r=>{let n,i=0;return function o(s){n=s.subscribe({next(t){r.next(t)},error(t){r.error(t)},complete(){i===t.length?(n=void 0,r.complete()):o(e.from(t[i++]))}})}(this),()=>{n&&(n.unsubscribe(),n=void 0)}})}flatMap(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");const e=l(this);return new e(r=>{const n=[],i=this.subscribe({next(i){let s;if(t)try{s=t(i)}catch(t){return r.error(t)}else s=i;const a=e.from(s).subscribe({next(t){r.next(t)},error(t){r.error(t)},complete(){const t=n.indexOf(a);t>=0&&n.splice(t,1),o()}});n.push(a)},error(t){r.error(t)},complete(){o()}});function o(){i.closed&&0===n.length&&r.complete()}return()=>{n.forEach(t=>t.unsubscribe()),i.unsubscribe()}})}[(Symbol.observable,a)](){return this}static from(t){const e="function"==typeof this?this:v;if(null==t)throw new TypeError(t+" is not an object");const r=c(t,a);if(r){const n=r.call(t);if(Object(n)!==n)throw new TypeError(n+" is not an object");return function(t){return t instanceof v}(n)&&n.constructor===e?n:new e(t=>n.subscribe(t))}if(i("iterator")){const r=c(t,s);if(r)return new e(e=>{h(()=>{if(!e.closed){for(const n of r.call(t))if(e.next(n),e.closed)return;e.complete()}})})}if(Array.isArray(t))return new e(e=>{h(()=>{if(!e.closed){for(const r of t)if(e.next(r),e.closed)return;e.complete()}})});throw new TypeError(t+" is not observable")}static of(...t){return new("function"==typeof this?this:v)(e=>{h(()=>{if(!e.closed){for(const r of t)if(e.next(r),e.closed)return;e.complete()}})})}static get[u](){return this}}n()&&Object.defineProperty(v,Symbol("extensions"),{value:{symbol:a,hostReportError:f},configurable:!0});e.a=v},function(t,e,r){"use strict";var n;r.d(e,"a",(function(){return n})),function(t){t.internalError="internalError",t.message="message",t.termination="termination"}(n||(n={}))},function(t,e,r){"use strict";(function(e){void 0===e||!e.version||0===e.version.indexOf("v0.")||0===e.version.indexOf("v1.")&&0!==e.version.indexOf("v1.8.")?t.exports={nextTick:function(t,r,n,i){if("function"!=typeof t)throw new TypeError(\'"callback" argument must be a function\');var o,s,a=arguments.length;switch(a){case 0:case 1:return e.nextTick(t);case 2:return e.nextTick((function(){t.call(null,r)}));case 3:return e.nextTick((function(){t.call(null,r,n)}));case 4:return e.nextTick((function(){t.call(null,r,n,i)}));default:for(o=new Array(a-1),s=0;s<o.length;)o[s++]=arguments[s];return e.nextTick((function(){t.apply(null,o)}))}}}:t.exports=e}).call(this,r(7))},function(t,e,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)i(r,n)&&(t[n]=r[n])}}return t},e.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var o={arraySet:function(t,e,r,n,i){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+n),i);else for(var o=0;o<n;o++)t[i+o]=e[r+o]},flattenChunks:function(t){var e,r,n,i,o,s;for(n=0,e=0,r=t.length;e<r;e++)n+=t[e].length;for(s=new Uint8Array(n),i=0,e=0,r=t.length;e<r;e++)o=t[e],s.set(o,i),i+=o.length;return s}},s={arraySet:function(t,e,r,n,i){for(var o=0;o<n;o++)t[i+o]=e[r+o]},flattenChunks:function(t){return[].concat.apply([],t)}};e.setTyped=function(t){t?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,o)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},function(t,e,r){"use strict";const{MAX_SAFE_INTEGER:n}=r(74),i=n.toString().length-1;t.exports={MAX_SAFE_INTEGER_LENGTH:i}},function(t,e,r){"use strict";const{MAX_SAFE_INTEGER_LENGTH:n}=r(30);function i(t,e){const r=t.length,i=e.length,o=t.indexOf("."),s=e.indexOf("."),a=-1===o?r:o,u=-1===s?i:s;if(-1===o&&-1===s&&r<n&&i<n)return(Number(t)-Number(e)).toFixed();const c=a-u;let l=Math.max(a,u),f=Math.max(r-a-1,i-u-1),h=c<0?-1*c:0,d=c<=0?0:c,p=l+1+f-1,y="",g=0,m=p;if(f>0){for(;m>p-f;){let r=t[m-h]||"0",n=e[m-d]||"0";r-=g,g=0;let i=r-n;if(i<0)for(;i<0;)g++,i+=10;else g&&g--;""===y&&0===i||(y=i+y),m--}""!==y&&(y="."+y),m--}if(l>0){for(;m>0;){let r=t[m-h]||"0",n=e[m-d]||"0";r-=g,g=0;let i=r-n;if(i<0)for(;i<0;)g++,i+=10;else g&&g--;y=i+y,m--}const r=t[0-h]||"0",n=e[0-d]||"0";let i=Number(r)-(g>0?1:0)-Number(n);0!==i&&(y=i+y),y=y.replace(/^0+/,"")}return"."===y[0]&&(y="0"+y),y}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(5),i=r(6),o=r(33),s=r(49);function a(t,e,{format:r="string",max_decimal_digits:a=100,ellipsis:u=!1}={}){"0"===t[0]&&(t=t.substring(1)),"0"===e[0]&&(e=e.substring(1));const c=t.indexOf("."),l=e.indexOf("."),f=-1===c?t.length:c,h=-1===l?0:e.length-1-l;let d=!1;t=t.replace(/\\./,""),e=e.replace(/\\./,"");const p=t.length;let y,g="",m="",b=-1*h,v=0;for(let r=0;r<p;r++){if(g+=t[r],y=n(g,e),">"===y){let t=1,r=i(e,e),s=e;for(;">"!==n(r,g);)t++,s=r,r=i(r,e);if(t=t.toString(),""!==m)for(let e=t.length;e<=v;e++)m+="0";m+=t,g=o(g,s),v=0}else{if("<"===y){""===m&&b++,v++;continue}if("="===y){if(""!==m)for(let t=0;t<v;t++)m+="0";m+="1",g="0",v=0}}}if(g.match(/^0+$/g))"<"===y&&(m+=g.substring(0,g.length-1));else{const t={},r=f-b-m.length+a+1;""===m&&(v=0);for(let s=0;s<r;s++){if(g+="0",u)if(g in t){if(t[g]++,t[g]>3){m+="...",d=!0;break}}else t[g]=1;const r=n(g,e);if(">"===r){let t=1,r=i(e,e),s=e;for(;">"!==n(r,g);)t++,s=r,r=i(r,e);t=t.toString();for(let e=t.length;e<=v;e++)m+="0";if(m+=t,g=o(g,s),"0"===g)break;v=0}else{if("<"===r){v++;continue}if("="===r){for(let t=0;t<v;t++)m+="0";m+="1",v=0;break}}}}const w=f-b,x=m.length;let _;if(w===x)_=0;else if(w<0)m="0."+"0".repeat(Math.abs(w))+m,_=x-w;else if(w>x){for(let t=x;t<w;t++)m+="0";_=0}else w<x?(m=m.substring(0,w)+"."+m.substring(w),_=x-w):0===w&&(m="0."+m,_=x);m=m.replace(/^0+/,""),m=m.replace(/\\.\\d+0+$/,"");const S=_-a;return d||S>0&&(m=s(m.substring(0,m.length-S+1))),"."===m[0]&&(m="0"+m),"object"===r?{quotient:m,extra_decimals:S}:m}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(0),i=r(5),o=r(15),s=r(8),a=r(31);function u(t,e,{infinity_minus_infinity:r="NaN"}={}){t=n(t),e=n(e);const u=!("-"===t[0]),c=!("-"===e[0]),l=o(t),f=o(e);if(l&&f){if(u===c)return r;if(u)return"Infinity";if(c)return"-Infinity"}else{if(l)return t;if(f)return c?"-Infinity":"Infinity"}if(u){if(c){const r=i(t,e);return">"===r?a(t,e):"<"===r?"-"+a(e,t):"0"}return s(t,e.substring(1))}if(c)return"-"+s(t.substring(1),e);{t=t.substring(1),e=e.substring(1);const r=i(t,e);return">"===r?"-"+a(t,e):"<"===r?a(e,t):"0"}}t.exports=u,t.exports.default=u},function(t,e,r){"use strict";const n=r(0),i=r(5);function o(t,e){t=n(t),e=n(e);const r="-"!==t[0],o="-"!==e[0];return r?o?i(t,e):">":o?"<":i(e.substring(1),t.substring(1))}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(1),s=r(77),a=r(16),u=r(52),c=r(78),l=r(11),f=r(53),h=r(54),d=r(81),p=r(37),y=r(36),g=r(22),m=r(85);function b(t,e,{zero_to_the_power_of_zero:r="1",ellipsis:b=!1,imaginary:v=!0,max_decimal_digits:w=100,fraction:x=!1}={}){t=i(t),e=i(e);const _=v&&u(t);_&&(t=t.replace(/i$/,""));const S=l(t),A=l(e);if(S&&A)return r;if(A)return"1";const E=g(e);if(S){if("+"===E)return"0";if("-"===E)return"Infinity"}const k=a(e);if("+"===E&&k){let r=h(t,e);return"number"==typeof w&&(r=y(r,{digits:w})),_&&c(e)&&(r+="i"),r}if("-"===E&&k){const r="1",i=h(t,n(e));return o(r,i,{ellipsis:b,max_decimal_digits:w})}if(!k){e=n(e);let[r,i]=e.includes("/")?e.split("/"):s(e);[r,i]=m(r,i);let o=p(t,i,{imaginary:v}),a=f(r,o);return"number"==typeof w&&(a=y(a,{digits:w})),"-"===E&&(a=d(a,{fraction:x,max_decimal_digits:w})),a}}t.exports=b,t.exports.default=b},function(t,e,r){"use strict";const n=r(52),i=r(159);function o(t,{digits:e=0}={}){return n(t)?i(t.substring(0,t.length-1),{digits:e})+"i":i(t,{digits:e})}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(5),s=r(82),a=r(16),u=r(80),c=r(54),l=r(83);function f(t,e,{imaginary:r=!0,max_decimal_digits:f=100}={}){if(t=i(t),"1"===(e=i(e)))return t;if("1"===t)return"1";if(!a(e))throw new Error("[preciso] can\'t find fractional roots");if(u(e))throw new Error("[preciso] can\'t find root of negative indexes");const h=n(t),d=u(t),p=s(e),y=d&&p;if(y&&!r)throw new Error("[preciso] root has an imaginary number");const g=d&&!p?"-":"",m=l(h,e),b=["9","8","7","6","5","4","3","2","1","0"];let v="";for(let t=0;t<m;t++)for(let r=0;r<b.length;r++){const n=v+b[r];let i=n+"0".repeat(m-t-1);const s=c(i,e),a=o(s,h);if("="===a)return y&&(i+="i"),g+i;if("<"===a){v=n;break}}let w=v+".";for(let t=0;t<f;t++){let t=!1;for(let r=0;r<b.length;r++){let n=w+b[r];const i=c(n,e),s=o(i,h);if("="===s)return y&&(n+="i"),g+n;if("<"===s){w=n,t=!0;break}}if(!t)break}return y&&(w+="i"),g+w}t.exports=f,t.exports.default=f},function(t,e,r){r(18);function n(t,e){const r=t.length,n=e.length,i=t.indexOf("."),o=e.indexOf("."),s=-1===i?r:i,a=-1===o?n:o,u=s-a;let c=u<0?-1*u:0,l=u<=0?0:u,f=Math.max(s,a)+1+Math.max(r-s,n-a)-1,h=0;for(;h<f;){const r=h-c,n=r===s?".":t[r]||"0",i=h-l,o=i===a?".":e[i]||"0";if(n!==o){if(n>o)return">";if(n<o)return"<"}h++}return"="}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";var n=r(135);function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}var o=/^([a-z0-9.+-]+:)/i,s=/:[0-9]*$/,a=/^(\\/\\/?(?!\\/)[^?\\s]*)(\\?[^\\s]*)?$/,u=["{","}","|","\\\\","^","`"].concat(["<",">",\'"\',"`"," ","\\r","\\n","\\t"]),c=["\'"].concat(u),l=["%","/","?",";","#"].concat(c),f=["/","?","#"],h=/^[+a-z0-9A-Z_-]{0,63}$/,d=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,p={javascript:!0,"javascript:":!0},y={javascript:!0,"javascript:":!0},g={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},m=r(137);function b(t,e,r){if(t&&"object"==typeof t&&t instanceof i)return t;var n=new i;return n.parse(t,e,r),n}i.prototype.parse=function(t,e,r){if("string"!=typeof t)throw new TypeError("Parameter \'url\' must be a string, not "+typeof t);var i=t.indexOf("?"),s=-1!==i&&i<t.indexOf("#")?"?":"#",u=t.split(s);u[0]=u[0].replace(/\\\\/g,"/");var b=t=u.join(s);if(b=b.trim(),!r&&1===t.split("#").length){var v=a.exec(b);if(v)return this.path=b,this.href=b,this.pathname=v[1],v[2]?(this.search=v[2],this.query=e?m.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var w=o.exec(b);if(w){var x=(w=w[0]).toLowerCase();this.protocol=x,b=b.substr(w.length)}if(r||w||b.match(/^\\/\\/[^@/]+@[^@/]+/)){var _="//"===b.substr(0,2);!_||w&&y[w]||(b=b.substr(2),this.slashes=!0)}if(!y[w]&&(_||w&&!g[w])){for(var S,A,E=-1,k=0;k<f.length;k++){-1!==(T=b.indexOf(f[k]))&&(-1===E||T<E)&&(E=T)}-1!==(A=-1===E?b.lastIndexOf("@"):b.lastIndexOf("@",E))&&(S=b.slice(0,A),b=b.slice(A+1),this.auth=decodeURIComponent(S)),E=-1;for(k=0;k<l.length;k++){var T;-1!==(T=b.indexOf(l[k]))&&(-1===E||T<E)&&(E=T)}-1===E&&(E=b.length),this.host=b.slice(0,E),b=b.slice(E),this.parseHost(),this.hostname=this.hostname||"";var C="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!C)for(var O=this.hostname.split(/\\./),I=(k=0,O.length);k<I;k++){var P=O[k];if(P&&!P.match(h)){for(var R="",j=0,M=P.length;j<M;j++)P.charCodeAt(j)>127?R+="x":R+=P[j];if(!R.match(h)){var L=O.slice(0,k),F=O.slice(k+1),N=P.match(d);N&&(L.push(N[1]),F.unshift(N[2])),F.length&&(b="/"+F.join(".")+b),this.hostname=L.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),C||(this.hostname=n.toASCII(this.hostname));var D=this.port?":"+this.port:"",U=this.hostname||"";this.host=U+D,this.href+=this.host,C&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==b[0]&&(b="/"+b))}if(!p[x])for(k=0,I=c.length;k<I;k++){var B=c[k];if(-1!==b.indexOf(B)){var G=encodeURIComponent(B);G===B&&(G=escape(B)),b=b.split(B).join(G)}}var q=b.indexOf("#");-1!==q&&(this.hash=b.substr(q),b=b.slice(0,q));var z=b.indexOf("?");if(-1!==z?(this.search=b.substr(z),this.query=b.substr(z+1),e&&(this.query=m.parse(this.query)),b=b.slice(0,z)):e&&(this.search="",this.query={}),b&&(this.pathname=b),g[x]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){D=this.pathname||"";var H=this.search||"";this.path=D+H}return this.href=this.format(),this},i.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",r=this.pathname||"",n=this.hash||"",i=!1,o="";this.host?i=t+this.host:this.hostname&&(i=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&"object"==typeof this.query&&Object.keys(this.query).length&&(o=m.stringify(this.query));var s=this.search||o&&"?"+o||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||g[e])&&!1!==i?(i="//"+(i||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):i||(i=""),n&&"#"!==n.charAt(0)&&(n="#"+n),s&&"?"!==s.charAt(0)&&(s="?"+s),e+i+(r=r.replace(/[?#]/g,(function(t){return encodeURIComponent(t)})))+(s=s.replace("#","%23"))+n},i.prototype.resolve=function(t){return this.resolveObject(b(t,!1,!0)).format()},i.prototype.resolveObject=function(t){if("string"==typeof t){var e=new i;e.parse(t,!1,!0),t=e}for(var r=new i,n=Object.keys(this),o=0;o<n.length;o++){var s=n[o];r[s]=this[s]}if(r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol){for(var a=Object.keys(t),u=0;u<a.length;u++){var c=a[u];"protocol"!==c&&(r[c]=t[c])}return g[r.protocol]&&r.hostname&&!r.pathname&&(r.pathname="/",r.path=r.pathname),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){if(!g[t.protocol]){for(var l=Object.keys(t),f=0;f<l.length;f++){var h=l[f];r[h]=t[h]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||y[t.protocol])r.pathname=t.pathname;else{for(var d=(t.pathname||"").split("/");d.length&&!(t.host=d.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==d[0]&&d.unshift(""),d.length<2&&d.unshift(""),r.pathname=d.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var p=r.pathname||"",m=r.search||"";r.path=p+m}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var b=r.pathname&&"/"===r.pathname.charAt(0),v=t.host||t.pathname&&"/"===t.pathname.charAt(0),w=v||b||r.host&&t.pathname,x=w,_=r.pathname&&r.pathname.split("/")||[],S=(d=t.pathname&&t.pathname.split("/")||[],r.protocol&&!g[r.protocol]);if(S&&(r.hostname="",r.port=null,r.host&&(""===_[0]?_[0]=r.host:_.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===d[0]?d[0]=t.host:d.unshift(t.host)),t.host=null),w=w&&(""===d[0]||""===_[0])),v)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,_=d;else if(d.length)_||(_=[]),_.pop(),_=_.concat(d),r.search=t.search,r.query=t.query;else if(null!=t.search){if(S)r.host=_.shift(),r.hostname=r.host,(C=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=C.shift(),r.hostname=C.shift(),r.host=r.hostname);return r.search=t.search,r.query=t.query,null===r.pathname&&null===r.search||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!_.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var A=_.slice(-1)[0],E=(r.host||t.host||_.length>1)&&("."===A||".."===A)||""===A,k=0,T=_.length;T>=0;T--)"."===(A=_[T])?_.splice(T,1):".."===A?(_.splice(T,1),k++):k&&(_.splice(T,1),k--);if(!w&&!x)for(;k--;k)_.unshift("..");!w||""===_[0]||_[0]&&"/"===_[0].charAt(0)||_.unshift(""),E&&"/"!==_.join("/").substr(-1)&&_.push("");var C,O=""===_[0]||_[0]&&"/"===_[0].charAt(0);S&&(r.hostname=O?"":_.length?_.shift():"",r.host=r.hostname,(C=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@"))&&(r.auth=C.shift(),r.hostname=C.shift(),r.host=r.hostname));return(w=w||r.host&&_.length)&&!O&&_.unshift(""),_.length>0?r.pathname=_.join("/"):(r.pathname=null,r.path=null),null===r.pathname&&null===r.search||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},i.prototype.parseHost=function(){var t=this.host,e=s.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)},e.parse=b,e.resolve=function(t,e){return b(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?b(t,!1,!0).resolveObject(e):e},e.format=function(t){return"string"==typeof t&&(t=b(t)),t instanceof i?t.format():i.prototype.format.call(t)},e.Url=i},function(t,e,r){(function(t){var n=r(131),i=r(70),o=r(133),s=r(134),a=r(39),u=e;u.request=function(e,r){e="string"==typeof e?a.parse(e):o(e);var i=-1===t.location.protocol.search(/^https?:$/)?"http:":"",s=e.protocol||i,u=e.hostname||e.host,c=e.port,l=e.path||"/";u&&-1!==u.indexOf(":")&&(u="["+u+"]"),e.url=(u?s+"//"+u:"")+(c?":"+c:"")+l,e.method=(e.method||"GET").toUpperCase(),e.headers=e.headers||{};var f=new n(e);return r&&f.on("response",r),f},u.get=function(t,e){var r=u.request(t,e);return r.end(),r},u.ClientRequest=n,u.IncomingMessage=i.IncomingMessage,u.Agent=function(){},u.Agent.defaultMaxSockets=4,u.globalAgent=new u.Agent,u.STATUS_CODES=s,u.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(this,r(3))},,function(t,e,r){(e=t.exports=r(60)).Stream=e,e.Readable=e,e.Writable=r(65),e.Duplex=r(14),e.Transform=r(67),e.PassThrough=r(117)},function(t,e,r){var n=r(9),i=n.Buffer;function o(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return i(t,e,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=n:(o(n,e),e.Buffer=s),o(i,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");var n=i(t);return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}},function(t,e,r){"use strict";var n=SyntaxError,i=Function,o=TypeError,s=function(t){try{return i(\'"use strict"; return (\'+t+").constructor;")()}catch(t){}},a=Object.getOwnPropertyDescriptor;if(a)try{a({},"")}catch(t){a=null}var u=function(){throw new o},c=a?function(){try{return u}catch(t){try{return a(arguments,"callee").get}catch(t){return u}}}():u,l=r(140)(),f=r(142)(),h=Object.getPrototypeOf||(f?function(t){return t.__proto__}:null),d={},p="undefined"!=typeof Uint8Array&&h?h(Uint8Array):void 0,y={"%AggregateError%":"undefined"==typeof AggregateError?void 0:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer,"%ArrayIteratorPrototype%":l&&h?h([][Symbol.iterator]()):void 0,"%AsyncFromSyncIteratorPrototype%":void 0,"%AsyncFunction%":d,"%AsyncGenerator%":d,"%AsyncGeneratorFunction%":d,"%AsyncIteratorPrototype%":d,"%Atomics%":"undefined"==typeof Atomics?void 0:Atomics,"%BigInt%":"undefined"==typeof BigInt?void 0:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?void 0:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?void 0:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?void 0:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?void 0:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?void 0:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?void 0:FinalizationRegistry,"%Function%":i,"%GeneratorFunction%":d,"%Int8Array%":"undefined"==typeof Int8Array?void 0:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?void 0:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?void 0:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":l&&h?h(h([][Symbol.iterator]())):void 0,"%JSON%":"object"==typeof JSON?JSON:void 0,"%Map%":"undefined"==typeof Map?void 0:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&l&&h?h((new Map)[Symbol.iterator]()):void 0,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?void 0:Promise,"%Proxy%":"undefined"==typeof Proxy?void 0:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?void 0:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?void 0:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&l&&h?h((new Set)[Symbol.iterator]()):void 0,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":l&&h?h(""[Symbol.iterator]()):void 0,"%Symbol%":l?Symbol:void 0,"%SyntaxError%":n,"%ThrowTypeError%":c,"%TypedArray%":p,"%TypeError%":o,"%Uint8Array%":"undefined"==typeof Uint8Array?void 0:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?void 0:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?void 0:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?void 0:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?void 0:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?void 0:WeakSet};if(h)try{null.error}catch(t){var g=h(h(t));y["%Error.prototype%"]=g}var m={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},b=r(45),v=r(144),w=b.call(Function.call,Array.prototype.concat),x=b.call(Function.apply,Array.prototype.splice),_=b.call(Function.call,String.prototype.replace),S=b.call(Function.call,String.prototype.slice),A=b.call(Function.call,RegExp.prototype.exec),E=/[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g,k=/\\\\(\\\\)?/g,T=function(t){var e=S(t,0,1),r=S(t,-1);if("%"===e&&"%"!==r)throw new n("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==e)throw new n("invalid intrinsic syntax, expected opening `%`");var i=[];return _(t,E,(function(t,e,r,n){i[i.length]=r?_(n,k,"$1"):e||t})),i},C=function(t,e){var r,i=t;if(v(m,i)&&(i="%"+(r=m[i])[0]+"%"),v(y,i)){var a=y[i];if(a===d&&(a=function t(e){var r;if("%AsyncFunction%"===e)r=s("async function () {}");else if("%GeneratorFunction%"===e)r=s("function* () {}");else if("%AsyncGeneratorFunction%"===e)r=s("async function* () {}");else if("%AsyncGenerator%"===e){var n=t("%AsyncGeneratorFunction%");n&&(r=n.prototype)}else if("%AsyncIteratorPrototype%"===e){var i=t("%AsyncGenerator%");i&&h&&(r=h(i.prototype))}return y[e]=r,r}(i)),void 0===a&&!e)throw new o("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:r,name:i,value:a}}throw new n("intrinsic "+t+" does not exist!")};t.exports=function(t,e){if("string"!=typeof t||0===t.length)throw new o("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new o(\'"allowMissing" argument must be a boolean\');if(null===A(/^%?[^%]*%?$/,t))throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=T(t),i=r.length>0?r[0]:"",s=C("%"+i+"%",e),u=s.name,c=s.value,l=!1,f=s.alias;f&&(i=f[0],x(r,w([0,1],f)));for(var h=1,d=!0;h<r.length;h+=1){var p=r[h],g=S(p,0,1),m=S(p,-1);if((\'"\'===g||"\'"===g||"`"===g||\'"\'===m||"\'"===m||"`"===m)&&g!==m)throw new n("property names with quotes must have matching quotes");if("constructor"!==p&&d||(l=!0),v(y,u="%"+(i+="."+p)+"%"))c=y[u];else if(null!=c){if(!(p in c)){if(!e)throw new o("base intrinsic for "+t+" exists, but the property is not available.");return}if(a&&h+1>=r.length){var b=a(c,p);c=(d=!!b)&&"get"in b&&!("originalValue"in b.get)?b.get:c[p]}else d=v(c,p),c=c[p];d&&!l&&(y[u]=c)}}return c}},function(t,e,r){"use strict";var n=r(143);t.exports=Function.prototype.bind||n},function(t,e,r){"use strict";var n=String.prototype.replace,i=/%20/g,o="RFC1738",s="RFC3986";t.exports={default:s,formatters:{RFC1738:function(t){return n.call(t,i,"+")},RFC3986:function(t){return String(t)}},RFC1738:o,RFC3986:s}},function(t,e,r){"use strict";const n=r(5),i=r(11),o=r(48),s=r(8);function a(t,e,r="1"){if(i(t))return"0";let a=t,u=t;for(;"<"===n(u,e);)u=s(u,r),a=o(a,u);return a}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const{MAX_SAFE_INTEGER_LENGTH:n}=r(30);function i(t,e){if("0"===t||"0"===e)return"0";const r=t.indexOf("."),i=e.indexOf("."),o=(-1===r?t.length:r)+(-1===i?e.length:i),s=(-1===r?0:t.length-1-r)+(-1===i?0:e.length-1-i);if(0===s&&o<n)return(Number(t)*Number(e)).toFixed(0);const a=t.replace(".",""),u=e.replace(".",""),c=a.length,l=u.length,f=[];let h=c;for(;h>=0;){const t=h,e=h-=15,r=a.substring(e,t);f.push([Number(r),r.length])}const d=[],p=[];for(let t=0,e=l-1;e>=0;e--,t++){const r=u[e],n=Number(r);let i=0,o="";const s=f.length-1;f.forEach(([t,e],r)=>{let a=(i+n*t).toString();const u=a.length;if(u>e&&r!==s){const t=-1*e;o=a.slice(t)+o,i=Number(a.slice(0,t))}else{const t=e-u;for(let e=0;e<t;e++)a="0"+a;i=0,o=a+o}}),o+="0".repeat(t),d.push(o),p.push([Array.from(o).map(t=>Number(t)),o.length])}const y=d.length,g=p[p.length-1][1]+y;let m="",b=0;for(let t=0;t<g;t++){let e=b;const r=Math.min(t,y-1);for(let n=0;n<=r;n++){const[r,i]=p[n],o=i-1-t;o>=0&&(e+=r[o])}e>=10?(e=e.toString(),m=e[e.length-1]+m,b=Number(e.slice(0,-1))):(m=e+m,b=0)}if(0===s)m=m.replace(/^0+/,"");else{const t=m.length-s;m=m.substring(0,t)+"."+m.substring(t),m=m.replace(/^0+/,""),m=m.replace(/\\.?0+$/,""),"."===m[0]&&(m="0"+m)}return m}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(6),i=r(155),o=["5","6","7","8","9"];function s(t){if(t.match(/\\.9+$/))return n(i(t),"1");"+"===t[0]&&(t=t.substring(1));const e=t.length;let r="";const s=t[t.length-1];if(o.includes(s)){let n;for(n=e-2;n>=0;n--){const e=t[n];if("."===e||"-"===e)continue;const i=Number(e)+1;if(10!==i){r=i+r;break}r="0"+r}n>0&&(r=t.substring(0,n)+r)}else r=t.substring(0,e-1);return"."===r[r.length-1]&&(r=r.substring(0,r.length-1)),r.indexOf(".")>-1&&(r=r.replace(/0+$/,"")),r}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";function n(t){return"-"===t[0]?"-":"+"}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(0);function i(t){const e=(t=n(t)).indexOf(".");return-1===e?"0":(t.length-e-1).toString()}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";function n(t){return t.includes("i")}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(79);function i(){const t=Array.from(arguments),e="object"==typeof t[t.length-1]?t[t.length-1]:void 0,r=Array.isArray(t[0])?t[0]:e?t.slice(0,t.length-1):t;return n(r,e)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(17);function i(t,e){const r=Number(e);let i=t;for(let e=1;e<r;e++)i=n([i,t]);return i}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(6);function i(t){let e="0";for(let r of t)e=n(e,r);return e}t.exports=i,t.exports.default=i},function(t,e){const r=9007199254740991..toString().length-1;t.exports={MAX_SAFE_INTEGER:9007199254740991,MAX_SAFE_INTEGER_LENGTH:r}},function(t,e,r){"use strict";(function(t){r.d(e,"a",(function(){return m}));var n=r(12),i=r.n(n),o=r(26),s=r(13),a=r(103),u=r(2),c=r(27),l=r(59),f=function(t,e,r,n){return new(r||(r=Promise))((function(i,o){function s(t){try{u(n.next(t))}catch(t){o(t)}}function a(t){try{u(n.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}u((n=n.apply(t,e||[])).next())}))};const h=i()("threads:master:messages"),d=i()("threads:master:spawn"),p=i()("threads:master:thread-utils"),y=void 0!==t&&t.env.THREADS_WORKER_INIT_TIMEOUT?Number.parseInt(t.env.THREADS_WORKER_INIT_TIMEOUT,10):1e4;function g(t,e,r,n){const i=r.filter(t=>t.type===c.a.internalError).map(t=>t.error);return Object.assign(t,{[u.a]:i,[u.b]:r,[u.c]:n,[u.e]:e})}function m(t,e){return f(this,void 0,void 0,(function*(){d("Initializing new thread");const r=e&&e.timeout?e.timeout:y,n=(yield function(t,e,r){return f(this,void 0,void 0,(function*(){let n;const i=new Promise((t,i)=>{n=setTimeout(()=>i(Error(r)),e)}),o=yield Promise.race([t,i]);return clearTimeout(n),o}))}(function(t){return new Promise((e,r)=>{const n=i=>{var o;h("Message from worker before finishing initialization:",i.data),(o=i.data)&&"init"===o.type?(t.removeEventListener("message",n),e(i.data)):(t=>t&&"uncaughtError"===t.type)(i.data)&&(t.removeEventListener("message",n),r(Object(s.a)(i.data.error)))};t.addEventListener("message",n)})}(t),r,`Timeout: Did not receive an init message from worker after ${r}ms. Make sure the worker calls expose().`)).exposed,{termination:i,terminate:u}=function(t){const[e,r]=Object(a.a)();return{terminate:()=>f(this,void 0,void 0,(function*(){p("Terminating worker"),yield t.terminate(),r()})),termination:e}}(t),m=function(t,e){return new o.a(r=>{const n=t=>{const e={type:c.a.message,data:t.data};r.next(e)},i=t=>{p("Unhandled promise rejection event in thread:",t);const e={type:c.a.internalError,error:Error(t.reason)};r.next(e)};t.addEventListener("message",n),t.addEventListener("unhandledrejection",i),e.then(()=>{const e={type:c.a.termination};t.removeEventListener("message",n),t.removeEventListener("unhandledrejection",i),r.next(e),r.complete()})})}(t,i);if("function"===n.type){return g(Object(l.a)(t),t,m,u)}if("module"===n.type){return g(Object(l.b)(t,n.methods),t,m,u)}{const t=n.type;throw Error("Worker init message states unexpected type of expose(): "+t)}}))}}).call(this,r(7))},function(t,e,r){"use strict";r.d(e,"a",(function(){return g}));var n=r(12),i=r.n(n),o=r(102),s=r(197),a=r(26);function u(t){return Promise.all(t.map(t=>{const e=t=>({status:"fulfilled",value:t}),r=t=>({status:"rejected",reason:t}),n=Promise.resolve(t);try{return n.then(e,r)}catch(t){return Promise.reject(t)}}))}var c,l=r(19);!function(t){t.initialized="initialized",t.taskCanceled="taskCanceled",t.taskCompleted="taskCompleted",t.taskFailed="taskFailed",t.taskQueued="taskQueued",t.taskQueueDrained="taskQueueDrained",t.taskStart="taskStart",t.terminated="terminated"}(c||(c={}));var f=r(24),h=function(t,e,r,n){return new(r||(r=Promise))((function(i,o){function s(t){try{u(n.next(t))}catch(t){o(t)}}function a(t){try{u(n.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}u((n=n.apply(t,e||[])).next())}))};let d=1;class p{constructor(t,e){this.eventSubject=new o.a,this.initErrors=[],this.isClosing=!1,this.nextTaskID=1,this.taskQueue=[];const r="number"==typeof e?{size:e}:e||{},{size:n=l.a}=r;this.debug=i()("threads:pool:"+(r.name||String(d++)).replace(/\\W/g," ").trim().replace(/\\s+/g,"-")),this.options=r,this.workers=function(t,e){return function(t){const e=[];for(let r=0;r<t;r++)e.push(r);return e}(e).map(()=>({init:t(),runningTasks:[]}))}(t,n),this.eventObservable=Object(s.a)(a.a.from(this.eventSubject)),Promise.all(this.workers.map(t=>t.init)).then(()=>this.eventSubject.next({type:c.initialized,size:this.workers.length}),t=>{this.debug("Error while initializing pool worker:",t),this.eventSubject.error(t),this.initErrors.push(t)})}findIdlingWorker(){const{concurrency:t=1}=this.options;return this.workers.find(e=>e.runningTasks.length<t)}runPoolTask(t,e){return h(this,void 0,void 0,(function*(){const r=this.workers.indexOf(t)+1;this.debug(`Running task #${e.id} on worker #${r}...`),this.eventSubject.next({type:c.taskStart,taskID:e.id,workerID:r});try{const n=yield e.run(yield t.init);this.debug(`Task #${e.id} completed successfully`),this.eventSubject.next({type:c.taskCompleted,returnValue:n,taskID:e.id,workerID:r})}catch(t){this.debug(`Task #${e.id} failed`),this.eventSubject.next({type:c.taskFailed,taskID:e.id,error:t,workerID:r})}}))}run(t,e){return h(this,void 0,void 0,(function*(){const r=(()=>h(this,void 0,void 0,(function*(){var n;yield(n=0,new Promise(t=>setTimeout(t,n)));try{yield this.runPoolTask(t,e)}finally{t.runningTasks=t.runningTasks.filter(t=>t!==r),this.isClosing||this.scheduleWork()}})))();t.runningTasks.push(r)}))}scheduleWork(){this.debug("Attempt de-queueing a task in order to run it...");const t=this.findIdlingWorker();if(!t)return;const e=this.taskQueue.shift();if(!e)return this.debug("Task queue is empty"),void this.eventSubject.next({type:c.taskQueueDrained});this.run(t,e)}taskCompletion(t){return new Promise((e,r)=>{const n=this.events().subscribe(i=>{i.type===c.taskCompleted&&i.taskID===t?(n.unsubscribe(),e(i.returnValue)):i.type===c.taskFailed&&i.taskID===t?(n.unsubscribe(),r(i.error)):i.type===c.terminated&&(n.unsubscribe(),r(Error("Pool has been terminated before task was run.")))})})}settled(t=!1){return h(this,void 0,void 0,(function*(){const e=()=>{return t=this.workers,e=t=>t.runningTasks,t.reduce((t,r)=>[...t,...e(r)],[]);var t,e},r=[],n=this.eventObservable.subscribe(t=>{t.type===c.taskFailed&&r.push(t.error)});return this.initErrors.length>0?Promise.reject(this.initErrors[0]):t&&0===this.taskQueue.length?(yield u(e()),r):(yield new Promise((t,e)=>{const r=this.eventObservable.subscribe({next(e){e.type===c.taskQueueDrained&&(r.unsubscribe(),t(void 0))},error:e})}),yield u(e()),n.unsubscribe(),r)}))}completed(t=!1){return h(this,void 0,void 0,(function*(){const e=this.settled(t),r=new Promise((t,r)=>{const n=this.eventObservable.subscribe({next(i){i.type===c.taskQueueDrained?(n.unsubscribe(),t(e)):i.type===c.taskFailed&&(n.unsubscribe(),r(i.error))},error:r})}),n=yield Promise.race([e,r]);if(n.length>0)throw n[0]}))}events(){return this.eventObservable}queue(t){const{maxQueuedJobs:e=1/0}=this.options;if(this.isClosing)throw Error("Cannot schedule pool tasks after terminate() has been called.");if(this.initErrors.length>0)throw this.initErrors[0];const r=this.nextTaskID++,n=this.taskCompletion(r);n.catch(t=>{this.debug(`Task #${r} errored:`,t)});const i={id:r,run:t,cancel:()=>{-1!==this.taskQueue.indexOf(i)&&(this.taskQueue=this.taskQueue.filter(t=>t!==i),this.eventSubject.next({type:c.taskCanceled,taskID:i.id}))},then:n.then.bind(n)};if(this.taskQueue.length>=e)throw Error("Maximum number of pool tasks queued. Refusing to queue another one.\\nThis usually happens for one of two reasons: We are either at peak workload right now or some tasks just won\'t finish, thus blocking the pool.");return this.debug(`Queueing task #${i.id}...`),this.taskQueue.push(i),this.eventSubject.next({type:c.taskQueued,taskID:i.id}),this.scheduleWork(),i}terminate(t){return h(this,void 0,void 0,(function*(){this.isClosing=!0,t||(yield this.completed(!0)),this.eventSubject.next({type:c.terminated,remainingQueue:[...this.taskQueue]}),this.eventSubject.complete(),yield Promise.all(this.workers.map(t=>h(this,void 0,void 0,(function*(){return f.a.terminate(yield t.init)}))))}))}}function y(t,e){return new p(t,e)}p.EventType=c,y.EventType=c;const g=y},function(t,e,r){"use strict";r.d(e,"a",(function(){return b})),r.d(e,"b",(function(){return v}));var n=r(12),i=r.n(n),o=r(26),s=r(197),a=r(13);const u=()=>{},c=t=>t,l=t=>Promise.resolve().then(t);function f(t){throw t}class h extends o.a{constructor(t){super(e=>{const r=this,n=Object.assign(Object.assign({},e),{complete(){e.complete(),r.onCompletion()},error(t){e.error(t),r.onError(t)},next(t){e.next(t),r.onNext(t)}});try{return this.initHasRun=!0,t(n)}catch(t){n.error(t)}}),this.initHasRun=!1,this.fulfillmentCallbacks=[],this.rejectionCallbacks=[],this.firstValueSet=!1,this.state="pending"}onNext(t){this.firstValueSet||(this.firstValue=t,this.firstValueSet=!0)}onError(t){this.state="rejected",this.rejection=t;for(const e of this.rejectionCallbacks)l(()=>e(t))}onCompletion(){this.state="fulfilled";for(const t of this.fulfillmentCallbacks)l(()=>t(this.firstValue))}then(t,e){const r=t||c,n=e||f;let i=!1;return new Promise((t,e)=>{const o=r=>{if(!i){i=!0;try{t(n(r))}catch(t){e(t)}}};return this.initHasRun||this.subscribe({error:o}),"fulfilled"===this.state?t(r(this.firstValue)):"rejected"===this.state?(i=!0,t(n(this.rejection))):(this.fulfillmentCallbacks.push(e=>{try{t(r(e))}catch(t){o(t)}}),void this.rejectionCallbacks.push(o))})}catch(t){return this.then(void 0,t)}finally(t){const e=t||u;return this.then(t=>(e(),t),()=>e())}static from(t){return function(t){return t&&"function"==typeof t.then}(t)?new h(e=>{t.then(t=>{e.next(t),e.complete()},t=>{e.error(t)})}):super.from(t)}}var d=r(104),p=r(20);const y=i()("threads:master:messages");let g=1;function m(t,e){return new o.a(r=>{let n;const i=o=>{var s;if(y("Message from worker:",o.data),o.data&&o.data.uid===e)if((s=o.data)&&s.type===p.b.running)n=o.data.resultType;else if((t=>t&&t.type===p.b.result)(o.data))"promise"===n?(void 0!==o.data.payload&&r.next(Object(a.a)(o.data.payload)),r.complete(),t.removeEventListener("message",i)):(o.data.payload&&r.next(Object(a.a)(o.data.payload)),o.data.complete&&(r.complete(),t.removeEventListener("message",i)));else if((t=>t&&t.type===p.b.error)(o.data)){const e=Object(a.a)(o.data.error);r.error(e),t.removeEventListener("message",i)}};return t.addEventListener("message",i),()=>{if("observable"===n||!n){const r={type:p.a.cancel,uid:e};t.postMessage(r)}t.removeEventListener("message",i)}})}function b(t,e){return(...r)=>{const n=g++,{args:i,transferables:o}=function(t){if(0===t.length)return{args:[],transferables:[]};const e=[],r=[];for(const n of t)Object(d.a)(n)?(e.push(Object(a.b)(n.send)),r.push(...n.transferables)):e.push(Object(a.b)(n));return{args:e,transferables:0===r.length?r:(n=r,Array.from(new Set(n)))};var n}(r),u={type:p.a.run,uid:n,method:e,args:i};y("Sending command to run function to worker:",u);try{t.postMessage(u,o)}catch(t){return h.from(Promise.reject(t))}return h.from(Object(s.a)(m(t,n)))}}function v(t,e){const r={};for(const n of e)r[n]=b(t,n);return r}},function(t,e,r){"use strict";(function(e,n){var i=r(28);t.exports=v;var o,s=r(61);v.ReadableState=b;r(62).EventEmitter;var a=function(t,e){return t.listeners(e).length},u=r(63),c=r(43).Buffer,l=(void 0!==e?e:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{}).Uint8Array||function(){};var f=Object.create(r(21));f.inherits=r(10);var h=r(110),d=void 0;d=h&&h.debuglog?h.debuglog("stream"):function(){};var p,y=r(111),g=r(64);f.inherits(v,u);var m=["error","close","destroy","pause","resume"];function b(t,e){t=t||{};var n=e instanceof(o=o||r(14));this.objectMode=!!t.objectMode,n&&(this.objectMode=this.objectMode||!!t.readableObjectMode);var i=t.highWaterMark,s=t.readableHighWaterMark,a=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:n&&(s||0===s)?s:a,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new y,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(p||(p=r(66).StringDecoder),this.decoder=new p(t.encoding),this.encoding=t.encoding)}function v(t){if(o=o||r(14),!(this instanceof v))return new v(t);this._readableState=new b(t,this),this.readable=!0,t&&("function"==typeof t.read&&(this._read=t.read),"function"==typeof t.destroy&&(this._destroy=t.destroy)),u.call(this)}function w(t,e,r,n,i){var o,s=t._readableState;null===e?(s.reading=!1,function(t,e){if(e.ended)return;if(e.decoder){var r=e.decoder.end();r&&r.length&&(e.buffer.push(r),e.length+=e.objectMode?1:r.length)}e.ended=!0,S(t)}(t,s)):(i||(o=function(t,e){var r;n=e,c.isBuffer(n)||n instanceof l||"string"==typeof e||void 0===e||t.objectMode||(r=new TypeError("Invalid non-string/buffer chunk"));var n;return r}(s,e)),o?t.emit("error",o):s.objectMode||e&&e.length>0?("string"==typeof e||s.objectMode||Object.getPrototypeOf(e)===c.prototype||(e=function(t){return c.from(t)}(e)),n?s.endEmitted?t.emit("error",new Error("stream.unshift() after end event")):x(t,s,e,!0):s.ended?t.emit("error",new Error("stream.push() after EOF")):(s.reading=!1,s.decoder&&!r?(e=s.decoder.write(e),s.objectMode||0!==e.length?x(t,s,e,!1):E(t,s)):x(t,s,e,!1))):n||(s.reading=!1));return function(t){return!t.ended&&(t.needReadable||t.length<t.highWaterMark||0===t.length)}(s)}function x(t,e,r,n){e.flowing&&0===e.length&&!e.sync?(t.emit("data",r),t.read(0)):(e.length+=e.objectMode?1:r.length,n?e.buffer.unshift(r):e.buffer.push(r),e.needReadable&&S(t)),E(t,e)}Object.defineProperty(v.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(t){this._readableState&&(this._readableState.destroyed=t)}}),v.prototype.destroy=g.destroy,v.prototype._undestroy=g.undestroy,v.prototype._destroy=function(t,e){this.push(null),e(t)},v.prototype.push=function(t,e){var r,n=this._readableState;return n.objectMode?r=!0:"string"==typeof t&&((e=e||n.defaultEncoding)!==n.encoding&&(t=c.from(t,e),e=""),r=!0),w(this,t,e,!1,r)},v.prototype.unshift=function(t){return w(this,t,null,!0,!1)},v.prototype.isPaused=function(){return!1===this._readableState.flowing},v.prototype.setEncoding=function(t){return p||(p=r(66).StringDecoder),this._readableState.decoder=new p(t),this._readableState.encoding=t,this};function _(t,e){return t<=0||0===e.length&&e.ended?0:e.objectMode?1:t!=t?e.flowing&&e.length?e.buffer.head.data.length:e.length:(t>e.highWaterMark&&(e.highWaterMark=function(t){return t>=8388608?t=8388608:(t--,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t++),t}(t)),t<=e.length?t:e.ended?e.length:(e.needReadable=!0,0))}function S(t){var e=t._readableState;e.needReadable=!1,e.emittedReadable||(d("emitReadable",e.flowing),e.emittedReadable=!0,e.sync?i.nextTick(A,t):A(t))}function A(t){d("emit readable"),t.emit("readable"),O(t)}function E(t,e){e.readingMore||(e.readingMore=!0,i.nextTick(k,t,e))}function k(t,e){for(var r=e.length;!e.reading&&!e.flowing&&!e.ended&&e.length<e.highWaterMark&&(d("maybeReadMore read 0"),t.read(0),r!==e.length);)r=e.length;e.readingMore=!1}function T(t){d("readable nexttick read 0"),t.read(0)}function C(t,e){e.reading||(d("resume read 0"),t.read(0)),e.resumeScheduled=!1,e.awaitDrain=0,t.emit("resume"),O(t),e.flowing&&!e.reading&&t.read(0)}function O(t){var e=t._readableState;for(d("flow",e.flowing);e.flowing&&null!==t.read(););}function I(t,e){return 0===e.length?null:(e.objectMode?r=e.buffer.shift():!t||t>=e.length?(r=e.decoder?e.buffer.join(""):1===e.buffer.length?e.buffer.head.data:e.buffer.concat(e.length),e.buffer.clear()):r=function(t,e,r){var n;t<e.head.data.length?(n=e.head.data.slice(0,t),e.head.data=e.head.data.slice(t)):n=t===e.head.data.length?e.shift():r?function(t,e){var r=e.head,n=1,i=r.data;t-=i.length;for(;r=r.next;){var o=r.data,s=t>o.length?o.length:t;if(s===o.length?i+=o:i+=o.slice(0,t),0===(t-=s)){s===o.length?(++n,r.next?e.head=r.next:e.head=e.tail=null):(e.head=r,r.data=o.slice(s));break}++n}return e.length-=n,i}(t,e):function(t,e){var r=c.allocUnsafe(t),n=e.head,i=1;n.data.copy(r),t-=n.data.length;for(;n=n.next;){var o=n.data,s=t>o.length?o.length:t;if(o.copy(r,r.length-t,0,s),0===(t-=s)){s===o.length?(++i,n.next?e.head=n.next:e.head=e.tail=null):(e.head=n,n.data=o.slice(s));break}++i}return e.length-=i,r}(t,e);return n}(t,e.buffer,e.decoder),r);var r}function P(t){var e=t._readableState;if(e.length>0)throw new Error(\'"endReadable()" called on non-empty stream\');e.endEmitted||(e.ended=!0,i.nextTick(R,e,t))}function R(t,e){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}function j(t,e){for(var r=0,n=t.length;r<n;r++)if(t[r]===e)return r;return-1}v.prototype.read=function(t){d("read",t),t=parseInt(t,10);var e=this._readableState,r=t;if(0!==t&&(e.emittedReadable=!1),0===t&&e.needReadable&&(e.length>=e.highWaterMark||e.ended))return d("read: emitReadable",e.length,e.ended),0===e.length&&e.ended?P(this):S(this),null;if(0===(t=_(t,e))&&e.ended)return 0===e.length&&P(this),null;var n,i=e.needReadable;return d("need readable",i),(0===e.length||e.length-t<e.highWaterMark)&&d("length less than watermark",i=!0),e.ended||e.reading?d("reading or ended",i=!1):i&&(d("do read"),e.reading=!0,e.sync=!0,0===e.length&&(e.needReadable=!0),this._read(e.highWaterMark),e.sync=!1,e.reading||(t=_(r,e))),null===(n=t>0?I(t,e):null)?(e.needReadable=!0,t=0):e.length-=t,0===e.length&&(e.ended||(e.needReadable=!0),r!==t&&e.ended&&P(this)),null!==n&&this.emit("data",n),n},v.prototype._read=function(t){this.emit("error",new Error("_read() is not implemented"))},v.prototype.pipe=function(t,e){var r=this,o=this._readableState;switch(o.pipesCount){case 0:o.pipes=t;break;case 1:o.pipes=[o.pipes,t];break;default:o.pipes.push(t)}o.pipesCount+=1,d("pipe count=%d opts=%j",o.pipesCount,e);var u=(!e||!1!==e.end)&&t!==n.stdout&&t!==n.stderr?l:v;function c(e,n){d("onunpipe"),e===r&&n&&!1===n.hasUnpiped&&(n.hasUnpiped=!0,d("cleanup"),t.removeListener("close",m),t.removeListener("finish",b),t.removeListener("drain",f),t.removeListener("error",g),t.removeListener("unpipe",c),r.removeListener("end",l),r.removeListener("end",v),r.removeListener("data",y),h=!0,!o.awaitDrain||t._writableState&&!t._writableState.needDrain||f())}function l(){d("onend"),t.end()}o.endEmitted?i.nextTick(u):r.once("end",u),t.on("unpipe",c);var f=function(t){return function(){var e=t._readableState;d("pipeOnDrain",e.awaitDrain),e.awaitDrain&&e.awaitDrain--,0===e.awaitDrain&&a(t,"data")&&(e.flowing=!0,O(t))}}(r);t.on("drain",f);var h=!1;var p=!1;function y(e){d("ondata"),p=!1,!1!==t.write(e)||p||((1===o.pipesCount&&o.pipes===t||o.pipesCount>1&&-1!==j(o.pipes,t))&&!h&&(d("false write response, pause",o.awaitDrain),o.awaitDrain++,p=!0),r.pause())}function g(e){d("onerror",e),v(),t.removeListener("error",g),0===a(t,"error")&&t.emit("error",e)}function m(){t.removeListener("finish",b),v()}function b(){d("onfinish"),t.removeListener("close",m),v()}function v(){d("unpipe"),r.unpipe(t)}return r.on("data",y),function(t,e,r){if("function"==typeof t.prependListener)return t.prependListener(e,r);t._events&&t._events[e]?s(t._events[e])?t._events[e].unshift(r):t._events[e]=[r,t._events[e]]:t.on(e,r)}(t,"error",g),t.once("close",m),t.once("finish",b),t.emit("pipe",r),o.flowing||(d("pipe resume"),r.resume()),t},v.prototype.unpipe=function(t){var e=this._readableState,r={hasUnpiped:!1};if(0===e.pipesCount)return this;if(1===e.pipesCount)return t&&t!==e.pipes||(t||(t=e.pipes),e.pipes=null,e.pipesCount=0,e.flowing=!1,t&&t.emit("unpipe",this,r)),this;if(!t){var n=e.pipes,i=e.pipesCount;e.pipes=null,e.pipesCount=0,e.flowing=!1;for(var o=0;o<i;o++)n[o].emit("unpipe",this,{hasUnpiped:!1});return this}var s=j(e.pipes,t);return-1===s||(e.pipes.splice(s,1),e.pipesCount-=1,1===e.pipesCount&&(e.pipes=e.pipes[0]),t.emit("unpipe",this,r)),this},v.prototype.on=function(t,e){var r=u.prototype.on.call(this,t,e);if("data"===t)!1!==this._readableState.flowing&&this.resume();else if("readable"===t){var n=this._readableState;n.endEmitted||n.readableListening||(n.readableListening=n.needReadable=!0,n.emittedReadable=!1,n.reading?n.length&&S(this):i.nextTick(T,this))}return r},v.prototype.addListener=v.prototype.on,v.prototype.resume=function(){var t=this._readableState;return t.flowing||(d("resume"),t.flowing=!0,function(t,e){e.resumeScheduled||(e.resumeScheduled=!0,i.nextTick(C,t,e))}(this,t)),this},v.prototype.pause=function(){return d("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(d("pause"),this._readableState.flowing=!1,this.emit("pause")),this},v.prototype.wrap=function(t){var e=this,r=this._readableState,n=!1;for(var i in t.on("end",(function(){if(d("wrapped end"),r.decoder&&!r.ended){var t=r.decoder.end();t&&t.length&&e.push(t)}e.push(null)})),t.on("data",(function(i){(d("wrapped data"),r.decoder&&(i=r.decoder.write(i)),r.objectMode&&null==i)||(r.objectMode||i&&i.length)&&(e.push(i)||(n=!0,t.pause()))})),t)void 0===this[i]&&"function"==typeof t[i]&&(this[i]=function(e){return function(){return t[e].apply(t,arguments)}}(i));for(var o=0;o<m.length;o++)t.on(m[o],this.emit.bind(this,m[o]));return this._read=function(e){d("wrapped _read",e),n&&(n=!1,t.resume())},this},Object.defineProperty(v.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),v._fromList=I}).call(this,r(3),r(7))},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},function(t,e,r){"use strict";var n,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(t,e,r){return Function.prototype.apply.call(t,e,r)};n=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!=t};function a(){a.init.call(this)}t.exports=a,t.exports.once=function(t,e){return new Promise((function(r,n){function i(r){t.removeListener(e,o),n(r)}function o(){"function"==typeof t.removeListener&&t.removeListener("error",i),r([].slice.call(arguments))}m(t,e,o,{once:!0}),"error"!==e&&function(t,e,r){"function"==typeof t.on&&m(t,"error",e,r)}(t,i,{once:!0})}))},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var u=10;function c(t){if("function"!=typeof t)throw new TypeError(\'The "listener" argument must be of type Function. Received type \'+typeof t)}function l(t){return void 0===t._maxListeners?a.defaultMaxListeners:t._maxListeners}function f(t,e,r,n){var i,o,s,a;if(c(r),void 0===(o=t._events)?(o=t._events=Object.create(null),t._eventsCount=0):(void 0!==o.newListener&&(t.emit("newListener",e,r.listener?r.listener:r),o=t._events),s=o[e]),void 0===s)s=o[e]=r,++t._eventsCount;else if("function"==typeof s?s=o[e]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(i=l(t))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=s.length,a=u,console&&console.warn&&console.warn(a)}return t}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(t,e,r){var n={fired:!1,wrapFn:void 0,target:t,type:e,listener:r},i=h.bind(n);return i.listener=r,n.wrapFn=i,i}function p(t,e,r){var n=t._events;if(void 0===n)return[];var i=n[e];return void 0===i?[]:"function"==typeof i?r?[i.listener||i]:[i]:r?function(t){for(var e=new Array(t.length),r=0;r<e.length;++r)e[r]=t[r].listener||t[r];return e}(i):g(i,i.length)}function y(t){var e=this._events;if(void 0!==e){var r=e[t];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function g(t,e){for(var r=new Array(e),n=0;n<e;++n)r[n]=t[n];return r}function m(t,e,r,n){if("function"==typeof t.on)n.once?t.once(e,r):t.on(e,r);else{if("function"!=typeof t.addEventListener)throw new TypeError(\'The "emitter" argument must be of type EventEmitter. Received type \'+typeof t);t.addEventListener(e,(function i(o){n.once&&t.removeEventListener(e,i),r(o)}))}}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError(\'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received \'+t+".");u=t}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError(\'The value of "n" is out of range. It must be a non-negative number. Received \'+t+".");return this._maxListeners=t,this},a.prototype.getMaxListeners=function(){return l(this)},a.prototype.emit=function(t){for(var e=[],r=1;r<arguments.length;r++)e.push(arguments[r]);var n="error"===t,i=this._events;if(void 0!==i)n=n&&void 0===i.error;else if(!n)return!1;if(n){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[t];if(void 0===u)return!1;if("function"==typeof u)o(u,this,e);else{var c=u.length,l=g(u,c);for(r=0;r<c;++r)o(l[r],this,e)}return!0},a.prototype.addListener=function(t,e){return f(this,t,e,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(t,e){return f(this,t,e,!0)},a.prototype.once=function(t,e){return c(e),this.on(t,d(this,t,e)),this},a.prototype.prependOnceListener=function(t,e){return c(e),this.prependListener(t,d(this,t,e)),this},a.prototype.removeListener=function(t,e){var r,n,i,o,s;if(c(e),void 0===(n=this._events))return this;if(void 0===(r=n[t]))return this;if(r===e||r.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete n[t],n.removeListener&&this.emit("removeListener",t,r.listener||e));else if("function"!=typeof r){for(i=-1,o=r.length-1;o>=0;o--)if(r[o]===e||r[o].listener===e){s=r[o].listener,i=o;break}if(i<0)return this;0===i?r.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(r,i),1===r.length&&(n[t]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",t,s||e)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(t){var e,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[t]),this;if(0===arguments.length){var i,o=Object.keys(r);for(n=0;n<o.length;++n)"removeListener"!==(i=o[n])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=r[t]))this.removeListener(t,e);else if(void 0!==e)for(n=e.length-1;n>=0;n--)this.removeListener(t,e[n]);return this},a.prototype.listeners=function(t){return p(this,t,!0)},a.prototype.rawListeners=function(t){return p(this,t,!1)},a.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):y.call(t,e)},a.prototype.listenerCount=y,a.prototype.eventNames=function(){return this._eventsCount>0?n(this._events):[]}},function(t,e,r){t.exports=r(62).EventEmitter},function(t,e,r){"use strict";var n=r(28);function i(t,e){t.emit("error",e)}t.exports={destroy:function(t,e){var r=this,o=this._readableState&&this._readableState.destroyed,s=this._writableState&&this._writableState.destroyed;return o||s?(e?e(t):t&&(this._writableState?this._writableState.errorEmitted||(this._writableState.errorEmitted=!0,n.nextTick(i,this,t)):n.nextTick(i,this,t)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(t||null,(function(t){!e&&t?r._writableState?r._writableState.errorEmitted||(r._writableState.errorEmitted=!0,n.nextTick(i,r,t)):n.nextTick(i,r,t):e&&e(t)})),this)},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}}},function(t,e,r){"use strict";(function(e,n,i){var o=r(28);function s(t){var e=this;this.next=null,this.entry=null,this.finish=function(){!function(t,e,r){var n=t.entry;t.entry=null;for(;n;){var i=n.callback;e.pendingcb--,i(r),n=n.next}e.corkedRequestsFree.next=t}(e,t)}}t.exports=b;var a,u=!e.browser&&["v0.10","v0.9."].indexOf(e.version.slice(0,5))>-1?n:o.nextTick;b.WritableState=m;var c=Object.create(r(21));c.inherits=r(10);var l={deprecate:r(115)},f=r(63),h=r(43).Buffer,d=(void 0!==i?i:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{}).Uint8Array||function(){};var p,y=r(64);function g(){}function m(t,e){a=a||r(14),t=t||{};var n=e instanceof a;this.objectMode=!!t.objectMode,n&&(this.objectMode=this.objectMode||!!t.writableObjectMode);var i=t.highWaterMark,c=t.writableHighWaterMark,l=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:n&&(c||0===c)?c:l,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var f=!1===t.decodeStrings;this.decodeStrings=!f,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){!function(t,e){var r=t._writableState,n=r.sync,i=r.writecb;if(function(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0}(r),e)!function(t,e,r,n,i){--e.pendingcb,r?(o.nextTick(i,n),o.nextTick(A,t,e),t._writableState.errorEmitted=!0,t.emit("error",n)):(i(n),t._writableState.errorEmitted=!0,t.emit("error",n),A(t,e))}(t,r,n,e,i);else{var s=_(r);s||r.corked||r.bufferProcessing||!r.bufferedRequest||x(t,r),n?u(w,t,r,s,i):w(t,r,s,i)}}(e,t)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new s(this)}function b(t){if(a=a||r(14),!(p.call(b,this)||this instanceof a))return new b(t);this._writableState=new m(t,this),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev),"function"==typeof t.destroy&&(this._destroy=t.destroy),"function"==typeof t.final&&(this._final=t.final)),f.call(this)}function v(t,e,r,n,i,o,s){e.writelen=n,e.writecb=s,e.writing=!0,e.sync=!0,r?t._writev(i,e.onwrite):t._write(i,o,e.onwrite),e.sync=!1}function w(t,e,r,n){r||function(t,e){0===e.length&&e.needDrain&&(e.needDrain=!1,t.emit("drain"))}(t,e),e.pendingcb--,n(),A(t,e)}function x(t,e){e.bufferProcessing=!0;var r=e.bufferedRequest;if(t._writev&&r&&r.next){var n=e.bufferedRequestCount,i=new Array(n),o=e.corkedRequestsFree;o.entry=r;for(var a=0,u=!0;r;)i[a]=r,r.isBuf||(u=!1),r=r.next,a+=1;i.allBuffers=u,v(t,e,!0,e.length,i,"",o.finish),e.pendingcb++,e.lastBufferedRequest=null,o.next?(e.corkedRequestsFree=o.next,o.next=null):e.corkedRequestsFree=new s(e),e.bufferedRequestCount=0}else{for(;r;){var c=r.chunk,l=r.encoding,f=r.callback;if(v(t,e,!1,e.objectMode?1:c.length,c,l,f),r=r.next,e.bufferedRequestCount--,e.writing)break}null===r&&(e.lastBufferedRequest=null)}e.bufferedRequest=r,e.bufferProcessing=!1}function _(t){return t.ending&&0===t.length&&null===t.bufferedRequest&&!t.finished&&!t.writing}function S(t,e){t._final((function(r){e.pendingcb--,r&&t.emit("error",r),e.prefinished=!0,t.emit("prefinish"),A(t,e)}))}function A(t,e){var r=_(e);return r&&(!function(t,e){e.prefinished||e.finalCalled||("function"==typeof t._final?(e.pendingcb++,e.finalCalled=!0,o.nextTick(S,t,e)):(e.prefinished=!0,t.emit("prefinish")))}(t,e),0===e.pendingcb&&(e.finished=!0,t.emit("finish"))),r}c.inherits(b,f),m.prototype.getBuffer=function(){for(var t=this.bufferedRequest,e=[];t;)e.push(t),t=t.next;return e},function(){try{Object.defineProperty(m.prototype,"buffer",{get:l.deprecate((function(){return this.getBuffer()}),"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(t){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(p=Function.prototype[Symbol.hasInstance],Object.defineProperty(b,Symbol.hasInstance,{value:function(t){return!!p.call(this,t)||this===b&&(t&&t._writableState instanceof m)}})):p=function(t){return t instanceof this},b.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},b.prototype.write=function(t,e,r){var n,i=this._writableState,s=!1,a=!i.objectMode&&(n=t,h.isBuffer(n)||n instanceof d);return a&&!h.isBuffer(t)&&(t=function(t){return h.from(t)}(t)),"function"==typeof e&&(r=e,e=null),a?e="buffer":e||(e=i.defaultEncoding),"function"!=typeof r&&(r=g),i.ended?function(t,e){var r=new Error("write after end");t.emit("error",r),o.nextTick(e,r)}(this,r):(a||function(t,e,r,n){var i=!0,s=!1;return null===r?s=new TypeError("May not write null values to stream"):"string"==typeof r||void 0===r||e.objectMode||(s=new TypeError("Invalid non-string/buffer chunk")),s&&(t.emit("error",s),o.nextTick(n,s),i=!1),i}(this,i,t,r))&&(i.pendingcb++,s=function(t,e,r,n,i,o){if(!r){var s=function(t,e,r){t.objectMode||!1===t.decodeStrings||"string"!=typeof e||(e=h.from(e,r));return e}(e,n,i);n!==s&&(r=!0,i="buffer",n=s)}var a=e.objectMode?1:n.length;e.length+=a;var u=e.length<e.highWaterMark;u||(e.needDrain=!0);if(e.writing||e.corked){var c=e.lastBufferedRequest;e.lastBufferedRequest={chunk:n,encoding:i,isBuf:r,callback:o,next:null},c?c.next=e.lastBufferedRequest:e.bufferedRequest=e.lastBufferedRequest,e.bufferedRequestCount+=1}else v(t,e,!1,a,n,i,o);return u}(this,i,a,t,e,r)),s},b.prototype.cork=function(){this._writableState.corked++},b.prototype.uncork=function(){var t=this._writableState;t.corked&&(t.corked--,t.writing||t.corked||t.bufferProcessing||!t.bufferedRequest||x(this,t))},b.prototype.setDefaultEncoding=function(t){if("string"==typeof t&&(t=t.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((t+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+t);return this._writableState.defaultEncoding=t,this},Object.defineProperty(b.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),b.prototype._write=function(t,e,r){r(new Error("_write() is not implemented"))},b.prototype._writev=null,b.prototype.end=function(t,e,r){var n=this._writableState;"function"==typeof t?(r=t,t=null,e=null):"function"==typeof e&&(r=e,e=null),null!=t&&this.write(t,e),n.corked&&(n.corked=1,this.uncork()),n.ending||function(t,e,r){e.ending=!0,A(t,e),r&&(e.finished?o.nextTick(r):t.once("finish",r));e.ended=!0,t.writable=!1}(this,n,r)},Object.defineProperty(b.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(t){this._writableState&&(this._writableState.destroyed=t)}}),b.prototype.destroy=y.destroy,b.prototype._undestroy=y.undestroy,b.prototype._destroy=function(t,e){this.end(),e(t)}}).call(this,r(7),r(113).setImmediate,r(3))},function(t,e,r){"use strict";var n=r(116).Buffer,i=n.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function o(t){var e;switch(this.encoding=function(t){var e=function(t){if(!t)return"utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase(),e=!0}}(t);if("string"!=typeof e&&(n.isEncoding===i||!i(t)))throw new Error("Unknown encoding: "+t);return e||t}(t),this.encoding){case"utf16le":this.text=u,this.end=c,e=4;break;case"utf8":this.fillLast=a,e=4;break;case"base64":this.text=l,this.end=f,e=3;break;default:return this.write=h,void(this.end=d)}this.lastNeed=0,this.lastTotal=0,this.lastChar=n.allocUnsafe(e)}function s(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:-1}function a(t){var e=this.lastTotal-this.lastNeed,r=function(t,e,r){if(128!=(192&e[0]))return t.lastNeed=0,"�".repeat(r);if(t.lastNeed>1&&e.length>1){if(128!=(192&e[1]))return t.lastNeed=1,"�".repeat(r+1);if(t.lastNeed>2&&e.length>2&&128!=(192&e[2]))return t.lastNeed=2,"�".repeat(r+2)}}(this,t,e);return void 0!==r?r:this.lastNeed<=t.length?(t.copy(this.lastChar,e,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,e,0,t.length),void(this.lastNeed-=t.length))}function u(t,e){if((t.length-e)%2==0){var r=t.toString("utf16le",e);if(r){var n=r.charCodeAt(r.length-1);if(n>=55296&&n<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],r.slice(0,-1)}return r}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1)}function c(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var r=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,r)}return e}function l(t,e){var r=(t.length-e)%3;return 0===r?t.toString("base64",e):(this.lastNeed=3-r,this.lastTotal=3,1===r?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-r))}function f(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+this.lastChar.toString("base64",0,3-this.lastNeed):e}function h(t){return t.toString(this.encoding)}function d(t){return t&&t.length?this.write(t):""}e.StringDecoder=o,o.prototype.write=function(t){if(0===t.length)return"";var e,r;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return"";r=this.lastNeed,this.lastNeed=0}else r=0;return r<t.length?e?e+this.text(t,r):this.text(t,r):e||""},o.prototype.end=function(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+"�".repeat(this.lastTotal-this.lastNeed):e},o.prototype.text=function(t,e){var r=function(t,e,r){var n=e.length-1;if(n<r)return 0;var i=s(e[n]);if(i>=0)return i>0&&(t.lastNeed=i-1),i;if(--n<r)return 0;if((i=s(e[n]))>=0)return i>0&&(t.lastNeed=i-2),i;if(--n<r)return 0;if((i=s(e[n]))>=0)return i>0&&(2===i?i=0:t.lastNeed=i-3),i;return 0}(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=r;var n=t.length-(r-this.lastNeed);return t.copy(this.lastChar,0,n),t.toString("utf8",e,n)},o.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length}},function(t,e,r){"use strict";t.exports=s;var n=r(14),i=Object.create(r(21));function o(t,e){var r=this._transformState;r.transforming=!1;var n=r.writecb;if(!n)return this.emit("error",new Error("write callback called multiple times"));r.writechunk=null,r.writecb=null,null!=e&&this.push(e),n(t);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}function s(t){if(!(this instanceof s))return new s(t);n.call(this,t),this._transformState={afterTransform:o.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,t&&("function"==typeof t.transform&&(this._transform=t.transform),"function"==typeof t.flush&&(this._flush=t.flush)),this.on("prefinish",a)}function a(){var t=this;"function"==typeof this._flush?this._flush((function(e,r){u(t,e,r)})):u(this,null,null)}function u(t,e,r){if(e)return t.emit("error",e);if(null!=r&&t.push(r),t._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(t._transformState.transforming)throw new Error("Calling transform done when still transforming");return t.push(null)}i.inherits=r(10),i.inherits(s,n),s.prototype.push=function(t,e){return this._transformState.needTransform=!1,n.prototype.push.call(this,t,e)},s.prototype._transform=function(t,e,r){throw new Error("_transform() is not implemented")},s.prototype._write=function(t,e,r){var n=this._transformState;if(n.writecb=r,n.writechunk=t,n.writeencoding=e,!n.transforming){var i=this._readableState;(n.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},s.prototype._read=function(t){var e=this._transformState;null!==e.writechunk&&e.writecb&&!e.transforming?(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform)):e.needTransform=!0},s.prototype._destroy=function(t,e){var r=this;n.prototype._destroy.call(this,t,(function(t){e(t),r.emit("close")}))}},function(t,e,r){"use strict";(function(t){var n=r(194),i=r(58),o=r(57);const s="undefined"!=typeof navigator?navigator.hardwareConcurrency:null;e.a=class{constructor(e=s){const r=new n.a(t);this.pool=Object(i.a)(()=>Object(o.a)(r),e)}async decode(t,e){return new Promise((r,n)=>{this.pool.queue(async i=>{try{const n=await i(t,e);r(n)}catch(t){n(t)}})})}destroy(){this.pool.terminate(!0)}}}).call(this,r(128))},function(t,e,r){(function(t){e.fetch=a(t.fetch)&&a(t.ReadableStream),e.writableStream=a(t.WritableStream),e.abortController=a(t.AbortController),e.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),e.blobConstructor=!0}catch(t){}var r;function n(){if(void 0!==r)return r;if(t.XMLHttpRequest){r=new t.XMLHttpRequest;try{r.open("GET",t.XDomainRequest?"/":"https://example.com")}catch(t){r=null}}else r=null;return r}function i(t){var e=n();if(!e)return!1;try{return e.responseType=t,e.responseType===t}catch(t){}return!1}var o=void 0!==t.ArrayBuffer,s=o&&a(t.ArrayBuffer.prototype.slice);function a(t){return"function"==typeof t}e.arraybuffer=e.fetch||o&&i("arraybuffer"),e.msstream=!e.fetch&&s&&i("ms-stream"),e.mozchunkedarraybuffer=!e.fetch&&o&&i("moz-chunked-arraybuffer"),e.overrideMimeType=e.fetch||!!n()&&a(n().overrideMimeType),e.vbArray=a(t.VBArray),r=null}).call(this,r(3))},function(t,e,r){(function(t,n,i){var o=r(69),s=r(10),a=r(42),u=e.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},c=e.IncomingMessage=function(e,r,s,u){var c=this;if(a.Readable.call(c),c._mode=s,c.headers={},c.rawHeaders=[],c.trailers={},c.rawTrailers=[],c.on("end",(function(){t.nextTick((function(){c.emit("close")}))})),"fetch"===s){if(c._fetchResponse=r,c.url=r.url,c.statusCode=r.status,c.statusMessage=r.statusText,r.headers.forEach((function(t,e){c.headers[e.toLowerCase()]=t,c.rawHeaders.push(e,t)})),o.writableStream){var l=new WritableStream({write:function(t){return new Promise((function(e,r){c._destroyed?r():c.push(new n(t))?e():c._resumeFetch=e}))},close:function(){i.clearTimeout(u),c._destroyed||c.push(null)},abort:function(t){c._destroyed||c.emit("error",t)}});try{return void r.body.pipeTo(l).catch((function(t){i.clearTimeout(u),c._destroyed||c.emit("error",t)}))}catch(t){}}var f=r.body.getReader();!function t(){f.read().then((function(e){if(!c._destroyed){if(e.done)return i.clearTimeout(u),void c.push(null);c.push(new n(e.value)),t()}})).catch((function(t){i.clearTimeout(u),c._destroyed||c.emit("error",t)}))}()}else{if(c._xhr=e,c._pos=0,c.url=e.responseURL,c.statusCode=e.status,c.statusMessage=e.statusText,e.getAllResponseHeaders().split(/\\r?\\n/).forEach((function(t){var e=t.match(/^([^:]+):\\s*(.*)/);if(e){var r=e[1].toLowerCase();"set-cookie"===r?(void 0===c.headers[r]&&(c.headers[r]=[]),c.headers[r].push(e[2])):void 0!==c.headers[r]?c.headers[r]+=", "+e[2]:c.headers[r]=e[2],c.rawHeaders.push(e[1],e[2])}})),c._charset="x-user-defined",!o.overrideMimeType){var h=c.rawHeaders["mime-type"];if(h){var d=h.match(/;\\s*charset=([^;])(;|$)/);d&&(c._charset=d[1].toLowerCase())}c._charset||(c._charset="utf-8")}}};s(c,a.Readable),c.prototype._read=function(){var t=this._resumeFetch;t&&(this._resumeFetch=null,t())},c.prototype._onXHRProgress=function(){var t=this,e=t._xhr,r=null;switch(t._mode){case"text:vbarray":if(e.readyState!==u.DONE)break;try{r=new i.VBArray(e.responseBody).toArray()}catch(t){}if(null!==r){t.push(new n(r));break}case"text":try{r=e.responseText}catch(e){t._mode="text:vbarray";break}if(r.length>t._pos){var o=r.substr(t._pos);if("x-user-defined"===t._charset){for(var s=new n(o.length),a=0;a<o.length;a++)s[a]=255&o.charCodeAt(a);t.push(s)}else t.push(o,t._charset);t._pos=r.length}break;case"arraybuffer":if(e.readyState!==u.DONE||!e.response)break;r=e.response,t.push(new n(new Uint8Array(r)));break;case"moz-chunked-arraybuffer":if(r=e.response,e.readyState!==u.LOADING||!r)break;t.push(new n(new Uint8Array(r)));break;case"ms-stream":if(r=e.response,e.readyState!==u.LOADING)break;var c=new i.MSStreamReader;c.onprogress=function(){c.result.byteLength>t._pos&&(t.push(new n(new Uint8Array(c.result.slice(t._pos)))),t._pos=c.result.byteLength)},c.onload=function(){t.push(null)},c.readAsArrayBuffer(r)}t._xhr.readyState===u.DONE&&"ms-stream"!==t._mode&&t.push(null)}}).call(this,r(7),r(9).Buffer,r(3))},function(t,e,r){"use strict";var n=r(46),i=Object.prototype.hasOwnProperty,o=Array.isArray,s=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),a=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)void 0!==t[n]&&(r[n]=t[n]);return r};t.exports={arrayToObject:a,assign:function(t,e){return Object.keys(e).reduce((function(t,r){return t[r]=e[r],t}),t)},combine:function(t,e){return[].concat(t,e)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],n=0;n<e.length;++n)for(var i=e[n],s=i.obj[i.prop],a=Object.keys(s),u=0;u<a.length;++u){var c=a[u],l=s[c];"object"==typeof l&&null!==l&&-1===r.indexOf(l)&&(e.push({obj:s,prop:c}),r.push(l))}return function(t){for(;t.length>1;){var e=t.pop(),r=e.obj[e.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)void 0!==r[i]&&n.push(r[i]);e.obj[e.prop]=n}}}(e),t},decode:function(t,e,r){var n=t.replace(/\\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(t){return n}},encode:function(t,e,r,i,o){if(0===t.length)return t;var a=t;if("symbol"==typeof t?a=Symbol.prototype.toString.call(t):"string"!=typeof t&&(a=String(t)),"iso-8859-1"===r)return escape(a).replace(/%u[0-9a-f]{4}/gi,(function(t){return"%26%23"+parseInt(t.slice(2),16)+"%3B"}));for(var u="",c=0;c<a.length;++c){var l=a.charCodeAt(c);45===l||46===l||95===l||126===l||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||o===n.RFC1738&&(40===l||41===l)?u+=a.charAt(c):l<128?u+=s[l]:l<2048?u+=s[192|l>>6]+s[128|63&l]:l<55296||l>=57344?u+=s[224|l>>12]+s[128|l>>6&63]+s[128|63&l]:(c+=1,l=65536+((1023&l)<<10|1023&a.charCodeAt(c)),u+=s[240|l>>18]+s[128|l>>12&63]+s[128|l>>6&63]+s[128|63&l])}return u},isBuffer:function(t){return!(!t||"object"!=typeof t)&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},maybeMap:function(t,e){if(o(t)){for(var r=[],n=0;n<t.length;n+=1)r.push(e(t[n]));return r}return e(t)},merge:function t(e,r,n){if(!r)return e;if("object"!=typeof r){if(o(e))e.push(r);else{if(!e||"object"!=typeof e)return[e,r];(n&&(n.plainObjects||n.allowPrototypes)||!i.call(Object.prototype,r))&&(e[r]=!0)}return e}if(!e||"object"!=typeof e)return[e].concat(r);var s=e;return o(e)&&!o(r)&&(s=a(e,n)),o(e)&&o(r)?(r.forEach((function(r,o){if(i.call(e,o)){var s=e[o];s&&"object"==typeof s&&r&&"object"==typeof r?e[o]=t(s,r,n):e.push(r)}else e[o]=r})),e):Object.keys(r).reduce((function(e,o){var s=r[o];return i.call(e,o)?e[o]=t(e[o],s,n):e[o]=s,e}),s)}}},function(t,e,r){function n(t){try{t[Symbol.iterator]=function(){return this}}catch(t){}}function i(t){t["@@iterator"]=function(){return this}}function o(t){const e={next:t};return n(e),i(e),e}function s(t){try{return t.constructor.name.endsWith("Array")}catch{return!1}}function a(t){try{return"function"==typeof t.next}catch{return!1}}function u(t){try{return"@@iterator"in t}catch{return!1}}function c(t){try{return Symbol.iterator in t.constructor.prototype}catch{return!1}}function l(t){try{return Symbol.iterator in t&&"function"==typeof t.next&&!1===t.propertyIsEnumerable("next")}catch{return!1}}function f(t){const e=t["@@iterator"];return a(e)?e:"function"==typeof e?e():void 0}function h(t){let e=0,r=t.length;return o(()=>e++<r?{value:t[e],done:!1}:{done:!0})}function d(t){if(l(t))return t;if(c(t))return t[Symbol.iterator]();if(a(t))return o(t.next);if(u(t))return f(t);if("string"==typeof t||s(t))return h(t);throw"[iter-fun] unable to determine iterator"}t.exports={addSymbolIterator:n,addSymbolIteratorFallback:i,isIterator:l,isArray:s,hasNext:a,hasSymbolIterator:c,hasIterator:u,getIterator:f,createIterator:h,getOrCreateIterator:d,wrapNextFunction:o,zip:function(t){return t=t.map(d),o((function(){const e=t.map(t=>t.next());return e.every(({done:t})=>t)?{done:!0}:{done:!1,value:e.map(({value:t})=>t)}}))}}},function(t,e,r){"use strict";function n(t){"+"===t[0]&&(t=t.substring(1));const e="-"===t[0]?"-":"";"-"===e&&(t=t.substring(1));const r=t.indexOf("e");if(-1===r)return e+t;let n=t.indexOf(".");-1===n&&(n=r);const i=Number(t.substring(r+1)),o=t.substring(0,r).replace(".",""),s=n+i,a=o.length;if(s>=a){const t=s-a;let r=o;for(let e=0;e<t;e++)r+="0";return e+r}if(s<0){let t="0.";for(let e=0;e>s;e--)t+="0";return t+=o,e+t}return e+o.substring(0,s)+"."+o.substring(s)}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";t.exports={MAX_SAFE_INTEGER:9007199254740991}},function(t,e,r){"use strict";const n=r(47);function i(t){return"0"===t?"1":n("1",t)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(8),s=r(22);function a(t){if(-1===(t=i(t)).indexOf("."))return t;const e=s(t);return t=n(t).split(".")[0],"+"===e?o(t,"1"):"-"===e?"0"===t||""===t?"0":"-"+t:void 0}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(51);function i(t){const e=n(t);return[t.replace(/\\./g,"").replace(/^0/,""),1+"0".repeat(e)]}t.exports=i,t.exports.default=i},function(t,e,r){const n=r(0),i=r(16);function o(t){if(t=n(t),!i(t))throw new Error("can\'t call is_odd on decimal");return["1","3","5","7","9"].includes(t.charAt(t.length-1))}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(52),i=r(15),o=r(78),s=r(11),a=r(17),u=r(50);function c(t,{max_decimal_digits:e,infinity_times_zero:r="NaN"}={}){const c=t.some(t=>i(t)),l=t.some(t=>s(t));if(c&&l)return r;if(c){return t.filter(t=>"-"===u(t)).length%2==0?"Infinity":"-Infinity"}if(l)return"0";const f=o(t.filter(t=>n(t)).length.toString());let h=a(t.map(t=>t.replace(/i$/,"")),{max_decimal_digits:e});return f&&(h+="i"),h}t.exports=c,t.exports.default=c},function(t,e,r){"use strict";const n=r(0);function i(t){return"-"===(t=n(t))[0]}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(1),i=r(160),o=r(161);function s(t,{max_decimal_digits:e=100,fraction:r=!1}={}){if(i(t)){const[i,s]=o(t);return r?s+"/"+i:n(s,i,{max_decimal_digits:e})}return r?"1/"+t:n("1",t,{max_decimal_digits:e})}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";const n=r(0),i=r(16);function o(t){if(t=n(t),!i(t))throw new Error("can\'t call is_even on decimal");return["0","2","4","6","8"].includes(t.charAt(t.length-1))}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(76),i=r(84),o=r(1);function s(t,e){const r=i(t);return"0"===r?"0":n(o(r,e,{max_decimal_digits:1}))}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";const n=r(4),i=r(0);function o(t){const e=(t=n(i(t))).indexOf(".");return(-1===e?t.length:e).toString()}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(1),i=r(82),o=r(86),s=r(87);function a(t,e){const r=s("2",o(["1000",e,e]));for(;t.endsWith("0")&&e.endsWith("0");)t=t.substring(0,t.length-1),e=e.substring(0,e.length-1);for(;i(t)&&i(e);)t=n(t,"2"),e=n(e,"2");let a=!0;for(;a;){a=!1;for(let i=0;i<r.length;i++){const o=r[i],s=o.length+1,u=n(t,o,{ellipsis:!0,max_decimal_digits:s});if(-1===u.indexOf(".")){const r=n(e,o,{ellipsis:!0,max_decimal_digits:s});if(-1===r.indexOf(".")){t=u,e=r,a=!0;break}}}}return[t,e]}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(0),i=r(34);function o(t){"string"==typeof t&&(t=Array.prototype.slice.call(arguments));let e=n(t[0]);const r=t.length;for(let n=1;n<r;n++){const r=t[n];"<"===i(r,e)&&(e=r)}return e}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(5),i=r(1),o=r(16),s=r(8);function a(t="0",e="100"){const r=["2","3","5","7","11"].filter(r=>"<"!==n(r,t)&&">"!==n(r,e));let a="13";for(;">"!==n(a,e);)/^\\d+5/.test(a)||/^(\\d)\\1+/.test(a)||["9","7","3"].every(t=>!o(i(a,t)))&&r.push(a),a=s(a,"2");return r}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(6),i=r(1);function o({max_decimal_digits:t=100,steps:e=100}={}){let r="1",o="1";for(let s=1;s<e;s++)o=i(o,s.toString(),{max_decimal_digits:t}),r=n(r,o);return r}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(0),i=r(90),o=r(91),s=r(11),a=r(88),u=r(35);function c(t,{max_decimal_digits:e=100}={}){const r=a({max_decimal_digits:2*e});return i(t)?"0":o(t)?"Infinity":s(t)?"1":(t=n(t),u(r,t,{max_decimal_digits:e}))}t.exports=c,t.exports.default=c},function(t,e,r){"use strict";function n(t){return!!t.match(/^-inf(inity)?$/i)}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";function n(t){return!!t.match(/^\\+?inf(inity)?$/i)}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(37);function i(t,e){return n(t,"2",e)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";function n(t){const e=t.indexOf(".");return-1===e?t:t.substring(0,e)}t.exports=n,t.exports.default=n},function(t,e,r){const n=r(95),i=r(180);function o(t,e,{precise:r=!1}={precise:!1}){return r?i(n(t.toString(),e.toString()),"2"):(t+e)/2}t.exports=o,t.exports.default=o},function(t,e,r){const n=r(38),i=r(18),o=r(96),s=r(97);function a(t,e){t=i(t),e=i(e);const r="-"!==t[0],a="-"!==e[0];if(r&&a)return o(t,e);if(!r&&!a)return"-"+o(t.substring(1),e.substring(1));if(!r&&a)switch(t=t.substring(1),n(t,e)){case"=":return"0";case"<":return s(e,t);case">":return"-"+s(t,e)}else if(r&&!a)switch(e=e.substring(1),n(t,e)){case"=":return"0";case"<":return"-"+s(e,t);case">":return s(t,e)}}t.exports=a,t.exports.default=a},function(t,e,r){const{MAX_SAFE_INTEGER_LENGTH:n}=r(56);t.exports=function(t,e){const r=t.length,i=e.length,o=t.indexOf("."),s=e.indexOf("."),a=-1===o?r:o,u=-1===s?i:s;if(-1===o&&-1===s&&r<n&&i<n)return(Number(t)+Number(e)).toFixed();const c=a-u;let l=Math.max(a,u),f=Math.max(r-a-1,i-u-1),h=c<0?-1*c:0,d=c<=0?0:c,p=l+1+f-1,y="",g=0,m=p;if(f>0){for(;m>p-f;){const r=t[m-h]||"0",n=e[m-d]||"0";let i=Number(r)+Number(n)+g;i>=10?(i-=10,g=1):g=0,""===y&&0===i||(y=i+y),m--}y&&(y="."+y),m--}if(l>0)for(;m>=0;){const r=t[m-h]||"0",n=e[m-d]||"0";let i=Number(r)+Number(n)+g;i>=10?(i-=10,g=1):g=0,y=i+y,m--}return 1===g&&(y=g+y),"."===y[0]&&(y="0"+y),y}},function(t,e,r){const{MAX_SAFE_INTEGER_LENGTH:n}=r(56);t.exports=function(t,e){const r=t.length,i=e.length,o=t.indexOf("."),s=e.indexOf("."),a=-1===o?r:o,u=-1===s?i:s;if(-1===o&&-1===s&&r<n&&i<n)return(Number(t)-Number(e)).toFixed();const c=a-u;let l=Math.max(a,u),f=Math.max(r-a-1,i-u-1),h=c<0?-1*c:0,d=c<=0?0:c,p=l+1+f-1,y="",g=0,m=p;if(f>0){for(;m>p-f;){let r=t[m-h]||"0",n=e[m-d]||"0";r-=g,g=0;let i=r-n;if(i<0)for(;i<0;)g++,i+=10;else g&&g--;""===y&&0===i||(y=i+y),m--}""!==y&&(y="."+y),m--}if(l>0){for(;m>0;){let r=t[m-h]||"0",n=e[m-d]||"0";r-=g,g=0;let i=r-n;if(i<0)for(;i<0;)g++,i+=10;else g&&g--;y=i+y,m--}const r=t[0-h]||"0",n=e[0-d]||"0";let i=Number(r)-(g>0?1:0)-Number(n);0!==i&&(y=i+y),y=y.replace(/^0+/,"")}return"."===y[0]&&(y="0"+y),y}},function(t,e,r){const n=r(18);function i(t){return"-"===(t=n(t))[0]?t.substring(1):t}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,i=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(n=(s=a.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{!n&&a.return&&a.return()}finally{if(i)throw o}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=function(t,e){return new Promise((function(r,o){try{e&&console.log("starting parseData with",t),e&&console.log("\\tGeoTIFF:","undefined"==typeof GeoTIFF?"undefined":i(GeoTIFF));var u={},c=void 0,h=void 0;if("object"===t.rasterType)u.values=t.data,u.height=c=t.metadata.height||u.values[0].length,u.width=h=t.metadata.width||u.values[0][0].length,u.pixelHeight=t.metadata.pixelHeight,u.pixelWidth=t.metadata.pixelWidth,u.projection=t.metadata.projection,u.xmin=t.metadata.xmin,u.ymax=t.metadata.ymax,u.noDataValue=t.metadata.noDataValue,u.numberOfRasters=u.values.length,u.xmax=u.xmin+u.width*u.pixelWidth,u.ymin=u.ymax-u.height*u.pixelHeight,u._data=null,r(f(u));else if("geotiff"===t.rasterType){u._data=t.data;var d=s.fromArrayBuffer;"url"===t.sourceType?d=s.fromUrl:"Blob"===t.sourceType&&(d=s.fromBlob),e&&console.log("data.rasterType is geotiff"),r(d(t.data).then((function(r){return e&&console.log("geotiff:",r),r.getImage().then((function(r){try{e&&console.log("image:",r);var i=r.fileDirectory,s=r.getGeoKeys()||{},d=s.GeographicTypeGeoKey,p=s.ProjectedCSTypeGeoKey;u.projection=p||d||t.metadata.projection,e&&console.log("projection:",u.projection),u.height=c=r.getHeight(),e&&console.log("result.height:",u.height),u.width=h=r.getWidth(),e&&console.log("result.width:",u.width);var y=r.getResolution(),g=n(y,2),m=g[0],b=g[1];u.pixelHeight=Math.abs(b),u.pixelWidth=Math.abs(m);var v=r.getOrigin(),w=n(v,2),x=w[0],_=w[1];return u.xmin=x,u.xmax=u.xmin+h*u.pixelWidth,u.ymax=_,u.ymin=u.ymax-c*u.pixelHeight,u.noDataValue=i.GDAL_NODATA?parseFloat(i.GDAL_NODATA):null,u.numberOfRasters=i.SamplesPerPixel,i.ColorMap&&(u.palette=(0,a.getPalette)(r)),"url"!==t.sourceType?r.readRasters().then((function(t){return u.values=t.map((function(t){return(0,l.unflatten)(t,{height:c,width:h})})),f(u)})):u}catch(t){o(t),console.error("[georaster] error parsing georaster:",t)}}))})))}}catch(t){o(t),console.error("[georaster] error parsing georaster:",t)}}))};var o,s=r(193),a=r(150),u=r(151),c=(o=u)&&o.__esModule?o:{default:o},l=r(192);function f(t){var e=(0,c.default)(t.values,{height:t.height,layout:"[band][row][column]",noData:t.noDataValue,precise:!1,stats:["max","min","range"],width:t.width});return t.maxs=e.bands.map((function(t){return t.max})),t.mins=e.bands.map((function(t){return t.min})),t.ranges=e.bands.map((function(t){return t.range})),t}},function(t,e,r){function n(t,e){"use strict";var r=(e=e||{}).pos||0,i="<".charCodeAt(0),o=">".charCodeAt(0),s="-".charCodeAt(0),a="/".charCodeAt(0),u="!".charCodeAt(0),c="\'".charCodeAt(0),l=\'"\'.charCodeAt(0);function f(){for(var e=[];t[r];)if(t.charCodeAt(r)==i){if(t.charCodeAt(r+1)===a)return(r=t.indexOf(">",r))+1&&(r+=1),e;if(t.charCodeAt(r+1)===u){if(t.charCodeAt(r+2)==s){for(;-1!==r&&(t.charCodeAt(r)!==o||t.charCodeAt(r-1)!=s||t.charCodeAt(r-2)!=s||-1==r);)r=t.indexOf(">",r+1);-1===r&&(r=t.length)}else for(r+=2;t.charCodeAt(r)!==o&&t[r];)r++;r++;continue}var n=y();e.push(n)}else{var c=h();c.trim().length>0&&e.push(c),r++}return e}function h(){var e=r;return-2===(r=t.indexOf("<",r)-1)&&(r=t.length),t.slice(e,r+1)}function d(){for(var e=r;-1==="\\n\\t>/= ".indexOf(t[r])&&t[r];)r++;return t.slice(e,r)}var p=e.noChildNodes||["img","br","input","meta","link"];function y(){r++;const e=d(),n={};let i=[];for(;t.charCodeAt(r)!==o&&t[r];){var s=t.charCodeAt(r);if(s>64&&s<91||s>96&&s<123){for(var u=d(),h=t.charCodeAt(r);h&&h!==c&&h!==l&&!(h>64&&h<91||h>96&&h<123)&&h!==o;)r++,h=t.charCodeAt(r);if(h===c||h===l){var y=g();if(-1===r)return{tagName:e,attributes:n,children:i}}else y=null,r--;n[u]=y}r++}if(t.charCodeAt(r-1)!==a)if("script"==e){var m=r+1;r=t.indexOf("<\\/script>",r),i=[t.slice(m,r-1)],r+=9}else if("style"==e){m=r+1;r=t.indexOf("</style>",r),i=[t.slice(m,r-1)],r+=8}else-1==p.indexOf(e)&&(r++,i=f());else r++;return{tagName:e,attributes:n,children:i}}function g(){var e=t[r],n=++r;return r=t.indexOf(e,n),t.slice(n,r)}var m,b=null;if(void 0!==e.attrValue){e.attrName=e.attrName||"id";for(b=[];-1!==(m=void 0,m=new RegExp("\\\\s"+e.attrName+"\\\\s*=[\'\\"]"+e.attrValue+"[\'\\"]").exec(t),r=m?m.index:-1);)-1!==(r=t.lastIndexOf("<",r))&&b.push(y()),t=t.substr(r),r=0}else b=e.parseNode?y():f();return e.filter&&(b=n.filter(b,e.filter)),e.setPos&&(b.pos=r),b}n.simplify=function(t){var e={};if(!t.length)return"";if(1===t.length&&"string"==typeof t[0])return t[0];for(var r in t.forEach((function(t){if("object"==typeof t){e[t.tagName]||(e[t.tagName]=[]);var r=n.simplify(t.children||[]);e[t.tagName].push(r),t.attributes&&(r._attributes=t.attributes)}})),e)1==e[r].length&&(e[r]=e[r][0]);return e},n.filter=function(t,e){var r=[];return t.forEach((function(t){if("object"==typeof t&&e(t)&&r.push(t),t.children){var i=n.filter(t.children,e);r=r.concat(i)}})),r},n.stringify=function(t){var e="";function r(t){if(t)for(var r=0;r<t.length;r++)"string"==typeof t[r]?e+=t[r].trim():n(t[r])}function n(t){for(var n in e+="<"+t.tagName,t.attributes)null===t.attributes[n]?e+=" "+n:-1===t.attributes[n].indexOf(\'"\')?e+=" "+n+\'="\'+t.attributes[n].trim()+\'"\':e+=" "+n+"=\'"+t.attributes[n].trim()+"\'";e+=">",r(t.children),e+="</"+t.tagName+">"}return r(t),e},n.toContentString=function(t){if(Array.isArray(t)){var e="";return t.forEach((function(t){e=(e+=" "+n.toContentString(t)).trim()})),e}return"object"==typeof t?n.toContentString(t.children):" "+t},n.getElementById=function(t,e,r){var i=n(t,{attrValue:e});return r?n.simplify(i):i[0]},n.getElementsByClassName=function(t,e,r){const i=n(t,{attrName:"class",attrValue:"[a-zA-Z0-9-s ]*"+e+"[a-zA-Z0-9-s ]*"});return r?n.simplify(i):i},n.parseStream=function(t,e){if("string"==typeof e&&(e=e.length+2),"string"==typeof t){var i=r(25);t=i.createReadStream(t,{start:e}),e=0}var o=e,s="";return t.on("data",(function(e){s+=e;for(var r=0;;){if(!(o=s.indexOf("<",o)+1))return void(o=r);if("/"!==s[o+1]){var i=n(s,{pos:o-1,parseNode:!0,setPos:!0});if((o=i.pos)>s.length-1||o<r)return s=s.slice(r),o=0,void(r=0);t.emit("xml",i),r=o}else o+=1,r=pos}})),t.on("end",(function(){console.log("end")})),t},n.transformStream=function(t){const e=r(107);"string"==typeof t&&(t=t.length+2);var i=t||0,o="";return e({readableObjectMode:!0},(function(t,e,r){o+=t;for(var s=0;;){if(!(i=o.indexOf("<",i)+1))return i=s,r();if("/"!==o[i+1]){var a=n(o,{pos:i-1,parseNode:!0,setPos:!0});if((i=a.pos)>o.length-1||i<s)return o=o.slice(s),i=0,s=0,r();this.push(a),s=i}else i+=1,s=pos}r()}))},t.exports=n,n.xml=n},function(t,e,r){"use strict";var n=r(118),i=r(29),o=r(123),s=r(124),a=r(125),u=r(126),c=r(127),l=Object.prototype.toString;function f(t){if(!(this instanceof f))return new f(t);this.options=i.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var r=n.inflateInit2(this.strm,e.windowBits);if(r!==s.Z_OK)throw new Error(a[r]);if(this.header=new c,n.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=o.string2buf(e.dictionary):"[object ArrayBuffer]"===l.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(r=n.inflateSetDictionary(this.strm,e.dictionary))!==s.Z_OK))throw new Error(a[r])}function h(t,e){var r=new f(e);if(r.push(t,!0),r.err)throw r.msg||a[r.err];return r.result}f.prototype.push=function(t,e){var r,a,u,c,f,h=this.strm,d=this.options.chunkSize,p=this.options.dictionary,y=!1;if(this.ended)return!1;a=e===~~e?e:!0===e?s.Z_FINISH:s.Z_NO_FLUSH,"string"==typeof t?h.input=o.binstring2buf(t):"[object ArrayBuffer]"===l.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new i.Buf8(d),h.next_out=0,h.avail_out=d),(r=n.inflate(h,s.Z_NO_FLUSH))===s.Z_NEED_DICT&&p&&(r=n.inflateSetDictionary(this.strm,p)),r===s.Z_BUF_ERROR&&!0===y&&(r=s.Z_OK,y=!1),r!==s.Z_STREAM_END&&r!==s.Z_OK)return this.onEnd(r),this.ended=!0,!1;h.next_out&&(0!==h.avail_out&&r!==s.Z_STREAM_END&&(0!==h.avail_in||a!==s.Z_FINISH&&a!==s.Z_SYNC_FLUSH)||("string"===this.options.to?(u=o.utf8border(h.output,h.next_out),c=h.next_out-u,f=o.buf2string(h.output,u),h.next_out=c,h.avail_out=d-c,c&&i.arraySet(h.output,h.output,u,c,0),this.onData(f)):this.onData(i.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(y=!0)}while((h.avail_in>0||0===h.avail_out)&&r!==s.Z_STREAM_END);return r===s.Z_STREAM_END&&(a=s.Z_FINISH),a===s.Z_FINISH?(r=n.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===s.Z_OK):a!==s.Z_SYNC_FLUSH||(this.onEnd(s.Z_OK),h.avail_out=0,!0)},f.prototype.onData=function(t){this.chunks.push(t)},f.prototype.onEnd=function(t){t===s.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},e.Inflate=f,e.inflate=h,e.inflateRaw=function(t,e){return(e=e||{}).raw=!0,h(t,e)},e.ungzip=h},function(t,e,r){"use strict";var n=r(26);class i extends n.a{constructor(){super(t=>(this._observers.add(t),()=>this._observers.delete(t))),this._observers=new Set}next(t){for(const e of this._observers)e.next(t)}error(t){for(const e of this._observers)e.error(t)}complete(){for(const t of this._observers)t.complete()}}e.a=i},function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));const n=()=>{};function i(){let t,e=!1,r=n;return[new Promise(n=>{e?n(t):r=n}),n=>{e=!0,t=n,r(t)}]}},function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(2);function i(t){return t&&"object"==typeof t&&t[n.d]}},function(t,e,r){var n=r(40),i=r(39),o=t.exports;for(var s in n)n.hasOwnProperty(s)&&(o[s]=n[s]);function a(t){if("string"==typeof t&&(t=i.parse(t)),t.protocol||(t.protocol="https:"),"https:"!==t.protocol)throw new Error(\'Protocol "\'+t.protocol+\'" not supported. Expected "https:"\');return t}o.request=function(t,e){return t=a(t),n.request.call(this,t,e)},o.get=function(t,e){return t=a(t),n.get.call(this,t,e)}},function(t,e,r){"use strict";r.r(e);var n=r(99),i=r.n(n);self;onmessage=t=>{const e=t.data;i()(e).then(t=>{const e=[];if(t.values){let r;t.values.forEach(t=>t.forEach(({buffer:t})=>{t instanceof ArrayBuffer&&t!==r&&(e.push(t),r=t)}))}t._data instanceof ArrayBuffer&&e.push(t._data),postMessage(t,e),close()})}},function(t,e,r){(function(e){var n=r(42).Transform,i=r(10);function o(t){n.call(this,t),this._destroyed=!1}function s(t,e,r){r(null,t)}function a(t){return function(e,r,n){return"function"==typeof e&&(n=r,r=e,e={}),"function"!=typeof r&&(r=s),"function"!=typeof n&&(n=null),t(e,r,n)}}i(o,n),o.prototype.destroy=function(t){if(!this._destroyed){this._destroyed=!0;var r=this;e.nextTick((function(){t&&r.emit("error",t),r.emit("close")}))}},t.exports=a((function(t,e,r){var n=new o(t);return n._transform=e,r&&(n._flush=r),n})),t.exports.ctor=a((function(t,e,r){function n(e){if(!(this instanceof n))return new n(e);this.options=Object.assign({},t,e),o.call(this,this.options)}return i(n,o),n.prototype._transform=e,r&&(n.prototype._flush=r),n})),t.exports.obj=a((function(t,e,r){var n=new o(Object.assign({objectMode:!0,highWaterMark:16},t));return n._transform=e,r&&(n._flush=r),n}))}).call(this,r(7))},function(t,e,r){"use strict";e.byteLength=function(t){var e=c(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,n=c(t),s=n[0],a=n[1],u=new o(function(t,e,r){return 3*(e+r)/4-r}(0,s,a)),l=0,f=a>0?s-4:s;for(r=0;r<f;r+=4)e=i[t.charCodeAt(r)]<<18|i[t.charCodeAt(r+1)]<<12|i[t.charCodeAt(r+2)]<<6|i[t.charCodeAt(r+3)],u[l++]=e>>16&255,u[l++]=e>>8&255,u[l++]=255&e;2===a&&(e=i[t.charCodeAt(r)]<<2|i[t.charCodeAt(r+1)]>>4,u[l++]=255&e);1===a&&(e=i[t.charCodeAt(r)]<<10|i[t.charCodeAt(r+1)]<<4|i[t.charCodeAt(r+2)]>>2,u[l++]=e>>8&255,u[l++]=255&e);return u},e.fromByteArray=function(t){for(var e,r=t.length,i=r%3,o=[],s=0,a=r-i;s<a;s+=16383)o.push(l(t,s,s+16383>a?a:s+16383));1===i?(e=t[r-1],o.push(n[e>>2]+n[e<<4&63]+"==")):2===i&&(e=(t[r-2]<<8)+t[r-1],o.push(n[e>>10]+n[e>>4&63]+n[e<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],i[s.charCodeAt(a)]=a;function c(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function l(t,e,r){for(var i,o,s=[],a=e;a<r;a+=3)i=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),s.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return s.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(t,e){\n/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */\ne.read=function(t,e,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,l=-7,f=r?i-1:0,h=r?-1:1,d=t[e+f];for(f+=h,o=d&(1<<-l)-1,d>>=-l,l+=a;l>0;o=256*o+t[e+f],f+=h,l-=8);for(s=o&(1<<-l)-1,o>>=-l,l+=n;l>0;s=256*s+t[e+f],f+=h,l-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(d?-1:1);s+=Math.pow(2,n),o-=c}return(d?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,a,u,c=8*o-i-1,l=(1<<c)-1,f=l>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:o-1,p=n?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=l):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+f>=1?h/u:h*Math.pow(2,1-f))*u>=2&&(s++,u/=2),s+f>=l?(a=0,s=l):s+f>=1?(a=(e*u-1)*Math.pow(2,i),s+=f):(a=e*Math.pow(2,f-1)*Math.pow(2,i),s=0));i>=8;t[r+d]=255&a,d+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;t[r+d]=255&s,d+=p,s/=256,c-=8);t[r+d-p]|=128*y}},function(t,e){},function(t,e,r){"use strict";var n=r(43).Buffer,i=r(112);t.exports=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.head=null,this.tail=null,this.length=0}return t.prototype.push=function(t){var e={data:t,next:null};this.length>0?this.tail.next=e:this.head=e,this.tail=e,++this.length},t.prototype.unshift=function(t){var e={data:t,next:this.head};0===this.length&&(this.tail=e),this.head=e,++this.length},t.prototype.shift=function(){if(0!==this.length){var t=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,t}},t.prototype.clear=function(){this.head=this.tail=null,this.length=0},t.prototype.join=function(t){if(0===this.length)return"";for(var e=this.head,r=""+e.data;e=e.next;)r+=t+e.data;return r},t.prototype.concat=function(t){if(0===this.length)return n.alloc(0);for(var e,r,i,o=n.allocUnsafe(t>>>0),s=this.head,a=0;s;)e=s.data,r=o,i=a,e.copy(r,i),a+=s.data.length,s=s.next;return o},t}(),i&&i.inspect&&i.inspect.custom&&(t.exports.prototype[i.inspect.custom]=function(){var t=i.inspect({length:this.length});return this.constructor.name+" "+t})},function(t,e){},function(t,e,r){(function(t){var n=void 0!==t&&t||"undefined"!=typeof self&&self||window,i=Function.prototype.apply;function o(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new o(i.call(setTimeout,n,arguments),clearTimeout)},e.setInterval=function(){return new o(i.call(setInterval,n,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(n,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},r(114),e.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(this,r(3))},function(t,e,r){(function(t,e){!function(t,r){"use strict";if(!t.setImmediate){var n,i,o,s,a,u=1,c={},l=!1,f=t.document,h=Object.getPrototypeOf&&Object.getPrototypeOf(t);h=h&&h.setTimeout?h:t,"[object process]"==={}.toString.call(t.process)?n=function(t){e.nextTick((function(){p(t)}))}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,r=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=r,e}}()?t.MessageChannel?((o=new MessageChannel).port1.onmessage=function(t){p(t.data)},n=function(t){o.port2.postMessage(t)}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,n=function(t){var e=f.createElement("script");e.onreadystatechange=function(){p(t),e.onreadystatechange=null,i.removeChild(e),e=null},i.appendChild(e)}):n=function(t){setTimeout(p,0,t)}:(s="setImmediate$"+Math.random()+"$",a=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(s)&&p(+e.data.slice(s.length))},t.addEventListener?t.addEventListener("message",a,!1):t.attachEvent("onmessage",a),n=function(e){t.postMessage(s+e,"*")}),h.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),r=0;r<e.length;r++)e[r]=arguments[r+1];var i={callback:t,args:e};return c[u]=i,n(u),u++},h.clearImmediate=d}function d(t){delete c[t]}function p(t){if(l)setTimeout(p,0,t);else{var e=c[t];if(e){l=!0;try{!function(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(void 0,r)}}(e)}finally{d(t),l=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(this,r(3),r(7))},function(t,e,r){(function(e){function r(t){try{if(!e.localStorage)return!1}catch(t){return!1}var r=e.localStorage[t];return null!=r&&"true"===String(r).toLowerCase()}t.exports=function(t,e){if(r("noDeprecation"))return t;var n=!1;return function(){if(!n){if(r("throwDeprecation"))throw new Error(e);r("traceDeprecation")?console.trace(e):console.warn(e),n=!0}return t.apply(this,arguments)}}}).call(this,r(3))},function(t,e,r){var n=r(9),i=n.Buffer;function o(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return i(t,e,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=n:(o(n,e),e.Buffer=s),o(i,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");var n=i(t);return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}},function(t,e,r){"use strict";t.exports=o;var n=r(67),i=Object.create(r(21));function o(t){if(!(this instanceof o))return new o(t);n.call(this,t)}i.inherits=r(10),i.inherits(o,n),o.prototype._transform=function(t,e,r){r(null,t)}},function(t,e,r){"use strict";var n=r(29),i=r(119),o=r(120),s=r(121),a=r(122);function u(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function c(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function l(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new n.Buf32(852),e.distcode=e.distdyn=new n.Buf32(592),e.sane=1,e.back=-1,0):-2}function f(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,l(t)):-2}function h(t,e){var r,n;return t&&t.state?(n=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?-2:(null!==n.window&&n.wbits!==e&&(n.window=null),n.wrap=r,n.wbits=e,f(t))):-2}function d(t,e){var r,n;return t?(n=new c,t.state=n,n.window=null,0!==(r=h(t,e))&&(t.state=null),r):-2}var p,y,g=!0;function m(t){if(g){var e;for(p=new n.Buf32(512),y=new n.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(a(1,t.lens,0,288,p,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;a(2,t.lens,0,32,y,0,t.work,{bits:5}),g=!1}t.lencode=p,t.lenbits=9,t.distcode=y,t.distbits=5}function b(t,e,r,i){var o,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new n.Buf8(s.wsize)),i>=s.wsize?(n.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):((o=s.wsize-s.wnext)>i&&(o=i),n.arraySet(s.window,e,r-i,o,s.wnext),(i-=o)?(n.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=o,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=o))),0}e.inflateReset=f,e.inflateReset2=h,e.inflateResetKeep=l,e.inflateInit=function(t){return d(t,15)},e.inflateInit2=d,e.inflate=function(t,e){var r,c,l,f,h,d,p,y,g,v,w,x,_,S,A,E,k,T,C,O,I,P,R,j,M=0,L=new n.Buf8(4),F=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return-2;12===(r=t.state).mode&&(r.mode=13),h=t.next_out,l=t.output,p=t.avail_out,f=t.next_in,c=t.input,d=t.avail_in,y=r.hold,g=r.bits,v=d,w=p,P=0;t:for(;;)switch(r.mode){case 1:if(0===r.wrap){r.mode=13;break}for(;g<16;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(2&r.wrap&&35615===y){r.check=0,L[0]=255&y,L[1]=y>>>8&255,r.check=o(r.check,L,2,0),y=0,g=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&y)<<8)+(y>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&y)){t.msg="unknown compression method",r.mode=30;break}if(g-=4,I=8+(15&(y>>>=4)),0===r.wbits)r.wbits=I;else if(I>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<I,t.adler=r.check=1,r.mode=512&y?10:12,y=0,g=0;break;case 2:for(;g<16;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(r.flags=y,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=y>>8&1),512&r.flags&&(L[0]=255&y,L[1]=y>>>8&255,r.check=o(r.check,L,2,0)),y=0,g=0,r.mode=3;case 3:for(;g<32;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.head&&(r.head.time=y),512&r.flags&&(L[0]=255&y,L[1]=y>>>8&255,L[2]=y>>>16&255,L[3]=y>>>24&255,r.check=o(r.check,L,4,0)),y=0,g=0,r.mode=4;case 4:for(;g<16;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.head&&(r.head.xflags=255&y,r.head.os=y>>8),512&r.flags&&(L[0]=255&y,L[1]=y>>>8&255,r.check=o(r.check,L,2,0)),y=0,g=0,r.mode=5;case 5:if(1024&r.flags){for(;g<16;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.length=y,r.head&&(r.head.extra_len=y),512&r.flags&&(L[0]=255&y,L[1]=y>>>8&255,r.check=o(r.check,L,2,0)),y=0,g=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&((x=r.length)>d&&(x=d),x&&(r.head&&(I=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),n.arraySet(r.head.extra,c,f,x,I)),512&r.flags&&(r.check=o(r.check,c,x,f)),d-=x,f+=x,r.length-=x),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===d)break t;x=0;do{I=c[f+x++],r.head&&I&&r.length<65536&&(r.head.name+=String.fromCharCode(I))}while(I&&x<d);if(512&r.flags&&(r.check=o(r.check,c,x,f)),d-=x,f+=x,I)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===d)break t;x=0;do{I=c[f+x++],r.head&&I&&r.length<65536&&(r.head.comment+=String.fromCharCode(I))}while(I&&x<d);if(512&r.flags&&(r.check=o(r.check,c,x,f)),d-=x,f+=x,I)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;g<16;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(y!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}y=0,g=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;g<32;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}t.adler=r.check=u(y),y=0,g=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=h,t.avail_out=p,t.next_in=f,t.avail_in=d,r.hold=y,r.bits=g,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){y>>>=7&g,g-=7&g,r.mode=27;break}for(;g<3;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}switch(r.last=1&y,g-=1,3&(y>>>=1)){case 0:r.mode=14;break;case 1:if(m(r),r.mode=20,6===e){y>>>=2,g-=2;break t}break;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}y>>>=2,g-=2;break;case 14:for(y>>>=7&g,g-=7&g;g<32;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if((65535&y)!=(y>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&y,y=0,g=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(x=r.length){if(x>d&&(x=d),x>p&&(x=p),0===x)break t;n.arraySet(l,c,f,x,h),d-=x,f+=x,p-=x,h+=x,r.length-=x;break}r.mode=12;break;case 17:for(;g<14;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(r.nlen=257+(31&y),y>>>=5,g-=5,r.ndist=1+(31&y),y>>>=5,g-=5,r.ncode=4+(15&y),y>>>=4,g-=4,r.nlen>286||r.ndist>30){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;g<3;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.lens[F[r.have++]]=7&y,y>>>=3,g-=3}for(;r.have<19;)r.lens[F[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,R={bits:r.lenbits},P=a(0,r.lens,0,19,r.lencode,0,r.work,R),r.lenbits=R.bits,P){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;E=(M=r.lencode[y&(1<<r.lenbits)-1])>>>16&255,k=65535&M,!((A=M>>>24)<=g);){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(k<16)y>>>=A,g-=A,r.lens[r.have++]=k;else{if(16===k){for(j=A+2;g<j;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(y>>>=A,g-=A,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}I=r.lens[r.have-1],x=3+(3&y),y>>>=2,g-=2}else if(17===k){for(j=A+3;g<j;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}g-=A,I=0,x=3+(7&(y>>>=A)),y>>>=3,g-=3}else{for(j=A+7;g<j;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}g-=A,I=0,x=11+(127&(y>>>=A)),y>>>=7,g-=7}if(r.have+x>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;x--;)r.lens[r.have++]=I}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,R={bits:r.lenbits},P=a(1,r.lens,0,r.nlen,r.lencode,0,r.work,R),r.lenbits=R.bits,P){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,R={bits:r.distbits},P=a(2,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,R),r.distbits=R.bits,P){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(d>=6&&p>=258){t.next_out=h,t.avail_out=p,t.next_in=f,t.avail_in=d,r.hold=y,r.bits=g,s(t,w),h=t.next_out,l=t.output,p=t.avail_out,f=t.next_in,c=t.input,d=t.avail_in,y=r.hold,g=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;E=(M=r.lencode[y&(1<<r.lenbits)-1])>>>16&255,k=65535&M,!((A=M>>>24)<=g);){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(E&&0==(240&E)){for(T=A,C=E,O=k;E=(M=r.lencode[O+((y&(1<<T+C)-1)>>T)])>>>16&255,k=65535&M,!(T+(A=M>>>24)<=g);){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}y>>>=T,g-=T,r.back+=T}if(y>>>=A,g-=A,r.back+=A,r.length=k,0===E){r.mode=26;break}if(32&E){r.back=-1,r.mode=12;break}if(64&E){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&E,r.mode=22;case 22:if(r.extra){for(j=r.extra;g<j;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.length+=y&(1<<r.extra)-1,y>>>=r.extra,g-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;E=(M=r.distcode[y&(1<<r.distbits)-1])>>>16&255,k=65535&M,!((A=M>>>24)<=g);){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(0==(240&E)){for(T=A,C=E,O=k;E=(M=r.distcode[O+((y&(1<<T+C)-1)>>T)])>>>16&255,k=65535&M,!(T+(A=M>>>24)<=g);){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}y>>>=T,g-=T,r.back+=T}if(y>>>=A,g-=A,r.back+=A,64&E){t.msg="invalid distance code",r.mode=30;break}r.offset=k,r.extra=15&E,r.mode=24;case 24:if(r.extra){for(j=r.extra;g<j;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}r.offset+=y&(1<<r.extra)-1,y>>>=r.extra,g-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===p)break t;if(x=w-p,r.offset>x){if((x=r.offset-x)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}x>r.wnext?(x-=r.wnext,_=r.wsize-x):_=r.wnext-x,x>r.length&&(x=r.length),S=r.window}else S=l,_=h-r.offset,x=r.length;x>p&&(x=p),p-=x,r.length-=x;do{l[h++]=S[_++]}while(--x);0===r.length&&(r.mode=21);break;case 26:if(0===p)break t;l[h++]=r.length,p--,r.mode=21;break;case 27:if(r.wrap){for(;g<32;){if(0===d)break t;d--,y|=c[f++]<<g,g+=8}if(w-=p,t.total_out+=w,r.total+=w,w&&(t.adler=r.check=r.flags?o(r.check,l,w,h-w):i(r.check,l,w,h-w)),w=p,(r.flags?y:u(y))!==r.check){t.msg="incorrect data check",r.mode=30;break}y=0,g=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;g<32;){if(0===d)break t;d--,y+=c[f++]<<g,g+=8}if(y!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}y=0,g=0}r.mode=29;case 29:P=1;break t;case 30:P=-3;break t;case 31:return-4;case 32:default:return-2}return t.next_out=h,t.avail_out=p,t.next_in=f,t.avail_in=d,r.hold=y,r.bits=g,(r.wsize||w!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&b(t,t.output,t.next_out,w-t.avail_out)?(r.mode=31,-4):(v-=t.avail_in,w-=t.avail_out,t.total_in+=v,t.total_out+=w,r.total+=w,r.wrap&&w&&(t.adler=r.check=r.flags?o(r.check,l,w,t.next_out-w):i(r.check,l,w,t.next_out-w)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0===v&&0===w||4===e)&&0===P&&(P=-5),P)},e.inflateEnd=function(t){if(!t||!t.state)return-2;var e=t.state;return e.window&&(e.window=null),t.state=null,0},e.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?-2:(r.head=e,e.done=!1,0):-2},e.inflateSetDictionary=function(t,e){var r,n=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?-2:11===r.mode&&i(1,e,n,0)!==r.check?-3:b(t,e,n,n)?(r.mode=31,-4):(r.havedict=1,0):-2},e.inflateInfo="pako inflate (from Nodeca project)"},function(t,e,r){"use strict";t.exports=function(t,e,r,n){for(var i=65535&t|0,o=t>>>16&65535|0,s=0;0!==r;){r-=s=r>2e3?2e3:r;do{o=o+(i=i+e[n++]|0)|0}while(--s);i%=65521,o%=65521}return i|o<<16|0}},function(t,e,r){"use strict";var n=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();t.exports=function(t,e,r,i){var o=n,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^o[255&(t^e[a])];return-1^t}},function(t,e,r){"use strict";t.exports=function(t,e){var r,n,i,o,s,a,u,c,l,f,h,d,p,y,g,m,b,v,w,x,_,S,A,E,k;r=t.state,n=t.next_in,E=t.input,i=n+(t.avail_in-5),o=t.next_out,k=t.output,s=o-(e-t.avail_out),a=o+(t.avail_out-257),u=r.dmax,c=r.wsize,l=r.whave,f=r.wnext,h=r.window,d=r.hold,p=r.bits,y=r.lencode,g=r.distcode,m=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(d+=E[n++]<<p,p+=8,d+=E[n++]<<p,p+=8),v=y[d&m];e:for(;;){if(d>>>=w=v>>>24,p-=w,0===(w=v>>>16&255))k[o++]=65535&v;else{if(!(16&w)){if(0==(64&w)){v=y[(65535&v)+(d&(1<<w)-1)];continue e}if(32&w){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}x=65535&v,(w&=15)&&(p<w&&(d+=E[n++]<<p,p+=8),x+=d&(1<<w)-1,d>>>=w,p-=w),p<15&&(d+=E[n++]<<p,p+=8,d+=E[n++]<<p,p+=8),v=g[d&b];r:for(;;){if(d>>>=w=v>>>24,p-=w,!(16&(w=v>>>16&255))){if(0==(64&w)){v=g[(65535&v)+(d&(1<<w)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(_=65535&v,p<(w&=15)&&(d+=E[n++]<<p,(p+=8)<w&&(d+=E[n++]<<p,p+=8)),(_+=d&(1<<w)-1)>u){t.msg="invalid distance too far back",r.mode=30;break t}if(d>>>=w,p-=w,_>(w=o-s)){if((w=_-w)>l&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=0,A=h,0===f){if(S+=c-w,w<x){x-=w;do{k[o++]=h[S++]}while(--w);S=o-_,A=k}}else if(f<w){if(S+=c+f-w,(w-=f)<x){x-=w;do{k[o++]=h[S++]}while(--w);if(S=0,f<x){x-=w=f;do{k[o++]=h[S++]}while(--w);S=o-_,A=k}}}else if(S+=f-w,w<x){x-=w;do{k[o++]=h[S++]}while(--w);S=o-_,A=k}for(;x>2;)k[o++]=A[S++],k[o++]=A[S++],k[o++]=A[S++],x-=3;x&&(k[o++]=A[S++],x>1&&(k[o++]=A[S++]))}else{S=o-_;do{k[o++]=k[S++],k[o++]=k[S++],k[o++]=k[S++],x-=3}while(x>2);x&&(k[o++]=k[S++],x>1&&(k[o++]=k[S++]))}break}}break}}while(n<i&&o<a);n-=x=p>>3,d&=(1<<(p-=x<<3))-1,t.next_in=n,t.next_out=o,t.avail_in=n<i?i-n+5:5-(n-i),t.avail_out=o<a?a-o+257:257-(o-a),r.hold=d,r.bits=p}},function(t,e,r){"use strict";var n=r(29),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],o=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],a=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(t,e,r,u,c,l,f,h){var d,p,y,g,m,b,v,w,x,_=h.bits,S=0,A=0,E=0,k=0,T=0,C=0,O=0,I=0,P=0,R=0,j=null,M=0,L=new n.Buf16(16),F=new n.Buf16(16),N=null,D=0;for(S=0;S<=15;S++)L[S]=0;for(A=0;A<u;A++)L[e[r+A]]++;for(T=_,k=15;k>=1&&0===L[k];k--);if(T>k&&(T=k),0===k)return c[l++]=20971520,c[l++]=20971520,h.bits=1,0;for(E=1;E<k&&0===L[E];E++);for(T<E&&(T=E),I=1,S=1;S<=15;S++)if(I<<=1,(I-=L[S])<0)return-1;if(I>0&&(0===t||1!==k))return-1;for(F[1]=0,S=1;S<15;S++)F[S+1]=F[S]+L[S];for(A=0;A<u;A++)0!==e[r+A]&&(f[F[e[r+A]]++]=A);if(0===t?(j=N=f,b=19):1===t?(j=i,M-=257,N=o,D-=257,b=256):(j=s,N=a,b=-1),R=0,A=0,S=E,m=l,C=T,O=0,y=-1,g=(P=1<<T)-1,1===t&&P>852||2===t&&P>592)return 1;for(;;){v=S-O,f[A]<b?(w=0,x=f[A]):f[A]>b?(w=N[D+f[A]],x=j[M+f[A]]):(w=96,x=0),d=1<<S-O,E=p=1<<C;do{c[m+(R>>O)+(p-=d)]=v<<24|w<<16|x|0}while(0!==p);for(d=1<<S-1;R&d;)d>>=1;if(0!==d?(R&=d-1,R+=d):R=0,A++,0==--L[S]){if(S===k)break;S=e[r+f[A]]}if(S>T&&(R&g)!==y){for(0===O&&(O=T),m+=E,I=1<<(C=S-O);C+O<k&&!((I-=L[C+O])<=0);)C++,I<<=1;if(P+=1<<C,1===t&&P>852||2===t&&P>592)return 1;c[y=R&g]=T<<24|C<<16|m-l|0}}return 0!==R&&(c[m+R]=S-O<<24|64<<16|0),h.bits=T,0}},function(t,e,r){"use strict";var n=r(29),i=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch(t){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){o=!1}for(var s=new n.Buf8(256),a=0;a<256;a++)s[a]=a>=252?6:a>=248?5:a>=240?4:a>=224?3:a>=192?2:1;function u(t,e){if(e<65534&&(t.subarray&&o||!t.subarray&&i))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var r="",s=0;s<e;s++)r+=String.fromCharCode(t[s]);return r}s[254]=s[254]=1,e.string2buf=function(t){var e,r,i,o,s,a=t.length,u=0;for(o=0;o<a;o++)55296==(64512&(r=t.charCodeAt(o)))&&o+1<a&&56320==(64512&(i=t.charCodeAt(o+1)))&&(r=65536+(r-55296<<10)+(i-56320),o++),u+=r<128?1:r<2048?2:r<65536?3:4;for(e=new n.Buf8(u),s=0,o=0;s<u;o++)55296==(64512&(r=t.charCodeAt(o)))&&o+1<a&&56320==(64512&(i=t.charCodeAt(o+1)))&&(r=65536+(r-55296<<10)+(i-56320),o++),r<128?e[s++]=r:r<2048?(e[s++]=192|r>>>6,e[s++]=128|63&r):r<65536?(e[s++]=224|r>>>12,e[s++]=128|r>>>6&63,e[s++]=128|63&r):(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63,e[s++]=128|r>>>6&63,e[s++]=128|63&r);return e},e.buf2binstring=function(t){return u(t,t.length)},e.binstring2buf=function(t){for(var e=new n.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},e.buf2string=function(t,e){var r,n,i,o,a=e||t.length,c=new Array(2*a);for(n=0,r=0;r<a;)if((i=t[r++])<128)c[n++]=i;else if((o=s[i])>4)c[n++]=65533,r+=o-1;else{for(i&=2===o?31:3===o?15:7;o>1&&r<a;)i=i<<6|63&t[r++],o--;o>1?c[n++]=65533:i<65536?c[n++]=i:(i-=65536,c[n++]=55296|i>>10&1023,c[n++]=56320|1023&i)}return u(c,n)},e.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;r>=0&&128==(192&t[r]);)r--;return r<0||0===r?e:r+s[t[r]]>e?r:e}},function(t,e,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},function(t,e,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},function(t,e,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},function(t,e,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},function(t,e,r){t.exports=r.p+"0.bce5ef15ddaa1e171e9d.worker.worker.js"},function(t,e,r){t.exports=function(t){function e(t){let r,i,o,s=null;function a(...t){if(!a.enabled)return;const n=a,i=Number(new Date),o=i-(r||i);n.diff=o,n.prev=r,n.curr=i,r=i,t[0]=e.coerce(t[0]),"string"!=typeof t[0]&&t.unshift("%O");let s=0;t[0]=t[0].replace(/%([a-zA-Z%])/g,(r,i)=>{if("%%"===r)return"%";s++;const o=e.formatters[i];if("function"==typeof o){const e=t[s];r=o.call(n,e),t.splice(s,1),s--}return r}),e.formatArgs.call(n,t);(n.log||e.log).apply(n,t)}return a.namespace=t,a.useColors=e.useColors(),a.color=e.selectColor(t),a.extend=n,a.destroy=e.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==s?s:(i!==e.namespaces&&(i=e.namespaces,o=e.enabled(t)),o),set:t=>{s=t}}),"function"==typeof e.init&&e.init(a),a}function n(t,r){const n=e(this.namespace+(void 0===r?":":r)+t);return n.log=this.log,n}function i(t){return t.toString().substring(2,t.toString().length-2).replace(/\\.\\*\\?$/,"*")}return e.debug=e,e.default=e,e.coerce=function(t){if(t instanceof Error)return t.stack||t.message;return t},e.disable=function(){const t=[...e.names.map(i),...e.skips.map(i).map(t=>"-"+t)].join(",");return e.enable(""),t},e.enable=function(t){let r;e.save(t),e.namespaces=t,e.names=[],e.skips=[];const n=("string"==typeof t?t:"").split(/[\\s,]+/),i=n.length;for(r=0;r<i;r++)n[r]&&("-"===(t=n[r].replace(/\\*/g,".*?"))[0]?e.skips.push(new RegExp("^"+t.slice(1)+"$")):e.names.push(new RegExp("^"+t+"$")))},e.enabled=function(t){if("*"===t[t.length-1])return!0;let r,n;for(r=0,n=e.skips.length;r<n;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;r<n;r++)if(e.names[r].test(t))return!0;return!1},e.humanize=r(130),e.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(t).forEach(r=>{e[r]=t[r]}),e.names=[],e.skips=[],e.formatters={},e.selectColor=function(t){let r=0;for(let e=0;e<t.length;e++)r=(r<<5)-r+t.charCodeAt(e),r|=0;return e.colors[Math.abs(r)%e.colors.length]},e.enable(e.load()),e}},function(t,e){var r=1e3,n=6e4,i=60*n,o=24*i;function s(t,e,r,n){var i=e>=1.5*r;return Math.round(t/r)+" "+n+(i?"s":"")}t.exports=function(t,e){e=e||{};var a=typeof t;if("string"===a&&t.length>0)return function(t){if((t=String(t)).length>100)return;var e=/^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(!e)return;var s=parseFloat(e[1]);switch((e[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*s;case"weeks":case"week":case"w":return 6048e5*s;case"days":case"day":case"d":return s*o;case"hours":case"hour":case"hrs":case"hr":case"h":return s*i;case"minutes":case"minute":case"mins":case"min":case"m":return s*n;case"seconds":case"second":case"secs":case"sec":case"s":return s*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}(t);if("number"===a&&isFinite(t))return e.long?function(t){var e=Math.abs(t);if(e>=o)return s(t,e,o,"day");if(e>=i)return s(t,e,i,"hour");if(e>=n)return s(t,e,n,"minute");if(e>=r)return s(t,e,r,"second");return t+" ms"}(t):function(t){var e=Math.abs(t);if(e>=o)return Math.round(t/o)+"d";if(e>=i)return Math.round(t/i)+"h";if(e>=n)return Math.round(t/n)+"m";if(e>=r)return Math.round(t/r)+"s";return t+"ms"}(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,r){(function(e,n,i){var o=r(69),s=r(10),a=r(70),u=r(42),c=r(132),l=a.IncomingMessage,f=a.readyStates;var h=t.exports=function(t){var r,n=this;u.Writable.call(n),n._opts=t,n._body=[],n._headers={},t.auth&&n.setHeader("Authorization","Basic "+new e(t.auth).toString("base64")),Object.keys(t.headers).forEach((function(e){n.setHeader(e,t.headers[e])}));var i=!0;if("disable-fetch"===t.mode||"requestTimeout"in t&&!o.abortController)i=!1,r=!0;else if("prefer-streaming"===t.mode)r=!1;else if("allow-wrong-content-type"===t.mode)r=!o.overrideMimeType;else{if(t.mode&&"default"!==t.mode&&"prefer-fast"!==t.mode)throw new Error("Invalid value for opts.mode");r=!0}n._mode=function(t,e){return o.fetch&&e?"fetch":o.mozchunkedarraybuffer?"moz-chunked-arraybuffer":o.msstream?"ms-stream":o.arraybuffer&&t?"arraybuffer":o.vbArray&&t?"text:vbarray":"text"}(r,i),n._fetchTimer=null,n.on("finish",(function(){n._onFinish()}))};s(h,u.Writable),h.prototype.setHeader=function(t,e){var r=t.toLowerCase();-1===d.indexOf(r)&&(this._headers[r]={name:t,value:e})},h.prototype.getHeader=function(t){var e=this._headers[t.toLowerCase()];return e?e.value:null},h.prototype.removeHeader=function(t){delete this._headers[t.toLowerCase()]},h.prototype._onFinish=function(){var t=this;if(!t._destroyed){var r=t._opts,s=t._headers,a=null;"GET"!==r.method&&"HEAD"!==r.method&&(a=o.arraybuffer?c(e.concat(t._body)):o.blobConstructor?new n.Blob(t._body.map((function(t){return c(t)})),{type:(s["content-type"]||{}).value||""}):e.concat(t._body).toString());var u=[];if(Object.keys(s).forEach((function(t){var e=s[t].name,r=s[t].value;Array.isArray(r)?r.forEach((function(t){u.push([e,t])})):u.push([e,r])})),"fetch"===t._mode){var l=null;if(o.abortController){var h=new AbortController;l=h.signal,t._fetchAbortController=h,"requestTimeout"in r&&0!==r.requestTimeout&&(t._fetchTimer=n.setTimeout((function(){t.emit("requestTimeout"),t._fetchAbortController&&t._fetchAbortController.abort()}),r.requestTimeout))}n.fetch(t._opts.url,{method:t._opts.method,headers:u,body:a||void 0,mode:"cors",credentials:r.withCredentials?"include":"same-origin",signal:l}).then((function(e){t._fetchResponse=e,t._connect()}),(function(e){n.clearTimeout(t._fetchTimer),t._destroyed||t.emit("error",e)}))}else{var d=t._xhr=new n.XMLHttpRequest;try{d.open(t._opts.method,t._opts.url,!0)}catch(e){return void i.nextTick((function(){t.emit("error",e)}))}"responseType"in d&&(d.responseType=t._mode.split(":")[0]),"withCredentials"in d&&(d.withCredentials=!!r.withCredentials),"text"===t._mode&&"overrideMimeType"in d&&d.overrideMimeType("text/plain; charset=x-user-defined"),"requestTimeout"in r&&(d.timeout=r.requestTimeout,d.ontimeout=function(){t.emit("requestTimeout")}),u.forEach((function(t){d.setRequestHeader(t[0],t[1])})),t._response=null,d.onreadystatechange=function(){switch(d.readyState){case f.LOADING:case f.DONE:t._onXHRProgress()}},"moz-chunked-arraybuffer"===t._mode&&(d.onprogress=function(){t._onXHRProgress()}),d.onerror=function(){t._destroyed||t.emit("error",new Error("XHR error"))};try{d.send(a)}catch(e){return void i.nextTick((function(){t.emit("error",e)}))}}}},h.prototype._onXHRProgress=function(){(function(t){try{var e=t.status;return null!==e&&0!==e}catch(t){return!1}})(this._xhr)&&!this._destroyed&&(this._response||this._connect(),this._response._onXHRProgress())},h.prototype._connect=function(){var t=this;t._destroyed||(t._response=new l(t._xhr,t._fetchResponse,t._mode,t._fetchTimer),t._response.on("error",(function(e){t.emit("error",e)})),t.emit("response",t._response))},h.prototype._write=function(t,e,r){this._body.push(t),r()},h.prototype.abort=h.prototype.destroy=function(){this._destroyed=!0,n.clearTimeout(this._fetchTimer),this._response&&(this._response._destroyed=!0),this._xhr?this._xhr.abort():this._fetchAbortController&&this._fetchAbortController.abort()},h.prototype.end=function(t,e,r){"function"==typeof t&&(r=t,t=void 0),u.Writable.prototype.end.call(this,t,e,r)},h.prototype.flushHeaders=function(){},h.prototype.setTimeout=function(){},h.prototype.setNoDelay=function(){},h.prototype.setSocketKeepAlive=function(){};var d=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","via"]}).call(this,r(9).Buffer,r(3),r(7))},function(t,e,r){var n=r(9).Buffer;t.exports=function(t){if(t instanceof Uint8Array){if(0===t.byteOffset&&t.byteLength===t.buffer.byteLength)return t.buffer;if("function"==typeof t.buffer.slice)return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}if(n.isBuffer(t)){for(var e=new Uint8Array(t.length),r=t.length,i=0;i<r;i++)e[i]=t[i];return e.buffer}throw new Error("Argument must be a Buffer")}},function(t,e){t.exports=function(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var i in n)r.call(n,i)&&(t[i]=n[i])}return t};var r=Object.prototype.hasOwnProperty},function(t,e){t.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I\'m a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},function(t,e,r){(function(t,n){var i;/*! https://mths.be/punycode v1.4.1 by @mathias */!function(o){e&&e.nodeType,t&&t.nodeType;var s="object"==typeof n&&n;s.global!==s&&s.window!==s&&s.self;var a,u=2147483647,c=/^xn--/,l=/[^\\x20-\\x7E]/,f=/[\\x2E\\u3002\\uFF0E\\uFF61]/g,h={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},d=Math.floor,p=String.fromCharCode;function y(t){throw new RangeError(h[t])}function g(t,e){for(var r=t.length,n=[];r--;)n[r]=e(t[r]);return n}function m(t,e){var r=t.split("@"),n="";return r.length>1&&(n=r[0]+"@",t=r[1]),n+g((t=t.replace(f,".")).split("."),e).join(".")}function b(t){for(var e,r,n=[],i=0,o=t.length;i<o;)(e=t.charCodeAt(i++))>=55296&&e<=56319&&i<o?56320==(64512&(r=t.charCodeAt(i++)))?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),i--):n.push(e);return n}function v(t){return g(t,(function(t){var e="";return t>65535&&(e+=p((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=p(t)})).join("")}function w(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function x(t,e,r){var n=0;for(t=r?d(t/700):t>>1,t+=d(t/e);t>455;n+=36)t=d(t/35);return d(n+36*t/(t+38))}function _(t){var e,r,n,i,o,s,a,c,l,f,h,p=[],g=t.length,m=0,b=128,w=72;for((r=t.lastIndexOf("-"))<0&&(r=0),n=0;n<r;++n)t.charCodeAt(n)>=128&&y("not-basic"),p.push(t.charCodeAt(n));for(i=r>0?r+1:0;i<g;){for(o=m,s=1,a=36;i>=g&&y("invalid-input"),((c=(h=t.charCodeAt(i++))-48<10?h-22:h-65<26?h-65:h-97<26?h-97:36)>=36||c>d((u-m)/s))&&y("overflow"),m+=c*s,!(c<(l=a<=w?1:a>=w+26?26:a-w));a+=36)s>d(u/(f=36-l))&&y("overflow"),s*=f;w=x(m-o,e=p.length+1,0==o),d(m/e)>u-b&&y("overflow"),b+=d(m/e),m%=e,p.splice(m++,0,b)}return v(p)}function S(t){var e,r,n,i,o,s,a,c,l,f,h,g,m,v,_,S=[];for(g=(t=b(t)).length,e=128,r=0,o=72,s=0;s<g;++s)(h=t[s])<128&&S.push(p(h));for(n=i=S.length,i&&S.push("-");n<g;){for(a=u,s=0;s<g;++s)(h=t[s])>=e&&h<a&&(a=h);for(a-e>d((u-r)/(m=n+1))&&y("overflow"),r+=(a-e)*m,e=a,s=0;s<g;++s)if((h=t[s])<e&&++r>u&&y("overflow"),h==e){for(c=r,l=36;!(c<(f=l<=o?1:l>=o+26?26:l-o));l+=36)_=c-f,v=36-f,S.push(p(w(f+_%v,0))),c=d(_/v);S.push(p(w(c,0))),o=x(r,m,n==i),r=0,++n}++r,++e}return S.join("")}a={version:"1.4.1",ucs2:{decode:b,encode:v},decode:_,encode:S,toASCII:function(t){return m(t,(function(t){return l.test(t)?"xn--"+S(t):t}))},toUnicode:function(t){return m(t,(function(t){return c.test(t)?_(t.slice(4).toLowerCase()):t}))}},void 0===(i=function(){return a}.call(e,r,e,t))||(t.exports=i)}()}).call(this,r(136)(t),r(3))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,r){"use strict";var n=r(138),i=r(149),o=r(46);t.exports={formats:o,parse:i,stringify:n}},function(t,e,r){"use strict";var n=r(139),i=r(71),o=r(46),s=Object.prototype.hasOwnProperty,a={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},u=Array.isArray,c=Array.prototype.push,l=function(t,e){c.apply(t,u(e)?e:[e])},f=Date.prototype.toISOString,h=o.default,d={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,format:h,formatter:o.formatters[h],indices:!1,serializeDate:function(t){return f.call(t)},skipNulls:!1,strictNullHandling:!1},p={},y=function t(e,r,o,s,a,c,f,h,y,g,m,b,v,w,x,_){for(var S,A=e,E=_,k=0,T=!1;void 0!==(E=E.get(p))&&!T;){var C=E.get(e);if(k+=1,void 0!==C){if(C===k)throw new RangeError("Cyclic object value");T=!0}void 0===E.get(p)&&(k=0)}if("function"==typeof h?A=h(r,A):A instanceof Date?A=m(A):"comma"===o&&u(A)&&(A=i.maybeMap(A,(function(t){return t instanceof Date?m(t):t}))),null===A){if(a)return f&&!w?f(r,d.encoder,x,"key",b):r;A=""}if("string"==typeof(S=A)||"number"==typeof S||"boolean"==typeof S||"symbol"==typeof S||"bigint"==typeof S||i.isBuffer(A))return f?[v(w?r:f(r,d.encoder,x,"key",b))+"="+v(f(A,d.encoder,x,"value",b))]:[v(r)+"="+v(String(A))];var O,I=[];if(void 0===A)return I;if("comma"===o&&u(A))w&&f&&(A=i.maybeMap(A,f)),O=[{value:A.length>0?A.join(",")||null:void 0}];else if(u(h))O=h;else{var P=Object.keys(A);O=y?P.sort(y):P}for(var R=s&&u(A)&&1===A.length?r+"[]":r,j=0;j<O.length;++j){var M=O[j],L="object"==typeof M&&void 0!==M.value?M.value:A[M];if(!c||null!==L){var F=u(A)?"function"==typeof o?o(R,M):R:R+(g?"."+M:"["+M+"]");_.set(e,k);var N=n();N.set(p,_),l(I,t(L,F,o,s,a,c,"comma"===o&&w&&u(A)?null:f,h,y,g,m,b,v,w,x,N))}}return I};t.exports=function(t,e){var r,i=t,c=function(t){if(!t)return d;if(null!==t.encoder&&void 0!==t.encoder&&"function"!=typeof t.encoder)throw new TypeError("Encoder has to be a function.");var e=t.charset||d.charset;if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o.default;if(void 0!==t.format){if(!s.call(o.formatters,t.format))throw new TypeError("Unknown format option provided.");r=t.format}var n=o.formatters[r],i=d.filter;return("function"==typeof t.filter||u(t.filter))&&(i=t.filter),{addQueryPrefix:"boolean"==typeof t.addQueryPrefix?t.addQueryPrefix:d.addQueryPrefix,allowDots:void 0===t.allowDots?d.allowDots:!!t.allowDots,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:d.charsetSentinel,delimiter:void 0===t.delimiter?d.delimiter:t.delimiter,encode:"boolean"==typeof t.encode?t.encode:d.encode,encoder:"function"==typeof t.encoder?t.encoder:d.encoder,encodeValuesOnly:"boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:d.encodeValuesOnly,filter:i,format:r,formatter:n,serializeDate:"function"==typeof t.serializeDate?t.serializeDate:d.serializeDate,skipNulls:"boolean"==typeof t.skipNulls?t.skipNulls:d.skipNulls,sort:"function"==typeof t.sort?t.sort:null,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:d.strictNullHandling}}(e);"function"==typeof c.filter?i=(0,c.filter)("",i):u(c.filter)&&(r=c.filter);var f,h=[];if("object"!=typeof i||null===i)return"";f=e&&e.arrayFormat in a?e.arrayFormat:e&&"indices"in e?e.indices?"indices":"repeat":"indices";var p=a[f];if(e&&"commaRoundTrip"in e&&"boolean"!=typeof e.commaRoundTrip)throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var g="comma"===p&&e&&e.commaRoundTrip;r||(r=Object.keys(i)),c.sort&&r.sort(c.sort);for(var m=n(),b=0;b<r.length;++b){var v=r[b];c.skipNulls&&null===i[v]||l(h,y(i[v],v,p,g,c.strictNullHandling,c.skipNulls,c.encode?c.encoder:null,c.filter,c.sort,c.allowDots,c.serializeDate,c.format,c.formatter,c.encodeValuesOnly,c.charset,m))}var w=h.join(c.delimiter),x=!0===c.addQueryPrefix?"?":"";return c.charsetSentinel&&("iso-8859-1"===c.charset?x+="utf8=%26%2310003%3B&":x+="utf8=%E2%9C%93&"),w.length>0?x+w:""}},function(t,e,r){"use strict";var n=r(44),i=r(145),o=r(147),s=n("%TypeError%"),a=n("%WeakMap%",!0),u=n("%Map%",!0),c=i("WeakMap.prototype.get",!0),l=i("WeakMap.prototype.set",!0),f=i("WeakMap.prototype.has",!0),h=i("Map.prototype.get",!0),d=i("Map.prototype.set",!0),p=i("Map.prototype.has",!0),y=function(t,e){for(var r,n=t;null!==(r=n.next);n=r)if(r.key===e)return n.next=r.next,r.next=t.next,t.next=r,r};t.exports=function(){var t,e,r,n={assert:function(t){if(!n.has(t))throw new s("Side channel does not contain "+o(t))},get:function(n){if(a&&n&&("object"==typeof n||"function"==typeof n)){if(t)return c(t,n)}else if(u){if(e)return h(e,n)}else if(r)return function(t,e){var r=y(t,e);return r&&r.value}(r,n)},has:function(n){if(a&&n&&("object"==typeof n||"function"==typeof n)){if(t)return f(t,n)}else if(u){if(e)return p(e,n)}else if(r)return function(t,e){return!!y(t,e)}(r,n);return!1},set:function(n,i){a&&n&&("object"==typeof n||"function"==typeof n)?(t||(t=new a),l(t,n,i)):u?(e||(e=new u),d(e,n,i)):(r||(r={key:{},next:null}),function(t,e,r){var n=y(t,e);n?n.value=r:t.next={key:e,next:t.next,value:r}}(r,n,i))}};return n}},function(t,e,r){"use strict";var n="undefined"!=typeof Symbol&&Symbol,i=r(141);t.exports=function(){return"function"==typeof n&&("function"==typeof Symbol&&("symbol"==typeof n("foo")&&("symbol"==typeof Symbol("bar")&&i())))}},function(t,e,r){"use strict";t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test"),r=Object(e);if("string"==typeof e)return!1;if("[object Symbol]"!==Object.prototype.toString.call(e))return!1;if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(e in t[e]=42,t)return!1;if("function"==typeof Object.keys&&0!==Object.keys(t).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var n=Object.getOwnPropertySymbols(t);if(1!==n.length||n[0]!==e)return!1;if(!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var i=Object.getOwnPropertyDescriptor(t,e);if(42!==i.value||!0!==i.enumerable)return!1}return!0}},function(t,e,r){"use strict";var n={foo:{}},i=Object;t.exports=function(){return{__proto__:n}.foo===n.foo&&!({__proto__:null}instanceof i)}},function(t,e,r){"use strict";var n="Function.prototype.bind called on incompatible ",i=Array.prototype.slice,o=Object.prototype.toString;t.exports=function(t){var e=this;if("function"!=typeof e||"[object Function]"!==o.call(e))throw new TypeError(n+e);for(var r,s=i.call(arguments,1),a=function(){if(this instanceof r){var n=e.apply(this,s.concat(i.call(arguments)));return Object(n)===n?n:this}return e.apply(t,s.concat(i.call(arguments)))},u=Math.max(0,e.length-s.length),c=[],l=0;l<u;l++)c.push("$"+l);if(r=Function("binder","return function ("+c.join(",")+"){ return binder.apply(this,arguments); }")(a),e.prototype){var f=function(){};f.prototype=e.prototype,r.prototype=new f,f.prototype=null}return r}},function(t,e,r){"use strict";var n=r(45);t.exports=n.call(Function.call,Object.prototype.hasOwnProperty)},function(t,e,r){"use strict";var n=r(44),i=r(146),o=i(n("String.prototype.indexOf"));t.exports=function(t,e){var r=n(t,!!e);return"function"==typeof r&&o(t,".prototype.")>-1?i(r):r}},function(t,e,r){"use strict";var n=r(45),i=r(44),o=i("%Function.prototype.apply%"),s=i("%Function.prototype.call%"),a=i("%Reflect.apply%",!0)||n.call(s,o),u=i("%Object.getOwnPropertyDescriptor%",!0),c=i("%Object.defineProperty%",!0),l=i("%Math.max%");if(c)try{c({},"a",{value:1})}catch(t){c=null}t.exports=function(t){var e=a(n,s,arguments);if(u&&c){var r=u(e,"length");r.configurable&&c(e,"length",{value:1+l(0,t.length-(arguments.length-1))})}return e};var f=function(){return a(n,o,arguments)};c?c(t.exports,"apply",{value:f}):t.exports.apply=f},function(t,e,r){var n="function"==typeof Map&&Map.prototype,i=Object.getOwnPropertyDescriptor&&n?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,o=n&&i&&"function"==typeof i.get?i.get:null,s=n&&Map.prototype.forEach,a="function"==typeof Set&&Set.prototype,u=Object.getOwnPropertyDescriptor&&a?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,c=a&&u&&"function"==typeof u.get?u.get:null,l=a&&Set.prototype.forEach,f="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,h="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,d="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,p=Boolean.prototype.valueOf,y=Object.prototype.toString,g=Function.prototype.toString,m=String.prototype.match,b=String.prototype.slice,v=String.prototype.replace,w=String.prototype.toUpperCase,x=String.prototype.toLowerCase,_=RegExp.prototype.test,S=Array.prototype.concat,A=Array.prototype.join,E=Array.prototype.slice,k=Math.floor,T="function"==typeof BigInt?BigInt.prototype.valueOf:null,C=Object.getOwnPropertySymbols,O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,I="function"==typeof Symbol&&"object"==typeof Symbol.iterator,P="function"==typeof Symbol&&Symbol.toStringTag&&(typeof Symbol.toStringTag===I||"symbol")?Symbol.toStringTag:null,R=Object.prototype.propertyIsEnumerable,j=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(t){return t.__proto__}:null);function M(t,e){if(t===1/0||t===-1/0||t!=t||t&&t>-1e3&&t<1e3||_.call(/e/,e))return e;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"==typeof t){var n=t<0?-k(-t):k(t);if(n!==t){var i=String(n),o=b.call(e,i.length+1);return v.call(i,r,"$&_")+"."+v.call(v.call(o,/([0-9]{3})/g,"$&_"),/_$/,"")}}return v.call(e,r,"$&_")}var L=r(148),F=L.custom,N=q(F)?F:null;function D(t,e,r){var n="double"===(r.quoteStyle||e)?\'"\':"\'";return n+t+n}function U(t){return v.call(String(t),/"/g,"&quot;")}function B(t){return!("[object Array]"!==W(t)||P&&"object"==typeof t&&P in t)}function G(t){return!("[object RegExp]"!==W(t)||P&&"object"==typeof t&&P in t)}function q(t){if(I)return t&&"object"==typeof t&&t instanceof Symbol;if("symbol"==typeof t)return!0;if(!t||"object"!=typeof t||!O)return!1;try{return O.call(t),!0}catch(t){}return!1}t.exports=function t(e,r,n,i){var a=r||{};if(H(a,"quoteStyle")&&"single"!==a.quoteStyle&&"double"!==a.quoteStyle)throw new TypeError(\'option "quoteStyle" must be "single" or "double"\');if(H(a,"maxStringLength")&&("number"==typeof a.maxStringLength?a.maxStringLength<0&&a.maxStringLength!==1/0:null!==a.maxStringLength))throw new TypeError(\'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`\');var u=!H(a,"customInspect")||a.customInspect;if("boolean"!=typeof u&&"symbol"!==u)throw new TypeError("option \\"customInspect\\", if provided, must be `true`, `false`, or `\'symbol\'`");if(H(a,"indent")&&null!==a.indent&&"\\t"!==a.indent&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError(\'option "indent" must be "\\\\t", an integer > 0, or `null`\');if(H(a,"numericSeparator")&&"boolean"!=typeof a.numericSeparator)throw new TypeError(\'option "numericSeparator", if provided, must be `true` or `false`\');var y=a.numericSeparator;if(void 0===e)return"undefined";if(null===e)return"null";if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e)return function t(e,r){if(e.length>r.maxStringLength){var n=e.length-r.maxStringLength,i="... "+n+" more character"+(n>1?"s":"");return t(b.call(e,0,r.maxStringLength),r)+i}return D(v.call(v.call(e,/([\'\\\\])/g,"\\\\$1"),/[\\x00-\\x1f]/g,K),"single",r)}(e,a);if("number"==typeof e){if(0===e)return 1/0/e>0?"0":"-0";var w=String(e);return y?M(e,w):w}if("bigint"==typeof e){var _=String(e)+"n";return y?M(e,_):_}var k=void 0===a.depth?5:a.depth;if(void 0===n&&(n=0),n>=k&&k>0&&"object"==typeof e)return B(e)?"[Array]":"[Object]";var C=function(t,e){var r;if("\\t"===t.indent)r="\\t";else{if(!("number"==typeof t.indent&&t.indent>0))return null;r=A.call(Array(t.indent+1)," ")}return{base:r,prev:A.call(Array(e+1),r)}}(a,n);if(void 0===i)i=[];else if(V(i,e)>=0)return"[Circular]";function F(e,r,o){if(r&&(i=E.call(i)).push(r),o){var s={depth:a.depth};return H(a,"quoteStyle")&&(s.quoteStyle=a.quoteStyle),t(e,s,n+1,i)}return t(e,a,n+1,i)}if("function"==typeof e&&!G(e)){var z=function(t){if(t.name)return t.name;var e=m.call(g.call(t),/^function\\s*([\\w$]+)/);if(e)return e[1];return null}(e),J=Q(e,F);return"[Function"+(z?": "+z:" (anonymous)")+"]"+(J.length>0?" { "+A.call(J,", ")+" }":"")}if(q(e)){var tt=I?v.call(String(e),/^(Symbol\\(.*\\))_[^)]*$/,"$1"):O.call(e);return"object"!=typeof e||I?tt:$(tt)}if(function(t){if(!t||"object"!=typeof t)return!1;if("undefined"!=typeof HTMLElement&&t instanceof HTMLElement)return!0;return"string"==typeof t.nodeName&&"function"==typeof t.getAttribute}(e)){for(var et="<"+x.call(String(e.nodeName)),rt=e.attributes||[],nt=0;nt<rt.length;nt++)et+=" "+rt[nt].name+"="+D(U(rt[nt].value),"double",a);return et+=">",e.childNodes&&e.childNodes.length&&(et+="..."),et+="</"+x.call(String(e.nodeName))+">"}if(B(e)){if(0===e.length)return"[]";var it=Q(e,F);return C&&!function(t){for(var e=0;e<t.length;e++)if(V(t[e],"\\n")>=0)return!1;return!0}(it)?"["+X(it,C)+"]":"[ "+A.call(it,", ")+" ]"}if(function(t){return!("[object Error]"!==W(t)||P&&"object"==typeof t&&P in t)}(e)){var ot=Q(e,F);return"cause"in Error.prototype||!("cause"in e)||R.call(e,"cause")?0===ot.length?"["+String(e)+"]":"{ ["+String(e)+"] "+A.call(ot,", ")+" }":"{ ["+String(e)+"] "+A.call(S.call("[cause]: "+F(e.cause),ot),", ")+" }"}if("object"==typeof e&&u){if(N&&"function"==typeof e[N]&&L)return L(e,{depth:k-n});if("symbol"!==u&&"function"==typeof e.inspect)return e.inspect()}if(function(t){if(!o||!t||"object"!=typeof t)return!1;try{o.call(t);try{c.call(t)}catch(t){return!0}return t instanceof Map}catch(t){}return!1}(e)){var st=[];return s&&s.call(e,(function(t,r){st.push(F(r,e,!0)+" => "+F(t,e))})),Z("Map",o.call(e),st,C)}if(function(t){if(!c||!t||"object"!=typeof t)return!1;try{c.call(t);try{o.call(t)}catch(t){return!0}return t instanceof Set}catch(t){}return!1}(e)){var at=[];return l&&l.call(e,(function(t){at.push(F(t,e))})),Z("Set",c.call(e),at,C)}if(function(t){if(!f||!t||"object"!=typeof t)return!1;try{f.call(t,f);try{h.call(t,h)}catch(t){return!0}return t instanceof WeakMap}catch(t){}return!1}(e))return Y("WeakMap");if(function(t){if(!h||!t||"object"!=typeof t)return!1;try{h.call(t,h);try{f.call(t,f)}catch(t){return!0}return t instanceof WeakSet}catch(t){}return!1}(e))return Y("WeakSet");if(function(t){if(!d||!t||"object"!=typeof t)return!1;try{return d.call(t),!0}catch(t){}return!1}(e))return Y("WeakRef");if(function(t){return!("[object Number]"!==W(t)||P&&"object"==typeof t&&P in t)}(e))return $(F(Number(e)));if(function(t){if(!t||"object"!=typeof t||!T)return!1;try{return T.call(t),!0}catch(t){}return!1}(e))return $(F(T.call(e)));if(function(t){return!("[object Boolean]"!==W(t)||P&&"object"==typeof t&&P in t)}(e))return $(p.call(e));if(function(t){return!("[object String]"!==W(t)||P&&"object"==typeof t&&P in t)}(e))return $(F(String(e)));if(!function(t){return!("[object Date]"!==W(t)||P&&"object"==typeof t&&P in t)}(e)&&!G(e)){var ut=Q(e,F),ct=j?j(e)===Object.prototype:e instanceof Object||e.constructor===Object,lt=e instanceof Object?"":"null prototype",ft=!ct&&P&&Object(e)===e&&P in e?b.call(W(e),8,-1):lt?"Object":"",ht=(ct||"function"!=typeof e.constructor?"":e.constructor.name?e.constructor.name+" ":"")+(ft||lt?"["+A.call(S.call([],ft||[],lt||[]),": ")+"] ":"");return 0===ut.length?ht+"{}":C?ht+"{"+X(ut,C)+"}":ht+"{ "+A.call(ut,", ")+" }"}return String(e)};var z=Object.prototype.hasOwnProperty||function(t){return t in this};function H(t,e){return z.call(t,e)}function W(t){return y.call(t)}function V(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,n=t.length;r<n;r++)if(t[r]===e)return r;return-1}function K(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\\\"+r:"\\\\x"+(e<16?"0":"")+w.call(e.toString(16))}function $(t){return"Object("+t+")"}function Y(t){return t+" { ? }"}function Z(t,e,r,n){return t+" ("+e+") {"+(n?X(r,n):A.call(r,", "))+"}"}function X(t,e){if(0===t.length)return"";var r="\\n"+e.prev+e.base;return r+A.call(t,","+r)+"\\n"+e.prev}function Q(t,e){var r=B(t),n=[];if(r){n.length=t.length;for(var i=0;i<t.length;i++)n[i]=H(t,i)?e(t[i],t):""}var o,s="function"==typeof C?C(t):[];if(I){o={};for(var a=0;a<s.length;a++)o["$"+s[a]]=s[a]}for(var u in t)H(t,u)&&(r&&String(Number(u))===u&&u<t.length||I&&o["$"+u]instanceof Symbol||(_.call(/[^\\w$]/,u)?n.push(e(u,t)+": "+e(t[u],t)):n.push(u+": "+e(t[u],t))));if("function"==typeof C)for(var c=0;c<s.length;c++)R.call(t,s[c])&&n.push("["+e(s[c])+"]: "+e(t[s[c]],t));return n}},function(t,e){},function(t,e,r){"use strict";var n=r(71),i=Object.prototype.hasOwnProperty,o=Array.isArray,s={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(t){return t.replace(/&#(\\d+);/g,(function(t,e){return String.fromCharCode(parseInt(e,10))}))},u=function(t,e){return t&&"string"==typeof t&&e.comma&&t.indexOf(",")>-1?t.split(","):t},c=function(t,e,r,n){if(t){var o=r.allowDots?t.replace(/\\.([^.[]+)/g,"[$1]"):t,s=/(\\[[^[\\]]*])/g,a=r.depth>0&&/(\\[[^[\\]]*])/.exec(o),c=a?o.slice(0,a.index):o,l=[];if(c){if(!r.plainObjects&&i.call(Object.prototype,c)&&!r.allowPrototypes)return;l.push(c)}for(var f=0;r.depth>0&&null!==(a=s.exec(o))&&f<r.depth;){if(f+=1,!r.plainObjects&&i.call(Object.prototype,a[1].slice(1,-1))&&!r.allowPrototypes)return;l.push(a[1])}return a&&l.push("["+o.slice(a.index)+"]"),function(t,e,r,n){for(var i=n?e:u(e,r),o=t.length-1;o>=0;--o){var s,a=t[o];if("[]"===a&&r.parseArrays)s=[].concat(i);else{s=r.plainObjects?Object.create(null):{};var c="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,l=parseInt(c,10);r.parseArrays||""!==c?!isNaN(l)&&a!==c&&String(l)===c&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(s=[])[l]=i:"__proto__"!==c&&(s[c]=i):s={0:i}}i=s}return i}(l,e,r,n)}};t.exports=function(t,e){var r=function(t){if(!t)return s;if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var e=void 0===t.charset?s.charset:t.charset;return{allowDots:void 0===t.allowDots?s.allowDots:!!t.allowDots,allowPrototypes:"boolean"==typeof t.allowPrototypes?t.allowPrototypes:s.allowPrototypes,allowSparse:"boolean"==typeof t.allowSparse?t.allowSparse:s.allowSparse,arrayLimit:"number"==typeof t.arrayLimit?t.arrayLimit:s.arrayLimit,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:s.charsetSentinel,comma:"boolean"==typeof t.comma?t.comma:s.comma,decoder:"function"==typeof t.decoder?t.decoder:s.decoder,delimiter:"string"==typeof t.delimiter||n.isRegExp(t.delimiter)?t.delimiter:s.delimiter,depth:"number"==typeof t.depth||!1===t.depth?+t.depth:s.depth,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof t.interpretNumericEntities?t.interpretNumericEntities:s.interpretNumericEntities,parameterLimit:"number"==typeof t.parameterLimit?t.parameterLimit:s.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:"boolean"==typeof t.plainObjects?t.plainObjects:s.plainObjects,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:s.strictNullHandling}}(e);if(""===t||null==t)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof t?function(t,e){var r,c={__proto__:null},l=e.ignoreQueryPrefix?t.replace(/^\\?/,""):t,f=e.parameterLimit===1/0?void 0:e.parameterLimit,h=l.split(e.delimiter,f),d=-1,p=e.charset;if(e.charsetSentinel)for(r=0;r<h.length;++r)0===h[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===h[r]?p="utf-8":"utf8=%26%2310003%3B"===h[r]&&(p="iso-8859-1"),d=r,r=h.length);for(r=0;r<h.length;++r)if(r!==d){var y,g,m=h[r],b=m.indexOf("]="),v=-1===b?m.indexOf("="):b+1;-1===v?(y=e.decoder(m,s.decoder,p,"key"),g=e.strictNullHandling?null:""):(y=e.decoder(m.slice(0,v),s.decoder,p,"key"),g=n.maybeMap(u(m.slice(v+1),e),(function(t){return e.decoder(t,s.decoder,p,"value")}))),g&&e.interpretNumericEntities&&"iso-8859-1"===p&&(g=a(g)),m.indexOf("[]=")>-1&&(g=o(g)?[g]:g),i.call(c,y)?c[y]=n.combine(c[y],g):c[y]=g}return c}(t,r):t,f=r.plainObjects?Object.create(null):{},h=Object.keys(l),d=0;d<h.length;++d){var p=h[d],y=c(p,l[p],r,"string"==typeof t);f=n.merge(f,y,r)}return!0===r.allowSparse?f:n.compact(f)}},function(t,e){t.exports={getPalette:(t,{debug:e=!1}={debug:!1})=>{e&&console.log("starting getPalette with image",t);const{fileDirectory:r}=t,{BitsPerSample:n,ColorMap:i,ImageLength:o,ImageWidth:s,PhotometricInterpretation:a,SampleFormat:u,SamplesPerPixel:c}=r;if(!i)throw new Error("[geotiff-palette]: the image does not contain a color map, so we can\'t make a palette.");const l=Math.pow(2,n);e&&console.log("[geotiff-palette]: count:",l);const f=i.length/3;if(e&&console.log("[geotiff-palette]: bandSize:",f),f!==l)throw new Error("[geotiff-palette]: can\'t handle situations where the color map has more or less values than the number of possible values in a raster");const h=f,d=h+f,p=[];for(let t=0;t<l;t++)p.push([Math.floor(i[t]/256),Math.floor(i[h+t]/256),Math.floor(i[d+t]/256),255]);return e&&console.log("[geotiff-palette]: result is ",p),p}}},function(t,e,r){var n,i=Object.defineProperty,o=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,u=(t,e,r)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,c=(t,e)=>i(t,"name",{value:e,configurable:!0});const l=r(152),f=r(187),h=r(189),d=c(t=>new Array(t).fill(0).map((t,e)=>e),"range");function p(t,e={}){var r=e,{bands:n,height:i,precise:c=!1,stats:p,width:y,layout:g}=r,m=((t,e)=>{var r={};for(var n in t)s.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&o)for(var n of o(t))e.indexOf(n)<0&&a.call(t,n)&&(r[n]=t[n]);return r})(r,["bands","height","precise","stats","width","layout"]);if("function"==typeof t.then)throw new Error("[calc-image-stats] you passed in a promise as the data values.  please resolve the promise first before calling calcImageStats");const b=f({bands:n,data:t,height:i,layout:g,width:y});null!=n||(n=b.bands),null!=i||(i=b.height),null!=g||(g=b.layout),null!=y||(y=b.width);const v=d(n).map(e=>{let r;const f=((t,e)=>{for(var r in e||(e={}))s.call(e,r)&&u(t,r,e[r]);if(o)for(var r of o(e))a.call(e,r)&&u(t,r,e[r]);return t})({precise:c,stats:p},m);if(["[band][row,column]","[band][column,row]"].includes(g))r=t[e];else if(["[band][row][column]","[band][column][row]"].includes(g))r=t[e],f.chunked=!0;else if(1===n&&["[band,row,column]","[row,column,band]","[column,band,row]","[column,row,band]"].includes(g))r=t;else{const o={band:[e,e]},s={band:n,column:y,row:i};r=h.iterClip({data:t,layout:g,rect:o,sizes:s})}return l(r,f)});return{depth:n,height:i,width:y,bands:v}}c(p,"calcImageStats"),void 0!==(n=function(){return p}.call(e,r,e,t))&&(t.exports=n),t.exports=p,t.exports.default=p,t.exports.calcImageStats=p,"object"==typeof self&&(self.calcImageStats=p),"object"==typeof window&&(self.calcImageStats=p)},function(t,e,r){var n;const{getOrCreateIterator:i}=r(72),{add:o,compare:s,divide:a,mean:u,multiply:c,pow:l,sort:f,subtract:h,sum:d}=r(153),p=r(176);function y(t,{async:e=!1,chunked:r=!1,noData:n,filter:d,calcCount:y=!0,calcHistogram:g=!0,calcInvalid:m=!0,calcMax:b=!0,calcMean:v=!0,calcMedian:w=!0,calcMin:x=!0,calcMode:_=!0,calcModes:S=!0,calcProduct:A=!0,calcRange:E=!0,calcStd:k=!0,calcSum:T=!0,calcValid:C=!0,calcVariance:O=!0,calcUniques:I=!0,precise:P=!1,precise_max_decimal_digits:R=100,stats:j}={debugLevel:0}){j&&(j.forEach(t=>{["count","histogram","invalid","max","mean","median","min","mode","modes","product","range","sum","std","valid","variance","uniques"].includes(t)||console.warn(`[calc-stats] skipping unknown stat "${t}"`)}),y=j.includes("count"),g=j.includes("histogram"),m=j.includes("invalid"),b=j.includes("max"),v=j.includes("mean"),w=j.includes("median"),x=j.includes("min"),_=j.includes("mode"),S=j.includes("modes"),A=j.includes("product"),E=j.includes("range"),k=j.includes("std"),T=j.includes("sum"),C=j.includes("valid"),O=j.includes("variance"),I=j.includes("uniques"));const M=i(t);let L,F,N,D=g||w||_||S||O||k||I,U=y||v||w||A||C||O||k||"function"==typeof d,B=y||m||"function"==typeof d,G=T||v||O||k,q=x||E,z=b||E,H=A,W=0,V=0,K=0,$=P?"0":0;const Y={};let Z,X;Z=P?t=>{t=t.toString(),U&&W++,!q||void 0!==L&&"<"!==s(t,L)||(L=t),!z||void 0!==F&&">"!==s(t,F)||(F=t),H&&(N=1===W?t:c(N,t)),G&&($=o($,t)),D&&(t in Y?Y[t].ct++:Y[t]={n:t.toString(),ct:1})}:t=>{U&&W++,q&&(void 0===L||t<L)&&(L=t),z&&(void 0===F||t>F)&&(F=t),H&&(N=1===W?t:N*t),G&&($+=t),D&&(t in Y?Y[t].ct++:Y[t]={n:t,ct:1})},X="number"==typeof n&&"function"==typeof d?t=>{K++,"number"!=typeof t||isNaN(t)||t===n||!0!==d({valid:W,index:K,value:t})?B&&V++:Z(t)}:"number"==typeof n?t=>{"number"!=typeof t||isNaN(t)||t===n?B&&V++:Z(t)}:"function"==typeof d?t=>{K++,"number"!=typeof t||isNaN(t)||!0!==d({valid:W,index:K,value:t})?B&&V++:Z(t)}:t=>{"number"!=typeof t||isNaN(t)?B&&V++:Z(t)};const Q=()=>{const t={};if(y&&(t.count=P?o(V.toString(),W.toString()):V+W),C&&(t.valid=P?W.toString():W),m&&(t.invalid=P?V.toString():V),w&&(t.median=p.calculate({counts:Y,precise:P,total:W})),x&&(t.min=L),b&&(t.max=F),A&&(t.product=N),T&&(t.sum=$),E&&(t.range=P?h(F.toString(),L.toString()):F-L),v||O||k){const e=P?a($,W.toString(),{max_decimal_digits:R}):$/W;if(v&&(t.mean=e),O||k){const r=(({count:t,histogram:e,mean_value:r,precise:n=!1})=>{if(n){r=r.toString();const n=Object.values(e).reduce((t,{n:e,ct:n})=>{const i=h(e.toString(),r);return o(t,c(n.toString(),l(i,"2")))},"0");return a(n,t.toString())}return Object.values(e).reduce((t,{n:e,ct:n})=>t+n*Math.pow(e-r,2),0)/t})({count:W,histogram:Y,mean_value:e,precise:P});O&&(t.variance=r),k&&(t.std=P?Math.sqrt(Number(r)).toString():Math.sqrt(r))}}if(g&&(P&&Object.values(Y).forEach(t=>{t.ct=t.ct.toString()}),t.histogram=Y),_||S){let e=0,r=[];for(let t in Y){const{n:n,ct:i}=Y[t];i===e?r.push(P?n.toString():n):i>e&&(e=i,r=[P?n.toString():n])}S&&(t.modes=r),_&&(t.mode=P?u(r):r.reduce((t,e)=>t+e,0)/r.length)}return I&&(t.uniques=P?f(Object.keys(Y)):Object.values(Y).map(({n:t})=>t).sort((t,e)=>t-e)),t};if(r){if(e)return(async()=>{for await(let t of M)for(let e of t)X(e);return Q()})();for(let t of M)for(let e of t)X(e);return Q()}if(e)return(async()=>{for await(let t of M)X(t);return Q()})();for(let t of M)X(t);return Q()}void 0===(n=function(){return y}.call(e,r,e,t))||(t.exports=n),t.exports=y,t.exports.default=y,t.exports.calcStats=y,"object"==typeof self&&(self.calcStats=y),"object"==typeof window&&(window.calcStats=y)},function(t,e,r){"use strict";var n;const i=r(4),o=r(6),s=r(154),a=r(76),u=r(0),c=r(34),l=r(5),f=r(156),h=r(158),d=r(51),p=r(84),y=r(162),g=r(163),m=r(1),b=r(88),v=r(89),w=r(73),x=r(75),_=r(164),S=r(165),A=r(77),E=r(166),k=r(167),T=r(15),C=r(16),O=r(90),I=r(91),P=r(11),R=r(8),j=r(32),M=r(48),L=r(31),F=r(168),N={absolute:i,add:o,binomial_coefficient:s,ceil:a,clean:u,compare:c,compare_positive:l,constants:f,cosine_radians:h,count_decimal_digits:d,count_integer_digits:p,cube:y,cube_root:g,divide:m,eulers_number:b,exp:v,expand:w,factorial:x,flip_sign:_,floor:S,fraction:A,hypotenuse:E,is_infinity:T,is_integer:C,is_factorial:k,is_negative_infinity:O,is_positive_infinity:I,is_zero:P,long_addition:R,long_division:j,long_multiplication:M,long_subtraction:L,mean:r(169),max:F,min:r(86),multiply:r(53),multiply_array:r(79),multiply_range:r(47),nilakantha:r(170),ols:r(171),pow:r(35),pow_positive:r(54),primes:r(87),reciprocal:r(81),remainder:r(172),root:r(37),root_integer_digits:r(83),round:r(36),round_last_decimal:r(49),sign:r(22),sign_nonzero:r(50),simplify_fraction:r(85),sine_radians:r(173),softmax:r(174),sort:r(175),square:r(23),square_root:r(92),subtract:r(33),sum:r(55),truncate:r(93)};void 0===(n=function(){return N}.call(e,r,e,t))||(t.exports=n),t.exports=N,t.exports.default=N,"object"==typeof window&&(window.preciso=N),"object"==typeof self&&(self.preciso=N)},function(t,e,r){"use strict";const n=r(0),i=r(5),o=r(75),s=r(8),a=r(31),u=r(32),c=r(47);function l(t,e){switch(t=n(t),e=n(e),i(t,e)){case"=":return"1";case">":{const r=a(t,e),n=c(s(e,"1"),t),i=o(r);return u(n,i)}case"<":throw new Error("[binominal_coefficient] unsupported")}}t.exports=l,t.exports.default=l},function(t,e,r){"use strict";function n(t){return t.substring(0,t.indexOf("."))}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const{MAX_SAFE_INTEGER:n}=r(74),{MAX_SAFE_INTEGER_LENGTH:i}=r(30),{PI:o}=r(157);t.exports={MAX_SAFE_INTEGER:n,MAX_SAFE_INTEGER_LENGTH:i,PI:o}},function(t,e){t.exports={PI_100:"3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"}},function(t,e,r){"use strict";const n=r(6),i=r(11),o=r(23),s=r(17),a=r(1);function u(t,{steps:e=100,max_decimal_digits:r=100}={}){if(i(t))return"0";let u,c="-",l="1",f=e,h=o(t),d="1",p="1",y="0";for(let t=0;t<f;t++){u=n(y,"1"),y=n(u,"1"),d=s([d,h],{max_decimal_digits:r}),p=s([p,u,y],{max_decimal_digits:r});const t=a(d,p,{max_decimal_digits:r});l=n(l,c+t),c="-"===c?"+":"-"}return l}t.exports=u,t.exports.default=u},function(t,e,r){"use strict";const n=r(0),i=r(51),o=r(4),s=r(80),a=r(49),u=["5","6","7","8","9"];function c(t,{digits:e=0}={digits:0}){const r=t=n(t),c=s(t)?"-":"",l=(t=o(t)).indexOf(".");if(-1===l)return r;if(i(t)<=e)return r;const f=t[l+e+1];if(u.includes(f)){const r=t.substring(0,l+e+2);return c+a(r)}if(0===e)return c+t.substring(0,l);return c+t.substring(0,l+e+1)}t.exports=c,t.exports.default=c},function(t,e,r){"use strict";function n(t){return t.includes("/")}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";function n(t){return t.split("/")}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(35);function i(t,e){return n(t,"3",e)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(37);function i(t,e){return n(t,"3",e)}t.exports=i,t.exports.default=i},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(22);function s(t){t=i(t);const e=o(t);return""===e?t:"-"===e?n(t):"+"===e?"-"+t:sum}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(8),s=r(22);function a(t){if(-1===(t=i(t)).indexOf("."))return t;const e=s(t);return t=n(t).split(".")[0],"+"===e?t:"-"===e?"0"===t||""===t?"-1":"-"+o(t,"1"):void 0}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(23),i=r(92),o=r(55);function s(){const t=Array.from(arguments),e="object"==typeof t[t.length-1]?t[t.length-1]:void 0,r=Array.isArray(t[0])?t[0]:e?t.slice(0,t.length-1):t,s=r.map(t=>n(t));return i(o(s),e)}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";function n(t){return!!t.match(/^\\d+!$/i)}t.exports=n,t.exports.default=n},function(t,e,r){"use strict";const n=r(0),i=r(34);function o(t){"string"==typeof t&&(t=Array.prototype.slice.call(arguments));let e=n(t[0]);const r=t.length;for(let n=1;n<r;n++){const r=t[n];">"===i(r,e)&&(e=r)}return e}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(6),i=r(1);function o(t,e){let r=0,o="0";for(let e of t)r++,o=n(o,e);return i(o,r.toString(),e)}t.exports=o,t.exports.default=o},function(t,e,r){"use strict";const n=r(6),i=r(8),o=r(1),s=r(17);function a(t=100,{divide_options:e}={}){let r="+",a="3",u="2",c="3",l="4";for(let f=1;f<t;f++){const t=s([u,c,l]),f=r+o("4",t,e);a=n(a,f),r="-"===r?"+":"-",u=l,c=i(l,"1"),l=i(c,"1")}return a}t.exports=a,t.exports.default=a},function(t,e,r){"use strict";const n=r(6),i=r(1),o=r(17),s=r(36),a=r(33),u=r(23);function c(t,e){const r=t.length;let c="0",l="0",f="0",h="0";if(0===r)throw Error("[preciso] zero points passed to linear_regression");for(let e=0;e<r;e++){const[r,i]=t[e];c=n(c,r),l=n(l,u(r)),f=n(f,i),h=n(h,u(i))}const d=r.toString(),p=i(c,d),y=i(f,d);let g="0",m="0";for(let e=0;e<r;e++){const[r,i]=t[e],s=a(r,p),c=a(i,y),l=o([s,c]);g=n(g,l);const f=u(s);m=n(m,f)}let b=i(g,m),v=a(y,o(b,p));return e&&"number"==typeof e.max_decimal_digits&&(b=s(b,{digits:e.max_decimal_digits}),v=s(v,{digits:e.max_decimal_digits})),{m:b,b:v}}t.exports=c,t.exports.default=c},function(t,e,r){"use strict";const n=r(4),i=r(0),o=r(5),s=r(32),a=r(53),u=r(33),c=r(93);function l(t,e){t=i(t),e=i(e);const r="-"===t[0]?"-":"";t=n(t),e=n(e);const l=o(t,e);if("="===l)return"0";if("<"===l)return"."===t[0]&&(t="0"+t),r+t;const f=s(t,e,{max_decimal_places:0}),h=c(f),d=a(e,h);return r+u(t,d)}t.exports=l,t.exports.default=l},function(t,e,r){"use strict";const n=r(6),i=r(11),o=r(23),s=r(17),a=r(1);function u(t,{steps:e=100,max_decimal_digits:r=100}={}){if(i(t))return"0";let u,c="-",l=t,f=e,h=o(t),d=t,p="1",y="1";for(let t=0;t<f;t++){u=n(y,"1"),y=n(u,"1"),d=s([d,h],{max_decimal_digits:r}),p=s([p,u,y],{max_decimal_digits:r});const t=a(d,p,{max_decimal_digits:r});l=n(l,c+t),c="-"===c?"+":"-"}return l}t.exports=u,t.exports.default=u},function(t,e,r){"use strict";const n=r(1),i=r(89),o=r(55);function s(t,{max_decimal_digits:e}){t=t.map(t=>i(t,{max_decimal_digits:e}));const r=o(t);return t.map(t=>n(t,r,{max_decimal_digits:e,ellipsis:!1}))}t.exports=s,t.exports.default=s},function(t,e,r){"use strict";const n=r(34);function i(t,{direction:e="ascending"}={direction:"ascending"}){const r="desc"===e||"descending"===e?"<":">";return t.sort((t,e)=>n(t,e)===r?1:-1)}t.exports=i,t.exports.default=i},function(t,e,r){var n;const i=r(177),o=r(186);function s({counts:t,nums:e,no_data:r,precise:n,threshold:s=50,total:a}){return void 0!==t||void 0!==a||e.length>s?i({counts:t,no_data:r,nums:e,precise:n,total:a}):o({no_data:r,nums:e,precise:n})}const a={calculate:s};void 0===(n=function(){return a}.call(e,r,e,t))||(t.exports=n),t.exports=a,t.exports.default={calculate:s},"object"==typeof window&&(window.mediana=a),"object"==typeof self&&(self.mediana=a)},function(t,e,r){const n=r(178),i=r(94);function o({counts:t,nums:e,no_data:r,precise:o=!1,total:s}){void 0!==t&&void 0!==s||({counts:t,total:s}=n({nums:e,no_data:r}));const a=Object.values(t).sort((t,e)=>t.n-e.n),u=s/2,c=a.length;if(0!==c){if(1===c)return o?a[0].n.toString():a[0].n;{let t=0;if(s%2==0)for(let e=0;e<c;e++){const{n:r,ct:n}=a[e];if(t+=n,t>u)return t-n===u?i(a[e-1].n,r,{precise:o}):o?r.toString():r}else for(let e=0;e<c;e++){const{n:r,ct:n}=a[e];if(t+=n,t>u)return o?r.toString():r}}}}t.exports=o,t.exports.default=o},function(t,e){function r({nums:t,no_data:e}){let r=t.length;const n={};let i=0;if(void 0!==e)for(let o=0;o<r;o++){const r=t[o];r!==e&&(i++,r in n?n[r].ct++:n[r]={n:r,ct:1})}else for(let e=0;e<r;e++){const r=t[e];i++,r in n?n[r].ct++:n[r]={n:r,ct:1}}return{counts:n,total:i}}t.exports=r,t.exports.default=r},function(t,e){function r(t){"+"===t[0]&&(t=t.substring(1));const e="-"===t[0]?"-":"";"-"===e&&(t=t.substring(1));const r=t.indexOf("e");if(-1===r)return e+t;let n=t.indexOf(".");-1===n&&(n=r);const i=Number(t.substring(r+1)),o=t.substring(0,r).replace(".",""),s=n+i,a=o.length;if(s>=a){const t=s-a;let r=o;for(let e=0;e<t;e++)r+="0";return e+r}if(s<0){result="0.";for(let t=0;t>s;t--)result+="0";return result+=o,e+result}return e+o.substring(0,s)+"."+o.substring(s)}t.exports=r,t.exports.default=r},function(t,e,r){const n=r(98),i=r(18),o=r(181);function s(t,e,r){if(t=i(t),"0"===(e=i(e)))throw new Error("[preciso] division by zero");if(""===t||"0"===t)return"0";const s="-"!==t[0],a="-"!==e[0],u=s!==a?"-":"";return s||(t=n(t)),a||(e=n(e)),u+o(t,e,r)}t.exports=s,t.exports.default=s},function(t,e,r){const n=r(38),i=r(95),o=(r(182),r(184)),s=r(185);t.exports=function(t,e,{max_decimal_digits:r=100,ellipsis:a=!1}={}){"0"===t[0]&&(t=t.substring(1)),"0"===e[0]&&(e=e.substring(1));const u=t.indexOf("."),c=e.indexOf("."),l=-1===u?t.length:u,f=-1===c?0:e.length-1-c;let h=!1;t=t.replace(/\\./,""),e=e.replace(/\\./,"");const d=t.length;let p,y="",g="",m=-1*f,b=0;for(let r=0;r<d;r++){if(y+=t[r],p=n(y,e),">"===p){let t=1,r=i(e,e),s=e;for(;">"!==n(r,y);)t++,s=r,r=i(r,e);if(t=t.toString(),""!==g)for(let e=t.length;e<=b;e++)g+="0";g+=t,y=o(y,s),b=0}else{if("<"===p){""===g&&m++,b++;continue}if("="===p){if(""!==g)for(let t=0;t<b;t++)g+="0";g+="1",y="0",b=0}}}if(y.match(/^0+$/g))"<"===p&&(g+=y.substring(0,y.length-1));else{const t={},s=l-m-g.length+r+1;""===g&&(b=0);for(let r=0;r<s;r++){if(y+="0",a)if(y in t){if(t[y]++,t[y]>3){g+="...",h=!0;break}}else t[y]=1;const r=n(y,e);if(">"===r){let t=1,r=i(e,e),s=e;for(;">"!==n(r,y);)t++,s=r,r=i(r,e);t=t.toString();for(let e=t.length;e<=b;e++)g+="0";if(g+=t,y=o(y,s),"0"===y)break;b=0}else{if("<"===r){b++;continue}if("="===r){for(let t=0;t<b;t++)g+="0";g+="1",b=0;break}}}}const v=l-m,w=g.length;let x;if(v===w)x=0;else if(v<0)g="0."+"0".repeat(Math.abs(v))+g,x=w-v;else if(v>w){for(let t=w;t<v;t++)g+="0";x=0}else v<w?(g=g.substring(0,v)+"."+g.substring(v),x=w-v):0===v&&(g="0."+g,x=w);if(g=g.replace(/^0+/,""),g=g.replace(/\\.\\d+0+$/,""),!h){const t=x-r;t>0&&(g=s(g.substring(0,g.length-t+1)))}return"."===g[0]&&(g="0"+g),g}},function(t,e,r){const n=r(98),i=r(18),o=r(38),s=r(183);function a(t,e){t=i(t),e=i(e);const r="-"!==t[0]!==("-"!==e[0])?"-":"";t=n(t),e=n(e);if("<"===o(t,e)){const r=t;t=e,e=r}return r+s(t,e)}t.exports=a,t.exports.default=a},function(t,e,r){const{MAX_SAFE_INTEGER_LENGTH:n}=r(56);t.exports=function(t,e){if("0"===t||"0"===e)return"0";const r=t.indexOf("."),i=e.indexOf("."),o=(-1===r?t.length:r)+(-1===i?e.length:i),s=(-1===r?0:t.length-1-r)+(-1===i?0:e.length-1-i);if(0===s&&o<n)return(Number(t)*Number(e)).toFixed(0);const a=t.replace(".",""),u=e.replace(".",""),c=a.length,l=u.length,f=[];let h=c;for(;h>=0;){const t=h,e=h-=15,r=a.substring(e,t);f.push([Number(r),r.length])}const d=[],p=[];for(let t=0,e=l-1;e>=0;e--,t++){const r=u[e],n=Number(r);let i=0,o="";const s=f.length-1;f.forEach(([t,e],r)=>{let a=(i+n*t).toString();const u=a.length;if(u>e&&r!==s){const t=-1*e;o=a.slice(t)+o,i=Number(a.slice(0,t))}else{const t=e-u;for(let e=0;e<t;e++)a="0"+a;i=0,o=a+o}}),o+="0".repeat(t),d.push(o),p.push([Array.from(o).map(t=>Number(t)),o.length])}const y=d.length,g=p[p.length-1][1]+y;let m="",b=0;for(let t=0;t<g;t++){let e=b;const r=Math.min(t,y-1);for(let n=0;n<=r;n++){const[r,i]=p[n],o=i-1-t;o>=0&&(e+=r[o])}e>=10?(e=e.toString(),m=e[e.length-1]+m,b=Number(e.slice(0,-1))):(m=e+m,b=0)}if(0===s)m=m.replace(/^0+/,"");else{const t=m.length-s;m=m.substring(0,t)+"."+m.substring(t),m=m.replace(/^0+/,""),m=m.replace(/\\.?0+$/,""),"."===m[0]&&(m="0"+m)}return m}},function(t,e,r){const n=r(18),i=r(38),o=r(96),s=r(97);function a(t,e){t=n(t),e=n(e);const r="-"!==t[0],a="-"!==e[0];if(r){if(a){const r=i(t,e);return">"===r?s(t,e):"<"===r?"-"+s(e,t):"0"}return o(t,e.substring(1))}if(a)return"-"+o(t.substring(1),e);{t=t.substring(1),e=e.substring(1);const r=i(t,e);return">"===r?"-"+s(t,e):"<"===r?s(e,t):"0"}}t.exports=a,t.exports.default=a},function(t,e){const r=["5","6","7","8","9"];t.exports=function(t){"+"===t[0]&&(t=t.substring(1));const e=t.length;let n="";const i=t[t.length-1];if(r.includes(i)){let r;for(r=e-2;r>=0;r--){const e=t[r];if("."===e||"-"===e)continue;const i=Number(e)+1;if(10!==i){n=i+n;break}n="0"+n}r>0&&(n=t.substring(0,r)+n)}else n=t.substring(0,e-1);return"."===n[n.length-1]&&(n=n.substring(0,n.length-1)),n.indexOf(".")>-1&&(n=n.replace(/0+$/,"")),n}},function(t,e,r){const n=r(94);function i({nums:t,no_data:e,precise:r=!1}){switch((t=t.filter(t=>t!==e).sort((t,e)=>t-e)).length){case 0:return;case 1:return r?t[0].toString():t[0];default:const e=t.length/2;if(t.length%2==0)return n(t[e-1],t[e],{precise:r});{const n=Math.floor(e);return r?t[n].toString():t[n]}}}t.exports=i,t.exports.default=i},function(t,e,r){var n;const i=r(188);function o({bands:t,data:e,height:r,layout:n,width:o}){const s=i(e);if("[row,column,band]"===n||1===s)return{layout:"[row,column,band]",bands:t||(r&&o?e.length/(r*o):void 0),height:r||(t&&o?e.length/(t*o):void 0),width:o||(t&&r?e.length/(t*r):void 0)};if(2===s){if(!r||!o)return e.length<e[0].length?{bands:e.length,layout:"[band][row,column]",height:r||(o?e[0].length/o:void 0),width:o||(r?e[0].length/r:void 0)}:{bands:e[0].length,layout:"[row,column][band]",height:r||(o?e.length/o:void 0),width:o||(r?e.length/r:void 0)};if(e[0].length===r*o)return{layout:"[band][row,column]",bands:e.length,height:r,width:o};if(e.length===r*o)return{layout:"[row,column][band]",bands:e[0].length,height:r,width:o}}else if(3===s){const t=e.length,n=e[0].length,i=e[0][0].length;if(r&&o){if(t===r&&n===o)return{layout:"[row][column][band]",bands:i,height:r,width:o};if(n===r&&i===o)return{layout:"[band][row][column]",bands:t,height:r,width:o}}else{if(t<n&&t<i)return{layout:"[band][row][column]",bands:t,height:n,width:i};if(i<t&&i<n)return{layout:"[row][column][band]",bands:i,height:t,width:n}}}}void 0===(n=function(){return o}.call(e,r,e,t))||(t.exports=n),t.exports=o,t.exports.default=o,t.exports.guessImageLayout=o,"object"==typeof window&&(window.guessImageLayout=o),"object"==typeof self&&(self.guessImageLayout=o)},function(t,e){t.exports=function(t){const e=t=>Array.isArray(t)||t instanceof Int8Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array||t instanceof BigInt64Array||t instanceof BigUint64Array;let r=0,n=t;for(;e(n);)r++,n=n[0];return r}},function(t,e,r){const n={},{wrapNextFunction:i}=r(72),o=r(190),s=r(191),a={Array:Array,Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int16Array:Int16Array,Uint16Array:Uint16Array,Float32Array:Float32Array,Float64Array:Float64Array};try{a.BigInt64Array=BigInt64Array,a.BigUint64Array=BigUint64Array}catch(t){}const u=t=>t.match(/\\[[^\\]]+\\]/g),c=t=>t.startsWith("[")&&t.endsWith("]")?t.substring(1,t.length-1):t,l=t=>t.startsWith("(")&&t.endsWith(")")?t.substring(1,t.length-1):t,f=t=>t.match(/(\\(.*?\\)|[^\\(,\\s]+)(?=\\s*,|\\s*$)/g),h=t=>{t=c(t),t=l(t);const e=f(t);return 1===e.length?{type:"Vector",dim:e[0]}:{type:"Matrix",parts:e.map(h)}};function d(t){const e=t.match(/[^ A-Za-z,\\[\\]]/g);if(e)throw new Error("The following invalid characters were used: "+e.map(t=>`"${t}"`).join(", "));return!0}function p(t,{useLayoutCache:e=!0}={useLayoutCache:!0}){if(e&&t in n)return n[t];d(t);const r=u(t).map(h),i={type:"Layout",summary:r.map(t=>"Matrix"===t.type?t.parts.length:1),dims:r};return e&&(n[t]=i),i}function y({useLayoutCache:t=!0,data:e,layout:r,sizes:n={}}){"string"==typeof r&&(r=p(r,{useLayoutCache:t}));const{dims:i}=r,o=i.length,a=m({useLayoutCache:t,layout:r,sizes:n}),u=o-1,c=r.summary.toString();if(c in s){const t={data:e};return r.dims.map((e,r)=>{"Vector"===e.type?t[`d${r}v0`]=e.dim:"Matrix"===e.type&&e.parts.forEach((e,n)=>{t[`d${r}v${n}`]=e.dim,t[`m${r}v${n}`]=a[e.dim]})}),s[c].bind(t)}return({point:t,value:r})=>{let n=e;for(let e=0;e<o;e++){const o=e===u,s=i[e];let c;c="Vector"===s.type?t[s.dim]:s.parts.reduce((e,{dim:r})=>e+a[r]*t[r],0),o?n[c]=r:n=n[c]}}}function g({rect:t={}}){if(t)for(let e in t){const r=t[e];if(2!==r.length)throw new Error("[xdim] uh oh. invalid hyper-rectangle");const[n,i]=r;if(n>i)throw new Error(`[xdim] uh oh. invalid range for "${e}".  Start of ${n} can\'t be greater than end of ${i}.`);if(n<0)throw new Error("[xdim] uh oh. invalid hyper-rectangle with start "+n)}}function m({useLayoutCache:t=!0,layout:e,sizes:r}){"string"==typeof e&&(e=p(e,{useLayoutCache:t}));const{dims:n}=e,i=n.length;let o={};for(let t=0;t<i;t++){const e=n[t];if("Vector"===e.type)o[e.dim]=1;else{const{parts:t}=e;let n=1;for(let e=t.length-1;e>=0;e--){const{dim:i}=t[e];o[i]=n,n*=r[t[e].dim]}}}return o}function b({useLayoutCache:t=!0,data:e,layout:r,point:n,sizes:i={}}){let o,s;"string"==typeof r&&(r=p(r,{useLayoutCache:t}));let a=e;const{dims:u}=r,c=u.length;for(let t=0;t<c;t++){const e=u[t];if("Vector"===e.type){const t=n[e.dim];o=a,s=t,a=a[t]}else{const{parts:t}=e;let r=0,u=1;for(let e=t.length-1;e>=0;e--){const o=t[e];if("Vector"===o.type){const{dim:t}=o;if(r+=u*n[t],e>0){if(!(t in i))throw new Error(`you cannot calculate the location without knowing the size of the "${t}" dimension.`);u*=i[t]}}}o=a,s=r,a=a[r]}}return{index:s,value:a,parent:o}}function v({arr:t,fill:e,lens:r,arrayTypes:n}){if(0===r.length)return t;const i=r[0];if(1===r.length){const r=n?n[n.length-1]:"Array";for(let n=0;n<t.length;n++)t[n]=new a[r](i).fill(e)}else for(let o=0;o<t.length;o++){const s=new Array(i).fill(e);t[o]=s,v({arr:s,fill:e,lens:r.slice(1),arrayTypes:n})}return t}function w({fill:t,shape:e,arrayTypes:r}){const n=e[0];if(1===e.length){if(Array.isArray(r)&&1!==r.length)throw new Error("[xdim] shape and arrayTypes have different lengths");const e=Array.isArray(r)?r[0]:"Array";return new a[e](n).fill(t)}return v({arr:new Array(n).fill(t),fill:t,lens:e.slice(1),arrayTypes:r})}function x({fill:t,layout:e,useLayoutCache:r=!0,sizes:n,arrayTypes:i}){"string"==typeof e&&(e=p(e,{useLayoutCache:r}));const o=e.dims.map(t=>"Vector"===t.type?n[t.dim]:"Matrix"===t.type?t.parts.reduce((t,e)=>{if(!(e.dim in n))throw new Error(`[xdim] could not find "${e.dim}" in sizes: { ${Object.keys(n).join(", ")} }`);return t*n[e.dim]},1):void 0);return{data:w({fill:t,shape:o,arrayTypes:i}),shape:o,arrayTypes:i}}function _({start:t=0,end:e=100}){let r=t-1;return e+=1,i((function(){return r++,r===e?{done:!0}:{done:!1,value:r}}))}function S({order:t,sizes:e,rect:r={}}){const n=Array.isArray(t)?t:Object.keys(e).sort((t,r)=>e[t]-e[r]),o=new Array(n.length),s={};for(let t=0;t<n.length-1;t++){const i=n[t],[a,u]=r[i]||[0,e[i]-1];o[t]=_({start:a+1,end:u}),s[i]=a}const a=n[n.length-1],[u,c]=r[a]||[0,e[a]-1];return o[o.length-1]=_({start:u,end:c}),s[a]=u-1,i((function(){for(let t=o.length-1;t>=0;t--){const{value:i,done:a}=o[t].next();if(!a){for(let i=t+1;i<o.length;i++){const t=n[i],[a,u]=r[t]||[0,e[t]-1];o[i]=_({start:a+1,end:u}),s[t]=a}return s[n[t]]=i,{value:s,done:!1}}if(0===t)return{done:!0}}}))}t.exports={addDims:v,checkValidity:d,createMatrix:w,iterClip:function({data:t,layout:e,order:r,rect:n={},sizes:o={},useLayoutCache:s=!0}){if(!t)throw new Error("[xdim] must specify data");if(!e)throw new Error("[xdim] must specify layout");const a=S({order:r,sizes:o,rect:n});return i((function(){const{value:r,done:n}=a.next();if(n)return{done:!0};{const{value:n}=b({data:t,layout:e,point:r,sizes:o,useLayoutCache:s});return{done:!1,value:n}}}))},iterRange:_,iterPoints:S,matchSequences:f,parse:p,parseDimensions:function(t){const e={},r=/[A-Za-z]+/g;let n;for(;null!==(n=r.exec(t));){const[t]=n;e[t]={name:t}}return e},parseSequences:h,parseVectors:u,prepareData:x,prepareSelect:function({useLayoutCache:t=!0,data:e,layout:r,sizes:n={}}){"string"==typeof r&&(r=p(r,{useLayoutCache:t}));const{dims:i}=r,s=i.length,a=m({useLayoutCache:t,layout:r,sizes:n}),u=s-1,c=r.summary.toString();if(c in o){const t={data:e};return r.dims.map((e,r)=>{"Vector"===e.type?t[`d${r}v0`]=e.dim:"Matrix"===e.type&&e.parts.forEach((e,n)=>{t[`d${r}v${n}`]=e.dim,t[`m${r}v${n}`]=a[e.dim]})}),o[c].bind(t)}return({point:t})=>{let r=e;for(let e=0;e<s;e++){const n=e===u,o=i[e];let s;if(s="Vector"===o.type?t[o.dim]:o.parts.reduce((e,{dim:r})=>e+a[r]*t[r],0),n)return{index:s,parent:r,value:r[s]};r=r[s]}}},prepareUpdate:y,removeBraces:c,removeParentheses:l,select:b,transform:function({data:t,fill:e,from:r,to:n,sizes:i,useLayoutCache:o=!0}){"string"==typeof r&&(r=p(r,{useLayoutCache:o})),"string"==typeof n&&(n=p(n,{useLayoutCache:o}));const{data:s}=x({fill:e,layout:n,sizes:i}),a=y({useLayoutCache:o,data:s,layout:n,sizes:i}),u=S({sizes:i});for(point of u){const{value:e}=b({data:t,layout:r,point:point,sizes:i});a({point:point,value:e})}return{data:s}},update:function({useLayoutCache:t=!0,data:e,layout:r,point:n,sizes:i={},value:o}){"string"==typeof r&&(r=p(r,{useLayoutCache:t}));const{dims:s}=r;for(let t=0;t<s.length;t++){const r=t===s.length-1,a=s[t];let u;if("Vector"===a.type)u=n[a.dim];else{const{parts:t}=a;u=0;let e=1;for(let r=t.length-1;r>=0;r--){const o=t[r],{dim:s}=o;if(u+=e*n[s],r>0){if(!(s in i))throw new Error(`you cannot calculate the location without knowing the size of the "${s}" dimension.`);e*=i[s]}}}r?e[u]=o:e=e[u]}},clip:function({useLayoutCache:t=!0,data:e,layout:r,rect:n,sizes:i={},flat:o=!1,validate:s=!0}){s&&g({rect:n}),"string"==typeof r&&(r=p(r,{useLayoutCache:t}));let a=[e];if(r.dims.forEach(t=>{let e=[];a.forEach(r=>{if("Vector"===t.type){const[i,o]=n[t.dim];e=e.concat(r.slice(i,o+1))}else{const{parts:o}=t;let s=[0],a=1;for(let t=o.length-1;t>=0;t--){const e=o[t],{dim:r}=e,[u,c]=n[r],l=[];for(let t=u;t<=c;t++)s.forEach(e=>{l.push(e+a*t)});s=l,a*=i[r]}s.forEach(t=>{e.push(r[t])})}}),a=e}),o)return{data:a};const u=Object.fromEntries(Object.entries(n).map(([t,[e,r]])=>[t,r-e+1])),{data:c}=x({layout:r,sizes:u}),l=r.dims.length,f=(t,e)=>{if(e===l)for(let e=0;e<t.length;e++)t[e]=a.shift();else t.forEach(t=>f(t,e+1))};return f(c,1),{data:c}},validateRect:g}},function(t,e){t.exports={1:function({point:t}){const e=this.data,r=t[this.d0v0];return{parent:e,index:r,value:e[r]}},2:function({point:t}){const e=this.data,r=this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1];return{parent:e,index:r,value:e[r]}},3:function({point:t}){const e=this.data,r=this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2];return{parent:e,index:r,value:e[r]}},4:function({point:t}){const e=this.data,r=this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2]+this.m0v3*t[this.d0v3];return{parent:e,index:r,value:e[r]}},5:function({point:t}){const e=this.data,r=this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2]+this.m0v3*t[this.d0v3]+this.m0v4*t[this.d0v4];return{parent:e,index:r,value:e[r]}},"1,1":function({point:t}){const e=this.data[t[this.d0v0]],r=t[this.d1v0];return{parent:e,index:r,value:e[r]}},"1,2":function({point:t}){const e=this.data[t[this.d0v0]],r=this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1];return{parent:e,index:r,value:e[r]}},"1,3":function({point:t}){const e=this.data[t[this.d0v0]],r=this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2];return{parent:e,index:r,value:e[r]}},"1,4":function({point:t}){const e=this.data[t[this.d0v0]],r=this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2]+this.m1v3*t[this.d1v3];return{parent:e,index:r,value:e[r]}},"1,5":function({point:t}){const e=this.data[t[this.d0v0]],r=this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2]+this.m1v3*t[this.d1v3]+this.m1v4*t[this.d1v4];return{parent:e,index:r,value:e[r]}},"1,1,1":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]],r=t[this.d2v0];return{parent:e,index:r,value:e[r]}},"1,1,2":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]],r=this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1];return{parent:e,index:r,value:e[r]}},"1,1,3":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]],r=this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2];return{parent:e,index:r,value:e[r]}},"1,1,4":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]],r=this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2]+this.m2v3*t[this.d2v3];return{parent:e,index:r,value:e[r]}},"1,1,5":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]],r=this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2]+this.m2v3*t[this.d2v3]+this.m2v4*t[this.d2v4];return{parent:e,index:r,value:e[r]}},"1,1,1,1":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]],r=t[this.d3v0];return{parent:e,index:r,value:e[r]}},"1,1,1,2":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]],r=this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1];return{parent:e,index:r,value:e[r]}},"1,1,1,3":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]],r=this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2];return{parent:e,index:r,value:e[r]}},"1,1,1,4":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]],r=this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2]+this.m3v3*t[this.d3v3];return{parent:e,index:r,value:e[r]}},"1,1,1,5":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]],r=this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2]+this.m3v3*t[this.d3v3]+this.m3v4*t[this.d3v4];return{parent:e,index:r,value:e[r]}},"1,1,1,1,1":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]],r=t[this.d4v0];return{parent:e,index:r,value:e[r]}},"1,1,1,1,2":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]],r=this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1];return{parent:e,index:r,value:e[r]}},"1,1,1,1,3":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]],r=this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2];return{parent:e,index:r,value:e[r]}},"1,1,1,1,4":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]],r=this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2]+this.m4v3*t[this.d4v3];return{parent:e,index:r,value:e[r]}},"1,1,1,1,5":function({point:t}){const e=this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]],r=this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2]+this.m4v3*t[this.d4v3]+this.m4v4*t[this.d4v4];return{parent:e,index:r,value:e[r]}}}},function(t,e){t.exports={1:function({point:t,value:e}){this.data[t[this.d0v0]]=e},2:function({point:t,value:e}){this.data[this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]]=e},3:function({point:t,value:e}){this.data[this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2]]=e},4:function({point:t,value:e}){this.data[this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2]+this.m0v3*t[this.d0v3]]=e},5:function({point:t,value:e}){this.data[this.m0v0*t[this.d0v0]+this.m0v1*t[this.d0v1]+this.m0v2*t[this.d0v2]+this.m0v3*t[this.d0v3]+this.m0v4*t[this.d0v4]]=e},"1,1":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]]=e},"1,2":function({point:t,value:e}){this.data[t[this.d0v0]][this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]]=e},"1,3":function({point:t,value:e}){this.data[t[this.d0v0]][this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2]]=e},"1,4":function({point:t,value:e}){this.data[t[this.d0v0]][this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2]+this.m1v3*t[this.d1v3]]=e},"1,5":function({point:t,value:e}){this.data[t[this.d0v0]][this.m1v0*t[this.d1v0]+this.m1v1*t[this.d1v1]+this.m1v2*t[this.d1v2]+this.m1v3*t[this.d1v3]+this.m1v4*t[this.d1v4]]=e},"1,1,1":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]]=e},"1,1,2":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]]=e},"1,1,3":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2]]=e},"1,1,4":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2]+this.m2v3*t[this.d2v3]]=e},"1,1,5":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][this.m2v0*t[this.d2v0]+this.m2v1*t[this.d2v1]+this.m2v2*t[this.d2v2]+this.m2v3*t[this.d2v3]+this.m2v4*t[this.d2v4]]=e},"1,1,1,1":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]]=e},"1,1,1,2":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]]=e},"1,1,1,3":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2]]=e},"1,1,1,4":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2]+this.m3v3*t[this.d3v3]]=e},"1,1,1,5":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][this.m3v0*t[this.d3v0]+this.m3v1*t[this.d3v1]+this.m3v2*t[this.d3v2]+this.m3v3*t[this.d3v3]+this.m3v4*t[this.d3v4]]=e},"1,1,1,1,1":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]][t[this.d4v0]]=e},"1,1,1,1,2":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]][this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]]=e},"1,1,1,1,3":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]][this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2]]=e},"1,1,1,1,4":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]][this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2]+this.m4v3*t[this.d4v3]]=e},"1,1,1,1,5":function({point:t,value:e}){this.data[t[this.d0v0]][t[this.d1v0]][t[this.d2v0]][t[this.d3v0]][this.m4v0*t[this.d4v0]+this.m4v1*t[this.d4v1]+this.m4v2*t[this.d4v2]+this.m4v3*t[this.d4v3]+this.m4v4*t[this.d4v4]]=e}}},function(t,e,r){"use strict";t.exports={countIn1D:function(t){return t.reduce((function(t,e){return void 0===t[e]?t[e]=1:t[e]++,t}),{})},countIn2D:function(t){return t.reduce((function(t,e){return e.forEach((function(e){void 0===t[e]?t[e]=1:t[e]++})),t}),{})},unflatten:function(t,e){for(var r=e.height,n=e.width,i=[],o=0;o<r;o++){var s=o*n,a=s+n;i.push(t.subarray(s,a))}return i}}},function(t,e,r){"use strict";r.r(e),r.d(e,"globals",(function(){return n})),r.d(e,"rgb",(function(){return i})),r.d(e,"getDecoder",(function(){return U})),r.d(e,"setLogger",(function(){return xt})),r.d(e,"GeoTIFF",(function(){return Tt})),r.d(e,"MultiGeoTIFF",(function(){return Ct})),r.d(e,"fromUrl",(function(){return Ot})),r.d(e,"fromArrayBuffer",(function(){return It})),r.d(e,"fromFile",(function(){return Pt})),r.d(e,"fromBlob",(function(){return Rt})),r.d(e,"fromUrls",(function(){return jt})),r.d(e,"writeArrayBuffer",(function(){return Mt})),r.d(e,"Pool",(function(){return Y.a}));var n={};r.r(n),r.d(n,"fieldTagNames",(function(){return a})),r.d(n,"fieldTags",(function(){return u})),r.d(n,"fieldTagTypes",(function(){return c})),r.d(n,"arrayFields",(function(){return l})),r.d(n,"fieldTypeNames",(function(){return f})),r.d(n,"fieldTypes",(function(){return h})),r.d(n,"photometricInterpretations",(function(){return d})),r.d(n,"ExtraSamplesValues",(function(){return p})),r.d(n,"geoKeyNames",(function(){return y})),r.d(n,"geoKeys",(function(){return g}));var i={};r.r(i),r.d(i,"fromWhiteIsZero",(function(){return m})),r.d(i,"fromBlackIsZero",(function(){return b})),r.d(i,"fromPalette",(function(){return v})),r.d(i,"fromCMYK",(function(){return w})),r.d(i,"fromYCbCr",(function(){return x})),r.d(i,"fromCIELab",(function(){return _}));var o=r(100),s=r.n(o);const a={315:"Artist",258:"BitsPerSample",265:"CellLength",264:"CellWidth",320:"ColorMap",259:"Compression",33432:"Copyright",306:"DateTime",338:"ExtraSamples",266:"FillOrder",289:"FreeByteCounts",288:"FreeOffsets",291:"GrayResponseCurve",290:"GrayResponseUnit",316:"HostComputer",270:"ImageDescription",257:"ImageLength",256:"ImageWidth",271:"Make",281:"MaxSampleValue",280:"MinSampleValue",272:"Model",254:"NewSubfileType",274:"Orientation",262:"PhotometricInterpretation",284:"PlanarConfiguration",296:"ResolutionUnit",278:"RowsPerStrip",277:"SamplesPerPixel",305:"Software",279:"StripByteCounts",273:"StripOffsets",255:"SubfileType",263:"Threshholding",282:"XResolution",283:"YResolution",326:"BadFaxLines",327:"CleanFaxData",343:"ClipPath",328:"ConsecutiveBadFaxLines",433:"Decode",434:"DefaultImageColor",269:"DocumentName",336:"DotRange",321:"HalftoneHints",346:"Indexed",347:"JPEGTables",285:"PageName",297:"PageNumber",317:"Predictor",319:"PrimaryChromaticities",532:"ReferenceBlackWhite",339:"SampleFormat",340:"SMinSampleValue",341:"SMaxSampleValue",559:"StripRowCounts",330:"SubIFDs",292:"T4Options",293:"T6Options",325:"TileByteCounts",323:"TileLength",324:"TileOffsets",322:"TileWidth",301:"TransferFunction",318:"WhitePoint",344:"XClipPathUnits",286:"XPosition",529:"YCbCrCoefficients",531:"YCbCrPositioning",530:"YCbCrSubSampling",345:"YClipPathUnits",287:"YPosition",37378:"ApertureValue",40961:"ColorSpace",36868:"DateTimeDigitized",36867:"DateTimeOriginal",34665:"Exif IFD",36864:"ExifVersion",33434:"ExposureTime",41728:"FileSource",37385:"Flash",40960:"FlashpixVersion",33437:"FNumber",42016:"ImageUniqueID",37384:"LightSource",37500:"MakerNote",37377:"ShutterSpeedValue",37510:"UserComment",33723:"IPTC",34675:"ICC Profile",700:"XMP",42112:"GDAL_METADATA",42113:"GDAL_NODATA",34377:"Photoshop",33550:"ModelPixelScale",33922:"ModelTiepoint",34264:"ModelTransformation",34735:"GeoKeyDirectory",34736:"GeoDoubleParams",34737:"GeoAsciiParams"},u={};for(const t in a)a.hasOwnProperty(t)&&(u[a[t]]=parseInt(t,10));const c={256:"SHORT",257:"SHORT",258:"SHORT",259:"SHORT",262:"SHORT",273:"LONG",274:"SHORT",277:"SHORT",278:"LONG",279:"LONG",282:"RATIONAL",283:"RATIONAL",284:"SHORT",286:"SHORT",287:"RATIONAL",296:"SHORT",305:"ASCII",306:"ASCII",338:"SHORT",339:"SHORT",513:"LONG",514:"LONG",1024:"SHORT",1025:"SHORT",2048:"SHORT",2049:"ASCII",33550:"DOUBLE",33922:"DOUBLE",34665:"LONG",34735:"SHORT",34737:"ASCII",42113:"ASCII"},l=[u.BitsPerSample,u.ExtraSamples,u.SampleFormat,u.StripByteCounts,u.StripOffsets,u.StripRowCounts,u.TileByteCounts,u.TileOffsets],f={1:"BYTE",2:"ASCII",3:"SHORT",4:"LONG",5:"RATIONAL",6:"SBYTE",7:"UNDEFINED",8:"SSHORT",9:"SLONG",10:"SRATIONAL",11:"FLOAT",12:"DOUBLE",13:"IFD",16:"LONG8",17:"SLONG8",18:"IFD8"},h={};for(const t in f)f.hasOwnProperty(t)&&(h[f[t]]=parseInt(t,10));const d={WhiteIsZero:0,BlackIsZero:1,RGB:2,Palette:3,TransparencyMask:4,CMYK:5,YCbCr:6,CIELab:8,ICCLab:9},p={Unspecified:0,Assocalpha:1,Unassalpha:2},y={1024:"GTModelTypeGeoKey",1025:"GTRasterTypeGeoKey",1026:"GTCitationGeoKey",2048:"GeographicTypeGeoKey",2049:"GeogCitationGeoKey",2050:"GeogGeodeticDatumGeoKey",2051:"GeogPrimeMeridianGeoKey",2052:"GeogLinearUnitsGeoKey",2053:"GeogLinearUnitSizeGeoKey",2054:"GeogAngularUnitsGeoKey",2055:"GeogAngularUnitSizeGeoKey",2056:"GeogEllipsoidGeoKey",2057:"GeogSemiMajorAxisGeoKey",2058:"GeogSemiMinorAxisGeoKey",2059:"GeogInvFlatteningGeoKey",2060:"GeogAzimuthUnitsGeoKey",2061:"GeogPrimeMeridianLongGeoKey",2062:"GeogTOWGS84GeoKey",3072:"ProjectedCSTypeGeoKey",3073:"PCSCitationGeoKey",3074:"ProjectionGeoKey",3075:"ProjCoordTransGeoKey",3076:"ProjLinearUnitsGeoKey",3077:"ProjLinearUnitSizeGeoKey",3078:"ProjStdParallel1GeoKey",3079:"ProjStdParallel2GeoKey",3080:"ProjNatOriginLongGeoKey",3081:"ProjNatOriginLatGeoKey",3082:"ProjFalseEastingGeoKey",3083:"ProjFalseNorthingGeoKey",3084:"ProjFalseOriginLongGeoKey",3085:"ProjFalseOriginLatGeoKey",3086:"ProjFalseOriginEastingGeoKey",3087:"ProjFalseOriginNorthingGeoKey",3088:"ProjCenterLongGeoKey",3089:"ProjCenterLatGeoKey",3090:"ProjCenterEastingGeoKey",3091:"ProjCenterNorthingGeoKey",3092:"ProjScaleAtNatOriginGeoKey",3093:"ProjScaleAtCenterGeoKey",3094:"ProjAzimuthAngleGeoKey",3095:"ProjStraightVertPoleLongGeoKey",3096:"ProjRectifiedGridAngleGeoKey",4096:"VerticalCSTypeGeoKey",4097:"VerticalCitationGeoKey",4098:"VerticalDatumGeoKey",4099:"VerticalUnitsGeoKey"},g={};for(const t in y)y.hasOwnProperty(t)&&(g[y[t]]=parseInt(t,10));function m(t,e){const{width:r,height:n}=t,i=new Uint8Array(r*n*3);let o;for(let r=0,n=0;r<t.length;++r,n+=3)o=256-t[r]/e*256,i[n]=o,i[n+1]=o,i[n+2]=o;return i}function b(t,e){const{width:r,height:n}=t,i=new Uint8Array(r*n*3);let o;for(let r=0,n=0;r<t.length;++r,n+=3)o=t[r]/e*256,i[n]=o,i[n+1]=o,i[n+2]=o;return i}function v(t,e){const{width:r,height:n}=t,i=new Uint8Array(r*n*3),o=e.length/3,s=e.length/3*2;for(let r=0,n=0;r<t.length;++r,n+=3){const a=t[r];i[n]=e[a]/65536*256,i[n+1]=e[a+o]/65536*256,i[n+2]=e[a+s]/65536*256}return i}function w(t){const{width:e,height:r}=t,n=new Uint8Array(e*r*3);for(let e=0,r=0;e<t.length;e+=4,r+=3){const i=t[e],o=t[e+1],s=t[e+2],a=t[e+3];n[r]=(255-i)/256*255*((255-a)/256),n[r+1]=(255-o)/256*255*((255-a)/256),n[r+2]=(255-s)/256*255*((255-a)/256)}return n}function x(t){const{width:e,height:r}=t,n=new Uint8ClampedArray(e*r*3);for(let e=0,r=0;e<t.length;e+=3,r+=3){const i=t[e],o=t[e+1],s=t[e+2];n[r]=i+1.402*(s-128),n[r+1]=i-.34414*(o-128)-.71414*(s-128),n[r+2]=i+1.772*(o-128)}return n}function _(t){const{width:e,height:r}=t,n=new Uint8Array(e*r*3);for(let e=0,r=0;e<t.length;e+=3,r+=3){let i,o,s,a=(t[e+0]+16)/116,u=(t[e+1]<<24>>24)/500+a,c=a-(t[e+2]<<24>>24)/200;u=.95047*(u*u*u>.008856?u*u*u:(u-16/116)/7.787),a=1*(a*a*a>.008856?a*a*a:(a-16/116)/7.787),c=1.08883*(c*c*c>.008856?c*c*c:(c-16/116)/7.787),i=3.2406*u+-1.5372*a+-.4986*c,o=-.9689*u+1.8758*a+.0415*c,s=.0557*u+-.204*a+1.057*c,i=i>.0031308?1.055*i**(1/2.4)-.055:12.92*i,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,n[r]=255*Math.max(0,Math.min(1,i)),n[r+1]=255*Math.max(0,Math.min(1,o)),n[r+2]=255*Math.max(0,Math.min(1,s))}return n}function S(t,e){let r=t.length-e,n=0;do{for(let r=e;r>0;r--)t[n+e]+=t[n],n++;r-=e}while(r>0)}function A(t,e,r){let n=0,i=t.length;const o=i/r;for(;i>e;){for(let r=e;r>0;--r)t[n+e]+=t[n],++n;i-=e}const s=t.slice();for(let e=0;e<o;++e)for(let n=0;n<r;++n)t[r*e+n]=s[(r-n-1)*o+e]}class E{decode(t,e){const r=this.decodeBlock(e),n=t.Predictor||1;if(1!==n){const e=!t.StripOffsets;return function(t,e,r,n,i,o){if(!e||1===e)return t;for(let t=0;t<i.length;++t){if(i[t]%8!=0)throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");if(i[t]!==i[0])throw new Error("When decoding with predictor, all samples must have the same size.")}const s=i[0]/8,a=2===o?1:i.length;for(let o=0;o<n&&!(o*a*r*s>=t.byteLength);++o){let n;if(2===e){switch(i[0]){case 8:n=new Uint8Array(t,o*a*r*s,a*r*s);break;case 16:n=new Uint16Array(t,o*a*r*s,a*r*s/2);break;case 32:n=new Uint32Array(t,o*a*r*s,a*r*s/4);break;default:throw new Error(`Predictor 2 not allowed with ${i[0]} bits per sample.`)}S(n,a)}else 3===e&&(n=new Uint8Array(t,o*a*r*s,a*r*s),A(n,a,s))}return t}(r,n,e?t.TileWidth:t.ImageWidth,e?t.TileLength:t.RowsPerStrip||t.ImageLength,t.BitsPerSample,t.PlanarConfiguration)}return r}}class k extends E{decodeBlock(t){return t}}function T(t,e){for(let r=e.length-1;r>=0;r--)t.push(e[r]);return t}function C(t){const e=new Uint16Array(4093),r=new Uint8Array(4093);for(let t=0;t<=257;t++)e[t]=4096,r[t]=t;let n=258,i=9,o=0;function s(){n=258,i=9}function a(t){const e=function(t,e,r){const n=e%8,i=Math.floor(e/8),o=8-n,s=e+r-8*(i+1);let a=8*(i+2)-(e+r);const u=8*(i+2)-e;if(a=Math.max(0,a),i>=t.length)return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"),257;let c=t[i]&2**(8-n)-1;c<<=r-o;let l=c;if(i+1<t.length){let e=t[i+1]>>>a;e<<=Math.max(0,r-u),l+=e}if(s>8&&i+2<t.length){const n=8*(i+3)-(e+r);l+=t[i+2]>>>n}return l}(t,o,i);return o+=i,e}function u(t,i){return r[n]=i,e[n]=t,n++,n-1}function c(t){const n=[];for(let i=t;4096!==i;i=e[i])n.push(r[i]);return n}const l=[];s();const f=new Uint8Array(t);let h,d=a(f);for(;257!==d;){if(256===d){for(s(),d=a(f);256===d;)d=a(f);if(257===d)break;if(d>256)throw new Error("corrupted code at scanline "+d);T(l,c(d)),h=d}else if(d<n){const t=c(d);T(l,t),u(h,t[t.length-1]),h=d}else{const t=c(h);if(!t)throw new Error(`Bogus entry. Not in dictionary, ${h} / ${n}, position: ${o}`);T(l,t),l.push(t[t.length-1]),u(h,t[t.length-1]),h=d}n+1>=2**i&&(12===i?h=void 0:i++),d=a(f)}return new Uint8Array(l)}class O extends E{decodeBlock(t){return C(t).buffer}}const I=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);function P(t,e){let r=0;const n=[];let i=16;for(;i>0&&!t[i-1];)--i;n.push({children:[],index:0});let o,s=n[0];for(let a=0;a<i;a++){for(let i=0;i<t[a];i++){for(s=n.pop(),s.children[s.index]=e[r];s.index>0;)s=n.pop();for(s.index++,n.push(s);n.length<=a;)n.push(o={children:[],index:0}),s.children[s.index]=o.children,s=o;r++}a+1<i&&(n.push(o={children:[],index:0}),s.children[s.index]=o.children,s=o)}return n[0].children}function R(t,e,r,n,i,o,s,a,u){const{mcusPerLine:c,progressive:l}=r,f=e;let h=e,d=0,p=0;function y(){if(p>0)return p--,d>>p&1;if(d=t[h++],255===d){const e=t[h++];if(e)throw new Error("unexpected marker: "+(d<<8|e).toString(16))}return p=7,d>>>7}function g(t){let e,r=t;for(;null!==(e=y());){if(r=r[e],"number"==typeof r)return r;if("object"!=typeof r)throw new Error("invalid huffman sequence")}return null}function m(t){let e=t,r=0;for(;e>0;){const t=y();if(null===t)return;r=r<<1|t,--e}return r}function b(t){const e=m(t);return e>=1<<t-1?e:e+(-1<<t)+1}let v=0;let w,x=0;function _(t,e,r,n,i){const o=r%c,s=(r/c|0)*t.v+n,a=o*t.h+i;e(t,t.blocks[s][a])}function S(t,e,r){const n=r/t.blocksPerLine|0,i=r%t.blocksPerLine;e(t,t.blocks[n][i])}const A=n.length;let E,k,T,C,O,P;P=l?0===o?0===a?function(t,e){const r=g(t.huffmanTableDC),n=0===r?0:b(r)<<u;t.pred+=n,e[0]=t.pred}:function(t,e){e[0]|=y()<<u}:0===a?function(t,e){if(v>0)return void v--;let r=o;const n=s;for(;r<=n;){const n=g(t.huffmanTableAC),i=15&n,o=n>>4;if(0===i){if(o<15){v=m(o)+(1<<o)-1;break}r+=16}else{r+=o;e[I[r]]=b(i)*(1<<u),r++}}}:function(t,e){let r=o;const n=s;let i=0;for(;r<=n;){const n=I[r],o=e[n]<0?-1:1;switch(x){case 0:{const e=g(t.huffmanTableAC),r=15&e;if(i=e>>4,0===r)i<15?(v=m(i)+(1<<i),x=4):(i=16,x=1);else{if(1!==r)throw new Error("invalid ACn encoding");w=b(r),x=i?2:3}continue}case 1:case 2:e[n]?e[n]+=(y()<<u)*o:(i--,0===i&&(x=2===x?3:0));break;case 3:e[n]?e[n]+=(y()<<u)*o:(e[n]=w<<u,x=0);break;case 4:e[n]&&(e[n]+=(y()<<u)*o)}r++}4===x&&(v--,0===v&&(x=0))}:function(t,e){const r=g(t.huffmanTableDC),n=0===r?0:b(r);t.pred+=n,e[0]=t.pred;let i=1;for(;i<64;){const r=g(t.huffmanTableAC),n=15&r,o=r>>4;if(0===n){if(o<15)break;i+=16}else{i+=o;e[I[i]]=b(n),i++}}};let R,j,M=0;j=1===A?n[0].blocksPerLine*n[0].blocksPerColumn:c*r.mcusPerColumn;const L=i||j;for(;M<j;){for(k=0;k<A;k++)n[k].pred=0;if(v=0,1===A)for(E=n[0],O=0;O<L;O++)S(E,P,M),M++;else for(O=0;O<L;O++){for(k=0;k<A;k++){E=n[k];const{h:t,v:e}=E;for(T=0;T<e;T++)for(C=0;C<t;C++)_(E,P,M,T,C)}if(M++,M===j)break}if(p=0,R=t[h]<<8|t[h+1],R<65280)throw new Error("marker was not found");if(!(R>=65488&&R<=65495))break;h+=2}return h-f}function j(t,e){const r=[],{blocksPerLine:n,blocksPerColumn:i}=e,o=n<<3,s=new Int32Array(64),a=new Uint8Array(64);function u(t,r,n){const i=e.quantizationTable;let o,s,a,u,c,l,f,h,d;const p=n;let y;for(y=0;y<64;y++)p[y]=t[y]*i[y];for(y=0;y<8;++y){const t=8*y;0!==p[1+t]||0!==p[2+t]||0!==p[3+t]||0!==p[4+t]||0!==p[5+t]||0!==p[6+t]||0!==p[7+t]?(o=5793*p[0+t]+128>>8,s=5793*p[4+t]+128>>8,a=p[2+t],u=p[6+t],c=2896*(p[1+t]-p[7+t])+128>>8,h=2896*(p[1+t]+p[7+t])+128>>8,l=p[3+t]<<4,f=p[5+t]<<4,d=o-s+1>>1,o=o+s+1>>1,s=d,d=3784*a+1567*u+128>>8,a=1567*a-3784*u+128>>8,u=d,d=c-f+1>>1,c=c+f+1>>1,f=d,d=h+l+1>>1,l=h-l+1>>1,h=d,d=o-u+1>>1,o=o+u+1>>1,u=d,d=s-a+1>>1,s=s+a+1>>1,a=d,d=2276*c+3406*h+2048>>12,c=3406*c-2276*h+2048>>12,h=d,d=799*l+4017*f+2048>>12,l=4017*l-799*f+2048>>12,f=d,p[0+t]=o+h,p[7+t]=o-h,p[1+t]=s+f,p[6+t]=s-f,p[2+t]=a+l,p[5+t]=a-l,p[3+t]=u+c,p[4+t]=u-c):(d=5793*p[0+t]+512>>10,p[0+t]=d,p[1+t]=d,p[2+t]=d,p[3+t]=d,p[4+t]=d,p[5+t]=d,p[6+t]=d,p[7+t]=d)}for(y=0;y<8;++y){const t=y;0!==p[8+t]||0!==p[16+t]||0!==p[24+t]||0!==p[32+t]||0!==p[40+t]||0!==p[48+t]||0!==p[56+t]?(o=5793*p[0+t]+2048>>12,s=5793*p[32+t]+2048>>12,a=p[16+t],u=p[48+t],c=2896*(p[8+t]-p[56+t])+2048>>12,h=2896*(p[8+t]+p[56+t])+2048>>12,l=p[24+t],f=p[40+t],d=o-s+1>>1,o=o+s+1>>1,s=d,d=3784*a+1567*u+2048>>12,a=1567*a-3784*u+2048>>12,u=d,d=c-f+1>>1,c=c+f+1>>1,f=d,d=h+l+1>>1,l=h-l+1>>1,h=d,d=o-u+1>>1,o=o+u+1>>1,u=d,d=s-a+1>>1,s=s+a+1>>1,a=d,d=2276*c+3406*h+2048>>12,c=3406*c-2276*h+2048>>12,h=d,d=799*l+4017*f+2048>>12,l=4017*l-799*f+2048>>12,f=d,p[0+t]=o+h,p[56+t]=o-h,p[8+t]=s+f,p[48+t]=s-f,p[16+t]=a+l,p[40+t]=a-l,p[24+t]=u+c,p[32+t]=u-c):(d=5793*n[y+0]+8192>>14,p[0+t]=d,p[8+t]=d,p[16+t]=d,p[24+t]=d,p[32+t]=d,p[40+t]=d,p[48+t]=d,p[56+t]=d)}for(y=0;y<64;++y){const t=128+(p[y]+8>>4);r[y]=t<0?0:t>255?255:t}}for(let t=0;t<i;t++){const i=t<<3;for(let t=0;t<8;t++)r.push(new Uint8Array(o));for(let o=0;o<n;o++){u(e.blocks[t][o],a,s);let n=0;const c=o<<3;for(let t=0;t<8;t++){const e=r[i+t];for(let t=0;t<8;t++)e[c+t]=a[n++]}}}return r}class M{constructor(){this.jfif=null,this.adobe=null,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.resetFrames()}resetFrames(){this.frames=[]}parse(t){let e=0;function r(){const r=t[e]<<8|t[e+1];return e+=2,r}function n(){const n=r(),i=t.subarray(e,e+n-2);return e+=i.length,i}function i(t){let e,r,n=0,i=0;for(r in t.components)t.components.hasOwnProperty(r)&&(e=t.components[r],n<e.h&&(n=e.h),i<e.v&&(i=e.v));const o=Math.ceil(t.samplesPerLine/8/n),s=Math.ceil(t.scanLines/8/i);for(r in t.components)if(t.components.hasOwnProperty(r)){e=t.components[r];const a=Math.ceil(Math.ceil(t.samplesPerLine/8)*e.h/n),u=Math.ceil(Math.ceil(t.scanLines/8)*e.v/i),c=o*e.h,l=s*e.v,f=[];for(let t=0;t<l;t++){const t=[];for(let e=0;e<c;e++)t.push(new Int32Array(64));f.push(t)}e.blocksPerLine=a,e.blocksPerColumn=u,e.blocks=f}t.maxH=n,t.maxV=i,t.mcusPerLine=o,t.mcusPerColumn=s}let o=r();if(65496!==o)throw new Error("SOI not found");for(o=r();65497!==o;){switch(o){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:{const t=n();65504===o&&74===t[0]&&70===t[1]&&73===t[2]&&70===t[3]&&0===t[4]&&(this.jfif={version:{major:t[5],minor:t[6]},densityUnits:t[7],xDensity:t[8]<<8|t[9],yDensity:t[10]<<8|t[11],thumbWidth:t[12],thumbHeight:t[13],thumbData:t.subarray(14,14+3*t[12]*t[13])}),65518===o&&65===t[0]&&100===t[1]&&111===t[2]&&98===t[3]&&101===t[4]&&0===t[5]&&(this.adobe={version:t[6],flags0:t[7]<<8|t[8],flags1:t[9]<<8|t[10],transformCode:t[11]});break}case 65499:{const n=r()+e-2;for(;e<n;){const n=t[e++],i=new Int32Array(64);if(n>>4==0)for(let r=0;r<64;r++){i[I[r]]=t[e++]}else{if(n>>4!=1)throw new Error("DQT: invalid table spec");for(let t=0;t<64;t++){i[I[t]]=r()}}this.quantizationTables[15&n]=i}break}case 65472:case 65473:case 65474:{r();const n={extended:65473===o,progressive:65474===o,precision:t[e++],scanLines:r(),samplesPerLine:r(),components:{},componentsOrder:[]},s=t[e++];let a;for(let r=0;r<s;r++){a=t[e];const r=t[e+1]>>4,i=15&t[e+1],o=t[e+2];n.componentsOrder.push(a),n.components[a]={h:r,v:i,quantizationIdx:o},e+=3}i(n),this.frames.push(n);break}case 65476:{const n=r();for(let r=2;r<n;){const n=t[e++],i=new Uint8Array(16);let o=0;for(let r=0;r<16;r++,e++)i[r]=t[e],o+=i[r];const s=new Uint8Array(o);for(let r=0;r<o;r++,e++)s[r]=t[e];r+=17+o,n>>4==0?this.huffmanTablesDC[15&n]=P(i,s):this.huffmanTablesAC[15&n]=P(i,s)}break}case 65501:r(),this.resetInterval=r();break;case 65498:{r();const n=t[e++],i=[],o=this.frames[0];for(let r=0;r<n;r++){const r=o.components[t[e++]],n=t[e++];r.huffmanTableDC=this.huffmanTablesDC[n>>4],r.huffmanTableAC=this.huffmanTablesAC[15&n],i.push(r)}const s=t[e++],a=t[e++],u=t[e++],c=R(t,e,o,i,this.resetInterval,s,a,u>>4,15&u);e+=c;break}case 65535:255!==t[e]&&e--;break;default:if(255===t[e-3]&&t[e-2]>=192&&t[e-2]<=254){e-=3;break}throw new Error("unknown JPEG marker "+o.toString(16))}o=r()}}getResult(){const{frames:t}=this;if(0===this.frames.length)throw new Error("no frames were decoded");this.frames.length>1&&console.warn("more than one frame is not supported");for(let t=0;t<this.frames.length;t++){const e=this.frames[t].components;for(const t of Object.keys(e))e[t].quantizationTable=this.quantizationTables[e[t].quantizationIdx],delete e[t].quantizationIdx}const e=t[0],{components:r,componentsOrder:n}=e,i=[],o=e.samplesPerLine,s=e.scanLines;for(let t=0;t<n.length;t++){const o=r[n[t]];i.push({lines:j(0,o),scaleX:o.h/e.maxH,scaleY:o.v/e.maxV})}const a=new Uint8Array(o*s*i.length);let u=0;for(let t=0;t<s;++t)for(let e=0;e<o;++e)for(let r=0;r<i.length;++r){const n=i[r];a[u]=n.lines[0|t*n.scaleY][0|e*n.scaleX],++u}return a}}class L extends E{constructor(t){super(),this.reader=new M,t.JPEGTables&&this.reader.parse(t.JPEGTables)}decodeBlock(t){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(t)),this.reader.getResult().buffer}}var F=r(101);class N extends E{decodeBlock(t){return Object(F.inflate)(new Uint8Array(t)).buffer}}class D extends E{decodeBlock(t){const e=new DataView(t),r=[];for(let n=0;n<t.byteLength;++n){let t=e.getInt8(n);if(t<0){const i=e.getUint8(n+1);t=-t;for(let e=0;e<=t;++e)r.push(i);n+=1}else{for(let i=0;i<=t;++i)r.push(e.getUint8(n+i+1));n+=t+1}}return new Uint8Array(r).buffer}}function U(t){switch(t.Compression){case void 0:case 1:return new k;case 5:return new O;case 6:throw new Error("old style JPEG compression is not supported.");case 7:return new L(t);case 8:case 32946:return new N;case 32773:return new D;default:throw new Error("Unknown compression method identifier: "+t.Compression)}}function B(t,e,r,n=1){return new(Object.getPrototypeOf(t).constructor)(e*r*n)}function G(t,e,r){return(1-r)*t+r*e}function q(t,e,r,n,i,o="nearest"){switch(o.toLowerCase()){case"nearest":return function(t,e,r,n,i){const o=e/n,s=r/i;return t.map(t=>{const a=B(t,n,i);for(let u=0;u<i;++u){const i=Math.min(Math.round(s*u),r-1);for(let r=0;r<n;++r){const s=Math.min(Math.round(o*r),e-1),c=t[i*e+s];a[u*n+r]=c}}return a})}(t,e,r,n,i);case"bilinear":case"linear":return function(t,e,r,n,i){const o=e/n,s=r/i;return t.map(t=>{const a=B(t,n,i);for(let u=0;u<i;++u){const i=s*u,c=Math.floor(i),l=Math.min(Math.ceil(i),r-1);for(let r=0;r<n;++r){const s=o*r,f=s%1,h=Math.floor(s),d=Math.min(Math.ceil(s),e-1),p=t[c*e+h],y=t[c*e+d],g=t[l*e+h],m=t[l*e+d],b=G(G(p,y,f),G(g,m,f),i%1);a[u*n+r]=b}}return a})}(t,e,r,n,i);default:throw new Error(`Unsupported resampling method: \'${o}\'`)}}function z(t,e,r,n,i,o,s="nearest"){switch(s.toLowerCase()){case"nearest":return function(t,e,r,n,i,o){const s=e/n,a=r/i,u=B(t,n,i,o);for(let c=0;c<i;++c){const i=Math.min(Math.round(a*c),r-1);for(let r=0;r<n;++r){const a=Math.min(Math.round(s*r),e-1);for(let s=0;s<o;++s){const l=t[i*e*o+a*o+s];u[c*n*o+r*o+s]=l}}}return u}(t,e,r,n,i,o);case"bilinear":case"linear":return function(t,e,r,n,i,o){const s=e/n,a=r/i,u=B(t,n,i,o);for(let c=0;c<i;++c){const i=a*c,l=Math.floor(i),f=Math.min(Math.ceil(i),r-1);for(let r=0;r<n;++r){const a=s*r,h=a%1,d=Math.floor(a),p=Math.min(Math.ceil(a),e-1);for(let s=0;s<o;++s){const a=t[l*e*o+d*o+s],y=t[l*e*o+p*o+s],g=t[f*e*o+d*o+s],m=t[f*e*o+p*o+s],b=G(G(a,y,h),G(g,m,h),i%1);u[c*n*o+r*o+s]=b}}}return u}(t,e,r,n,i,o);default:throw new Error(`Unsupported resampling method: \'${s}\'`)}}function H(t,e,r){let n=0;for(let i=e;i<r;++i)n+=t[i];return n}function W(t,e,r){switch(t){case 1:switch(e){case 8:return new Uint8Array(r);case 16:return new Uint16Array(r);case 32:return new Uint32Array(r)}break;case 2:switch(e){case 8:return new Int8Array(r);case 16:return new Int16Array(r);case 32:return new Int32Array(r)}break;case 3:switch(e){case 32:return new Float32Array(r);case 64:return new Float64Array(r)}}throw Error("Unsupported data format/bitsPerSample")}var V=class{constructor(t,e,r,n,i,o){this.fileDirectory=t,this.geoKeys=e,this.dataView=r,this.littleEndian=n,this.tiles=i?{}:null,this.isTiled=!t.StripOffsets;const s=t.PlanarConfiguration;if(this.planarConfiguration=void 0===s?1:s,1!==this.planarConfiguration&&2!==this.planarConfiguration)throw new Error("Invalid planar configuration.");this.source=o}getFileDirectory(){return this.fileDirectory}getGeoKeys(){return this.geoKeys}getWidth(){return this.fileDirectory.ImageWidth}getHeight(){return this.fileDirectory.ImageLength}getSamplesPerPixel(){return this.fileDirectory.SamplesPerPixel}getTileWidth(){return this.isTiled?this.fileDirectory.TileWidth:this.getWidth()}getTileHeight(){return this.isTiled?this.fileDirectory.TileLength:void 0!==this.fileDirectory.RowsPerStrip?Math.min(this.fileDirectory.RowsPerStrip,this.getHeight()):this.getHeight()}getBytesPerPixel(){let t=0;for(let e=0;e<this.fileDirectory.BitsPerSample.length;++e){const r=this.fileDirectory.BitsPerSample[e];if(r%8!=0)throw new Error(`Sample bit-width of ${r} is not supported.`);if(r!==this.fileDirectory.BitsPerSample[0])throw new Error("Differing size of samples in a pixel are not supported.");t+=r}return t/8}getSampleByteSize(t){if(t>=this.fileDirectory.BitsPerSample.length)throw new RangeError(`Sample index ${t} is out of range.`);const e=this.fileDirectory.BitsPerSample[t];if(e%8!=0)throw new Error(`Sample bit-width of ${e} is not supported.`);return e/8}getReaderForSample(t){const e=this.fileDirectory.SampleFormat?this.fileDirectory.SampleFormat[t]:1,r=this.fileDirectory.BitsPerSample[t];switch(e){case 1:switch(r){case 8:return DataView.prototype.getUint8;case 16:return DataView.prototype.getUint16;case 32:return DataView.prototype.getUint32}break;case 2:switch(r){case 8:return DataView.prototype.getInt8;case 16:return DataView.prototype.getInt16;case 32:return DataView.prototype.getInt32}break;case 3:switch(r){case 32:return DataView.prototype.getFloat32;case 64:return DataView.prototype.getFloat64}}throw Error("Unsupported data format/bitsPerSample")}getArrayForSample(t,e){return W(this.fileDirectory.SampleFormat?this.fileDirectory.SampleFormat[t]:1,this.fileDirectory.BitsPerSample[t],e)}async getTileOrStrip(t,e,r,n){const i=Math.ceil(this.getWidth()/this.getTileWidth()),o=Math.ceil(this.getHeight()/this.getTileHeight());let s;const{tiles:a}=this;let u,c;1===this.planarConfiguration?s=e*i+t:2===this.planarConfiguration&&(s=r*i*o+e*i+t),this.isTiled?(u=this.fileDirectory.TileOffsets[s],c=this.fileDirectory.TileByteCounts[s]):(u=this.fileDirectory.StripOffsets[s],c=this.fileDirectory.StripByteCounts[s]);const l=await this.source.fetch(u,c);let f;return null===a?f=n.decode(this.fileDirectory,l):a[s]||(f=n.decode(this.fileDirectory,l),a[s]=f),{x:t,y:e,sample:r,data:await f}}async _readRaster(t,e,r,n,i,o,s,a){const u=this.getTileWidth(),c=this.getTileHeight(),l=Math.max(Math.floor(t[0]/u),0),f=Math.min(Math.ceil(t[2]/u),Math.ceil(this.getWidth()/this.getTileWidth())),h=Math.max(Math.floor(t[1]/c),0),d=Math.min(Math.ceil(t[3]/c),Math.ceil(this.getHeight()/this.getTileHeight())),p=t[2]-t[0];let y=this.getBytesPerPixel();const g=[],m=[];for(let t=0;t<e.length;++t)1===this.planarConfiguration?g.push(H(this.fileDirectory.BitsPerSample,0,e[t])/8):g.push(0),m.push(this.getReaderForSample(e[t]));const b=[],{littleEndian:v}=this;for(let o=h;o<d;++o)for(let s=l;s<f;++s)for(let a=0;a<e.length;++a){const l=a,f=e[a];2===this.planarConfiguration&&(y=this.getSampleByteSize(f));const h=this.getTileOrStrip(s,o,f,i);b.push(h),h.then(i=>{const o=i.data,s=new DataView(o),a=i.y*c,f=i.x*u,h=(i.y+1)*c,d=(i.x+1)*u,b=m[l],w=Math.min(c,c-(h-t[3])),x=Math.min(u,u-(d-t[2]));for(let i=Math.max(0,t[1]-a);i<w;++i)for(let o=Math.max(0,t[0]-f);o<x;++o){const c=(i*u+o)*y,h=b.call(s,c+g[l],v);let d;n?(d=(i+a-t[1])*p*e.length+(o+f-t[0])*e.length+l,r[d]=h):(d=(i+a-t[1])*p+o+f-t[0],r[l][d]=h)}})}if(await Promise.all(b),o&&t[2]-t[0]!==o||s&&t[3]-t[1]!==s){let i;return i=n?z(r,t[2]-t[0],t[3]-t[1],o,s,e.length,a):q(r,t[2]-t[0],t[3]-t[1],o,s,a),i.width=o,i.height=s,i}return r.width=o||t[2]-t[0],r.height=s||t[3]-t[1],r}async readRasters({window:t,samples:e=[],interleave:r,pool:n=null,width:i,height:o,resampleMethod:s,fillValue:a}={}){const u=t||[0,0,this.getWidth(),this.getHeight()];if(u[0]>u[2]||u[1]>u[3])throw new Error("Invalid subsets");const c=(u[2]-u[0])*(u[3]-u[1]);if(e&&e.length){for(let t=0;t<e.length;++t)if(e[t]>=this.fileDirectory.SamplesPerPixel)return Promise.reject(new RangeError(`Invalid sample index \'${e[t]}\'.`))}else for(let t=0;t<this.fileDirectory.SamplesPerPixel;++t)e.push(t);let l;if(r){l=W(this.fileDirectory.SampleFormat?Math.max.apply(null,this.fileDirectory.SampleFormat):1,Math.max.apply(null,this.fileDirectory.BitsPerSample),c*e.length),a&&l.fill(a)}else{l=[];for(let t=0;t<e.length;++t){const r=this.getArrayForSample(e[t],c);Array.isArray(a)&&t<a.length?r.fill(a[t]):a&&!Array.isArray(a)&&r.fill(a),l.push(r)}}const f=n||U(this.fileDirectory);return await this._readRaster(u,e,l,r,f,i,o,s)}async readRGB({window:t,pool:e=null,width:r,height:n,resampleMethod:i,enableAlpha:o=!1}={}){const s=t||[0,0,this.getWidth(),this.getHeight()];if(s[0]>s[2]||s[1]>s[3])throw new Error("Invalid subsets");const a=this.fileDirectory.PhotometricInterpretation;if(a===d.RGB){let i=[0,1,2];if(this.fileDirectory.ExtraSamples!==p.Unspecified&&o){i=[];for(let t=0;t<this.fileDirectory.BitsPerSample.length;t+=1)i.push(t)}return this.readRasters({window:t,interleave:!0,samples:i,pool:e,width:r,height:n})}let u;switch(a){case d.WhiteIsZero:case d.BlackIsZero:case d.Palette:u=[0];break;case d.CMYK:u=[0,1,2,3];break;case d.YCbCr:case d.CIELab:u=[0,1,2];break;default:throw new Error("Invalid or unsupported photometric interpretation.")}const c={window:s,interleave:!0,samples:u,pool:e,width:r,height:n,resampleMethod:i},{fileDirectory:l}=this,f=await this.readRasters(c),h=2**this.fileDirectory.BitsPerSample[0];let y;switch(a){case d.WhiteIsZero:y=m(f,h);break;case d.BlackIsZero:y=b(f,h);break;case d.Palette:y=v(f,l.ColorMap);break;case d.CMYK:y=w(f);break;case d.YCbCr:y=x(f);break;case d.CIELab:y=_(f);break;default:throw new Error("Unsupported photometric interpretation.")}return y.width=f.width,y.height=f.height,y}getTiePoints(){if(!this.fileDirectory.ModelTiepoint)return[];const t=[];for(let e=0;e<this.fileDirectory.ModelTiepoint.length;e+=6)t.push({i:this.fileDirectory.ModelTiepoint[e],j:this.fileDirectory.ModelTiepoint[e+1],k:this.fileDirectory.ModelTiepoint[e+2],x:this.fileDirectory.ModelTiepoint[e+3],y:this.fileDirectory.ModelTiepoint[e+4],z:this.fileDirectory.ModelTiepoint[e+5]});return t}getGDALMetadata(t=null){const e={};if(!this.fileDirectory.GDAL_METADATA)return null;const r=this.fileDirectory.GDAL_METADATA,n=s()(r.substring(0,r.length-1));if(!n[0].tagName)throw new Error("Failed to parse GDAL metadata XML.");const i=n[0];if("GDALMetadata"!==i.tagName)throw new Error("Unexpected GDAL metadata XML tag.");let o=i.children.filter(t=>"Item"===t.tagName);t&&(o=o.filter(e=>Number(e.attributes.sample)===t));for(let t=0;t<o.length;++t){const r=o[t];e[r.attributes.name]=r.children[0]}return e}getGDALNoData(){if(!this.fileDirectory.GDAL_NODATA)return null;const t=this.fileDirectory.GDAL_NODATA;return Number(t.substring(0,t.length-1))}getOrigin(){const t=this.fileDirectory.ModelTiepoint,e=this.fileDirectory.ModelTransformation;if(t&&6===t.length)return[t[3],t[4],t[5]];if(e)return[e[3],e[7],e[11]];throw new Error("The image does not have an affine transformation.")}getResolution(t=null){const e=this.fileDirectory.ModelPixelScale,r=this.fileDirectory.ModelTransformation;if(e)return[e[0],-e[1],e[2]];if(r)return[r[0],r[5],r[10]];if(t){const[e,r,n]=t.getResolution();return[e*t.getWidth()/this.getWidth(),r*t.getHeight()/this.getHeight(),n*t.getWidth()/this.getWidth()]}throw new Error("The image does not have an affine transformation.")}pixelIsArea(){return 1===this.geoKeys.GTRasterTypeGeoKey}getBoundingBox(){const t=this.getOrigin(),e=this.getResolution(),r=t[0],n=t[1],i=r+e[0]*this.getWidth(),o=n+e[1]*this.getHeight();return[Math.min(r,i),Math.min(n,o),Math.max(r,i),Math.max(n,o)]}};class K{constructor(t){this._dataView=new DataView(t)}get buffer(){return this._dataView.buffer}getUint64(t,e){const r=this.getUint32(t,e),n=this.getUint32(t+4,e);let i;if(e){if(i=r+2**32*n,!Number.isSafeInteger(i))throw new Error(i+" exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");return i}if(i=2**32*r+n,!Number.isSafeInteger(i))throw new Error(i+" exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");return i}getInt64(t,e){let r=0;const n=(128&this._dataView.getUint8(t+(e?7:0)))>0;let i=!0;for(let o=0;o<8;o++){let s=this._dataView.getUint8(t+(e?o:7-o));n&&(i?0!==s&&(s=255&~(s-1),i=!1):s=255&~s),r+=s*256**o}return n&&(r=-r),r}getUint8(t,e){return this._dataView.getUint8(t,e)}getInt8(t,e){return this._dataView.getInt8(t,e)}getUint16(t,e){return this._dataView.getUint16(t,e)}getInt16(t,e){return this._dataView.getInt16(t,e)}getUint32(t,e){return this._dataView.getUint32(t,e)}getInt32(t,e){return this._dataView.getInt32(t,e)}getFloat32(t,e){return this._dataView.getFloat32(t,e)}getFloat64(t,e){return this._dataView.getFloat64(t,e)}}class ${constructor(t,e,r,n){this._dataView=new DataView(t),this._sliceOffset=e,this._littleEndian=r,this._bigTiff=n}get sliceOffset(){return this._sliceOffset}get sliceTop(){return this._sliceOffset+this.buffer.byteLength}get littleEndian(){return this._littleEndian}get bigTiff(){return this._bigTiff}get buffer(){return this._dataView.buffer}covers(t,e){return this.sliceOffset<=t&&this.sliceTop>=t+e}readUint8(t){return this._dataView.getUint8(t-this._sliceOffset,this._littleEndian)}readInt8(t){return this._dataView.getInt8(t-this._sliceOffset,this._littleEndian)}readUint16(t){return this._dataView.getUint16(t-this._sliceOffset,this._littleEndian)}readInt16(t){return this._dataView.getInt16(t-this._sliceOffset,this._littleEndian)}readUint32(t){return this._dataView.getUint32(t-this._sliceOffset,this._littleEndian)}readInt32(t){return this._dataView.getInt32(t-this._sliceOffset,this._littleEndian)}readFloat32(t){return this._dataView.getFloat32(t-this._sliceOffset,this._littleEndian)}readFloat64(t){return this._dataView.getFloat64(t-this._sliceOffset,this._littleEndian)}readUint64(t){const e=this.readUint32(t),r=this.readUint32(t+4);let n;if(this._littleEndian){if(n=e+2**32*r,!Number.isSafeInteger(n))throw new Error(n+" exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");return n}if(n=2**32*e+r,!Number.isSafeInteger(n))throw new Error(n+" exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues");return n}readInt64(t){let e=0;const r=(128&this._dataView.getUint8(t+(this._littleEndian?7:0)))>0;let n=!0;for(let i=0;i<8;i++){let o=this._dataView.getUint8(t+(this._littleEndian?i:7-i));r&&(n?0!==o&&(o=255&~(o-1),n=!1):o=255&~o),e+=o*256**i}return r&&(e=-e),e}readOffset(t){return this._bigTiff?this.readUint64(t):this.readUint32(t)}}var Y=r(68),Z=r(9),X=r(25),Q=r(40),J=r.n(Q),tt=r(105),et=r.n(tt),rt=r(39),nt=r.n(rt);class it{constructor(t,{blockSize:e=65536}={}){this.retrievalFunction=t,this.blockSize=e,this.blockRequests=new Map,this.blocks=new Map,this.blockIdsAwaitingRequest=null}async fetch(t,e,r=!1){const n=t+e,i=[],o=[],s=[];for(let e=Math.floor(t/this.blockSize)*this.blockSize;e<n;e+=this.blockSize){const t=Math.floor(e/this.blockSize);this.blocks.has(t)||this.blockRequests.has(t)||o.push(t),this.blockRequests.has(t)&&s.push(this.blockRequests.get(t)),i.push(t)}if(this.blockIdsAwaitingRequest)for(let t=0;t<o.length;++t){const e=o[t];this.blockIdsAwaitingRequest.add(e)}else this.blockIdsAwaitingRequest=new Set(o);if(r||await async function(t){return new Promise(e=>setTimeout(e,t))}(),this.blockIdsAwaitingRequest){const t=function(t){if(0===t.length)return[];const e=[];let r=[];e.push(r);for(let n=0;n<t.length;++n)0===n||t[n]===t[n-1]+1?r.push(t[n]):(r=[t[n]],e.push(r));return e}(Array.from(this.blockIdsAwaitingRequest).sort());for(const e of t){const t=this.requestData(e[0]*this.blockSize,e.length*this.blockSize);for(let r=0;r<e.length;++r){const n=e[r];this.blockRequests.set(n,(async()=>{const e=await t,i=r*this.blockSize,o=Math.min(i+this.blockSize,e.data.byteLength),s=e.data.slice(i,o);this.blockRequests.delete(n),this.blocks.set(n,{data:s,offset:e.offset+i,length:s.byteLength,top:e.offset+o})})())}}this.blockIdsAwaitingRequest=null}const a=[];for(const t of o)this.blockRequests.has(t)&&a.push(this.blockRequests.get(t));await Promise.all(a),await Promise.all(s);return function(t,e,r){const n=e+r,i=new ArrayBuffer(r),o=new Uint8Array(i);for(const r of t){const t=r.offset-e,i=r.top-n;let s,a=0,u=0;t<0?a=-t:t>0&&(u=t),s=i<0?r.length-a:n-r.offset-a;const c=new Uint8Array(r.data,a,s);o.set(c,u)}return i}(i.map(t=>this.blocks.get(t)),t,e)}async requestData(t,e){const r=await this.retrievalFunction(t,e);return r.length?r.length!==r.data.byteLength&&(r.data=r.data.slice(0,r.length)):r.length=r.data.byteLength,r.top=r.offset+r.length,r}}function ot(t,e){const{forceXHR:r}=e;if("function"==typeof fetch&&!r)return function(t,{headers:e={},blockSize:r}={}){return new it(async(r,n)=>{const i=await fetch(t,{headers:{...e,Range:`bytes=${r}-${r+n-1}`}});if(i.ok){if(206===i.status){return{data:i.arrayBuffer?await i.arrayBuffer():(await i.buffer()).buffer,offset:r,length:n}}{const t=i.arrayBuffer?await i.arrayBuffer():(await i.buffer()).buffer;return{data:t,offset:0,length:t.byteLength}}}throw new Error("Error fetching data.")},{blockSize:r})}(t,e);if("undefined"!=typeof XMLHttpRequest)return function(t,{headers:e={},blockSize:r}={}){return new it(async(r,n)=>new Promise((i,o)=>{const s=new XMLHttpRequest;s.open("GET",t),s.responseType="arraybuffer";const a={...e,Range:`bytes=${r}-${r+n-1}`};for(const[t,e]of Object.entries(a))s.setRequestHeader(t,e);s.onload=()=>{const t=s.response;206===s.status?i({data:t,offset:r,length:n}):i({data:t,offset:0,length:t.byteLength})},s.onerror=o,s.send()}),{blockSize:r})}(t,e);if(J.a.get)return function(t,{headers:e={},blockSize:r}={}){return new it(async(r,n)=>new Promise((i,o)=>{const s=nt.a.parse(t);("http:"===s.protocol?J.a:et.a).get({...s,headers:{...e,Range:`bytes=${r}-${r+n-1}`}},t=>{const e=[];t.on("data",t=>{e.push(t)}),t.on("end",()=>{const t=Z.Buffer.concat(e).buffer;i({data:t,offset:r,length:t.byteLength})})}).on("error",o)}),{blockSize:r})}(t,e);throw new Error("No remote source available")}function st(t){const e=function(t,e,r){return new Promise((n,i)=>{Object(X.open)(t,e,r,(t,e)=>{t?i(t):n(e)})})}(t,"r");return{async fetch(t,r){const n=await e,{buffer:i}=await function(...t){return new Promise((e,r)=>{Object(X.read)(...t,(t,n,i)=>{t?r(t):e({bytesRead:n,buffer:i})})})}(n,Z.Buffer.alloc(r),0,r,t);return i.buffer},async close(){const t=await e;return await function(t){return new Promise((e,r)=>{Object(X.close)(t,t=>{t?r(t):e()})})}(t)}}}function at(t,e){for(const r in e)e.hasOwnProperty(r)&&(t[r]=e[r])}function ut(t,e){if(t.length<e.length)return!1;return t.substr(t.length-e.length)===e}function ct(t){const e={};for(const r in t)if(t.hasOwnProperty(r)){e[t[r]]=r}return e}function lt(t,e){const r=[];for(let n=0;n<t;n++)r.push(e(n));return r}const ft=ct(a),ht=ct(y),dt={};at(dt,ft),at(dt,ht);const pt=ct(f),yt={nextZero:(t,e)=>{let r=e;for(;0!==t[r];)r++;return r},readUshort:(t,e)=>t[e]<<8|t[e+1],readShort:(t,e)=>{const r=yt.ui8;return r[0]=t[e+1],r[1]=t[e+0],yt.i16[0]},readInt:(t,e)=>{const r=yt.ui8;return r[0]=t[e+3],r[1]=t[e+2],r[2]=t[e+1],r[3]=t[e+0],yt.i32[0]},readUint:(t,e)=>{const r=yt.ui8;return r[0]=t[e+3],r[1]=t[e+2],r[2]=t[e+1],r[3]=t[e+0],yt.ui32[0]},readASCII:(t,e,r)=>r.map(r=>String.fromCharCode(t[e+r])).join(""),readFloat:(t,e)=>{const r=yt.ui8;return lt(4,n=>{r[n]=t[e+3-n]}),yt.fl32[0]},readDouble:(t,e)=>{const r=yt.ui8;return lt(8,n=>{r[n]=t[e+7-n]}),yt.fl64[0]},writeUshort:(t,e,r)=>{t[e]=r>>8&255,t[e+1]=255&r},writeUint:(t,e,r)=>{t[e]=r>>24&255,t[e+1]=r>>16&255,t[e+2]=r>>8&255,t[e+3]=r>>0&255},writeASCII:(t,e,r)=>{lt(r.length,n=>{t[e+n]=r.charCodeAt(n)})},ui8:new Uint8Array(8)};yt.fl64=new Float64Array(yt.ui8.buffer),yt.writeDouble=(t,e,r)=>{yt.fl64[0]=r,lt(8,r=>{t[e+r]=yt.ui8[7-r]})};const gt=t=>{const e=new Uint8Array(1e3);let r=4;const n=yt;e[0]=77,e[1]=77,e[3]=42;let i=8;if(n.writeUint(e,r,i),r+=4,t.forEach((r,o)=>{const s=((t,e,r,n)=>{let i=r;const o=Object.keys(n).filter(t=>null!=t&&"undefined"!==t);t.writeUshort(e,i,o.length),i+=2;let s=i+12*o.length+4;for(const r of o){let o=null;"number"==typeof r?o=r:"string"==typeof r&&(o=parseInt(r,10));const a=c[o],u=pt[a];if(null==a||void 0===a||void 0===a)throw new Error("unknown type of tag: "+o);let l=n[r];if(void 0===l)throw new Error("failed to get value for key "+r);"ASCII"===a&&"string"==typeof l&&!1===ut(l,"\\0")&&(l+="\\0");const f=l.length;t.writeUshort(e,i,o),i+=2,t.writeUshort(e,i,u),i+=2,t.writeUint(e,i,f),i+=4;let h=[-1,1,1,2,4,8,0,0,0,0,0,0,8][u]*f,d=i;h>4&&(t.writeUint(e,i,s),d=s),"ASCII"===a?t.writeASCII(e,d,l):"SHORT"===a?lt(f,r=>{t.writeUshort(e,d+2*r,l[r])}):"LONG"===a?lt(f,r=>{t.writeUint(e,d+4*r,l[r])}):"RATIONAL"===a?lt(f,r=>{t.writeUint(e,d+8*r,Math.round(1e4*l[r])),t.writeUint(e,d+8*r+4,1e4)}):"DOUBLE"===a&&lt(f,r=>{t.writeDouble(e,d+8*r,l[r])}),h>4&&(h+=1&h,s+=h),i+=4}return[i,s]})(n,e,i,r);i=s[1],o<t.length-1&&n.writeUint(e,s[0],i)}),e.slice)return e.slice(0,i).buffer;const o=new Uint8Array(i);for(let t=0;t<i;t++)o[t]=e[t];return o.buffer},mt=[["Compression",1],["PlanarConfiguration",1],["XPosition",0],["YPosition",0],["ResolutionUnit",1],["ExtraSamples",0],["GeoAsciiParams","WGS 84\\0"],["ModelTiepoint",[0,0,0,-180,90,0]],["GTModelTypeGeoKey",2],["GTRasterTypeGeoKey",1],["GeographicTypeGeoKey",4326],["GeogCitationGeoKey","WGS 84"]];function bt(t,e){let r,n,i,o;"number"==typeof t[0]?(r=e.height||e.ImageLength,i=e.width||e.ImageWidth,n=t.length/(r*i),o=t):(n=t.length,r=t[0].length,i=t[0][0].length,o=[],lt(r,e=>{lt(i,r=>{lt(n,n=>{o.push(t[n][e][r])})})})),e.ImageLength=r,delete e.height,e.ImageWidth=i,delete e.width,e.BitsPerSample||(e.BitsPerSample=lt(n,()=>8)),mt.forEach(t=>{const r=t[0];if(!e[r]){const n=t[1];e[r]=n}}),e.PhotometricInterpretation||(e.PhotometricInterpretation=3===e.BitsPerSample.length?2:1),e.SamplesPerPixel||(e.SamplesPerPixel=[n]),e.StripByteCounts||(e.StripByteCounts=[n*r*i]),e.ModelPixelScale||(e.ModelPixelScale=[360/i,180/r,0]),e.SampleFormat||(e.SampleFormat=lt(n,()=>1));const s=Object.keys(e).filter(t=>ut(t,"GeoKey")).sort((t,e)=>dt[t]-dt[e]);if(!e.GeoKeyDirectory){const t=[1,1,0,s.length];s.forEach(r=>{const n=Number(dt[r]);let i,o,s;t.push(n),"SHORT"===c[n]?(i=1,o=0,s=e[r]):"GeogCitationGeoKey"===r?(i=e.GeoAsciiParams.length,o=Number(dt.GeoAsciiParams),s=0):console.log("[geotiff.js] couldn\'t get TIFFTagLocation for "+r),t.push(o),t.push(i),t.push(s)}),e.GeoKeyDirectory=t}for(const t in s)s.hasOwnProperty(t)&&delete e[t];["Compression","ExtraSamples","GeographicTypeGeoKey","GTModelTypeGeoKey","GTRasterTypeGeoKey","ImageLength","ImageWidth","PhotometricInterpretation","PlanarConfiguration","ResolutionUnit","SamplesPerPixel","XPosition","YPosition"].forEach(t=>{var r;e[t]&&(e[t]=(r=e[t],Array.isArray(r)?r:[r]))});const a=(t=>{const e={};for(const r in t)"StripOffsets"!==r&&(dt[r]||console.error(r,"not in name2code:",Object.keys(dt)),e[dt[r]]=t[r]);return e})(e);return((t,e,r,n)=>{if(null==r)throw new Error("you passed into encodeImage a width of type "+r);if(null==e)throw new Error("you passed into encodeImage a width of type "+e);const i={256:[e],257:[r],273:[1e3],278:[r],305:"geotiff.js"};if(n)for(const t in n)n.hasOwnProperty(t)&&(i[t]=n[t]);const o=new Uint8Array(gt([i])),s=new Uint8Array(t),a=i[277],u=new Uint8Array(1e3+e*r*a);return lt(o.length,t=>{u[t]=o[t]}),function(t,e){const{length:r}=t;for(let n=0;n<r;n++)e(t[n],n)}(s,(t,e)=>{u[1e3+e]=t}),u.buffer})(o,i,r,a)}class vt{log(){}info(){}warn(){}error(){}time(){}timeEnd(){}}let wt=new vt;function xt(t=new vt){wt=t}function _t(t){switch(t){case h.BYTE:case h.ASCII:case h.SBYTE:case h.UNDEFINED:return 1;case h.SHORT:case h.SSHORT:return 2;case h.LONG:case h.SLONG:case h.FLOAT:case h.IFD:return 4;case h.RATIONAL:case h.SRATIONAL:case h.DOUBLE:case h.LONG8:case h.SLONG8:case h.IFD8:return 8;default:throw new RangeError("Invalid field type: "+t)}}function St(t,e,r,n){let i=null,o=null;const s=_t(e);switch(e){case h.BYTE:case h.ASCII:case h.UNDEFINED:i=new Uint8Array(r),o=t.readUint8;break;case h.SBYTE:i=new Int8Array(r),o=t.readInt8;break;case h.SHORT:i=new Uint16Array(r),o=t.readUint16;break;case h.SSHORT:i=new Int16Array(r),o=t.readInt16;break;case h.LONG:case h.IFD:i=new Uint32Array(r),o=t.readUint32;break;case h.SLONG:i=new Int32Array(r),o=t.readInt32;break;case h.LONG8:case h.IFD8:i=new Array(r),o=t.readUint64;break;case h.SLONG8:i=new Array(r),o=t.readInt64;break;case h.RATIONAL:i=new Uint32Array(2*r),o=t.readUint32;break;case h.SRATIONAL:i=new Int32Array(2*r),o=t.readInt32;break;case h.FLOAT:i=new Float32Array(r),o=t.readFloat32;break;case h.DOUBLE:i=new Float64Array(r),o=t.readFloat64;break;default:throw new RangeError("Invalid field type: "+e)}if(e!==h.RATIONAL&&e!==h.SRATIONAL)for(let e=0;e<r;++e)i[e]=o.call(t,n+e*s);else for(let e=0;e<r;e+=2)i[e]=o.call(t,n+e*s),i[e+1]=o.call(t,n+(e*s+4));return e===h.ASCII?String.fromCharCode.apply(null,i):i}class At{constructor(t,e,r){this.fileDirectory=t,this.geoKeyDirectory=e,this.nextIFDByteOffset=r}}class Et extends Error{constructor(t){super("No image at index "+t),this.index=t}}class kt{async readRasters(t={}){const{window:e,width:r,height:n}=t;let{resX:i,resY:o,bbox:s}=t;const a=await this.getImage();let u=a;const c=await this.getImageCount(),l=a.getBoundingBox();if(e&&s)throw new Error(\'Both "bbox" and "window" passed.\');if(r||n){if(e){const[t,r]=a.getOrigin(),[n,i]=a.getResolution();s=[t+e[0]*n,r+e[1]*i,t+e[2]*n,r+e[3]*i]}const t=s||l;if(r){if(i)throw new Error("Both width and resX passed");i=(t[2]-t[0])/r}if(n){if(o)throw new Error("Both width and resY passed");o=(t[3]-t[1])/n}}if(i||o){const t=[];for(let e=0;e<c;++e){const r=await this.getImage(e),{SubfileType:n,NewSubfileType:i}=r.fileDirectory;(0===e||2===n||1&i)&&t.push(r)}t.sort((t,e)=>t.getWidth()-e.getWidth());for(let e=0;e<t.length;++e){const r=t[e],n=(l[2]-l[0])/r.getWidth(),s=(l[3]-l[1])/r.getHeight();if(u=r,i&&i>n||o&&o>s)break}}let f=e;if(s){const[t,e]=a.getOrigin(),[r,n]=u.getResolution(a);f=[Math.round((s[0]-t)/r),Math.round((s[1]-e)/n),Math.round((s[2]-t)/r),Math.round((s[3]-e)/n)],f=[Math.min(f[0],f[2]),Math.min(f[1],f[3]),Math.max(f[0],f[2]),Math.max(f[1],f[3])]}return u.readRasters({...t,window:f})}}class Tt extends kt{constructor(t,e,r,n,i={}){super(),this.source=t,this.littleEndian=e,this.bigTiff=r,this.firstIFDOffset=n,this.cache=i.cache||!1,this.ifdRequests=[],this.ghostValues=null}async getSlice(t,e){const r=this.bigTiff?4048:1024;return new $(await this.source.fetch(t,void 0!==e?e:r),t,this.littleEndian,this.bigTiff)}async parseFileDirectoryAt(t){const e=this.bigTiff?20:12,r=this.bigTiff?8:2;let n=await this.getSlice(t);const i=this.bigTiff?n.readUint64(t):n.readUint16(t),o=i*e+(this.bigTiff?16:6);n.covers(t,o)||(n=await this.getSlice(t,o));const s={};let u=t+(this.bigTiff?8:2);for(let t=0;t<i;u+=e,++t){const t=n.readUint16(u),e=n.readUint16(u+2),r=this.bigTiff?n.readUint64(u+4):n.readUint32(u+4);let i,o;const c=_t(e),f=u+(this.bigTiff?12:8);if(c*r<=(this.bigTiff?8:4))i=St(n,e,r,f);else{const t=n.readOffset(f),o=_t(e)*r;if(n.covers(t,o))i=St(n,e,r,t);else{i=St(await this.getSlice(t,o),e,r,t)}}o=1===r&&-1===l.indexOf(t)&&e!==h.RATIONAL&&e!==h.SRATIONAL?i[0]:i,s[a[t]]=o}const c=function(t){const e=t.GeoKeyDirectory;if(!e)return null;const r={};for(let n=4;n<=4*e[3];n+=4){const i=y[e[n]],o=e[n+1]?a[e[n+1]]:null,s=e[n+2],u=e[n+3];let c=null;if(o){if(c=t[o],null==c)throw new Error(`Could not get value of geoKey \'${i}\'.`);"string"==typeof c?c=c.substring(u,u+s-1):c.subarray&&(c=c.subarray(u,u+s),1===s&&(c=c[0]))}else c=u;r[i]=c}return r}(s),f=n.readOffset(t+r+e*i);return new At(s,c,f)}async requestIFD(t){if(this.ifdRequests[t])return this.ifdRequests[t];if(0===t)return this.ifdRequests[t]=this.parseFileDirectoryAt(this.firstIFDOffset),this.ifdRequests[t];if(!this.ifdRequests[t-1])try{this.ifdRequests[t-1]=this.requestIFD(t-1)}catch(e){if(e instanceof Et)throw new Et(t);throw e}return this.ifdRequests[t]=(async()=>{const e=await this.ifdRequests[t-1];if(0===e.nextIFDByteOffset)throw new Et(t);return this.parseFileDirectoryAt(e.nextIFDByteOffset)})(),this.ifdRequests[t]}async getImage(t=0){const e=await this.requestIFD(t);return new V(e.fileDirectory,e.geoKeyDirectory,this.dataView,this.littleEndian,this.cache,this.source)}async getImageCount(){let t=0,e=!0;for(;e;)try{await this.requestIFD(t),++t}catch(t){if(!(t instanceof Et))throw t;e=!1}return t}async getGhostValues(){const t=this.bigTiff?16:8;if(this.ghostValues)return this.ghostValues;const e="GDAL_STRUCTURAL_METADATA_SIZE=",r=e.length+100;let n=await this.getSlice(t,r);if(e===St(n,h.ASCII,e.length,t)){const e=St(n,h.ASCII,r,t).split("\\n")[0],i=Number(e.split("=")[1].split(" ")[0])+e.length;i>r&&(n=await this.getSlice(t,i));const o=St(n,h.ASCII,i,t);this.ghostValues={},o.split("\\n").filter(t=>t.length>0).map(t=>t.split("=")).forEach(([t,e])=>{this.ghostValues[t]=e})}return this.ghostValues}static async fromSource(t,e){const r=await t.fetch(0,1024),n=new K(r),i=n.getUint16(0,0);let o;if(18761===i)o=!0;else{if(19789!==i)throw new TypeError("Invalid byte order value.");o=!1}const s=n.getUint16(2,o);let a;if(42===s)a=!1;else{if(43!==s)throw new TypeError("Invalid magic number.");a=!0;if(8!==n.getUint16(4,o))throw new Error("Unsupported offset byte-size.")}const u=a?n.getUint64(8,o):n.getUint32(4,o);return new Tt(t,o,a,u,e)}close(){return"function"==typeof this.source.close&&this.source.close()}}e.default=Tt;class Ct extends kt{constructor(t,e){super(),this.mainFile=t,this.overviewFiles=e,this.imageFiles=[t].concat(e),this.fileDirectoriesPerFile=null,this.fileDirectoriesPerFileParsing=null,this.imageCount=null}async parseFileDirectoriesPerFile(){const t=[this.mainFile.parseFileDirectoryAt(this.mainFile.firstIFDOffset)].concat(this.overviewFiles.map(t=>t.parseFileDirectoryAt(t.firstIFDOffset)));return this.fileDirectoriesPerFile=await Promise.all(t),this.fileDirectoriesPerFile}async getImage(t=0){await this.getImageCount(),await this.parseFileDirectoriesPerFile();let e=0,r=0;for(let n=0;n<this.imageFiles.length;n++){const i=this.imageFiles[n];for(let o=0;o<this.imageCounts[n];o++){if(t===e){const t=await i.requestIFD(r);return new V(t.fileDirectory,i.geoKeyDirectory,i.dataView,i.littleEndian,i.cache,i.source)}e++,r++}r=0}throw new RangeError("Invalid image index")}async getImageCount(){if(null!==this.imageCount)return this.imageCount;const t=[this.mainFile.getImageCount()].concat(this.overviewFiles.map(t=>t.getImageCount()));return this.imageCounts=await Promise.all(t),this.imageCount=this.imageCounts.reduce((t,e)=>t+e,0),this.imageCount}}async function Ot(t,e={}){return Tt.fromSource(ot(t,e))}async function It(t){return Tt.fromSource(function(t){return{fetch:async(e,r)=>t.slice(e,e+r)}}(t))}async function Pt(t){return Tt.fromSource(st(t))}async function Rt(t){return Tt.fromSource((e=t,{fetch:async(t,r)=>new Promise((n,i)=>{const o=e.slice(t,t+r),s=new FileReader;s.onload=t=>n(t.target.result),s.onerror=i,s.readAsArrayBuffer(o)})}));var e}async function jt(t,e=[],r={}){const n=await Tt.fromSource(ot(t,r)),i=await Promise.all(e.map(t=>Tt.fromSource(ot(t,r))));return new Ct(n,i)}async function Mt(t,e){return bt(t,e)}},function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(19);Object(n.b)().blob;const i=Object(n.b)().default},,,function(t,e,r){"use strict";var n=r(26),i=r(102);var o=function(t){"function"==typeof t?t():t&&"function"==typeof t.unsubscribe&&t.unsubscribe()};e.a=function(t){const e=new i.a;let r,s=0;return new n.a(n=>{r||(r=t.subscribe(e));const i=e.subscribe(n);return s++,()=>{s--,i.unsubscribe(),0===s&&(o(r),r=void 0)}})}}]);', null);
        };
      }, function(t, e, r) {
        var n = window.URL || window.webkitURL;
        t.exports = function(t2, e2) {
          try {
            try {
              var r2;
              try {
                (r2 = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)()).append(t2), r2 = r2.getBlob();
              } catch (e3) {
                r2 = new Blob([t2]);
              }
              return new Worker(n.createObjectURL(r2));
            } catch (e3) {
              return new Worker("data:application/javascript," + encodeURIComponent(t2));
            }
          } catch (t3) {
            if (!e2) throw Error("Inline worker is not supported");
            return new Worker(e2);
          }
        };
      }, function(t, e, r) {
        Object.defineProperty(e, "__esModule", { value: true });
        var n = function(t2, e2) {
          if (Array.isArray(t2)) return t2;
          if (Symbol.iterator in Object(t2)) return (function(t3, e3) {
            var r2 = [], n2 = true, i2 = false, o2 = void 0;
            try {
              for (var s2, a2 = t3[Symbol.iterator](); !(n2 = (s2 = a2.next()).done) && (r2.push(s2.value), !e3 || r2.length !== e3); n2 = true) ;
            } catch (t4) {
              i2 = true, o2 = t4;
            } finally {
              try {
                !n2 && a2.return && a2.return();
              } finally {
                if (i2) throw o2;
              }
            }
            return r2;
          })(t2, e2);
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
          return typeof t2;
        } : function(t2) {
          return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
        };
        e.default = function(t2, e2) {
          return new Promise((function(r2, o2) {
            try {
              e2 && console.log("starting parseData with", t2), e2 && console.log("	GeoTIFF:", "undefined" == typeof GeoTIFF ? "undefined" : i(GeoTIFF));
              var u2 = {}, c2 = void 0, h = void 0;
              if ("object" === t2.rasterType) u2.values = t2.data, u2.height = c2 = t2.metadata.height || u2.values[0].length, u2.width = h = t2.metadata.width || u2.values[0][0].length, u2.pixelHeight = t2.metadata.pixelHeight, u2.pixelWidth = t2.metadata.pixelWidth, u2.projection = t2.metadata.projection, u2.xmin = t2.metadata.xmin, u2.ymax = t2.metadata.ymax, u2.noDataValue = t2.metadata.noDataValue, u2.numberOfRasters = u2.values.length, u2.xmax = u2.xmin + u2.width * u2.pixelWidth, u2.ymin = u2.ymax - u2.height * u2.pixelHeight, u2._data = null, r2(f(u2));
              else if ("geotiff" === t2.rasterType) {
                u2._data = t2.data;
                var d = s.fromArrayBuffer;
                "url" === t2.sourceType ? d = s.fromUrl : "Blob" === t2.sourceType && (d = s.fromBlob), e2 && console.log("data.rasterType is geotiff"), r2(d(t2.data).then((function(r3) {
                  return e2 && console.log("geotiff:", r3), r3.getImage().then((function(r4) {
                    try {
                      e2 && console.log("image:", r4);
                      var i2 = r4.fileDirectory, s2 = r4.getGeoKeys() || {}, d2 = s2.GeographicTypeGeoKey, p = s2.ProjectedCSTypeGeoKey;
                      u2.projection = p || d2 || t2.metadata.projection, e2 && console.log("projection:", u2.projection), u2.height = c2 = r4.getHeight(), e2 && console.log("result.height:", u2.height), u2.width = h = r4.getWidth(), e2 && console.log("result.width:", u2.width);
                      var y = r4.getResolution(), g = n(y, 2), m = g[0], b = g[1];
                      u2.pixelHeight = Math.abs(b), u2.pixelWidth = Math.abs(m);
                      var v = r4.getOrigin(), w = n(v, 2), x = w[0], _ = w[1];
                      return u2.xmin = x, u2.xmax = u2.xmin + h * u2.pixelWidth, u2.ymax = _, u2.ymin = u2.ymax - c2 * u2.pixelHeight, u2.noDataValue = i2.GDAL_NODATA ? parseFloat(i2.GDAL_NODATA) : null, u2.numberOfRasters = i2.SamplesPerPixel, i2.ColorMap && (u2.palette = (0, a.getPalette)(r4)), "url" !== t2.sourceType ? r4.readRasters().then((function(t3) {
                        return u2.values = t3.map((function(t4) {
                          return (0, l.unflatten)(t4, { height: c2, width: h });
                        })), f(u2);
                      })) : u2;
                    } catch (t3) {
                      o2(t3), console.error("[georaster] error parsing georaster:", t3);
                    }
                  }));
                })));
              }
            } catch (t3) {
              o2(t3), console.error("[georaster] error parsing georaster:", t3);
            }
          }));
        };
        var o, s = r(100), a = r(155), u = r(156), c = (o = u) && o.__esModule ? o : { default: o }, l = r(99);
        function f(t2) {
          var e2 = (0, c.default)(t2.values, { height: t2.height, layout: "[band][row][column]", noData: t2.noDataValue, precise: false, stats: ["max", "min", "range"], width: t2.width });
          return t2.maxs = e2.bands.map((function(t3) {
            return t3.max;
          })), t2.mins = e2.bands.map((function(t3) {
            return t3.min;
          })), t2.ranges = e2.bands.map((function(t3) {
            return t3.range;
          })), t2;
        }
      }, function(t, e, r) {
        (function(e2) {
          var n = r(42).Transform, i = r(10);
          function o(t2) {
            n.call(this, t2), this._destroyed = false;
          }
          function s(t2, e3, r2) {
            r2(null, t2);
          }
          function a(t2) {
            return function(e3, r2, n2) {
              return "function" == typeof e3 && (n2 = r2, r2 = e3, e3 = {}), "function" != typeof r2 && (r2 = s), "function" != typeof n2 && (n2 = null), t2(e3, r2, n2);
            };
          }
          i(o, n), o.prototype.destroy = function(t2) {
            if (!this._destroyed) {
              this._destroyed = true;
              var r2 = this;
              e2.nextTick((function() {
                t2 && r2.emit("error", t2), r2.emit("close");
              }));
            }
          }, t.exports = a((function(t2, e3, r2) {
            var n2 = new o(t2);
            return n2._transform = e3, r2 && (n2._flush = r2), n2;
          })), t.exports.ctor = a((function(t2, e3, r2) {
            function n2(e4) {
              if (!(this instanceof n2)) return new n2(e4);
              this.options = Object.assign({}, t2, e4), o.call(this, this.options);
            }
            return i(n2, o), n2.prototype._transform = e3, r2 && (n2.prototype._flush = r2), n2;
          })), t.exports.obj = a((function(t2, e3, r2) {
            var n2 = new o(Object.assign({ objectMode: true, highWaterMark: 16 }, t2));
            return n2._transform = e3, r2 && (n2._flush = r2), n2;
          }));
        }).call(this, r(8));
      }, function(t, e) {
      }, function(t, e, r) {
        var n = r(43).Buffer, i = r(117);
        t.exports = (function() {
          function t2() {
            !(function(t3, e2) {
              if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
            })(this, t2), this.head = null, this.tail = null, this.length = 0;
          }
          return t2.prototype.push = function(t3) {
            var e2 = { data: t3, next: null };
            this.length > 0 ? this.tail.next = e2 : this.head = e2, this.tail = e2, ++this.length;
          }, t2.prototype.unshift = function(t3) {
            var e2 = { data: t3, next: this.head };
            0 === this.length && (this.tail = e2), this.head = e2, ++this.length;
          }, t2.prototype.shift = function() {
            if (0 !== this.length) {
              var t3 = this.head.data;
              return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t3;
            }
          }, t2.prototype.clear = function() {
            this.head = this.tail = null, this.length = 0;
          }, t2.prototype.join = function(t3) {
            if (0 === this.length) return "";
            for (var e2 = this.head, r2 = "" + e2.data; e2 = e2.next; ) r2 += t3 + e2.data;
            return r2;
          }, t2.prototype.concat = function(t3) {
            if (0 === this.length) return n.alloc(0);
            for (var e2, r2, i2, o = n.allocUnsafe(t3 >>> 0), s = this.head, a = 0; s; ) e2 = s.data, r2 = o, i2 = a, e2.copy(r2, i2), a += s.data.length, s = s.next;
            return o;
          }, t2;
        })(), i && i.inspect && i.inspect.custom && (t.exports.prototype[i.inspect.custom] = function() {
          var t2 = i.inspect({ length: this.length });
          return this.constructor.name + " " + t2;
        });
      }, function(t, e) {
      }, function(t, e, r) {
        (function(t2) {
          var n = void 0 !== t2 && t2 || "undefined" != typeof self && self || window, i = Function.prototype.apply;
          function o(t3, e2) {
            this._id = t3, this._clearFn = e2;
          }
          e.setTimeout = function() {
            return new o(i.call(setTimeout, n, arguments), clearTimeout);
          }, e.setInterval = function() {
            return new o(i.call(setInterval, n, arguments), clearInterval);
          }, e.clearTimeout = e.clearInterval = function(t3) {
            t3 && t3.close();
          }, o.prototype.unref = o.prototype.ref = function() {
          }, o.prototype.close = function() {
            this._clearFn.call(n, this._id);
          }, e.enroll = function(t3, e2) {
            clearTimeout(t3._idleTimeoutId), t3._idleTimeout = e2;
          }, e.unenroll = function(t3) {
            clearTimeout(t3._idleTimeoutId), t3._idleTimeout = -1;
          }, e._unrefActive = e.active = function(t3) {
            clearTimeout(t3._idleTimeoutId);
            var e2 = t3._idleTimeout;
            e2 >= 0 && (t3._idleTimeoutId = setTimeout((function() {
              t3._onTimeout && t3._onTimeout();
            }), e2));
          }, r(119), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t2 && t2.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t2 && t2.clearImmediate || this && this.clearImmediate;
        }).call(this, r(3));
      }, function(t, e, r) {
        (function(t2, e2) {
          !(function(t3, r2) {
            if (!t3.setImmediate) {
              var n, i, o, s, a, u = 1, c = {}, l = false, f = t3.document, h = Object.getPrototypeOf && Object.getPrototypeOf(t3);
              h = h && h.setTimeout ? h : t3, "[object process]" === {}.toString.call(t3.process) ? n = function(t4) {
                e2.nextTick((function() {
                  p(t4);
                }));
              } : !(function() {
                if (t3.postMessage && !t3.importScripts) {
                  var e3 = true, r3 = t3.onmessage;
                  return t3.onmessage = function() {
                    e3 = false;
                  }, t3.postMessage("", "*"), t3.onmessage = r3, e3;
                }
              })() ? t3.MessageChannel ? ((o = new MessageChannel()).port1.onmessage = function(t4) {
                p(t4.data);
              }, n = function(t4) {
                o.port2.postMessage(t4);
              }) : f && "onreadystatechange" in f.createElement("script") ? (i = f.documentElement, n = function(t4) {
                var e3 = f.createElement("script");
                e3.onreadystatechange = function() {
                  p(t4), e3.onreadystatechange = null, i.removeChild(e3), e3 = null;
                }, i.appendChild(e3);
              }) : n = function(t4) {
                setTimeout(p, 0, t4);
              } : (s = "setImmediate$" + Math.random() + "$", a = function(e3) {
                e3.source === t3 && "string" == typeof e3.data && 0 === e3.data.indexOf(s) && p(+e3.data.slice(s.length));
              }, t3.addEventListener ? t3.addEventListener("message", a, false) : t3.attachEvent("onmessage", a), n = function(e3) {
                t3.postMessage(s + e3, "*");
              }), h.setImmediate = function(t4) {
                "function" != typeof t4 && (t4 = new Function("" + t4));
                for (var e3 = new Array(arguments.length - 1), r3 = 0; r3 < e3.length; r3++) e3[r3] = arguments[r3 + 1];
                var i2 = { callback: t4, args: e3 };
                return c[u] = i2, n(u), u++;
              }, h.clearImmediate = d;
            }
            function d(t4) {
              delete c[t4];
            }
            function p(t4) {
              if (l) setTimeout(p, 0, t4);
              else {
                var e3 = c[t4];
                if (e3) {
                  l = true;
                  try {
                    !(function(t5) {
                      var e4 = t5.callback, r3 = t5.args;
                      switch (r3.length) {
                        case 0:
                          e4();
                          break;
                        case 1:
                          e4(r3[0]);
                          break;
                        case 2:
                          e4(r3[0], r3[1]);
                          break;
                        case 3:
                          e4(r3[0], r3[1], r3[2]);
                          break;
                        default:
                          e4.apply(void 0, r3);
                      }
                    })(e3);
                  } finally {
                    d(t4), l = false;
                  }
                }
              }
            }
          })("undefined" == typeof self ? void 0 === t2 ? this : t2 : self);
        }).call(this, r(3), r(8));
      }, function(t, e, r) {
        (function(e2) {
          function r2(t2) {
            try {
              if (!e2.localStorage) return false;
            } catch (t3) {
              return false;
            }
            var r3 = e2.localStorage[t2];
            return null != r3 && "true" === String(r3).toLowerCase();
          }
          t.exports = function(t2, e3) {
            if (r2("noDeprecation")) return t2;
            var n = false;
            return function() {
              if (!n) {
                if (r2("throwDeprecation")) throw new Error(e3);
                r2("traceDeprecation") ? console.trace(e3) : console.warn(e3), n = true;
              }
              return t2.apply(this, arguments);
            };
          };
        }).call(this, r(3));
      }, function(t, e, r) {
        var n = r(7), i = n.Buffer;
        function o(t2, e2) {
          for (var r2 in t2) e2[r2] = t2[r2];
        }
        function s(t2, e2, r2) {
          return i(t2, e2, r2);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, e), e.Buffer = s), o(i, s), s.from = function(t2, e2, r2) {
          if ("number" == typeof t2) throw new TypeError("Argument must not be a number");
          return i(t2, e2, r2);
        }, s.alloc = function(t2, e2, r2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          var n2 = i(t2);
          return void 0 !== e2 ? "string" == typeof r2 ? n2.fill(e2, r2) : n2.fill(e2) : n2.fill(0), n2;
        }, s.allocUnsafe = function(t2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          return i(t2);
        }, s.allocUnsafeSlow = function(t2) {
          if ("number" != typeof t2) throw new TypeError("Argument must be a number");
          return n.SlowBuffer(t2);
        };
      }, function(t, e, r) {
        t.exports = o;
        var n = r(67), i = Object.create(r(21));
        function o(t2) {
          if (!(this instanceof o)) return new o(t2);
          n.call(this, t2);
        }
        i.inherits = r(10), i.inherits(o, n), o.prototype._transform = function(t2, e2, r2) {
          r2(null, t2);
        };
      }, function(t, e, r) {
        var n = r(29), i = r(124), o = r(125), s = r(126), a = r(127);
        function u(t2) {
          return (t2 >>> 24 & 255) + (t2 >>> 8 & 65280) + ((65280 & t2) << 8) + ((255 & t2) << 24);
        }
        function c() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new n.Buf16(320), this.work = new n.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function l(t2) {
          var e2;
          return t2 && t2.state ? (e2 = t2.state, t2.total_in = t2.total_out = e2.total = 0, t2.msg = "", e2.wrap && (t2.adler = 1 & e2.wrap), e2.mode = 1, e2.last = 0, e2.havedict = 0, e2.dmax = 32768, e2.head = null, e2.hold = 0, e2.bits = 0, e2.lencode = e2.lendyn = new n.Buf32(852), e2.distcode = e2.distdyn = new n.Buf32(592), e2.sane = 1, e2.back = -1, 0) : -2;
        }
        function f(t2) {
          var e2;
          return t2 && t2.state ? ((e2 = t2.state).wsize = 0, e2.whave = 0, e2.wnext = 0, l(t2)) : -2;
        }
        function h(t2, e2) {
          var r2, n2;
          return t2 && t2.state ? (n2 = t2.state, e2 < 0 ? (r2 = 0, e2 = -e2) : (r2 = 1 + (e2 >> 4), e2 < 48 && (e2 &= 15)), e2 && (e2 < 8 || e2 > 15) ? -2 : (null !== n2.window && n2.wbits !== e2 && (n2.window = null), n2.wrap = r2, n2.wbits = e2, f(t2))) : -2;
        }
        function d(t2, e2) {
          var r2, n2;
          return t2 ? (n2 = new c(), t2.state = n2, n2.window = null, 0 !== (r2 = h(t2, e2)) && (t2.state = null), r2) : -2;
        }
        var p, y, g = true;
        function m(t2) {
          if (g) {
            var e2;
            for (p = new n.Buf32(512), y = new n.Buf32(32), e2 = 0; e2 < 144; ) t2.lens[e2++] = 8;
            for (; e2 < 256; ) t2.lens[e2++] = 9;
            for (; e2 < 280; ) t2.lens[e2++] = 7;
            for (; e2 < 288; ) t2.lens[e2++] = 8;
            for (a(1, t2.lens, 0, 288, p, 0, t2.work, { bits: 9 }), e2 = 0; e2 < 32; ) t2.lens[e2++] = 5;
            a(2, t2.lens, 0, 32, y, 0, t2.work, { bits: 5 }), g = false;
          }
          t2.lencode = p, t2.lenbits = 9, t2.distcode = y, t2.distbits = 5;
        }
        function b(t2, e2, r2, i2) {
          var o2, s2 = t2.state;
          return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new n.Buf8(s2.wsize)), i2 >= s2.wsize ? (n.arraySet(s2.window, e2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : ((o2 = s2.wsize - s2.wnext) > i2 && (o2 = i2), n.arraySet(s2.window, e2, r2 - i2, o2, s2.wnext), (i2 -= o2) ? (n.arraySet(s2.window, e2, r2 - i2, i2, 0), s2.wnext = i2, s2.whave = s2.wsize) : (s2.wnext += o2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += o2))), 0;
        }
        e.inflateReset = f, e.inflateReset2 = h, e.inflateResetKeep = l, e.inflateInit = function(t2) {
          return d(t2, 15);
        }, e.inflateInit2 = d, e.inflate = function(t2, e2) {
          var r2, c2, l2, f2, h2, d2, p2, y2, g2, v, w, x, _, S, A, E, k, T, O, C, P, I, R, j, M = 0, L = new n.Buf8(4), F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!t2 || !t2.state || !t2.output || !t2.input && 0 !== t2.avail_in) return -2;
          12 === (r2 = t2.state).mode && (r2.mode = 13), h2 = t2.next_out, l2 = t2.output, p2 = t2.avail_out, f2 = t2.next_in, c2 = t2.input, d2 = t2.avail_in, y2 = r2.hold, g2 = r2.bits, v = d2, w = p2, I = 0;
          t: for (; ; ) switch (r2.mode) {
            case 1:
              if (0 === r2.wrap) {
                r2.mode = 13;
                break;
              }
              for (; g2 < 16; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if (2 & r2.wrap && 35615 === y2) {
                r2.check = 0, L[0] = 255 & y2, L[1] = y2 >>> 8 & 255, r2.check = o(r2.check, L, 2, 0), y2 = 0, g2 = 0, r2.mode = 2;
                break;
              }
              if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & y2) << 8) + (y2 >> 8)) % 31) {
                t2.msg = "incorrect header check", r2.mode = 30;
                break;
              }
              if (8 != (15 & y2)) {
                t2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (g2 -= 4, P = 8 + (15 & (y2 >>>= 4)), 0 === r2.wbits) r2.wbits = P;
              else if (P > r2.wbits) {
                t2.msg = "invalid window size", r2.mode = 30;
                break;
              }
              r2.dmax = 1 << P, t2.adler = r2.check = 1, r2.mode = 512 & y2 ? 10 : 12, y2 = 0, g2 = 0;
              break;
            case 2:
              for (; g2 < 16; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if (r2.flags = y2, 8 != (255 & r2.flags)) {
                t2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (57344 & r2.flags) {
                t2.msg = "unknown header flags set", r2.mode = 30;
                break;
              }
              r2.head && (r2.head.text = y2 >> 8 & 1), 512 & r2.flags && (L[0] = 255 & y2, L[1] = y2 >>> 8 & 255, r2.check = o(r2.check, L, 2, 0)), y2 = 0, g2 = 0, r2.mode = 3;
            case 3:
              for (; g2 < 32; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              r2.head && (r2.head.time = y2), 512 & r2.flags && (L[0] = 255 & y2, L[1] = y2 >>> 8 & 255, L[2] = y2 >>> 16 & 255, L[3] = y2 >>> 24 & 255, r2.check = o(r2.check, L, 4, 0)), y2 = 0, g2 = 0, r2.mode = 4;
            case 4:
              for (; g2 < 16; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              r2.head && (r2.head.xflags = 255 & y2, r2.head.os = y2 >> 8), 512 & r2.flags && (L[0] = 255 & y2, L[1] = y2 >>> 8 & 255, r2.check = o(r2.check, L, 2, 0)), y2 = 0, g2 = 0, r2.mode = 5;
            case 5:
              if (1024 & r2.flags) {
                for (; g2 < 16; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                r2.length = y2, r2.head && (r2.head.extra_len = y2), 512 & r2.flags && (L[0] = 255 & y2, L[1] = y2 >>> 8 & 255, r2.check = o(r2.check, L, 2, 0)), y2 = 0, g2 = 0;
              } else r2.head && (r2.head.extra = null);
              r2.mode = 6;
            case 6:
              if (1024 & r2.flags && ((x = r2.length) > d2 && (x = d2), x && (r2.head && (P = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), n.arraySet(r2.head.extra, c2, f2, x, P)), 512 & r2.flags && (r2.check = o(r2.check, c2, x, f2)), d2 -= x, f2 += x, r2.length -= x), r2.length)) break t;
              r2.length = 0, r2.mode = 7;
            case 7:
              if (2048 & r2.flags) {
                if (0 === d2) break t;
                x = 0;
                do {
                  P = c2[f2 + x++], r2.head && P && r2.length < 65536 && (r2.head.name += String.fromCharCode(P));
                } while (P && x < d2);
                if (512 & r2.flags && (r2.check = o(r2.check, c2, x, f2)), d2 -= x, f2 += x, P) break t;
              } else r2.head && (r2.head.name = null);
              r2.length = 0, r2.mode = 8;
            case 8:
              if (4096 & r2.flags) {
                if (0 === d2) break t;
                x = 0;
                do {
                  P = c2[f2 + x++], r2.head && P && r2.length < 65536 && (r2.head.comment += String.fromCharCode(P));
                } while (P && x < d2);
                if (512 & r2.flags && (r2.check = o(r2.check, c2, x, f2)), d2 -= x, f2 += x, P) break t;
              } else r2.head && (r2.head.comment = null);
              r2.mode = 9;
            case 9:
              if (512 & r2.flags) {
                for (; g2 < 16; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                if (y2 !== (65535 & r2.check)) {
                  t2.msg = "header crc mismatch", r2.mode = 30;
                  break;
                }
                y2 = 0, g2 = 0;
              }
              r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), t2.adler = r2.check = 0, r2.mode = 12;
              break;
            case 10:
              for (; g2 < 32; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              t2.adler = r2.check = u(y2), y2 = 0, g2 = 0, r2.mode = 11;
            case 11:
              if (0 === r2.havedict) return t2.next_out = h2, t2.avail_out = p2, t2.next_in = f2, t2.avail_in = d2, r2.hold = y2, r2.bits = g2, 2;
              t2.adler = r2.check = 1, r2.mode = 12;
            case 12:
              if (5 === e2 || 6 === e2) break t;
            case 13:
              if (r2.last) {
                y2 >>>= 7 & g2, g2 -= 7 & g2, r2.mode = 27;
                break;
              }
              for (; g2 < 3; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              switch (r2.last = 1 & y2, g2 -= 1, 3 & (y2 >>>= 1)) {
                case 0:
                  r2.mode = 14;
                  break;
                case 1:
                  if (m(r2), r2.mode = 20, 6 === e2) {
                    y2 >>>= 2, g2 -= 2;
                    break t;
                  }
                  break;
                case 2:
                  r2.mode = 17;
                  break;
                case 3:
                  t2.msg = "invalid block type", r2.mode = 30;
              }
              y2 >>>= 2, g2 -= 2;
              break;
            case 14:
              for (y2 >>>= 7 & g2, g2 -= 7 & g2; g2 < 32; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if ((65535 & y2) != (y2 >>> 16 ^ 65535)) {
                t2.msg = "invalid stored block lengths", r2.mode = 30;
                break;
              }
              if (r2.length = 65535 & y2, y2 = 0, g2 = 0, r2.mode = 15, 6 === e2) break t;
            case 15:
              r2.mode = 16;
            case 16:
              if (x = r2.length) {
                if (x > d2 && (x = d2), x > p2 && (x = p2), 0 === x) break t;
                n.arraySet(l2, c2, f2, x, h2), d2 -= x, f2 += x, p2 -= x, h2 += x, r2.length -= x;
                break;
              }
              r2.mode = 12;
              break;
            case 17:
              for (; g2 < 14; ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if (r2.nlen = 257 + (31 & y2), y2 >>>= 5, g2 -= 5, r2.ndist = 1 + (31 & y2), y2 >>>= 5, g2 -= 5, r2.ncode = 4 + (15 & y2), y2 >>>= 4, g2 -= 4, r2.nlen > 286 || r2.ndist > 30) {
                t2.msg = "too many length or distance symbols", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 18;
            case 18:
              for (; r2.have < r2.ncode; ) {
                for (; g2 < 3; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                r2.lens[F[r2.have++]] = 7 & y2, y2 >>>= 3, g2 -= 3;
              }
              for (; r2.have < 19; ) r2.lens[F[r2.have++]] = 0;
              if (r2.lencode = r2.lendyn, r2.lenbits = 7, R = { bits: r2.lenbits }, I = a(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, R), r2.lenbits = R.bits, I) {
                t2.msg = "invalid code lengths set", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 19;
            case 19:
              for (; r2.have < r2.nlen + r2.ndist; ) {
                for (; E = (M = r2.lencode[y2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, k = 65535 & M, !((A = M >>> 24) <= g2); ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                if (k < 16) y2 >>>= A, g2 -= A, r2.lens[r2.have++] = k;
                else {
                  if (16 === k) {
                    for (j = A + 2; g2 < j; ) {
                      if (0 === d2) break t;
                      d2--, y2 += c2[f2++] << g2, g2 += 8;
                    }
                    if (y2 >>>= A, g2 -= A, 0 === r2.have) {
                      t2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    P = r2.lens[r2.have - 1], x = 3 + (3 & y2), y2 >>>= 2, g2 -= 2;
                  } else if (17 === k) {
                    for (j = A + 3; g2 < j; ) {
                      if (0 === d2) break t;
                      d2--, y2 += c2[f2++] << g2, g2 += 8;
                    }
                    g2 -= A, P = 0, x = 3 + (7 & (y2 >>>= A)), y2 >>>= 3, g2 -= 3;
                  } else {
                    for (j = A + 7; g2 < j; ) {
                      if (0 === d2) break t;
                      d2--, y2 += c2[f2++] << g2, g2 += 8;
                    }
                    g2 -= A, P = 0, x = 11 + (127 & (y2 >>>= A)), y2 >>>= 7, g2 -= 7;
                  }
                  if (r2.have + x > r2.nlen + r2.ndist) {
                    t2.msg = "invalid bit length repeat", r2.mode = 30;
                    break;
                  }
                  for (; x--; ) r2.lens[r2.have++] = P;
                }
              }
              if (30 === r2.mode) break;
              if (0 === r2.lens[256]) {
                t2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                break;
              }
              if (r2.lenbits = 9, R = { bits: r2.lenbits }, I = a(1, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, R), r2.lenbits = R.bits, I) {
                t2.msg = "invalid literal/lengths set", r2.mode = 30;
                break;
              }
              if (r2.distbits = 6, r2.distcode = r2.distdyn, R = { bits: r2.distbits }, I = a(2, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, R), r2.distbits = R.bits, I) {
                t2.msg = "invalid distances set", r2.mode = 30;
                break;
              }
              if (r2.mode = 20, 6 === e2) break t;
            case 20:
              r2.mode = 21;
            case 21:
              if (d2 >= 6 && p2 >= 258) {
                t2.next_out = h2, t2.avail_out = p2, t2.next_in = f2, t2.avail_in = d2, r2.hold = y2, r2.bits = g2, s(t2, w), h2 = t2.next_out, l2 = t2.output, p2 = t2.avail_out, f2 = t2.next_in, c2 = t2.input, d2 = t2.avail_in, y2 = r2.hold, g2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                break;
              }
              for (r2.back = 0; E = (M = r2.lencode[y2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, k = 65535 & M, !((A = M >>> 24) <= g2); ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if (E && 0 == (240 & E)) {
                for (T = A, O = E, C = k; E = (M = r2.lencode[C + ((y2 & (1 << T + O) - 1) >> T)]) >>> 16 & 255, k = 65535 & M, !(T + (A = M >>> 24) <= g2); ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                y2 >>>= T, g2 -= T, r2.back += T;
              }
              if (y2 >>>= A, g2 -= A, r2.back += A, r2.length = k, 0 === E) {
                r2.mode = 26;
                break;
              }
              if (32 & E) {
                r2.back = -1, r2.mode = 12;
                break;
              }
              if (64 & E) {
                t2.msg = "invalid literal/length code", r2.mode = 30;
                break;
              }
              r2.extra = 15 & E, r2.mode = 22;
            case 22:
              if (r2.extra) {
                for (j = r2.extra; g2 < j; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                r2.length += y2 & (1 << r2.extra) - 1, y2 >>>= r2.extra, g2 -= r2.extra, r2.back += r2.extra;
              }
              r2.was = r2.length, r2.mode = 23;
            case 23:
              for (; E = (M = r2.distcode[y2 & (1 << r2.distbits) - 1]) >>> 16 & 255, k = 65535 & M, !((A = M >>> 24) <= g2); ) {
                if (0 === d2) break t;
                d2--, y2 += c2[f2++] << g2, g2 += 8;
              }
              if (0 == (240 & E)) {
                for (T = A, O = E, C = k; E = (M = r2.distcode[C + ((y2 & (1 << T + O) - 1) >> T)]) >>> 16 & 255, k = 65535 & M, !(T + (A = M >>> 24) <= g2); ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                y2 >>>= T, g2 -= T, r2.back += T;
              }
              if (y2 >>>= A, g2 -= A, r2.back += A, 64 & E) {
                t2.msg = "invalid distance code", r2.mode = 30;
                break;
              }
              r2.offset = k, r2.extra = 15 & E, r2.mode = 24;
            case 24:
              if (r2.extra) {
                for (j = r2.extra; g2 < j; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                r2.offset += y2 & (1 << r2.extra) - 1, y2 >>>= r2.extra, g2 -= r2.extra, r2.back += r2.extra;
              }
              if (r2.offset > r2.dmax) {
                t2.msg = "invalid distance too far back", r2.mode = 30;
                break;
              }
              r2.mode = 25;
            case 25:
              if (0 === p2) break t;
              if (x = w - p2, r2.offset > x) {
                if ((x = r2.offset - x) > r2.whave && r2.sane) {
                  t2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                x > r2.wnext ? (x -= r2.wnext, _ = r2.wsize - x) : _ = r2.wnext - x, x > r2.length && (x = r2.length), S = r2.window;
              } else S = l2, _ = h2 - r2.offset, x = r2.length;
              x > p2 && (x = p2), p2 -= x, r2.length -= x;
              do {
                l2[h2++] = S[_++];
              } while (--x);
              0 === r2.length && (r2.mode = 21);
              break;
            case 26:
              if (0 === p2) break t;
              l2[h2++] = r2.length, p2--, r2.mode = 21;
              break;
            case 27:
              if (r2.wrap) {
                for (; g2 < 32; ) {
                  if (0 === d2) break t;
                  d2--, y2 |= c2[f2++] << g2, g2 += 8;
                }
                if (w -= p2, t2.total_out += w, r2.total += w, w && (t2.adler = r2.check = r2.flags ? o(r2.check, l2, w, h2 - w) : i(r2.check, l2, w, h2 - w)), w = p2, (r2.flags ? y2 : u(y2)) !== r2.check) {
                  t2.msg = "incorrect data check", r2.mode = 30;
                  break;
                }
                y2 = 0, g2 = 0;
              }
              r2.mode = 28;
            case 28:
              if (r2.wrap && r2.flags) {
                for (; g2 < 32; ) {
                  if (0 === d2) break t;
                  d2--, y2 += c2[f2++] << g2, g2 += 8;
                }
                if (y2 !== (4294967295 & r2.total)) {
                  t2.msg = "incorrect length check", r2.mode = 30;
                  break;
                }
                y2 = 0, g2 = 0;
              }
              r2.mode = 29;
            case 29:
              I = 1;
              break t;
            case 30:
              I = -3;
              break t;
            case 31:
              return -4;
            case 32:
            default:
              return -2;
          }
          return t2.next_out = h2, t2.avail_out = p2, t2.next_in = f2, t2.avail_in = d2, r2.hold = y2, r2.bits = g2, (r2.wsize || w !== t2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== e2)) && b(t2, t2.output, t2.next_out, w - t2.avail_out) ? (r2.mode = 31, -4) : (v -= t2.avail_in, w -= t2.avail_out, t2.total_in += v, t2.total_out += w, r2.total += w, r2.wrap && w && (t2.adler = r2.check = r2.flags ? o(r2.check, l2, w, t2.next_out - w) : i(r2.check, l2, w, t2.next_out - w)), t2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 === v && 0 === w || 4 === e2) && 0 === I && (I = -5), I);
        }, e.inflateEnd = function(t2) {
          if (!t2 || !t2.state) return -2;
          var e2 = t2.state;
          return e2.window && (e2.window = null), t2.state = null, 0;
        }, e.inflateGetHeader = function(t2, e2) {
          var r2;
          return t2 && t2.state ? 0 == (2 & (r2 = t2.state).wrap) ? -2 : (r2.head = e2, e2.done = false, 0) : -2;
        }, e.inflateSetDictionary = function(t2, e2) {
          var r2, n2 = e2.length;
          return t2 && t2.state ? 0 !== (r2 = t2.state).wrap && 11 !== r2.mode ? -2 : 11 === r2.mode && i(1, e2, n2, 0) !== r2.check ? -3 : b(t2, e2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, 0) : -2;
        }, e.inflateInfo = "pako inflate (from Nodeca project)";
      }, function(t, e, r) {
        t.exports = function(t2, e2, r2, n) {
          for (var i = 65535 & t2 | 0, o = t2 >>> 16 & 65535 | 0, s = 0; 0 !== r2; ) {
            r2 -= s = r2 > 2e3 ? 2e3 : r2;
            do {
              o = o + (i = i + e2[n++] | 0) | 0;
            } while (--s);
            i %= 65521, o %= 65521;
          }
          return i | o << 16 | 0;
        };
      }, function(t, e, r) {
        var n = (function() {
          for (var t2, e2 = [], r2 = 0; r2 < 256; r2++) {
            t2 = r2;
            for (var n2 = 0; n2 < 8; n2++) t2 = 1 & t2 ? 3988292384 ^ t2 >>> 1 : t2 >>> 1;
            e2[r2] = t2;
          }
          return e2;
        })();
        t.exports = function(t2, e2, r2, i) {
          var o = n, s = i + r2;
          t2 ^= -1;
          for (var a = i; a < s; a++) t2 = t2 >>> 8 ^ o[255 & (t2 ^ e2[a])];
          return -1 ^ t2;
        };
      }, function(t, e, r) {
        t.exports = function(t2, e2) {
          var r2, n, i, o, s, a, u, c, l, f, h, d, p, y, g, m, b, v, w, x, _, S, A, E, k;
          r2 = t2.state, n = t2.next_in, E = t2.input, i = n + (t2.avail_in - 5), o = t2.next_out, k = t2.output, s = o - (e2 - t2.avail_out), a = o + (t2.avail_out - 257), u = r2.dmax, c = r2.wsize, l = r2.whave, f = r2.wnext, h = r2.window, d = r2.hold, p = r2.bits, y = r2.lencode, g = r2.distcode, m = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
          t: do {
            p < 15 && (d += E[n++] << p, p += 8, d += E[n++] << p, p += 8), v = y[d & m];
            e: for (; ; ) {
              if (d >>>= w = v >>> 24, p -= w, 0 === (w = v >>> 16 & 255)) k[o++] = 65535 & v;
              else {
                if (!(16 & w)) {
                  if (0 == (64 & w)) {
                    v = y[(65535 & v) + (d & (1 << w) - 1)];
                    continue e;
                  }
                  if (32 & w) {
                    r2.mode = 12;
                    break t;
                  }
                  t2.msg = "invalid literal/length code", r2.mode = 30;
                  break t;
                }
                x = 65535 & v, (w &= 15) && (p < w && (d += E[n++] << p, p += 8), x += d & (1 << w) - 1, d >>>= w, p -= w), p < 15 && (d += E[n++] << p, p += 8, d += E[n++] << p, p += 8), v = g[d & b];
                r: for (; ; ) {
                  if (d >>>= w = v >>> 24, p -= w, !(16 & (w = v >>> 16 & 255))) {
                    if (0 == (64 & w)) {
                      v = g[(65535 & v) + (d & (1 << w) - 1)];
                      continue r;
                    }
                    t2.msg = "invalid distance code", r2.mode = 30;
                    break t;
                  }
                  if (_ = 65535 & v, p < (w &= 15) && (d += E[n++] << p, (p += 8) < w && (d += E[n++] << p, p += 8)), (_ += d & (1 << w) - 1) > u) {
                    t2.msg = "invalid distance too far back", r2.mode = 30;
                    break t;
                  }
                  if (d >>>= w, p -= w, _ > (w = o - s)) {
                    if ((w = _ - w) > l && r2.sane) {
                      t2.msg = "invalid distance too far back", r2.mode = 30;
                      break t;
                    }
                    if (S = 0, A = h, 0 === f) {
                      if (S += c - w, w < x) {
                        x -= w;
                        do {
                          k[o++] = h[S++];
                        } while (--w);
                        S = o - _, A = k;
                      }
                    } else if (f < w) {
                      if (S += c + f - w, (w -= f) < x) {
                        x -= w;
                        do {
                          k[o++] = h[S++];
                        } while (--w);
                        if (S = 0, f < x) {
                          x -= w = f;
                          do {
                            k[o++] = h[S++];
                          } while (--w);
                          S = o - _, A = k;
                        }
                      }
                    } else if (S += f - w, w < x) {
                      x -= w;
                      do {
                        k[o++] = h[S++];
                      } while (--w);
                      S = o - _, A = k;
                    }
                    for (; x > 2; ) k[o++] = A[S++], k[o++] = A[S++], k[o++] = A[S++], x -= 3;
                    x && (k[o++] = A[S++], x > 1 && (k[o++] = A[S++]));
                  } else {
                    S = o - _;
                    do {
                      k[o++] = k[S++], k[o++] = k[S++], k[o++] = k[S++], x -= 3;
                    } while (x > 2);
                    x && (k[o++] = k[S++], x > 1 && (k[o++] = k[S++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (n < i && o < a);
          n -= x = p >> 3, d &= (1 << (p -= x << 3)) - 1, t2.next_in = n, t2.next_out = o, t2.avail_in = n < i ? i - n + 5 : 5 - (n - i), t2.avail_out = o < a ? a - o + 257 : 257 - (o - a), r2.hold = d, r2.bits = p;
        };
      }, function(t, e, r) {
        var n = r(29), i = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], a = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(t2, e2, r2, u, c, l, f, h) {
          var d, p, y, g, m, b, v, w, x, _ = h.bits, S = 0, A = 0, E = 0, k = 0, T = 0, O = 0, C = 0, P = 0, I = 0, R = 0, j = null, M = 0, L = new n.Buf16(16), F = new n.Buf16(16), N = null, D = 0;
          for (S = 0; S <= 15; S++) L[S] = 0;
          for (A = 0; A < u; A++) L[e2[r2 + A]]++;
          for (T = _, k = 15; k >= 1 && 0 === L[k]; k--) ;
          if (T > k && (T = k), 0 === k) return c[l++] = 20971520, c[l++] = 20971520, h.bits = 1, 0;
          for (E = 1; E < k && 0 === L[E]; E++) ;
          for (T < E && (T = E), P = 1, S = 1; S <= 15; S++) if (P <<= 1, (P -= L[S]) < 0) return -1;
          if (P > 0 && (0 === t2 || 1 !== k)) return -1;
          for (F[1] = 0, S = 1; S < 15; S++) F[S + 1] = F[S] + L[S];
          for (A = 0; A < u; A++) 0 !== e2[r2 + A] && (f[F[e2[r2 + A]]++] = A);
          if (0 === t2 ? (j = N = f, b = 19) : 1 === t2 ? (j = i, M -= 257, N = o, D -= 257, b = 256) : (j = s, N = a, b = -1), R = 0, A = 0, S = E, m = l, O = T, C = 0, y = -1, g = (I = 1 << T) - 1, 1 === t2 && I > 852 || 2 === t2 && I > 592) return 1;
          for (; ; ) {
            v = S - C, f[A] < b ? (w = 0, x = f[A]) : f[A] > b ? (w = N[D + f[A]], x = j[M + f[A]]) : (w = 96, x = 0), d = 1 << S - C, E = p = 1 << O;
            do {
              c[m + (R >> C) + (p -= d)] = v << 24 | w << 16 | x | 0;
            } while (0 !== p);
            for (d = 1 << S - 1; R & d; ) d >>= 1;
            if (0 !== d ? (R &= d - 1, R += d) : R = 0, A++, 0 == --L[S]) {
              if (S === k) break;
              S = e2[r2 + f[A]];
            }
            if (S > T && (R & g) !== y) {
              for (0 === C && (C = T), m += E, P = 1 << (O = S - C); O + C < k && !((P -= L[O + C]) <= 0); ) O++, P <<= 1;
              if (I += 1 << O, 1 === t2 && I > 852 || 2 === t2 && I > 592) return 1;
              c[y = R & g] = T << 24 | O << 16 | m - l | 0;
            }
          }
          return 0 !== R && (c[m + R] = S - C << 24 | 64 << 16 | 0), h.bits = T, 0;
        };
      }, function(t, e, r) {
        var n = r(29), i = true, o = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (t2) {
          i = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (t2) {
          o = false;
        }
        for (var s = new n.Buf8(256), a = 0; a < 256; a++) s[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
        function u(t2, e2) {
          if (e2 < 65534 && (t2.subarray && o || !t2.subarray && i)) return String.fromCharCode.apply(null, n.shrinkBuf(t2, e2));
          for (var r2 = "", s2 = 0; s2 < e2; s2++) r2 += String.fromCharCode(t2[s2]);
          return r2;
        }
        s[254] = s[254] = 1, e.string2buf = function(t2) {
          var e2, r2, i2, o2, s2, a2 = t2.length, u2 = 0;
          for (o2 = 0; o2 < a2; o2++) 55296 == (64512 & (r2 = t2.charCodeAt(o2))) && o2 + 1 < a2 && 56320 == (64512 & (i2 = t2.charCodeAt(o2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), o2++), u2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (e2 = new n.Buf8(u2), s2 = 0, o2 = 0; s2 < u2; o2++) 55296 == (64512 & (r2 = t2.charCodeAt(o2))) && o2 + 1 < a2 && 56320 == (64512 & (i2 = t2.charCodeAt(o2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), o2++), r2 < 128 ? e2[s2++] = r2 : r2 < 2048 ? (e2[s2++] = 192 | r2 >>> 6, e2[s2++] = 128 | 63 & r2) : r2 < 65536 ? (e2[s2++] = 224 | r2 >>> 12, e2[s2++] = 128 | r2 >>> 6 & 63, e2[s2++] = 128 | 63 & r2) : (e2[s2++] = 240 | r2 >>> 18, e2[s2++] = 128 | r2 >>> 12 & 63, e2[s2++] = 128 | r2 >>> 6 & 63, e2[s2++] = 128 | 63 & r2);
          return e2;
        }, e.buf2binstring = function(t2) {
          return u(t2, t2.length);
        }, e.binstring2buf = function(t2) {
          for (var e2 = new n.Buf8(t2.length), r2 = 0, i2 = e2.length; r2 < i2; r2++) e2[r2] = t2.charCodeAt(r2);
          return e2;
        }, e.buf2string = function(t2, e2) {
          var r2, n2, i2, o2, a2 = e2 || t2.length, c = new Array(2 * a2);
          for (n2 = 0, r2 = 0; r2 < a2; ) if ((i2 = t2[r2++]) < 128) c[n2++] = i2;
          else if ((o2 = s[i2]) > 4) c[n2++] = 65533, r2 += o2 - 1;
          else {
            for (i2 &= 2 === o2 ? 31 : 3 === o2 ? 15 : 7; o2 > 1 && r2 < a2; ) i2 = i2 << 6 | 63 & t2[r2++], o2--;
            o2 > 1 ? c[n2++] = 65533 : i2 < 65536 ? c[n2++] = i2 : (i2 -= 65536, c[n2++] = 55296 | i2 >> 10 & 1023, c[n2++] = 56320 | 1023 & i2);
          }
          return u(c, n2);
        }, e.utf8border = function(t2, e2) {
          var r2;
          for ((e2 = e2 || t2.length) > t2.length && (e2 = t2.length), r2 = e2 - 1; r2 >= 0 && 128 == (192 & t2[r2]); ) r2--;
          return r2 < 0 || 0 === r2 ? e2 : r2 + s[t2[r2]] > e2 ? r2 : e2;
        };
      }, function(t, e, r) {
        t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, function(t, e, r) {
        t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, function(t, e, r) {
        t.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, function(t, e, r) {
        t.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, function(t, e, r) {
        t.exports = r.p + "0.georaster.browser.bundle.min.worker.js";
      }, function(t, e, r) {
        t.exports = function(t2) {
          function e2(t3) {
            let r2, i2, o, s = null;
            function a(...t4) {
              if (!a.enabled) return;
              const n2 = a, i3 = Number(/* @__PURE__ */ new Date()), o2 = i3 - (r2 || i3);
              n2.diff = o2, n2.prev = r2, n2.curr = i3, r2 = i3, t4[0] = e2.coerce(t4[0]), "string" != typeof t4[0] && t4.unshift("%O");
              let s2 = 0;
              t4[0] = t4[0].replace(/%([a-zA-Z%])/g, (r3, i4) => {
                if ("%%" === r3) return "%";
                s2++;
                const o3 = e2.formatters[i4];
                if ("function" == typeof o3) {
                  const e3 = t4[s2];
                  r3 = o3.call(n2, e3), t4.splice(s2, 1), s2--;
                }
                return r3;
              }), e2.formatArgs.call(n2, t4);
              (n2.log || e2.log).apply(n2, t4);
            }
            return a.namespace = t3, a.useColors = e2.useColors(), a.color = e2.selectColor(t3), a.extend = n, a.destroy = e2.destroy, Object.defineProperty(a, "enabled", { enumerable: true, configurable: false, get: () => null !== s ? s : (i2 !== e2.namespaces && (i2 = e2.namespaces, o = e2.enabled(t3)), o), set: (t4) => {
              s = t4;
            } }), "function" == typeof e2.init && e2.init(a), a;
          }
          function n(t3, r2) {
            const n2 = e2(this.namespace + (void 0 === r2 ? ":" : r2) + t3);
            return n2.log = this.log, n2;
          }
          function i(t3) {
            return t3.toString().substring(2, t3.toString().length - 2).replace(/\.\*\?$/, "*");
          }
          return e2.debug = e2, e2.default = e2, e2.coerce = function(t3) {
            if (t3 instanceof Error) return t3.stack || t3.message;
            return t3;
          }, e2.disable = function() {
            const t3 = [...e2.names.map(i), ...e2.skips.map(i).map((t4) => "-" + t4)].join(",");
            return e2.enable(""), t3;
          }, e2.enable = function(t3) {
            let r2;
            e2.save(t3), e2.namespaces = t3, e2.names = [], e2.skips = [];
            const n2 = ("string" == typeof t3 ? t3 : "").split(/[\s,]+/), i2 = n2.length;
            for (r2 = 0; r2 < i2; r2++) n2[r2] && ("-" === (t3 = n2[r2].replace(/\*/g, ".*?"))[0] ? e2.skips.push(new RegExp("^" + t3.slice(1) + "$")) : e2.names.push(new RegExp("^" + t3 + "$")));
          }, e2.enabled = function(t3) {
            if ("*" === t3[t3.length - 1]) return true;
            let r2, n2;
            for (r2 = 0, n2 = e2.skips.length; r2 < n2; r2++) if (e2.skips[r2].test(t3)) return false;
            for (r2 = 0, n2 = e2.names.length; r2 < n2; r2++) if (e2.names[r2].test(t3)) return true;
            return false;
          }, e2.humanize = r(135), e2.destroy = function() {
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }, Object.keys(t2).forEach((r2) => {
            e2[r2] = t2[r2];
          }), e2.names = [], e2.skips = [], e2.formatters = {}, e2.selectColor = function(t3) {
            let r2 = 0;
            for (let e3 = 0; e3 < t3.length; e3++) r2 = (r2 << 5) - r2 + t3.charCodeAt(e3), r2 |= 0;
            return e2.colors[Math.abs(r2) % e2.colors.length];
          }, e2.enable(e2.load()), e2;
        };
      }, function(t, e) {
        var r = 1e3, n = 6e4, i = 60 * n, o = 24 * i;
        function s(t2, e2, r2, n2) {
          var i2 = e2 >= 1.5 * r2;
          return Math.round(t2 / r2) + " " + n2 + (i2 ? "s" : "");
        }
        t.exports = function(t2, e2) {
          e2 = e2 || {};
          var a = typeof t2;
          if ("string" === a && t2.length > 0) return (function(t3) {
            if ((t3 = String(t3)).length > 100) return;
            var e3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t3);
            if (!e3) return;
            var s2 = parseFloat(e3[1]);
            switch ((e3[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return 315576e5 * s2;
              case "weeks":
              case "week":
              case "w":
                return 6048e5 * s2;
              case "days":
              case "day":
              case "d":
                return s2 * o;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return s2 * i;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return s2 * n;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return s2 * r;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return s2;
              default:
                return;
            }
          })(t2);
          if ("number" === a && isFinite(t2)) return e2.long ? (function(t3) {
            var e3 = Math.abs(t3);
            if (e3 >= o) return s(t3, e3, o, "day");
            if (e3 >= i) return s(t3, e3, i, "hour");
            if (e3 >= n) return s(t3, e3, n, "minute");
            if (e3 >= r) return s(t3, e3, r, "second");
            return t3 + " ms";
          })(t2) : (function(t3) {
            var e3 = Math.abs(t3);
            if (e3 >= o) return Math.round(t3 / o) + "d";
            if (e3 >= i) return Math.round(t3 / i) + "h";
            if (e3 >= n) return Math.round(t3 / n) + "m";
            if (e3 >= r) return Math.round(t3 / r) + "s";
            return t3 + "ms";
          })(t2);
          throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t2));
        };
      }, function(t, e, r) {
        (function(e2, n, i) {
          var o = r(69), s = r(10), a = r(70), u = r(42), c = r(137), l = a.IncomingMessage, f = a.readyStates;
          var h = t.exports = function(t2) {
            var r2, n2 = this;
            u.Writable.call(n2), n2._opts = t2, n2._body = [], n2._headers = {}, t2.auth && n2.setHeader("Authorization", "Basic " + new e2(t2.auth).toString("base64")), Object.keys(t2.headers).forEach((function(e3) {
              n2.setHeader(e3, t2.headers[e3]);
            }));
            var i2 = true;
            if ("disable-fetch" === t2.mode || "requestTimeout" in t2 && !o.abortController) i2 = false, r2 = true;
            else if ("prefer-streaming" === t2.mode) r2 = false;
            else if ("allow-wrong-content-type" === t2.mode) r2 = !o.overrideMimeType;
            else {
              if (t2.mode && "default" !== t2.mode && "prefer-fast" !== t2.mode) throw new Error("Invalid value for opts.mode");
              r2 = true;
            }
            n2._mode = (function(t3, e3) {
              return o.fetch && e3 ? "fetch" : o.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : o.msstream ? "ms-stream" : o.arraybuffer && t3 ? "arraybuffer" : o.vbArray && t3 ? "text:vbarray" : "text";
            })(r2, i2), n2._fetchTimer = null, n2.on("finish", (function() {
              n2._onFinish();
            }));
          };
          s(h, u.Writable), h.prototype.setHeader = function(t2, e3) {
            var r2 = t2.toLowerCase();
            -1 === d.indexOf(r2) && (this._headers[r2] = { name: t2, value: e3 });
          }, h.prototype.getHeader = function(t2) {
            var e3 = this._headers[t2.toLowerCase()];
            return e3 ? e3.value : null;
          }, h.prototype.removeHeader = function(t2) {
            delete this._headers[t2.toLowerCase()];
          }, h.prototype._onFinish = function() {
            var t2 = this;
            if (!t2._destroyed) {
              var r2 = t2._opts, s2 = t2._headers, a2 = null;
              "GET" !== r2.method && "HEAD" !== r2.method && (a2 = o.arraybuffer ? c(e2.concat(t2._body)) : o.blobConstructor ? new n.Blob(t2._body.map((function(t3) {
                return c(t3);
              })), { type: (s2["content-type"] || {}).value || "" }) : e2.concat(t2._body).toString());
              var u2 = [];
              if (Object.keys(s2).forEach((function(t3) {
                var e3 = s2[t3].name, r3 = s2[t3].value;
                Array.isArray(r3) ? r3.forEach((function(t4) {
                  u2.push([e3, t4]);
                })) : u2.push([e3, r3]);
              })), "fetch" === t2._mode) {
                var l2 = null;
                if (o.abortController) {
                  var h2 = new AbortController();
                  l2 = h2.signal, t2._fetchAbortController = h2, "requestTimeout" in r2 && 0 !== r2.requestTimeout && (t2._fetchTimer = n.setTimeout((function() {
                    t2.emit("requestTimeout"), t2._fetchAbortController && t2._fetchAbortController.abort();
                  }), r2.requestTimeout));
                }
                n.fetch(t2._opts.url, { method: t2._opts.method, headers: u2, body: a2 || void 0, mode: "cors", credentials: r2.withCredentials ? "include" : "same-origin", signal: l2 }).then((function(e3) {
                  t2._fetchResponse = e3, t2._connect();
                }), (function(e3) {
                  n.clearTimeout(t2._fetchTimer), t2._destroyed || t2.emit("error", e3);
                }));
              } else {
                var d2 = t2._xhr = new n.XMLHttpRequest();
                try {
                  d2.open(t2._opts.method, t2._opts.url, true);
                } catch (e3) {
                  return void i.nextTick((function() {
                    t2.emit("error", e3);
                  }));
                }
                "responseType" in d2 && (d2.responseType = t2._mode.split(":")[0]), "withCredentials" in d2 && (d2.withCredentials = !!r2.withCredentials), "text" === t2._mode && "overrideMimeType" in d2 && d2.overrideMimeType("text/plain; charset=x-user-defined"), "requestTimeout" in r2 && (d2.timeout = r2.requestTimeout, d2.ontimeout = function() {
                  t2.emit("requestTimeout");
                }), u2.forEach((function(t3) {
                  d2.setRequestHeader(t3[0], t3[1]);
                })), t2._response = null, d2.onreadystatechange = function() {
                  switch (d2.readyState) {
                    case f.LOADING:
                    case f.DONE:
                      t2._onXHRProgress();
                  }
                }, "moz-chunked-arraybuffer" === t2._mode && (d2.onprogress = function() {
                  t2._onXHRProgress();
                }), d2.onerror = function() {
                  t2._destroyed || t2.emit("error", new Error("XHR error"));
                };
                try {
                  d2.send(a2);
                } catch (e3) {
                  return void i.nextTick((function() {
                    t2.emit("error", e3);
                  }));
                }
              }
            }
          }, h.prototype._onXHRProgress = function() {
            (function(t2) {
              try {
                var e3 = t2.status;
                return null !== e3 && 0 !== e3;
              } catch (t3) {
                return false;
              }
            })(this._xhr) && !this._destroyed && (this._response || this._connect(), this._response._onXHRProgress());
          }, h.prototype._connect = function() {
            var t2 = this;
            t2._destroyed || (t2._response = new l(t2._xhr, t2._fetchResponse, t2._mode, t2._fetchTimer), t2._response.on("error", (function(e3) {
              t2.emit("error", e3);
            })), t2.emit("response", t2._response));
          }, h.prototype._write = function(t2, e3, r2) {
            this._body.push(t2), r2();
          }, h.prototype.abort = h.prototype.destroy = function() {
            this._destroyed = true, n.clearTimeout(this._fetchTimer), this._response && (this._response._destroyed = true), this._xhr ? this._xhr.abort() : this._fetchAbortController && this._fetchAbortController.abort();
          }, h.prototype.end = function(t2, e3, r2) {
            "function" == typeof t2 && (r2 = t2, t2 = void 0), u.Writable.prototype.end.call(this, t2, e3, r2);
          }, h.prototype.flushHeaders = function() {
          }, h.prototype.setTimeout = function() {
          }, h.prototype.setNoDelay = function() {
          }, h.prototype.setSocketKeepAlive = function() {
          };
          var d = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];
        }).call(this, r(7).Buffer, r(3), r(8));
      }, function(t, e, r) {
        var n = r(7).Buffer;
        t.exports = function(t2) {
          if (t2 instanceof Uint8Array) {
            if (0 === t2.byteOffset && t2.byteLength === t2.buffer.byteLength) return t2.buffer;
            if ("function" == typeof t2.buffer.slice) return t2.buffer.slice(t2.byteOffset, t2.byteOffset + t2.byteLength);
          }
          if (n.isBuffer(t2)) {
            for (var e2 = new Uint8Array(t2.length), r2 = t2.length, i = 0; i < r2; i++) e2[i] = t2[i];
            return e2.buffer;
          }
          throw new Error("Argument must be a Buffer");
        };
      }, function(t, e) {
        t.exports = function() {
          for (var t2 = {}, e2 = 0; e2 < arguments.length; e2++) {
            var n = arguments[e2];
            for (var i in n) r.call(n, i) && (t2[i] = n[i]);
          }
          return t2;
        };
        var r = Object.prototype.hasOwnProperty;
      }, function(t, e) {
        t.exports = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Unordered Collection", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 451: "Unavailable For Legal Reasons", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required" };
      }, function(t, e, r) {
        (function(t2, n) {
          var i;
          /*! https://mths.be/punycode v1.4.1 by @mathias */
          !(function(o) {
            e && e.nodeType, t2 && t2.nodeType;
            var s = "object" == typeof n && n;
            s.global !== s && s.window !== s && s.self;
            var a, u = 2147483647, c = /^xn--/, l = /[^\x20-\x7E]/, f = /[\x2E\u3002\uFF0E\uFF61]/g, h = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, d = Math.floor, p = String.fromCharCode;
            function y(t3) {
              throw new RangeError(h[t3]);
            }
            function g(t3, e2) {
              for (var r2 = t3.length, n2 = []; r2--; ) n2[r2] = e2(t3[r2]);
              return n2;
            }
            function m(t3, e2) {
              var r2 = t3.split("@"), n2 = "";
              return r2.length > 1 && (n2 = r2[0] + "@", t3 = r2[1]), n2 + g((t3 = t3.replace(f, ".")).split("."), e2).join(".");
            }
            function b(t3) {
              for (var e2, r2, n2 = [], i2 = 0, o2 = t3.length; i2 < o2; ) (e2 = t3.charCodeAt(i2++)) >= 55296 && e2 <= 56319 && i2 < o2 ? 56320 == (64512 & (r2 = t3.charCodeAt(i2++))) ? n2.push(((1023 & e2) << 10) + (1023 & r2) + 65536) : (n2.push(e2), i2--) : n2.push(e2);
              return n2;
            }
            function v(t3) {
              return g(t3, (function(t4) {
                var e2 = "";
                return t4 > 65535 && (e2 += p((t4 -= 65536) >>> 10 & 1023 | 55296), t4 = 56320 | 1023 & t4), e2 += p(t4);
              })).join("");
            }
            function w(t3, e2) {
              return t3 + 22 + 75 * (t3 < 26) - ((0 != e2) << 5);
            }
            function x(t3, e2, r2) {
              var n2 = 0;
              for (t3 = r2 ? d(t3 / 700) : t3 >> 1, t3 += d(t3 / e2); t3 > 455; n2 += 36) t3 = d(t3 / 35);
              return d(n2 + 36 * t3 / (t3 + 38));
            }
            function _(t3) {
              var e2, r2, n2, i2, o2, s2, a2, c2, l2, f2, h2, p2 = [], g2 = t3.length, m2 = 0, b2 = 128, w2 = 72;
              for ((r2 = t3.lastIndexOf("-")) < 0 && (r2 = 0), n2 = 0; n2 < r2; ++n2) t3.charCodeAt(n2) >= 128 && y("not-basic"), p2.push(t3.charCodeAt(n2));
              for (i2 = r2 > 0 ? r2 + 1 : 0; i2 < g2; ) {
                for (o2 = m2, s2 = 1, a2 = 36; i2 >= g2 && y("invalid-input"), ((c2 = (h2 = t3.charCodeAt(i2++)) - 48 < 10 ? h2 - 22 : h2 - 65 < 26 ? h2 - 65 : h2 - 97 < 26 ? h2 - 97 : 36) >= 36 || c2 > d((u - m2) / s2)) && y("overflow"), m2 += c2 * s2, !(c2 < (l2 = a2 <= w2 ? 1 : a2 >= w2 + 26 ? 26 : a2 - w2)); a2 += 36) s2 > d(u / (f2 = 36 - l2)) && y("overflow"), s2 *= f2;
                w2 = x(m2 - o2, e2 = p2.length + 1, 0 == o2), d(m2 / e2) > u - b2 && y("overflow"), b2 += d(m2 / e2), m2 %= e2, p2.splice(m2++, 0, b2);
              }
              return v(p2);
            }
            function S(t3) {
              var e2, r2, n2, i2, o2, s2, a2, c2, l2, f2, h2, g2, m2, v2, _2, S2 = [];
              for (g2 = (t3 = b(t3)).length, e2 = 128, r2 = 0, o2 = 72, s2 = 0; s2 < g2; ++s2) (h2 = t3[s2]) < 128 && S2.push(p(h2));
              for (n2 = i2 = S2.length, i2 && S2.push("-"); n2 < g2; ) {
                for (a2 = u, s2 = 0; s2 < g2; ++s2) (h2 = t3[s2]) >= e2 && h2 < a2 && (a2 = h2);
                for (a2 - e2 > d((u - r2) / (m2 = n2 + 1)) && y("overflow"), r2 += (a2 - e2) * m2, e2 = a2, s2 = 0; s2 < g2; ++s2) if ((h2 = t3[s2]) < e2 && ++r2 > u && y("overflow"), h2 == e2) {
                  for (c2 = r2, l2 = 36; !(c2 < (f2 = l2 <= o2 ? 1 : l2 >= o2 + 26 ? 26 : l2 - o2)); l2 += 36) _2 = c2 - f2, v2 = 36 - f2, S2.push(p(w(f2 + _2 % v2, 0))), c2 = d(_2 / v2);
                  S2.push(p(w(c2, 0))), o2 = x(r2, m2, n2 == i2), r2 = 0, ++n2;
                }
                ++r2, ++e2;
              }
              return S2.join("");
            }
            a = { version: "1.4.1", ucs2: { decode: b, encode: v }, decode: _, encode: S, toASCII: function(t3) {
              return m(t3, (function(t4) {
                return l.test(t4) ? "xn--" + S(t4) : t4;
              }));
            }, toUnicode: function(t3) {
              return m(t3, (function(t4) {
                return c.test(t4) ? _(t4.slice(4).toLowerCase()) : t4;
              }));
            } }, void 0 === (i = (function() {
              return a;
            }).call(e, r, e, t2)) || (t2.exports = i);
          })();
        }).call(this, r(141)(t), r(3));
      }, function(t, e) {
        t.exports = function(t2) {
          return t2.webpackPolyfill || (t2.deprecate = function() {
          }, t2.paths = [], t2.children || (t2.children = []), Object.defineProperty(t2, "loaded", { enumerable: true, get: function() {
            return t2.l;
          } }), Object.defineProperty(t2, "id", { enumerable: true, get: function() {
            return t2.i;
          } }), t2.webpackPolyfill = 1), t2;
        };
      }, function(t, e, r) {
        var n = r(143), i = r(154), o = r(46);
        t.exports = { formats: o, parse: i, stringify: n };
      }, function(t, e, r) {
        var n = r(144), i = r(71), o = r(46), s = Object.prototype.hasOwnProperty, a = { brackets: function(t2) {
          return t2 + "[]";
        }, comma: "comma", indices: function(t2, e2) {
          return t2 + "[" + e2 + "]";
        }, repeat: function(t2) {
          return t2;
        } }, u = Array.isArray, c = Array.prototype.push, l = function(t2, e2) {
          c.apply(t2, u(e2) ? e2 : [e2]);
        }, f = Date.prototype.toISOString, h = o.default, d = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: i.encode, encodeValuesOnly: false, format: h, formatter: o.formatters[h], indices: false, serializeDate: function(t2) {
          return f.call(t2);
        }, skipNulls: false, strictNullHandling: false }, p = {}, y = function t2(e2, r2, o2, s2, a2, c2, f2, h2, y2, g, m, b, v, w, x, _) {
          for (var S, A = e2, E = _, k = 0, T = false; void 0 !== (E = E.get(p)) && !T; ) {
            var O = E.get(e2);
            if (k += 1, void 0 !== O) {
              if (O === k) throw new RangeError("Cyclic object value");
              T = true;
            }
            void 0 === E.get(p) && (k = 0);
          }
          if ("function" == typeof h2 ? A = h2(r2, A) : A instanceof Date ? A = m(A) : "comma" === o2 && u(A) && (A = i.maybeMap(A, (function(t3) {
            return t3 instanceof Date ? m(t3) : t3;
          }))), null === A) {
            if (a2) return f2 && !w ? f2(r2, d.encoder, x, "key", b) : r2;
            A = "";
          }
          if ("string" == typeof (S = A) || "number" == typeof S || "boolean" == typeof S || "symbol" == typeof S || "bigint" == typeof S || i.isBuffer(A)) return f2 ? [v(w ? r2 : f2(r2, d.encoder, x, "key", b)) + "=" + v(f2(A, d.encoder, x, "value", b))] : [v(r2) + "=" + v(String(A))];
          var C, P = [];
          if (void 0 === A) return P;
          if ("comma" === o2 && u(A)) w && f2 && (A = i.maybeMap(A, f2)), C = [{ value: A.length > 0 ? A.join(",") || null : void 0 }];
          else if (u(h2)) C = h2;
          else {
            var I = Object.keys(A);
            C = y2 ? I.sort(y2) : I;
          }
          for (var R = s2 && u(A) && 1 === A.length ? r2 + "[]" : r2, j = 0; j < C.length; ++j) {
            var M = C[j], L = "object" == typeof M && void 0 !== M.value ? M.value : A[M];
            if (!c2 || null !== L) {
              var F = u(A) ? "function" == typeof o2 ? o2(R, M) : R : R + (g ? "." + M : "[" + M + "]");
              _.set(e2, k);
              var N = n();
              N.set(p, _), l(P, t2(L, F, o2, s2, a2, c2, "comma" === o2 && w && u(A) ? null : f2, h2, y2, g, m, b, v, w, x, N));
            }
          }
          return P;
        };
        t.exports = function(t2, e2) {
          var r2, i2 = t2, c2 = (function(t3) {
            if (!t3) return d;
            if (null !== t3.encoder && void 0 !== t3.encoder && "function" != typeof t3.encoder) throw new TypeError("Encoder has to be a function.");
            var e3 = t3.charset || d.charset;
            if (void 0 !== t3.charset && "utf-8" !== t3.charset && "iso-8859-1" !== t3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var r3 = o.default;
            if (void 0 !== t3.format) {
              if (!s.call(o.formatters, t3.format)) throw new TypeError("Unknown format option provided.");
              r3 = t3.format;
            }
            var n2 = o.formatters[r3], i3 = d.filter;
            return ("function" == typeof t3.filter || u(t3.filter)) && (i3 = t3.filter), { addQueryPrefix: "boolean" == typeof t3.addQueryPrefix ? t3.addQueryPrefix : d.addQueryPrefix, allowDots: void 0 === t3.allowDots ? d.allowDots : !!t3.allowDots, charset: e3, charsetSentinel: "boolean" == typeof t3.charsetSentinel ? t3.charsetSentinel : d.charsetSentinel, delimiter: void 0 === t3.delimiter ? d.delimiter : t3.delimiter, encode: "boolean" == typeof t3.encode ? t3.encode : d.encode, encoder: "function" == typeof t3.encoder ? t3.encoder : d.encoder, encodeValuesOnly: "boolean" == typeof t3.encodeValuesOnly ? t3.encodeValuesOnly : d.encodeValuesOnly, filter: i3, format: r3, formatter: n2, serializeDate: "function" == typeof t3.serializeDate ? t3.serializeDate : d.serializeDate, skipNulls: "boolean" == typeof t3.skipNulls ? t3.skipNulls : d.skipNulls, sort: "function" == typeof t3.sort ? t3.sort : null, strictNullHandling: "boolean" == typeof t3.strictNullHandling ? t3.strictNullHandling : d.strictNullHandling };
          })(e2);
          "function" == typeof c2.filter ? i2 = (0, c2.filter)("", i2) : u(c2.filter) && (r2 = c2.filter);
          var f2, h2 = [];
          if ("object" != typeof i2 || null === i2) return "";
          f2 = e2 && e2.arrayFormat in a ? e2.arrayFormat : e2 && "indices" in e2 ? e2.indices ? "indices" : "repeat" : "indices";
          var p2 = a[f2];
          if (e2 && "commaRoundTrip" in e2 && "boolean" != typeof e2.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
          var g = "comma" === p2 && e2 && e2.commaRoundTrip;
          r2 || (r2 = Object.keys(i2)), c2.sort && r2.sort(c2.sort);
          for (var m = n(), b = 0; b < r2.length; ++b) {
            var v = r2[b];
            c2.skipNulls && null === i2[v] || l(h2, y(i2[v], v, p2, g, c2.strictNullHandling, c2.skipNulls, c2.encode ? c2.encoder : null, c2.filter, c2.sort, c2.allowDots, c2.serializeDate, c2.format, c2.formatter, c2.encodeValuesOnly, c2.charset, m));
          }
          var w = h2.join(c2.delimiter), x = true === c2.addQueryPrefix ? "?" : "";
          return c2.charsetSentinel && ("iso-8859-1" === c2.charset ? x += "utf8=%26%2310003%3B&" : x += "utf8=%E2%9C%93&"), w.length > 0 ? x + w : "";
        };
      }, function(t, e, r) {
        var n = r(44), i = r(150), o = r(152), s = n("%TypeError%"), a = n("%WeakMap%", true), u = n("%Map%", true), c = i("WeakMap.prototype.get", true), l = i("WeakMap.prototype.set", true), f = i("WeakMap.prototype.has", true), h = i("Map.prototype.get", true), d = i("Map.prototype.set", true), p = i("Map.prototype.has", true), y = function(t2, e2) {
          for (var r2, n2 = t2; null !== (r2 = n2.next); n2 = r2) if (r2.key === e2) return n2.next = r2.next, r2.next = t2.next, t2.next = r2, r2;
        };
        t.exports = function() {
          var t2, e2, r2, n2 = { assert: function(t3) {
            if (!n2.has(t3)) throw new s("Side channel does not contain " + o(t3));
          }, get: function(n3) {
            if (a && n3 && ("object" == typeof n3 || "function" == typeof n3)) {
              if (t2) return c(t2, n3);
            } else if (u) {
              if (e2) return h(e2, n3);
            } else if (r2) return (function(t3, e3) {
              var r3 = y(t3, e3);
              return r3 && r3.value;
            })(r2, n3);
          }, has: function(n3) {
            if (a && n3 && ("object" == typeof n3 || "function" == typeof n3)) {
              if (t2) return f(t2, n3);
            } else if (u) {
              if (e2) return p(e2, n3);
            } else if (r2) return (function(t3, e3) {
              return !!y(t3, e3);
            })(r2, n3);
            return false;
          }, set: function(n3, i2) {
            a && n3 && ("object" == typeof n3 || "function" == typeof n3) ? (t2 || (t2 = new a()), l(t2, n3, i2)) : u ? (e2 || (e2 = new u()), d(e2, n3, i2)) : (r2 || (r2 = { key: {}, next: null }), (function(t3, e3, r3) {
              var n4 = y(t3, e3);
              n4 ? n4.value = r3 : t3.next = { key: e3, next: t3.next, value: r3 };
            })(r2, n3, i2));
          } };
          return n2;
        };
      }, function(t, e, r) {
        var n = "undefined" != typeof Symbol && Symbol, i = r(146);
        t.exports = function() {
          return "function" == typeof n && ("function" == typeof Symbol && ("symbol" == typeof n("foo") && ("symbol" == typeof Symbol("bar") && i())));
        };
      }, function(t, e, r) {
        t.exports = function() {
          if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return false;
          if ("symbol" == typeof Symbol.iterator) return true;
          var t2 = {}, e2 = Symbol("test"), r2 = Object(e2);
          if ("string" == typeof e2) return false;
          if ("[object Symbol]" !== Object.prototype.toString.call(e2)) return false;
          if ("[object Symbol]" !== Object.prototype.toString.call(r2)) return false;
          for (e2 in t2[e2] = 42, t2) return false;
          if ("function" == typeof Object.keys && 0 !== Object.keys(t2).length) return false;
          if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t2).length) return false;
          var n = Object.getOwnPropertySymbols(t2);
          if (1 !== n.length || n[0] !== e2) return false;
          if (!Object.prototype.propertyIsEnumerable.call(t2, e2)) return false;
          if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(t2, e2);
            if (42 !== i.value || true !== i.enumerable) return false;
          }
          return true;
        };
      }, function(t, e, r) {
        var n = { foo: {} }, i = Object;
        t.exports = function() {
          return { __proto__: n }.foo === n.foo && !({ __proto__: null } instanceof i);
        };
      }, function(t, e, r) {
        var n = "Function.prototype.bind called on incompatible ", i = Array.prototype.slice, o = Object.prototype.toString;
        t.exports = function(t2) {
          var e2 = this;
          if ("function" != typeof e2 || "[object Function]" !== o.call(e2)) throw new TypeError(n + e2);
          for (var r2, s = i.call(arguments, 1), a = function() {
            if (this instanceof r2) {
              var n2 = e2.apply(this, s.concat(i.call(arguments)));
              return Object(n2) === n2 ? n2 : this;
            }
            return e2.apply(t2, s.concat(i.call(arguments)));
          }, u = Math.max(0, e2.length - s.length), c = [], l = 0; l < u; l++) c.push("$" + l);
          if (r2 = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(a), e2.prototype) {
            var f = function() {
            };
            f.prototype = e2.prototype, r2.prototype = new f(), f.prototype = null;
          }
          return r2;
        };
      }, function(t, e, r) {
        var n = r(45);
        t.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
      }, function(t, e, r) {
        var n = r(44), i = r(151), o = i(n("String.prototype.indexOf"));
        t.exports = function(t2, e2) {
          var r2 = n(t2, !!e2);
          return "function" == typeof r2 && o(t2, ".prototype.") > -1 ? i(r2) : r2;
        };
      }, function(t, e, r) {
        var n = r(45), i = r(44), o = i("%Function.prototype.apply%"), s = i("%Function.prototype.call%"), a = i("%Reflect.apply%", true) || n.call(s, o), u = i("%Object.getOwnPropertyDescriptor%", true), c = i("%Object.defineProperty%", true), l = i("%Math.max%");
        if (c) try {
          c({}, "a", { value: 1 });
        } catch (t2) {
          c = null;
        }
        t.exports = function(t2) {
          var e2 = a(n, s, arguments);
          if (u && c) {
            var r2 = u(e2, "length");
            r2.configurable && c(e2, "length", { value: 1 + l(0, t2.length - (arguments.length - 1)) });
          }
          return e2;
        };
        var f = function() {
          return a(n, o, arguments);
        };
        c ? c(t.exports, "apply", { value: f }) : t.exports.apply = f;
      }, function(t, e, r) {
        var n = "function" == typeof Map && Map.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, o = n && i && "function" == typeof i.get ? i.get : null, s = n && Map.prototype.forEach, a = "function" == typeof Set && Set.prototype, u = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, c = a && u && "function" == typeof u.get ? u.get : null, l = a && Set.prototype.forEach, f = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, h = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, d = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, p = Boolean.prototype.valueOf, y = Object.prototype.toString, g = Function.prototype.toString, m = String.prototype.match, b = String.prototype.slice, v = String.prototype.replace, w = String.prototype.toUpperCase, x = String.prototype.toLowerCase, _ = RegExp.prototype.test, S = Array.prototype.concat, A = Array.prototype.join, E = Array.prototype.slice, k = Math.floor, T = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, O = Object.getOwnPropertySymbols, C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, P = "function" == typeof Symbol && "object" == typeof Symbol.iterator, I = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === P || "symbol") ? Symbol.toStringTag : null, R = Object.prototype.propertyIsEnumerable, j = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t2) {
          return t2.__proto__;
        } : null);
        function M(t2, e2) {
          if (t2 === 1 / 0 || t2 === -1 / 0 || t2 != t2 || t2 && t2 > -1e3 && t2 < 1e3 || _.call(/e/, e2)) return e2;
          var r2 = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
          if ("number" == typeof t2) {
            var n2 = t2 < 0 ? -k(-t2) : k(t2);
            if (n2 !== t2) {
              var i2 = String(n2), o2 = b.call(e2, i2.length + 1);
              return v.call(i2, r2, "$&_") + "." + v.call(v.call(o2, /([0-9]{3})/g, "$&_"), /_$/, "");
            }
          }
          return v.call(e2, r2, "$&_");
        }
        var L = r(153), F = L.custom, N = q(F) ? F : null;
        function D(t2, e2, r2) {
          var n2 = "double" === (r2.quoteStyle || e2) ? '"' : "'";
          return n2 + t2 + n2;
        }
        function U(t2) {
          return v.call(String(t2), /"/g, "&quot;");
        }
        function B(t2) {
          return !("[object Array]" !== W(t2) || I && "object" == typeof t2 && I in t2);
        }
        function G(t2) {
          return !("[object RegExp]" !== W(t2) || I && "object" == typeof t2 && I in t2);
        }
        function q(t2) {
          if (P) return t2 && "object" == typeof t2 && t2 instanceof Symbol;
          if ("symbol" == typeof t2) return true;
          if (!t2 || "object" != typeof t2 || !C) return false;
          try {
            return C.call(t2), true;
          } catch (t3) {
          }
          return false;
        }
        t.exports = function t2(e2, r2, n2, i2) {
          var a2 = r2 || {};
          if (H(a2, "quoteStyle") && "single" !== a2.quoteStyle && "double" !== a2.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"');
          if (H(a2, "maxStringLength") && ("number" == typeof a2.maxStringLength ? a2.maxStringLength < 0 && a2.maxStringLength !== 1 / 0 : null !== a2.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
          var u2 = !H(a2, "customInspect") || a2.customInspect;
          if ("boolean" != typeof u2 && "symbol" !== u2) throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
          if (H(a2, "indent") && null !== a2.indent && "	" !== a2.indent && !(parseInt(a2.indent, 10) === a2.indent && a2.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
          if (H(a2, "numericSeparator") && "boolean" != typeof a2.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
          var y2 = a2.numericSeparator;
          if (void 0 === e2) return "undefined";
          if (null === e2) return "null";
          if ("boolean" == typeof e2) return e2 ? "true" : "false";
          if ("string" == typeof e2) return (function t3(e3, r3) {
            if (e3.length > r3.maxStringLength) {
              var n3 = e3.length - r3.maxStringLength, i3 = "... " + n3 + " more character" + (n3 > 1 ? "s" : "");
              return t3(b.call(e3, 0, r3.maxStringLength), r3) + i3;
            }
            return D(v.call(v.call(e3, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, $), "single", r3);
          })(e2, a2);
          if ("number" == typeof e2) {
            if (0 === e2) return 1 / 0 / e2 > 0 ? "0" : "-0";
            var w2 = String(e2);
            return y2 ? M(e2, w2) : w2;
          }
          if ("bigint" == typeof e2) {
            var _2 = String(e2) + "n";
            return y2 ? M(e2, _2) : _2;
          }
          var k2 = void 0 === a2.depth ? 5 : a2.depth;
          if (void 0 === n2 && (n2 = 0), n2 >= k2 && k2 > 0 && "object" == typeof e2) return B(e2) ? "[Array]" : "[Object]";
          var O2 = (function(t3, e3) {
            var r3;
            if ("	" === t3.indent) r3 = "	";
            else {
              if (!("number" == typeof t3.indent && t3.indent > 0)) return null;
              r3 = A.call(Array(t3.indent + 1), " ");
            }
            return { base: r3, prev: A.call(Array(e3 + 1), r3) };
          })(a2, n2);
          if (void 0 === i2) i2 = [];
          else if (V(i2, e2) >= 0) return "[Circular]";
          function F2(e3, r3, o2) {
            if (r3 && (i2 = E.call(i2)).push(r3), o2) {
              var s2 = { depth: a2.depth };
              return H(a2, "quoteStyle") && (s2.quoteStyle = a2.quoteStyle), t2(e3, s2, n2 + 1, i2);
            }
            return t2(e3, a2, n2 + 1, i2);
          }
          if ("function" == typeof e2 && !G(e2)) {
            var z2 = (function(t3) {
              if (t3.name) return t3.name;
              var e3 = m.call(g.call(t3), /^function\s*([\w$]+)/);
              if (e3) return e3[1];
              return null;
            })(e2), J = Q(e2, F2);
            return "[Function" + (z2 ? ": " + z2 : " (anonymous)") + "]" + (J.length > 0 ? " { " + A.call(J, ", ") + " }" : "");
          }
          if (q(e2)) {
            var tt = P ? v.call(String(e2), /^(Symbol\(.*\))_[^)]*$/, "$1") : C.call(e2);
            return "object" != typeof e2 || P ? tt : K(tt);
          }
          if ((function(t3) {
            if (!t3 || "object" != typeof t3) return false;
            if ("undefined" != typeof HTMLElement && t3 instanceof HTMLElement) return true;
            return "string" == typeof t3.nodeName && "function" == typeof t3.getAttribute;
          })(e2)) {
            for (var et = "<" + x.call(String(e2.nodeName)), rt = e2.attributes || [], nt = 0; nt < rt.length; nt++) et += " " + rt[nt].name + "=" + D(U(rt[nt].value), "double", a2);
            return et += ">", e2.childNodes && e2.childNodes.length && (et += "..."), et += "</" + x.call(String(e2.nodeName)) + ">";
          }
          if (B(e2)) {
            if (0 === e2.length) return "[]";
            var it = Q(e2, F2);
            return O2 && !(function(t3) {
              for (var e3 = 0; e3 < t3.length; e3++) if (V(t3[e3], "\n") >= 0) return false;
              return true;
            })(it) ? "[" + X(it, O2) + "]" : "[ " + A.call(it, ", ") + " ]";
          }
          if ((function(t3) {
            return !("[object Error]" !== W(t3) || I && "object" == typeof t3 && I in t3);
          })(e2)) {
            var ot = Q(e2, F2);
            return "cause" in Error.prototype || !("cause" in e2) || R.call(e2, "cause") ? 0 === ot.length ? "[" + String(e2) + "]" : "{ [" + String(e2) + "] " + A.call(ot, ", ") + " }" : "{ [" + String(e2) + "] " + A.call(S.call("[cause]: " + F2(e2.cause), ot), ", ") + " }";
          }
          if ("object" == typeof e2 && u2) {
            if (N && "function" == typeof e2[N] && L) return L(e2, { depth: k2 - n2 });
            if ("symbol" !== u2 && "function" == typeof e2.inspect) return e2.inspect();
          }
          if ((function(t3) {
            if (!o || !t3 || "object" != typeof t3) return false;
            try {
              o.call(t3);
              try {
                c.call(t3);
              } catch (t4) {
                return true;
              }
              return t3 instanceof Map;
            } catch (t4) {
            }
            return false;
          })(e2)) {
            var st = [];
            return s && s.call(e2, (function(t3, r3) {
              st.push(F2(r3, e2, true) + " => " + F2(t3, e2));
            })), Z("Map", o.call(e2), st, O2);
          }
          if ((function(t3) {
            if (!c || !t3 || "object" != typeof t3) return false;
            try {
              c.call(t3);
              try {
                o.call(t3);
              } catch (t4) {
                return true;
              }
              return t3 instanceof Set;
            } catch (t4) {
            }
            return false;
          })(e2)) {
            var at = [];
            return l && l.call(e2, (function(t3) {
              at.push(F2(t3, e2));
            })), Z("Set", c.call(e2), at, O2);
          }
          if ((function(t3) {
            if (!f || !t3 || "object" != typeof t3) return false;
            try {
              f.call(t3, f);
              try {
                h.call(t3, h);
              } catch (t4) {
                return true;
              }
              return t3 instanceof WeakMap;
            } catch (t4) {
            }
            return false;
          })(e2)) return Y("WeakMap");
          if ((function(t3) {
            if (!h || !t3 || "object" != typeof t3) return false;
            try {
              h.call(t3, h);
              try {
                f.call(t3, f);
              } catch (t4) {
                return true;
              }
              return t3 instanceof WeakSet;
            } catch (t4) {
            }
            return false;
          })(e2)) return Y("WeakSet");
          if ((function(t3) {
            if (!d || !t3 || "object" != typeof t3) return false;
            try {
              return d.call(t3), true;
            } catch (t4) {
            }
            return false;
          })(e2)) return Y("WeakRef");
          if ((function(t3) {
            return !("[object Number]" !== W(t3) || I && "object" == typeof t3 && I in t3);
          })(e2)) return K(F2(Number(e2)));
          if ((function(t3) {
            if (!t3 || "object" != typeof t3 || !T) return false;
            try {
              return T.call(t3), true;
            } catch (t4) {
            }
            return false;
          })(e2)) return K(F2(T.call(e2)));
          if ((function(t3) {
            return !("[object Boolean]" !== W(t3) || I && "object" == typeof t3 && I in t3);
          })(e2)) return K(p.call(e2));
          if ((function(t3) {
            return !("[object String]" !== W(t3) || I && "object" == typeof t3 && I in t3);
          })(e2)) return K(F2(String(e2)));
          if (!(function(t3) {
            return !("[object Date]" !== W(t3) || I && "object" == typeof t3 && I in t3);
          })(e2) && !G(e2)) {
            var ut = Q(e2, F2), ct = j ? j(e2) === Object.prototype : e2 instanceof Object || e2.constructor === Object, lt = e2 instanceof Object ? "" : "null prototype", ft = !ct && I && Object(e2) === e2 && I in e2 ? b.call(W(e2), 8, -1) : lt ? "Object" : "", ht = (ct || "function" != typeof e2.constructor ? "" : e2.constructor.name ? e2.constructor.name + " " : "") + (ft || lt ? "[" + A.call(S.call([], ft || [], lt || []), ": ") + "] " : "");
            return 0 === ut.length ? ht + "{}" : O2 ? ht + "{" + X(ut, O2) + "}" : ht + "{ " + A.call(ut, ", ") + " }";
          }
          return String(e2);
        };
        var z = Object.prototype.hasOwnProperty || function(t2) {
          return t2 in this;
        };
        function H(t2, e2) {
          return z.call(t2, e2);
        }
        function W(t2) {
          return y.call(t2);
        }
        function V(t2, e2) {
          if (t2.indexOf) return t2.indexOf(e2);
          for (var r2 = 0, n2 = t2.length; r2 < n2; r2++) if (t2[r2] === e2) return r2;
          return -1;
        }
        function $(t2) {
          var e2 = t2.charCodeAt(0), r2 = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[e2];
          return r2 ? "\\" + r2 : "\\x" + (e2 < 16 ? "0" : "") + w.call(e2.toString(16));
        }
        function K(t2) {
          return "Object(" + t2 + ")";
        }
        function Y(t2) {
          return t2 + " { ? }";
        }
        function Z(t2, e2, r2, n2) {
          return t2 + " (" + e2 + ") {" + (n2 ? X(r2, n2) : A.call(r2, ", ")) + "}";
        }
        function X(t2, e2) {
          if (0 === t2.length) return "";
          var r2 = "\n" + e2.prev + e2.base;
          return r2 + A.call(t2, "," + r2) + "\n" + e2.prev;
        }
        function Q(t2, e2) {
          var r2 = B(t2), n2 = [];
          if (r2) {
            n2.length = t2.length;
            for (var i2 = 0; i2 < t2.length; i2++) n2[i2] = H(t2, i2) ? e2(t2[i2], t2) : "";
          }
          var o2, s2 = "function" == typeof O ? O(t2) : [];
          if (P) {
            o2 = {};
            for (var a2 = 0; a2 < s2.length; a2++) o2["$" + s2[a2]] = s2[a2];
          }
          for (var u2 in t2) H(t2, u2) && (r2 && String(Number(u2)) === u2 && u2 < t2.length || P && o2["$" + u2] instanceof Symbol || (_.call(/[^\w$]/, u2) ? n2.push(e2(u2, t2) + ": " + e2(t2[u2], t2)) : n2.push(u2 + ": " + e2(t2[u2], t2))));
          if ("function" == typeof O) for (var c2 = 0; c2 < s2.length; c2++) R.call(t2, s2[c2]) && n2.push("[" + e2(s2[c2]) + "]: " + e2(t2[s2[c2]], t2));
          return n2;
        }
      }, function(t, e) {
      }, function(t, e, r) {
        var n = r(71), i = Object.prototype.hasOwnProperty, o = Array.isArray, s = { allowDots: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: n.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, a = function(t2) {
          return t2.replace(/&#(\d+);/g, (function(t3, e2) {
            return String.fromCharCode(parseInt(e2, 10));
          }));
        }, u = function(t2, e2) {
          return t2 && "string" == typeof t2 && e2.comma && t2.indexOf(",") > -1 ? t2.split(",") : t2;
        }, c = function(t2, e2, r2, n2) {
          if (t2) {
            var o2 = r2.allowDots ? t2.replace(/\.([^.[]+)/g, "[$1]") : t2, s2 = /(\[[^[\]]*])/g, a2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), c2 = a2 ? o2.slice(0, a2.index) : o2, l = [];
            if (c2) {
              if (!r2.plainObjects && i.call(Object.prototype, c2) && !r2.allowPrototypes) return;
              l.push(c2);
            }
            for (var f = 0; r2.depth > 0 && null !== (a2 = s2.exec(o2)) && f < r2.depth; ) {
              if (f += 1, !r2.plainObjects && i.call(Object.prototype, a2[1].slice(1, -1)) && !r2.allowPrototypes) return;
              l.push(a2[1]);
            }
            return a2 && l.push("[" + o2.slice(a2.index) + "]"), (function(t3, e3, r3, n3) {
              for (var i2 = n3 ? e3 : u(e3, r3), o3 = t3.length - 1; o3 >= 0; --o3) {
                var s3, a3 = t3[o3];
                if ("[]" === a3 && r3.parseArrays) s3 = [].concat(i2);
                else {
                  s3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
                  var c3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, l2 = parseInt(c3, 10);
                  r3.parseArrays || "" !== c3 ? !isNaN(l2) && a3 !== c3 && String(l2) === c3 && l2 >= 0 && r3.parseArrays && l2 <= r3.arrayLimit ? (s3 = [])[l2] = i2 : "__proto__" !== c3 && (s3[c3] = i2) : s3 = { 0: i2 };
                }
                i2 = s3;
              }
              return i2;
            })(l, e2, r2, n2);
          }
        };
        t.exports = function(t2, e2) {
          var r2 = (function(t3) {
            if (!t3) return s;
            if (null !== t3.decoder && void 0 !== t3.decoder && "function" != typeof t3.decoder) throw new TypeError("Decoder has to be a function.");
            if (void 0 !== t3.charset && "utf-8" !== t3.charset && "iso-8859-1" !== t3.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var e3 = void 0 === t3.charset ? s.charset : t3.charset;
            return { allowDots: void 0 === t3.allowDots ? s.allowDots : !!t3.allowDots, allowPrototypes: "boolean" == typeof t3.allowPrototypes ? t3.allowPrototypes : s.allowPrototypes, allowSparse: "boolean" == typeof t3.allowSparse ? t3.allowSparse : s.allowSparse, arrayLimit: "number" == typeof t3.arrayLimit ? t3.arrayLimit : s.arrayLimit, charset: e3, charsetSentinel: "boolean" == typeof t3.charsetSentinel ? t3.charsetSentinel : s.charsetSentinel, comma: "boolean" == typeof t3.comma ? t3.comma : s.comma, decoder: "function" == typeof t3.decoder ? t3.decoder : s.decoder, delimiter: "string" == typeof t3.delimiter || n.isRegExp(t3.delimiter) ? t3.delimiter : s.delimiter, depth: "number" == typeof t3.depth || false === t3.depth ? +t3.depth : s.depth, ignoreQueryPrefix: true === t3.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t3.interpretNumericEntities ? t3.interpretNumericEntities : s.interpretNumericEntities, parameterLimit: "number" == typeof t3.parameterLimit ? t3.parameterLimit : s.parameterLimit, parseArrays: false !== t3.parseArrays, plainObjects: "boolean" == typeof t3.plainObjects ? t3.plainObjects : s.plainObjects, strictNullHandling: "boolean" == typeof t3.strictNullHandling ? t3.strictNullHandling : s.strictNullHandling };
          })(e2);
          if ("" === t2 || null == t2) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          for (var l = "string" == typeof t2 ? (function(t3, e3) {
            var r3, c2 = { __proto__: null }, l2 = e3.ignoreQueryPrefix ? t3.replace(/^\?/, "") : t3, f2 = e3.parameterLimit === 1 / 0 ? void 0 : e3.parameterLimit, h2 = l2.split(e3.delimiter, f2), d2 = -1, p2 = e3.charset;
            if (e3.charsetSentinel) for (r3 = 0; r3 < h2.length; ++r3) 0 === h2[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === h2[r3] ? p2 = "utf-8" : "utf8=%26%2310003%3B" === h2[r3] && (p2 = "iso-8859-1"), d2 = r3, r3 = h2.length);
            for (r3 = 0; r3 < h2.length; ++r3) if (r3 !== d2) {
              var y2, g, m = h2[r3], b = m.indexOf("]="), v = -1 === b ? m.indexOf("=") : b + 1;
              -1 === v ? (y2 = e3.decoder(m, s.decoder, p2, "key"), g = e3.strictNullHandling ? null : "") : (y2 = e3.decoder(m.slice(0, v), s.decoder, p2, "key"), g = n.maybeMap(u(m.slice(v + 1), e3), (function(t4) {
                return e3.decoder(t4, s.decoder, p2, "value");
              }))), g && e3.interpretNumericEntities && "iso-8859-1" === p2 && (g = a(g)), m.indexOf("[]=") > -1 && (g = o(g) ? [g] : g), i.call(c2, y2) ? c2[y2] = n.combine(c2[y2], g) : c2[y2] = g;
            }
            return c2;
          })(t2, r2) : t2, f = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, h = Object.keys(l), d = 0; d < h.length; ++d) {
            var p = h[d], y = c(p, l[p], r2, "string" == typeof t2);
            f = n.merge(f, y, r2);
          }
          return true === r2.allowSparse ? f : n.compact(f);
        };
      }, function(t, e) {
        t.exports = { getPalette: (t2, { debug: e2 = false } = { debug: false }) => {
          e2 && console.log("starting getPalette with image", t2);
          const { fileDirectory: r } = t2, { BitsPerSample: n, ColorMap: i, ImageLength: o, ImageWidth: s, PhotometricInterpretation: a, SampleFormat: u, SamplesPerPixel: c } = r;
          if (!i) throw new Error("[geotiff-palette]: the image does not contain a color map, so we can't make a palette.");
          const l = Math.pow(2, n);
          e2 && console.log("[geotiff-palette]: count:", l);
          const f = i.length / 3;
          if (e2 && console.log("[geotiff-palette]: bandSize:", f), f !== l) throw new Error("[geotiff-palette]: can't handle situations where the color map has more or less values than the number of possible values in a raster");
          const h = f, d = h + f, p = [];
          for (let t3 = 0; t3 < l; t3++) p.push([Math.floor(i[t3] / 256), Math.floor(i[h + t3] / 256), Math.floor(i[d + t3] / 256), 255]);
          return e2 && console.log("[geotiff-palette]: result is ", p), p;
        } };
      }, function(t, e, r) {
        var n, i = Object.defineProperty, o = Object.getOwnPropertySymbols, s = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable, u = (t2, e2, r2) => e2 in t2 ? i(t2, e2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t2[e2] = r2, c = (t2, e2) => i(t2, "name", { value: e2, configurable: true });
        const l = r(157), f = r(192), h = r(194), d = c((t2) => new Array(t2).fill(0).map((t3, e2) => e2), "range");
        function p(t2, e2 = {}) {
          var r2 = e2, { bands: n2, height: i2, precise: c2 = false, stats: p2, width: y, layout: g } = r2, m = ((t3, e3) => {
            var r3 = {};
            for (var n3 in t3) s.call(t3, n3) && e3.indexOf(n3) < 0 && (r3[n3] = t3[n3]);
            if (null != t3 && o) for (var n3 of o(t3)) e3.indexOf(n3) < 0 && a.call(t3, n3) && (r3[n3] = t3[n3]);
            return r3;
          })(r2, ["bands", "height", "precise", "stats", "width", "layout"]);
          if ("function" == typeof t2.then) throw new Error("[calc-image-stats] you passed in a promise as the data values.  please resolve the promise first before calling calcImageStats");
          const b = f({ bands: n2, data: t2, height: i2, layout: g, width: y });
          null != n2 || (n2 = b.bands), null != i2 || (i2 = b.height), null != g || (g = b.layout), null != y || (y = b.width);
          const v = d(n2).map((e3) => {
            let r3;
            const f2 = ((t3, e4) => {
              for (var r4 in e4 || (e4 = {})) s.call(e4, r4) && u(t3, r4, e4[r4]);
              if (o) for (var r4 of o(e4)) a.call(e4, r4) && u(t3, r4, e4[r4]);
              return t3;
            })({ precise: c2, stats: p2 }, m);
            if (["[band][row,column]", "[band][column,row]"].includes(g)) r3 = t2[e3];
            else if (["[band][row][column]", "[band][column][row]"].includes(g)) r3 = t2[e3], f2.chunked = true;
            else if (1 === n2 && ["[band,row,column]", "[row,column,band]", "[column,band,row]", "[column,row,band]"].includes(g)) r3 = t2;
            else {
              const o2 = { band: [e3, e3] }, s2 = { band: n2, column: y, row: i2 };
              r3 = h.iterClip({ data: t2, layout: g, rect: o2, sizes: s2 });
            }
            return l(r3, f2);
          });
          return { depth: n2, height: i2, width: y, bands: v };
        }
        c(p, "calcImageStats"), void 0 !== (n = (function() {
          return p;
        }).call(e, r, e, t)) && (t.exports = n), t.exports = p, t.exports.default = p, t.exports.calcImageStats = p, "object" == typeof self && (self.calcImageStats = p), "object" == typeof window && (self.calcImageStats = p);
      }, function(t, e, r) {
        var n;
        const { getOrCreateIterator: i } = r(72), { add: o, compare: s, divide: a, mean: u, multiply: c, pow: l, sort: f, subtract: h, sum: d } = r(158), p = r(181);
        function y(t2, { async: e2 = false, chunked: r2 = false, noData: n2, filter: d2, calcCount: y2 = true, calcHistogram: g = true, calcInvalid: m = true, calcMax: b = true, calcMean: v = true, calcMedian: w = true, calcMin: x = true, calcMode: _ = true, calcModes: S = true, calcProduct: A = true, calcRange: E = true, calcStd: k = true, calcSum: T = true, calcValid: O = true, calcVariance: C = true, calcUniques: P = true, precise: I = false, precise_max_decimal_digits: R = 100, stats: j } = { debugLevel: 0 }) {
          j && (j.forEach((t3) => {
            ["count", "histogram", "invalid", "max", "mean", "median", "min", "mode", "modes", "product", "range", "sum", "std", "valid", "variance", "uniques"].includes(t3) || console.warn(`[calc-stats] skipping unknown stat "${t3}"`);
          }), y2 = j.includes("count"), g = j.includes("histogram"), m = j.includes("invalid"), b = j.includes("max"), v = j.includes("mean"), w = j.includes("median"), x = j.includes("min"), _ = j.includes("mode"), S = j.includes("modes"), A = j.includes("product"), E = j.includes("range"), k = j.includes("std"), T = j.includes("sum"), O = j.includes("valid"), C = j.includes("variance"), P = j.includes("uniques"));
          const M = i(t2);
          let L, F, N, D = g || w || _ || S || C || k || P, U = y2 || v || w || A || O || C || k || "function" == typeof d2, B = y2 || m || "function" == typeof d2, G = T || v || C || k, q = x || E, z = b || E, H = A, W = 0, V = 0, $ = 0, K = I ? "0" : 0;
          const Y = {};
          let Z, X;
          Z = I ? (t3) => {
            t3 = t3.toString(), U && W++, !q || void 0 !== L && "<" !== s(t3, L) || (L = t3), !z || void 0 !== F && ">" !== s(t3, F) || (F = t3), H && (N = 1 === W ? t3 : c(N, t3)), G && (K = o(K, t3)), D && (t3 in Y ? Y[t3].ct++ : Y[t3] = { n: t3.toString(), ct: 1 });
          } : (t3) => {
            U && W++, q && (void 0 === L || t3 < L) && (L = t3), z && (void 0 === F || t3 > F) && (F = t3), H && (N = 1 === W ? t3 : N * t3), G && (K += t3), D && (t3 in Y ? Y[t3].ct++ : Y[t3] = { n: t3, ct: 1 });
          }, X = "number" == typeof n2 && "function" == typeof d2 ? (t3) => {
            $++, "number" != typeof t3 || isNaN(t3) || t3 === n2 || true !== d2({ valid: W, index: $, value: t3 }) ? B && V++ : Z(t3);
          } : "number" == typeof n2 ? (t3) => {
            "number" != typeof t3 || isNaN(t3) || t3 === n2 ? B && V++ : Z(t3);
          } : "function" == typeof d2 ? (t3) => {
            $++, "number" != typeof t3 || isNaN(t3) || true !== d2({ valid: W, index: $, value: t3 }) ? B && V++ : Z(t3);
          } : (t3) => {
            "number" != typeof t3 || isNaN(t3) ? B && V++ : Z(t3);
          };
          const Q = () => {
            const t3 = {};
            if (y2 && (t3.count = I ? o(V.toString(), W.toString()) : V + W), O && (t3.valid = I ? W.toString() : W), m && (t3.invalid = I ? V.toString() : V), w && (t3.median = p.calculate({ counts: Y, precise: I, total: W })), x && (t3.min = L), b && (t3.max = F), A && (t3.product = N), T && (t3.sum = K), E && (t3.range = I ? h(F.toString(), L.toString()) : F - L), v || C || k) {
              const e3 = I ? a(K, W.toString(), { max_decimal_digits: R }) : K / W;
              if (v && (t3.mean = e3), C || k) {
                const r3 = (({ count: t4, histogram: e4, mean_value: r4, precise: n3 = false }) => {
                  if (n3) {
                    r4 = r4.toString();
                    const n4 = Object.values(e4).reduce((t5, { n: e5, ct: n5 }) => {
                      const i2 = h(e5.toString(), r4);
                      return o(t5, c(n5.toString(), l(i2, "2")));
                    }, "0");
                    return a(n4, t4.toString());
                  }
                  return Object.values(e4).reduce((t5, { n: e5, ct: n4 }) => t5 + n4 * Math.pow(e5 - r4, 2), 0) / t4;
                })({ count: W, histogram: Y, mean_value: e3, precise: I });
                C && (t3.variance = r3), k && (t3.std = I ? Math.sqrt(Number(r3)).toString() : Math.sqrt(r3));
              }
            }
            if (g && (I && Object.values(Y).forEach((t4) => {
              t4.ct = t4.ct.toString();
            }), t3.histogram = Y), _ || S) {
              let e3 = 0, r3 = [];
              for (let t4 in Y) {
                const { n: n3, ct: i2 } = Y[t4];
                i2 === e3 ? r3.push(I ? n3.toString() : n3) : i2 > e3 && (e3 = i2, r3 = [I ? n3.toString() : n3]);
              }
              S && (t3.modes = r3), _ && (t3.mode = I ? u(r3) : r3.reduce((t4, e4) => t4 + e4, 0) / r3.length);
            }
            return P && (t3.uniques = I ? f(Object.keys(Y)) : Object.values(Y).map(({ n: t4 }) => t4).sort((t4, e3) => t4 - e3)), t3;
          };
          if (r2) {
            if (e2) return (async () => {
              for await (let t3 of M) for (let e3 of t3) X(e3);
              return Q();
            })();
            for (let t3 of M) for (let e3 of t3) X(e3);
            return Q();
          }
          if (e2) return (async () => {
            for await (let t3 of M) X(t3);
            return Q();
          })();
          for (let t3 of M) X(t3);
          return Q();
        }
        void 0 === (n = (function() {
          return y;
        }).call(e, r, e, t)) || (t.exports = n), t.exports = y, t.exports.default = y, t.exports.calcStats = y, "object" == typeof self && (self.calcStats = y), "object" == typeof window && (window.calcStats = y);
      }, function(t, e, r) {
        var n;
        const i = r(4), o = r(6), s = r(159), a = r(76), u = r(0), c = r(34), l = r(5), f = r(161), h = r(163), d = r(51), p = r(84), y = r(167), g = r(168), m = r(1), b = r(88), v = r(89), w = r(73), x = r(75), _ = r(169), S = r(170), A = r(77), E = r(171), k = r(172), T = r(15), O = r(16), C = r(90), P = r(91), I = r(11), R = r(9), j = r(32), M = r(48), L = r(31), F = r(173), N = { absolute: i, add: o, binomial_coefficient: s, ceil: a, clean: u, compare: c, compare_positive: l, constants: f, cosine_radians: h, count_decimal_digits: d, count_integer_digits: p, cube: y, cube_root: g, divide: m, eulers_number: b, exp: v, expand: w, factorial: x, flip_sign: _, floor: S, fraction: A, hypotenuse: E, is_infinity: T, is_integer: O, is_factorial: k, is_negative_infinity: C, is_positive_infinity: P, is_zero: I, long_addition: R, long_division: j, long_multiplication: M, long_subtraction: L, mean: r(174), max: F, min: r(86), multiply: r(53), multiply_array: r(79), multiply_range: r(47), nilakantha: r(175), ols: r(176), pow: r(35), pow_positive: r(54), primes: r(87), reciprocal: r(81), remainder: r(177), root: r(37), root_integer_digits: r(83), round: r(36), round_last_decimal: r(49), sign: r(22), sign_nonzero: r(50), simplify_fraction: r(85), sine_radians: r(178), softmax: r(179), sort: r(180), square: r(23), square_root: r(92), subtract: r(33), sum: r(55), truncate: r(93) };
        void 0 === (n = (function() {
          return N;
        }).call(e, r, e, t)) || (t.exports = n), t.exports = N, t.exports.default = N, "object" == typeof window && (window.preciso = N), "object" == typeof self && (self.preciso = N);
      }, function(t, e, r) {
        const n = r(0), i = r(5), o = r(75), s = r(9), a = r(31), u = r(32), c = r(47);
        function l(t2, e2) {
          switch (t2 = n(t2), e2 = n(e2), i(t2, e2)) {
            case "=":
              return "1";
            case ">": {
              const r2 = a(t2, e2), n2 = c(s(e2, "1"), t2), i2 = o(r2);
              return u(n2, i2);
            }
            case "<":
              throw new Error("[binominal_coefficient] unsupported");
          }
        }
        t.exports = l, t.exports.default = l;
      }, function(t, e, r) {
        function n(t2) {
          return t2.substring(0, t2.indexOf("."));
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER: n } = r(74), { MAX_SAFE_INTEGER_LENGTH: i } = r(30), { PI: o } = r(162);
        t.exports = { MAX_SAFE_INTEGER: n, MAX_SAFE_INTEGER_LENGTH: i, PI: o };
      }, function(t, e) {
        t.exports = { PI_100: "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679" };
      }, function(t, e, r) {
        const n = r(6), i = r(11), o = r(23), s = r(17), a = r(1);
        function u(t2, { steps: e2 = 100, max_decimal_digits: r2 = 100 } = {}) {
          if (i(t2)) return "0";
          let u2, c = "-", l = "1", f = e2, h = o(t2), d = "1", p = "1", y = "0";
          for (let t3 = 0; t3 < f; t3++) {
            u2 = n(y, "1"), y = n(u2, "1"), d = s([d, h], { max_decimal_digits: r2 }), p = s([p, u2, y], { max_decimal_digits: r2 });
            const t4 = a(d, p, { max_decimal_digits: r2 });
            l = n(l, c + t4), c = "-" === c ? "+" : "-";
          }
          return l;
        }
        t.exports = u, t.exports.default = u;
      }, function(t, e, r) {
        const n = r(0), i = r(51), o = r(4), s = r(80), a = r(49), u = ["5", "6", "7", "8", "9"];
        function c(t2, { digits: e2 = 0 } = { digits: 0 }) {
          const r2 = t2 = n(t2), c2 = s(t2) ? "-" : "", l = (t2 = o(t2)).indexOf(".");
          if (-1 === l) return r2;
          if (i(t2) <= e2) return r2;
          const f = t2[l + e2 + 1];
          if (u.includes(f)) {
            const r3 = t2.substring(0, l + e2 + 2);
            return c2 + a(r3);
          }
          if (0 === e2) return c2 + t2.substring(0, l);
          return c2 + t2.substring(0, l + e2 + 1);
        }
        t.exports = c, t.exports.default = c;
      }, function(t, e, r) {
        function n(t2) {
          return t2.includes("/");
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        function n(t2) {
          return t2.split("/");
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(35);
        function i(t2, e2) {
          return n(t2, "3", e2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(37);
        function i(t2, e2) {
          return n(t2, "3", e2);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(22);
        function s(t2) {
          t2 = i(t2);
          const e2 = o(t2);
          return "" === e2 ? t2 : "-" === e2 ? n(t2) : "+" === e2 ? "-" + t2 : sum;
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(9), s = r(22);
        function a(t2) {
          if (-1 === (t2 = i(t2)).indexOf(".")) return t2;
          const e2 = s(t2);
          return t2 = n(t2).split(".")[0], "+" === e2 ? t2 : "-" === e2 ? "0" === t2 || "" === t2 ? "-1" : "-" + o(t2, "1") : void 0;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(23), i = r(92), o = r(55);
        function s() {
          const t2 = Array.from(arguments), e2 = "object" == typeof t2[t2.length - 1] ? t2[t2.length - 1] : void 0, r2 = Array.isArray(t2[0]) ? t2[0] : e2 ? t2.slice(0, t2.length - 1) : t2, s2 = r2.map((t3) => n(t3));
          return i(o(s2), e2);
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        function n(t2) {
          return !!t2.match(/^\d+!$/i);
        }
        t.exports = n, t.exports.default = n;
      }, function(t, e, r) {
        const n = r(0), i = r(34);
        function o(t2) {
          "string" == typeof t2 && (t2 = Array.prototype.slice.call(arguments));
          let e2 = n(t2[0]);
          const r2 = t2.length;
          for (let n2 = 1; n2 < r2; n2++) {
            const r3 = t2[n2];
            ">" === i(r3, e2) && (e2 = r3);
          }
          return e2;
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(6), i = r(1);
        function o(t2, e2) {
          let r2 = 0, o2 = "0";
          for (let e3 of t2) r2++, o2 = n(o2, e3);
          return i(o2, r2.toString(), e2);
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e, r) {
        const n = r(6), i = r(9), o = r(1), s = r(17);
        function a(t2 = 100, { divide_options: e2 } = {}) {
          let r2 = "+", a2 = "3", u = "2", c = "3", l = "4";
          for (let f = 1; f < t2; f++) {
            const t3 = s([u, c, l]), f2 = r2 + o("4", t3, e2);
            a2 = n(a2, f2), r2 = "-" === r2 ? "+" : "-", u = l, c = i(l, "1"), l = i(c, "1");
          }
          return a2;
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const n = r(6), i = r(1), o = r(17), s = r(36), a = r(33), u = r(23);
        function c(t2, e2) {
          const r2 = t2.length;
          let c2 = "0", l = "0", f = "0", h = "0";
          if (0 === r2) throw Error("[preciso] zero points passed to linear_regression");
          for (let e3 = 0; e3 < r2; e3++) {
            const [r3, i2] = t2[e3];
            c2 = n(c2, r3), l = n(l, u(r3)), f = n(f, i2), h = n(h, u(i2));
          }
          const d = r2.toString(), p = i(c2, d), y = i(f, d);
          let g = "0", m = "0";
          for (let e3 = 0; e3 < r2; e3++) {
            const [r3, i2] = t2[e3], s2 = a(r3, p), c3 = a(i2, y), l2 = o([s2, c3]);
            g = n(g, l2);
            const f2 = u(s2);
            m = n(m, f2);
          }
          let b = i(g, m), v = a(y, o(b, p));
          return e2 && "number" == typeof e2.max_decimal_digits && (b = s(b, { digits: e2.max_decimal_digits }), v = s(v, { digits: e2.max_decimal_digits })), { m: b, b: v };
        }
        t.exports = c, t.exports.default = c;
      }, function(t, e, r) {
        const n = r(4), i = r(0), o = r(5), s = r(32), a = r(53), u = r(33), c = r(93);
        function l(t2, e2) {
          t2 = i(t2), e2 = i(e2);
          const r2 = "-" === t2[0] ? "-" : "";
          t2 = n(t2), e2 = n(e2);
          const l2 = o(t2, e2);
          if ("=" === l2) return "0";
          if ("<" === l2) return "." === t2[0] && (t2 = "0" + t2), r2 + t2;
          const f = s(t2, e2, { max_decimal_places: 0 }), h = c(f), d = a(e2, h);
          return r2 + u(t2, d);
        }
        t.exports = l, t.exports.default = l;
      }, function(t, e, r) {
        const n = r(6), i = r(11), o = r(23), s = r(17), a = r(1);
        function u(t2, { steps: e2 = 100, max_decimal_digits: r2 = 100 } = {}) {
          if (i(t2)) return "0";
          let u2, c = "-", l = t2, f = e2, h = o(t2), d = t2, p = "1", y = "1";
          for (let t3 = 0; t3 < f; t3++) {
            u2 = n(y, "1"), y = n(u2, "1"), d = s([d, h], { max_decimal_digits: r2 }), p = s([p, u2, y], { max_decimal_digits: r2 });
            const t4 = a(d, p, { max_decimal_digits: r2 });
            l = n(l, c + t4), c = "-" === c ? "+" : "-";
          }
          return l;
        }
        t.exports = u, t.exports.default = u;
      }, function(t, e, r) {
        const n = r(1), i = r(89), o = r(55);
        function s(t2, { max_decimal_digits: e2 }) {
          t2 = t2.map((t3) => i(t3, { max_decimal_digits: e2 }));
          const r2 = o(t2);
          return t2.map((t3) => n(t3, r2, { max_decimal_digits: e2, ellipsis: false }));
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        const n = r(34);
        function i(t2, { direction: e2 = "ascending" } = { direction: "ascending" }) {
          const r2 = "desc" === e2 || "descending" === e2 ? "<" : ">";
          return t2.sort((t3, e3) => n(t3, e3) === r2 ? 1 : -1);
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        var n;
        const i = r(182), o = r(191);
        function s({ counts: t2, nums: e2, no_data: r2, precise: n2, threshold: s2 = 50, total: a2 }) {
          return void 0 !== t2 || void 0 !== a2 || e2.length > s2 ? i({ counts: t2, no_data: r2, nums: e2, precise: n2, total: a2 }) : o({ no_data: r2, nums: e2, precise: n2 });
        }
        const a = { calculate: s };
        void 0 === (n = (function() {
          return a;
        }).call(e, r, e, t)) || (t.exports = n), t.exports = a, t.exports.default = { calculate: s }, "object" == typeof window && (window.mediana = a), "object" == typeof self && (self.mediana = a);
      }, function(t, e, r) {
        const n = r(183), i = r(94);
        function o({ counts: t2, nums: e2, no_data: r2, precise: o2 = false, total: s }) {
          void 0 !== t2 && void 0 !== s || ({ counts: t2, total: s } = n({ nums: e2, no_data: r2 }));
          const a = Object.values(t2).sort((t3, e3) => t3.n - e3.n), u = s / 2, c = a.length;
          if (0 !== c) {
            if (1 === c) return o2 ? a[0].n.toString() : a[0].n;
            {
              let t3 = 0;
              if (s % 2 == 0) for (let e3 = 0; e3 < c; e3++) {
                const { n: r3, ct: n2 } = a[e3];
                if (t3 += n2, t3 > u) return t3 - n2 === u ? i(a[e3 - 1].n, r3, { precise: o2 }) : o2 ? r3.toString() : r3;
              }
              else for (let e3 = 0; e3 < c; e3++) {
                const { n: r3, ct: n2 } = a[e3];
                if (t3 += n2, t3 > u) return o2 ? r3.toString() : r3;
              }
            }
          }
        }
        t.exports = o, t.exports.default = o;
      }, function(t, e) {
        function r({ nums: t2, no_data: e2 }) {
          let r2 = t2.length;
          const n = {};
          let i = 0;
          if (void 0 !== e2) for (let o = 0; o < r2; o++) {
            const r3 = t2[o];
            r3 !== e2 && (i++, r3 in n ? n[r3].ct++ : n[r3] = { n: r3, ct: 1 });
          }
          else for (let e3 = 0; e3 < r2; e3++) {
            const r3 = t2[e3];
            i++, r3 in n ? n[r3].ct++ : n[r3] = { n: r3, ct: 1 };
          }
          return { counts: n, total: i };
        }
        t.exports = r, t.exports.default = r;
      }, function(t, e) {
        function r(t2) {
          "+" === t2[0] && (t2 = t2.substring(1));
          const e2 = "-" === t2[0] ? "-" : "";
          "-" === e2 && (t2 = t2.substring(1));
          const r2 = t2.indexOf("e");
          if (-1 === r2) return e2 + t2;
          let n = t2.indexOf(".");
          -1 === n && (n = r2);
          const i = Number(t2.substring(r2 + 1)), o = t2.substring(0, r2).replace(".", ""), s = n + i, a = o.length;
          if (s >= a) {
            const t3 = s - a;
            let r3 = o;
            for (let e3 = 0; e3 < t3; e3++) r3 += "0";
            return e2 + r3;
          }
          if (s < 0) {
            result = "0.";
            for (let t3 = 0; t3 > s; t3--) result += "0";
            return result += o, e2 + result;
          }
          return e2 + o.substring(0, s) + "." + o.substring(s);
        }
        t.exports = r, t.exports.default = r;
      }, function(t, e, r) {
        const n = r(98), i = r(18), o = r(186);
        function s(t2, e2, r2) {
          if (t2 = i(t2), "0" === (e2 = i(e2))) throw new Error("[preciso] division by zero");
          if ("" === t2 || "0" === t2) return "0";
          const s2 = "-" !== t2[0], a = "-" !== e2[0], u = s2 !== a ? "-" : "";
          return s2 || (t2 = n(t2)), a || (e2 = n(e2)), u + o(t2, e2, r2);
        }
        t.exports = s, t.exports.default = s;
      }, function(t, e, r) {
        const n = r(38), i = r(95), o = (r(187), r(189)), s = r(190);
        t.exports = function(t2, e2, { max_decimal_digits: r2 = 100, ellipsis: a = false } = {}) {
          "0" === t2[0] && (t2 = t2.substring(1)), "0" === e2[0] && (e2 = e2.substring(1));
          const u = t2.indexOf("."), c = e2.indexOf("."), l = -1 === u ? t2.length : u, f = -1 === c ? 0 : e2.length - 1 - c;
          let h = false;
          t2 = t2.replace(/\./, ""), e2 = e2.replace(/\./, "");
          const d = t2.length;
          let p, y = "", g = "", m = -1 * f, b = 0;
          for (let r3 = 0; r3 < d; r3++) {
            if (y += t2[r3], p = n(y, e2), ">" === p) {
              let t3 = 1, r4 = i(e2, e2), s2 = e2;
              for (; ">" !== n(r4, y); ) t3++, s2 = r4, r4 = i(r4, e2);
              if (t3 = t3.toString(), "" !== g) for (let e3 = t3.length; e3 <= b; e3++) g += "0";
              g += t3, y = o(y, s2), b = 0;
            } else {
              if ("<" === p) {
                "" === g && m++, b++;
                continue;
              }
              if ("=" === p) {
                if ("" !== g) for (let t3 = 0; t3 < b; t3++) g += "0";
                g += "1", y = "0", b = 0;
              }
            }
          }
          if (y.match(/^0+$/g)) "<" === p && (g += y.substring(0, y.length - 1));
          else {
            const t3 = {}, s2 = l - m - g.length + r2 + 1;
            "" === g && (b = 0);
            for (let r3 = 0; r3 < s2; r3++) {
              if (y += "0", a) if (y in t3) {
                if (t3[y]++, t3[y] > 3) {
                  g += "...", h = true;
                  break;
                }
              } else t3[y] = 1;
              const r4 = n(y, e2);
              if (">" === r4) {
                let t4 = 1, r5 = i(e2, e2), s3 = e2;
                for (; ">" !== n(r5, y); ) t4++, s3 = r5, r5 = i(r5, e2);
                t4 = t4.toString();
                for (let e3 = t4.length; e3 <= b; e3++) g += "0";
                if (g += t4, y = o(y, s3), "0" === y) break;
                b = 0;
              } else {
                if ("<" === r4) {
                  b++;
                  continue;
                }
                if ("=" === r4) {
                  for (let t4 = 0; t4 < b; t4++) g += "0";
                  g += "1", b = 0;
                  break;
                }
              }
            }
          }
          const v = l - m, w = g.length;
          let x;
          if (v === w) x = 0;
          else if (v < 0) g = "0." + "0".repeat(Math.abs(v)) + g, x = w - v;
          else if (v > w) {
            for (let t3 = w; t3 < v; t3++) g += "0";
            x = 0;
          } else v < w ? (g = g.substring(0, v) + "." + g.substring(v), x = w - v) : 0 === v && (g = "0." + g, x = w);
          if (g = g.replace(/^0+/, ""), g = g.replace(/\.\d+0+$/, ""), !h) {
            const t3 = x - r2;
            t3 > 0 && (g = s(g.substring(0, g.length - t3 + 1)));
          }
          return "." === g[0] && (g = "0" + g), g;
        };
      }, function(t, e, r) {
        const n = r(98), i = r(18), o = r(38), s = r(188);
        function a(t2, e2) {
          t2 = i(t2), e2 = i(e2);
          const r2 = "-" !== t2[0] !== ("-" !== e2[0]) ? "-" : "";
          t2 = n(t2), e2 = n(e2);
          if ("<" === o(t2, e2)) {
            const r3 = t2;
            t2 = e2, e2 = r3;
          }
          return r2 + s(t2, e2);
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e, r) {
        const { MAX_SAFE_INTEGER_LENGTH: n } = r(56);
        t.exports = function(t2, e2) {
          if ("0" === t2 || "0" === e2) return "0";
          const r2 = t2.indexOf("."), i = e2.indexOf("."), o = (-1 === r2 ? t2.length : r2) + (-1 === i ? e2.length : i), s = (-1 === r2 ? 0 : t2.length - 1 - r2) + (-1 === i ? 0 : e2.length - 1 - i);
          if (0 === s && o < n) return (Number(t2) * Number(e2)).toFixed(0);
          const a = t2.replace(".", ""), u = e2.replace(".", ""), c = a.length, l = u.length, f = [];
          let h = c;
          for (; h >= 0; ) {
            const t3 = h, e3 = h -= 15, r3 = a.substring(e3, t3);
            f.push([Number(r3), r3.length]);
          }
          const d = [], p = [];
          for (let t3 = 0, e3 = l - 1; e3 >= 0; e3--, t3++) {
            const r3 = u[e3], n2 = Number(r3);
            let i2 = 0, o2 = "";
            const s2 = f.length - 1;
            f.forEach(([t4, e4], r4) => {
              let a2 = (i2 + n2 * t4).toString();
              const u2 = a2.length;
              if (u2 > e4 && r4 !== s2) {
                const t5 = -1 * e4;
                o2 = a2.slice(t5) + o2, i2 = Number(a2.slice(0, t5));
              } else {
                const t5 = e4 - u2;
                for (let e5 = 0; e5 < t5; e5++) a2 = "0" + a2;
                i2 = 0, o2 = a2 + o2;
              }
            }), o2 += "0".repeat(t3), d.push(o2), p.push([Array.from(o2).map((t4) => Number(t4)), o2.length]);
          }
          const y = d.length, g = p[p.length - 1][1] + y;
          let m = "", b = 0;
          for (let t3 = 0; t3 < g; t3++) {
            let e3 = b;
            const r3 = Math.min(t3, y - 1);
            for (let n2 = 0; n2 <= r3; n2++) {
              const [r4, i2] = p[n2], o2 = i2 - 1 - t3;
              o2 >= 0 && (e3 += r4[o2]);
            }
            e3 >= 10 ? (e3 = e3.toString(), m = e3[e3.length - 1] + m, b = Number(e3.slice(0, -1))) : (m = e3 + m, b = 0);
          }
          if (0 === s) m = m.replace(/^0+/, "");
          else {
            const t3 = m.length - s;
            m = m.substring(0, t3) + "." + m.substring(t3), m = m.replace(/^0+/, ""), m = m.replace(/\.?0+$/, ""), "." === m[0] && (m = "0" + m);
          }
          return m;
        };
      }, function(t, e, r) {
        const n = r(18), i = r(38), o = r(96), s = r(97);
        function a(t2, e2) {
          t2 = n(t2), e2 = n(e2);
          const r2 = "-" !== t2[0], a2 = "-" !== e2[0];
          if (r2) {
            if (a2) {
              const r3 = i(t2, e2);
              return ">" === r3 ? s(t2, e2) : "<" === r3 ? "-" + s(e2, t2) : "0";
            }
            return o(t2, e2.substring(1));
          }
          if (a2) return "-" + o(t2.substring(1), e2);
          {
            t2 = t2.substring(1), e2 = e2.substring(1);
            const r3 = i(t2, e2);
            return ">" === r3 ? "-" + s(t2, e2) : "<" === r3 ? s(e2, t2) : "0";
          }
        }
        t.exports = a, t.exports.default = a;
      }, function(t, e) {
        const r = ["5", "6", "7", "8", "9"];
        t.exports = function(t2) {
          "+" === t2[0] && (t2 = t2.substring(1));
          const e2 = t2.length;
          let n = "";
          const i = t2[t2.length - 1];
          if (r.includes(i)) {
            let r2;
            for (r2 = e2 - 2; r2 >= 0; r2--) {
              const e3 = t2[r2];
              if ("." === e3 || "-" === e3) continue;
              const i2 = Number(e3) + 1;
              if (10 !== i2) {
                n = i2 + n;
                break;
              }
              n = "0" + n;
            }
            r2 > 0 && (n = t2.substring(0, r2) + n);
          } else n = t2.substring(0, e2 - 1);
          return "." === n[n.length - 1] && (n = n.substring(0, n.length - 1)), n.indexOf(".") > -1 && (n = n.replace(/0+$/, "")), n;
        };
      }, function(t, e, r) {
        const n = r(94);
        function i({ nums: t2, no_data: e2, precise: r2 = false }) {
          switch ((t2 = t2.filter((t3) => t3 !== e2).sort((t3, e3) => t3 - e3)).length) {
            case 0:
              return;
            case 1:
              return r2 ? t2[0].toString() : t2[0];
            default:
              const e3 = t2.length / 2;
              if (t2.length % 2 == 0) return n(t2[e3 - 1], t2[e3], { precise: r2 });
              {
                const n2 = Math.floor(e3);
                return r2 ? t2[n2].toString() : t2[n2];
              }
          }
        }
        t.exports = i, t.exports.default = i;
      }, function(t, e, r) {
        var n;
        const i = r(193);
        function o({ bands: t2, data: e2, height: r2, layout: n2, width: o2 }) {
          const s = i(e2);
          if ("[row,column,band]" === n2 || 1 === s) return { layout: "[row,column,band]", bands: t2 || (r2 && o2 ? e2.length / (r2 * o2) : void 0), height: r2 || (t2 && o2 ? e2.length / (t2 * o2) : void 0), width: o2 || (t2 && r2 ? e2.length / (t2 * r2) : void 0) };
          if (2 === s) {
            if (!r2 || !o2) return e2.length < e2[0].length ? { bands: e2.length, layout: "[band][row,column]", height: r2 || (o2 ? e2[0].length / o2 : void 0), width: o2 || (r2 ? e2[0].length / r2 : void 0) } : { bands: e2[0].length, layout: "[row,column][band]", height: r2 || (o2 ? e2.length / o2 : void 0), width: o2 || (r2 ? e2.length / r2 : void 0) };
            if (e2[0].length === r2 * o2) return { layout: "[band][row,column]", bands: e2.length, height: r2, width: o2 };
            if (e2.length === r2 * o2) return { layout: "[row,column][band]", bands: e2[0].length, height: r2, width: o2 };
          } else if (3 === s) {
            const t3 = e2.length, n3 = e2[0].length, i2 = e2[0][0].length;
            if (r2 && o2) {
              if (t3 === r2 && n3 === o2) return { layout: "[row][column][band]", bands: i2, height: r2, width: o2 };
              if (n3 === r2 && i2 === o2) return { layout: "[band][row][column]", bands: t3, height: r2, width: o2 };
            } else {
              if (t3 < n3 && t3 < i2) return { layout: "[band][row][column]", bands: t3, height: n3, width: i2 };
              if (i2 < t3 && i2 < n3) return { layout: "[row][column][band]", bands: i2, height: t3, width: n3 };
            }
          }
        }
        void 0 === (n = (function() {
          return o;
        }).call(e, r, e, t)) || (t.exports = n), t.exports = o, t.exports.default = o, t.exports.guessImageLayout = o, "object" == typeof window && (window.guessImageLayout = o), "object" == typeof self && (self.guessImageLayout = o);
      }, function(t, e) {
        t.exports = function(t2) {
          const e2 = (t3) => Array.isArray(t3) || t3 instanceof Int8Array || t3 instanceof Uint8Array || t3 instanceof Uint8ClampedArray || t3 instanceof Int16Array || t3 instanceof Uint16Array || t3 instanceof Int32Array || t3 instanceof Uint32Array || t3 instanceof Float32Array || t3 instanceof Float64Array || t3 instanceof BigInt64Array || t3 instanceof BigUint64Array;
          let r = 0, n = t2;
          for (; e2(n); ) r++, n = n[0];
          return r;
        };
      }, function(t, e, r) {
        const n = {}, { wrapNextFunction: i } = r(72), o = r(195), s = r(196), a = { Array, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Float32Array, Float64Array };
        try {
          a.BigInt64Array = BigInt64Array, a.BigUint64Array = BigUint64Array;
        } catch (t2) {
        }
        const u = (t2) => t2.match(/\[[^\]]+\]/g), c = (t2) => t2.startsWith("[") && t2.endsWith("]") ? t2.substring(1, t2.length - 1) : t2, l = (t2) => t2.startsWith("(") && t2.endsWith(")") ? t2.substring(1, t2.length - 1) : t2, f = (t2) => t2.match(/(\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/g), h = (t2) => {
          t2 = c(t2), t2 = l(t2);
          const e2 = f(t2);
          return 1 === e2.length ? { type: "Vector", dim: e2[0] } : { type: "Matrix", parts: e2.map(h) };
        };
        function d(t2) {
          const e2 = t2.match(/[^ A-Za-z,\[\]]/g);
          if (e2) throw new Error("The following invalid characters were used: " + e2.map((t3) => `"${t3}"`).join(", "));
          return true;
        }
        function p(t2, { useLayoutCache: e2 = true } = { useLayoutCache: true }) {
          if (e2 && t2 in n) return n[t2];
          d(t2);
          const r2 = u(t2).map(h), i2 = { type: "Layout", summary: r2.map((t3) => "Matrix" === t3.type ? t3.parts.length : 1), dims: r2 };
          return e2 && (n[t2] = i2), i2;
        }
        function y({ useLayoutCache: t2 = true, data: e2, layout: r2, sizes: n2 = {} }) {
          "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: t2 }));
          const { dims: i2 } = r2, o2 = i2.length, a2 = m({ useLayoutCache: t2, layout: r2, sizes: n2 }), u2 = o2 - 1, c2 = r2.summary.toString();
          if (c2 in s) {
            const t3 = { data: e2 };
            return r2.dims.map((e3, r3) => {
              "Vector" === e3.type ? t3[`d${r3}v0`] = e3.dim : "Matrix" === e3.type && e3.parts.forEach((e4, n3) => {
                t3[`d${r3}v${n3}`] = e4.dim, t3[`m${r3}v${n3}`] = a2[e4.dim];
              });
            }), s[c2].bind(t3);
          }
          return ({ point: t3, value: r3 }) => {
            let n3 = e2;
            for (let e3 = 0; e3 < o2; e3++) {
              const o3 = e3 === u2, s2 = i2[e3];
              let c3;
              c3 = "Vector" === s2.type ? t3[s2.dim] : s2.parts.reduce((e4, { dim: r4 }) => e4 + a2[r4] * t3[r4], 0), o3 ? n3[c3] = r3 : n3 = n3[c3];
            }
          };
        }
        function g({ rect: t2 = {} }) {
          if (t2) for (let e2 in t2) {
            const r2 = t2[e2];
            if (2 !== r2.length) throw new Error("[xdim] uh oh. invalid hyper-rectangle");
            const [n2, i2] = r2;
            if (n2 > i2) throw new Error(`[xdim] uh oh. invalid range for "${e2}".  Start of ${n2} can't be greater than end of ${i2}.`);
            if (n2 < 0) throw new Error("[xdim] uh oh. invalid hyper-rectangle with start " + n2);
          }
        }
        function m({ useLayoutCache: t2 = true, layout: e2, sizes: r2 }) {
          "string" == typeof e2 && (e2 = p(e2, { useLayoutCache: t2 }));
          const { dims: n2 } = e2, i2 = n2.length;
          let o2 = {};
          for (let t3 = 0; t3 < i2; t3++) {
            const e3 = n2[t3];
            if ("Vector" === e3.type) o2[e3.dim] = 1;
            else {
              const { parts: t4 } = e3;
              let n3 = 1;
              for (let e4 = t4.length - 1; e4 >= 0; e4--) {
                const { dim: i3 } = t4[e4];
                o2[i3] = n3, n3 *= r2[t4[e4].dim];
              }
            }
          }
          return o2;
        }
        function b({ useLayoutCache: t2 = true, data: e2, layout: r2, point: n2, sizes: i2 = {} }) {
          let o2, s2;
          "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: t2 }));
          let a2 = e2;
          const { dims: u2 } = r2, c2 = u2.length;
          for (let t3 = 0; t3 < c2; t3++) {
            const e3 = u2[t3];
            if ("Vector" === e3.type) {
              const t4 = n2[e3.dim];
              o2 = a2, s2 = t4, a2 = a2[t4];
            } else {
              const { parts: t4 } = e3;
              let r3 = 0, u3 = 1;
              for (let e4 = t4.length - 1; e4 >= 0; e4--) {
                const o3 = t4[e4];
                if ("Vector" === o3.type) {
                  const { dim: t5 } = o3;
                  if (r3 += u3 * n2[t5], e4 > 0) {
                    if (!(t5 in i2)) throw new Error(`you cannot calculate the location without knowing the size of the "${t5}" dimension.`);
                    u3 *= i2[t5];
                  }
                }
              }
              o2 = a2, s2 = r3, a2 = a2[r3];
            }
          }
          return { index: s2, value: a2, parent: o2 };
        }
        function v({ arr: t2, fill: e2, lens: r2, arrayTypes: n2 }) {
          if (0 === r2.length) return t2;
          const i2 = r2[0];
          if (1 === r2.length) {
            const r3 = n2 ? n2[n2.length - 1] : "Array";
            for (let n3 = 0; n3 < t2.length; n3++) t2[n3] = new a[r3](i2).fill(e2);
          } else for (let o2 = 0; o2 < t2.length; o2++) {
            const s2 = new Array(i2).fill(e2);
            t2[o2] = s2, v({ arr: s2, fill: e2, lens: r2.slice(1), arrayTypes: n2 });
          }
          return t2;
        }
        function w({ fill: t2, shape: e2, arrayTypes: r2 }) {
          const n2 = e2[0];
          if (1 === e2.length) {
            if (Array.isArray(r2) && 1 !== r2.length) throw new Error("[xdim] shape and arrayTypes have different lengths");
            const e3 = Array.isArray(r2) ? r2[0] : "Array";
            return new a[e3](n2).fill(t2);
          }
          return v({ arr: new Array(n2).fill(t2), fill: t2, lens: e2.slice(1), arrayTypes: r2 });
        }
        function x({ fill: t2, layout: e2, useLayoutCache: r2 = true, sizes: n2, arrayTypes: i2 }) {
          "string" == typeof e2 && (e2 = p(e2, { useLayoutCache: r2 }));
          const o2 = e2.dims.map((t3) => "Vector" === t3.type ? n2[t3.dim] : "Matrix" === t3.type ? t3.parts.reduce((t4, e3) => {
            if (!(e3.dim in n2)) throw new Error(`[xdim] could not find "${e3.dim}" in sizes: { ${Object.keys(n2).join(", ")} }`);
            return t4 * n2[e3.dim];
          }, 1) : void 0);
          return { data: w({ fill: t2, shape: o2, arrayTypes: i2 }), shape: o2, arrayTypes: i2 };
        }
        function _({ start: t2 = 0, end: e2 = 100 }) {
          let r2 = t2 - 1;
          return e2 += 1, i((function() {
            return r2++, r2 === e2 ? { done: true } : { done: false, value: r2 };
          }));
        }
        function S({ order: t2, sizes: e2, rect: r2 = {} }) {
          const n2 = Array.isArray(t2) ? t2 : Object.keys(e2).sort((t3, r3) => e2[t3] - e2[r3]), o2 = new Array(n2.length), s2 = {};
          for (let t3 = 0; t3 < n2.length - 1; t3++) {
            const i2 = n2[t3], [a3, u3] = r2[i2] || [0, e2[i2] - 1];
            o2[t3] = _({ start: a3 + 1, end: u3 }), s2[i2] = a3;
          }
          const a2 = n2[n2.length - 1], [u2, c2] = r2[a2] || [0, e2[a2] - 1];
          return o2[o2.length - 1] = _({ start: u2, end: c2 }), s2[a2] = u2 - 1, i((function() {
            for (let t3 = o2.length - 1; t3 >= 0; t3--) {
              const { value: i2, done: a3 } = o2[t3].next();
              if (!a3) {
                for (let i3 = t3 + 1; i3 < o2.length; i3++) {
                  const t4 = n2[i3], [a4, u3] = r2[t4] || [0, e2[t4] - 1];
                  o2[i3] = _({ start: a4 + 1, end: u3 }), s2[t4] = a4;
                }
                return s2[n2[t3]] = i2, { value: s2, done: false };
              }
              if (0 === t3) return { done: true };
            }
          }));
        }
        t.exports = { addDims: v, checkValidity: d, createMatrix: w, iterClip: function({ data: t2, layout: e2, order: r2, rect: n2 = {}, sizes: o2 = {}, useLayoutCache: s2 = true }) {
          if (!t2) throw new Error("[xdim] must specify data");
          if (!e2) throw new Error("[xdim] must specify layout");
          const a2 = S({ order: r2, sizes: o2, rect: n2 });
          return i((function() {
            const { value: r3, done: n3 } = a2.next();
            if (n3) return { done: true };
            {
              const { value: n4 } = b({ data: t2, layout: e2, point: r3, sizes: o2, useLayoutCache: s2 });
              return { done: false, value: n4 };
            }
          }));
        }, iterRange: _, iterPoints: S, matchSequences: f, parse: p, parseDimensions: function(t2) {
          const e2 = {}, r2 = /[A-Za-z]+/g;
          let n2;
          for (; null !== (n2 = r2.exec(t2)); ) {
            const [t3] = n2;
            e2[t3] = { name: t3 };
          }
          return e2;
        }, parseSequences: h, parseVectors: u, prepareData: x, prepareSelect: function({ useLayoutCache: t2 = true, data: e2, layout: r2, sizes: n2 = {} }) {
          "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: t2 }));
          const { dims: i2 } = r2, s2 = i2.length, a2 = m({ useLayoutCache: t2, layout: r2, sizes: n2 }), u2 = s2 - 1, c2 = r2.summary.toString();
          if (c2 in o) {
            const t3 = { data: e2 };
            return r2.dims.map((e3, r3) => {
              "Vector" === e3.type ? t3[`d${r3}v0`] = e3.dim : "Matrix" === e3.type && e3.parts.forEach((e4, n3) => {
                t3[`d${r3}v${n3}`] = e4.dim, t3[`m${r3}v${n3}`] = a2[e4.dim];
              });
            }), o[c2].bind(t3);
          }
          return ({ point: t3 }) => {
            let r3 = e2;
            for (let e3 = 0; e3 < s2; e3++) {
              const n3 = e3 === u2, o2 = i2[e3];
              let s3;
              if (s3 = "Vector" === o2.type ? t3[o2.dim] : o2.parts.reduce((e4, { dim: r4 }) => e4 + a2[r4] * t3[r4], 0), n3) return { index: s3, parent: r3, value: r3[s3] };
              r3 = r3[s3];
            }
          };
        }, prepareUpdate: y, removeBraces: c, removeParentheses: l, select: b, transform: function({ data: t2, fill: e2, from: r2, to: n2, sizes: i2, useLayoutCache: o2 = true }) {
          "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: o2 })), "string" == typeof n2 && (n2 = p(n2, { useLayoutCache: o2 }));
          const { data: s2 } = x({ fill: e2, layout: n2, sizes: i2 }), a2 = y({ useLayoutCache: o2, data: s2, layout: n2, sizes: i2 }), u2 = S({ sizes: i2 });
          for (point of u2) {
            const { value: e3 } = b({ data: t2, layout: r2, point, sizes: i2 });
            a2({ point, value: e3 });
          }
          return { data: s2 };
        }, update: function({ useLayoutCache: t2 = true, data: e2, layout: r2, point: n2, sizes: i2 = {}, value: o2 }) {
          "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: t2 }));
          const { dims: s2 } = r2;
          for (let t3 = 0; t3 < s2.length; t3++) {
            const r3 = t3 === s2.length - 1, a2 = s2[t3];
            let u2;
            if ("Vector" === a2.type) u2 = n2[a2.dim];
            else {
              const { parts: t4 } = a2;
              u2 = 0;
              let e3 = 1;
              for (let r4 = t4.length - 1; r4 >= 0; r4--) {
                const o3 = t4[r4], { dim: s3 } = o3;
                if (u2 += e3 * n2[s3], r4 > 0) {
                  if (!(s3 in i2)) throw new Error(`you cannot calculate the location without knowing the size of the "${s3}" dimension.`);
                  e3 *= i2[s3];
                }
              }
            }
            r3 ? e2[u2] = o2 : e2 = e2[u2];
          }
        }, clip: function({ useLayoutCache: t2 = true, data: e2, layout: r2, rect: n2, sizes: i2 = {}, flat: o2 = false, validate: s2 = true }) {
          s2 && g({ rect: n2 }), "string" == typeof r2 && (r2 = p(r2, { useLayoutCache: t2 }));
          let a2 = [e2];
          if (r2.dims.forEach((t3) => {
            let e3 = [];
            a2.forEach((r3) => {
              if ("Vector" === t3.type) {
                const [i3, o3] = n2[t3.dim];
                e3 = e3.concat(r3.slice(i3, o3 + 1));
              } else {
                const { parts: o3 } = t3;
                let s3 = [0], a3 = 1;
                for (let t4 = o3.length - 1; t4 >= 0; t4--) {
                  const e4 = o3[t4], { dim: r4 } = e4, [u3, c3] = n2[r4], l3 = [];
                  for (let t5 = u3; t5 <= c3; t5++) s3.forEach((e5) => {
                    l3.push(e5 + a3 * t5);
                  });
                  s3 = l3, a3 *= i2[r4];
                }
                s3.forEach((t4) => {
                  e3.push(r3[t4]);
                });
              }
            }), a2 = e3;
          }), o2) return { data: a2 };
          const u2 = Object.fromEntries(Object.entries(n2).map(([t3, [e3, r3]]) => [t3, r3 - e3 + 1])), { data: c2 } = x({ layout: r2, sizes: u2 }), l2 = r2.dims.length, f2 = (t3, e3) => {
            if (e3 === l2) for (let e4 = 0; e4 < t3.length; e4++) t3[e4] = a2.shift();
            else t3.forEach((t4) => f2(t4, e3 + 1));
          };
          return f2(c2, 1), { data: c2 };
        }, validateRect: g };
      }, function(t, e) {
        t.exports = { 1: function({ point: t2 }) {
          const e2 = this.data, r = t2[this.d0v0];
          return { parent: e2, index: r, value: e2[r] };
        }, 2: function({ point: t2 }) {
          const e2 = this.data, r = this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1];
          return { parent: e2, index: r, value: e2[r] };
        }, 3: function({ point: t2 }) {
          const e2 = this.data, r = this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2];
          return { parent: e2, index: r, value: e2[r] };
        }, 4: function({ point: t2 }) {
          const e2 = this.data, r = this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2] + this.m0v3 * t2[this.d0v3];
          return { parent: e2, index: r, value: e2[r] };
        }, 5: function({ point: t2 }) {
          const e2 = this.data, r = this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2] + this.m0v3 * t2[this.d0v3] + this.m0v4 * t2[this.d0v4];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]], r = t2[this.d1v0];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,2": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]], r = this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,3": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]], r = this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,4": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]], r = this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2] + this.m1v3 * t2[this.d1v3];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,5": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]], r = this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2] + this.m1v3 * t2[this.d1v3] + this.m1v4 * t2[this.d1v4];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]], r = t2[this.d2v0];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,2": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]], r = this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,3": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]], r = this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,4": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]], r = this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2] + this.m2v3 * t2[this.d2v3];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,5": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]], r = this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2] + this.m2v3 * t2[this.d2v3] + this.m2v4 * t2[this.d2v4];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]], r = t2[this.d3v0];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,2": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]], r = this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,3": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]], r = this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,4": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]], r = this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2] + this.m3v3 * t2[this.d3v3];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,5": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]], r = this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2] + this.m3v3 * t2[this.d3v3] + this.m3v4 * t2[this.d3v4];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1,1": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]], r = t2[this.d4v0];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1,2": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]], r = this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1,3": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]], r = this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1,4": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]], r = this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2] + this.m4v3 * t2[this.d4v3];
          return { parent: e2, index: r, value: e2[r] };
        }, "1,1,1,1,5": function({ point: t2 }) {
          const e2 = this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]], r = this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2] + this.m4v3 * t2[this.d4v3] + this.m4v4 * t2[this.d4v4];
          return { parent: e2, index: r, value: e2[r] };
        } };
      }, function(t, e) {
        t.exports = { 1: function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]] = e2;
        }, 2: function({ point: t2, value: e2 }) {
          this.data[this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1]] = e2;
        }, 3: function({ point: t2, value: e2 }) {
          this.data[this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2]] = e2;
        }, 4: function({ point: t2, value: e2 }) {
          this.data[this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2] + this.m0v3 * t2[this.d0v3]] = e2;
        }, 5: function({ point: t2, value: e2 }) {
          this.data[this.m0v0 * t2[this.d0v0] + this.m0v1 * t2[this.d0v1] + this.m0v2 * t2[this.d0v2] + this.m0v3 * t2[this.d0v3] + this.m0v4 * t2[this.d0v4]] = e2;
        }, "1,1": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]] = e2;
        }, "1,2": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1]] = e2;
        }, "1,3": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2]] = e2;
        }, "1,4": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2] + this.m1v3 * t2[this.d1v3]] = e2;
        }, "1,5": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][this.m1v0 * t2[this.d1v0] + this.m1v1 * t2[this.d1v1] + this.m1v2 * t2[this.d1v2] + this.m1v3 * t2[this.d1v3] + this.m1v4 * t2[this.d1v4]] = e2;
        }, "1,1,1": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]] = e2;
        }, "1,1,2": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1]] = e2;
        }, "1,1,3": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2]] = e2;
        }, "1,1,4": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2] + this.m2v3 * t2[this.d2v3]] = e2;
        }, "1,1,5": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][this.m2v0 * t2[this.d2v0] + this.m2v1 * t2[this.d2v1] + this.m2v2 * t2[this.d2v2] + this.m2v3 * t2[this.d2v3] + this.m2v4 * t2[this.d2v4]] = e2;
        }, "1,1,1,1": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]] = e2;
        }, "1,1,1,2": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1]] = e2;
        }, "1,1,1,3": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2]] = e2;
        }, "1,1,1,4": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2] + this.m3v3 * t2[this.d3v3]] = e2;
        }, "1,1,1,5": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][this.m3v0 * t2[this.d3v0] + this.m3v1 * t2[this.d3v1] + this.m3v2 * t2[this.d3v2] + this.m3v3 * t2[this.d3v3] + this.m3v4 * t2[this.d3v4]] = e2;
        }, "1,1,1,1,1": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]][t2[this.d4v0]] = e2;
        }, "1,1,1,1,2": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]][this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1]] = e2;
        }, "1,1,1,1,3": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]][this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2]] = e2;
        }, "1,1,1,1,4": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]][this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2] + this.m4v3 * t2[this.d4v3]] = e2;
        }, "1,1,1,1,5": function({ point: t2, value: e2 }) {
          this.data[t2[this.d0v0]][t2[this.d1v0]][t2[this.d2v0]][t2[this.d3v0]][this.m4v0 * t2[this.d4v0] + this.m4v1 * t2[this.d4v1] + this.m4v2 * t2[this.d4v2] + this.m4v3 * t2[this.d4v3] + this.m4v4 * t2[this.d4v4]] = e2;
        } };
      }, function(t, e, r) {
        function n(t2, e2) {
          if ("undefined" == typeof ImageData) throw "toCanvas is not supported in your environment";
          {
            const r2 = document.createElement("CANVAS"), n2 = e2 && e2.height ? Math.min(t2.height, e2.height) : Math.min(t2.height, 100), i = e2 && e2.width ? Math.min(t2.width, e2.width) : Math.min(t2.width, 100);
            r2.height = n2, r2.width = i, r2.style.minHeight = "200px", r2.style.minWidth = "400px", r2.style.maxWidth = "100%";
            const o = r2.getContext("2d"), s = (function(t3, e3, r3) {
              if (t3.values) {
                const { noDataValue: n3, mins: i2, ranges: o2, values: s2 } = t3, a = s2.length, u = t3.width / e3, c = t3.height / r3, l = new Uint8ClampedArray(e3 * r3 * 4);
                for (let t4 = 0; t4 < r3; t4++) for (let r4 = 0; r4 < e3; r4++) {
                  const f = Math.round(t4 * c), h = Math.round(r4 * u), d = s2.map((t5) => {
                    try {
                      return t5[f][h];
                    } catch (t6) {
                      console.error(t6);
                    }
                  });
                  if (d.every((t5) => void 0 !== t5 && t5 !== n3)) {
                    const n4 = t4 * (4 * e3) + 4 * r4;
                    if (1 === a) {
                      const t5 = Math.round(d[0]), e4 = Math.round((t5 - i2[0]) / o2[0] * 255);
                      l[n4] = e4, l[n4 + 1] = e4, l[n4 + 2] = e4, l[n4 + 3] = 255;
                    } else if (3 === a) try {
                      const [t5, e4, r5] = d;
                      l[n4] = t5, l[n4 + 1] = e4, l[n4 + 2] = r5, l[n4 + 3] = 255;
                    } catch (t5) {
                      console.error(t5);
                    }
                    else if (4 === a) try {
                      const [t5, e4, r5, i3] = d;
                      l[n4] = t5, l[n4 + 1] = e4, l[n4 + 2] = r5, l[n4 + 3] = i3;
                    } catch (t5) {
                      console.error(t5);
                    }
                  }
                }
                return new ImageData(l, e3, r3);
              }
            })(t2, i, n2);
            return o.putImageData(s, 0, 0), r2;
          }
        }
        r.r(e), r.d(e, "default", (function() {
          return n;
        }));
      }, function(t, e, r) {
        r.d(e, "a", (function() {
          return i;
        }));
        var n = r(19);
        Object(n.b)().blob;
        const i = Object(n.b)().default;
      }, , , function(t, e, r) {
        var n = r(26), i = r(103);
        var o = function(t2) {
          "function" == typeof t2 ? t2() : t2 && "function" == typeof t2.unsubscribe && t2.unsubscribe();
        };
        e.a = function(t2) {
          const e2 = new i.a();
          let r2, s = 0;
          return new n.a((n2) => {
            r2 || (r2 = t2.subscribe(e2));
            const i2 = e2.subscribe(n2);
            return s++, () => {
              s--, i2.unsubscribe(), 0 === s && (o(r2), r2 = void 0);
            };
          });
        };
      }]);
    }));
  })(georaster_browser_bundle_min$1);
  return georaster_browser_bundle_min$1.exports;
}
export {
  requireGeoraster_browser_bundle_min as r
};
//# sourceMappingURL=georaster-UMjhm2qh.js.map
