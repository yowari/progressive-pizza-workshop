import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { Layout } from "~/components/ui/Layout";
import { Message } from "~/components/ui/Message";

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
    <Layout center>
      <Message
        title="Merci pour votre commande"
        subtitle={`Commande n° ${orderId}`}
        imageUrl="/sizes/medium.svg"
        actions={
          <Button as={Link} to="/">
            Lancer une nouvelle commande
          </Button>
        }
      >
        Votre pizza sera prête dans quelques minutes. Vous serez notifié une
        fois que c&apos;est pr&ecirc;t.
      </Message>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <Layout center>
      <Message
        title="Nous sommes désolé"
        subtitle="Numéro de commande invalide"
        imageUrl="/sizes/medium.svg"
      >
        Veuillez repasser votre commande.
      </Message>
    </Layout>
  );
}
