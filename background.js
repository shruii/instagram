chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "feedback") {
    // Store feedback in localStorage or send it to a server for ML training
    const feedback = JSON.parse(localStorage.getItem("feedback") || "[]");
    feedback.push({ url: message.url, sentiment: message.sentiment });
    localStorage.setItem("feedback", JSON.stringify(feedback));
    sendResponse({ status: "success" });
  }
});
