import type { Metadata } from "next";
import type { ReactNode } from "react";

// Dane usługodawcy — zmień tutaj, a zaktualizują się w całym regulaminie.
const BRAND = "EvoHost";
const DOMAIN = "evohost.pl";
const OWNER = "Mateusz Tomkiel";
const ADDRESS = "Obrońców Mławy 3";
const EMAIL = "kontakt@evohost.pl";
const EFFECTIVE_DATE = "21 sierpnia 2026 r.";

export const metadata: Metadata = {
  title: `Regulamin | ${BRAND}`,
  description: `Regulamin świadczenia usług drogą elektroniczną przez ${DOMAIN}`,
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="border-b-2 border-faint pb-2 text-lg font-semibold">
        {title}
      </h2>
      <div className="mt-4 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-6">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="text-accent underline decoration-faint underline-offset-2 hover:decoration-accent">
    {EMAIL}
  </a>
);

export default function RegulaminPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 text-[15px] sm:px-6 sm:py-16">
      <header className="text-center">
        <p className="text-3xl font-bold text-accent">{DOMAIN}</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Regulamin Świadczenia Usług</h1>
        <p className="mt-3 text-sm italic text-muted">
          Zasady korzystania z usług hostingowych świadczonych drogą elektroniczną przez {DOMAIN}
        </p>
      </header>

      <Section title="§ 1. Postanowienia ogólne">
        <p>
          Niniejszy Regulamin określa zasady i warunki świadczenia usług drogą elektroniczną przez
          serwis {DOMAIN}, w tym zasady zawierania i rozwiązywania umów o świadczenie usług
          hostingowych oraz tryb postępowania reklamacyjnego.
        </p>
        <p>
          Usługodawcą i Administratorem serwisu jest {OWNER}, prowadzący nierejestrowaną działalność
          gospodarczą pod nazwą {BRAND} w rozumieniu art. 5 ustawy z dnia 6 marca 2018 r. – Prawo
          przedsiębiorców.
        </p>
        <List
          items={[
            <>Adres siedziby / adres korespondencyjny: {ADDRESS}</>,
            <>E-mail kontaktowy: <Mail /></>,
          ]}
        />
        <p>
          Administrator, jako podmiot prowadzący działalność nierejestrowaną, nie posiada statusu
          przedsiębiorcy w rozumieniu ustawy z dnia 6 marca 2018 r. – Prawo przedsiębiorców, dopóki
          nie dokona rejestracji działalności gospodarczej. Administrator nie jest czynnym podatnikiem
          VAT i nie wystawia faktur VAT — na życzenie Użytkownika może zostać wystawiony rachunek
          potwierdzający dokonanie płatności.
        </p>
        <p>
          Regulamin jest udostępniony nieodpłatnie za pośrednictwem strony internetowej {DOMAIN}, w
          formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie.
        </p>
        <p>
          Rozpoczęcie korzystania z Serwisu, w tym rejestracja Konta lub dokonanie zakupu, jest
          równoznaczne z zapoznaniem się z niniejszym Regulaminem oraz z Polityką Prywatności i
          akceptacją ich postanowień.
        </p>
      </Section>

      <Section title="§ 2. Definicje">
        <List
          items={[
            <>
              Administrator / Usługodawca — {OWNER}, prowadzący nierejestrowaną działalność
              gospodarczą pod nazwą {BRAND}.
            </>,
            <>Serwis — strona internetowa i panel klienta dostępne pod adresem {DOMAIN}.</>,
            <>
              Użytkownik / Klient — osoba fizyczna, osoba prawna lub jednostka organizacyjna
              korzystająca z Serwisu lub Usług.
            </>,
            <>
              Konsument — Użytkownik będący osobą fizyczną dokonującą czynności prawnej niezwiązanej
              bezpośrednio z jej działalnością gospodarczą lub zawodową.
            </>,
            <>Konto — indywidualny panel Użytkownika w Serwisie, umożliwiający zarządzanie Usługami.</>,
            <>
              Usługi — usługi świadczone drogą elektroniczną przez Administratora, w szczególności
              hosting współdzielony, serwery VPS, serwery dedykowane, rejestracja i utrzymanie domen
              internetowych, certyfikaty SSL oraz usługi towarzyszące.
            </>,
            <>
              Umowa — umowa o świadczenie Usług zawarta pomiędzy Administratorem a Użytkownikiem na
              zasadach określonych w Regulaminie.
            </>,
            <>Regulamin — niniejszy dokument.</>,
          ]}
        />
      </Section>

      <Section title="§ 3. Rodzaj i zakres świadczonych Usług">
        <p>
          Administrator świadczy za pośrednictwem Serwisu usługi hostingowe i usługi towarzyszące, w
          tym w szczególności:
        </p>
        <List
          items={[
            "hosting współdzielony (współdzielony serwer WWW, bazy danych, poczta e-mail),",
            "serwery VPS oraz serwery dedykowane,",
            "rejestrację, przedłużanie i transfer domen internetowych,",
            "wystawianie i obsługę certyfikatów SSL,",
            "usługi kopii zapasowych, wsparcia technicznego oraz inne usługi dodatkowe wskazane w ofercie Serwisu.",
          ]}
        />
        <p>
          Szczegółowy zakres, parametry techniczne i ceny poszczególnych Usług określa aktualna oferta
          dostępna w Serwisie w chwili składania zamówienia.
        </p>
      </Section>

      <Section title="§ 4. Warunki techniczne korzystania z Serwisu">
        <p>
          Do korzystania z Serwisu niezbędne jest posiadanie urządzenia z dostępem do sieci Internet
          oraz zainstalowaną, aktualną przeglądarką internetową obsługującą pliki cookies, a także
          posiadanie aktywnego adresu e-mail.
        </p>
        <p>
          Administrator dokłada starań, aby korzystanie z Serwisu było możliwe dla wszystkich
          popularnych przeglądarek, systemów operacyjnych i typów urządzeń, jednak nie gwarantuje
          pełnej kompatybilności z każdą konfiguracją sprzętowo-programową.
        </p>
      </Section>

      <Section title="§ 5. Rejestracja Konta">
        <p>
          Warunkiem skorzystania z części funkcjonalności Serwisu, w tym zamówienia Usług, jest
          założenie Konta poprzez wypełnienie formularza rejestracyjnego i podanie wymaganych danych,
          o których mowa w Polityce Prywatności.
        </p>
        <p>
          Użytkownik zobowiązany jest do podania danych zgodnych z prawdą, aktualnych i kompletnych
          oraz do ich bieżącej aktualizacji w przypadku zmiany.
        </p>
        <p>
          Użytkownik ponosi odpowiedzialność za zachowanie w poufności danych umożliwiających dostęp
          do Konta (login, hasło) oraz za wszelkie działania podejmowane przy ich użyciu.
        </p>
        <p>
          Administrator może odmówić założenia Konta lub zablokować istniejące Konto w przypadku
          podania danych nieprawdziwych, naruszenia Regulaminu lub przepisów obowiązującego prawa.
        </p>
      </Section>

      <Section title="§ 6. Zawarcie umowy i zamawianie Usług">
        <p>
          Zamówienie Usługi następuje poprzez wypełnienie formularza zamówienia w Serwisie, wybór
          parametrów Usługi oraz dokonanie płatności zgodnie z aktualnym cennikiem.
        </p>
        <p>
          Umowa o świadczenie danej Usługi zostaje zawarta z chwilą potwierdzenia przyjęcia
          zamówienia przez Administratora, przesłanego na adres e-mail Użytkownika, oraz
          zaksięgowania płatności — w zależności od tego, które zdarzenie nastąpi później.
        </p>
        <p>
          Ceny Usług podawane w Serwisie są cenami brutto, wyrażonymi w złotych polskich, chyba że
          wyraźnie wskazano inaczej.
        </p>
        <p>
          Płatności elektroniczne obsługiwane są przez operatora płatności Simpay. Dostępne metody
          płatności obejmują: BLIK, płatności kartą, przelewy online realizowane za pośrednictwem
          banków (m.in. mBank, PKO BP, ING, Bank Pekao SA, Erste Bank Polska, Alior Bank, Bank
          Millennium, BNP Paribas, Bank Pocztowy, Credit Agricole, Nest Bank, Plus Bank, VeloBank, Bank
          Ochrony Środowiska, Bank Nowy BFG, Inteligo, Bank Spółdzielczy) oraz PayPal. Aktualna lista
          dostępnych metod płatności prezentowana jest Użytkownikowi każdorazowo w procesie składania
          zamówienia. Administrator nie przetwarza ani nie przechowuje pełnych danych kart
          płatniczych.
        </p>
        <p>
          W przypadku wystąpienia problemów z realizacją płatności elektronicznych, Klient może
          skontaktować się bezpośrednio z operatorem płatności Simpay za pośrednictwem strony
          kontaktowej:{" "}
          <a
            href="https://simpay.pl/kontakt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-faint underline-offset-2 hover:decoration-accent"
          >
            https://simpay.pl/kontakt
          </a>
          .
        </p>
      </Section>

      <Section title="§ 7. Okres świadczenia Usługi i jej przedłużenie">
        <p>
          Usługi świadczone są w okresach rozliczeniowych (np. miesięcznych, rocznych) wybranych przez
          Użytkownika przy składaniu zamówienia.
        </p>
        <p>
          Przed upływem okresu, na jaki została zawarta Umowa, Użytkownik otrzymuje powiadomienie o
          zbliżającym się terminie płatności za kolejny okres rozliczeniowy.
        </p>
        <p>
          Brak opłacenia Usługi w terminie może skutkować zawieszeniem jej świadczenia, a po upływie
          dodatkowego okresu karencji wskazanego w ofercie — usunięciem danych i zasobów powiązanych z
          Usługą.
        </p>
      </Section>

      <Section title="§ 8. Obowiązki Użytkownika i treści zabronione">
        <p>
          Użytkownik zobowiązany jest do korzystania z Usług zgodnie z ich przeznaczeniem,
          obowiązującymi przepisami prawa, dobrymi obyczajami oraz postanowieniami Regulaminu.
        </p>
        <p>Zabronione jest wykorzystywanie infrastruktury Administratora w szczególności do:</p>
        <List
          items={[
            "rozsyłania niezamówionej informacji handlowej (spamu),",
            "przechowywania lub udostępniania treści naruszających prawo, w tym treści o charakterze bezprawnym, obraźliwym lub naruszającym prawa osób trzecich,",
            "przeprowadzania ataków sieciowych, skanowania portów, dystrybucji złośliwego oprogramowania,",
            "działań naruszających prawa autorskie lub inne prawa własności intelektualnej,",
            "działań mogących zakłócić prawidłowe funkcjonowanie infrastruktury Administratora lub innych Użytkowników.",
          ]}
        />
        <p>
          W przypadku stwierdzenia naruszenia powyższych zasad Administrator jest uprawniony do
          czasowego zawieszenia Usługi, a w przypadkach rażących lub powtarzających się naruszeń — do
          rozwiązania Umowy w trybie natychmiastowym.
        </p>
      </Section>

      <Section title="§ 9. Odpowiedzialność Administratora">
        <p>
          Administrator dokłada należytej staranności w celu zapewnienia ciągłości i bezpieczeństwa
          świadczonych Usług, w tym utrzymania odpowiedniego poziomu dostępności infrastruktury (SLA),
          zgodnie z parametrami wskazanymi w ofercie danej Usługi.
        </p>
        <p>
          Administrator nie ponosi odpowiedzialności za przerwy w świadczeniu Usług wynikające z
          przyczyn niezależnych od niego, w tym w szczególności z działania siły wyższej, awarii łączy
          telekomunikacyjnych będących poza jego kontrolą, działań osób trzecich lub konieczności
          przeprowadzenia niezbędnych prac konserwacyjnych, o których Użytkownicy zostaną
          poinformowani z odpowiednim wyprzedzeniem, o ile będzie to możliwe.
        </p>
        <p>
          Administrator nie ponosi odpowiedzialności za treści przechowywane, przesyłane lub
          udostępniane przez Użytkowników za pośrednictwem wykupionych Usług oraz za sposób ich
          wykorzystania, z zastrzeżeniem bezwzględnie obowiązujących przepisów prawa. Wyłączenie to
          obowiązuje tak długo, jak Administrator nie posiada faktycznej wiedzy o bezprawnym
          charakterze danej treści lub działania — po uzyskaniu takiej wiedzy Administrator działa
          niezwłocznie w celu usunięcia treści lub uniemożliwienia dostępu do niej, zgodnie z art. 6
          Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2022/2065 (Akt o usługach cyfrowych,
          „DSA”).
        </p>
        <p>
          Odpowiedzialność Administratora wobec Użytkowników niebędących Konsumentami ograniczona jest
          do wysokości opłat uiszczonych przez Użytkownika za Usługę w okresie ostatnich 12 miesięcy,
          z wyłączeniem szkód wyrządzonych z winy umyślnej.
        </p>
      </Section>

      <Section title="§ 9a. Zgłaszanie nielegalnych treści i punkt kontaktowy">
        <p>
          Zgodnie z art. 16 DSA Administrator udostępnia łatwo dostępny, elektroniczny mechanizm
          umożliwiający każdej osobie lub podmiotowi zgłoszenie treści przechowywanych na
          infrastrukturze Administratora, które w jej ocenie stanowią nielegalne treści. Zgłoszenia
          należy kierować na adres <Mail />, wskazując dokładną lokalizację treści (np. adres URL),
          wyjaśnienie przyczyn uznania jej za nielegalną oraz — z wyjątkiem zgłoszeń dotyczących
          przestępstw wskazanych w art. 16 ust. 3 DSA — dane kontaktowe zgłaszającego.
        </p>
        <p>
          Adres <Mail /> stanowi jednocześnie pojedynczy punkt kontaktowy Administratora w rozumieniu
          art. 11 i 12 DSA, umożliwiający organom, użytkownikom oraz osobom trzecim bezpośrednią
          komunikację z Administratorem drogą elektroniczną. Komunikacja odbywa się w języku polskim.
        </p>
        <p>
          Administrator rozpatruje zgłoszenia w sposób terminowy, niearbitralny i obiektywny,
          informując zgłaszającego o podjętej decyzji oraz możliwościach jej zakwestionowania.
        </p>
      </Section>

      <Section title="§ 10. Kopie zapasowe">
        <p>
          Administrator wykonuje kopie zapasowe (backupy) danych zgodnie z zasadami wskazanymi w
          ofercie danej Usługi oraz w Polityce Prywatności.
        </p>
        <p>
          Wykonywanie kopii zapasowych przez Administratora nie zwalnia Użytkownika z obowiązku
          samodzielnego zabezpieczania własnych danych, w szczególności danych o szczególnym znaczeniu
          dla jego działalności.
        </p>
      </Section>

      <Section title="§ 11. Reklamacje">
        <p>
          Użytkownikowi przysługuje prawo do złożenia reklamacji dotyczącej niewykonania lub
          nienależytego wykonania Usługi.
        </p>
        <p>
          Reklamację należy złożyć drogą elektroniczną na adres <Mail /> lub za pośrednictwem systemu
          ticketowego dostępnego w panelu klienta, podając dane umożliwiające identyfikację
          Użytkownika i Usługi oraz opis zgłaszanego problemu.
        </p>
        <p>
          Administrator rozpatruje reklamację i udziela odpowiedzi w terminie 14 dni od dnia jej
          otrzymania. W przypadku braku możliwości rozpatrzenia reklamacji w tym terminie
          Administrator poinformuje o tym Użytkownika, wskazując przyczynę opóźnienia i przewidywany
          termin rozpatrzenia.
        </p>
      </Section>

      <Section title="§ 12. Prawo odstąpienia od umowy (Konsumenci)">
        <p>
          Konsument, który zawarł Umowę na odległość, ma prawo odstąpić od niej bez podania przyczyny
          w terminie 14 dni od dnia jej zawarcia, składając stosowne oświadczenie na adres e-mail{" "}
          <Mail />.
        </p>
        <p>
          Prawo odstąpienia nie przysługuje w przypadku Usług, w odniesieniu do których Konsument
          wyraził wyraźną zgodę na rozpoczęcie ich świadczenia przed upływem terminu do odstąpienia od
          umowy i został poinformowany o utracie prawa odstąpienia w związku z tą zgodą — co dotyczy w
          szczególności usług rejestracji domen internetowych oraz Usług aktywowanych natychmiast po
          dokonaniu płatności.
        </p>
        <p>
          W przypadku skutecznego odstąpienia od Umowy Administrator zwraca Konsumentowi otrzymaną
          płatność niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania oświadczenia o
          odstąpieniu.
        </p>
        <p>
          Wzór formularza odstąpienia od umowy stanowi{" "}
          <a href="#zalacznik-1" className="text-accent underline decoration-faint underline-offset-2 hover:decoration-accent">
            Załącznik nr 1
          </a>{" "}
          do niniejszego Regulaminu. Skorzystanie z wzoru nie jest obowiązkowe — Konsument może złożyć
          oświadczenie o odstąpieniu w dowolnej jednoznacznej formie.
        </p>
      </Section>

      <Section title="§ 13. Rozwiązanie i wygaśnięcie Umowy">
        <p>
          Użytkownik może w każdym czasie zrezygnować z dalszego korzystania z Usługi poprzez złożenie
          odpowiedniej dyspozycji w panelu klienta lub przesłanie oświadczenia na adres e-mail{" "}
          <Mail />, ze skutkiem na koniec opłaconego okresu rozliczeniowego.
        </p>
        <p>
          Administrator może rozwiązać Umowę ze skutkiem natychmiastowym w przypadku rażącego
          naruszenia przez Użytkownika postanowień Regulaminu, w szczególności zasad określonych w §
          8, po uprzednim bezskutecznym wezwaniu do zaprzestania naruszeń, o ile charakter naruszenia
          na to pozwala.
        </p>
        <p>
          Po zakończeniu świadczenia Usługi dane i zasoby Użytkownika są usuwane zgodnie z terminami
          wskazanymi w Polityce Prywatności.
        </p>
      </Section>

      <Section title="§ 14. Dane osobowe">
        <p>
          Zasady przetwarzania danych osobowych Użytkowników, w tym cele, podstawy prawne, okresy
          przechowywania oraz przysługujące prawa, określa odrębny dokument — Polityka Prywatności,
          stanowiąca integralne uzupełnienie niniejszego Regulaminu i dostępna w Serwisie.
        </p>
        <p>
          W przypadku Usług hostingowych, w ramach których Użytkownik przetwarza na infrastrukturze
          Administratora dane osobowe osób trzecich, zastosowanie znajduje Umowa Powierzenia
          Przetwarzania Danych (DPA), o której mowa w Polityce Prywatności.
        </p>
      </Section>

      <Section title="§ 15. Postanowienia końcowe">
        <p>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa
          polskiego, w szczególności Kodeksu cywilnego, ustawy o świadczeniu usług drogą elektroniczną
          oraz — w odniesieniu do Konsumentów — ustawy o prawach konsumenta.
        </p>
        <p>
          Administrator zastrzega sobie prawo do zmiany Regulaminu z ważnych przyczyn, w tym w związku
          ze zmianą przepisów prawa, zakresu świadczonych Usług lub warunków technicznych ich
          świadczenia. O zmianach Użytkownicy będą informowani drogą elektroniczną lub poprzez
          ogłoszenie w Serwisie, z wyprzedzeniem co najmniej 14 dni przed ich wejściem w życie.
        </p>
        <p>
          Do Umów zawartych przed wejściem w życie zmian Regulaminu stosuje się postanowienia
          dotychczasowe, chyba że Użytkownik wyrazi zgodę na stosowanie nowego Regulaminu.
        </p>
        <p>
          Ewentualne spory wynikające z Umów zawartych na podstawie Regulaminu rozstrzygane będą przez
          sąd właściwy zgodnie z obowiązującymi przepisami, z zastrzeżeniem że w przypadku
          Konsumentów zastosowanie mają przepisy szczególne dotyczące właściwości sądu.
        </p>
        <p>
          Administrator informuje, że nie wyraża zgody na pozasądowe rozwiązywanie sporów
          konsumenckich w rozumieniu ustawy z dnia 23 września 2016 r. o pozasądowym rozwiązywaniu
          sporów konsumenckich. Niezależnie od powyższego, Konsument uprawniony jest do zwrócenia się
          o pomoc do właściwego terytorialnie Wojewódzkiego Inspektora Inspekcji Handlowej lub
          powiatowego (miejskiego) rzecznika konsumentów.
        </p>
      </Section>

      <Section title="§ 16. Kontakt">
        <p>W sprawach związanych z niniejszym Regulaminem oraz świadczonymi Usługami prosimy o kontakt:</p>
        <List items={[<>E-mail: <Mail /></>, <>Adres: {ADDRESS}</>]} />
        <p className="text-sm italic text-muted">Regulamin wchodzi w życie z dniem: {EFFECTIVE_DATE}</p>
      </Section>

      <div id="zalacznik-1" className="scroll-mt-8">
        <Section title="Załącznik nr 1 — Wzór formularza odstąpienia od umowy">
          <p className="italic">
            (formularz ten należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)
          </p>
          <p>
            Adresat: {OWNER}, prowadzący działalność gospodarczą pod nazwą {BRAND}
            <br />
            Adres: {ADDRESS}
            <br />
            E-mail: <Mail />
          </p>
          <p>
            Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym(*) odstąpieniu od umowy o
            świadczenie następującej usługi(*):
          </p>
          <FormLine />
          <p>Data zawarcia umowy(*):</p>
          <FormLine />
          <p>Imię i nazwisko Konsumenta(-ów):</p>
          <FormLine />
          <p>Adres Konsumenta(-ów):</p>
          <FormLine />
          <p>
            Podpis Konsumenta(-ów){" "}
            <em>(tylko jeżeli formularz jest przesyłany w wersji papierowej)</em>:
          </p>
          <FormLine />
          <p>Data:</p>
          <FormLine />
          <p className="text-xs text-muted">(*) Niepotrzebne skreślić.</p>
        </Section>
      </div>
    </main>
  );
}

function FormLine() {
  return <div className="h-6 border-b border-dotted border-faint" />;
}
