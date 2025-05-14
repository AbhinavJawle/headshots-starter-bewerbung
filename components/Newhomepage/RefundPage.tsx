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
      <Heading as="h1" size="xl" fontWeight="bold">
        Nutzungsbedingungen
      </Heading>

      <Text>
        Die folgenden Bestimmungen regeln die Nutzung des KI-gestützten Dienstes
        Bewerbungsbild AI, der von Tümerkan Durmus, Zwieselbachweg 9, 90451
        Nürnberg betrieben wird. Mit der Nutzung unseres Services akzeptieren
        Sie diese Bedingungen vollumfänglich. Bewerbungsbild AI behält sich das
        Recht vor, diese Bedingungen bei Bedarf anzupassen, wobei die jeweils
        aktuelle Version maßgeblich ist.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Leistungsumfang und Bildqualität
      </Heading>
      <Text>
        Bewerbungsbild AI bietet einen innovativen Dienst zur Transformation
        Ihrer Aufnahmen in professionelle Bewerbungsfotos mittels künstlicher
        Intelligenz. Die Qualität der Ergebnisse hängt maßgeblich von der
        Einhaltung unserer Aufnahmerichtlinien ab. Unsere KI verarbeitet Ihre
        Originalbilder und erstellt je nach gewähltem Paket eine Auswahl von 3-6
        optimierten Porträtaufnahmen. Bitte beachten Sie, dass die generierten
        Bilder naturgemäß Abweichungen aufweisen können und keine exakte
        Reproduktion des Originals darstellen. Wir entwickeln unseren Service
        kontinuierlich weiter, wodurch sich Funktionen und Ergebnisqualität
        stetig verbessern.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Rechte und Datenschutz
      </Heading>
      <Text>
        Als Nutzer behalten Sie sämtliche Rechte an Ihren hochgeladenen
        Originalbildern. Die durch unsere KI generierten Bilder stehen Ihnen zur
        persönlichen sowie kommerziellen Verwendung uneingeschränkt zur
        Verfügung. Die Nutzung unseres Dienstes ist ausschließlich mit eigenen
        Bildern oder mit expliziter Genehmigung der abgebildeten Personen
        gestattet. Vertraulichkeit und Datenschutz genießen bei uns höchste
        Priorität. Ihre persönlichen Daten werden ausschließlich gemäß unserer
        Datenschutzerklärung verarbeitet und nicht ohne Ihre ausdrückliche
        Zustimmung für andere Zwecke verwendet. Wir speichern Ihre Daten nur so
        lange wie für die Erbringung unserer Dienstleistung erforderlich und
        treffen angemessene Sicherheitsmaßnahmen zum Schutz Ihrer Informationen.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Zahlungsbedingungen und Widerrufsrecht
      </Heading>
      <Text>
        Die Zahlungsabwicklung erfolgt sicher über unseren Partner Stripe. Mit
        dem Kauf eines digitalen Produkts bei Bewerbungsbild AI stimmen Sie zu,
        dass die Bereitstellung der digitalen Inhalte sofort beginnt, noch bevor
        die gesetzliche Widerrufsfrist von 14 Tagen abläuft. Sie verstehen und
        akzeptieren, dass durch diese Zustimmung Ihr Widerrufsrecht erlischt,
        sobald die Verarbeitung durch die KI beginnt. Diese Regelung ist
        notwendig, da es sich um individuell für Sie erstellte digitale Inhalte
        handelt.
      </Text>
      <Text>
        Rückerstattungen sind nur unter bestimmten Bedingungen möglich: Eine
        Erstattung kann erfolgen, wenn die KI-Verarbeitung noch nicht begonnen
        hat. Falls die generierten Bilder nicht Ihren Erwartungen entsprechen,
        bieten wir eine kostenlose erneute Generierung an, sofern Sie die
        vorgegebenen Fotovoraussetzungen eingehalten haben. Sobald die Bilder
        generiert und heruntergeladen wurden, besteht kein Anspruch auf
        Rückerstattung mehr. Aufgrund der hohen Kosten für die KI-Verarbeitung
        sind weitere Rückerstattungen ausgeschlossen, wenn die genannten
        Bedingungen nicht erfüllt sind.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Nutzungsbeschränkungen
      </Heading>
      <Text>
        Die Nutzung von Bewerbungsbild AI erfordert einen respektvollen und
        rechtskonformen Umgang mit unserem Service. Untersagt ist die Erstellung
        oder Verbreitung von Inhalten mit pornografischem, beleidigendem oder
        anderweitig anstößigem Charakter, Bildern, die gegen geltendes Recht
        verstoßen oder das Urheberrecht Dritter verletzen, sowie die
        missbräuchliche Nutzung des Services zur Irreführung oder Täuschung. Bei
        Verstößen gegen diese Richtlinien behalten wir uns vor, den Zugang zum
        Service zu sperren oder zu kündigen. Falls Sie der Meinung sind, dass
        Inhalte auf unserer Plattform Ihre Rechte verletzen, kontaktieren Sie
        uns bitte unter{" "}
        <Link href="mailto:info@bewerbungsbild.ai" color="blue.500">
          info@bewerbungsbild.ai
        </Link>
        , um eine Überprüfung und gegebenenfalls Entfernung zu veranlassen.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        Rechtliche Rahmenbedingungen
      </Heading>
      <Text>
        Für alle rechtlichen Ansprüche im Zusammenhang mit Bewerbungsbild AI
        gilt das Recht der Bundesrepublik Deutschland. Streitigkeiten werden,
        soweit gesetzlich zulässig, vorrangig durch außergerichtliche Einigung
        oder Mediation beigelegt. Der Service wird "wie besehen" bereitgestellt,
        ohne Garantie auf ständige Verfügbarkeit oder bestimmte Ergebnisse. Eine
        Haftung für direkte oder indirekte Schäden, die aus der Nutzung oder
        Unmöglichkeit der Nutzung des Services entstehen, wird – soweit
        gesetzlich zulässig – ausgeschlossen.
      </Text>
      <Text>
        Diese Vertragsbedingungen sind rechtswirksam und enthalten Regelungen zu
        Haftung, höherer Gewalt und Rechteübertragung. Die Unwirksamkeit
        einzelner Klauseln berührt nicht die Gültigkeit der übrigen
        Bestimmungen. Mit der Nutzung unseres Dienstes erklären Sie sich mit
        allen hier dargelegten Bedingungen einverstanden.
      </Text>
    </VStack>
  </PageContainer>
);

export default RefundPage;
