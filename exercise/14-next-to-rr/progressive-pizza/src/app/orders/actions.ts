"use server";
import { redirect } from "next/navigation";

let nextOrderId = 0;

export async function createOrder(
  prevState: { errors: { size: string } },
  formData: FormData
) {
  const size = formData.get("size");
  const toppings = formData.getAll("toppings");

  // form validation
  if (!size) {
    return {
      errors: { size: "Veuillez selectionnez la taille de votre pizza" },
    };
  }

  const orderId = nextOrderId++;
  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(", ")}!` : "")
  );

  redirect(`/confirmation?orderId=${orderId}`);
}
