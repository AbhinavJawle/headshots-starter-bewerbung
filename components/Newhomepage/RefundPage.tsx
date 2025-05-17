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
      <Heading as="h2" size="lg" fontWeight="bold">
        Rückerstattungsrichtlinie
      </Heading>
      <Text>
        Bei KIBewerbungsfotos steht Ihre Zufriedenheit mit unseren
        Dienstleistungen an erster Stelle. Die nachfolgenden Richtlinien
        beschreiben die Bedingungen für mögliche Erstattungen sowie den
        entsprechenden Ablauf.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Qualitätsversprechen
      </Heading>
      <Text>
        Unser Service garantiert Ihnen 3-6 hochwertige Porträtbilder. Sie können
        aus allen generierten Bildern Ihre Favoriten auswählen. Falls keines der
        bereitgestellten Bilder Ihren Erwartungen entspricht, generieren wir
        kostenfrei neue Bilder für Sie.
      </Text>
      <Text>
        Eine Rückerstattung des vollen Betrags ist ausschließlich vor Beginn der
        KI-Verarbeitung Ihrer Bilder möglich, da uns bereits zu diesem Zeitpunkt
        Verarbeitungskosten entstehen.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Ausschlusskriterien für Erstattungen
      </Heading>
      <Text>Eine Rückerstattung ist in folgenden Fällen ausgeschlossen:</Text>
      <UnorderedList pl={6}>
        <ListItem>
          Bei Originalbildern, die nicht den technischen Anforderungen
          entsprechen
        </ListItem>
        <ListItem>
          Nach positiver Bewertung mindestens eines KI-generierten Bildes
        </ListItem>
        <ListItem>
          Nach erfolgtem Download oder Löschung der erstellten Bilder
        </ListItem>
      </UnorderedList>
      <Text>
        Erstattungsanträge müssen innerhalb von 14 Tagen nach dem Kaufdatum
        gestellt werden.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Erstattungsverfahren
      </Heading>
      <Text>
        Für eine Erstattung kontaktieren Sie uns bitte per E-Mail an{" "}
        <Link href="mailto:info@kibewerbungsfotos.de" color="blue.500">
          info@kibewerbungsfotos.de
        </Link>{" "}
        unter Angabe der bei der Bestellung verwendeten E-Mail-Adresse. Wir
        bearbeiten Ihre Anfrage innerhalb von 1-3 Werktagen.
      </Text>
      <Text>
        Genehmigte Erstattungen werden binnen 5-10 Werktagen auf das
        ursprüngliche Zahlungsmittel zurückerstattet. Erstattungen auf andere
        Konten oder Zahlungsmethoden sind nicht durchführbar.
      </Text>
      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Schutz vor Missbrauch
      </Heading>
      <Text>
        KIBewerbungsfotos verfolgt eine Null-Toleranz-Politik gegenüber
        Missbrauch unserer Erstattungsrichtlinien. Bei festgestelltem Missbrauch
        behalten wir uns vor, Erstattungsanträge abzulehnen und entsprechende
        Konten zu sperren. Wir implementieren alle erforderlichen Maßnahmen zum
        Schutz unseres Services und unserer Nutzergemeinschaft.
      </Text>
    </VStack>
  </PageContainer>
);

export default RefundPage;
