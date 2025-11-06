#!/usr/bin/env node
import fs from "fs";
import { execSync } from "child_process";
const businessesDir = "config/businesses";
const outRoot = "dist";
if (!fs.existsSync(businessesDir)) {
  console.error("❌ Missing config/businesses folder");
  process.exit(1);
}
const businesses = fs.readdirSync(businessesDir).filter(f => f.endsWith(".json")).map(f => f.replace(".json", ""));
for (const b of businesses) {
  console.log(`\n🚀 Building ${b}...`);
  execSync("npm run build", { stdio: "inherit", env: { ...process.env, ACTIVE_BUSINESS: b } });
  console.log(`✅ Built dist/${b}`);
}
