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

const PrivacyPage = () => (
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
        Datenschutzerklärung
      </Heading>

      <Text>Letzte Aktualisierung: 17.05.2025</Text>

      <Text>
        Bei KIBewerbungsfotos ("wir", "uns", "unser") ist der Schutz Ihrer
        personenbezogenen Daten von höchster Priorität. Diese
        Datenschutzerklärung informiert Sie transparent darüber, welche Daten
        wir erheben, wie wir sie nutzen und welche Rechte Sie in Bezug auf Ihre
        Daten haben.
      </Text>

      {/* <Text>
        Der Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO)
        ist:
      </Text>
      <Text>
        Tümerkan Durmus
        <br />
        Zwieselbachweg 9<br />
        90451 Nürnberg
        <br />
        Deutschland
        <br />
        E-Mail: info@bewerbungsbild.ai
      </Text> */}

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        1. Erfasste Daten
      </Heading>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Personenbezogene Daten
      </Heading>
      <Text>
        Im Rahmen der Nutzung unseres Services erheben wir personenbezogene
        Daten, welche zur ordnungsgemäßen Bereitstellung der Dienstleistung,
        insbesondere der Kontoerstellung, -verwaltung sowie der KI-gestützten
        Bildgenerierung, zwingend erforderlich sind. Dies umfasst Ihre
        E-Mail-Adresse für die Registrierung sowie weitere von Ihnen im
        Nutzungsverlauf bereitgestellte Informationen. Die von Ihnen
        hochgeladenen Bilddateien werden gemäß den geltenden
        Datenschutzbestimmungen verarbeitet und nach Ablauf einer 14-tägigen
        Aufbewahrungsfrist automatisch gelöscht. Bei Inanspruchnahme
        kostenpflichtiger Leistungen erfolgt die Zahlungsabwicklung
        ausschließlich über unseren Zahlungsdienstleister Dodopayments, wobei
        wir selbst keine Zahlungsinformationen speichern.
      </Text>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Nutzungsdaten
      </Heading>
      <Text>
        Zur Gewährleistung eines sicheren und stabilen Betriebs unseres Services
        erheben wir technische Nutzungsdaten. Dies umfasst insbesondere
        Informationen über das von Ihnen verwendete Endgerät, Betriebssystem und
        den Browser sowie grundlegende Interaktionsmuster mit der Plattform. Die
        Erfassung dieser Daten erfolgt ausschließlich in anonymisierter Form
        über Vercel Analytics, wobei weder Cookies gesetzt noch IP-Adressen
        gespeichert werden.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        2. Nutzung und Personalisierung von Daten
      </Heading>
      <Text>
        Wir verarbeiten Ihre Daten sorgfältig, um Ihnen unseren Service optimal
        bereitzustellen, kontinuierlich zu verbessern und eine personalisierte
        Nutzererfahrung zu ermöglichen. Dies umfasst die Verarbeitung Ihrer
        hochgeladenen Bilder zur Erstellung von Bewerbungsfotos, die sichere
        Verwaltung Ihres Kontos sowie die zuverlässige Abwicklung von Zahlungen.
      </Text>
      <Text>
        Ihre Daten helfen uns außerdem, Support-Anfragen zu beantworten und
        sicherzustellen, dass die Plattform zuverlässig funktioniert. Wir
        analysieren anonymisierte Nutzungsdaten, um die Benutzerfreundlichkeit
        zu optimieren und potenzielle Sicherheitsrisiken zu erkennen.
      </Text>
      <Text>
        Zudem nutzen wir Ihre Daten, um den Service an Ihre Nutzung anzupassen
        und Ihnen Inhalte, Funktionen oder Empfehlungen bereitzustellen, die auf
        Ihre Präferenzen und Ihr Nutzungsverhalten abgestimmt sind.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        3. Nutzung von Diensten Dritter
      </Heading>
      <Text>
        Um unseren Service bereitzustellen und eine stabile technische
        Infrastruktur zu gewährleisten, setzen wir verschiedene externe
        Dienstleister ein:
      </Text>
      <UnorderedList spacing={2} pl={5}>
        <ListItem>
          Astria.ai – Wird für die KI-gestützte Generierung und Optimierung von
          professionellen Bewerbungsfotos eingesetzt.
        </ListItem>
        <ListItem>
          Supabase – Fungiert als sichere Datenbank- und Speicherlösung für
          Benutzerkonten und Bildmaterial.
        </ListItem>
        <ListItem>
          Vercel – Stellt die technische Infrastruktur für einen zuverlässigen
          und leistungsstarken Betrieb unserer Plattform bereit.
        </ListItem>
        <ListItem>
          Vercel Analytics – Ermöglicht eine anonyme Analyse der Websitenutzung
          ohne Erfassung persönlicher Daten oder Verwendung von Cookies.
        </ListItem>
        <ListItem>
          Google Auth – Ermöglicht eine sichere und bequeme Anmeldung über
          bestehende Google-Konten.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        4. Weitergabe von Informationen
      </Heading>
      <Text>Der Verkauf personenbezogener Daten findet nicht statt.</Text>
      <Text>
        Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer in
        den folgenden Fällen:
      </Text>
      <UnorderedList spacing={2} pl={5}>
        <ListItem>
          Mit Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO
          oder auf Ihre konkrete Anweisung hin.
        </ListItem>
        <ListItem>
          An sorgfältig ausgewählte Auftragsverarbeiter gemäß Art. 28 DSGVO,
          sofern dies zur Bereitstellung unserer Dienstleistungen erforderlich
          ist (z.B. Hosting-, Zahlungs- oder Analysedienste).
        </ListItem>
        <ListItem>
          Zur Erfüllung rechtlicher Verpflichtungen gemäß Art. 6 Abs. 1 lit. c
          DSGVO oder aufgrund behördlicher bzw. gerichtlicher Anordnungen.
        </ListItem>
        <ListItem>
          Zum Schutz berechtigter Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO,
          insbesondere zur Verhinderung von Betrug, zur Gewährleistung der
          IT-Sicherheit und zum Schutz unserer Rechte und unseres Eigentums.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        5. Datensicherheit
      </Heading>
      <Text>
        Der Schutz Ihrer Daten hat für uns oberste Priorität. Wir implementieren
        modernste Sicherheitsmaßnahmen, um unbefugten Zugriff, Verlust oder
        Missbrauch Ihrer personenbezogenen Informationen zu verhindern. Alle
        Datenübertragungen erfolgen verschlüsselt über SSL/TLS, um eine sichere
        Kommunikation zu gewährleisten.
      </Text>
      <Text>
        Unsere Systeme werden durch umfassende technische und organisatorische
        Maßnahmen geschützt, die wir regelmäßig aktualisieren und an den
        neuesten Stand der Technik anpassen. Dies beinhaltet strikte
        Zugriffskontrollen, verschlüsselte Datenspeicherung und robuste
        Schutzmechanismen gegen Manipulation oder unbefugte Nutzung.
      </Text>
      <Text>
        Auch wenn wir höchste Sicherheitsstandards einsetzen, kann keine
        digitale Übertragung oder Speicherung absolute Sicherheit garantieren.
        Wir arbeiten daher kontinuierlich an Verbesserungen, um das bestmögliche
        Schutzniveau für Ihre Daten sicherzustellen.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        6. Änderungen dieser Datenschutzerklärung
      </Heading>
      <Text>
        Diese Datenschutzerklärung wird regelmäßig überprüft und bei Bedarf
        aktualisiert, um rechtliche Anforderungen oder Änderungen an unserem
        Service zu berücksichtigen. Bei Anpassungen wird das
        Aktualisierungsdatum am Anfang dieser Richtlinie entsprechend geändert.
      </Text>
      <Text>
        Mit der weiteren Nutzung unseres Services nach Inkrafttreten der
        Änderungen stimmen Sie der überarbeiteten Datenschutzerklärung zu. Bei
        Fragen können Sie uns jederzeit unter{" "}
        <Link href="mailto:info@kibewerbungsfotos.de" color="blue.500">
          info@kibewerbungsfotos.de{" "}
        </Link>{" "}
        kontaktieren.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        7. Ihre Rechte gemäß der Datenschutz-Grundverordnung (DSGVO)
      </Heading>
      <Text>
        Als Nutzer in der Europäischen Union oder im Europäischen
        Wirtschaftsraum (EWR) haben Sie nach der DSGVO umfassende Rechte
        bezüglich Ihrer personenbezogenen Daten.
      </Text>
      <UnorderedList spacing={2} pl={5}>
        <ListItem>
          Auskunftsrecht: Sie können jederzeit Auskunft darüber verlangen, ob
          und welche personenbezogenen Daten wir von Ihnen verarbeiten. Eine
          Kopie dieser Daten stellen wir Ihnen auf Anfrage zur Verfügung.
        </ListItem>
        <ListItem>
          Recht auf Berichtigung, Löschung und Einschränkung: Sie können die
          Korrektur fehlerhafter Daten sowie die Löschung nicht mehr benötigter
          Daten verlangen. In bestimmten Fällen können Sie auch eine
          Einschränkung der Verarbeitung erwirken.
        </ListItem>
        <ListItem>
          Widerspruchsrecht: Gegen die Verarbeitung Ihrer Daten auf Basis eines
          berechtigten Interesses können Sie Widerspruch einlegen. Die
          Verarbeitung wird dann eingestellt, sofern keine zwingenden Gründe
          dagegen sprechen. Dies gilt auch für Direktwerbung.
        </ListItem>
        <ListItem>
          Recht auf Datenübertragbarkeit: Ihre Daten können Sie in einem
          gängigen, maschinenlesbaren Format anfordern oder direkt an andere
          Dienstleister übertragen lassen.
        </ListItem>
        <ListItem>
          Widerruf der Einwilligung: Eine erteilte Einwilligung zur
          Datenverarbeitung können Sie jederzeit mit Wirkung für die Zukunft
          widerrufen.
        </ListItem>
        <ListItem>
          Beschwerderecht: Bei Datenschutzverstößen steht Ihnen das Recht zu,
          Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
        </ListItem>
      </UnorderedList>
      <Text mt={2}>
        Zur Ausübung Ihrer Rechte oder für Fragen zur Verarbeitung Ihrer Daten
        können Sie uns jederzeit unter{" "}
        <Link href="mailto:info@kibewerbungsfotos.de" color="blue.500">
          info@kibewerbungsfotos.de
        </Link>{" "}
        kontaktieren.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        8. Meldung von Datenverletzungen
      </Heading>
      <Text>
        Im Falle einer Sicherheitsverletzung, die personenbezogene Daten
        betrifft, werden wir Sie umgehend benachrichtigen. Entsprechend der
        gesetzlichen Bestimmungen erfolgt diese Benachrichtigung innerhalb von
        72 Stunden nach Feststellung der Verletzung, wenn ein Risiko für Ihre
        Rechte und Freiheiten besteht. Wir werden unverzüglich alle notwendigen
        Schritte einleiten, um die Ursache zu ermitteln, potenzielle Schäden
        einzudämmen und künftige Sicherheitsvorfälle zu vermeiden.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        9. Benutzerauthentifizierung
      </Heading>
      <Text>
        Für die sichere Benutzeranmeldung und -verwaltung setzen wir auf
        Supabase Auth. Sie können sich bei unserem Service entweder mit Ihrer
        E-Mail-Adresse oder bequem über Ihr Google-Konto anmelden.
      </Text>
      <UnorderedList spacing={2} pl={5} mt={2}>
        <ListItem>
          E-Mail-Anmeldung: Diese Option ermöglicht Ihnen die Erstellung und
          Verwaltung eines Kontos mit Ihrer E-Mail-Adresse. Dabei werden nur die
          notwendigsten Daten gespeichert.
        </ListItem>
        <ListItem>
          Google-Anmeldung: Bei der Nutzung der Google-Authentifizierung
          erhalten wir über Supabase lediglich grundlegende Informationen wie
          Ihre E-Mail-Adresse, Ihren Namen und optional Ihr Profilbild. Diese
          Daten verwenden wir ausschließlich zur Kontoidentifikation und
          personalisierten Darstellung.
        </ListItem>
      </UnorderedList>
      <Text mt={2}>
        Bitte beachten Sie, dass bei der Google-Anmeldung zusätzliche
        Datenverarbeitung durch Google gemäß deren Datenschutzbestimmungen
        erfolgen kann. Details hierzu finden Sie in der
        Google-Datenschutzerklärung und den Supabase-Datenschutzrichtlinien.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        10. Cookies
      </Heading>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Cookie-Einstellungen
      </Heading>
      <Text>
        Wir verwenden ausschließlich technisch notwendige Cookies, um die
        grundlegenden Funktionen unserer Website sicherzustellen. Diese Cookies
        sind essentiell für den Betrieb der Website und ermöglichen Ihnen die
        Navigation und Nutzung der grundlegenden Funktionen.
      </Text>
      <Text>Ihre aktuelle Einstellung: Nur notwendige Cookies aktiviert</Text>
      <Text>Unsere Website verwendet ausschließlich:</Text>
      <UnorderedList spacing={2} pl={5} mt={2}>
        <ListItem>
          Notwendige Cookies: Diese Cookies sind für die Grundfunktionen unserer
          Website erforderlich, wie beispielsweise die Sitzungsverwaltung und
          Authentifizierung. Sie können nicht deaktiviert werden, da sie für den
          ordnungsgemäßen Betrieb der Website unerlässlich sind.
        </ListItem>
        <ListItem>
          Session Cookies: Diese temporären Cookies werden nur während Ihres
          Besuchs auf unserer Website verwendet und beim Schließen des Browsers
          automatisch gelöscht. Sie dienen ausschließlich technischen Zwecken.
        </ListItem>
        <ListItem>
          Authentifizierungs-Cookies: Diese Cookies sind notwendig, um Sie bei
          der Anmeldung zu identifizieren und Ihre Sitzung sicher zu verwalten.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        11. Verarbeitung von KI-Bildern
      </Heading>
      <Text>
        Wenn Sie unsere Plattform nutzen, um Bilder hochzuladen und mithilfe
        unserer KI Bewerbungsfotos zu generieren, behandeln wir Ihre Daten mit
        höchster Sorgfalt und Vertraulichkeit. Ihre hochgeladenen Originalbilder
        werden sicher auf unseren Servern innerhalb der EU gespeichert und nach
        14 Tagen automatisch gelöscht, sofern Sie diese nicht bereits früher
        selbst entfernen. Die durch unsere KI generierten Bewerbungsbilder
        bleiben für maximal 30 Tage gespeichert und werden danach automatisch
        aus unserem System entfernt. Sie behalten stets die volle Kontrolle über
        Ihre Daten - durch Löschung Ihres Kontos werden alle zugehörigen
        Informationen, einschließlich sämtlicher Bilder, unwiderruflich
        gelöscht. Diese strengen Datenschutzmaßnahmen gewährleisten, dass Ihre
        Privatsphäre zu jedem Zeitpunkt optimal geschützt ist.
      </Text>
    </VStack>
  </PageContainer>
);

export default PrivacyPage;
