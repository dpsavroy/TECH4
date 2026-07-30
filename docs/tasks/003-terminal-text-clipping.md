# Zadanie: Obcinanie tekstu w terminalu (Text Clipping)

**Opis problemu:**
W pewnych rozdzielczościach ekranu lub przy zwiększonej ilości tekstu, zawartość wewnątrz bloku terminala jest ucinana (clipping), ponieważ kontener nie dostosowuje swojej wysokości do zawartości.

**Lokalizacja:**

- Komponent terminala (np. `Terminal.tsx`, `HeroVisual.tsx`).

**Kryterium ukończenia:**
Wprowadzenie odpowiednich klas CSS (np. `min-h-[...]`, poprawne zarządzanie overflow) tak, aby tekst nigdy nie był obcinany wewnątrz ramki terminala na żadnej rozdzielczości (mobile, tablet, desktop).
