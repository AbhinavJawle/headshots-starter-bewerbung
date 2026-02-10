"use client";

import PageContainer from "@/components/PageContainer";
import { Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const FaqPage = () => (
  <PageContainer>
    <VStack
      marginX="auto"
      maxWidth="container.lg"
      p={10}
      spacing={4}
      backgroundColor="white"
      borderRadius="lg"
      width="100%"
      alignItems="flex-start"
    >
      <Text fontWeight="bold" fontSize="3xl">
        Häufig gestellte Fragen (FAQ)
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        📸 Welche Art von Fotos sollte ich hochladen?
      </Text>
      <Text>
        Wir empfehlen Ihnen, eine Vielzahl von Fotos hochzuladen, um
        sicherzustellen, dass Ihr KI-generiertes Bewerbungsfoto so genau wie
        möglich ist. Dazu können Nahaufnahmen Ihres Gesichts, Profilfotos und
        Ganzkörperaufnahmen gehören. Es ist wichtig sicherzustellen, dass Ihre
        Fotos klar und von hoher Qualität sind und keine anderen Personen oder
        Tiere enthalten. Wir empfehlen außerdem, eine Reihe von
        Gesichtsausdrücken, Orten, Hintergründen und Perspektiven in Ihre Fotos
        einzubeziehen, um die genauesten Bewerbungsfotos zu erstellen.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        👩‍🎨 Wie ähnlich werden die KI-Bewerbungsfotos meinem Aussehen sein?
      </Text>
      <Text>
        Die Genauigkeit Ihrer KI-Bewerbungsfotos hängt stark von der Anzahl und
        Vielfalt der von Ihnen bereitgestellten Fotos ab. Je besser und
        vielfältiger die Fotos sind, desto einfacher wird es für die KI, Ihre
        Gesichts- und Körpermerkmale zu verstehen und nachzubilden. Dadurch ist
        es wahrscheinlicher, dass Ihr Bewerbungsfoto Ihrem tatsächlichen
        Aussehen sehr nahe kommt!
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        💰 Ist eine Rückerstattung möglich?
      </Text>
      <Text>
        Eine Rückerstattung für Käufe innerhalb der ersten 14 Tage ist möglich,
        solange Sie die KI noch nicht trainiert haben. Sobald jedoch die
        14-Tage-Frist abgelaufen ist oder Sie den Dienst bereits genutzt haben
        (durch Klicken auf die Schaltfläche „Trainieren“), haben Sie keinen
        Anspruch mehr auf eine Rückerstattung.
      </Text>
      <Text>
        Bitte stellen Sie sicher, dass Sie eine ausreichende Anzahl hochwertiger
        Fotos hochladen, um Enttäuschungen bei den generierten Bewerbungsfotos
        zu vermeiden!
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Was machen Sie mit meinen hochgeladenen Fotos?
      </Text>
      <Text>
        Die von Ihnen hochgeladenen Fotos werden verwendet, um unser KI-Modell
        zu trainieren, damit es realistische KI-Bewerbungsfotos erstellen kann.
        Diese Eingabefotos werden innerhalb von 7 Tagen gelöscht, aber Sie
        können sie jederzeit sofort über unsere Schaltfläche „Löschen“
        entfernen.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Wem gehören meine KI-Fotos?
      </Text>
      <Text>
        Ihnen. Wir gewähren Ihnen die volle kommerzielle Lizenz und das Eigentum
        an Ihren Fotos. Sie können Ihr Bewerbungsfoto also uneingeschränkt
        nutzen.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Was wird bei KI-Bewerbungsfotos oft missverstanden?
      </Text>
      <Text>
        Nicht jedes Foto ist perfekt. Aufgrund der Natur der KI sehen Sie
        möglicherweise einige seltsame Ergebnisse. KIBewerbungsfotos versucht,
        dies von Anfang an klarzustellen: Nicht jedes Foto ist perfekt, aber wir
        versprechen Ihnen, dass Sie in jeder Bestellung ein profilwürdiges
        Bewerbungsfoto finden werden, das den Aufwand wert ist.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Wie viele gute Fotos kann ich erwarten?
      </Text>
      <Text>
        Die Anzahl der brauchbaren Bewerbungsfotos, die Sie erhalten, hängt
        stark von den Fotos ab, die Sie uns zur Verfügung stellen. Kunden, die
        sich bemühen, die Anweisungen genau zu befolgen, erhalten oft 8-10+
        unglaubliche Fotos. Zumindest garantieren wir Ihnen, dass Sie ein
        profilwürdiges Bewerbungsfoto zurückbekommen.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Kann ich KI-Bewerbungsfotos auf LinkedIn verwenden?
      </Text>
      <Text>
        35 % der KIBewerbungsfotos verwenden ihre KI-Bewerbungsfotos auf
        LinkedIn. Es ist völlig in Ordnung, KI-Bewerbungsfotos auf LinkedIn zu
        verwenden. Ein modernes Bewerbungsfoto kann hier einen guten Eindruck
        machen.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        Kann ChatGPT Bewerbungsfotos generieren?
      </Text>
      <Text>
        Ja, ChatGPT kann sehr einfache Headshots generieren. Diese sind jedoch
        nicht realistisch genug, um sie professionell zu verwenden, können aber
        zum Herumspielen Spaß machen. Nutzen Sie KIBewerbungsfotos für
        KI-Bewerbungsfotos, die Sie professionell einsetzen können.
      </Text>

      <Text fontWeight="bold" fontSize="xl">
        🖼 Was passiert mit meinen Fotos?
      </Text>
      <Text>
        Sie können alle mit dem Studio verbundenen Fotos und Datensätze löschen,
        indem Sie das Studio aus Ihrem Konto löschen. Sobald die Studio-Credits
        aufgebraucht sind, wird das Modell innerhalb von 24 Stunden automatisch
        gelöscht.
      </Text>
      <Text>
        Um die Löschung Ihres Kontos und aller zugehörigen Daten zu beantragen,
        senden Sie bitte eine E-Mail an{" "}
        <Link href="mailto:abhinav@kibewerbungsfotos.de">
          abhinav@kibewerbungsfotos.de
        </Link>
        Bitte beachten Sie, dass Sie durch die Löschung Ihres Kontos keinen
        Zugriff mehr auf die mit Ihrem Konto verbundenen Daten oder Inhalte
        haben.
      </Text>
      <Text>
        Bitte beachten Sie, dass nur die Daten auf den Photoshot-Servern
        gelöscht werden. Daten, die an Replicate übertragen wurden, werden nicht
        gelöscht. Sie müssten sich gemäß deren{" "}
        <Link href="https://astria.ai/privacy">Nutzungsbedingungen</Link> an
        Replicate wenden, um dies zu tun.
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        ❓ Wie funktioniert es?
      </Text>
      <Text>
        Siehe <Link href="/how-it-works">diese Seite</Link>
      </Text>
    </VStack>
  </PageContainer>
);

export default FaqPage;
