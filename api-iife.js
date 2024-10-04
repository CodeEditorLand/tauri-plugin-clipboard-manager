if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_CLIPBOARD_MANAGER__ = (function (e) {
		"use strict";
		var t;
		async function r(e, t = {}, r) {
			return window.__TAURI_INTERNALS__.invoke(e, t, r);
		}
		"function" == typeof SuppressedError && SuppressedError;
		class n {
			get rid() {
				return (function (e, t, r, n) {
					if ("a" === r && !n)
						throw new TypeError(
							"Private accessor was defined without a getter",
						);
					if ("function" == typeof t ? e !== t || !n : !t.has(e))
						throw new TypeError(
							"Cannot read private member from an object whose class did not declare it",
						);
					return "m" === r
						? n
						: "a" === r
							? n.call(e)
							: n
								? n.value
								: t.get(e);
				})(this, t, "f");
			}
			constructor(e) {
				t.set(this, void 0),
					(function (e, t, r, n, a) {
						if ("function" == typeof t ? e !== t || !a : !t.has(e))
							throw new TypeError(
								"Cannot write private member to an object whose class did not declare it",
							);
						t.set(e, r);
					})(this, t, e);
			}
			async close() {
				return r("plugin:resources|close", { rid: this.rid });
			}
		}
		t = new WeakMap();
		class a extends n {
			constructor(e) {
				super(e);
			}
			static async new(e, t, n) {
				return r("plugin:image|new", {
					rgba: i(e),
					width: t,
					height: n,
				}).then((e) => new a(e));
			}
			static async fromBytes(e) {
				return r("plugin:image|from_bytes", { bytes: i(e) }).then(
					(e) => new a(e),
				);
			}
			static async fromPath(e) {
				return r("plugin:image|from_path", { path: e }).then(
					(e) => new a(e),
				);
			}
			async rgba() {
				return r("plugin:image|rgba", { rid: this.rid }).then(
					(e) => new Uint8Array(e),
				);
			}
			async size() {
				return r("plugin:image|size", { rid: this.rid });
			}
		}
		function i(e) {
			return null == e
				? null
				: "string" == typeof e
					? e
					: e instanceof a
						? e.rid
						: e;
		}
		return (
			(e.clear = async function () {
				await r("plugin:clipboard-manager|clear");
			}),
			(e.readImage = async function () {
				return await r("plugin:clipboard-manager|read_image").then(
					(e) => new a(e),
				);
			}),
			(e.readText = async function () {
				return await r("plugin:clipboard-manager|read_text");
			}),
			(e.writeHtml = async function (e, t) {
				await r("plugin:clipboard-manager|write_html", {
					html: e,
					altHtml: t,
				});
			}),
			(e.writeImage = async function (e) {
				await r("plugin:clipboard-manager|write_image", {
					image: i(e),
				});
			}),
			(e.writeText = async function (e, t) {
				await r("plugin:clipboard-manager|write_text", {
					label: t?.label,
					text: e,
				});
			}),
			e
		);
	})({});
	Object.defineProperty(window.__TAURI__, "clipboardManager", {
		value: __TAURI_PLUGIN_CLIPBOARD_MANAGER__,
	});
}
