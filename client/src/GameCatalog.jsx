import React from 'react';
import * as legacy from './runtime.js';

const games = [
    { name: 'Mobile Legends', title: 'Mobile Legends', image: 'mlbb-480.jpg', category: 'mobile', price: 'Rp1.500', badge: 'HOT', badgeType: 'hot' },
    { name: 'Free Fire', title: 'Free Fire', image: 'freefire-480.jpg', category: 'mobile', price: 'Rp1.000', badge: 'POPULAR', badgeType: 'popular' },
    { name: 'PUBG Mobile', title: 'PUBG Mobile', image: 'pubg-480.jpg', category: 'mobile', price: 'Rp15.000', badge: 'POPULAR', badgeType: 'popular' },
    { name: 'Honor of Kings', title: 'Honor of Kings', image: 'honorofkings-480.jpg', category: 'mobile', price: 'Rp5.000', badge: 'NEW', badgeType: 'new' },
    { name: 'Clash of Clans', title: 'Clash of Clans', image: 'coc-480.jpg', category: 'mobile', price: 'Rp15.000' },
    { name: 'League of Legends: Wild Rift', title: 'Wild Rift', image: 'wildrift-480.jpg', category: 'mobile', price: 'Rp9.000' },
    { name: 'Call of Duty Mobile', title: 'CoD Mobile', image: 'callofduty-480.jpg', category: 'mobile', price: 'Rp15.000', badge: 'POPULAR', badgeType: 'popular' },
    { name: 'Genshin Impact', title: 'Genshin Impact', image: 'genshin-480.jpg', category: 'pc', price: 'Rp15.000', badge: 'NEW', badgeType: 'new' },
    { name: 'Honkai: Star Rail', title: 'Honkai: Star Rail', image: 'honkai-480.jpg', category: 'pc', price: 'Rp15.000', badge: 'HOT', badgeType: 'hot' },
    { name: 'Valorant', title: 'Valorant', image: 'Valorant-480.jpg', category: 'pc', price: 'Rp20.000', badge: 'POPULAR', badgeType: 'popular' },
    { name: 'Steam Wallet', title: 'Steam Wallet', image: 'steamwallet-480.jpg', category: 'pc voucher', price: 'Rp50.000', badge: 'GIFT', badgeType: 'new' },
    { name: 'Roblox', title: 'Roblox', image: 'roblox-480.jpg', category: 'pc voucher', price: 'Rp15.000', badge: 'HOT', badgeType: 'hot' },
    { name: 'Point Blank', title: 'Point Blank', image: 'pointblank-480.jpg', category: 'pc', price: 'Rp10.000' },
    { name: 'Minecraft', title: 'Minecraft', image: 'Minecraft-480.jpg', category: 'pc', price: 'Rp15.000', badge: 'GIFT', badgeType: 'new' }
];

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'pc', label: 'PC / Console' },
    { id: 'voucher', label: 'Voucher' }
];

function GameCard({ game }) {
    return (
        <div
            className={`game-card ${game.category}`}
            data-game={game.name}
            onClick={() => legacy.openGame(game.name)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    legacy.openGame(game.name);
                }
            }}
            role="button"
            tabIndex={0}
        >
            <div className="card-img-wrap">
                <img
                    src={`Images/opt/${game.image}`}
                    alt={game.name}
                    width="480"
                    height="480"
                    loading="lazy"
                    decoding="async"
                />
                {game.badge && <div className={`card-badge ${game.badgeType}`}>{game.badge}</div>}
            </div>
            <div className="card-info">
                <h3>{game.title}</h3>
                <p className="card-price">Mulai <strong>{game.price}</strong></p>
                <div className="card-arrow"><i className="fas fa-arrow-right"></i></div>
            </div>
        </div>
    );
}

export function GameCatalog() {
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('all');
    const query = search.trim().toLocaleLowerCase('id');
    const filteredGames = games.filter((game) => {
        const matchesSearch = !query || game.title.toLocaleLowerCase('id').includes(query);
        const matchesCategory = category === 'all' || game.category.split(' ').includes(category);
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <label className="catalog-search" htmlFor="searchGame">
                <i className="fas fa-search" aria-hidden="true"></i>
                <input
                    type="search"
                    id="searchGame"
                    placeholder="Cari game favoritmu..."
                    autoComplete="off"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </label>

            <div className="section-header">
                <h2 className="section-title">PILIH <span className="text-accent">ITEM</span></h2>
                <div className="filter-bar" role="group" aria-label="Filter kategori game">
                    {categories.map((item) => (
                        <button
                            className={`filter-btn${category === item.id ? ' active' : ''}`}
                            type="button"
                            key={item.id}
                            aria-pressed={category === item.id}
                            onClick={() => setCategory(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="games-grid">
                {filteredGames.map((game) => <GameCard game={game} key={game.name} />)}
            </div>
        </>
    );
}
