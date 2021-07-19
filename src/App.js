import { useState, useEffect } from 'react';
import SearchBar from './components/controls/SearchBar';
import CryptoTable from './components/table/CryptoTable';
import Nav from './components/nav/Nav';

function App() {
	const [cryptos, setCryptos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filteredCryptos, setFileredCryptos] = useState([]);
	const [activeCurrency, setActiveCurrency] = useState({
		locale: 'en-US',
		currency: 'usd',
	});

	useEffect(() => {
		const getCryptoData = async () => {
			setLoading(true);
			const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${activeCurrency.currency}&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h%2C7d`;
			const response = await fetch(url);
			const data = await response.json();
			setCryptos(data);
			setFileredCryptos(data);
			setLoading(false);
		};

		getCryptoData();
	}, []);

	return (
		<div className="container">
			<Nav />
			<SearchBar cryptos={cryptos} setFileredCryptos={setFileredCryptos} />
			<CryptoTable filteredCryptos={filteredCryptos} activeCurrency={activeCurrency} />
		</div>
	);
}

export default App;
