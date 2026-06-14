const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("../Expenses Export.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log("Total Records:", results.length);

    const anomalies = [];
    const descriptions = new Map();

    results.forEach((row, index) => {
      const rowNum = index + 1;

      // Missing payer
      if (!row.paid_by || row.paid_by.trim() === "") {
        anomalies.push({
          row: rowNum,
          type: "Missing Payer",
        });
      }

      // Missing currency
      if (!row.currency || row.currency.trim() === "") {
        anomalies.push({
          row: rowNum,
          type: "Missing Currency",
        });
      }

      // Negative amount
      if (Number(row.amount) < 0) {
        anomalies.push({
          row: rowNum,
          type: "Refund / Negative Amount",
        });
      }

      // Zero amount
      if (Number(row.amount) === 0) {
        anomalies.push({
          row: rowNum,
          type: "Zero Amount",
        });
      }

      // Settlement
      if (
        row.description &&
        row.description.toLowerCase().includes("paid back")
      ) {
        anomalies.push({
          row: rowNum,
          type: "Settlement Recorded As Expense",
        });
      }

      // Duplicate description
      if (row.description) {
        const key = row.description.trim().toLowerCase();

        if (descriptions.has(key)) {
          anomalies.push({
            row: rowNum,
            type: "Potential Duplicate Expense",
          });
        } else {
          descriptions.set(key, true);
        }
      }
    });

    console.log("\nANOMALIES FOUND:");
    console.table(anomalies);

    console.log("\nTOTAL ANOMALIES:", anomalies.length);
    const report = `
# Import Report

Total Records Imported: ${results.length}

Total Anomalies Detected: ${anomalies.length}

## Detected Anomalies

${anomalies
  .map((a) => `- Row ${a.row}: ${a.type}`)
  .join("\n")}
`;

fs.writeFileSync("./docs/IMPORT_REPORT.md", report);

console.log("\nImport report generated.");
  });