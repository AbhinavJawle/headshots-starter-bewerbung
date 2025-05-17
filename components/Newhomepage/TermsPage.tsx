"use client";

import PageContainer from "@/components/PageContainer";
import {
  Link,
  Text,
  VStack,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const TermsPage = () => (
  <PageContainer>
    <VStack
      margin="auto"
      maxWidth="container.lg"
      p={10}
      spacing={4}
      backgroundColor="white"
      borderRadius="lg"
      width="100%"
      alignItems="flex-start"
    >
      <Heading as="h2" size="lg" fontWeight="bold">
        Nutzungsbedingungen
      </Heading>

      <Text>
        Die nachfolgenden Bestimmungen regeln die Nutzung des KI-gestützten
        Dienstes KIBewerbungsfotos, der von KIBewerbungsfotos angeboten wird.
        Durch die Nutzung unseres Services stimmen Sie diesen Bedingungen zu.
        KIBewerbungsfotos.de behält sich vor, diese Bedingungen bei Bedarf
        anzupassen, wobei die aktuelle Version bindend ist.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Leistungsumfang und Bildqualität
      </Heading>
      <Text>
        KIBewerbungsfotos bietet einen KI-basierten Dienst zur Erstellung
        professioneller Bewerbungsfotos aus Ihren Aufnahmen. Die Qualität der
        Ergebnisse ist abhängig von der Einhaltung unserer Aufnahmerichtlinien.
        Unsere KI verarbeitet Ihre Originalbilder und erstellt je nach Paket 3-6
        optimierte Porträtaufnahmen. Die generierten Bilder können naturgemäß
        vom Original abweichen. Wir optimieren unseren Service kontinuierlich
        zur Verbesserung der Funktionen und Ergebnisqualität.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Rechte und Datenschutz
      </Heading>
      <Text>
        Sie behalten alle Rechte an Ihren hochgeladenen Originalbildern. Die
        KI-generierten Bilder können Sie uneingeschränkt privat und kommerziell
        nutzen. Verwenden Sie ausschließlich eigene Bilder oder solche mit
        ausdrücklicher Erlaubnis der abgebildeten Personen. Der Schutz Ihrer
        Daten hat oberste Priorität. Wir verarbeiten Ihre Daten nur gemäß
        Datenschutzerklärung und speichern sie nur für die notwendige Dauer der
        Dienstleistung unter Einhaltung angemessener Sicherheitsstandards.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Zahlungsbedingungen und Widerrufsrecht
      </Heading>
      <Text>
        Zahlungen werden sicher über Stripe abgewickelt. Mit dem Kauf stimmen
        Sie der sofortigen Bereitstellung zu, vor Ablauf der 14-tägigen
        Widerrufsfrist. Das Widerrufsrecht erlischt mit Beginn der
        KI-Verarbeitung, da es sich um individualisierte digitale Inhalte
        handelt.
      </Text>
      <Text>
        Erstattungen sind möglich, wenn die KI-Verarbeitung noch nicht begonnen
        hat. Bei nicht zufriedenstellenden Ergebnissen bieten wir eine
        kostenlose Neugeneration an, sofern unsere Vorgaben eingehalten wurden.
        Nach Generierung und Download ist keine Erstattung mehr möglich. Weitere
        Rückerstattungen sind aufgrund der KI-Verarbeitungskosten
        ausgeschlossen.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Nutzungsbeschränkungen
      </Heading>
      <Text>
        Die Nutzung erfordert einen verantwortungsvollen Umgang mit unserem
        Service. Verboten sind anstößige, rechtswidrige oder urheberrechtlich
        geschützte Inhalte sowie Missbrauch zur Täuschung. Bei Verstößen können
        wir den Zugang sperren. Bei Rechtsverletzungen kontaktieren Sie bitte{" "}
        <Link href="mailto:info@kibewerbungsfotos.de" color="blue.500">
          info@kibewerbungsfotos.de
        </Link>
        .
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Rechtliche Rahmenbedingungen
      </Heading>
      <Text>
        Es gilt deutsches Recht. Konflikte werden vorzugsweise außergerichtlich
        gelöst. Der Service wird ohne Gewähr bereitgestellt. Die Haftung für
        Schäden ist im gesetzlich zulässigen Rahmen ausgeschlossen.
      </Text>
      <Text>
        Diese Bedingungen sind rechtsgültig und regeln Haftung, höhere Gewalt
        und Rechteübertragung. Unwirksame Klauseln beeinträchtigen nicht die
        Gültigkeit der übrigen Bestimmungen. Die Nutzung unseres Dienstes
        bedeutet Ihr Einverständnis mit diesen Bedingungen.
      </Text>
    </VStack>
  </PageContainer>
);

export default TermsPage;
