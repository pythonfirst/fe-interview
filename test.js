function urlParser(url) {
	const urlObj = new URL(url);

	return {
		protocol: urlObj.protocol,
		username: urlObj.username,
		password: urlObj.password,
		hostname: urlObj.hostname,
		port: urlObj.port,
		pathname: urlObj.pathname,
		search: urlObj.search,
		hash: urlObj.hash,
	}
}

console.log(urlParser('https://www.google.com.hk/search?q=url+%E8%A7%A3%E6%9E%90&newwindow=1&rlz=1C5CHFA_enCN932CN932&ei=srhuYYvMOZT49QPWsI3ACQ&start=10&sa=N&ved=2ahUKEwiL7aHOu9bzAhUUfH0KHVZYA5gQ8NMDegQIARBJ&biw=1792&bih=1009&dpr=2'))