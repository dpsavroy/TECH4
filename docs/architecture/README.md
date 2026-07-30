# Architektura Projektu (Architecture)

## Struktura Komponentów Hero

- Jako główny (i jedyny) zasób wizualny w sekcji Hero używany jest obraz `tech4-building-transparent.png`.
- **Brak osobnego renderu izometrycznego** — korzystamy wyłącznie z tego głównego zasobu graficznego, aby zachować optymalną wydajność, minimalizm i spójność wizualną.

## Mechanizm Hotspotów (Interaktywność Systemów)

- Sekcja Hero posiada interaktywne etykiety (hotspoty) reprezentujące różne systemy inżynieryjne.
- **Zasada działania:** Najechanie kursorem (hover) na etykietę konkretnego systemu natychmiast podświetla odpowiadający mu obszar lub ścieżkę na głównym schemacie budynku.
- Mechanizm ten wspiera naszą główną wizję "Living Digital Building", pozwalając użytkownikowi eksplorować budynek i jego układy scalone.

## Historia Ważnych Zmian i Napraw

### Naprawa błędu niezgodności typu `SystemType`

- **Kontekst:** W początkowej fazie wystąpił błąd typowania między komponentami odpowiedzialnymi za renderowanie sekcji Hero.
- **Problem:** `HeroVisual.tsx` oraz `BuildingSchematic.tsx` definiowały lub oczekiwały różnych wariantów typu `SystemType`, co powodowało błędy przy przekazywaniu stanu "hover" do schematu.
- **Rozwiązanie i zasada na przyszłość:** Typ `SystemType` (obejmujący HVAC, SAP/fire, KD, CCTV, BAS, BMS) został ujednolicony. Wszelkie nowe systemy lub modyfikacje logiki podświetlania muszą opierać się na tym jednym, wspólnym typie.
