import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Layout center>
      <Message
        title={t("confirmation.thanks")}
        subtitle={t("confirmation.order", { orderId })}
        imageUrl="/sizes/medium.svg"
        actions={
          <Button as={Link} to="/">
            {t("confirmation.newOrder")}
          </Button>
        }
      >
        {t("confirmation.ready")}
      </Message>
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation();
  console.error(error);
  return (
    <Layout center>
      <Message
        title={t("error.sorry")}
        subtitle="Numéro de commande invalide"
        imageUrl="/sizes/medium.svg"
      >
        Veuillez repasser votre commande.
      </Message>
    </Layout>
  );
}
