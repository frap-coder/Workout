# Scan op persoonlijke aannames en publieke bruikbaarheid

2 november 2026. Controle van de gebruikersflow, standaardprofielen, oefenkeuze, materiaal, eenheden, schema's, migraties, voortgang, opslag en updategedrag. Dit is een praktische product- en codecontrole; geen claim dat iedere denkbare browser of telefoon fysiek is getest.

## Gevonden en aangepast

| Punt | Wat vreemd was voor andere gebruikers | Wat nu gebeurt |
| --- | --- | --- |
| Oud schema vervangen | Een oudere profielmigratie kon een eigen weekschema vervangen door Push/Pull/Lower met een doel van vijf trainingen | Alleen de ontbrekende schemamodus wordt afgeleid. Dagen, gekozen oefeningen, geschiedenis en actieve sessies blijven intact |
| Altijd twee dumbbells | Er was wel een aantalkeuze voor kettlebells, maar gewone dumbbell-oefeningen gingen impliciet van een paar uit | Aantal 1 of 2+ is ook voor dumbbells instelbaar. Bekende oefeningen waarvoor twee nodig zijn worden gefilterd |
| Lichaamsgewicht als bezit | Niet aanvinken van Bodyweight kon gratis uitvoerbare bewegingen laten verdwijnen als iemand alleen gewichten selecteerde | Lichaamsgewicht is altijd beschikbaar. De app selecteert alleen extra materiaal op basis van wat iemand heeft. Bestaande oefenuitsluitingen blijven gelden |
| Alleen kilo's | Invoer en geschiedenis ondersteunden geen pounds | kg/lb-keuze in Settings. De weergave rekent om; opgeslagen gewichten en historische resultaten worden niet herschreven. Decimalen met een komma kunnen worden ingevoerd |
| Persoonlijk aandoende uitsluitvoorbeelden | Onder meer Barbell Squat, Bench Press, Pull-up en Slams stonden als vaste shortcuts in Settings | Dezelfde neutrale voorbeelden worden in Setup en Settings gebruikt. Niets is standaard uitgesloten; eerder gekozen uitsluitingen blijven bewaard |
| Vaste dagen zonder vrije invulling | Je kon dagen kiezen, maar niet zichtbaar per dag een workout toewijzen. Het opnieuw openen van Setup kon vaste custom circuits vervangen | Een selectievak per gekozen weekdag. Bij ongewijzigd materiaal/niveau worden eigen circuits voor dezelfde dag en workout behouden. Bestaande Upper/Conditioning-routines blijven beschikbaar |
| Verkeerde rol van een standaardoefening | Niveaukeuze kon een simpele schouderaccessoire vervangen door een ander soort oefening uit dezelfde brede spiergroep | Nieuwe automatische keuzes blijven binnen de spiergroep van het slot en geven voorrang aan de oorspronkelijke bewegingsrol. Voor beginners en gemiddelde gebruikers wordt waar mogelijk een passende referentiezwaarte gebruikt. Handmatige swaps blijven vrij |
| Dagelijkse streak als norm | De app benadrukte dagelijks trainen terwijl gebruikers zelf bijvoorbeeld drie trainingen per week kiezen | Voortgang en het afrondscherm tonen het eigen weekdoel. Rustdagen worden niet als mislukking gepresenteerd |
| Onduidelijke updates | Ook zonder actieve training kon er “finish your session” staan. De installatieactie zat alleen diep in Settings | Buiten een actieve training verschijnt een zichtbare Install update-knop. Tijdens een training blijft de update wachten. Settings noemt de actie correct |
| Ontwikkelaarstaal | De browsertitel bevatte Engine en het hoofdscherm had een losse technische Source-link | Een gewone producttitel en een About & data-paneel. De broncode/issue-link blijft daar beschikbaar |
| Onvoldoende context over gegevens | Nieuwe gebruikers moesten details over lokale opslag en back-ups bij elkaar zoeken | About & data legt uit wat lokaal wordt bewaard, export/import/verwijderen, ontbrekende automatische sync en de grenzen van browsergeluid. Ook staat er dat de host verzoekinformatie kan verwerken |
| Accessoire als extra gewicht | Een Ab Wheel kreeg dezelfde geladen-oefening-aanduiding als een dumbbell | De geladen-aanduiding gaat over daadwerkelijk extern weerstandsmateriaal. Onbelaste bewegingen met een bankje, step of ab wheel starten met nul externe belasting |

## Bewust behouden

- Het twintigminutendoel en vijf slots zijn het huidige productconcept, geen persoonlijke voorkeur die stilzwijgend aan iedere gebruiker wordt opgelegd. Overtime en eigen oefenkeuze blijven beschikbaar.
- Het standaardweekdoel is een aanpasbaar vertrekpunt; nieuwe gebruikers kiezen het in onboarding.
- De interface is bewust volledig Engels. Nederlandse vertaling is een mogelijke vervolgstap, geen halve automatische vertaling in deze wijziging.
- Geen accounts, advertenties of automatische synchronisatie: eerder afgesproken productkeuzes. Bestandsback-ups blijven beschikbaar.
- Bestaande profielen worden niet opnieuw door onboarding gestuurd. Opgeslagen gewichten blijven intern in kilogrammen om exacte vergelijkingen te behouden, onafhankelijk van de gekozen weergave.
- Maandag is de huidige start van de kalenderweek. Dat is een consistente conventie; een instelbare weekstart kan later als gebruikers daar behoefte aan hebben.

## Nog open voor een bredere lancering

- **Naam:** in de concurrentiescan kwamen meerdere producten met Daily Reps in de naam voor. Een eigen onderscheidende naam kiezen is een productbeslissing; de app is niet stilzwijgend hernoemd.
- **Contact:** er is nog geen door de eigenaar opgegeven supportadres. De openbare project-/issueroute is beschikbaar, maar er is geen fictief e-mailadres toegevoegd.
- **Echte apparaten:** de geautomatiseerde Chromium-flow controleert mobiele breedtes en desktop. Een volledige training op Safari/iPhone en Android blijft een nuttige praktische check voor schermvergrendeling en geluid.
- **Trainingshistorie per apparaat:** de gegevens blijven browserlokaal zoals afgesproken; de app belooft geen automatische cloudback-up.

## Controle

De public-app-tests behandelen neutrale defaults, materiaalhoeveelheden, lichaamsgewicht, eenheden en exacte opgeslagen waarden, vaste dagindeling, behoud van oude schema's, weekdoelen, updateboodschappen en gegevensuitleg. De bestaande tests voor timer, overtime, bibliotheek, instructies, schema-volgorde en back-ups blijven meedraaien. De browserflow test ook pounds, vaste dagtoewijzing, de gegevensuitleg en één/twee dumbbells.
