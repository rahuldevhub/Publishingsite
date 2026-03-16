import bcrypt from "bcryptjs";

async function main() {
  const password = "admin123";
  const hash = await bcrypt.hash(password, 10);

  console.log("Hash:", hash);

  const match = await bcrypt.compare(password, hash);
  console.log("Comparison succeeds:", match);
}

main().catch(console.error);
