# Workout / Daily Reps naar Google Play

Gecontroleerd op 22 november 2026. Dit is het publicatieplan; er is nog geen Android-project, Play Console-app of winkelpublicatie aangemaakt.

## Aanbevolen route

Behoud de bestaande webapp en verpak `dist/` met een actuele, onderhouden Capacitor-versie als Android-app met meegeleverde bestanden. De Android-code kan in deze bestaande repository komen. De GitHub Pages-versie blijft apart bruikbaar. Een herschrijving van de hele app is hiervoor niet nodig.

De huidige app gebruikt browseropslag, service-workerupdates, Web Audio en browser-wake-lock. Het toevoegen van een Android-verpakking vraagt daarom ook om controles van opslag, bestanden importeren/exporteren, de Android-terugknop, externe links, scherm aanhouden, pauzeren/hervatten en geluid op een echte telefoon. De huidige webopnamen bewijzen die Android-specifieke werking nog niet.

## Updates

- **Huidige website/PWA:** de knop voor updates is passend. Hij haalt een nieuwe offline versie van de website op en activeert die buiten een lopende training.
- **Aanbevolen Android-app met gebundelde bestanden:** code en oefenbibliotheek gaan mee in een nieuwe Android App Bundle. Updates lopen via Google Play. De web-updateknop hoort in die Android-versie te verdwijnen of plaats te maken voor een link/controle via Google Play. Service-workerregistratie moet daar worden overgeslagen; de bestanden zitten immers in de app.
- **Alternatief: Trusted Web Activity:** die toont de gehoste website. Website-updates blijven via de website/service worker lopen; updates van de Android-verpakking lopen via Google Play. In die opzet moeten de twee soorten updates duidelijk onderscheiden worden. Voor deze app is de gebundelde route eenvoudiger te begrijpen en onafhankelijker van de eerste internetverbinding.

## Concrete stappen

1. **Google Play-ontwikkelaarsaccount.** Maak zelf een persoonlijk of organisatieaccount aan in Play Console, betaal de eenmalige registratiekosten van US$25 en voltooi de gevraagde identiteits-/accountverificatie. Nieuwe persoonlijke accounts kunnen ook verificatie met een fysiek Android-apparaat vereisen. Gebruik een account dat blijvend van de eigenaar van deze app is.
2. **Android-identiteit en verpakking.** Kies een blijvende application ID, appnaam en versienummering. Maak het Capacitor Android-project in deze repository, met `dist` als webmap. Gebruik een onderhouden versie die Android 16 ondersteunt en configureer minimaal target API 36. Er is geen nieuwe GitHub-repository nodig.
3. **Android-gedrag afmaken.** Bundel de bestanden, schakel de web-updater uit in de native uitvoering, behoud betrouwbare lokale opslag en controleer bestandsimport/export. Open de Examples-zoekacties in een externe browser. Test de terugknop, schermrotatie, timer, geluid en app-herstart op een echte telefoon. Als een alarm ook bij vergrendeld scherm of op de achtergrond gegarandeerd moet zijn, moet daarvoor native ondersteuning worden toegevoegd; de huidige Web Audio-bel geeft die garantie niet.
4. **Bestaande data overzetten.** De webbrowser en Android-app delen hun lokale opslag niet automatisch. Laat bestaande gebruikers eerst een backup exporteren en die in de Android-app importeren. Test die migratie met echte, geanonimiseerde voorbeelden voordat de app wordt uitgebracht.
5. **Winkelinformatie en verklaringen.** Maak een publiek bereikbare privacyverklaring, supportadres, appicoon, feature graphic, telefoonscreenshots en beschrijvingen. Vul content rating, app access, advertenties, Data safety en de Health apps declaration in. Beschrijf de app als fitness/training en geef feitelijk aan welke gegevens lokaal blijven, wat backups bevatten en wat er gebeurt bij een externe Google-zoekactie. Laat de verklaringen overeenkomen met de uiteindelijke Android-code en eventuele SDK’s.
6. **Getekende AAB en tests.** Bouw een release Android App Bundle, configureer Play App Signing en bewaar uploadsleutel/herstelgegevens veilig. Begin met een interne test op echte Android-toestellen. Controleer installatie, update vanaf een eerdere versie, offline starten, timer, dataherstel en toegankelijkheid. Voor persoonlijke accounts die na 13 november 2023 zijn gemaakt, geldt volgens de huidige regels een gesloten test met ten minste 12 testers die minimaal 14 dagen achtereen zijn aangemeld voordat productie-toegang kan worden aangevraagd. Werk met echte testerfeedback en vul daarna de productie-aanvraag in.
7. **Productie en volgende updates.** Rond de gevraagde verklaringen en review af en dien de productieversie in. Een volgende release krijgt een hoger `versionCode` en een nieuwe AAB; bestaande gebruikers ontvangen die via Google Play. Test elke opslagmigratie zonder trainingshistorie te wissen.

## Actuele vereisten en officiële bronnen

- [Registratie en eenmalige US$25](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- [Target API: vanaf 31 augustus 2026 Android 16 / API 36 voor nieuwe gewone Android-apps en updates](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [Gesloten test voor nieuwe persoonlijke accounts: 12 testers, 14 dagen](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Health apps declaration](https://support.google.com/googleplay/android-developer/answer/14738291?hl=en)
- [Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [Capacitor-workflow en Android-project openen](https://capacitorjs.com/docs/basics/workflow)

Controleer de Play Console-eisen opnieuw bij de daadwerkelijke indiening; target-API-eisen en accountvereisten kunnen veranderen.
