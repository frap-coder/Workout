# Workout / Daily Reps naar Google Play

Bijgewerkt op 23 november 2026. Het Capacitor Android-project is aangemaakt in deze repository. Een Play Console-app en winkelpublicatie maak je zelf in je ontwikkelaarsaccount. Zie ANDROID_BUILD.md voor bouwen, ondertekenen en uploaden.

## Aanbevolen route

De bestaande webapp is met Capacitor 8.6.2 verpakt als Android-app met meegeleverde bestanden uit `dist/`. De Android-code staat in deze bestaande repository. De GitHub Pages-versie blijft apart bruikbaar. Een herschrijving van de hele app is hiervoor niet nodig.

De huidige app gebruikt browseropslag, service-workerupdates, Web Audio en browser-wake-lock. Het toevoegen van een Android-verpakking vraagt daarom ook om controles van opslag, bestanden importeren/exporteren, de Android-terugknop, externe links, scherm aanhouden, pauzeren/hervatten en geluid op een echte telefoon. De huidige webopnamen bewijzen die Android-specifieke werking nog niet.

## Updates

- **Huidige website/PWA:** de knop voor updates is passend. Hij haalt een nieuwe offline versie van de website op en activeert die buiten een lopende training.
- **Aanbevolen Android-app met gebundelde bestanden:** code en oefenbibliotheek gaan mee in een nieuwe Android App Bundle. Updates lopen via Google Play. De web-updateknop is in Android verwijderd. Service-workerregistratie wordt daar overgeslagen; de bestanden zitten in de app.
- **Alternatief: Trusted Web Activity:** die toont de gehoste website. Website-updates blijven via de website/service worker lopen; updates van de Android-verpakking lopen via Google Play. In die opzet moeten de twee soorten updates duidelijk onderscheiden worden. Voor deze app is de gebundelde route eenvoudiger te begrijpen en onafhankelijker van de eerste internetverbinding.

## Concrete stappen

1. **Google Play-ontwikkelaarsaccount.** Maak zelf een persoonlijk of organisatieaccount aan in Play Console, betaal de eenmalige registratiekosten van US$25 en voltooi de gevraagde identiteits-/accountverificatie. Nieuwe persoonlijke accounts kunnen ook verificatie met een fysiek Android-apparaat vereisen. Gebruik een account dat blijvend van de eigenaar van deze app is.
2. **Android-identiteit en verpakking.** De app gebruikt application ID `nl.frapcoder.workout`, naam Daily Reps en eerste versie 1.0.0 (code 1). Het Android-project gebruikt API 36 en `dist` als webmap. Er is geen nieuwe GitHub-repository nodig.
3. **Android-gedrag afmaken.** Bundel de bestanden, schakel de web-updater uit in de native uitvoering, behoud betrouwbare lokale opslag en controleer bestandsimport/export. Open de Examples-zoekacties in een externe browser. Test de terugknop, schermrotatie, timer, geluid en app-herstart op een echte telefoon. Als een alarm ook bij vergrendeld scherm of op de achtergrond gegarandeerd moet zijn, moet daarvoor native ondersteuning worden toegevoegd; de huidige Web Audio-bel geeft die garantie niet.
4. **Winkelinformatie en verklaringen.** Maak een publiek bereikbare privacyverklaring, supportadres, appicoon, feature graphic, telefoonscreenshots en beschrijvingen. Vul content rating, app access, advertenties, Data safety en de Health apps declaration in. Beschrijf de app als fitness/training en geef feitelijk aan welke gegevens lokaal blijven, wat backups bevatten en wat er gebeurt bij een externe Google-zoekactie. Laat de verklaringen overeenkomen met de uiteindelijke Android-code en eventuele SDK’s.
5. **Getekende AAB en tests.** Bouw een release Android App Bundle, configureer Play App Signing en bewaar uploadsleutel/herstelgegevens veilig. Begin met een interne test op echte Android-toestellen. Controleer installatie, update vanaf een eerdere versie, offline starten, timer, dataherstel en toegankelijkheid. Voor persoonlijke accounts die na 13 november 2023 zijn gemaakt, geldt volgens de huidige regels een gesloten test met ten minste 12 testers die minimaal 14 dagen achtereen zijn aangemeld voordat productie-toegang kan worden aangevraagd. Werk met echte testerfeedback en vul daarna de productie-aanvraag in.
6. **Productie en volgende updates.** Rond de gevraagde verklaringen en review af en dien de productieversie in. Een volgende release krijgt een hoger `versionCode` en een nieuwe AAB; bestaande gebruikers ontvangen die via Google Play. Test elke opslagmigratie zonder trainingshistorie te wissen.

## Actuele vereisten en officiële bronnen

- [Registratie en eenmalige US$25](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [Target API: vanaf 31 augustus 2026 Android 16 / API 36 voor nieuwe gewone Android-apps en updates](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [Gesloten test voor nieuwe persoonlijke accounts: 12 testers, 14 dagen](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Health apps declaration](https://support.google.com/googleplay/android-developer/answer/14738291?hl=en)
- [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Capacitor-workflow en Android-project openen](https://capacitorjs.com/docs/basics/workflow)

Controleer de Play Console-eisen opnieuw bij de daadwerkelijke indiening; target-API-eisen en accountvereisten kunnen veranderen.
