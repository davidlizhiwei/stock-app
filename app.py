#!/usr/bin/env python3
"""
Stock Query Web Application
Uses Finnhub API for stock data
"""

import os
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Finnhub API Configuration
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY', 'd6c6th9r01qsiik0vumgd6c6th9r01qsiik0vun0')
FINNHUB_BASE_URL = 'https://finnhub.io/api/v1'


def get_stock_quote(symbol):
    """Get real-time stock quote"""
    try:
        response = requests.get(
            f'{FINNHUB_BASE_URL}/quote',
            params={'symbol': symbol.upper(), 'token': FINNHUB_API_KEY}
        )
        response.raise_for_status()
        data = response.json()

        if data.get('c') is None:
            return None

        return {
            'symbol': symbol.upper(),
            'current_price': data.get('c'),
            'change': data.get('d'),
            'percent_change': data.get('dp'),
            'high': data.get('h'),
            'low': data.get('l'),
            'open': data.get('o'),
            'previous_close': data.get('pc'),
            'timestamp': data.get('t')
        }
    except Exception as e:
        print(f"Error fetching quote: {e}")
        return None


def get_company_profile(symbol):
    """Get company profile"""
    try:
        response = requests.get(
            f'{FINNHUB_BASE_URL}/stock/profile2',
            params={'symbol': symbol.upper(), 'token': FINNHUB_API_KEY}
        )
        response.raise_for_status()
        data = response.json()

        if not data:
            return None

        return {
            'name': data.get('name'),
            'ticker': data.get('ticker'),
            'exchange': data.get('exchange'),
            'industry': data.get('finnhubIndustry'),
            'description': data.get('description'),
            'website': data.get('weburl'),
            'ceo': data.get('ceo'),
            'employees': data.get('employeeTotalNumber')
        }
    except Exception as e:
        print(f"Error fetching company profile: {e}")
        return None


def get_stock_symbols():
    """Get list of available stock symbols (US stocks)"""
    try:
        response = requests.get(
            f'{FINNHUB_BASE_URL}/stock/symbol',
            params={'exchange': 'US', 'token': FINNHUB_API_KEY}
        )
        response.raise_for_status()
        data = response.json()

        symbols = []
        for item in data[:100]:  # Limit to first 100 for demo
            if item.get('type') == 'Common Stock':
                symbols.append({
                    'symbol': item.get('symbol'),
                    'description': item.get('description'),
                    'type': item.get('type')
                })
        return symbols
    except Exception as e:
        print(f"Error fetching symbols: {e}")
        return []


@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')


@app.route('/api/quote/<symbol>')
def api_quote(symbol):
    """API endpoint for stock quote"""
    quote = get_stock_quote(symbol)
    if quote:
        return jsonify({'success': True, 'data': quote})
    return jsonify({'success': False, 'error': 'Failed to fetch quote or invalid symbol'})


@app.route('/api/profile/<symbol>')
def api_profile(symbol):
    """API endpoint for company profile"""
    profile = get_company_profile(symbol)
    if profile:
        return jsonify({'success': True, 'data': profile})
    return jsonify({'success': False, 'error': 'Failed to fetch profile or invalid symbol'})


@app.route('/api/symbols')
def api_symbols():
    """API endpoint for stock symbols"""
    symbols = get_stock_symbols()
    return jsonify({'success': True, 'data': symbols})


@app.route('/api/search')
def api_search():
    """API endpoint for searching stocks"""
    query = request.args.get('q', '').upper()
    if not query:
        return jsonify({'success': True, 'data': []})

    symbols = get_stock_symbols()
    filtered = [s for s in symbols if query in s['symbol'] or query in s['description'].upper()]
    return jsonify({'success': True, 'data': filtered[:10]})  # Limit to 10 results


if __name__ == '__main__':
    print("🚀 Starting Stock Query Application...")
    print(f"📊 Finnhub API Key configured: {FINNHUB_API_KEY[:8]}...")
    print("🌐 Open http://localhost:5000 in your browser")
    app.run(debug=True, host='0.0.0.0', port=5000)
