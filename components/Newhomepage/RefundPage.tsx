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

const RefundPage = () => (
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
      <Heading as="h2" size="xl" fontWeight="bold">
        Rückerstattungsrichtlinie
      </Heading>
      <Text>
        Bei Bewerbungsbild AI legen wir großen Wert auf Ihre Zufriedenheit mit
        unseren Dienstleistungen. Die folgenden Richtlinien erläutern, unter
        welchen Umständen Erstattungen möglich sind und wie der Prozess abläuft.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Qualitätsversprechen
      </Heading>
      <Text>
        Sie können von unserem Service mindestens 3-6 zufriedenstellende
        Porträtbilder erwarten. Sie haben die Möglichkeit, aus allen generierten
        Bildern Ihre persönlichen Favoriten auszuwählen. Sollten Sie der Meinung
        sein, dass keine der bereitgestellten Aufnahmen Ihren Anforderungen
        entspricht, bieten wir Ihnen kostenlos eine erneute Bildgenerierung an.
      </Text>
      <Text>
        Eine vollständige Rückerstattung ist nur möglich, wenn die
        KI-Verarbeitung Ihrer Bilder noch nicht begonnen hat. Dies liegt daran,
        dass die KI-Verarbeitung mit Kosten verbunden ist, die wir bereits bei
        Beginn des Prozesses tragen.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Ausschlusskriterien für Erstattungen
      </Heading>
      <Text>
        In folgenden Situationen können wir leider keine Rückerstattung
        gewähren:
      </Text>
      <UnorderedList pl={6}>
        <ListItem>
          Wenn die von Ihnen hochgeladenen Originalbilder nicht unseren
          Anforderungen entsprechen
        </ListItem>
        <ListItem>
          Wenn Sie bereits mindestens ein KI-generiertes Bild als
          zufriedenstellend bewertet haben
        </ListItem>
        <ListItem>
          Nach dem Download oder der Löschung der erstellten Porträtaufnahmen
        </ListItem>
      </UnorderedList>
      <Text>
        Bitte beachten Sie, dass alle Erstattungsanfragen innerhalb von 14 Tagen
        nach Kaufabschluss eingereicht werden müssen.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Erstattungsverfahren
      </Heading>
      <Text>
        Um eine Erstattung zu beantragen, senden Sie bitte eine E-Mail an{" "}
        <Link href="mailto:info@bewerbungsbild.ai" color="blue.500">
          info@bewerbungsbild.ai
        </Link>{" "}
        mit der E-Mail-Adresse, die Sie bei Ihrer Bestellung verwendet haben.
        Unser Team wird Ihre Anfrage innerhalb von 1-3 Werktagen prüfen und
        bearbeiten.
      </Text>
      <Text>
        Bei Genehmigung Ihrer Erstattung erfolgt die Rückzahlung innerhalb von
        5-10 Werktagen auf das ursprünglich für den Kauf verwendete
        Zahlungsmittel. Eine Erstattung auf alternative Konten oder
        Zahlungsmethoden ist nicht möglich.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Schutz vor Missbrauch
      </Heading>
      <Text>
        Bewerbungsbild AI verfolgt eine strikte Politik gegen Missbrauch unserer
        Erstattungsrichtlinien. Bei nachgewiesenem Missbrauch behalten wir uns
        das Recht vor, Erstattungsanträge abzulehnen und betreffende
        Benutzerkonten dauerhaft zu sperren. Wir setzen alle notwendigen
        Maßnahmen ein, um die Integrität unseres Services und die Interessen
        unserer gesamten Nutzergemeinschaft zu schützen.
      </Text>
    </VStack>
  </PageContainer>
);

export default RefundPage;
