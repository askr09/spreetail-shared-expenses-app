const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("../Expenses Export.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const balances = {};

    results.forEach((row) => {
      const payer = row.paid_by?.trim();

      let amount = parseFloat(
        String(row.amount || "0").replace(/,/g, "")
      );

      if (!payer || isNaN(amount) || amount <= 0) {
        return;
      }

      if (!balances[payer]) {
        balances[payer] = 0;
      }

      balances[payer] += amount;
    });

    console.log("\nBALANCE SUMMARY\n");
    console.table(balances);

    fs.writeFileSync(
      "./docs/BALANCE_REPORT.md",
      "# Balance Report\n\n" +
        Object.entries(balances)
          .map(([name, value]) => `${name}: ${value.toFixed(2)}`)
          .join("\n")
    );

    console.log("\nBalance report generated.");
  });