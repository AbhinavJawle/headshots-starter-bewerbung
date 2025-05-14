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
      <Heading as="h1" size="xl" fontWeight="bold">
        Datenschutzerklärung
      </Heading>

      <Text>Letzte Aktualisierung: 02.03.2025</Text>

      <Text>
        Bei Bewerbungsbild AI (“wir”, “uns”, “unser”) legen wir großen Wert auf
        den Schutz Ihrer personenbezogenen Daten. In dieser Datenschutzerklärung
        informieren wir Sie darüber, welche Daten wir erheben, wie wir sie
        nutzen und welche Rechte Sie in Bezug auf Ihre Daten haben.
      </Text>

      <Text>
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
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        1. Erfasste Daten
      </Heading>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Personenbezogene Daten
      </Heading>
      <Text>
        Wenn Sie unseren Service nutzen, erfassen wir personenbezogene Daten,
        die für die Erstellung und Verwaltung Ihres Kontos sowie für die
        Bereitstellung unserer KI-gestützten Fotogenerierung erforderlich sind.
        Dazu gehören Ihre E-Mail-Adresse zur Anmeldung sowie weitere
        Informationen, die Sie während der Nutzung angeben. Hochgeladene Bilder
        werden verarbeitet und für maximal 14 Tage gespeichert, bevor sie
        automatisch gelöscht werden. Falls Sie eine kostenpflichtige
        Dienstleistung nutzen, erfolgt die Zahlungsabwicklung über Stripe, ohne
        dass wir selbst Zahlungsinformationen speichern.
      </Text>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Nutzungsdaten
      </Heading>
      <Text>
        Zusätzlich erheben wir technische Daten über die Nutzung unseres
        Services, um eine sichere und stabile Funktion zu gewährleisten. Dazu
        gehören Informationen über Ihr Gerät, das verwendete Betriebssystem und
        Ihren Browser sowie allgemeine Interaktionen mit der Plattform. Diese
        Daten werden anonymisiert über Umami Analytics erfasst, ohne Cookies
        oder die Speicherung von IP-Adressen.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        2. Nutzung und Personalisierung von Daten
      </Heading>
      <Text>
        Wir verarbeiten Ihre Daten, um Ihnen unseren Service bereitzustellen, zu
        verbessern und eine personalisierte Nutzererfahrung zu ermöglichen. Dazu
        gehört die Verarbeitung hochgeladener Bilder zur Erstellung von
        Bewerbungsfotos, die Verwaltung Ihres Kontos sowie die Abwicklung von
        Zahlungen.
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
          Fal.ai – Wird zur Verarbeitung hochgeladener Bilder und zur
          KI-basierten Erstellung von Bewerbungsfotos genutzt.
        </ListItem>
        <ListItem>
          Supabase – Dient als Datenbank- und Speichersystem für Nutzerkonten
          und hochgeladene Bilder.
        </ListItem>
        <ListItem>
          Vercel – Hostet unsere Plattform und ermöglicht eine sichere und
          performante Bereitstellung des Services.
        </ListItem>
        <ListItem>
          Umami – Wird zur anonymisierten Analyse der Nutzung unserer Website
          eingesetzt, ohne personenbezogene Daten oder Cookies zu speichern.
        </ListItem>
        <ListItem>
          Google Auth – Bietet die Möglichkeit, sich über ein Google-Konto
          sicher bei unserem Service anzumelden.
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
          Mit Ihrer Zustimmung oder auf Ihre Anweisung – Falls Sie uns
          ausdrücklich dazu berechtigen, Ihre Daten weiterzugeben.
        </ListItem>
        <ListItem>
          Mit externen Dienstleistern – Wenn es für die Bereitstellung unseres
          Services erforderlich ist, teilen wir Daten mit Anbietern, die in
          unserem Auftrag arbeiten, wie Hosting-, Zahlungs- oder
          Analyse-Dienstleister.
        </ListItem>
        <ListItem>
          Zur Einhaltung rechtlicher Verpflichtungen – Falls eine Offenlegung
          erforderlich ist, um geltenden Gesetzen, behördlichen Anfragen oder
          rechtlichen Verfahren nachzukommen.
        </ListItem>
        <ListItem>
          Zum Schutz unseres Dienstes und unserer Nutzer – Wenn es notwendig
          ist, um Betrug oder Missbrauch zu verhindern, Sicherheitsrisiken zu
          minimieren oder unsere Rechte und unser Eigentum zu schützen.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        5. Datensicherheit
      </Heading>
      <Text>
        Der Schutz Ihrer Daten hat für uns höchste Priorität. Wir setzen moderne
        Sicherheitsmaßnahmen ein, um unbefugten Zugriff, Verlust oder Missbrauch
        Ihrer personenbezogenen Informationen zu verhindern. Sämtliche
        Datenübertragungen erfolgen verschlüsselt über SSL/TLS, um eine sichere
        Kommunikation zu gewährleisten.
      </Text>
      <Text>
        Unsere Systeme sind durch technische und organisatorische Maßnahmen
        abgesichert, die regelmäßig aktualisiert und an den aktuellen Stand der
        Technik angepasst werden. Dazu gehören Zugriffskontrollen,
        verschlüsselte Speicherung sensibler Informationen und Schutzmechanismen
        gegen Manipulation oder unbefugte Nutzung.
      </Text>
      <Text>
        Trotz dieser Maßnahmen ist keine digitale Übertragung oder Speicherung
        vollkommen sicher. Daher setzen wir kontinuierlich auf Verbesserungen,
        um das höchstmögliche Sicherheitsniveau zu gewährleisten.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        6. Änderungen dieser Datenschutzerklärung
      </Heading>
      <Text>
        Diese Datenschutzerklärung kann gelegentlich aktualisiert werden, um
        rechtliche Anforderungen oder Änderungen an unserem Service
        widerzuspiegeln. Falls wir Anpassungen vornehmen, wird das
        Aktualisierungsdatum am Anfang dieser Richtlinie entsprechend geändert.
      </Text>
      <Text>
        Durch die fortgesetzte Nutzung unseres Services nach Inkrafttreten der
        Änderungen akzeptieren Sie die überarbeitete Datenschutzerklärung.
        Sollten Sie Fragen dazu haben, können Sie uns jederzeit unter{" "}
        <Link href="mailto:info@bewerbungsbild.ai" color="blue.500">
          info@bewerbungsbild.ai
        </Link>{" "}
        kontaktieren.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        7. Ihre Rechte gemäß der Datenschutz-Grundverordnung (DSGVO)
      </Heading>
      <Text>
        Wenn Sie in der Europäischen Union oder im Europäischen Wirtschaftsraum
        (EWR) ansässig sind, haben Sie nach der DSGVO verschiedene Rechte in
        Bezug auf Ihre personenbezogenen Daten.
      </Text>
      <UnorderedList spacing={2} pl={5}>
        <ListItem>
          Auskunftsrecht: Sie können eine Bestätigung darüber verlangen, ob wir
          personenbezogene Daten von Ihnen verarbeiten, und erhalten auf Wunsch
          eine Kopie dieser Daten.
        </ListItem>
        <ListItem>
          Recht auf Berichtigung, Löschung und Einschränkung: Falls gespeicherte
          Daten fehlerhaft oder nicht mehr erforderlich sind, haben Sie das
          Recht, eine Korrektur oder Löschung zu beantragen. In bestimmten
          Fällen können Sie auch verlangen, dass die Verarbeitung Ihrer Daten
          eingeschränkt wird.
        </ListItem>
        <ListItem>
          Widerspruchsrecht: Wenn wir Ihre Daten auf Grundlage eines
          berechtigten Interesses verarbeiten, können Sie dieser Verarbeitung
          widersprechen. Falls es sich nicht um zwingende rechtliche oder
          geschäftliche Gründe handelt, stellen wir die Verarbeitung ein. Sie
          können auch der Nutzung Ihrer Daten für Direktwerbung widersprechen.
        </ListItem>
        <ListItem>
          Recht auf Datenübertragbarkeit: Sie haben das Recht, Ihre
          personenbezogenen Daten in einem strukturierten, gängigen und
          maschinenlesbaren Format zu erhalten oder diese an einen anderen
          Anbieter übertragen zu lassen.
        </ListItem>
        <ListItem>
          Widerruf einer Einwilligung: Falls die Verarbeitung Ihrer Daten auf
          Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für
          die Zukunft widerrufen.
        </ListItem>
        <ListItem>
          Beschwerderecht: Falls Sie der Meinung sind, dass wir gegen
          Datenschutzbestimmungen verstoßen haben, können Sie eine Beschwerde
          bei der zuständigen Datenschutzbehörde einreichen.
        </ListItem>
      </UnorderedList>
      <Text mt={2}>
        Zur Ausübung Ihrer Rechte oder für Fragen zur Verarbeitung Ihrer Daten
        können Sie uns jederzeit unter{" "}
        <Link href="mailto:info@bewerbungsbild.ai" color="blue.500">
          info@bewerbungsbild.ai
        </Link>{" "}
        kontaktieren.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        8. Meldung von Datenverletzungen
      </Heading>
      <Text>
        Sollte es zu einer Sicherheitsverletzung kommen, bei der
        personenbezogene Daten betroffen sind, werden wir Sie unverzüglich
        darüber informieren. In Übereinstimmung mit den gesetzlichen Vorgaben
        erfolgt die Benachrichtigung spätestens 72 Stunden nach Bekanntwerden
        der Verletzung, sofern ein Risiko für Ihre Rechte und Freiheiten
        besteht. Zudem ergreifen wir alle erforderlichen Maßnahmen, um die
        Ursache der Datenverletzung zu analysieren, mögliche Schäden zu
        minimieren und zukünftige Vorfälle zu verhindern.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        9. Benutzerauthentifizierung
      </Heading>
      <Text>
        Wir verwenden Supabase Auth für die Benutzeranmeldung und -verwaltung.
        Dabei haben Sie die Möglichkeit, sich entweder mit Ihrer E-Mail-Adresse
        oder über Google Auth anzumelden.
      </Text>
      <UnorderedList spacing={2} pl={5} mt={2}>
        <ListItem>
          E-Mail-Adresse: Wird genutzt, um ein Konto zu erstellen oder ein
          bestehendes Konto zu verwalten.
        </ListItem>
        <ListItem>
          Google-Authentifizierung: Wenn Sie sich mit Ihrem Google-Konto
          anmelden, stellt Google uns über Supabase bestimmte Informationen
          bereit, darunter Ihre E-Mail-Adresse, Ihren Namen und Ihr Profilbild.
          Diese Daten dienen zur Identifikation und Personalisierung Ihres
          Kontos.
        </ListItem>
      </UnorderedList>
      <Text mt={2}>
        Bitte beachten Sie, dass Google möglicherweise zusätzliche Daten gemäß
        deren Datenschutzrichtlinie verarbeitet. Weitere Informationen dazu
        finden Sie in der Datenschutzerklärung von Google sowie in der Supabase
        Privacy Policy.
      </Text>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        10. Cookies
      </Heading>
      <Heading as="h3" size="md" fontWeight="bold" mt={4}>
        Cookie-Einstellungen
      </Heading>
      <Text>
        Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer
        Website zu bieten. Cookies helfen uns dabei, die Nutzung unserer Website
        zu analysieren und relevante Werbung anzuzeigen.
      </Text>
      <Text>Ihre aktuelle Einstellung: Cookies akzeptiert</Text>
      <Text>Unsere Website verwendet folgende Arten von Cookies:</Text>
      <UnorderedList spacing={2} pl={5} mt={2}>
        <ListItem>
          Notwendige Cookies: Diese Cookies sind für die Grundfunktionen unserer
          Website erforderlich und können nicht deaktiviert werden.
        </ListItem>
        <ListItem>
          Analyse-Cookies: Diese Cookies helfen uns zu verstehen, wie Besucher
          mit unserer Website interagieren, indem sie Informationen anonym
          sammeln und melden. Diese Cookies werden nur mit Ihrer ausdrücklichen
          Zustimmung gesetzt.
        </ListItem>
        <ListItem>
          Marketing-Cookies: Diese Cookies werden verwendet, um Besuchern auf
          Websites relevante Anzeigen zu schalten. Diese Cookies werden nur mit
          Ihrer ausdrücklichen Zustimmung gesetzt.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" size="lg" fontWeight="bold" mt={6}>
        11. Verarbeitung von KI-Bildern
      </Heading>
      <Text>
        Wenn Sie unsere Plattform nutzen, um Bilder hochzuladen und mithilfe
        unserer KI Bewerbungsfotos zu generieren, behandeln wir Ihre Daten mit
        höchster Vertraulichkeit. Ihre hochgeladenen Bilder werden auf unseren
        Servern in der EU gespeichert und automatisch nach 14 Tagen gelöscht,
        sofern Sie diese nicht zuvor selbst entfernen. Die generierten
        Bewerbungsbilder bleiben bis zu 30 Tage gespeichert und werden
        anschließend automatisch gelöscht. Sie haben jederzeit die Möglichkeit,
        Ihr Konto zu löschen, wodurch alle damit verbundenen Daten,
        einschließlich hochgeladener und generierter Bilder, endgültig entfernt
        werden. Diese Maßnahmen stellen sicher, dass Sie die volle Kontrolle
        über Ihre Daten haben und Ihre Privatsphäre jederzeit gewahrt bleibt.
      </Text>
    </VStack>
  </PageContainer>
);

export default PrivacyPage;
