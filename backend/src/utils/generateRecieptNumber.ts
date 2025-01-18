import prisma from "../config/db";

/**
 * Generates a random 6-digit number as a string.
 */
const generateReceiptNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures 6 digits
};

const generateUniqueReceiptNumber = async (): Promise<string> => {
  let receiptNumber: string = "";
  let isUnique = false;

  while (!isUnique) {
    receiptNumber = generateReceiptNumber();
    const existingPayment = await prisma.payment.findUnique({
      where: { receiptNumber },
    });
    if (!existingPayment) {
      isUnique = true;
    }
  }

  return receiptNumber;
};

export default generateUniqueReceiptNumber;
