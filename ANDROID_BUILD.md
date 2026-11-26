# Daily Reps — Android-build en upload

De zelfstandige Android-app staat in `android/`. De webbestanden zitten in het pakket; er is geen externe website nodig om een training te openen. De Android-versie gebruikt Google Play voor updates en registreert geen service worker. De webversie op GitHub Pages blijft zijn eigen updater gebruiken.

## Identiteit

- Naam: **Daily Reps**.
- Productie application ID: **`nl.frapcoder.workout`**.
- Huidige versie: **1.0.2**, `versionCode` **3**.
- Android: minimaal 7.0 / API 24; target en compile API **36**.
- Test-APK: **`nl.frapcoder.workout.debug`**, label **Daily Reps Test**. Deze testapp staat apart van de Play Store-app.

De productie application ID blijft na de eerste Play-upload gelijk. Gebruik voor iedere volgende upload een hoger versionCode.

## Lokaal bouwen

Benodigd: Node 22 of nieuwer, een volledige JDK 21, Android SDK met platform 36 en build-tools 36.0.0. Stel `JAVA_HOME` en `ANDROID_HOME` in voor jouw machine. Gebruik geen losse JRE: de Java-compiler is nodig.

```sh
npm ci
npm run android:debug
```

Dit maakt `android/app/build/outputs/apk/debug/app-debug.apk`. Open het project eventueel met `npm run android:open` in Android Studio.

## Ondertekende Play Store-bundel

Een release vereist een uploadsleutel. Die staat **niet** in GitHub. Bewaar de ontvangen privé-sleutelbundel buiten de repository en geef deze niet aan testers. Het AAB-bestand mag wel naar Play Console.

De privébundel bevat de keystore, een openbaar certificaat en `signing.json`. Het buildscript kan dat bestand direct gebruiken:

```sh
python scripts/build-android.py --release --signing-file /veilige/map/signing.json --version-code 3 --version-name 1.0.2
```

Resultaat: `artifacts/daily-reps-1.0.2-play.aab`. Bij een volgende versie verhoog je bijvoorbeeld versionCode naar 4 en versionName naar 1.0.3. Sleutels en wachtwoorden horen niet in commits, screenshots of openbare logs.

Als alternatief gebruikt Gradle de omgevingsvariabelen `WORKOUT_KEYSTORE_FILE`, `WORKOUT_STORE_PASSWORD`, `WORKOUT_KEY_ALIAS` en `WORKOUT_KEY_PASSWORD`. Een release zonder ondertekengegevens wordt expliciet geweigerd.

## Uploaden

1. Maak of open de app in Google Play Console onder je eigen ontwikkelaarsaccount.
2. Kies **Testen → Interne tests → Nieuwe release** en upload het **ondertekende `.aab`**. De `.apk` is alleen om rechtstreeks te installeren en testen.
3. Configureer Play App Signing. De meegeleverde sleutel is de uploadsleutel; bewaar hem voor volgende uploads.
4. Gebruik `https://frap-coder.github.io/Workout/privacy.html` als privacy-URL. Vul je eigen support-e-mailadres, winkelteksten, afbeeldingen, Data safety, content rating en Health apps declaration in.
5. Test op echte Android-toestellen voordat je productie aanvraagt. Bij een nieuw persoonlijk ontwikkelaarsaccount kunnen daarnaast de gesloten-testvereisten van Google gelden.

## GitHub Actions

De workflow **Build Android app** bouwt de test-APK en voert Android-lint en de beschikbare JVM-testtaken uit. Download de APK onder de workflow-artifacts.

Een handmatig gestarte workflow kan ook een getekende AAB bouwen. Voeg daarvoor zelf deze repositorysecrets toe: `ANDROID_KEYSTORE_BASE64`, `ANDROID_STORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`. Het eerste secret is de base64-inhoud van de keystore. De workflow schrijft de sleutel alleen tijdelijk en verwijdert hem na de build. Een handmatige release zonder de secrets stopt met een duidelijke fout.

## Android-gedrag

- Appbestanden inbegrepen; geen web-updateknop in Android.
- Native `FLAG_KEEP_SCREEN_ON` tijdens een zichtbare actieve training.
- Appgerichte teksten zonder GitHub-/browseruitleg of zichtbare back-upopties. De webversie behoudt export/import.
- Statusbalk, schermuitsparingen, navigatiebalk en toetsenbordruimte worden native vrijgehouden, onafhankelijk van de WebView-versie.
- Terugknop sluit eerst een dialoog of gaat terug naar het workoutscherm; de training wordt niet gewist.
- Google Video-zoekacties en andere externe HTTPS-links openen in de browser.
- Lokale gegevens blijven lokaal; geen account, advertenties of analytics-SDK.

De bestaande Web Audio-bel blijft bedoeld voor een geopende app. Een gegarandeerd alarm bij schermvergrendeling of een gestopte app is geen onderdeel van deze release. Een geslaagde build en browsertest vervangen geen controle van de systeemdialogen en geluid op een echte telefoon.
