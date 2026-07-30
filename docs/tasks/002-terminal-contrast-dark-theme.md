# Zadanie: Kontrast bloku terminala w Dark Theme

**Opis problemu:**
Kolory tła i tekstu w komponencie wizualnym "Terminal" (używanym np. w sekcji Hero) mogą nie posiadać wystarczającego kontrastu w trybie ciemnym (Dark Theme). Zagraża to czytelności i nie spełnia standardów dostępności (WCAG).

**Lokalizacja:**

- Komponent wyświetlający terminal, prawdopodobnie `src/components/HeroVisual.tsx` lub powiązany komponent UI terminala.
- Konfiguracja Tailwind (`tailwind.config.ts` lub `globals.css`).

**Kryterium ukończenia:**
Weryfikacja kontrastu narzędziem typu WebAIM. Dostosowanie kolorów dla trybu ciemnego, aby tekst był wyraźny i w pełni czytelny, z zachowaniem estetyki premium.
