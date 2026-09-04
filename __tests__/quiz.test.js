

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          question_id: 1,
          question_text: "What is the capital of France?",
          option_a: "Paris",
          option_b: "Rome",
          option_c: "Berlin",
          option_d: "Madrid",
          correct_option: "Paris"
        }
      ])
  })
);

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (key) => {
      if (key === "token") return "fake-token";
      if (key === "selectedSubject") return 1;
      if (key === "user_id") return 123;
      return null;
    },
    setItem: () => {}
  },
  writable: true
});

import { jest } from "@jest/globals";
import { fireEvent, getByText } from "@testing-library/dom";

async function flushAsync(times = 5) {
  for (let i = 0; i < times; i++) {
    await Promise.resolve();
    await new Promise(r => setTimeout(r, 0));
  }
}

async function loadQuiz() {
  document.body.innerHTML = `
    <p id="question-counter"></p>
    <p id="question-text"></p>
    <div id="answers-container"></div>
    <button id="next-btn"></button>
  `;

  await import(`../js/quiz.js?t=${Date.now()}-${Math.random()}`);
  await flushAsync();
}

describe("Quiz Flow DOM Tests", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await loadQuiz();
  });

  test("loads and displays the first question", () => {
    expect(getByText(document.body, "What is the capital of France?")).toBeTruthy();
  });

  test("renders answer buttons", () => {
    expect(getByText(document.body, "Paris")).toBeTruthy();
    expect(getByText(document.body, "Rome")).toBeTruthy();
    expect(getByText(document.body, "Berlin")).toBeTruthy();
    expect(getByText(document.body, "Madrid")).toBeTruthy();
  });

  test("selecting an answer adds the selected class", () => {
    const parisBtn = getByText(document.body, "Paris");
    fireEvent.click(parisBtn);

    expect(parisBtn.classList.contains("selected")).toBe(true);
  });

  test("clicking next without selecting answer shows alert", () => {
    window.alert = jest.fn();

    const nextBtn = document.getElementById("next-btn");
    fireEvent.click(nextBtn);

    expect(window.alert).toHaveBeenCalledWith("Please select an answer before continuing");
  });
});