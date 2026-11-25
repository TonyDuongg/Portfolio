import { languages, stack } from "../data/portfolio";

export function Stack() {
  const [lead, ...rest] = languages;
  return (
    <section id="stack" className="stack" aria-labelledby="stack-heading">
      <h2 id="stack-heading" data-reveal>
        What I build with, and where it ran
      </h2>
      <div className="stack-body">
        <figure className="stack-figure" data-reveal>
          <p className="stack-number">{lead.share}%</p>
          <figcaption>
            of the code in my public repositories is {lead.name}.{" "}
            {rest.map((item) => `${item.name} ${item.share}`).join(", ")}.
            Counted every day by my profile updater.
          </figcaption>
        </figure>
        <p className="stack-word" aria-hidden="true">
          Stack
        </p>
        <table className="stack-table" data-reveal>
          <caption className="sr-only">Tools and the projects they were used in</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Kind</th>
              <th scope="col">Tool</th>
              <th scope="col">Used in</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((row, index) => (
              <tr key={row.tool} className={index > 0 && index % 4 === 0 ? "group-start" : undefined}>
                <td>{row.kind}</td>
                <td>{row.tool}</td>
                <td>{row.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
