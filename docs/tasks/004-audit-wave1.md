# Zadanie: Pierwsza fala audytu UI/UX

**Opis problemu:**
Zgłoszono kilka drobnych, lecz istotnych problemów z układem i dostępnością podczas pierwszego audytu:

1. Użycie `100vh` zamiast nowszego `100dvh` (problem na przeglądarkach mobilnych, np. iOS Safari).
2. Niewłaściwy podział siatki (grid-columns) dla ekranów o rozmiarze `xl`.
3. Brak lub błędne użycie atrybutu `aria-labelledby` w niektórych interaktywnych elementach.

**Lokalizacja:**

- Główne layouty i sekcje (`src/app/page.tsx`, pliki sekcji).
- Ewentualne komponenty nawigacji i interaktywne etykiety.

**Kryterium ukończenia:**
Zmiana `vh` na `dvh` tam, gdzie to konieczne. Poprawienie reguł RWD dla breakpointu `xl`. Dodanie/naprawienie tagów `aria-labelledby` dla pełnej dostępności.
