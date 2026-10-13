import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { Contact } from "./components/Contact";
import { filterProjects, profile, projects } from "./data/portfolio";

describe("Portfolio content", () => {
  it("keeps real repository links and a unique identity for each project", () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(
      projects.length,
    );
    projects.forEach((project) =>
      expect(project.repository).toMatch(
        /^https:\/\/github\.com\/TonyDuongg\//,
      ),
    );
    expect(filterProjects("all")).toHaveLength(3);
    expect(filterProjects("web")).toHaveLength(2);
    expect(filterProjects("automation")).toHaveLength(1);
  });
  it("renders the Java backend identity and direct contact", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Thoughtful code.Solid foundations.",
    );
    expect(
      screen.getByText(/Java backend developer studying/),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Say hello" })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
  it("filters projects and resets an open case note", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: /Case notes — Tiến Lên/ }),
    );
    expect(screen.getByText("The idea")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Automation" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.queryByRole("heading", { name: "Personal portfolio" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("1 project shown")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "All projects" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: /Case notes — Tiến Lên/ }),
    ).toHaveAttribute("aria-expanded", "false");
  });
  it("opens and closes case notes with a semantic button", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /Case notes — GitHub/ });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("The data pipeline")).toBeVisible();
    await userEvent.click(button);
    expect(screen.getByText("The data pipeline")).not.toBeVisible();
  });
  it("persists a theme change", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("tonyd-theme")).toBe("dark");
    await userEvent.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("light");
  });
  it("closes mobile navigation with Escape and returns focus", async () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });
  it("closes mobile navigation after choosing a section", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open navigation" }),
    );
    await userEvent.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" }),
      ).getByText("Work"),
    );
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
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
  });
});
