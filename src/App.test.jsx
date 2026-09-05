import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ ok: true }))
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test("renders the portfolio homepage", () => {
  render(<App />);

  expect(screen.getByText(/steven lim/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /my projects/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /ways i help/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /^systems integration$/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact me/i })).toBeInTheDocument();
});

test("switches the featured project story", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /virtual piano app/i }));

  expect(
    screen.getByRole("heading", { name: /virtual piano app/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/interactive browser piano/i)).toBeInTheDocument();
});

test("opens the hidden game selector and launches a mini-game from the hero emoji", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /hidden game selector/i }));

  expect(screen.getByRole("dialog", { name: /choose a hidden game/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /asteroids/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /falling blocks/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /space invaders/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /space invaders/i }));

  expect(screen.getByRole("dialog", { name: /space invaders game/i })).toBeInTheDocument();
  expect(screen.getByText(/move and fire/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /exit/i }));

  expect(screen.queryByRole("dialog", { name: /space invaders game/i })).not.toBeInTheDocument();
});

test("fires in Space Invaders when the playfield is clicked", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /hidden game selector/i }));
  fireEvent.click(screen.getByRole("button", { name: /space invaders/i }));
  fireEvent.pointerDown(screen.getByRole("dialog", { name: /space invaders game/i }), {
    clientX: 240,
  });

  expect(document.querySelector(".invaders-game__defender-shot")).toBeInTheDocument();
});

test("marks empty contact fields invalid", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByPlaceholderText(/your name/i)).toHaveClass(
    "form__input--invalid"
  );
  expect(screen.getByPlaceholderText(/your email/i)).toHaveClass(
    "form__input--invalid"
  );
  expect(screen.getByPlaceholderText(/workflow or website problem/i)).toHaveClass(
    "form__input--invalid"
  );
  expect(fetch).not.toHaveBeenCalled();
});

test("submits valid contact form data to Netlify Forms", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/your name/i), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByPlaceholderText(/your email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/workflow or website problem/i), {
    target: { value: "Testing the portfolio form." },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(fetch).toHaveBeenCalledWith(
    "/",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: expect.stringContaining("form-name=contact"),
    })
  );
  expect(fetch.mock.calls[0][1].body).toContain("from_name=Test+User");
  expect(fetch.mock.calls[0][1].body).toContain("reply_to=test%40example.com");
  expect(fetch.mock.calls[0][1].body).toContain(
    "message=Testing+the+portfolio+form."
  );
});
