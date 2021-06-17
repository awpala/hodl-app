# HODL App

## Prerequisites

This Web application requires `node` and `yarn` or `npm`.

## Local Deployment

To develop and deploy this app locally:
  1. Issue terminal command `git clone` to clone this repository to the local environment
  2. Issue terminal command `yarn install` or `npm install` from the top-level directory (i.e., `hodl-app/`) to install dependencies
  3. Issue terminal command `yarn start` or `npm start` to deploy the app locally to `localhost:3000`

## Overview and Third-Party Dependencies

This simple Web application plots the per-coin price for five popular cryptocurrencies: `bitcoin`, `ethereum`, `dogecoin`, `polkadot`, and `monero`.

The user has the ability to select which cryptocurrencies to add to the chart. Additionally, the user can input a custom range (in days) to view historic price data dynamically. When viewed in de-normalized form, the prices are shown in `USD/coin` (*logarithmic scale* in y-axis). Additionally, the user can select "Normalize" to normalize price data relative to `1.0` as the all-time high price (*linear scale* in y-axis).

The price data is obtained via third-party API [CoinGecko](https://www.coingecko.com/en/api/). No API key is required to make HTTP requests to this API. Additionally, this application uses the companion [Node.js Client](https://github.com/miscavage/CoinGecko-API) wrapper to make the HTTP requests (see `/src/views/Home/Home.js`).

The chart is generated via [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2), which additionally includes the co-dependency [Chart.js](https://www.chartjs.org/docs/latest/).
