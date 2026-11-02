# Daily Reps — analyse en lanceringsplan

2 november 2026. Productbeoordeling op basis van de huidige code, interacties en tests. Geen gebruikersonderzoek, actuele concurrentie-audit, juridische beoordeling of marktvalidatie. Aantallen en doelen hieronder zijn voorstellen om te toetsen, geen voorspellingen.

## Advies

Start met een kleine, begeleide bèta. De app heeft voldoende functies om te testen of mensen er een terugkerende trainingsgewoonte mee opbouwen. De belangrijkste onzekerheid is nu niet de omvang van de oefenbibliotheek, maar of een nieuwe gebruiker zelfstandig een goede eerste training kan doen, zijn gegevens vertrouwt en de week erna terugkomt. Voeg vóór dat bewijs geen reclame of brede betaalmuur toe.

Een bruikbare eerste belofte: **“Een heldere training met je eigen materiaal, met een doel van twintig minuten en zonder account.”** Overtime is ruimte om af te ronden en te registreren, geen uitnodiging om steeds langer door te trainen. Vermijd claims zoals wetenschappelijk optimale spiergroei, exacte impact, calorieverbruik of een betrouwbare vergrendelschermwekker.

## Wat er al staat

- Een compacte start, vijf oefeningen en één duidelijke startactie.
- Onboarding voor frequentie, materiaal, uitsluitingen en ervaring, plus een planvoorbeeld.
- Full-bodyadvies bij lage trainingsfrequentie; Push/Pull/Lower als alternatief.
- 284 selecteerbare oefeningen, tekstuele aanwijzingen, materiaalfilters en referentieniveaus.
- Reps en seconden apart, vorige set herhalen, gewichten onthouden, geschiedenis en back-ups.
- Offline app-shell, herstelkopie, IndexedDB-mirror en automatische publicatie met tests.
- Twintig minuten als mijlpaal: eenmalig geluid, overtime, reps blijven invoerbaar en handmatig definitief opslaan.
- Workoutspecifieke instructie: doel, volgorde, sets, rust, gewicht, eenzijdige reps en afronden.

## Prioriteiten

| Prioriteit | Nodig | Waarom / wanneer klaar |
| --- | --- | --- |
| Voor bèta | Testen op echte iPhones/Safari en Android/Chrome, als tab én geïnstalleerde webapp | Verifieer pauze, overtime, slaapstand, heropenen, audiotoestemming, updates en herstel. Geen onverklaarde dataverliezen in deze testgevallen. Chromium-emulatie bewijst dit niet. |
| Voor bèta | Inhoudelijke controle door een gekwalificeerde trainer | Controleer uitvoeringsteksten, materiaalvereisten, oefenniveaus, beginnerskeuzes, rust en de belastingverdeling van de presets. Vooral twee press-slots in Push en de stelling dat varianten vergelijkbaar zijn verdienen review. |
| Voor bèta | Oefeninstructie laten begrijpen door 5 nieuwe testers | Laat ze zonder mondelinge hulp starten, een set loggen, van oefening wisselen en overtime afronden. Noteer waar zij vastlopen; repareer vóór opschalen. |
| Voor openbare lancering | Nederlandstalige/Engelstalige taalkeuze of één bewuste hoofdtaal | De huidige interface is Engels. Kies de taal passend bij de eerste doelgroep; meng geen talen in de productflow. |
| Voor openbare lancering | Eigen domein, korte uitlegpagina, contact, privacy- en gegevensinformatie | Leg uit wat de app doet, voor wie, wat lokaal wordt opgeslagen, hoe export/verwijderen werkt en welke browserbeperkingen gelden. Vul echte contactgegevens in; verzin geen bedrijfsinformatie. |
| Voor openbare lancering | Feedback- en foutmeldroute | Een kleine knop met contact/formulier, optioneel apparaattype/appversie en beschrijving. Verstuur geen trainingshistorie zonder een expliciete keuze. |
| Na eerste validatie | Eenvoudige progressie-aanbeveling | Bijvoorbeeld: bij meerdere beheerste sets de volgende keer één kleine stap meer reps of gewicht. Niet één score maken van verschillende oefeningen en gewichten. Laat de trainer de regels en grenzen beoordelen. |
| Bij bewezen behoefte | Synchronisatie tussen apparaten | Nu is alles browserlokaal. Test of export volstaat. Accounts/sync voegen kosten, beveiliging, herstel en privacyverplichtingen toe; bouw ze pas wanneer gebruikers het missen. |
| Later | Verdienmodel | Test pas na aantoonbaar herhaald gebruik: begeleide programma’s of extra voortgang/sync kunnen waarde bieden. De timer, basisregistratie en toegang tot eigen gegevens blijven bruikbaar. Reclame staat niet aan. |

## Eerste doelgroep en onderscheid

Test eerst bij drukke volwassenen die thuis trainen of opnieuw beginnen, met lichaamsgewicht, dumbbells of banden. Dit is een hypothese; kies op basis van gesprekken een smaller segment als hun behoeften uiteenlopen. Gevorderde krachtsporters verwachten vaak uitgebreidere programmering, oefenspecifieke progressie en geavanceerde logging dan deze app nu biedt.

De waarde zit in weinig besliswerk: open de app, begrijp de vijf oefeningen, train en rond af. De bibliotheekgrootte en referentieniveaus ondersteunen die eenvoud; ze zijn geen zelfstandige reden om terug te komen. “Lichter” bij een swap betekent een algemene referentie binnen de spiergroep, geen gegarandeerd lagere persoonlijke inspanning bij ieder gewicht.

## Onderzoek en metingen

Begin met 15–25 vrijwillige bètagebruikers gedurende vier weken. Vraag toestemming voor de gekozen onderzoeksaanpak. Een gedeeld interview-/feedbackschema kan aanvankelijk volstaan; voeg niet automatisch trackers of een analytics-SDK toe.

Bij eventuele latere analytics: bepaal doel, minimale events, bewaartermijn en vereiste toestemming vooraf. Stuur geen namen, uitgesloten oefeningen, lichamelijke klachten, gewichten of trainingshistorie naar advertentieplatforms. Als dit product analyse op afstand nodig heeft, kies een passende basis en verwerkersafspraken met deskundig advies. De huidige release voegt geen analytics toe.

| Vraag | Meting | Voorlopige toets voor de bèta |
| --- | --- | --- |
| Begrijpen mensen de setup? | Geobserveerde onboarding afronden en plan kunnen uitleggen | Minstens 4 van 5 eerste testers zonder hulp |
| Kunnen ze snel starten? | Tijd van openen tot Start, eerste keer en terugkerend apart | Eerste keer circa 3 minuten; terugkerend circa 60 seconden of minder |
| Komt de eerste training af? | Eerste opgeslagen workout / eerste gestarte workout | Onderzoek redenen voor afbreken; 50% is een eerste hypothese, geen marktbenchmark |
| Wordt het een gewoonte? | Minstens 2 opgeslagen workouts in de eerste 7 dagen | Richtwaarde voor discussie: 40% van geactiveerde testers; bij lage aantallen ook individuele verhalen lezen |
| Komen ze later terug? | Een opgeslagen workout op dag 22–28 na de eerste opgeslagen workout | Kijk naar week-4-gebruik en redenen voor stoppen; stel pas daarna een onderbouwd doel |
| Vertrouwen ze opslag en timer? | Meldingen en reproduceerbare foutgevallen | Los elk bekend verlies van data en elke dubbele opslag op vóór opschalen |

Een “gestarte workout” begint bij Start. Een “opgeslagen workout” ontstaat pas bij Finish & save na het twintigminutendoel. Alleen het bereiken van twintig minuten is geen opslag/conversie. Onderscheid echte pauze/afbreking van vergeten op te slaan. Overtime-reps blijven in de totalen, maar zijn geen hogere kwaliteits- of intensiteitsscore.

Vraag na een eerste en vierde sessie: “Wat moest je zelf uitzoeken?”, “Was de gekozen variant passend?”, “Kon je je laatste reps nog kwijt?”, “Wat maakt dat je morgen wel of niet terugkomt?” Vraag om concrete recente ervaringen in plaats van alleen “vind je dit leuk?”.

## Distributie en eerste lancering

1. **Week 1 — betrouwbaarheid en inhoud:** echte apparaten, trainerreview, feedbackroute en duidelijke productuitleg. Gebruik de releasechecklist als vertrekpunt.
2. **Week 2 — eerste vijf testers:** observeer onboarding en een complete training. Verbeter vooral de plekken waar hulp nodig is.
3. **Week 3–4 — 15–25 testers:** onderzoek terugkeer en trainingsgewoonte. Verander niet iedere paar dagen het hele schema; maak effecten herkenbaar.
4. **Daarna — beperkte openbare lancering:** een korte demonstratie van setup → training → overtime → opgeslagen resultaat. Deel via eigen kanalen en relevante communities volgens hun regels. Geen betaalde acquisitie voordat retentie en betrouwbaarheid aannemelijk zijn.

Een bèta-uitnodiging, e-mails en posts zijn voorstellen. Ze worden niet namens de eigenaar verstuurd. Registratie, domeinaankoop of externe tracking worden niet door dit plan aangezet.

## Beslismoment

Schaal op als testers de training zelfstandig begrijpen, terugkomen om hun eigen reden en de app betrouwbaar blijkt op de relevante apparaten. Zo niet, investeer in duidelijkheid en passende programma’s, niet in meer functies. De volgende grotere productinvestering hoort voort te komen uit de meest voorkomende terugkeer- of uitvalreden.
