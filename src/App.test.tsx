import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { Contact } from "./components/Contact";
import { profile, projects } from "./data/portfolio";

describe("Portfolio content", () => {
  it("lists only real public repositories, each once", () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(
      projects.length,
    );
    projects.forEach((project) =>
      project.links
        .filter((link) => link.label === "Source")
        .forEach((link) =>
          expect(link.href).toMatch(/^https:\/\/github\.com\/TonyDuongg\//),
        ),
    );
  });

  it("names Tony and the backend focus on the first screen", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Tony Duong, Java backend developer",
    );
    expect(screen.getByText(/I build backends in Java and Spring Boot/)).toBeVisible();
  });

  it("gives every section a heading", () => {
    render(<App />);
    for (const name of [
      "Recent work",
      "Paste a log. Keep your keys.",
      "What I build with, and where it ran",
      "Hải Dương",
      "Get in touch",
    ])
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
  });

  it("links each project name to its destination", () => {
    render(<App />);
    projects.forEach((project) => {
      const link = screen.getByRole("link", {
        name: new RegExp(`^${project.name}\\s*\\(opens a new tab\\)$`),
      });
      expect(link).toHaveAttribute("href", project.href);
    });
  });

  it("persists a theme change", async () => {
    document.documentElement.dataset.theme = "dark";
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("tonyd-theme")).toBe("light");
    await userEvent.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});

describe("Live redactor", () => {
  it("masks the sample secrets and reacts to new text", async () => {
    const user = userEvent.setup();
    render(<App />);
    const section = screen.getByRole("region", {
      name: "Paste a log. Keep your keys.",
    });
    const output = within(section).getByText("What the model receives")
      .nextElementSibling as HTMLElement;
    expect(output).not.toHaveTextContent("hunter2");
    expect(within(section).getByRole("status")).toHaveTextContent(
      /\d+ secrets masked\./,
    );

    const box = within(section).getByLabelText("Your text");
    await user.click(within(section).getByRole("button", { name: "Clear" }));
    expect(box).toHaveValue("");
    expect(within(section).getByRole("status")).toHaveTextContent(
      "Nothing to mask.",
    );
    await user.type(box, "mail me at someone@example.org");
    expect(output).toHaveTextContent("[REDACTED_EMAIL_ADDRESS]");
    expect(within(section).getByRole("status")).toHaveTextContent(
      "1 secret masked.",
    );
  });
});

describe("Email clipboard", () => {
  it("copies the public email and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Email copied. Talk soon!",
      ),
    );
    expect(writeText).toHaveBeenCalledWith(profile.email);
  });

  it("offers a usable fallback when the clipboard is blocked", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "You can select the email above.",
      ),
    );
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
    expect(screen.getByRole("link", { name: /Say hello/ })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
});
