import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    throw new Response("Missing orderId", { status: 400 });
  }

  return { orderId };
}

export default function Confirmation() {
  const { orderId } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Merci pour votre commande</h2>
      <p>Commande n° {orderId}</p>
      <p>
        Votre pizza sera prête dans quelques minutes. Vous serez notifié une
        fois que c&apos;est pr&ecirc;t.
      </p>
      <a href="/">Lancer une nouvelle commande</a>
    </main>
  );
}
