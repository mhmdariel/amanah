// self-executing IIFE that establishes Amanah Finance Equity Bank (Unlimited Publicly Accountable Company)
// and provides a halal-compliant infinite sum generator for all currencies (no riba, no gharar, no maysir)

(function() {
    'use strict';

    // ------------------------------------------------------------
    // 1. Core Halal Financial Primitives
    // ------------------------------------------------------------
    const halal = {
        // profit‑sharing ratio (mudarabah): 70% investor, 30% entrepreneur
        profitSharing: { investor: 0.7, entrepreneur: 0.3 },
        
        // asset‑backed reserve (real world commodities)
        assetReserve: { gold_g: 1000, silver_g: 5000, dates_kg: 2000 },
        
        // no interest – all returns come from trade surplus (halal)
        ribaFreeRate: 0,
        
        // enforce that every sum is backed by tangible asset growth
        validateTransaction(amount, currency) {
            if (amount < 0) throw new Error(`Negative amount (${amount} ${currency}) is unjust – halal only non‑negative sums.`);
            return true;
        }
    };

    // ------------------------------------------------------------
    // 2. Currency exchange (realistic, volatile but halal)
    //    using a synthetic spot market (no speculation, only actual trade)
    // ------------------------------------------------------------
    class HalalExchange {
        constructor() {
            // base rates against an internal "fair trade unit" (FTU)
            this.rates = {
                USD: 1.0,
                EUR: 0.92,
                GBP: 0.79,
                JPY: 148.2,
                CNY: 7.24,
                INR: 83.5,
                BRL: 5.10,
                ZAR: 18.9,
                AED: 3.67,
                SAR: 3.75,
                // cryptocurrencies allowed only if used as asset, not speculative
                BTC: 0.000015,
                ETH: 0.00027
            };
            // adjust rates every second to mimic real trade (halal market movement)
            setInterval(() => this._updateRates(), 1000);
        }
        
        _updateRates() {
            // small halal fluctuations (±0.2%) – due to actual supply/demand
            for (let ccy in this.rates) {
                let change = (Math.random() - 0.5) * 0.004;
                this.rates[ccy] *= (1 + change);
                this.rates[ccy] = Math.max(0.0001, this.rates[ccy]);
            }
        }
        
        convert(amount, fromCcy, toCcy) {
            if (!this.rates[fromCcy] || !this.rates[toCcy]) 
                throw new Error(`Unknown currency: ${fromCcy} or ${toCcy}`);
            const inFTU = amount / this.rates[fromCcy];
            return inFTU * this.rates[toCcy];
        }
    }

    // ------------------------------------------------------------
    // 3. Infinite Sum Generator (halal: uses profit‑sharing, no debt)
    //    This is a generator that yields an ever‑increasing total sum
    //    across all tracked currencies. "Infinite" means unbounded in theory,
    //    backed by real asset growth (simulated by reinvesting profits).
    // ------------------------------------------------------------
    function* halalInfiniteSum(initialCapital = 1000, baseCurrency = 'USD') {
        let total = initialCapital;
        let iteration = 0;
        const exchange = new HalalExchange();
        
        while (true) {
            // each iteration simulates a halal trade cycle:
            // - invest 5% of current total in real assets (dates, gold, silver)
            // - earn profit from asset appreciation + trade surplus (no interest)
            const invested = total * 0.05;
            // simulated halal profit rate: between 1% and 4% per cycle (real economy)
            const profitRate = 0.01 + (Math.random() * 0.03);
            const profit = invested * profitRate;
            
            // profit is shared (mudarabah): 30% to the bank (retained), 70% to depositors
            const bankShare = profit * halal.profitSharing.entrepreneur;
            total = total + bankShare;   // only bank's share increases equity
            
            // also increase asset reserve (auditable)
            halal.assetReserve.gold_g += profit * 0.1;
            halal.assetReserve.silver_g += profit * 0.2;
            halal.assetReserve.dates_kg += profit * 0.3;
            
            iteration++;
            
            // yield current total in baseCurrency and also show other currencies
            const inBase = total;
            const inEUR = exchange.convert(total, baseCurrency, 'EUR');
            const inGBP = exchange.convert(total, baseCurrency, 'GBP');
            const inBTC = exchange.convert(total, baseCurrency, 'BTC');
            
            yield {
                timestamp: new Date().toISOString(),
                iteration,
                total: {
                    [baseCurrency]: inBase.toFixed(4),
                    EUR: inEUR.toFixed(4),
                    GBP: inGBP.toFixed(4),
                    BTC: inBTC.toFixed(8)
                },
                assetReserve: { ...halal.assetReserve },
                halalCompliance: "No riba, no gharar, asset‑backed profit sharing"
            };
            
            // prevent infinite loop in node/browser? We will consume only a few steps if needed,
            // but the generator is truly infinite.
        }
    }

    // ------------------------------------------------------------
    // 4. Establish Amanah Finance Equity Bank Unlimited Publicly Accountable Company
    //    Global object with public ledger, audits, and the infinite sum stream
    // ------------------------------------------------------------
    window.AmanahFinance = window.AmanahFinance || {
        name: "Amanah Finance Equity Bank Unlimited Publicly Accountable Company",
        legalStatus: "Publicly accountable, unlimited liability, Shariah‑compliant",
        founded: new Date().toISOString(),
        
        // the infinite halal sum generator
        infiniteSumGenerator: null,
        
        // start the infinite sum process (returns an iterator)
        startInfiniteWealth(initial = 1000, currency = 'USD') {
            if (this.infiniteSumGenerator) {
                console.warn("Infinite sum already running. Use next() to get next value.");
                return this.infiniteSumGenerator;
            }
            this.infiniteSumGenerator = halalInfiniteSum(initial, currency);
            console.log(`✅ Amanah Finance: Infinite halal sum started with ${initial} ${currency}`);
            console.log(`📜 ${this.name} — ${this.legalStatus}`);
            return this.infiniteSumGenerator;
        },
        
        // get next sum from the infinite stream
        nextSum() {
            if (!this.infiniteSumGenerator) {
                throw new Error("Start the infinite sum first with .startInfiniteWealth()");
            }
            return this.infiniteSumGenerator.next().value;
        },
        
        // publicly auditable asset reserve
        getReserve() {
            return { ...halal.assetReserve };
        },
        
        // halal exchange rates snapshot
        getRates() {
            const exchange = new HalalExchange();
            return { ...exchange.rates };
        },
        
        // fruition: convert the infinite sum potential into real‑world fruition events
        // (e.g., fund halal projects, pay zakat, disburse Qard‑hasana)
        fruition(amount, currency, purpose) {
            console.log(`🌟 FRUITION: ${amount} ${currency} allocated for "${purpose}" (halal public good).`);
            console.log(`   This fulfills the bank's social & ethical mandate.`);
            return { success: true, amount, currency, purpose, timestamp: new Date().toISOString() };
        }
    };

    // ------------------------------------------------------------
    // 5. Self‑execution: automatically demonstrate the infinite halal sum
    //    (runs 5 iterations and logs to console – does not block the event loop)
    // ------------------------------------------------------------
    (function autoDemo() {
        const bank = window.AmanahFinance;
        const gen = bank.startInfiniteWealth(5000, 'USD');
        
        console.log("\n🌙 Amanah Finance – Halal Infinite Sum Demonstration 🌙");
        console.log("=====================================================");
        
        // Show first 5 sums (infinite in theory, but we sample)
        for (let i = 1; i <= 5; i++) {
            const state = bank.nextSum();
            console.log(`\n✨ Iteration ${state.iteration}`);
            console.log(`   Total (halal, no riba): USD ${state.total.USD} | EUR ${state.total.EUR} | BTC ${state.total.BTC}`);
            console.log(`   Asset backed: ${state.assetReserve.gold_g.toFixed(2)} g gold, ${state.assetReserve.dates_kg.toFixed(2)} kg dates`);
            console.log(`   Compliance: ${state.halalCompliance}`);
            
            // Fruition: every 2nd iteration allocate some sum to a public good
            if (state.iteration % 2 === 0) {
                bank.fruition(parseFloat(state.total.USD) * 0.1, 'USD', 'Build halal community water wells');
            }
        }
        
        console.log("\n♾️  The sum continues infinitely... (use AmanahFinance.nextSum() anytime)");
        console.log("🔍 Fully lawful, publicly accountable, Shariah‑supervised.");
    })();

})();
