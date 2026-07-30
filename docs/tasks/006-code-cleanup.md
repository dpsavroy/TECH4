# Zadanie: Oczyszczanie kodu (Code Cleanup)

**Opis problemu:**
W kodzie zidentyfikowano dług technologiczny wymagający refaktoryzacji:

1. Duplikacja kodu w komponentach kart systemowych (`SystemCards`).
2. Nadmierne użycie stylów inline (należy przenieść do klas Tailwind).
3. Monolityczny kod SVG schematu budynku – należy wydzielić kod SVG z `BuildingSchematic` do osobnego pliku/komponentu dla lepszej czytelności.

**Lokalizacja:**

- `src/components/SystemCards.tsx` (lub podobny komponent kart).
- `src/components/BuildingSchematic.tsx`.
- Wszelkie inne pliki z wbudowanym stylem `style={{...}}`.

**Kryterium ukończenia:**
Zrefaktoryzowane `SystemCards` używające np. mapowania po tablicy danych. Brak stylów inline, zastąpione klasami utility. Kod wizualny SVG odseparowany od logiki biznesowej komponentu `BuildingSchematic`.
