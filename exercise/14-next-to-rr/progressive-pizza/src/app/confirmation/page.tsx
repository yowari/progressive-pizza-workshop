"use client";

import { Layout } from "@/components/ui/Layout";
import { Message } from "@/components/ui/Message";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Confirmation() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  return orderId ? (
    <Layout center>
      <Message
        title="Merci pour votre commande"
        subtitle={`Commande n° ${orderId}`}
        imageUrl="/sizes/medium.svg"
        actions={
          <Button as={Link} href="/">
            Lancer une nouvelle commande
          </Button>
        }
      >
        Votre pizza sera prête dans quelques minutes. Vous serez notifié une
        fois que c&apos;est pr&ecirc;t.
      </Message>
    </Layout>
  ) : (
    <Layout center>
      <Message
        title="Nous sommes désolé"
        subtitle="Numéro de commande invalide"
        imageUrl="/broken.png"
      >
        Veuillez repasser votre commande.
      </Message>
    </Layout>
  );
}
