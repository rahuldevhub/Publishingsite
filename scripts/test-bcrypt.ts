import bcrypt from "bcryptjs";

async function main() {
  const password = process.env.BCRYPT_TEST_PASSWORD;
  if (!password) throw new Error("Set BCRYPT_TEST_PASSWORD before running this script.");
  const hash = await bcrypt.hash(password, 10);

  console.log("Hash:", hash);

  const match = await bcrypt.compare(password, hash);
  console.log("Comparison succeeds:", match);
}

main().catch(console.error);
