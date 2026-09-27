export type HtmlCheck = {
  id: string;
  milestone: string;
  label: string;
  help: string;
  pass: boolean;
};
export const workshopMilestones = [
  {
    id: "document",
    title: "01 / A complete document",
    lesson: "/learn/html/first-document",
    brief:
      "Set a document language, give the page a useful title, and write its main heading.",
  },
  {
    id: "structure",
    title: "02 / Meaningful structure",
    lesson: "/learn/html/semantic-page",
    brief: "Organize navigation and content with semantic page regions.",
  },
  {
    id: "forms",
    title: "03 / A usable form",
    lesson: "/learn/html/forms-and-feedback",
    brief:
      "Give every control a visible label. This workshop never sends form data.",
  },
  {
    id: "publish",
    title: "04 / Ready to review",
    lesson: "/learn/html/accessible-publishing",
    brief: "Add useful metadata, an image alternative, and a skip link.",
  },
] as const;

export const htmlStarter = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
  </head>
  <body>
    <!-- Add your main heading and introduction here. -->
  </body>
</html>`;

export function inspectHtml(source: string): HtmlCheck[] {
  const document = new DOMParser().parseFromString(source, "text/html");
  const text = (selector: string) =>
    document.querySelector(selector)?.textContent?.trim() ?? "";
  const controls = [
    ...document.querySelectorAll("input:not([type=hidden]), textarea, select"),
  ];
  const hasLabel = (control: Element) => {
    const id = control.getAttribute("id");
    return Boolean(
      id &&
      [...document.querySelectorAll("label[for]")].some(
        (label) =>
          label.getAttribute("for") === id && label.textContent?.trim(),
      ),
    );
  };
  const links = [...document.querySelectorAll("a[href]")];
  const images = [...document.querySelectorAll("img")];
  const check = (
    id: string,
    milestone: string,
    label: string,
    help: string,
    pass: boolean,
  ): HtmlCheck => ({ id, milestone, label, help, pass });
  return [
    check(
      "doctype",
      "document",
      "HTML doctype",
      "Start with <!doctype html>.",
      /^\s*<!doctype\s+html\s*>/i.test(source),
    ),
    check(
      "language",
      "document",
      "Document language",
      'Set a language on the html element, such as lang="en".',
      Boolean(document.documentElement.getAttribute("lang")),
    ),
    check(
      "title",
      "document",
      "Specific page title",
      "Add a descriptive title in the head.",
      text("head title").length >= 8,
    ),
    check(
      "heading",
      "document",
      "Main heading",
      "Add one h1 that introduces the page.",
      document.querySelectorAll("h1").length === 1 && text("h1").length > 3,
    ),
    check(
      "regions",
      "structure",
      "Page regions",
      "Use header, nav, main, and footer for their intended roles.",
      ["header", "nav", "main", "footer"].every((tag) =>
        Boolean(document.querySelector(tag)),
      ),
    ),
    check(
      "sections",
      "structure",
      "Content sections",
      "Add at least one section or article inside main, with an h2.",
      Boolean(document.querySelector("main section h2, main article h2")),
    ),
    check(
      "navigation",
      "structure",
      "Working in-page navigation",
      "Link to an existing section ID, such as #projects.",
      links.some((link) => {
        const href = link.getAttribute("href") ?? "";
        return (
          href.startsWith("#") &&
          href.length > 1 &&
          Boolean(document.getElementById(href.slice(1)))
        );
      }),
    ),
    check(
      "form",
      "forms",
      "Contact form",
      "Add a form with an email input and submit button.",
      Boolean(document.querySelector("form input[type=email]")) &&
        Boolean(
          document.querySelector(
            "form button[type=submit], form input[type=submit]",
          ),
        ),
    ),
    check(
      "labels",
      "forms",
      "Visible field labels",
      "Give every visible form control a matching label for and id.",
      controls.length >= 2 && controls.every(hasLabel),
    ),
    check(
      "names",
      "forms",
      "Submission field names",
      "Give each form control a unique name. Server validation is still needed in a real app.",
      controls.length >= 2 &&
        controls.every((control) => Boolean(control.getAttribute("name"))) &&
        new Set(controls.map((control) => control.getAttribute("name")))
          .size === controls.length,
    ),
    check(
      "description",
      "publish",
      "Page description",
      'Add a meta name="description" with useful content.',
      (document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
        ?.trim().length ?? 0) >= 20,
    ),
    check(
      "images",
      "publish",
      "Image alternatives",
      'Add an image with an alt attribute that explains its purpose, or alt="" for decoration.',
      images.length > 0 && images.every((img) => img.hasAttribute("alt")),
    ),
    check(
      "skip",
      "publish",
      "Skip link",
      "Add a link to the main region before the header.",
      Boolean(
        document.querySelector("main[id]") && document.querySelector("header"),
      ) &&
        links.some(
          (link) =>
            link.getAttribute("href") ===
              `#${document.querySelector("main")?.id}` &&
            Boolean(
              link.compareDocumentPosition(document.querySelector("header")!) &
              Node.DOCUMENT_POSITION_FOLLOWING,
            ),
        ),
    ),
    check(
      "links",
      "publish",
      "Descriptive links",
      "Replace vague labels such as 'click here' with a destination or action.",
      links.length > 0 &&
        links.every(
          (link) =>
            Boolean(link.textContent?.trim()) &&
            !/^(click here|here|read more)$/i.test(
              link.textContent?.trim() ?? "",
            ),
        ),
    ),
  ];
}
