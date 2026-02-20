// Stock Query App JavaScript

let searchTimeout;

// Load popular stocks on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPopularStocks();

    // Enter key to search
    document.getElementById('symbolInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchStock();
        }
    });

    // Input event for search suggestions
    document.getElementById('symbolInput').addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length >= 1) {
            searchTimeout = setTimeout(() => {
                searchSuggestions(query);
            }, 300);
        } else {
            document.getElementById('searchResults').innerHTML = '';
        }
    });
});

// Load popular stock symbols
async function loadPopularStocks() {
    try {
        const response = await fetch('/api/symbols');
        const data = await response.json();

        if (data.success) {
            const datalist = document.getElementById('symbolList');
            datalist.innerHTML = data.data.map(s =>
                `<option value="${s.symbol}">${s.description}</option>`
            ).join('');
        }
    } catch (error) {
        console.error('Error loading symbols:', error);
    }
}

// Search suggestions
async function searchSuggestions(query) {
    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            displaySearchResults(data.data);
        } else {
            document.getElementById('searchResults').innerHTML = '';
        }
    } catch (error) {
        console.error('Error searching:', error);
    }
}

// Display search results
function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    container.innerHTML = results.map(item => `
        <div class="search-result-item" onclick="selectSymbol('${item.symbol}')">
            <strong>${item.symbol}</strong> - ${item.description}
        </div>
    `).join('');
}

// Select symbol from search results
function selectSymbol(symbol) {
    document.getElementById('symbolInput').value = symbol;
    document.getElementById('searchResults').innerHTML = '';
    searchStock();
}

// Main search function
async function searchStock() {
    const symbol = document.getElementById('symbolInput').value.trim().toUpperCase();

    if (!symbol) {
        showError('请输入股票代码');
        return;
    }

    hideError();
    showLoading();
    hideStockInfo();

    try {
        // Fetch quote
        const quoteResponse = await fetch(`/api/quote/${symbol}`);
        const quoteData = await quoteResponse.json();

        if (!quoteData.success) {
            hideLoading();
            showError('无法找到该股票，请检查股票代码');
            return;
        }

        displayQuote(quoteData.data);

        // Fetch profile
        const profileResponse = await fetch(`/api/profile/${symbol}`);
        const profileData = await profileResponse.json();

        if (profileData.success) {
            displayProfile(profileData.data);
        }

        hideLoading();
        showStockInfo();

    } catch (error) {
        hideLoading();
        showError('查询失败，请稍后重试');
        console.error('Error:', error);
    }
}

// Display stock quote
function displayQuote(quote) {
    document.getElementById('stockSymbol').textContent = quote.symbol;
    document.getElementById('currentPrice').textContent = `$${quote.current_price.toFixed(2)}`;

    const changeEl = document.getElementById('priceChange');
    const changeText = `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)} (${quote.percent_change.toFixed(2)}%)`;
    changeEl.textContent = changeText;
    changeEl.className = 'price-change ' + (quote.change >= 0 ? 'positive' : 'negative');

    document.getElementById('openPrice').textContent = `$${quote.open.toFixed(2)}`;
    document.getElementById('highPrice').textContent = `$${quote.high.toFixed(2)}`;
    document.getElementById('lowPrice').textContent = `$${quote.low.toFixed(2)}`;
    document.getElementById('prevClose').textContent = `$${quote.previous_close.toFixed(2)}`;
}

// Display company profile
function displayProfile(profile) {
    const profileCard = document.getElementById('profileCard');

    if (!profile.name) {
        profileCard.style.display = 'none';
        return;
    }

    profileCard.style.display = 'block';
    document.getElementById('companyName').textContent = profile.name || 'N/A';
    document.getElementById('exchange').textContent = profile.exchange || 'N/A';
    document.getElementById('industry').textContent = profile.industry || 'N/A';
    document.getElementById('ceo').textContent = profile.ceo || 'N/A';
    document.getElementById('employees').textContent = profile.employees || 'N/A';

    const websiteEl = document.getElementById('website');
    if (profile.website) {
        websiteEl.textContent = profile.website;
        websiteEl.href = profile.website;
    } else {
        websiteEl.textContent = 'N/A';
        websiteEl.href = '#';
    }

    document.getElementById('description').textContent = profile.description || '暂无描述';
}

// UI Helper functions
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showStockInfo() {
    document.getElementById('stockInfo').style.display = 'block';
}

function hideStockInfo() {
    document.getElementById('stockInfo').style.display = 'none';
    document.getElementById('profileCard').style.display = 'none';
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}
