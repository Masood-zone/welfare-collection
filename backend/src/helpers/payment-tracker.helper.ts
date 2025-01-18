import prisma from "../config/db";

/**
 * Get payment trackers by user ID.
 * @param userId - The ID of the user.
 */
export const getPaymentTrackersByUserId = async (userId: string) => {
  return await prisma.paymentTracker.findMany({
    where: { userId },
    include: {
      welfareProgram: true, // Include welfare program details
      payment: true, // Include associated payments
    },
    orderBy: { cycleStart: "desc" },
  });
};

/**
 * Get payment trackers by welfare program ID and user ID.
 * @param welfareProgramId - The ID of the welfare program.
 * @param userId - The ID of the user.
 */
export const getPaymentTrackersByWelfareProgramAndUserId = async (
  welfareProgramId: string,
  userId: string
) => {
  return await prisma.paymentTracker.findMany({
    where: {
      welfareProgramId,
      userId,
    },
    include: {
      welfareProgram: true, // Include welfare program details
      user: true, // Include user details
      payment: true, // Include associated payments
    },
    orderBy: { cycleStart: "desc" },
  });
};

/**
 * Delete payment tracker by ID.
 * @param id - The ID of the payment tracker.
 */
export const deletePaymentTrackerById = async (id: string) => {
  return await prisma.paymentTracker.delete({
    where: { id },
  });
};
