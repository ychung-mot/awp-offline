self.importScripts("./service-worker-assets.js");

self.addEventListener("install", (event) => onInstall(event));
self.addEventListener("activate", (event) => event.waitUntil(onActivate(event)));
self.addEventListener("fetch", (event) => event.respondWith(onFetch(event)));

const cacheNamePrefix = "offline-cache-";
const cacheName = `${cacheNamePrefix}${self.assetsManifest.version}`;
const offlineAssetsInclude = [
	/\.html/,
	/\.js$/,
	/\.json$/,
	/\.css$/,
	/\.woff?2$/,
	/\.eot$/,
	/\.ttf$/,
	/\.png$/,
	/\.jpe?g$/,
	/\.gif$/,
	/\.svg$/,
];
const offlineAssetsExclude = [/^service-worker\.js$/];
const ignoreRequests = [/react_devtools_backend.js$/];

const onInstall = async (event) => {
	console.log(`Installing service worker version: ${self.assetsManifest.version}`);

	self.skipWaiting();

	const preCache = async () => {
		const cache = await caches.open(cacheName);

		await self.assetsManifest.assets
			.filter((asset) => offlineAssetsInclude.some((pattern) => pattern.test(asset.url)))
			.filter((asset) => !offlineAssetsExclude.some((pattern) => pattern.test(asset.url)))
			.forEach(({ url }) => {
				const request = new Request(url, { cache: "no-cache" });
				fetch(request).then(({ status }) => {
					if (status === 200) {
						cache.add(request);
					}
				});
			});

		self.assetsManifest.navigation.forEach(({ url }) => {
			const request = new Request(url, { cache: "no-cache" });
			fetch(request).then(({ status }) => {
				if (status === 200) {
					cache.add(request);
				}
			});
		});
	};

	event.waitUntil(preCache());
};

const onActivate = (event) => {
	console.log("Activating service worker");

	caches
		.keys()
		.then((keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				}),
			),
		)
		.then(() => {
			console.log("Service worker activated");
			clients.claim();
		})
		.catch((err) => {
			console.log("Unable to activate service worker");
			console.log(err)
		});
};

const onFetch = async (event) => {
	let cachedResponse = null;

	if (event.request.method === "GET") {

		const cache = await caches.open(cacheName);
		cachedResponse = await cache.match(event.request);

		if (cachedResponse && navigator.onLine) {
			fetch(event.request)
				.then((res) => {
					if (res.status === 200) {
						cache.put(event.request, res.clone());
						return res;
					}
				})
				.catch((err) => {
					console.log(err);
					console.log("navigator: ", navigator);
				});
		}

		//redirect offline url to home
		if (!navigator.onLine && event.request.url === "https://awp-offline.azurewebsites.net/fetch-data") {
			const request = new Request("/", { cache: "no-cache" });
			cachedResponse = await cache.match(request);
		}

		return cachedResponse || fetch(event.request);
	}

	return fetch(event.request)
};
