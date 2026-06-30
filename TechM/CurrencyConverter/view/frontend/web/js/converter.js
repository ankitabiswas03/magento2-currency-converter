document.addEventListener('DOMContentLoaded', async() => {
    const from = document.getElementById('from'),
        to = document.getElementById('to');
    const cur = await fetch('https://api.frankfurter.dev/v2/currencies');
    const currencies = await cur.json();

    currencies.forEach(currency => {
        const c = currency.iso_code;
        from.add(new Option(c, c));
        to.add(new Option(c, c));
    });
    from.value = 'USD';
    to.value = 'EUR';
    document.getElementById('swap').onclick = () => {
        [
            from.value, to.value
        ] = [to.value, from.value];
        load();
    };
    let chart;
    async function load() {
        const r = await fetch(`https://api.frankfurter.dev/v2/rates?base=${from.value}&quotes=${to.value}`);
        const data = await r.json();
        document.getElementById('rate').innerText = `1 ${from.value} = ${data[0].rate} ${to.value}`;
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        const ts = await fetch(`https://api.frankfurter.dev/v2/rates?base=${from.value}&quotes=${to.value}&from=${start.toISOString().slice(0,10)}`).then(r => r.json());
        const labels = ts.map(x => x.date),
            vals = ts.map(x => x.rate);
        if (chart) chart.destroy();
        chart = new Chart(document.getElementById('chart'), { type: 'line', data: { labels, datasets: [{ label: 'Rate', data: vals }] } });
    }
    from.onchange = to.onchange = load;
    load();
});
