const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("../Expenses Export.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const balances = {};

    const normalizeUser = (name) => {
      if (!name) return null;

      const n = name.trim().toLowerCase();

      if (n === "priya") return "Priya";
      if (n === "priya s") return "Priya";

      if (n === "rohan") return "Rohan";

      if (n === "aisha") return "Aisha";
      if (n === "meera") return "Meera";
      if (n === "sam") return "Sam";
      if (n === "dev") return "Dev";

      return name.trim();
    };

    results.forEach((row) => {
      let payer = normalizeUser(row.paid_by);

      if (!payer) return;

      let amount = Number(
        String(row.amount || "0")
          .replace(/,/g, "")
          .trim()
      );

      if (isNaN(amount)) return;

      if (amount <= 0) return;

      if (!balances[payer]) {
        balances[payer] = 0;
      }

      balances[payer] += amount;
    });

    console.log("\n========================");
    console.log("BALANCE SUMMARY");
    console.log("========================\n");

    console.table(balances);

    let report = "# Balance Report\n\n";

    Object.entries(balances).forEach(([name, value]) => {
      report += `${name}: ₹${value.toFixed(2)}\n`;
    });

    fs.writeFileSync(
      "./docs/BALANCE_REPORT.md",
      report
    );

    console.log("\nBalance report generated successfully.");
  });